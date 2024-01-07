function addSegment( cp, p0, p1, t0, t1 ){
      let length = math.dist( p0, p1 );
      let prevSegment = cp.segments[ cp.segments.length - 1 ];
      let segment = {
        p0: p0,
        p1: p1,
        t0: t0,
        t1: t1,
        startDist: prevSegment ? prevSegment.startDist + prevSegment.length : 0,
        length: length
      };

      cp.segments.push( segment );

      cp.length += length;
    }