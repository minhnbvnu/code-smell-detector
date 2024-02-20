function notifyGuestsOfPostEffects() {
    // The only post-effect applied client side is bloom,
    // so the others are irrelevant
    sendToAllGuests({
        type: 'POST_EFFECTS',
        bloom: QRuntime.$postFX.bloom
    });
}