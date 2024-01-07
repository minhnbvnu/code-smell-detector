function convertValue(value, type) {
    if (!value) {
        return value;
    }

    switch (type) {
        case 'rgb':
            if (value instanceof Color) {
                return value.clone();
            }
            return new Color(value[0], value[1], value[2]);
        case 'rgba':
            if (value instanceof Color) {
                return value.clone();
            }
            return new Color(value[0], value[1], value[2], value[3]);
        case 'vec2':
            if (value instanceof Vec2) {
                return value.clone();
            }
            return new Vec2(value[0], value[1]);
        case 'vec3':
            if (value instanceof Vec3) {
                return value.clone();
            }
            return new Vec3(value[0], value[1], value[2]);
        case 'vec4':
            if (value instanceof Vec4) {
                return value.clone();
            }
            return new Vec4(value[0], value[1], value[2], value[3]);
        case 'boolean':
        case 'number':
        case 'string':
            return value;
        case 'entity':
            return value; // Entity fields should just be a string guid
        default:
            throw new Error('Could not convert unhandled type: ' + type);
    }
}