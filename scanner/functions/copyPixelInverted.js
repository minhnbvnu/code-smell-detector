function copyPixelInverted(x_dest, y_dest) {
				const x_src = ~~(x_dest / scale);
				const y_src = ~~(y_dest / scale);
				const index_src = (x_src + y_src * id_src.width) * 4;
				const index_dest = (x_dest + y_dest * id_dest.width) * 4;
				id_dest.data[index_dest + 0] = 255 - id_src.data[index_src + 0];
				id_dest.data[index_dest + 1] = 255 - id_src.data[index_src + 1];
				id_dest.data[index_dest + 2] = 255 - id_src.data[index_src + 2];
				id_dest.data[index_dest + 3] = 255;
				// @TODO maybe: invert based on id_src.data[index_src+3] and the checkered background
			}