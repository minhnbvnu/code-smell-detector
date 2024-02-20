function get_package(base, path) {
                    const root = (0, path_1.join)(base, path);
                    base = (0, path_1.normalize)(base);
                    path = (0, path_1.normalize)(root);
                    while (path != base) {
                        if ((0, sys_1.directory_exists)(path)) {
                            const pkg_path = (0, path_1.join)(path, "package.json");
                            if ((0, sys_1.file_exists)(pkg_path))
                                return { dir: path, pkg: JSON.parse((0, sys_1.read)(pkg_path)) };
                        }
                        path = (0, path_1.dirname)(path);
                    }
                    throw new error_1.BuildError("linker", `can't resolve package.json for ${root}`);
                }