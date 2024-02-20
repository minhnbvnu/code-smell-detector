function geodesicConvertLine(startLatLng, endLatLng, convertedPoints) {
    var R = 6367000.0; // earth radius in meters (doesn't have to be exact)
    var d2r = Math.PI/180.0;
    var r2d = 180.0/Math.PI;

    // maths based on http://williams.best.vwh.net/avform.htm#Int

    var lat1 = startLatLng.lat * d2r;
    var lat2 = endLatLng.lat * d2r;
    var lng1 = startLatLng.lng * d2r;
    var lng2 = endLatLng.lng * d2r;

    var dLng = lng2-lng1;

    var segments = Math.floor(Math.abs(dLng * R / 5000));

    if (segments > 1) {
      // pre-calculate some constant values for the loop
      var sinLat1 = Math.sin(lat1);
      var sinLat2 = Math.sin(lat2);
      var cosLat1 = Math.cos(lat1);
      var cosLat2 = Math.cos(lat2);

      var sinLat1CosLat2 = sinLat1*cosLat2;
      var sinLat2CosLat1 = sinLat2*cosLat1;

      var cosLat1CosLat2SinDLng = cosLat1*cosLat2*Math.sin(dLng);

      for (var i=1; i < segments; i++) {
        var iLng = lng1+dLng*(i/segments);
        var iLat = Math.atan( (sinLat1CosLat2*Math.sin(lng2-iLng) + sinLat2CosLat1*Math.sin(iLng-lng1))
                              / cosLat1CosLat2SinDLng)

        var point = L.latLng ( [iLat*r2d, iLng*r2d] );
        convertedPoints.push(point);
      }
    }

    convertedPoints.push(L.latLng(endLatLng));
  }