function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
              var pingedTasks = [];
              var abortSet = /* @__PURE__ */ new Set();
              var request = {
                destination: null,
                responseState,
                progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
                status: OPEN,
                fatalError: null,
                nextSegmentId: 0,
                allPendingTasks: 0,
                pendingRootTasks: 0,
                completedRootSegment: null,
                abortableTasks: abortSet,
                pingedTasks,
                clientRenderedBoundaries: [],
                completedBoundaries: [],
                partialBoundaries: [],
                onError: onError === void 0 ? defaultErrorHandler : onError,
                onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
                onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
                onShellError: onShellError === void 0 ? noop$1 : onShellError,
                onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
              };
              var rootSegment = createPendingSegment(
                request,
                0,
                null,
                rootFormatContext,
                // Root segments are never embedded in Text on either edge
                false,
                false
              );
              rootSegment.parentFlushed = true;
              var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
              pingedTasks.push(rootTask);
              return request;
            }