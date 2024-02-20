function buildCamera( data ) {

      var camera;

      switch ( data.optics.technique ) {

        case 'perspective':
          camera = new THREE.PerspectiveCamera(
            data.optics.parameters.yfov,
            data.optics.parameters.aspect_ratio,
            data.optics.parameters.znear,
            data.optics.parameters.zfar
          );
          break;

        case 'orthographic':
          var ymag = data.optics.parameters.ymag;
          var xmag = data.optics.parameters.xmag;
          var aspectRatio = data.optics.parameters.aspect_ratio;

          xmag = ( xmag === undefined ) ? ( ymag * aspectRatio ) : xmag;
          ymag = ( ymag === undefined ) ? ( xmag / aspectRatio ) : ymag;

          xmag *= 0.5;
          ymag *= 0.5;

          camera = new THREE.OrthographicCamera(
            - xmag, xmag, ymag, - ymag, // left, right, top, bottom
            data.optics.parameters.znear,
            data.optics.parameters.zfar
          );
          break;

        default:
          camera = new THREE.PerspectiveCamera();
          break;

      }

      camera.name = data.name;

      return camera;

    }