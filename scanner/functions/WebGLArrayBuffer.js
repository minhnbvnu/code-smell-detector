constructor(type, usage) {
    /**
     * @private
     * @type {Float32Array|Uint32Array|null}
     */
    this.array_ = null;

    /**
     * @private
     * @type {number}
     */
    this.type_ = type;

    assert(
      type === ARRAY_BUFFER || type === ELEMENT_ARRAY_BUFFER,
      'A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`',
    );

    /**
     * @private
     * @type {number}
     */
    this.usage_ = usage !== undefined ? usage : BufferUsage.STATIC_DRAW;
  }