function renderSuspenseBoundary(request, task, props) {
              pushBuiltInComponentStackInDEV(task, "Suspense");
              var parentBoundary = task.blockedBoundary;
              var parentSegment = task.blockedSegment;
              var fallback = props.fallback;
              var content = props.children;
              var fallbackAbortSet = /* @__PURE__ */ new Set();
              var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
              var insertionIndex = parentSegment.chunks.length;
              var boundarySegment = createPendingSegment(
                request,
                insertionIndex,
                newBoundary,
                parentSegment.formatContext,
                // boundaries never require text embedding at their edges because comment nodes bound them
                false,
                false
              );
              parentSegment.children.push(boundarySegment);
              parentSegment.lastPushedText = false;
              var contentRootSegment = createPendingSegment(
                request,
                0,
                null,
                parentSegment.formatContext,
                // boundaries never require text embedding at their edges because comment nodes bound them
                false,
                false
              );
              contentRootSegment.parentFlushed = true;
              task.blockedBoundary = newBoundary;
              task.blockedSegment = contentRootSegment;
              try {
                renderNode(request, task, content);
                pushSegmentFinale(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded);
                contentRootSegment.status = COMPLETED;
                queueCompletedSegment(newBoundary, contentRootSegment);
                if (newBoundary.pendingTasks === 0) {
                  popComponentStackInDEV(task);
                  return;
                }
              } catch (error2) {
                contentRootSegment.status = ERRORED;
                newBoundary.forceClientRender = true;
                newBoundary.errorDigest = logRecoverableError(request, error2);
                {
                  captureBoundaryErrorDetailsDev(newBoundary, error2);
                }
              } finally {
                task.blockedBoundary = parentBoundary;
                task.blockedSegment = parentSegment;
              }
              var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
              {
                suspendedFallbackTask.componentStack = task.componentStack;
              }
              request.pingedTasks.push(suspendedFallbackTask);
              popComponentStackInDEV(task);
            }