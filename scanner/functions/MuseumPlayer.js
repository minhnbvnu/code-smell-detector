function MuseumPlayer(instrumentId, $player, options) {
        this.instrumentId = instrumentId;
        this.$player = $player;
        this.init(options);
    }