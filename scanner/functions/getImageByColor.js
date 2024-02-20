function getImageByColor(color, colorSize = { width: 14, height: 14 }) {
  const size = CGSizeMake(colorSize.width, colorSize.height);
  const image = NSImage.alloc().init()
  image.size = size
  image.lockFocus()
  color.setFill();
  NSBezierPath.fillRect(NSMakeRect(0, 0, colorSize.width, colorSize.height));

  // const colorCell = NSView.alloc().init()
  // colorCell.backgroundColor = color
  // colorCell.drawRect(NSMakeRect(0, 0, colorSize.width, colorSize.height))
  image.unlockFocus()

  return image
}