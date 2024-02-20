function posnormtriv( pos, norm, o1, o2, o3, renderCallback ) {

    var c = scope.count * 3;

    // positions

    scope.positionArray[ c + 0 ] = pos[ o1 ];
    scope.positionArray[ c + 1 ] = pos[ o1 + 1 ];
    scope.positionArray[ c + 2 ] = pos[ o1 + 2 ];

    scope.positionArray[ c + 3 ] = pos[ o2 ];
    scope.positionArray[ c + 4 ] = pos[ o2 + 1 ];
    scope.positionArray[ c + 5 ] = pos[ o2 + 2 ];

    scope.positionArray[ c + 6 ] = pos[ o3 ];
    scope.positionArray[ c + 7 ] = pos[ o3 + 1 ];
    scope.positionArray[ c + 8 ] = pos[ o3 + 2 ];

    // normals

    scope.normalArray[ c + 0 ] = norm[ o1 ];
    scope.normalArray[ c + 1 ] = norm[ o1 + 1 ];
    scope.normalArray[ c + 2 ] = norm[ o1 + 2 ];

    scope.normalArray[ c + 3 ] = norm[ o2 ];
    scope.normalArray[ c + 4 ] = norm[ o2 + 1 ];
    scope.normalArray[ c + 5 ] = norm[ o2 + 2 ];

    scope.normalArray[ c + 6 ] = norm[ o3 ];
    scope.normalArray[ c + 7 ] = norm[ o3 + 1 ];
    scope.normalArray[ c + 8 ] = norm[ o3 + 2 ];

    // uvs

    if ( scope.enableUvs ) {

      var d = scope.count * 2;

      scope.uvArray[ d + 0 ] = pos[ o1 ];
      scope.uvArray[ d + 1 ] = pos[ o1 + 2 ];

      scope.uvArray[ d + 2 ] = pos[ o2 ];
      scope.uvArray[ d + 3 ] = pos[ o2 + 2 ];

      scope.uvArray[ d + 4 ] = pos[ o3 ];
      scope.uvArray[ d + 5 ] = pos[ o3 + 2 ];

    }

    // colors

    if ( scope.enableColors ) {

      scope.colorArray[ c + 0 ] = pos[ o1 ];
      scope.colorArray[ c + 1 ] = pos[ o1 + 1 ];
      scope.colorArray[ c + 2 ] = pos[ o1 + 2 ];

      scope.colorArray[ c + 3 ] = pos[ o2 ];
      scope.colorArray[ c + 4 ] = pos[ o2 + 1 ];
      scope.colorArray[ c + 5 ] = pos[ o2 + 2 ];

      scope.colorArray[ c + 6 ] = pos[ o3 ];
      scope.colorArray[ c + 7 ] = pos[ o3 + 1 ];
      scope.colorArray[ c + 8 ] = pos[ o3 + 2 ];

    }

    scope.count += 3;

    if ( scope.count >= scope.maxCount - 3 ) {

      scope.hasPositions = true;
      scope.hasNormals = true;

      if ( scope.enableUvs ) {

        scope.hasUvs = true;

      }

      if ( scope.enableColors ) {

        scope.hasColors = true;

      }

      renderCallback( scope );

    }

  }