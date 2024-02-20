function killClusterMaster(t) {
  ServiceProcess.findOne({where: {workerId: 0}}, function(err, proc) {
    t.ifError(err);
    t.assert(proc);
    server.once('running', function() {
      t.pass('running');
      t.end();
    });
    process.kill(proc.pid, 'SIGTERM');
  });
}