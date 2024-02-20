function Blob(name1) {
    this.name = name1;
    this.addReader = bind(this.addReader, this);
    this.addWriter = bind(this.addWriter, this);
    this.readers = [];
    this.writers = [];
  }