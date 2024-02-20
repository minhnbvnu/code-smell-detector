function getAllRect(context, selector) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}