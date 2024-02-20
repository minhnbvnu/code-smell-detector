function getInputElem() {
            return self.config.wrap
                ? element.querySelector("[data-input]")
                : element;
        }