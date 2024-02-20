function disposeMeshRecursively(mesh) {
        mesh.removeFromParent();
        if (mesh.geometry)
            mesh.geometry.dispose();
        if (mesh.material) {
            if (Array.isArray(mesh.material))
                mesh.material.forEach((mat) => mat.dispose());
            else
                mesh.material.dispose();
        }
        if (mesh.children && mesh.children.length) {
            mesh.children.forEach((child) => disposeMeshRecursively(child));
        }
        mesh.children.length = 0;
    }