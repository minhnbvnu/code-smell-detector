function defineReadonlyOuterInterface (obj, props) {
    props.forEach((prop) => {
        const o = {
            get [prop] () {
                throw new TypeError('Illegal invocation');
            }
        };
        const desc = /** @type {PropertyDescriptor} */ (
            Object.getOwnPropertyDescriptor(o, prop)
        );
        Object.defineProperty(obj, prop, desc);
    });
}