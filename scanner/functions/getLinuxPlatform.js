function getLinuxPlatform() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.SETUP_R_LINUX_PLATFORM) {
            return process.env.SETUP_R_LINUX_PLATFORM;
        }
        else {
            const info = yield (0, linux_os_info_1.default)();
            return "linux-" + info.id + "-" + info.version_id;
        }
    });
}