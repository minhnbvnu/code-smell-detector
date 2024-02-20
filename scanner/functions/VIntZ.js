function VIntZ( q, offset, isol, x, y, z, valp1, valp2 ) {

    var mu = ( isol - valp1 ) / ( valp2 - valp1 ),
    nc = scope.normal_cache;

    vlist[ offset + 0 ] = x;
    vlist[ offset + 1 ] = y;
    vlist[ offset + 2 ] = z + mu * scope.delta;

    var q2 = q + scope.zd * 3;

    nlist[ offset + 0 ] = lerp( nc[ q + 0 ], nc[ q2 + 0 ], mu );
    nlist[ offset + 1 ] = lerp( nc[ q + 1 ], nc[ q2 + 1 ], mu );
    nlist[ offset + 2 ] = lerp( nc[ q + 2 ], nc[ q2 + 2 ], mu );

  }