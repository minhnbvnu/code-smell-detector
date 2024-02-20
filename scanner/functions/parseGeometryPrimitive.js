function parseGeometryPrimitive( xml ) {

      var primitive = {
        type: xml.nodeName,
        material: xml.getAttribute( 'material' ),
        count: parseInt( xml.getAttribute( 'count' ) ),
        inputs: {},
        stride: 0,
        hasUV: false
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'input':
            var id = parseId( child.getAttribute( 'source' ) );
            var semantic = child.getAttribute( 'semantic' );
            var offset = parseInt( child.getAttribute( 'offset' ) );
            var set = parseInt( child.getAttribute( 'set' ) );
            var inputname = ( set > 0 ? semantic + set : semantic );
            primitive.inputs[ inputname ] = { id: id, offset: offset };
            primitive.stride = Math.max( primitive.stride, offset + 1 );
            if ( semantic === 'TEXCOORD' ) primitive.hasUV = true;
            break;

          case 'vcount':
            primitive.vcount = parseInts( child.textContent );
            break;

          case 'p':
            primitive.p = parseInts( child.textContent );
            break;

        }

      }

      return primitive;

    }