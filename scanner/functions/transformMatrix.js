function transformMatrix(self, v) {
    var vals = self;
    var x  = vals[0] * v[0] + vals[1] * v[1] + vals[2] * v[2] + vals[3];
    var y  = vals[4] * v[0] + vals[5] * v[1] + vals[6] * v[2] + vals[7];
    var z  = vals[8] * v[0] + vals[9] * v[1] + vals[10] * v[2] + vals[11];
    return [x, y, z];
}