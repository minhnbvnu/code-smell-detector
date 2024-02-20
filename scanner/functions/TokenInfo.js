function TokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers) {
            this.tokenId = tokenId;
            this.reservation = reservation;
            this.binopPrecedence = binopPrecedence;
            this.binopNodeType = binopNodeType;
            this.unopPrecedence = unopPrecedence;
            this.unopNodeType = unopNodeType;
            this.text = text;
            this.ers = ers;
        }