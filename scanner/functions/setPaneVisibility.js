function setPaneVisibility(){hasFrozenColumns()?($paneHeaderR.show(),$paneTopR.show(),hasFrozenRows?($paneBottomL.show(),$paneBottomR.show()):($paneBottomR.hide(),$paneBottomL.hide())):($paneHeaderR.hide(),$paneTopR.hide(),$paneBottomR.hide(),hasFrozenRows?$paneBottomL.show():($paneBottomR.hide(),$paneBottomL.hide()))}