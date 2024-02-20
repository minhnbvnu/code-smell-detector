function parseVisualScene( xml ) {

      var data = {
        name: xml.getAttribute( 'name' ),
        children: []
      };

      prepareNodes( xml );

      var elements = getElementsByTagName( xml, 'node' );

      for ( var i = 0; i < elements.length; i ++ ) {

        data.children.push( parseNode( elements[ i ] ) );

      }

      library.visualScenes[ xml.getAttribute( 'id' ) ] = data;

    }