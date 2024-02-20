function appendsFields({view, viewSize}, allFields, withLabelBottom) {
  allFields.reverse().forEach(function (fields) {
    const y = (withLabelBottom) ? view.subviews().length * 50 + 25 : view.subviews().length * 50;
    const viewCell = NSView.alloc().initWithFrame(NSMakeRect(0, y, viewSize.width, 50));
    fields.forEach(function (field) {
      if (field.label) viewCell.addSubview(field.label);
      if (field.item) viewCell.addSubview(field.item);
    })
    view.addSubview(viewCell)
  })
}