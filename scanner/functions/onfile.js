function onfile(err, m, pkg) {
            if (err) return cb(err);
            if (m) return cb(null, m, pkg);
            loadAsDirectory(path.join(dir, x), opts.package, ondir);
        }