function buildMaterial( data ) {

      var effect = getEffect( data.url );
      var technique = effect.profile.technique;
      var extra = effect.profile.extra;

      var material;

      switch ( technique.type ) {

        case 'phong':
        case 'blinn':
          material = new THREE.MeshPhongMaterial();
          break;

        case 'lambert':
          material = new THREE.MeshLambertMaterial();
          break;

        default:
          material = new THREE.MeshBasicMaterial();
          break;

      }

      material.name = data.name;

      function getTexture( textureObject ) {

        var sampler = effect.profile.samplers[ textureObject.id ];
        var image = null;

        // get image

        if ( sampler !== undefined ) {

          var surface = effect.profile.surfaces[ sampler.source ];
          image = getImage( surface.init_from );

        } else {

          console.warn( 'THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530).' );
          image = getImage( textureObject.id );

        }

        // create texture if image is avaiable

        if ( image !== null ) {

          var loader = getTextureLoader( image );

          if ( loader !== undefined ) {

            var texture = loader.load( image );

            var extra = textureObject.extra;

            if ( extra !== undefined && extra.technique !== undefined && isEmpty( extra.technique ) === false ) {

              var technique = extra.technique;

              texture.wrapS = technique.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
              texture.wrapT = technique.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;

              texture.offset.set( technique.offsetU || 0, technique.offsetV || 0 );
              texture.repeat.set( technique.repeatU || 1, technique.repeatV || 1 );

            } else {

              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;

            }

            return texture;

          } else {

            console.warn( 'THREE.ColladaLoader: Loader for texture %s not found.', image );

            return null;

          }

        } else {

          console.warn( 'THREE.ColladaLoader: Couldn\'t create texture with ID:', textureObject.id );

          return null;

        }

      }

      var parameters = technique.parameters;

      for ( var key in parameters ) {

        var parameter = parameters[ key ];

        switch ( key ) {

          case 'diffuse':
            if ( parameter.color ) material.color.fromArray( parameter.color );
            if ( parameter.texture ) material.map = getTexture( parameter.texture );
            break;
          case 'specular':
            if ( parameter.color && material.specular ) material.specular.fromArray( parameter.color );
            if ( parameter.texture ) material.specularMap = getTexture( parameter.texture );
            break;
          case 'bump':
            if ( parameter.texture ) material.normalMap = getTexture( parameter.texture );
            break;
          case 'ambient':
            if ( parameter.texture ) material.lightMap = getTexture( parameter.texture );
            break;
          case 'shininess':
            if ( parameter.float && material.shininess ) material.shininess = parameter.float;
            break;
          case 'emission':
            if ( parameter.color && material.emissive ) material.emissive.fromArray( parameter.color );
            if ( parameter.texture ) material.emissiveMap = getTexture( parameter.texture );
            break;

        }

      }

      //

      var transparent = parameters[ 'transparent' ];
      var transparency = parameters[ 'transparency' ];

      // <transparency> does not exist but <transparent>

      if ( transparency === undefined && transparent ) {

        transparency = {
          float: 1
        };

      }

      // <transparent> does not exist but <transparency>

      if ( transparent === undefined && transparency ) {

        transparent = {
          opaque: 'A_ONE',
          data: {
            color: [ 1, 1, 1, 1 ]
          } };

      }

      if ( transparent && transparency ) {

        // handle case if a texture exists but no color

        if ( transparent.data.texture ) {

          // we do not set an alpha map (see #13792)

          material.transparent = true;

        } else {

          var color = transparent.data.color;

          switch ( transparent.opaque ) {

            case 'A_ONE':
              material.opacity = color[ 3 ] * transparency.float;
              break;
            case 'RGB_ZERO':
              material.opacity = 1 - ( color[ 0 ] * transparency.float );
              break;
            case 'A_ZERO':
              material.opacity = 1 - ( color[ 3 ] * transparency.float );
              break;
            case 'RGB_ONE':
              material.opacity = color[ 0 ] * transparency.float;
              break;
            default:
              console.warn( 'THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.', transparent.opaque );

          }

          if ( material.opacity < 1 ) material.transparent = true;

        }

      }

      //

      if ( extra !== undefined && extra.technique !== undefined && extra.technique.double_sided === 1 ) {

        material.side = THREE.DoubleSide;

      }

      return material;

    }