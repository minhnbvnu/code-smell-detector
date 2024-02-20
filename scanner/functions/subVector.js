function subVector(self, v) {
    self[0] -= v[0];
    self[1] -= v[1];
    self[2] -= v[2];
    return self;
}