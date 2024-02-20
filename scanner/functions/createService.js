function createService(callback) {
        debug('create service');
        m.ServerService.create({
          name: 'default',
          _groups: [m.Group({name: 'default', id: 1, scale: 1})],
        }, function(err, service) {
          tt.ifError(err, 'create svc');
          svcId = service.id;

          // Use setTimeout so that hooks are run before callback is invoked
          setTimeout(callback, 1000);
        });
      }