function postscribeResults(...def) {
  const HELPER_CLASS_NAME = 'ps-writer';
  const el = $('<div id="postscribe-write-target" />').get(0);

  $(document.body).append(el);

  return $.when(...$.map(def, (d) => {
    const dfd = $.Deferred();
    const opts = {
      error(err) {
        console.error(JSON.stringify(err));
      },

      done() {
        removeHiddenElements(el);
        dfd.resolve();
      }
    };

    if (d instanceof Uri) {
      postscribe(el, `<script src="${d.value}"></script>`, opts);
    } else if (d instanceof Js) {
      postscribe(el, `<script>${d.value}</script>`, opts);
    } else if (d instanceof Html) {
      postscribe(el, `<script class="${HELPER_CLASS_NAME}">document.write(${d.toArgs()});<\/script>`, opts);
    } else {
      postscribe(el, d, opts);
    }

    return dfd.promise();
  })).then(() => el.innerHTML);
}