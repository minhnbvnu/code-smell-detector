function acquireFortranMacOS(version) {
    return __awaiter(this, void 0, void 0, function* () {
        if (semver.lt(version, "4.3.0")) {
            return acquireFortranMacOSOld();
        }
        else {
            return acquireFortranMacOSNew();
        }
    });
}