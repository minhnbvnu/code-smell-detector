function configurePackageDir(packages, currentPackages, dir) {
        var i, location, pkgObj;
        for (i = 0; (pkgObj = currentPackages[i]); i++) {
            pkgObj = typeof pkgObj === "string" ? { name: pkgObj } : pkgObj;
            location = pkgObj.location;

            //Add dir to the path, but avoid paths that start with a slash
            //or have a colon (indicates a protocol)
            if (dir && (!location || (location.indexOf("/") !== 0 && location.indexOf(":") === -1))) {
                pkgObj.location = dir + "/" + (pkgObj.location || pkgObj.name);
            }

            //Normalize package paths.
            pkgObj.location = pkgObj.location || pkgObj.name;
            pkgObj.lib = pkgObj.lib || "lib";
            pkgObj.main = pkgObj.main || "main";

            packages[pkgObj.name] = pkgObj;
        }
    }