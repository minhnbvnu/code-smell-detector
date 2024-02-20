function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
              return {
                status: PENDING,
                id: -1,
                // lazily assigned later
                index,
                parentFlushed: false,
                chunks: [],
                children: [],
                formatContext,
                boundary,
                lastPushedText,
                textEmbedded
              };
            }