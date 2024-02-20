function decodeType6Shading(mesh, reader) {
    // A special case of Type 7. The p11, p12, p21, p22 automatically filled
    var coords = mesh.coords;
    var colors = mesh.colors;
    var ps = new Int32Array(16); // p00, p10, ..., p30, p01, ..., p33
    var cs = new Int32Array(4); // c00, c30, c03, c33
    while (reader.hasData) {
      var f = reader.readFlag();
      assert(0 <= f && f <= 3, 'Unknown type6 flag');
      var i, ii;
      var pi = coords.length;
      for (i = 0, ii = (f !== 0 ? 8 : 12); i < ii; i++) {
        coords.push(reader.readCoordinate());
      }
      var ci = colors.length;
      for (i = 0, ii = (f !== 0 ? 2 : 4); i < ii; i++) {
        colors.push(reader.readComponents());
      }
      var tmp1, tmp2, tmp3, tmp4;
      switch (f) {
        case 0:
          ps[12] = pi + 3; ps[13] = pi + 4;  ps[14] = pi + 5;  ps[15] = pi + 6;
          ps[ 8] = pi + 2; /* values for 5, 6, 9, 10 are    */ ps[11] = pi + 7;
          ps[ 4] = pi + 1; /* calculated below              */ ps[ 7] = pi + 8;
          ps[ 0] = pi;     ps[ 1] = pi + 11; ps[ 2] = pi + 10; ps[ 3] = pi + 9;
          cs[2] = ci + 1; cs[3] = ci + 2;
          cs[0] = ci;     cs[1] = ci + 3;
          break;
        case 1:
          tmp1 = ps[12]; tmp2 = ps[13]; tmp3 = ps[14]; tmp4 = ps[15];
          ps[12] = pi + 5; ps[13] = pi + 4;  ps[14] = pi + 3;  ps[15] = pi + 2;
          ps[ 8] = pi + 6; /* values for 5, 6, 9, 10 are    */ ps[11] = pi + 1;
          ps[ 4] = pi + 7; /* calculated below              */ ps[ 7] = pi;
          ps[ 0] = tmp1;   ps[ 1] = tmp2;    ps[ 2] = tmp3;    ps[ 3] = tmp4;
          tmp1 = cs[2]; tmp2 = cs[3];
          cs[2] = ci + 1; cs[3] = ci;
          cs[0] = tmp1;   cs[1] = tmp2;
          break;
        case 2:
          ps[12] = ps[15]; ps[13] = pi + 7; ps[14] = pi + 6;   ps[15] = pi + 5;
          ps[ 8] = ps[11]; /* values for 5, 6, 9, 10 are    */ ps[11] = pi + 4;
          ps[ 4] = ps[7];  /* calculated below              */ ps[ 7] = pi + 3;
          ps[ 0] = ps[3];  ps[ 1] = pi;     ps[ 2] = pi + 1;   ps[ 3] = pi + 2;
          cs[2] = cs[3]; cs[3] = ci + 1;
          cs[0] = cs[1]; cs[1] = ci;
          break;
        case 3:
          ps[12] = ps[0];  ps[13] = ps[1];   ps[14] = ps[2];   ps[15] = ps[3];
          ps[ 8] = pi;     /* values for 5, 6, 9, 10 are    */ ps[11] = pi + 7;
          ps[ 4] = pi + 1; /* calculated below              */ ps[ 7] = pi + 6;
          ps[ 0] = pi + 2; ps[ 1] = pi + 3;  ps[ 2] = pi + 4;  ps[ 3] = pi + 5;
          cs[2] = cs[0]; cs[3] = cs[1];
          cs[0] = ci;    cs[1] = ci + 1;
          break;
      }
      // set p11, p12, p21, p22
      ps[5] = coords.length;
      coords.push([
        (-4 * coords[ps[0]][0] - coords[ps[15]][0] +
          6 * (coords[ps[4]][0] + coords[ps[1]][0]) -
          2 * (coords[ps[12]][0] + coords[ps[3]][0]) +
          3 * (coords[ps[13]][0] + coords[ps[7]][0])) / 9,
        (-4 * coords[ps[0]][1] - coords[ps[15]][1] +
          6 * (coords[ps[4]][1] + coords[ps[1]][1]) -
          2 * (coords[ps[12]][1] + coords[ps[3]][1]) +
          3 * (coords[ps[13]][1] + coords[ps[7]][1])) / 9
      ]);
      ps[6] = coords.length;
      coords.push([
        (-4 * coords[ps[3]][0] - coords[ps[12]][0] +
          6 * (coords[ps[2]][0] + coords[ps[7]][0]) -
          2 * (coords[ps[0]][0] + coords[ps[15]][0]) +
          3 * (coords[ps[4]][0] + coords[ps[14]][0])) / 9,
        (-4 * coords[ps[3]][1] - coords[ps[12]][1] +
          6 * (coords[ps[2]][1] + coords[ps[7]][1]) -
          2 * (coords[ps[0]][1] + coords[ps[15]][1]) +
          3 * (coords[ps[4]][1] + coords[ps[14]][1])) / 9
      ]);
      ps[9] = coords.length;
      coords.push([
        (-4 * coords[ps[12]][0] - coords[ps[3]][0] +
          6 * (coords[ps[8]][0] + coords[ps[13]][0]) -
          2 * (coords[ps[0]][0] + coords[ps[15]][0]) +
          3 * (coords[ps[11]][0] + coords[ps[1]][0])) / 9,
        (-4 * coords[ps[12]][1] - coords[ps[3]][1] +
          6 * (coords[ps[8]][1] + coords[ps[13]][1]) -
          2 * (coords[ps[0]][1] + coords[ps[15]][1]) +
          3 * (coords[ps[11]][1] + coords[ps[1]][1])) / 9
      ]);
      ps[10] = coords.length;
      coords.push([
        (-4 * coords[ps[15]][0] - coords[ps[0]][0] +
          6 * (coords[ps[11]][0] + coords[ps[14]][0]) -
          2 * (coords[ps[12]][0] + coords[ps[3]][0]) +
          3 * (coords[ps[2]][0] + coords[ps[8]][0])) / 9,
        (-4 * coords[ps[15]][1] - coords[ps[0]][1] +
          6 * (coords[ps[11]][1] + coords[ps[14]][1]) -
          2 * (coords[ps[12]][1] + coords[ps[3]][1]) +
          3 * (coords[ps[2]][1] + coords[ps[8]][1])) / 9
      ]);
      mesh.figures.push({
        type: 'patch',
        coords: new Int32Array(ps), // making copies of ps and cs
        colors: new Int32Array(cs)
      });
    }
  }