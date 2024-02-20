function testDriverInstance(tap, i) {
  tap.test('driver instance API', function(t) {
    t.isa(i, EE, 'instances are event emitters');
    method(t, i, 'setStartOptions', ['id', 'opts']);
    method(t, i, 'removeInstance', ['id', 'cb']);
    method(t, i, 'deployInstance', ['id', 'req', 'res']);
    method(t, i, 'startInstance', ['id', 'cb']);
    method(t, i, 'stopInstance', ['id', 'style', 'cb']);
    method(t, i, 'dumpInstanceLog', ['id']);
    method(t, i, 'updateInstanceEnv', ['id', 'env', 'cb']);
    method(t, i, 'requestOfInstance', ['id', 'req', 'cb']);
    method(t, i, 'start', ['meta', 'cb']);
    method(t, i, 'stop', ['cb']);
    method(t, i, 'getName', []);
    method(t, i, 'getStatus', []);
    method(t, i, 'instanceById', ['id']);
    t.end();
  });

  tap.test('driver instance object', function(t) {
    var svc = i.instanceById(1);
    t.assert('driverMeta' in svc, 'instances have driverMeta');
    t.assert('restartCount' in svc, 'instances have restartCount');
    t.assert('commit' in svc, 'instances have commit');
    t.assert('hash' in svc.commit, 'commit has hash');
    t.assert('dir' in svc.commit, 'commit has dir');
    t.assert('pid' in svc, 'instances have a pid');
    t.end();
  });
}