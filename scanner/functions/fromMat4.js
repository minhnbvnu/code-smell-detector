function fromMat4(out, a) {
        //TODO Optimize this
        var outer = quat.create();
        mat4.getRotation(outer, a);
        var t = new glMatrix.ARRAY_TYPE(3);
        mat4.getTranslation(t, a);
        fromRotationTranslation(out, outer, t);
        return out;
    }