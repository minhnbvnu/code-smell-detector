function abortTaskSoft(task) {
              var request = this;
              var boundary = task.blockedBoundary;
              var segment = task.blockedSegment;
              segment.status = ABORTED;
              finishedTask(request, boundary, segment);
            }