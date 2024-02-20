function serializeEvent(event) {
        const data = {};
        // support for CustomEvents: the whole `detail` object is serialized
        if (event.detail !== undefined) {
            Object.assign(data, { detail: JSON.parse(JSON.stringify(event.detail)) });
        }
        if (event.type in eventTransforms) {
            Object.assign(data, eventTransforms[event.type](event));
        }
        data.target = serializeDomElement(event.target);
        data.currentTarget =
            event.target === event.currentTarget
                ? data.target
                : serializeDomElement(event.currentTarget);
        data.relatedTarget = serializeDomElement(event.relatedTarget);
        return data;
    }