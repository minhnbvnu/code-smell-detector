function VIntX( q, offset, isol, x, y, z, valp1, valp2 ) {

    var mu = ( isol - valp1 ) / ( valp2 - valp1 ),
    nc = scope.normal_cache;

    vlist[ offset + 0 ] = x + mu * scope.delta;
    vlist[ offset + 1 ] = y;
    vlist[ offset + 2 ] = z;

    nlist[ offset + 0 ] = lerp( nc[ q + 0 ], nc[ q + 3 ], mu );
    nlist[ offset + 1 ] = lerp( nc[ q + 1 ], nc[ q + 4 ], mu );
    nlist[ offset + 2 ] = lerp( nc[ q + 2 ], nc[ q + 5 ], mu );

  }