function FilteredStream(source, filter, options) {
    options = options || {};

    source.pipe(this);
    this.filter = filter || nopFilter;

    options.decodeStrings = false;
    stream.Transform.call(this, options);
}