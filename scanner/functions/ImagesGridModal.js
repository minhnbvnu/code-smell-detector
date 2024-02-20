function ImagesGridModal(opts) {

        this.opts = opts || {};

        this.imageIndex = null;

        this.$document = $(document);
        this.$modal = null;
        this.$indicator = null;

        this.close = this.close.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.onIndicatorClick = this.onIndicatorClick.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        this.$document.on('keyup', this.onKeyUp);
    }