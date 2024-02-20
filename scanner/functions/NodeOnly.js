function NodeOnly(runner) {
  Base.call(this, runner);

  runner.on('suite end', function(suite){
    fs.writeFile('myresults', function(err) {
      // do some stuff
    });
  });
}