function parseNodeInstance( xml ) {

      var data = {
        id: parseId( xml.getAttribute( 'url' ) ),
        materials: {},
        skeletons: []
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        switch ( child.nodeName ) {

          case 'bind_material':
            var instances = child.getElementsByTagName( 'instance_material' );

            for ( var j = 0; j < instances.length; j ++ ) {

              var instance = instances[ j ];
              var symbol = instance.getAttribute( 'symbol' );
              var target = instance.getAttribute( 'target' );

              data.materials[ symbol ] = parseId( target );

            }

            break;

          case 'skeleton':
            data.skeletons.push( parseId( child.textContent ) );
            break;

          default:
            break;

        }

      }

      return data;

    }