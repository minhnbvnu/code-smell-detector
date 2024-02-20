function packageIdToPackageName({ name, subModuleName }) {
            return subModuleName ? `${name}/${subModuleName}` : name;
        }