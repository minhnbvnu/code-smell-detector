function clearMeasures(name) {
            if (name !== void 0)
                durations.delete(name);
            else
                durations.clear();
            performanceImpl == null ? void 0 : performanceImpl.clearMeasures(name);
        }