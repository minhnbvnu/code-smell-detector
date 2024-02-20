function needs_install(base_dir, metadata) {
        if (!(0, sys_1.directory_exists)((0, path_1.join)(base_dir, "node_modules")))
            return "New development environment.";
        else if (!is_up_to_date(base_dir, "package.json", metadata))
            return "package.json has changed.";
        else if (!is_up_to_date(base_dir, "package-lock.json", metadata))
            return "package-lock.json has changed.";
        else
            return null;
    }