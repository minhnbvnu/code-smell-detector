function computeSelectionRectangle (ulRect, lrRect) {
  let selRect = {}
  selRect.top = ulRect.top
  selRect.left = ulRect.left
  selRect.width = lrRect.left + lrRect.width - selRect.left
  selRect.height = lrRect.top + lrRect.height - selRect.top
  return selRect
}