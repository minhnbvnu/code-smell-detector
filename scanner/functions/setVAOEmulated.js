function setVAOEmulated(vao) {
                if (vao === state.currentVAO) {
                    return;
                }
                if (vao) {
                    vao.bindAttrs();
                }
                else {
                    var exti = extInstanced();
                    for (var i = 0; i < attributeBindings.length; ++i) {
                        var binding = attributeBindings[i];
                        if (binding.buffer) {
                            gl.enableVertexAttribArray(i);
                            binding.buffer.bind();
                            gl.vertexAttribPointer(i, binding.size, binding.type, binding.normalized, binding.stride, binding.offfset);
                            if (exti && binding.divisor) {
                                exti.vertexAttribDivisorANGLE(i, binding.divisor);
                            }
                        }
                        else {
                            gl.disableVertexAttribArray(i);
                            gl.vertexAttrib4f(i, binding.x, binding.y, binding.z, binding.w);
                        }
                    }
                    if (drawState.elements) {
                        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, drawState.elements.buffer.buffer);
                    }
                    else {
                        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, null);
                    }
                }
                state.currentVAO = vao;
            }