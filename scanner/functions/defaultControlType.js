function defaultControlType(playerIndex) {
    if (playerIndex === 0) {
        if (isMobile) {
            return 'Quadplay';
        } else {
            return 'Kbd_Alt';
        }
    } else if (playerIndex === 1) {
        return 'Kbd_P2';
    } else {
        return 'Quadplay';
    }
}