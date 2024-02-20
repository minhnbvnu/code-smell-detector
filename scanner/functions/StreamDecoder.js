function StreamDecoder(charset) {
        if (!(this instanceof StreamDecoder))
            return new StreamDecoder(charset);
        stream.Transform.call(this, charset);
        this.charset = charset;
        this.parsed_chunk = false;
    }