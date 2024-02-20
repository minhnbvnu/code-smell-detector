function GraphGroup(group, groupId, options, groupsUsingDefaultStyles) {
    this.id = groupId;
    var fields = ['sampling', 'style', 'sort', 'yAxisOrientation', 'barChart', 'drawPoints', 'shaded', 'interpolation'];
    this.options = util.selectiveBridgeObject(fields, options);
    this.usingDefaultStyle = group.className === undefined;
    this.groupsUsingDefaultStyles = groupsUsingDefaultStyles;
    this.zeroPosition = 0;
    this.update(group);
    if (this.usingDefaultStyle == true) {
      this.groupsUsingDefaultStyles[0] += 1;
    }
    this.itemsData = [];
    this.visible = group.visible === undefined ? true : group.visible;
  }