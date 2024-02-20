function stateChange() {
                if (this.readyState == 4) {
                    this.onreadystatechange = empty;

                    if (this.status == 200) {
                        self.onData(this.responseText);
                        self.get();
                    } else {
                        self.onClose();
                    }
                }
            }