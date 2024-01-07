constructor() {

        const add = (name, index, options) => {
            const info = this.allocate(name, options);
            Debug.assert(info.index === index);
        };

        // add default passes in the required order, to match the constants
        add('forward', SHADER_FORWARD, { isForward: true });
        add('forward_hdr', SHADER_FORWARDHDR, { isForward: true });
        add('depth', SHADER_DEPTH);
        add('pick', SHADER_PICK);
        add('shadow', SHADER_SHADOW);
    }