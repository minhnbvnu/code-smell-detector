function processRendering({
  self,
  eventOptions
}) {
  const { method, added, removed } = eventOptions;
  // nodes object always exist at Seemple instances
  const container = self.nodes.container || self.nodes.sandbox;
  const selfDef = defs.get(self);

  if (!container) {
    return;
  }

  switch (method) {
    case 'fill':
    case 'copyWithin':
      throw seempleError('array:method_compat_renderer', { method });
    case 'push':
      processPush({
        self,
        selfDef,
        eventOptions,
        container
      });
      break;
    case 'unshift':
      processUnshift({
        self,
        selfDef,
        eventOptions,
        container
      });
      break;
    case 'pull':
    case 'pop':
    case 'shift':
      processRemove({
        self,
        selfDef,
        eventOptions,
        container
      });
      break;
    case 'sort':
    case 'reverse':
      processSort({
        self,
        selfDef,
        eventOptions,
        container
      });
      break;
    case 'rerender':
      processRerender({
        self,
        selfDef,
        eventOptions,
        container
      });
      break;
    case 'recreate':
      processRecreate({
        self,
        selfDef,
        eventOptions,
        container
      });
      break;
    case 'splice':
      if (added.length) {
        processSpliceAdd({
          self,
          selfDef,
          eventOptions,
          container
        });
      }

      if (removed.length) {
        processRemove({
          self,
          selfDef,
          eventOptions,
          container
        });
      }

      break;
    default:
  }
}