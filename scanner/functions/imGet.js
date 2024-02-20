function imGet(img, x, y, width, height, rgba) {
				return img[y*width*4 + x*4 + rgba];
			}