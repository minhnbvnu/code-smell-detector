function majorAxis(vec3, idxA, idxB) {
        const axis = [0, 0, 0];
        const idx = Math.abs(vec3[idxA]) > Math.abs(vec3[idxB]) ? idxA : idxB;
        const value = vec3[idx] > 0 ? 1 : -1;
        axis[idx] = value;
        return axis;
    }