function checkScreenOrientation() {
    // we check the screen dimensions instead of innerWidth/innerHeight for correct behaviour when the keyboard
    // is shown on mobile
    const isLandscape = window.screen.width >= window.screen.height;
    if (isLandscape && window.innerHeight < 480) {
        document.body.classList.add('mobile-landscape');
    } else {
        document.body.classList.remove('mobile-landscape');
    }
}