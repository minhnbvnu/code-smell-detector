function setLabeledJump(state, isBreak, labelText, labelMarker) {
                if (isBreak) {
                    if (!state.labeledNonLocalBreaks) {
                        state.labeledNonLocalBreaks = /* @__PURE__ */ new Map();
                    }
                    state.labeledNonLocalBreaks.set(labelText, labelMarker);
                }
                else {
                    if (!state.labeledNonLocalContinues) {
                        state.labeledNonLocalContinues = /* @__PURE__ */ new Map();
                    }
                    state.labeledNonLocalContinues.set(labelText, labelMarker);
                }
            }