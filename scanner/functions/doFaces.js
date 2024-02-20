function doFaces(){

    //top
    var a = lastVertex;// + cornerVertNumber * 0;
    var b = lastVertex + cornerVertNumber;// * 1;
    var c = lastVertex + cornerVertNumber * 2;
    var d = lastVertex + cornerVertNumber * 3;

    indices.push( a );
    indices.push( b );
    indices.push( c );
    indices.push( a );
    indices.push( c );
    indices.push( d );

    //bottom
    a = lastVertex + cornerVertNumber * 4;// + cornerVertNumber * 0;
    b = lastVertex + cornerVertNumber * 5;// * 1;
    c = lastVertex + cornerVertNumber * 6;
    d = lastVertex + cornerVertNumber * 7;

    indices.push( a );
    indices.push( c );
    indices.push( b );
    indices.push( a );
    indices.push( d );
    indices.push( c );

    //left
    a = 0;
    b = cornerVertNumber;
    c = cornerVertNumber * 4;
    d = cornerVertNumber * 5;

    indices.push( a );
    indices.push( c );
    indices.push( b );
    indices.push( b );
    indices.push( c );
    indices.push( d );

    //right
    a = cornerVertNumber * 2;
    b = cornerVertNumber * 3;
    c = cornerVertNumber * 6;
    d = cornerVertNumber * 7;

    indices.push( a );
    indices.push( c );
    indices.push( b );
    indices.push( b );
    indices.push( c );
    indices.push( d );

    //front
    a = radiusSegments;
    b = radiusSegments + cornerVertNumber * 3;
    c = radiusSegments + cornerVertNumber * 4;
    d = radiusSegments + cornerVertNumber * 7;

    indices.push( a );
    indices.push( b );
    indices.push( c );
    indices.push( b );
    indices.push( d );
    indices.push( c );

    //back
    a = radiusSegments + cornerVertNumber;
    b = radiusSegments + cornerVertNumber * 2;
    c = radiusSegments + cornerVertNumber * 5;
    d = radiusSegments + cornerVertNumber * 6;

    indices.push( a );
    indices.push( c );
    indices.push( b );
    indices.push( b );
    indices.push( c );
    indices.push( d );

  }