function convolve_even(src, dst, mask, width, height) {
			  for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
				  var a = imGet(src, x, y, width, height, 3)/255;
				  for (var rgba = 0; rgba < 4; rgba++) {					  
					  var sum = mask[0] * (a==0?255:imGet(src, x, y, width, height, rgba)) * (a==0||rgba==3?1:a);
					  for (var i = 1; i < mask.length; i++) {
						var a1 = imGet(src, Math.max(x-i,0), y, width, height, 3)/255;
					    var a2 = imGet(src, Math.min(x+i, width-1), y, width, height, 3)/255;
						sum += mask[i] * 
						  ((a1==0?255:imGet(src, Math.max(x-i,0), y, width, height, rgba)) * (a1==0||rgba==3?1:a1) + 
						   (a2==0?255:imGet(src, Math.min(x+i, width-1), y, width, height, rgba)) * (a2==0||rgba==3?1:a2));
					  }
					  imSet(dst, y, x, height, width, rgba, sum);
				  }			  
				}
			  }
			}