function stateVariable(sname, func, init) {
                var name = propName(sname);
                GL_STATE_NAMES.push(sname);
                if (Array.isArray(init)) {
                    currentState[name] = init.slice();
                    nextState[name] = init.slice();
                }
                else {
                    currentState[name] = nextState[name] = init;
                }
                GL_VARIABLES[name] = func;
            }