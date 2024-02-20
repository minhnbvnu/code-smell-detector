function getAccessStack(ref) {
                        let state = ref.typeName;
                        const ids = [];
                        while (!isIdentifier(state)) {
                            ids.unshift(state.right);
                            state = state.left;
                        }
                        ids.unshift(state);
                        return ids;
                    }