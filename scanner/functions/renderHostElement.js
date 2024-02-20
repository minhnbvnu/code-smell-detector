function renderHostElement(request, task, type, props) {
              pushBuiltInComponentStackInDEV(task, type);
              var segment = task.blockedSegment;
              var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
              segment.lastPushedText = false;
              var prevContext = segment.formatContext;
              segment.formatContext = getChildFormatContext(prevContext, type, props);
              renderNode(request, task, children);
              segment.formatContext = prevContext;
              pushEndInstance(segment.chunks, type);
              segment.lastPushedText = false;
              popComponentStackInDEV(task);
            }