function dispatchAction(componentIdentity, queue, action) {
              if (numberOfReRenders >= RE_RENDER_LIMIT) {
                throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
              }
              if (componentIdentity === currentlyRenderingComponent) {
                didScheduleRenderPhaseUpdate = true;
                var update = {
                  action,
                  next: null
                };
                if (renderPhaseUpdates === null) {
                  renderPhaseUpdates = /* @__PURE__ */ new Map();
                }
                var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate === void 0) {
                  renderPhaseUpdates.set(queue, update);
                } else {
                  var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
                  while (lastRenderPhaseUpdate.next !== null) {
                    lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
                  }
                  lastRenderPhaseUpdate.next = update;
                }
              }
            }