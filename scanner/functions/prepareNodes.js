function prepareNodes( xml ) {

      var elements = xml.getElementsByTagName( 'node' );

      // ensure all node elements have id attributes

      for ( var i = 0; i < elements.length; i ++ ) {

        var element = elements[ i ];

        if ( element.hasAttribute( 'id' ) === false ) {

          element.setAttribute( 'id', generateId() );

        }

      }

    }