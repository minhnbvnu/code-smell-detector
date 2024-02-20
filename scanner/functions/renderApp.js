function renderApp(path, callback) {
  const store = configureStore();
  const state = store.getState();

  const rendered = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const page = template
    .replace('<!-- CONTENT -->', rendered)
    .replace('"-- STORES --"', JSON.stringify(state));

  callback(null, page);
}