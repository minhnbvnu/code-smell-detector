function findInstance(callback) {
        m.ServiceInstance.findOne(
          {where: {serverServiceId: svcId}},
          function(err, inst) {
            tt.ifError(err, 'find svc');
            instId = inst.id;
            debug('instance assigned. Id: %s', instId);
            callback();
          }
        );
      }