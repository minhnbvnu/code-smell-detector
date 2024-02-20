function docWriteResults(...def) {
  const DONE_ID = 'done-marker';
  const win = iframe();
  const doc = win.document;
  const dfd = $.Deferred();

  doc.write('<body>');
  $.map(def, d => {
    if (d instanceof Uri) {
      doc.write(`<script src="${d.value}"><\/script>`);
    } else if (d instanceof Js) {
      doc.write(`<script>${d.value}<\/script>`);
    } else if (d instanceof Html) {
      doc[d.writeln ? 'writeln' : 'write'](...d.value);
    } else {
      doc.write(d);
    }
  });
  doc.write(`<script src="remote/write-done-marker.js"></script>`);


  const handle = setInterval(() => {
    const marker = doc.getElementById(DONE_ID);
    if (marker) {
      clearInterval(handle);
      marker.parentNode.removeChild(marker);
      dfd.resolve(removeHiddenElements(doc.body).innerHTML);
    }
  }, 1);
  doc.write('</body>');
  doc.close();
  return dfd.promise();
}