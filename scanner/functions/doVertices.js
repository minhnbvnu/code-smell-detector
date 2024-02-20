function doVertices(){

    //corner offsets
    var cornerLayout = [
      new THREE.Vector3(  1 ,  1 ,  1 ),
      new THREE.Vector3(  1 ,  1 , -1 ),
      new THREE.Vector3( -1 ,  1 , -1 ),
      new THREE.Vector3( -1 ,  1 ,  1 ),
      new THREE.Vector3(  1 , -1 ,  1 ),
      new THREE.Vector3(  1 , -1 , -1 ),
      new THREE.Vector3( -1 , -1 , -1 ),
      new THREE.Vector3( -1 , -1 ,  1 )
    ];

    //corner holder
    for ( var j = 0 ; j < 8 ; j ++ ){

      cornerVerts.push([]);
      cornerNormals.push([]);

    }

    //construct 1/8 sphere ==============================

    var PIhalf = Math.PI / 2;

    var cornerOffset = new THREE.Vector3( edgeHalfWidth , edgeHalfHeight , edgeHalfDepth );

    for ( var y = 0; y <= radiusSegments; y ++ ) {

      var v = y / radiusSegments;

      var va = v * PIhalf; //arrange in 90 deg

      var cosVa = Math.cos( va ); //scale of vertical angle

      var sinVa = Math.sin( va );

      if( y == radiusSegments ){

        vertex.set( 0 , 1 , 0 );

        var vert = vertex.clone().multiplyScalar( radius ).add( cornerOffset );

        cornerVerts[0].push( vert );

        vertexPool.push( vert );

        var norm = vertex.clone();

        cornerNormals[0].push( norm );

        normalPool.push( norm );

        continue; //skip row loop

      }

      for ( var x = 0; x <= radiusSegments; x ++ ) {

        var u = x / radiusSegments;

        var ha = u * PIhalf;

        //make 1/8 sphere points
        vertex.x = cosVa * Math.cos( ha );
        vertex.y = sinVa;
        vertex.z = cosVa * Math.sin( ha );

        //copy sphere point, scale by radius, offset by half whd
        var vert = vertex.clone().multiplyScalar( radius ).add( cornerOffset );

        cornerVerts[0].push( vert );

        vertexPool.push( vert );

        //sphere already normalized, just clone

        var norm = vertex.clone().normalize();
        cornerNormals[0].push( norm );
        normalPool.push( norm );

      }

    }

    //distribute corner verts ===========================

    for ( var i = 1 ; i < 8 ; i ++ ){

      for( var j = 0 ; j < cornerVerts[0].length ; j ++ ){

        var vert = cornerVerts[0][j].clone().multiply( cornerLayout[i] );

        cornerVerts[i].push( vert );

        vertexPool.push( vert );

        var norm = cornerNormals[0][j].clone().multiply( cornerLayout[i] );

        cornerNormals[i].push( norm );

        normalPool.push( norm );

      }

    }

  }