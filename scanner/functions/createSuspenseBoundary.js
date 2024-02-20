function createSuspenseBoundary(request, fallbackAbortableTasks) {
              return {
                id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
                rootSegmentID: -1,
                parentFlushed: false,
                pendingTasks: 0,
                forceClientRender: false,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks,
                errorDigest: null
              };
            }