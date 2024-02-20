function parseLibrary( xml, libraryName, nodeName, parser ) {

      var library = getElementsByTagName( xml, libraryName )[ 0 ];

      if ( library !== undefined ) {

        var elements = getElementsByTagName( library, nodeName );

        for ( var i = 0; i < elements.length; i ++ ) {

          parser( elements[ i ] );

        }

      }

    }