function notifyGuestsOfFramebufferSize() {
    // Tell the guests about the current private screen flag
    sendToAllGuests({
        type: 'FRAMEBUFFER_SIZE',
        SCREEN_WIDTH: SCREEN_WIDTH,
        SCREEN_HEIGHT: SCREEN_HEIGHT,
        PRIVATE_VIEW: PRIVATE_VIEW
    });
}