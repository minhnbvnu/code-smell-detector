				function drag(event) {
					var oldRow = item.row,
						oldCol = item.col,
						hasCallback = gridster.draggable && gridster.draggable.drag,
						scrollSensitivity = gridster.draggable.scrollSensitivity,
						scrollSpeed = gridster.draggable.scrollSpeed;

					var row = Math.min(gridster.pixelsToRows(elmY), gridster.maxRows - 1);
					var col = Math.min(gridster.pixelsToColumns(elmX), gridster.columns - 1);

					var itemsInTheWay = gridster.getItems(row, col, item.sizeX, item.sizeY, item);
					var hasItemsInTheWay = itemsInTheWay.length !== 0;

					if (gridster.swapping === true && hasItemsInTheWay) {
						var boundingBoxItem = gridster.getBoundingBox(itemsInTheWay),
							sameSize = boundingBoxItem.sizeX === item.sizeX && boundingBoxItem.sizeY === item.sizeY,
							sameRow = boundingBoxItem.row === oldRow,
							sameCol = boundingBoxItem.col === oldCol,
							samePosition = boundingBoxItem.row === row && boundingBoxItem.col === col,
							inline = sameRow || sameCol;

						if (sameSize && itemsInTheWay.length === 1) {
							if (samePosition) {
								gridster.swapItems(item, itemsInTheWay[0]);
							} else if (inline) {
								return;
							}
						} else if (boundingBoxItem.sizeX <= item.sizeX && boundingBoxItem.sizeY <= item.sizeY && inline) {
							var emptyRow = item.row <= row ? item.row : row + item.sizeY,
								emptyCol = item.col <= col ? item.col : col + item.sizeX,
								rowOffset = emptyRow - boundingBoxItem.row,
								colOffset = emptyCol - boundingBoxItem.col;

							for (var i = 0, l = itemsInTheWay.length; i < l; ++i) {
								var itemInTheWay = itemsInTheWay[i];

								var itemsInFreeSpace = gridster.getItems(
									itemInTheWay.row + rowOffset,
									itemInTheWay.col + colOffset,
									itemInTheWay.sizeX,
									itemInTheWay.sizeY,
									item
								);

								if (itemsInFreeSpace.length === 0) {
									gridster.putItem(itemInTheWay, itemInTheWay.row + rowOffset, itemInTheWay.col + colOffset);
								}
							}
						}
					}

					if (gridster.pushing !== false || !hasItemsInTheWay) {
						item.row = row;
						item.col = col;
					}

					if (event.pageY - realdocument.body.scrollTop < scrollSensitivity) {
						realdocument.body.scrollTop = realdocument.body.scrollTop - scrollSpeed;
					} else if ($window.innerHeight - (event.pageY - realdocument.body.scrollTop) < scrollSensitivity) {
						realdocument.body.scrollTop = realdocument.body.scrollTop + scrollSpeed;
					}

					if (event.pageX - realdocument.body.scrollLeft < scrollSensitivity) {
						realdocument.body.scrollLeft = realdocument.body.scrollLeft - scrollSpeed;
					} else if ($window.innerWidth - (event.pageX - realdocument.body.scrollLeft) < scrollSensitivity) {
						realdocument.body.scrollLeft = realdocument.body.scrollLeft + scrollSpeed;
					}

					if (hasCallback || oldRow !== item.row || oldCol !== item.col) {
						scope.$apply(function() {
							if (hasCallback) {
								gridster.draggable.drag(event, $el, itemOptions, item);
							}
						});
					}
				}