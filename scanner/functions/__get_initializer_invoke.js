async function __get_initializer_invoke(target, key, initializer) {
  try {
    await initializer();
  } catch (err) {
    delete target[key];
    // not use Vue.delete, which maybe cause infinite loop
    // Vue.delete(target, key);
    throw err;
  }
}