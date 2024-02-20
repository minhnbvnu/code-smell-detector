function renderRoot({id, store, ele}) {
  const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  ReactDOM.render(<Root />, ele);
}