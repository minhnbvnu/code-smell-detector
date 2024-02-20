function parseMarkersOption(markers) {
        // `*` is a marker for JSDoc comments.
        if (!markers.includes("*")) {
            return markers.concat("*");
        }
        return markers;
    }