function spawnGrunt(dir, done) {
  var gruntfile = path.join(dir, 'gruntfile.js');
  if (!fs.existsSync(gruntfile)) {
    done(new Error('Cannot find gruntfile.js: ' + gruntfile));
  } else {
    var node = process.argv[0];
    var grunt = process.argv[1]; // assumes grunt drives these tests
    var child = cp.spawn(node, [grunt, '--verbose', '--stack'], {cwd: dir});
    done(null, child);
  }
}