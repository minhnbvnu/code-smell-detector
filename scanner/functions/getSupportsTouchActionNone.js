function getSupportsTouchActionNone() {
            return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
        }