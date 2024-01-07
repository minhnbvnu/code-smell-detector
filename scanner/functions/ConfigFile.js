constructor(path) {
    this.path = path;
    this.emitter = new Emitter();
    this.value = {};
    this.reloadCallbacks = [];

    // Use a queue to prevent multiple concurrent write to the same file.
    const writeQueue = asyncQueue((data, callback) =>
      CSON.writeFile(this.path, data, error => {
        if (error) {
          this.emitter.emit(
            'did-error',
            dedent`
              Failed to write \`${Path.basename(this.path)}\`.

              ${error.message}
            `
          );
        }
        callback();
      })
    );

    this.requestLoad = _.debounce(() => this.reload(), 200);
    this.requestSave = _.debounce(data => writeQueue.push(data), 200);
  }