function NyanCat(runner) {
  Base.call(this, runner);

  var self = this;
  var width = (Base.window.width * 0.75) | 0;
  var nyanCatWidth = (this.nyanCatWidth = 11);

  this.colorIndex = 0;
  this.numberOfLines = 4;
  this.rainbowColors = self.generateColors();
  this.scoreboardWidth = 5;
  this.tick = 0;
  this.trajectories = [[], [], [], []];
  this.trajectoryWidthMax = width - nyanCatWidth;

  runner.on('start', function() {
    Base.cursor.hide();
    self.draw();
  });

  runner.on('pending', function() {
    self.draw();
  });

  runner.on('pass', function() {
    self.draw();
  });

  runner.on('fail', function() {
    self.draw();
  });

  runner.once('end', function() {
    Base.cursor.show();
    for (var i = 0; i < self.numberOfLines; i++) {
      write('\n');
    }
    self.epilogue();
  });
}