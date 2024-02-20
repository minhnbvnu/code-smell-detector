function defineOuterInterface (obj, props) {
    props.forEach((prop) => {
        const o = {
            get [prop] () {
                throw new TypeError('Illegal invocation');
            },
            // @ts-expect-error Deliberately errs
            set [prop] (val) {
                throw new TypeError('Illegal invocation');
            }
        };
        const desc = /** @type {PropertyDescriptor} */ (
            Object.getOwnPropertyDescriptor(o, prop)
        );
        Object.defineProperty(obj, prop, desc);
    });
}