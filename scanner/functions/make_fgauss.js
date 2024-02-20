function make_fgauss(sigma) {
				sigma = Math.max(sigma, 0.01);			      
				var len = Math.ceil(sigma * 4.0) + 1;                     
				mask = [];                               
				for (var i = 0; i < len; i++) {                             
					mask[i] = Math.exp(-0.5 * (i / sigma) * (i / sigma));                                           
				}                                                           
				return mask; 
			}