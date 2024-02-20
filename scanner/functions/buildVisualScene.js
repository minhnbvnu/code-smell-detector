function buildVisualScene( data ) {

      var group = new THREE.Group();
      group.name = data.name;

      var children = data.children;

      for ( var i = 0; i < children.length; i ++ ) {

        var child = children[ i ];

        group.add( getNode( child.id ) );

      }

      return group;

    }