constructor(name, type, count = 0) {

        // just a name
        this.shortName = name;

        // name with [0] if this is an array
        this.name = count ? `${name}[0]` : name;

        this.type = type;

        this.updateType = type;
        if (count) {

            switch (type) {
                case UNIFORMTYPE_FLOAT: this.updateType = UNIFORMTYPE_FLOATARRAY; break;
                case UNIFORMTYPE_VEC2: this.updateType = UNIFORMTYPE_VEC2ARRAY; break;
                case UNIFORMTYPE_VEC3: this.updateType = UNIFORMTYPE_VEC3ARRAY; break;
                case UNIFORMTYPE_VEC4: this.updateType = UNIFORMTYPE_VEC4ARRAY; break;
                case UNIFORMTYPE_MAT4: this.updateType = UNIFORMTYPE_MAT4ARRAY; break;

                default:
                    Debug.error(`Uniform array of type ${uniformTypeToName[type]} is not supported when processing uniform '${name}'.`);
                    Debug.call(() => {
                        this.invalid = true;
                    });
                    break;
            }
        }

        this.count = count;
        Debug.assert(!isNaN(count), `Unsupported uniform: ${name}[${count}]`);
        Debug.call(() => {
            if (isNaN(count))
                this.invalid = true;
        });

        let elementSize = uniformTypeToNumElements[type];
        Debug.assert(elementSize, `Unhandled uniform format ${type} used for ${name}`);

        // element size for arrays is aligned up to vec4
        if (count)
            elementSize = math.roundUp(elementSize, 4);

        this.byteSize = elementSize * 4;
        if (count)
            this.byteSize *= count;

        Debug.assert(this.byteSize, `Unknown byte size for uniform format ${type} used for ${name}`);
    }