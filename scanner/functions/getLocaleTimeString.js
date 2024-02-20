function getLocaleTimeString(system) {
            return !system.now ? ( /* @__PURE__ */new Date()).toLocaleTimeString() : (
            // On some systems / builds of Node, there's a non-breaking space between the time and AM/PM.
            // This branch is solely for testing, so just switch it to a normal space for baseline stability.
            // See:
            //     - https://github.com/nodejs/node/issues/45171
            //     - https://github.com/nodejs/node/issues/45753
            system.now().toLocaleTimeString("en-US", { timeZone: "UTC" }).replace("\u202F", " "));
        }