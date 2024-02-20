function addTrackedEs5Class(name) {
            if (!trackedEs5Classes) {
                trackedEs5Classes = /* @__PURE__ */ new Map();
            }
            trackedEs5Classes.set(name, true);
        }