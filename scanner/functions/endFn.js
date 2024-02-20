function endFn() {
            forEach(animationRunners, function(runner) {
              runner.end();
            });
          }