constructor(props) {
    const {
      nodePool,
      screenRow,
      screenLine,
      lineComponentsByScreenLineId,
      offScreen
    } = props;
    this.props = props;
    this.element = nodePool.getElement('DIV', this.buildClassName(), null);
    this.element.dataset.screenRow = screenRow;
    this.textNodes = [];

    if (offScreen) {
      this.element.style.position = 'absolute';
      this.element.style.visibility = 'hidden';
      this.element.dataset.offScreen = true;
    }

    this.appendContents();
    lineComponentsByScreenLineId.set(screenLine.id, this);
  }