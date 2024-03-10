                function updateVAO(options) {
                    var attributes;
                    if (Array.isArray(options)) {
                        attributes = options;
                        if (vao.elements && vao.ownsElements) {
                            vao.elements.destroy();
                        }
                        vao.elements = null;
                        vao.ownsElements = false;
                        vao.offset = 0;
                        vao.count = 0;
                        vao.instances = -1;
                        vao.primitive = 4;
                    }
                    else {
                        check$1(typeof options === 'object', 'invalid arguments for create vao');
                        check$1('attributes' in options, 'must specify attributes for vao');
                        if (options.elements) {
                            var elements = options.elements;
                            if (vao.ownsElements) {
                                if (typeof elements === 'function' && elements._reglType === 'elements') {
                                    vao.elements.destroy();
                                    vao.ownsElements = false;
                                }
                                else {
                                    vao.elements(elements);
                                    vao.ownsElements = false;
                                }
                            }
                            else if (elementState.getElements(options.elements)) {
                                vao.elements = options.elements;
                                vao.ownsElements = false;
                            }
                            else {
                                vao.elements = elementState.create(options.elements);
                                vao.ownsElements = true;
                            }
                        }
                        else {
                            vao.elements = null;
                            vao.ownsElements = false;
                        }
                        attributes = options.attributes;
                        // set default vao
                        vao.offset = 0;
                        vao.count = -1;
                        vao.instances = -1;
                        vao.primitive = 4;
                        // copy element properties
                        if (vao.elements) {
                            vao.count = vao.elements._elements.vertCount;
                            vao.primitive = vao.elements._elements.primType;
                        }
                        if ('offset' in options) {
                            vao.offset = options.offset | 0;
                        }
                        if ('count' in options) {
                            vao.count = options.count | 0;
                        }
                        if ('instances' in options) {
                            vao.instances = options.instances | 0;
                        }
                        if ('primitive' in options) {
                            check$1(options.primitive in primTypes, 'bad primitive type: ' + options.primitive);
                            vao.primitive = primTypes[options.primitive];
                        }
                        check$1.optional(() => {
                            var keys = Object.keys(options);
                            for (var i = 0; i < keys.length; ++i) {
                                check$1(VAO_OPTIONS.indexOf(keys[i]) >= 0, 'invalid option for vao: "' + keys[i] + '" valid options are ' + VAO_OPTIONS);
                            }
                        });
                        check$1(Array.isArray(attributes), 'attributes must be an array');
                    }
                    check$1(attributes.length < NUM_ATTRIBUTES, 'too many attributes');
                    check$1(attributes.length > 0, 'must specify at least one attribute');
                    var bufUpdated = {};
                    var nattributes = vao.attributes;
                    nattributes.length = attributes.length;
                    for (var i = 0; i < attributes.length; ++i) {
                        var spec = attributes[i];
                        var rec = nattributes[i] = new AttributeRecord();
                        var data = spec.data || spec;
                        if (Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data)) {
                            var buf;
                            if (vao.buffers[i]) {
                                buf = vao.buffers[i];
                                if (isTypedArray(data) && buf._buffer.byteLength >= data.byteLength) {
                                    buf.subdata(data);
                                }
                                else {
                                    buf.destroy();
                                    vao.buffers[i] = null;
                                }
                            }
                            if (!vao.buffers[i]) {
                                buf = vao.buffers[i] = bufferState.create(spec, GL_ARRAY_BUFFER$1, false, true);
                            }
                            rec.buffer = bufferState.getBuffer(buf);
                            rec.size = rec.buffer.dimension | 0;
                            rec.normalized = false;
                            rec.type = rec.buffer.dtype;
                            rec.offset = 0;
                            rec.stride = 0;
                            rec.divisor = 0;
                            rec.state = 1;
                            bufUpdated[i] = 1;
                        }
                        else if (bufferState.getBuffer(spec)) {
                            rec.buffer = bufferState.getBuffer(spec);
                            rec.size = rec.buffer.dimension | 0;
                            rec.normalized = false;
                            rec.type = rec.buffer.dtype;
                            rec.offset = 0;
                            rec.stride = 0;
                            rec.divisor = 0;
                            rec.state = 1;
                        }
                        else if (bufferState.getBuffer(spec.buffer)) {
                            rec.buffer = bufferState.getBuffer(spec.buffer);
                            rec.size = ((+spec.size) || rec.buffer.dimension) | 0;
                            rec.normalized = !!spec.normalized || false;
                            if ('type' in spec) {
                                check$1.parameter(spec.type, glTypes, 'invalid buffer type');
                                rec.type = glTypes[spec.type];
                            }
                            else {
                                rec.type = rec.buffer.dtype;
                            }
                            rec.offset = (spec.offset || 0) | 0;
                            rec.stride = (spec.stride || 0) | 0;
                            rec.divisor = (spec.divisor || 0) | 0;
                            rec.state = 1;
                            check$1(rec.size >= 1 && rec.size <= 4, 'size must be between 1 and 4');
                            check$1(rec.offset >= 0, 'invalid offset');
                            check$1(rec.stride >= 0 && rec.stride <= 255, 'stride must be between 0 and 255');
                            check$1(rec.divisor >= 0, 'divisor must be positive');
                            check$1(!rec.divisor || !!extensions.angle_instanced_arrays, 'ANGLE_instanced_arrays must be enabled to use divisor');
                        }
                        else if ('x' in spec) {
                            check$1(i > 0, 'first attribute must not be a constant');
                            rec.x = +spec.x || 0;
                            rec.y = +spec.y || 0;
                            rec.z = +spec.z || 0;
                            rec.w = +spec.w || 0;
                            rec.state = 2;
                        }
                        else {
                            check$1(false, 'invalid attribute spec for location ' + i);
                        }
                    }
                    // retire unused buffers
                    for (var j = 0; j < vao.buffers.length; ++j) {
                        if (!bufUpdated[j] && vao.buffers[j]) {
                            vao.buffers[j].destroy();
                            vao.buffers[j] = null;
                        }
                    }
                    vao.refresh();
                    return updateVAO;
                }