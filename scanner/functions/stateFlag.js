function stateFlag(sname, cap, init) {
                var name = propName(sname);
                GL_STATE_NAMES.push(sname);
                nextState[name] = currentState[name] = !!init;
                GL_FLAGS[name] = cap;
            }