function createREGLEnvironment() {
                var env = createEnvironment();
                var link = env.link;
                var global = env.global;
                env.id = drawCallCounter++;
                env.batchId = '0';
                // link shared state
                var SHARED = link(sharedState);
                var shared = env.shared = {
                    props: 'a0'
                };
                Object.keys(sharedState).forEach(function (prop) {
                    shared[prop] = global.def(SHARED, '.', prop);
                });
                // Inject runtime assertion stuff for debug builds
                check$1.optional(function () {
                    env.CHECK = link(check$1);
                    env.commandStr = check$1.guessCommand();
                    env.command = link(env.commandStr);
                    env.assert = function (block, pred, message) {
                        block('if(!(', pred, '))', this.CHECK, '.commandRaise(', link(message), ',', this.command, ');');
                    };
                    sharedConstants.invalidBlendCombinations = invalidBlendCombinations;
                });
                // Copy GL state variables over
                var nextVars = env.next = {};
                var currentVars = env.current = {};
                Object.keys(GL_VARIABLES).forEach(function (variable) {
                    if (Array.isArray(currentState[variable])) {
                        nextVars[variable] = global.def(shared.next, '.', variable);
                        currentVars[variable] = global.def(shared.current, '.', variable);
                    }
                });
                // Initialize shared constants
                var constants = env.constants = {};
                Object.keys(sharedConstants).forEach(function (name) {
                    constants[name] = global.def(JSON.stringify(sharedConstants[name]));
                });
                // Helper function for calling a block
                env.invoke = function (block, x) {
                    switch (x.type) {
                        case DYN_FUNC$1:
                            var argList = [
                                'this',
                                shared.context,
                                shared.props,
                                env.batchId
                            ];
                            return block.def(link(x.data), '.call(', argList.slice(0, Math.max(x.data.length + 1, 4)), ')');
                        case DYN_PROP$1:
                            return block.def(shared.props, x.data);
                        case DYN_CONTEXT$1:
                            return block.def(shared.context, x.data);
                        case DYN_STATE$1:
                            return block.def('this', x.data);
                        case DYN_THUNK:
                            x.data.append(env, block);
                            return x.data.ref;
                        case DYN_CONSTANT$1:
                            return x.data.toString();
                        case DYN_ARRAY$1:
                            return x.data.map(function (y) {
                                return env.invoke(block, y);
                            });
                    }
                };
                env.attribCache = {};
                var scopeAttribs = {};
                env.scopeAttrib = function (name) {
                    var id = stringStore.id(name);
                    if (id in scopeAttribs) {
                        return scopeAttribs[id];
                    }
                    var binding = attributeState.scope[id];
                    if (!binding) {
                        binding = attributeState.scope[id] = new AttributeRecord();
                    }
                    var result = scopeAttribs[id] = link(binding);
                    return result;
                };
                return env;
            }