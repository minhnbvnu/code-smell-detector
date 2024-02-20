function FilePaste( opts ) {
            opts = this.options = $.extend({}, opts );
            opts.container = $( opts.container || document.body );
            RuntimeClent.call( this, 'FilePaste' );
        }