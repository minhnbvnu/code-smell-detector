function unpackTexture(name, width, height) {
			var texture = textures[name];

			// Upload to a temporary RGBA texture, then unpack it.
			// This is faster than CPU-side swizzling in ANGLE on Windows.
			gl.useProgram(unpackProgram);

			var fb = framebuffers[name];
			if (!fb) {
				// Create a framebuffer and an empty target size
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texImage2D(
					gl.TEXTURE_2D,
					0, // mip level
					gl.RGBA, // internal format
					width,
					height,
					0, // border
					gl.RGBA, // format
					gl.UNSIGNED_BYTE, //type
					null // data!
				);

				fb = framebuffers[name] = gl.createFramebuffer();
			}

			gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

			var tempTexture = textures[name + '_temp'];
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, tempTexture);
			gl.uniform1i(unpackTextureLocation, 1);

			var stripeTexture = textures[name + '_stripe'];
			gl.activeTexture(gl.TEXTURE2);
			gl.bindTexture(gl.TEXTURE_2D, stripeTexture);
			gl.uniform1i(stripeLocation, 2);

			// Rectangle geometry
			gl.bindBuffer(gl.ARRAY_BUFFER, buf);
			gl.enableVertexAttribArray(positionLocation);
			gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

			// Set up the texture geometry...
			gl.bindBuffer(gl.ARRAY_BUFFER, unpackTexturePositionBuffer);
			gl.enableVertexAttribArray(unpackTexturePositionLocation);
			gl.vertexAttribPointer(unpackTexturePositionLocation, 2, gl.FLOAT, false, 0, 0);

			// Draw into the target texture...
			gl.viewport(0, 0, width, height);

			gl.drawArrays(gl.TRIANGLES, 0, rectangle.length / 2);

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		}