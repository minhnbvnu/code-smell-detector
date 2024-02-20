function toScreenXY(pos3D) {
        var v = pos3D.project(camera2)
        var percX = (v.x + 1) / 2
        var percY = (-v.y + 1) / 2
        var percZ = (v.z + 1) / 2
        var left = percX * pW
        var top = percY * pH
        var z = 40 + percZ * 1400 // magic!
        return [left, top, z]
    }