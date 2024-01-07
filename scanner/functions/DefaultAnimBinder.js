constructor(graph) {
        this.graph = graph;

        if (!graph) return;

        this._mask = null;

        const nodes = { };
        // cache node names so we can quickly resolve animation paths
        const flatten = function (node) {
            nodes[node.name] = node;
            for (let i = 0; i < node.children.length; ++i) {
                flatten(node.children[i]);
            }
        };
        flatten(graph);
        this.nodes = nodes;
        this.targetCache = {};
        // #if _DEBUG
        this.visitedFallbackGraphPaths = {};
        // #endif

        const findMeshInstances = function (node) {

            // walk up to the first parent node of entity type (skips internal nodes of Model)
            let object = node;
            while (object && !(object instanceof Entity)) {
                object = object.parent;
            }

            // get meshInstances from either model or render component
            let meshInstances;
            if (object) {
                if (object.render) {
                    meshInstances = object.render.meshInstances;
                } else if (object.model) {
                    meshInstances = object.model.meshInstances;
                }
            }
            return meshInstances;
        };

        this.nodeCounts = {};               // map of node path -> count
        this.activeNodes = [];              // list of active nodes
        this.handlers = {
            'localPosition': function (node) {
                const object = node.localPosition;
                const func = function (value) {
                    object.set(...value);
                };
                return DefaultAnimBinder.createAnimTarget(func, 'vector', 3, node, 'localPosition');
            },

            'localRotation': function (node) {
                const object = node.localRotation;
                const func = function (value) {
                    object.set(...value);
                };
                return DefaultAnimBinder.createAnimTarget(func, 'quaternion', 4, node, 'localRotation');
            },

            'localScale': function (node) {
                const object = node.localScale;
                const func = function (value) {
                    object.set(...value);
                };
                return DefaultAnimBinder.createAnimTarget(func, 'vector', 3, node, 'localScale');
            },

            'weight': function (node, weightName) {
                if (weightName.indexOf('name.') === 0) {
                    weightName = weightName.replace('name.', '');
                } else {
                    weightName = Number(weightName);
                }
                const meshInstances = findMeshInstances(node);
                let setters;
                if (meshInstances) {
                    for (let i = 0; i < meshInstances.length; ++i) {
                        if (meshInstances[i].node.name === node.name && meshInstances[i].morphInstance) {
                            const morphInstance = meshInstances[i].morphInstance;
                            const func = (value) => {
                                morphInstance.setWeight(weightName, value[0]);
                            };
                            if (!setters) setters = [];
                            setters.push(func);
                        }
                    }
                }
                if (setters) {
                    const callSetters = (value) => {
                        for (let i = 0; i < setters.length; ++i) {
                            setters[i](value);
                        }
                    };
                    return DefaultAnimBinder.createAnimTarget(callSetters, 'number', 1, node, `weight.${weightName}`);
                }
                return null;
            },
            'materialTexture': (node, textureName) => {
                const meshInstances = findMeshInstances(node);
                if (meshInstances) {
                    let meshInstance;
                    for (let i = 0; i < meshInstances.length; ++i) {
                        if (meshInstances[i].node.name === node.name) {
                            meshInstance = meshInstances[i];
                            break;
                        }
                    }
                    if (meshInstance) {
                        const func = (value) => {
                            const textureAsset = this.animComponent.system.app.assets.get(value[0]);
                            if (textureAsset && textureAsset.resource && textureAsset.type === 'texture') {
                                meshInstance.material[textureName] = textureAsset.resource;
                                meshInstance.material.update();
                            }
                        };
                        return DefaultAnimBinder.createAnimTarget(func, 'vector', 1, node, 'materialTexture', 'material');
                    }
                }

                return null;
            }
        };
    }