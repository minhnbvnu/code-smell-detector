function getModuleTransformForFile(file) {
                return file.impliedNodeFormat === 99 /* ESNext */ ? esmTransform : cjsTransform;
            }