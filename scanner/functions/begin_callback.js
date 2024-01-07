function begin_callback(type) {
			if (type !== libtess.primitiveType.GL_TRIANGLES) {
				window.console && console.log(`Expected TRIANGLES but got type: ${type}`);
			}
		}