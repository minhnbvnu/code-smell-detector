function syncByNames(names) {
  const queue = new Bagpipe(10);
  let remain = names.length * registrys.length;
  if (!names) {
    console.log('Can not find any packages to sync.');
    process.exit(0);
  }
  console.log('Start sync %j.', names);
  const fail = {};
  const success = {};
  registrys.forEach(function (registry) {
    names.forEach(function (name) {
      queue.push(sync, registry, name, function (err, data) {
        remain--;
        if (err) {
          console.error(err.message);
          fail[name] = true;
        } else if (!data.ok) {
          fail[name] = true;
        } else {
          success[name] = true;
        }
        if (!remain) {
          for (const n in success) {
            if (fail[n]) {
              delete success[n];
            }
          }
          console.log('Sync all packages done, successed: %j, failed: %j', Object.keys(success), Object.keys(fail));
          process.exit(0);
        }
      });
    });
  });
}