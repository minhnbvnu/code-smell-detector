function appplyRadius(radius) {

    var vertex = new Vector3();

    // iterate over the entire buffer and apply the radius to each vertex

    for (var i = 0; i < vertexBuffer.length; i += 3) {

      vertex.x = vertexBuffer[i + 0];
      vertex.y = vertexBuffer[i + 1];
      vertex.z = vertexBuffer[i + 2];

      vertex.normalize().multiplyScalar(radius);

      vertexBuffer[i + 0] = vertex.x;
      vertexBuffer[i + 1] = vertex.y;
      vertexBuffer[i + 2] = vertex.z;

    }

  }