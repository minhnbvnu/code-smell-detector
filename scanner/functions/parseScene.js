function parseScene( xml ) {

      var instance = getElementsByTagName( xml, 'instance_visual_scene' )[ 0 ];
      return getVisualScene( parseId( instance.getAttribute( 'url' ) ) );

    }