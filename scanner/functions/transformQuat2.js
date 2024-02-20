function transformQuat2(out, a2, q) {
    var x = a2[0], y = a2[1], z = a2[2];
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z;
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a2[3];
    return out;
  }