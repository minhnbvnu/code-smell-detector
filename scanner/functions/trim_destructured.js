function trim_destructured(node, value, process, drop) {
            var trimmer = new TreeTransformer(function(node) {
                if (node instanceof AST_DefaultValue) {
                    if (compressor.option("default_values") && value && value.is_defined(compressor)) {
                        node = node.name;
                    } else {
                        var save_drop = drop;
                        drop = false;
                        var trimmed = trim_default(trimmer, node);
                        drop = save_drop;
                        if (!trimmed && drop && value) value = value.drop_side_effect_free(compressor);
                        return trimmed;
                    }
                }
                if (node instanceof AST_DestructuredArray) {
                    var save_drop = drop;
                    var save_value = value;
                    if (value instanceof AST_SymbolRef) {
                        drop = false;
                        value = value.fixed_value();
                    }
                    var values = value instanceof AST_Array && value.elements;
                    var elements = [], newValues = drop && [], pos = 0;
                    node.elements.forEach(function(element, index) {
                        value = values && values[index];
                        if (value instanceof AST_Hole) {
                            value = null;
                        } else if (value instanceof AST_Spread) {
                            if (drop) {
                                newValues.length = pos;
                                fill_holes(save_value, newValues);
                                [].push.apply(newValues, values.slice(index));
                                save_value.elements = newValues;
                            }
                            value = values = false;
                        }
                        element = element.transform(trimmer);
                        if (element) elements[pos] = element;
                        if (drop && value) newValues[pos] = value;
                        if (element || value || !drop || !values) pos++;
                    });
                    value = values && make_node(AST_Array, save_value, {
                        elements: values.slice(node.elements.length),
                    });
                    if (node.rest) {
                        var was_drop = drop;
                        drop = false;
                        node.rest = node.rest.transform(compressor.option("rests") ? trimmer : tt);
                        drop = was_drop;
                        if (node.rest) elements.length = pos;
                    }
                    if (drop) {
                        if (value && !node.rest) value = value.drop_side_effect_free(compressor);
                        if (value instanceof AST_Array) {
                            value = value.elements;
                        } else if (value instanceof AST_Sequence) {
                            value = value.expressions;
                        } else if (value) {
                            value = [ value ];
                        }
                        if (value && value.length) {
                            newValues.length = pos;
                            [].push.apply(newValues, value);
                        }
                    }
                    value = save_value;
                    drop = save_drop;
                    if (values && newValues) {
                        fill_holes(value, newValues);
                        value.elements = newValues;
                    }
                    if (!node.rest && (value instanceof AST_Array
                        || value && value.is_string(compressor))) switch (elements.length) {
                      case 0:
                        if (drop) value = value.drop_side_effect_free(compressor);
                        return null;
                      case 1:
                        if (!drop) break;
                        var sym = elements[0];
                        if (sym.has_side_effects(compressor)) break;
                        if (value.has_side_effects(compressor) && sym.match_symbol(function(node) {
                            return node instanceof AST_PropAccess;
                        })) break;
                        value = make_node(AST_Sub, node, {
                            expression: value,
                            property: make_node(AST_Number, node, { value: 0 }),
                        });
                        return sym;
                    }
                    fill_holes(node, elements);
                    node.elements = elements;
                    return node;
                }
                if (node instanceof AST_DestructuredObject) {
                    var save_drop = drop;
                    var save_value = value;
                    if (value instanceof AST_SymbolRef) {
                        drop = false;
                        value = value.fixed_value();
                    }
                    var prop_keys, prop_map;
                    if (value instanceof AST_Object) {
                        prop_keys = [];
                        prop_map = Object.create(null);
                        value.properties.forEach(function(prop, index) {
                            if (prop instanceof AST_Spread) return prop_map = false;
                            var key = prop.key;
                            if (key instanceof AST_Node) key = key.evaluate(compressor, true);
                            if (key instanceof AST_Node) {
                                prop_map = false;
                            } else if (prop_map && !(prop instanceof AST_ObjectSetter)) {
                                prop_map[key] = prop;
                            }
                            prop_keys[index] = key;
                        });
                    }
                    if (node.rest) {
                        value = false;
                        node.rest = node.rest.transform(compressor.option("rests") ? trimmer : tt);
                    }
                    var can_drop = Object.create(null);
                    var drop_keys = drop && Object.create(null);
                    var properties = [];
                    node.properties.map(function(prop) {
                        var key = prop.key;
                        if (key instanceof AST_Node) {
                            prop.key = key = key.transform(tt);
                            key = key.evaluate(compressor, true);
                        }
                        if (key instanceof AST_Node) {
                            drop_keys = false;
                        } else {
                            can_drop[key] = !(key in can_drop);
                        }
                        return key;
                    }).forEach(function(key, index) {
                        var prop = node.properties[index], trimmed;
                        if (key instanceof AST_Node) {
                            drop = false;
                            value = false;
                            trimmed = prop.value.transform(trimmer) || retain_lhs(prop.value);
                        } else {
                            drop = drop_keys && can_drop[key];
                            var mapped = prop_map && prop_map[key];
                            if (mapped) {
                                value = mapped.value;
                                if (value instanceof AST_Accessor) value = false;
                            } else {
                                value = false;
                            }
                            trimmed = prop.value.transform(trimmer);
                            if (!trimmed) {
                                if (node.rest || retain_key(prop)) trimmed = retain_lhs(prop.value);
                                if (drop_keys && !(key in drop_keys)) {
                                    if (mapped) {
                                        drop_keys[key] = mapped;
                                        if (value === null) {
                                            prop_map[key] = retain_key(mapped) && make_node(AST_ObjectKeyVal, mapped, {
                                                key: mapped.key,
                                                value: make_node(AST_Number, mapped, { value: 0 }),
                                            });
                                        }
                                    } else {
                                        drop_keys[key] = true;
                                    }
                                }
                            } else if (drop_keys) {
                                drop_keys[key] = false;
                            }
                            if (value) mapped.value = value;
                        }
                        if (trimmed) {
                            prop.value = trimmed;
                            properties.push(prop);
                        }
                    });
                    value = save_value;
                    drop = save_drop;
                    if (drop_keys && prop_keys) value.properties = List(value.properties, function(prop, index) {
                        if (prop instanceof AST_Spread) return prop;
                        var key = prop_keys[index];
                        if (key instanceof AST_Node) return prop;
                        if (key in drop_keys) {
                            var mapped = drop_keys[key];
                            if (!mapped) return prop;
                            if (mapped === prop) return prop_map[key] || List.skip;
                        } else if (node.rest) {
                            return prop;
                        }
                        var trimmed = prop.value.drop_side_effect_free(compressor);
                        if (trimmed) {
                            prop.value = trimmed;
                            return prop;
                        }
                        return retain_key(prop) ? make_node(AST_ObjectKeyVal, prop, {
                            key: prop.key,
                            value: make_node(AST_Number, prop, { value: 0 }),
                        }) : List.skip;
                    });
                    if (value && !node.rest) switch (properties.length) {
                      case 0:
                        if (value.may_throw_on_access(compressor, true)) break;
                        if (drop) value = value.drop_side_effect_free(compressor);
                        return null;
                      case 1:
                        if (!drop) break;
                        var prop = properties[0];
                        if (prop.key instanceof AST_Node) break;
                        if (prop.value.has_side_effects(compressor)) break;
                        if (value.has_side_effects(compressor) && prop.value.match_symbol(function(node) {
                            return node instanceof AST_PropAccess;
                        })) break;
                        value = make_node(AST_Sub, node, {
                            expression: value,
                            property: make_node_from_constant(prop.key, prop),
                        });
                        return prop.value;
                    }
                    node.properties = properties;
                    return node;
                }
                if (node instanceof AST_Hole) {
                    node = null;
                } else {
                    node = process(node);
                }
                if (!node && drop && value) value = value.drop_side_effect_free(compressor);
                return node;
            });
            return {
                name: node.transform(trimmer),
                value: value,
            };

            function retain_key(prop) {
                return prop.key instanceof AST_Node && prop.key.has_side_effects(compressor);
            }

            function retain_lhs(node) {
                if (node instanceof AST_DefaultValue) return retain_lhs(node.name);
                if (node instanceof AST_Destructured) {
                    if (value === null) {
                        value = make_node(AST_Number, node, { value: 0 });
                    } else if (value && (value.tail_node().write_only === true
                        || value.may_throw_on_access(compressor, true))) {
                        value = make_node(AST_Array, node, {
                            elements: value instanceof AST_Sequence ? value.expressions : [ value ],
                        });
                    }
                    return make_node(AST_DestructuredObject, node, { properties: [] });
                }
                node.__unused = null;
                return node;
            }
        }