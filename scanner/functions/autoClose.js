function autoClose() {
            if (timeout > 0) {
                timeout = timeout - 500;
            } else {
                window.clearInterval(clearFlag);
                toastContainer.className = "toast-container toast-hide"
            }
        }