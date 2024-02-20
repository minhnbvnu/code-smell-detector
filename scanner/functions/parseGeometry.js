function parseGeometry( xml ) {

      var data = {
        name: xml.getAttribute( 'name' ),
        sources: {},
        vertices: {},
        primitives: []
      };

      var mesh = getElementsByTagName( xml, 'mesh' )[ 0 ];

      // the following tags inside geometry are not supported yet (see https://github.com/mrdoob/three.js/pull/12606): convex_mesh, spline, brep
      if ( mesh === undefined ) return;

      for ( var i = 0; i < mesh.childNodes.length; i ++ ) {

        var child = mesh.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        var id = child.getAttribute( 'id' );

        switch ( child.nodeName ) {

          case 'source':
            data.sources[ id ] = parseSource( child );
            break;

          case 'vertices':
            // data.sources[ id ] = data.sources[ parseId( getElementsByTagName( child, 'input' )[ 0 ].getAttribute( 'source' ) ) ];
            data.vertices = parseGeometryVertices( child );
            break;

          case 'polygons':
            console.warn( 'THREE.ColladaLoader: Unsupported primitive type: ', child.nodeName );
            break;

          case 'lines':
          case 'linestrips':
          case 'polylist':
          case 'triangles':
            data.primitives.push( parseGeometryPrimitive( child ) );
            break;

          default:
            console.log( child );

        }

      }

      library.geometries[ xml.getAttribute( 'id' ) ] = data;

    }