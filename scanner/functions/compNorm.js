function compNorm( q ) {

    var q3 = q * 3;

    if ( scope.normal_cache[ q3 ] === 0.0 ) {

      scope.normal_cache[ q3 + 0 ] = scope.field[ q - 1 ]       - scope.field[ q + 1 ];
      scope.normal_cache[ q3 + 1 ] = scope.field[ q - scope.yd ] - scope.field[ q + scope.yd ];
      scope.normal_cache[ q3 + 2 ] = scope.field[ q - scope.zd ] - scope.field[ q + scope.zd ];

    }

  }