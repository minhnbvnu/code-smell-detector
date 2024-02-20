function WalkontableViewport(instance) {
  this.instance = instance;
  this.resetSettings();

  if (this.instance.isNativeScroll) {
    var that = this;
    that.clientHeight = document.documentElement.clientHeight; //browser viewport height
    $(window).on('resize', function () {
      that.clientHeight = document.documentElement.clientHeight;
    });
  }
}