function pollViewport() {
                var viewport = nextState.viewport;
                var scissorBox = nextState.scissor_box;
                viewport[0] = viewport[1] = scissorBox[0] = scissorBox[1] = 0;
                contextState.viewportWidth =
                    contextState.framebufferWidth =
                        contextState.drawingBufferWidth =
                            viewport[2] =
                                scissorBox[2] = gl.drawingBufferWidth;
                contextState.viewportHeight =
                    contextState.framebufferHeight =
                        contextState.drawingBufferHeight =
                            viewport[3] =
                                scissorBox[3] = gl.drawingBufferHeight;
            }