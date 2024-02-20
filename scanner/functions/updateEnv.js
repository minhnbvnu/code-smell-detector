function updateEnv(service) {
        MockDriver.prototype.updateInstanceEnv =
          function(instanceId, env, callback) {
            matchInstanceEnv(tt, env, newEnv);
            callback();
          };
        service.env = JSON.parse(JSON.stringify(newEnv));
        service.save(function(err) {
          tt.ifError(err);

          // give some time for minkelite to initialize completely before
          // calling shutdown
          setTimeout(function() {
            s.stop(tt.end.bind(tt));
          }, 1000);
        });
      }