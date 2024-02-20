function Uploader( opts ) {
            this.options = $.extend( true, {}, Uploader.options, opts );
            this._init( this.options );
        }