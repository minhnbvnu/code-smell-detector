function destroyRT(rt) {
            // this can cause ref count to be 0 and texture destroyed
            LightmapCache.decRef(rt.colorBuffer);

            // destroy render target itself
            rt.destroy();
        }