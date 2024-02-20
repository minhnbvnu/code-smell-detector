function getPadding(node) {
    return {
      paddingTop: parseInt(getStyle(node, 'paddingTop')),
      paddingLeft: parseInt(getStyle(node, 'paddingLeft')),
      paddingBottom: parseInt(getStyle(node, 'paddingBottom')),
      paddingRight: parseInt(getStyle(node, 'paddingRight'))
    }
  }