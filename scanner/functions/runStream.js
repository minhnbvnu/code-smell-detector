function runStream(el, html, options) {
  active = new WriteStream(el, options);

  // Identify this stream.
  active.id = nextId++;
  active.name = options.name || active.id;
  postscribe.streams[active.name] = active;

  // Override document.write.
  const doc = el.ownerDocument;

  const stash = {
    close: doc.close,
    open: doc.open,
    write: doc.write,
    writeln: doc.writeln
  };

  function write(str) {
    str = options.beforeWrite(str);
    active.write(str);
    options.afterWrite(str);
  }

  Object.assign(doc, {
    close: doNothing,
    open: doNothing,
    write: (...str) => write(str.join('')),
    writeln: (...str) => write(str.join('') + '\n')
  });

  // Override window.onerror
  const oldOnError = active.win.onerror || doNothing;

  // This works together with the try/catch around WriteStream::insertScript
  // In modern browsers, exceptions in tag scripts go directly to top level
  active.win.onerror = (msg, url, line) => {
    options.error({msg: `${msg} - ${url}: ${line}`});
    oldOnError.apply(active.win, [msg, url, line]);
  };

  // Write to the stream
  active.write(html, () => {
    // restore document.write
    Object.assign(doc, stash);

    // restore window.onerror
    active.win.onerror = oldOnError;

    options.done();
    active = null;
    nextStream();
  });

  return active;
}