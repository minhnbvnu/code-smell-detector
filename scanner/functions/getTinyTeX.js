function getTinyTeX() {
    return __awaiter(this, void 0, void 0, function* () {
        if (IS_WINDOWS) {
            yield installTinyTeXWindows();
        }
        else {
            yield installTinyTeXPosix();
        }
    });
}