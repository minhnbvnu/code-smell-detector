function push3DValues(value0, value1, value2 = 0) {
    this.vertices[this._pos++] = value0;
    this.vertices[this._pos++] = value1;
    this.vertices[this._pos++] = value2;
}