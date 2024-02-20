function resizeStart(e) {
					$el.addClass('gridster-item-moving');
					$el.addClass('gridster-item-resizing');

					gridster.movingItem = item;

					item.setElementSizeX();
					item.setElementSizeY();
					item.setElementPosition();
					gridster.updateHeight(1);

					scope.$apply(function() {
						// callback
						if (gridster.resizable && gridster.resizable.start) {
							gridster.resizable.start(e, $el, itemOptions, item); // options is the item model
						}
					});
				}