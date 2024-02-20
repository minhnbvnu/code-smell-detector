function canvToCells(canvas) {
				var ctx = canvas.getContext("2d"),
					pix = ctx.webkitGetImageDataHD ?
						ctx.webkitGetImageDataHD(0, 0, canvas.width, canvas.height).data :
						ctx.getImageData(0, 0, canvas.width, canvas.height).data,
					pixOff,
					cells = [],
					i,
					j,
					col,
					key,
					round = function (val) {

						return Math.floor(val / 10) * 10;

					};

				for (j = 0; j < canvas.height; j++) {
					cells.push([]);
					for (i = 0; i < canvas.width; i++) {
						pixOff = j * canvas.width * 4 + (i * 4);
						if (pix[pixOff + 3] !== 0) {

							key = round(pix[pixOff]) + "," +
								round(pix[pixOff + 1]) + "," +
								round(pix[pixOff + 2]) + "," +
								round(pix[pixOff + 3]);

							if (colourMap) {

								// Get the tile from the colour map
								col = colourMap[key];
								if (!col) {
									// This colour is not a tile. It must be an entity...
									if (entities[key]) {
										entities[key].push([i, j]);
									} else {
										entities[key] = [[i, j]];
									}
									col = 0;
								}
								cells[cells.length - 1].push(col);

							} else {

								// No supplied color map.
								// Just set tile indexes to colours, as we see them
								col = autoColMap[key];
								if (!col) {
									autoColMap[key] = ++autoColIdx;
								}
								cells[cells.length - 1].push(col);

							}
						} else {
							cells[cells.length - 1].push(0);
						}
					}
				}

				self.populate(cells);

				return entities;

			}