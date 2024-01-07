constructor(props) {
    const {
      className,
      width,
      marginTop,
      bufferRow,
      screenRow,
      number,
      nodePool
    } = props;
    this.props = props;
    const style = {};
    if (width != null && width > 0) style.width = width + 'px';
    if (marginTop != null && marginTop > 0) style.marginTop = marginTop + 'px';
    this.element = nodePool.getElement('DIV', className, style);
    this.element.dataset.bufferRow = bufferRow;
    this.element.dataset.screenRow = screenRow;
    if (number) this.element.appendChild(nodePool.getTextNode(number));
    this.element.appendChild(nodePool.getElement('DIV', 'icon-right', null));
  }