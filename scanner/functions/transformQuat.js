function transformQuat(out, a, q) {
        var x = a[0], y = a[1], z = a[2];
        var qx = q[0], qy = q[1], qz = q[2], qw = q[3]; // calculate quat * vec
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        out[3] = a[3];
        return out;
    }