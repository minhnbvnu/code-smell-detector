function mangleScopedPackageNameWithTrace(packageName, state) {
            const mangled = mangleScopedPackageName(packageName);
            if (state.traceEnabled && mangled !== packageName) {
                trace(state.host, Diagnostics.Scoped_package_detected_looking_in_0, mangled);
            }
            return mangled;
        }