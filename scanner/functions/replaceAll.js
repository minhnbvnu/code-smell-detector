function replaceAll() {
        cm.operation(function() {
          while (!done) {
            replace();
            next();
          }
          stop();
        });
      }