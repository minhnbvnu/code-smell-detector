function applySingleCodeActionCommand(action) {
                const getPath = (path) => toPath(path, currentDirectory, getCanonicalFileName);
                Debug.assertEqual(action.type, "install package");
                return host.installPackage ? host.installPackage({ fileName: getPath(action.file), packageName: action.packageName }) : Promise.reject("Host does not implement `installPackage`");
            }