function testSignature(testOpts) {
      const { urlType, headers, callback, swapHost } = testOpts

      // Setup the arguments and the test name
      const args = [] // Setup arguments to the get/request function
      const names = [] // Capture parameters for the name of the test

      // See if a URL argument is being used
      if (urlType === 'string') {
        args.push(_url)
        names.push('URL string')
      } else if (urlType === 'object') {
        args.push(global.URL ? new global.URL(_url) : _url)
        names.push('URL object')
      }

      // See if an options argument should be used
      const opts = {}
      if (headers) {
        opts.headers = { test: 'test' }
        names.push('options')
      }
      // If options specifies a hostname, it will override the url parameter
      if (swapHost) {
        opts.hostname = 'www.google.com'
        names.push('options with different hostname')
      }
      if (Object.keys(opts).length > 0) {
        args.push(opts)
      }

      // If the callback argument should be setup, just add it to the name for now, and
      // setup within the it() call since the callback needs to access the done() function
      if (callback) {
        names.push('callback')
      }

      // Name the test and start it
      const testName = names.join(', ')

      t.test(testName, function (t) {
        // If testing the options overriding the URL argument, set up nock differently
        if (swapHost) {
          nock(`${nodule}://www.google.com`).get(path).reply(200, 'Hello from Google')
        } else {
          nock(leftPart).get(path).reply(200, 'Hello from New Relic')
        }

        // Setup a function to test the response.
        const callbackTester = (res) => {
          testResult(res, testOpts, t)
        }

        // Add callback to the arguments, if used
        if (callback) {
          args.push(callbackTester)
        }

        helper.runInTransaction(agent, function () {
          // Methods have to be retrieved within the transaction scope for instrumentation
          const request = getMethodFromName(nodule, method)
          const clientRequest = request(...args)
          clientRequest.end()

          // If not using a callback argument, setup the callback on the 'response' event
          if (!callback) {
            clientRequest.on('response', callbackTester)
          }
        })
      })
    }