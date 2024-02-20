function startPreviewRecording() {
    if (! previewRecording) {
        // Force low framerate fps
        QRuntime.$graphicsPeriod = 60 / PREVIEW_FPS;
        previewRecording = new Uint32Array(192 * 112 * PREVIEW_FRAMES_X * PREVIEW_FRAMES_Y);
        previewRecordingFrame = 0;
    }
}