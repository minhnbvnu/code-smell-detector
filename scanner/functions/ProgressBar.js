function ProgressBar(opts) {
  opts = opts || {};
  var steps = opts.steps || 0;
  var step = 0;
  var win = new Window("palette", opts.name || "Progress", [150, 150, 600, 260]);
  win.pnl = win.add("panel", [10, 10, 440, 100], "Progress");
  win.pnl.progBar      = win.pnl.add("progressbar", [20, 35, 410, 60], 0, 100);
  win.pnl.progBarLabel = win.pnl.add("statictext", [20, 20, 320, 35], "0%");
  win.show();

  // function getProgress() {
  //   return win.pnl.progBar.value/win.pnl.progBar.maxvalue;
  // }

  function update() {
    win.update();
  }

  this.step = function() {
    step = Math.min(step + 1, steps);
    this.setProgress(step / steps);
  };

  this.setProgress = function(progress) {
    var max = win.pnl.progBar.maxvalue;
    // progress is always 0.0 to 1.0
    var pct = progress * max;
    win.pnl.progBar.value = pct;
    win.pnl.progBarLabel.text = Math.round(pct) + "%";
    update();
  };

  this.setTitle = function(title) {
    win.pnl.text = title;
    update();
  };

  this.close = function() {
    win.close();
  };
}