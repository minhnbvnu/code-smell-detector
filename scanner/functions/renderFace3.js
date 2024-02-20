function renderFace3( v1, v2, v3, uv1, uv2, uv3, element, material ) {

		_this.info.render.vertices += 3;
		_this.info.render.faces ++;

		setOpacity( material.opacity );
		setBlending( material.blending );

		_v1x = v1.positionScreen.x; _v1y = v1.positionScreen.y;
		_v2x = v2.positionScreen.x; _v2y = v2.positionScreen.y;
		_v3x = v3.positionScreen.x; _v3y = v3.positionScreen.y;

		drawTriangle( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y );

		if ( ( material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) && material.map === null ) {

			_diffuseColor.copy( material.color );
			_emissiveColor.copy( material.emissive );

			if ( material.vertexColors === THREE.FaceColors ) {

				_diffuseColor.multiply( element.color );

			}

			_color.copy( _ambientLight );

			_centroid.copy( v1.positionWorld ).add( v2.positionWorld ).add( v3.positionWorld ).divideScalar( 3 );

			calculateLight( _centroid, element.normalModel, _color );

			_color.multiply( _diffuseColor ).add( _emissiveColor );

			material.wireframe === true
				? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
				: fillPath( _color );

		} else if ( material instanceof THREE.MeshBasicMaterial ||
					material instanceof THREE.MeshLambertMaterial ||
					material instanceof THREE.MeshPhongMaterial ) {

			if ( material.map !== null ) {

				var mapping = material.map.mapping;

				if ( mapping === THREE.UVMapping ) {

					_uvs = element.uvs;
					patternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uvs[ uv1 ].x, _uvs[ uv1 ].y, _uvs[ uv2 ].x, _uvs[ uv2 ].y, _uvs[ uv3 ].x, _uvs[ uv3 ].y, material.map );

				}

			} else if ( material.envMap !== null ) {

				if ( material.envMap.mapping === THREE.SphericalReflectionMapping ) {

					_normal.copy( element.vertexNormalsModel[ uv1 ] ).applyMatrix3( _normalViewMatrix );
					_uv1x = 0.5 * _normal.x + 0.5;
					_uv1y = 0.5 * _normal.y + 0.5;

					_normal.copy( element.vertexNormalsModel[ uv2 ] ).applyMatrix3( _normalViewMatrix );
					_uv2x = 0.5 * _normal.x + 0.5;
					_uv2y = 0.5 * _normal.y + 0.5;

					_normal.copy( element.vertexNormalsModel[ uv3 ] ).applyMatrix3( _normalViewMatrix );
					_uv3x = 0.5 * _normal.x + 0.5;
					_uv3y = 0.5 * _normal.y + 0.5;

					patternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y, material.envMap );

				}

			} else {

				_color.copy( material.color );

				if ( material.vertexColors === THREE.FaceColors ) {

					_color.multiply( element.color );

				}

				material.wireframe === true
					? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
					: fillPath( _color );

			}

		} else if ( material instanceof THREE.MeshDepthMaterial ) {

			_color.r = _color.g = _color.b = 1 - smoothstep( v1.positionScreen.z * v1.positionScreen.w, _camera.near, _camera.far );

			material.wireframe === true
				? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
				: fillPath( _color );

		} else if ( material instanceof THREE.MeshNormalMaterial ) {

			_normal.copy( element.normalModel ).applyMatrix3( _normalViewMatrix );

			_color.setRGB( _normal.x, _normal.y, _normal.z ).multiplyScalar( 0.5 ).addScalar( 0.5 );

			material.wireframe === true
				? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
				: fillPath( _color );

		} else {

			_color.setRGB( 1, 1, 1 );

			material.wireframe === true
				? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
				: fillPath( _color );

		}

	}