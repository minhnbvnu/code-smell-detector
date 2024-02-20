function safeRegister(w, e, f, name) {
  autoUnregister(w, e, f, name);
  if (name)
    e.on(name, f);
  else
    e.addListener(f);
}