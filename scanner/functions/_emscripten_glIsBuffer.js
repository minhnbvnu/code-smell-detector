function _emscripten_glIsBuffer(buffer){var b=GL.buffers[buffer];if(!b)return 0;return GLctx.isBuffer(b)}