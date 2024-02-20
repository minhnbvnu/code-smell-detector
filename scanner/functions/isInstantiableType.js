function isInstantiableType(type) {
        return (type.flags & ts.TypeFlags.Instantiable) !== 0;
    }