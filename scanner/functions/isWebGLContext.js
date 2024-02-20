function isWebGLContext(obj) {
            return (typeof obj.drawArrays === 'function' ||
                typeof obj.drawElements === 'function');
        }