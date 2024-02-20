function isCustomCardBlock(node) {
    const bgStyle = getStyle(node, 'background');
    const bgColorReg = /rgba\([\s\S]+?0\)/ig;
    const bdReg = /(0px)|(none)/;
    const hasBgColor = !bgColorReg.test(bgStyle) || ~bgStyle.indexOf('gradient');
    const hasNoBorder = ['top', 'left', 'right', 'bottom'].some(item => {
      return bdReg.test(getStyle(node, 'border-' + item));
    });
    const {w, h} = getRect(node);
    const customCardBlock = !!(hasBgColor && (!hasNoBorder || getStyle(node, 'box-shadow') != 'none') && w > 0 && h > 0 && w < 0.95*win_w && h < 0.3*win_h);
    return customCardBlock;
  }