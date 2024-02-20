function MarchingCubes( resolution, material, enableUvs, enableColors ) {

  THREE.ImmediateRenderObject.call( this, material );

  var scope = this;

  // temp buffers used in polygonize

  var vlist = new Float32Array( 12 * 3 );
  var nlist = new Float32Array( 12 * 3 );

  this.invalidate = false;

  this.enableUvs = enableUvs !== undefined ? enableUvs : false;
  this.enableColors = enableColors !== undefined ? enableColors : false;

  // functions have to be object properties
  // prototype functions kill performance
  // (tested and it was 4x slower !!!)

  this.init = function ( resolution ) {

    this.resolution = resolution;

    // parameters

    this.isolation = 80.0;

    // size of field, 32 is pushing it in Javascript :)

    this.size = resolution;
    this.size2 = this.size * this.size;
    this.size3 = this.size2 * this.size;
    this.halfsize = this.size / 2.0;

    // deltas

    this.delta = 2.0 / this.size;
    this.yd = this.size;
    this.zd = this.size2;

    this.field = new Float32Array( this.size3 );
    this.field2 = new Float32Array( this.size3 );
    this.normal_cache = new Float32Array( this.size3 * 3 );

    // immediate render mode simulator

    this.maxCount = 4096; // TODO: find the fastest size for this buffer
    this.count = 0;

    this.hasPositions = false;
    this.hasNormals = false;
    this.hasColors = false;
    this.hasUvs = false;

    this.positionArray = new Float32Array( this.maxCount * 3 );
    this.normalArray   = new Float32Array( this.maxCount * 3 );

    if ( this.enableUvs ) {

      this.uvArray = new Float32Array( this.maxCount * 2 );

    }

    if ( this.enableColors ) {

      this.colorArray   = new Float32Array( this.maxCount * 3 );

    }

  };

  ///////////////////////
  // Polygonization
  ///////////////////////

  function lerp( a, b, t ) {

    return a + ( b - a ) * t;

  }

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

  function VIntY( q, offset, isol, x, y, z, valp1, valp2 ) {

    var mu = ( isol - valp1 ) / ( valp2 - valp1 ),
    nc = scope.normal_cache;

    vlist[ offset + 0 ] = x;
    vlist[ offset + 1 ] = y + mu * scope.delta;
    vlist[ offset + 2 ] = z;

    var q2 = q + scope.yd * 3;

    nlist[ offset + 0 ] = lerp( nc[ q + 0 ], nc[ q2 + 0 ], mu );
    nlist[ offset + 1 ] = lerp( nc[ q + 1 ], nc[ q2 + 1 ], mu );
    nlist[ offset + 2 ] = lerp( nc[ q + 2 ], nc[ q2 + 2 ], mu );

  }

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

  function compNorm( q ) {

    var q3 = q * 3;

    if ( scope.normal_cache[ q3 ] === 0.0 ) {

      scope.normal_cache[ q3 + 0 ] = scope.field[ q - 1 ]       - scope.field[ q + 1 ];
      scope.normal_cache[ q3 + 1 ] = scope.field[ q - scope.yd ] - scope.field[ q + scope.yd ];
      scope.normal_cache[ q3 + 2 ] = scope.field[ q - scope.zd ] - scope.field[ q + scope.zd ];

    }

  }

  // Returns total number of triangles. Fills triangles.
  // (this is where most of time is spent - it's inner work of O(n3) loop )

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

  /////////////////////////////////////
  // Immediate render mode simulator
  /////////////////////////////////////

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

  this.begin = function () {

    this.count = 0;

    this.hasPositions = false;
    this.hasNormals = false;
    this.hasUvs = false;
    this.hasColors = false;

  };

  this.end = function ( renderCallback ) {

    if ( this.count === 0 ) return;

    for ( var i = this.count * 3; i < this.positionArray.length; i ++ ) {

      this.positionArray[ i ] = 0.0;

    }

    this.hasPositions = true;
    this.hasNormals = true;

    if ( this.enableUvs ) {

      this.hasUvs = true;

    }

    if ( this.enableColors ) {

      this.hasColors = true;

    }

    renderCallback( this );

  };

  /////////////////////////////////////
  // Metaballs
  /////////////////////////////////////

  // Adds a reciprocal ball (nice and blobby) that, to be fast, fades to zero after
  // a fixed distance, determined by strength and subtract.

  this.addBall = function ( ballx, bally, ballz, strength, subtract ) {

    var sign = Math.sign( strength );
    strength = Math.abs( strength );

    // Let's solve the equation to find the radius:
    // 1.0 / (0.000001 + radius^2) * strength - subtract = 0
    // strength / (radius^2) = subtract
    // strength = subtract * radius^2
    // radius^2 = strength / subtract
    // radius = sqrt(strength / subtract)

    var radius = this.size * Math.sqrt( strength / subtract ),
      zs = ballz * this.size,
      ys = bally * this.size,
      xs = ballx * this.size;

    var min_z = Math.floor( zs - radius ); if ( min_z < 1 ) min_z = 1;
    var max_z = Math.floor( zs + radius ); if ( max_z > this.size - 1 ) max_z = this.size - 1;
    var min_y = Math.floor( ys - radius ); if ( min_y < 1 ) min_y = 1;
    var max_y = Math.floor( ys + radius ); if ( max_y > this.size - 1 ) max_y = this.size - 1;
    var min_x = Math.floor( xs - radius ); if ( min_x < 1  ) min_x = 1;
    var max_x = Math.floor( xs + radius ); if ( max_x > this.size - 1 ) max_x = this.size - 1;


    // Don't polygonize in the outer layer because normals aren't
    // well-defined there.

    var x, y, z, y_offset, z_offset, fx, fy, fz, fz2, fy2, val;

    for ( z = min_z; z < max_z; z ++ ) {

      z_offset = this.size2 * z;
      fz = z / this.size - ballz;
      fz2 = fz * fz;

      for ( y = min_y; y < max_y; y ++ ) {

        y_offset = z_offset + this.size * y;
        fy = y / this.size - bally;
        fy2 = fy * fy;

        for ( x = min_x; x < max_x; x ++ ) {

          fx = x / this.size - ballx;
          val = strength / ( 0.000001 + fx * fx + fy2 + fz2 ) - subtract;
          if ( val > 0.0 ) this.field[ y_offset + x ] += val * sign;

        }

      }

    }

  };

  this.addPlaneX = function( strength, subtract ) {

    var x, y, z, xx, val, xdiv, cxy,

      // cache attribute lookups
      size = this.size,
      yd = this.yd,
      zd = this.zd,
      field = this.field,

      dist = size * Math.sqrt( strength / subtract );

    if ( dist > size ) dist = size;

    for ( x = 0; x < dist; x ++ ) {

      xdiv = x / size;
      xx = xdiv * xdiv;
      val = strength / ( 0.0001 + xx ) - subtract;

      if ( val > 0.0 ) {

        for ( y = 0; y < size; y ++ ) {

          cxy = x + y * yd;

          for ( z = 0; z < size; z ++ ) {

            field[ zd * z + cxy ] += val;

          }

        }

      }

    }

  };

  this.addPlaneY = function( strength, subtract ) {

    var x, y, z, yy, val, ydiv, cy, cxy,

      // cache attribute lookups
      size = this.size,
      yd = this.yd,
      zd = this.zd,
      field = this.field,

      dist = size * Math.sqrt( strength / subtract );

    if ( dist > size ) dist = size;

    for ( y = 0; y < dist; y ++ ) {

      ydiv = y / size;
      yy = ydiv * ydiv;
      val = strength / ( 0.0001 + yy ) - subtract;

      if ( val > 0.0 ) {

        cy = y * yd;

        for ( x = 0; x < size; x ++ ) {

          cxy = cy + x;

          for ( z = 0; z < size; z ++ )
            field[ zd * z + cxy ] += val;

        }

      }

    }

  };

  this.addPlaneZ = function( strength, subtract ) {

    var x, y, z, zz, val, zdiv, cz, cyz,

      // cache attribute lookups
      size = this.size,
      yd = this.yd,
      zd = this.zd,
      field = this.field,

      dist = size * Math.sqrt( strength / subtract );

    if ( dist > size ) dist = size;

    for ( z = 0; z < dist; z ++ ) {

      zdiv = z / size;
      zz = zdiv * zdiv;
      val = strength / ( 0.0001 + zz ) - subtract;
      if ( val > 0.0 ) {

        cz = zd * z;

        for ( y = 0; y < size; y ++ ) {

          cyz = cz + y * yd;

          for ( x = 0; x < size; x ++ )
            field[ cyz + x ] += val;

        }

      }

    }

  };

  /////////////////////////////////////
  // Updates
  /////////////////////////////////////

  this.reset = function () {

    this.invalidate = true;

    var i;

    // wipe the normal cache

    for ( i = 0; i < this.size3; i ++ ) {

      this.normal_cache[ i * 3 ] = 0.0;
      this.field[ i ] = 0.0;

    }

  };

  this.cage = function() {

    this.addPlaneX(.5,12);
    this.addPlaneY(.5,12);
    this.addPlaneZ(.5,12);

    for ( var i = 0; i < this.size3; i++ ) {
      this.field2[i] = this.field[i] + this.field[this.size3-1-i];
    }
    for ( var i = 0; i < this.size3; i++ ) {
      this.field[i] = this.field2[i];
    }

    return;
    var strength = 2;
    var subtract = 12;

    for ( var i = 0; i < this.size3; i ++ ) {
      var x = i % this.size;
      var y = Math.floor(i/this.size) % this.size;
      var z = Math.floor(i/(this.size*this.size)) % this.size;
      //if (x===0 || y === 0 || z === 0 || x === this.size-1 || y === this.size-1 || z === this.size-1 ) {
      if (x===this.size-1 ) {
        var xdiv = x / this.size;
        var xx = xdiv * xdiv;
        var val = strength / ( 0.0001 + xx ) - subtract;
        if (val>0) this.field[i] = val;
      }
    }

  }

  this.render = function ( renderCallback ) {

    if (!this.invalidate) {
      renderCallback(this);
      return;
    }

    this.invalidate = true;
    this.begin();

    // Triangulate. Yeah, this is slow.

    var smin2 = this.size - 2;

    for ( var z = 1; z < smin2; z ++ ) {

      var z_offset = this.size2 * z;
      var fz = ( z - this.halfsize ) / this.halfsize; //+ 1

      for ( var y = 1; y < smin2; y ++ ) {

        var y_offset = z_offset + this.size * y;
        var fy = ( y - this.halfsize ) / this.halfsize; //+ 1

        for ( var x = 1; x < smin2; x ++ ) {

          var fx = ( x - this.halfsize ) / this.halfsize; //+ 1
          var q = y_offset + x;

          polygonize( fx, fy, fz, q, this.isolation, renderCallback );

        }

      }

    }

    this.end( renderCallback );

  };

  this.generateGeometry = function() {

    var start = 0, geo = new THREE.Geometry();
    var normals = [];

    var geo_callback = function( object ) {

      for ( var i = 0; i < object.count; i ++ ) {

        var vertex = new THREE.Vector3().fromArray( object.positionArray, i * 3 );
        var normal = new THREE.Vector3().fromArray( object.normalArray, i * 3 );

        geo.vertices.push( vertex );
        normals.push( normal );

      }

      var nfaces = object.count / 3;

      for ( i = 0; i < nfaces; i ++ ) {

        var a = ( start + i ) * 3;
        var b = a + 1;
        var c = a + 2;

        var na = normals[ a ];
        var nb = normals[ b ];
        var nc = normals[ c ];

        var face = new THREE.Face3( a, b, c, [ na, nb, nc ] );
        geo.faces.push( face );

      }

      start += nfaces;
      object.count = 0;

    };

    this.render( geo_callback );

    // console.log( "generated " + geo.faces.length + " triangles" );

    return geo;

  };

  function concatenate(resultConstructor, a1, a2, length) {
    let totalLength = a1.length + length;
    let result = new resultConstructor(totalLength);
    result.set(a1, 0);
    result.set(a2.slice(0,length), a1.length);
    return result;
}


  this.generateBufferGeometry = function() {

    var start = 0, geo = new THREE.BufferGeometry();
    var indices = [];
    var posArray = new Float32Array();
    var normArray = new Float32Array();
    var colorArray = new Float32Array();
    var uvArray = new Float32Array();
    var scope = this;

    var geo_callback = function( object ) {

      if (scope.hasPositions) posArray = concatenate(Float32Array, posArray, object.positionArray, object.count*3);
      if (scope.hasNormals) normArray = concatenate(Float32Array, normArray, object.normalArray, object.count*3);
      if (scope.hasColors) colorArray = concatenate(Float32Array, colorArray, object.colorArray, object.count*3);
      if (scope.hasUvs) uvArray = concatenate(Float32Array, uvArray, object.uvArray, object.count*2);

      object.count = 0;

    };

    this.render( geo_callback );

    if (this.hasPositions) geo.addAttribute( 'position', new THREE.BufferAttribute(posArray,3));
    if (this.hasNormals) geo.addAttribute( 'normal', new THREE.BufferAttribute(normArray,3));
    if (this.hasColors) geo.addAttribute( 'color', new THREE.BufferAttribute(colorArray,3));
    if (this.hasUvs) geo.addAttribute( 'uv', new THREE.BufferAttribute(uvArray,2));

    return geo;

  };


  this.init( resolution );

}