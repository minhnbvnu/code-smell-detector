function getHookHandlers(segmentMap, agent, shim) {
  return {
    init: function initHook(id, type, triggerId) {
      if (type !== 'PROMISE') {
        return
      }

      const parentSegment = segmentMap.get(triggerId)

      if (parentSegment && !parentSegment.transaction.isActive()) {
        // Stop propagating if the transaction was ended.
        return
      }

      if (!parentSegment && !agent.getTransaction()) {
        return
      }

      const activeSegment = shim.getActiveSegment() || parentSegment

      segmentMap.set(id, activeSegment)
    },

    before: function beforeHook(id) {
      const hookSegment = segmentMap.get(id)

      if (!hookSegment) {
        return
      }

      segmentMap.set(id, shim.getActiveSegment())
      shim.setActiveSegment(hookSegment)
    },
    after: function afterHook(id) {
      const hookSegment = segmentMap.get(id)

      // hookSegment is the segment that was active before the promise
      // executed. If the promise is executing before a segment has been
      // restored, hookSegment will be null and should be restored. Thus
      // undefined is the only invalid value here.
      if (hookSegment === undefined) {
        return
      }

      segmentMap.set(id, shim.getActiveSegment())
      shim.setActiveSegment(hookSegment)
    },
    promiseResolve: function promiseResolveHandler(id) {
      const hookSegment = segmentMap.get(id)
      segmentMap.delete(id)

      if (hookSegment === undefined) {
        return
      }

      // Because the ID will no-longer be in memory until dispose to propagate the null
      // we need to set it active here or else we may continue to propagate the wrong tree.
      // May be some risk of setting this at the wrong time
      if (hookSegment === null) {
        shim.setActiveSegment(hookSegment)
      }
    }
  }
}