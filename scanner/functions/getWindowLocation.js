function getWindowLocation() {
    if (typeof window === "undefined") {
        // Fallback
        return getDefaultWindowLocation();
    }

    if (typeof window.location !== "undefined") {
        // Browsers place location on window
        return window.location;
    }

    if (
        typeof window.window !== "undefined" &&
        typeof window.window.location !== "undefined"
    ) {
        // React Native on Android places location on window.window
        return window.window.location;
    }

    return getDefaultWindowLocation();
}