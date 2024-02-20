function WalkontableScrollbars(instance) {
  if(instance.getSetting('scrollbarModelV') === 'native') {
    instance.update('scrollbarModelH', 'none');
  }

  switch (instance.getSetting('scrollbarModelV')) {
    case 'dragdealer':
      this.vertical = new WalkontableVerticalScrollbar(instance);
      break;

    case 'native':
      this.vertical = new WalkontableVerticalScrollbarNative(instance);
      break;
  }

  switch (instance.getSetting('scrollbarModelH')) {
    case 'dragdealer':
      this.horizontal = new WalkontableHorizontalScrollbar(instance);
      break;

    case 'native':
      this.horizontal = new WalkontableHorizontalScrollbarNative(instance);
      break;
  }
}