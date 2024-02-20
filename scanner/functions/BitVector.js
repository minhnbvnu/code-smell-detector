function BitVector(bitCount) {
            this.bitCount = bitCount;
            this.firstBits = 0;
            this.restOfBits = null;
            if(this.bitCount > BitVector.packBits) {
                this.restOfBits = new Array();
                var len = Math.floor(this.bitCount / BitVector.packBits);
                for(var i = 0; i < len; i++) {
                    this.restOfBits[i] = 0;
                }
            }
        }