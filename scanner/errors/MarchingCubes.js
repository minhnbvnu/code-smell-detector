  function VIntX( q, offset, isol, x, y, z, valp1, valp2 ) {
  function VIntY( q, offset, isol, x, y, z, valp1, valp2 ) {
  function VIntZ( q, offset, isol, x, y, z, valp1, valp2 ) {
  function polygonize( fx, fy, fz, q, isol, renderCallback ) {

    // cache indices
    var q1 = q + 1,
      qy = q + scope.yd,
      qz = q + scope.zd,
      q1y = q1 + scope.yd,
      q1z = q1 + scope.zd,
      qyz = q + scope.yd + scope.zd,
      q1yz = q1 + scope.yd + scope.zd;

    var cubeindex = 0,
      field0 = scope.field[ q ],
      field1 = scope.field[ q1 ],
      field2 = scope.field[ qy ],
      field3 = scope.field[ q1y ],
      field4 = scope.field[ qz ],
      field5 = scope.field[ q1z ],
      field6 = scope.field[ qyz ],
      field7 = scope.field[ q1yz ];

    if ( field0 < isol ) cubeindex |= 1;
    if ( field1 < isol ) cubeindex |= 2;
    if ( field2 < isol ) cubeindex |= 8;
    if ( field3 < isol ) cubeindex |= 4;
    if ( field4 < isol ) cubeindex |= 16;
    if ( field5 < isol ) cubeindex |= 32;
    if ( field6 < isol ) cubeindex |= 128;
    if ( field7 < isol ) cubeindex |= 64;

    // if cube is entirely in/out of the surface - bail, nothing to draw

    var bits = edgeTable[ cubeindex ];
    if ( bits === 0 ) return 0;

    var d = scope.delta,
      fx2 = fx + d,
      fy2 = fy + d,
      fz2 = fz + d;

    // top of the cube

    if ( bits & 1 ) {

      compNorm( q );
      compNorm( q1 );
      VIntX( q * 3, 0, isol, fx, fy, fz, field0, field1 );

    }

    if ( bits & 2 ) {

      compNorm( q1 );
      compNorm( q1y );
      VIntY( q1 * 3, 3, isol, fx2, fy, fz, field1, field3 );

    }

    if ( bits & 4 ) {

      compNorm( qy );
      compNorm( q1y );
      VIntX( qy * 3, 6, isol, fx, fy2, fz, field2, field3 );

    }

    if ( bits & 8 ) {

      compNorm( q );
      compNorm( qy );
      VIntY( q * 3, 9, isol, fx, fy, fz, field0, field2 );

    }

    // bottom of the cube

    if ( bits & 16 ) {

      compNorm( qz );
      compNorm( q1z );
      VIntX( qz * 3, 12, isol, fx, fy, fz2, field4, field5 );

    }

    if ( bits & 32 ) {

      compNorm( q1z );
      compNorm( q1yz );
      VIntY( q1z * 3, 15, isol, fx2, fy, fz2, field5, field7 );

    }

    if ( bits & 64 ) {

      compNorm( qyz );
      compNorm( q1yz );
      VIntX( qyz * 3, 18, isol, fx, fy2, fz2, field6, field7 );

    }

    if ( bits & 128 ) {

      compNorm( qz );
      compNorm( qyz );
      VIntY( qz * 3, 21, isol, fx, fy, fz2, field4, field6 );

    }

    // vertical lines of the cube

    if ( bits & 256 ) {

      compNorm( q );
      compNorm( qz );
      VIntZ( q * 3, 24, isol, fx, fy, fz, field0, field4 );

    }

    if ( bits & 512 ) {

      compNorm( q1 );
      compNorm( q1z );
      VIntZ( q1 * 3, 27, isol, fx2, fy,  fz, field1, field5 );

    }

    if ( bits & 1024 ) {

      compNorm( q1y );
      compNorm( q1yz );
      VIntZ( q1y * 3, 30, isol, fx2, fy2, fz, field3, field7 );

    }

    if ( bits & 2048 ) {

      compNorm( qy );
      compNorm( qyz );
      VIntZ( qy * 3, 33, isol, fx,  fy2, fz, field2, field6 );

    }

    cubeindex <<= 4;  // re-purpose cubeindex into an offset into triTable

    var o1, o2, o3, numtris = 0, i = 0;

    // here is where triangles are created

    while ( triTable[ cubeindex + i ] != - 1 ) {

      o1 = cubeindex + i;
      o2 = o1 + 1;
      o3 = o1 + 2;

      posnormtriv( vlist, nlist,
        3 * triTable[ o1 ],
        3 * triTable[ o2 ],
        3 * triTable[ o3 ],
        renderCallback );

      i += 3;
      numtris ++;

    }

    return numtris;

  }
  function posnormtriv( pos, norm, o1, o2, o3, renderCallback ) {