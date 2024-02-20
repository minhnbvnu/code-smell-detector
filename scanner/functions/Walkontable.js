function Walkontable(settings) {
  var that = this,
    originalHeaders = [];

  this.guid = 'wt_' + (window.Handsontable ? Handsontable.helper.randomString() : ''); //this is the namespace for global events

  //bootstrap from settings
  this.wtSettings = new WalkontableSettings(this, settings);
  this.wtDom = new WalkontableDom();
  this.wtTable = new WalkontableTable(this);
  this.wtScroll = new WalkontableScroll(this);
  this.wtViewport = new WalkontableViewport(this);
  this.wtScrollbars = new WalkontableScrollbars(this);
  this.wtWheel = new WalkontableWheel(this);
  this.wtEvent = new WalkontableEvent(this);

  //find original headers
  if (this.wtTable.THEAD.childNodes.length && this.wtTable.THEAD.childNodes[0].childNodes.length) {
    for (var c = 0, clen = this.wtTable.THEAD.childNodes[0].childNodes.length; c < clen; c++) {
      originalHeaders.push(this.wtTable.THEAD.childNodes[0].childNodes[c].innerHTML);
    }
    if (!this.getSetting('columnHeaders').length) {
      this.update('columnHeaders', [function (column, TH) {
        that.wtDom.fastInnerText(TH, originalHeaders[column]);
      }]);
    }
  }

  //initialize selections
  this.selections = {};
  var selectionsSettings = this.getSetting('selections');
  if (selectionsSettings) {
    for (var i in selectionsSettings) {
      if (selectionsSettings.hasOwnProperty(i)) {
        this.selections[i] = new WalkontableSelection(this, selectionsSettings[i]);
      }
    }
  }

  this.drawn = false;
  this.drawInterrupted = false;

  if (window.Handsontable) {
    Handsontable.PluginHooks.add('beforeChange', function () {
      if (that.rowHeightCache) {
        that.rowHeightCache.length = 0;
      }
    });

  }
}