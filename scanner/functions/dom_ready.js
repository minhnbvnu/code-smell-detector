async function dom_ready() {
        if (document.readyState == "loading") {
            return new Promise((resolve, _reject) => {
                document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
            });
        }
    }