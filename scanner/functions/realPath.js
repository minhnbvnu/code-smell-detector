function realPath(path, host, traceEnabled) {
            if (!host.realpath) {
                return path;
            }
            const real = normalizePath(host.realpath(path));
            if (traceEnabled) {
                trace(host, Diagnostics.Resolving_real_path_for_0_result_1, path, real);
            }
            Debug.assert(host.fileExists(real), `${path} linked to nonexistent file ${real}`);
            return real;
        }