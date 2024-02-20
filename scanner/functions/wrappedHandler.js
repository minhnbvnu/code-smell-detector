function wrappedHandler() {
      const args = shim.argsToArray.apply(shim, arguments)

      const event = args[0]
      const context = args[1]

      const functionName = context.functionName
      const group = NAMES.FUNCTION.PREFIX
      const transactionName = group + functionName

      const transaction = shim.tracer.getTransaction()
      if (!transaction) {
        return handler.apply(this, arguments)
      }

      transaction.setPartialName(transactionName)

      const isApiGatewayLambdaProxy = apiGateway.isLambdaProxyEvent(event)
      const segmentRecorder = isApiGatewayLambdaProxy ? recordWeb : recordBackground
      const segment = shim.createSegment(functionName, segmentRecorder)
      transaction.baseSegment = segment
      // resultProcessor is used to execute additional logic based on the
      // payload supplied to the callback.
      let resultProcessor
      if (isApiGatewayLambdaProxy) {
        const webRequest = new apiGateway.LambdaProxyWebRequest(event)
        setWebRequest(shim, transaction, webRequest)
        resultProcessor = getApiGatewayLambdaProxyResultProcessor(transaction)
      }

      const cbIndex = args.length - 1

      // Add transaction ending closure to the list of functions to be called on
      // beforeExit (i.e. in the case that context.{done,fail,succeed} or callback
      // were not called).
      const txnEnder = endTransaction.bind(null, transaction, transactionEnders.length)

      transactionEnders.push(txnEnder)

      args[cbIndex] = awsLambda.wrapCallbackAndCaptureError(
        transaction,
        txnEnder,
        args[cbIndex],
        resultProcessor
      )

      // context.{done,fail,succeed} are all considered deprecated by
      // AWS, but are considered functional.
      context.done = awsLambda.wrapCallbackAndCaptureError(transaction, txnEnder, context.done)
      context.fail = awsLambda.wrapCallbackAndCaptureError(transaction, txnEnder, context.fail)
      shim.wrap(context, 'succeed', function wrapSucceed(shim, original) {
        return function wrappedSucceed() {
          txnEnder()
          return original.apply(this, arguments)
        }
      })

      const awsAttributes = awsLambda._getAwsAgentAttributes(event, context)
      transaction.trace.attributes.addAttributes(ATTR_DEST.TRANS_COMMON, awsAttributes)

      shim.agent.setLambdaArn(context.invokedFunctionArn)

      shim.agent.setLambdaFunctionVersion(context.functionVersion)
      segment.addSpanAttributes(awsAttributes)

      segment.start()

      let res
      try {
        res = shim.applySegment(handler, segment, false, this, args)
      } catch (err) {
        uncaughtException = err
        txnEnder()
        throw err
      }
      if (shim.isPromise(res)) {
        res = lambdaInterceptPromise(res, resultProcessor, txnEnder)
      }
      return res
    }