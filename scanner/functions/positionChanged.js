function positionChanged() {
						// call setPosition so the element and gridster controller are updated
						item.setPosition(item.row, item.col);

						// when internal item position changes, update externally bound values
						if ($getters.row && $getters.row.assign) {
							$getters.row.assign(scope, item.row);
						}
						if ($getters.col && $getters.col.assign) {
							$getters.col.assign(scope, item.col);
						}
					}