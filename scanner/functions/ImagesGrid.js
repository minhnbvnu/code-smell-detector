function ImagesGrid(opts) {

        this.opts = opts || {};

        this.$window = $(window);
        this.$element = this.opts.element;
        this.$gridItems = [];

        this.modal = null;
        this.imageLoadCount = 0;

        var cells = this.opts.cells;
        this.opts.cells = (cells < 1)? 1: (cells > 6)? 6: cells;

        this.onWindowResize = this.onWindowResize.bind(this);
        this.onImageClick = this.onImageClick.bind(this);

        this.init();
    }