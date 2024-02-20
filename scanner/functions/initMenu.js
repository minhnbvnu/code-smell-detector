function initMenu(revision, obsIsAnyOverlayShowing) {
    // Show/hide menu overlay.
    (() => {
        const menuButton = /** @type {!HTMLButtonElement} */ document.getElementById('menu-button');
        const closeMenuButton = /** @type {!HTMLButtonElement} */ document.getElementById('close-menu-button');
        const menuOverlay = /** @type {!HTMLDivElement} */ document.getElementById('menu-overlay');
        const menutDiv = /** @type {HTMLDivElement} */ document.getElementById('menu-div');
        menuButton.addEventListener('click', () => menuIsVisible.set(true));
        obsIsAnyOverlayShowing.subscribe(e => { menuButton.disabled = e; });
        menuOverlay.addEventListener('click', () => menuIsVisible.set(false));
        closeMenuButton.addEventListener('click', () => menuIsVisible.set(false));
        document.addEventListener('keydown', e => {
            const ESC_KEY = 27;
            if (e.keyCode === ESC_KEY) {
                menuIsVisible.set(false)
            }
        });
        obsMenuIsShowing.subscribe(showing => {
            menutDiv.style.display = showing ? 'block' : 'none';
            if (showing) {
                document.getElementById('export-link-copy-button').focus();
            }
        });
    })();

    const groverAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-anchor-grover');
    const teleportAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-anchor-teleport');
    const eraserAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-anchor-delayed-eraser');
    const additionAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-addition');
    const superdenseCodeAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-superdense-coding');
    const symmetryBreakAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-symmetry-break');
    const chshTestAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-chsh-test');
    const qftAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-qft');
    const shorAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-anchor-shor');
    const distillAnchor = /** @type {!HTMLAnchorElement} */ document.getElementById('example-anchor-distill');

    for (let [a, t] of [[groverAnchor, groverLink],
                        [shorAnchor, shorLink],
                        [teleportAnchor, teleportLink],
                        [eraserAnchor, eraserLink],
                        [additionAnchor, additionLink],
                        [superdenseCodeAnchor, superdenseCodingLink],
                        [symmetryBreakAnchor, symmetryBreakingLink],
                        [chshTestAnchor, chshTestLink],
                        [qftAnchor, qftLink],
                        [distillAnchor, distillLink]]) {
        let text = JSON.stringify(t);
        a.href = "#circuit=" + text;
        a.onclick = ev => {
            // Urgh, this is terrible but it will have to do.
            if (ev.shiftKey || ev.ctrlKey || ev.altKey || ev.which !== 1) {
                return undefined;
            }

            revision.commit(text);
            menuIsVisible.set(false);
            return false;
        };
    }
}