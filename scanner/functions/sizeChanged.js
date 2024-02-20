function sizeChanged() {
						var changedX = item.setSizeX(item.sizeX, true);
						if (changedX && $getters.sizeX && $getters.sizeX.assign) {
							$getters.sizeX.assign(scope, item.sizeX);
						}
						var changedY = item.setSizeY(item.sizeY, true);
						if (changedY && $getters.sizeY && $getters.sizeY.assign) {
							$getters.sizeY.assign(scope, item.sizeY);
						}

						if (changedX || changedY) {
							item.gridster.moveOverlappingItems(item);
							gridster.layoutChanged();
							scope.$broadcast('gridster-item-resized', item);
						}
					}