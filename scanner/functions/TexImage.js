function TexImage() {
                TexFlags.call(this);
                this.xOffset = 0;
                this.yOffset = 0;
                // data
                this.data = null;
                this.needsFree = false;
                // html element
                this.element = null;
                // copyTexImage info
                this.needsCopy = false;
            }