function _emscripten_glIsRenderbuffer(renderbuffer){var rb=GL.renderbuffers[renderbuffer];if(!rb)return 0;return GLctx.isRenderbuffer(rb)}