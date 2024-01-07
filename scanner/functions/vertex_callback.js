function vertex_callback(data, poly_vert_array) {
			// window.console && console.log(data[0], data[1]);
			poly_vert_array[poly_vert_array.length] = data[0];
			poly_vert_array[poly_vert_array.length] = data[1];
		}