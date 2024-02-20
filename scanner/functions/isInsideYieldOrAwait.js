function isInsideYieldOrAwait() {
      return context.getAncestors().some((parent) => {
        return (
          parent.type === 'AwaitExpression' || parent.type === 'YieldExpression'
        )
      })
    }