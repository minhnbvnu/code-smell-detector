function resizeStop(e) {
					$el.removeClass('gridster-item-moving');
					$el.removeClass('gridster-item-resizing');

					gridster.movingItem = null;

					item.setPosition(item.row, item.col);
					item.setSizeY(item.sizeY);
					item.setSizeX(item.sizeX);

					scope.$apply(function() {
						if (gridster.resizable && gridster.resizable.stop) {
							gridster.resizable.stop(e, $el, itemOptions, item); // options is the item model
						}
					});
				}