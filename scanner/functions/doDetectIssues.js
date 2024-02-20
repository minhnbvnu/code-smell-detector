function doDetectIssues() {
    if (detectWebGlNotSupported()) {
        notifyAboutKnownIssue(
            "Can't simulate circuits. Your browser doesn't support WebGL, or has it disabled.",
            "https://github.com/Strilanc/Quirk/issues/168",
            [/Computing circuit values failed/, /Error creating WebGL context./])
    }
}