function autoUnregister(w, e, f, name) {
  if (!w)
    return;
  w.on('close', () => {
    if (name)
      e.removeListener(name, f);
    else
      e.removeListener(f);
  })
}