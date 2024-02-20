function onSceneDispose( event ) {

			var scene = event.target;

			scene.removeEventListener( 'dispose', onSceneDispose );

			delete renderStates[ scene.id ];

		}