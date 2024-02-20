function createVirtualLight( light, cascade ) {

		var virtualLight = new THREE.DirectionalLight();

		virtualLight.isVirtual = true;

		virtualLight.onlyShadow = true;
		virtualLight.castShadow = true;

		virtualLight.shadowCameraNear = light.shadowCameraNear;
		virtualLight.shadowCameraFar = light.shadowCameraFar;

		virtualLight.shadowCameraLeft = light.shadowCameraLeft;
		virtualLight.shadowCameraRight = light.shadowCameraRight;
		virtualLight.shadowCameraBottom = light.shadowCameraBottom;
		virtualLight.shadowCameraTop = light.shadowCameraTop;

		virtualLight.shadowCameraVisible = light.shadowCameraVisible;

		virtualLight.shadowDarkness = light.shadowDarkness;

		virtualLight.shadowBias = light.shadowCascadeBias[ cascade ];
		virtualLight.shadowMapWidth = light.shadowCascadeWidth[ cascade ];
		virtualLight.shadowMapHeight = light.shadowCascadeHeight[ cascade ];

		virtualLight.pointsWorld = [];
		virtualLight.pointsFrustum = [];

		var pointsWorld = virtualLight.pointsWorld,
			pointsFrustum = virtualLight.pointsFrustum;

		for ( var i = 0; i < 8; i ++ ) {

			pointsWorld[ i ] = new THREE.Vector3();
			pointsFrustum[ i ] = new THREE.Vector3();

		}

		var nearZ = light.shadowCascadeNearZ[ cascade ];
		var farZ = light.shadowCascadeFarZ[ cascade ];

		pointsFrustum[ 0 ].set( - 1, - 1, nearZ );
		pointsFrustum[ 1 ].set(  1, - 1, nearZ );
		pointsFrustum[ 2 ].set( - 1,  1, nearZ );
		pointsFrustum[ 3 ].set(  1,  1, nearZ );

		pointsFrustum[ 4 ].set( - 1, - 1, farZ );
		pointsFrustum[ 5 ].set(  1, - 1, farZ );
		pointsFrustum[ 6 ].set( - 1,  1, farZ );
		pointsFrustum[ 7 ].set(  1,  1, farZ );

		return virtualLight;

	}