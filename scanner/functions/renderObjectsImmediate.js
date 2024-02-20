function renderObjectsImmediate ( renderList, materialType, camera, lights, fog, overrideMaterial ) {

		var material;

		for ( var i = 0, l = renderList.length; i < l; i ++ ) {

			var webglObject = renderList[ i ];
			var object = webglObject.object;

			if ( object.visible ) {

				if ( overrideMaterial ) {

					material = overrideMaterial;

				} else {

					material = webglObject[ materialType ];

					if ( ! material ) continue;

					setMaterial( material );

				}

				_this.renderImmediateObject( camera, lights, fog, material, object );

			}

		}

	}