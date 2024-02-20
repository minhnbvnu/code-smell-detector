function queueFn(asyncFn) {
      var index = taskQueue.length;

      taskCount++;
      taskQueue.push(asyncFn);

      if (index === 0) {
        cancelLastRAF = rafFn(flush);
      }

      return function cancelQueueFn() {
        if (index >= 0) {
          taskQueue[index] = null;
          index = null;

          if (--taskCount === 0 && cancelLastRAF) {
            cancelLastRAF();
            cancelLastRAF = null;
            taskQueue.length = 0;
          }
        }
      };
    }