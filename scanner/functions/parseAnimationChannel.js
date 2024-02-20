function parseAnimationChannel( xml ) {

      var data = {};

      var target = xml.getAttribute( 'target' );

      // parsing SID Addressing Syntax

      var parts = target.split( '/' );

      var id = parts.shift();
      var sid = parts.shift();

      // check selection syntax

      var arraySyntax = ( sid.indexOf( '(' ) !== - 1 );
      var memberSyntax = ( sid.indexOf( '.' ) !== - 1 );

      if ( memberSyntax ) {

        //  member selection access

        parts = sid.split( '.' );
        sid = parts.shift();
        data.member = parts.shift();

      } else if ( arraySyntax ) {

        // array-access syntax. can be used to express fields in one-dimensional vectors or two-dimensional matrices.

        var indices = sid.split( '(' );
        sid = indices.shift();

        for ( var i = 0; i < indices.length; i ++ ) {

          indices[ i ] = parseInt( indices[ i ].replace( /\)/, '' ) );

        }

        data.indices = indices;

      }

      data.id = id;
      data.sid = sid;

      data.arraySyntax = arraySyntax;
      data.memberSyntax = memberSyntax;

      data.sampler = parseId( xml.getAttribute( 'source' ) );

      return data;

    }