function isValidNode(x) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return x != null && typeof x === 'object' && typeof x.type === 'string';
    }