function checkLastParamsForCallback(node) {
      const lastParam = node.params[node.params.length - 1] || {}
      if (lastParam.name === 'callback' || lastParam.name === 'cb') {
        context.report({ node: lastParam, messageId: 'error' })
      }
    }