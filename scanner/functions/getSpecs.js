function getSpecs()
    {
        var arr = inst._specs.slice();
        if (inst._usage != null)
            arr = arr.concat(inst._helpSpec);
        if (inst._version != null)
            arr = arr.concat(inst._versionSpec);
        return arr;
    }