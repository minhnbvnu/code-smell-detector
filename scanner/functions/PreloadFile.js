function PreloadFile(_fs, _path, _flag, _stat, contents) {
	        BaseFile$$1.call(this);
	        this._pos = 0;
	        this._dirty = false;
	        this._fs = _fs;
	        this._path = _path;
	        this._flag = _flag;
	        this._stat = _stat;
	        if (contents) {
	            this._buffer = contents;
	        }
	        else {
	            // Empty buffer. It'll expand once we write stuff to it.
	            this._buffer = emptyBuffer();
	        }
	        // Note: This invariant is *not* maintained once the file starts getting
	        // modified.
	        // Note: Only actually matters if file is readable, as writeable modes may
	        // truncate/append to file.
	        if (this._stat.size !== this._buffer.length && this._flag.isReadable()) {
	            throw new Error(("Invalid buffer: Buffer is " + (this._buffer.length) + " long, yet Stats object specifies that file is " + (this._stat.size) + " long."));
	        }
	    }