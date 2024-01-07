function Client() {
  const [loaded, load] = React.useReducer(() => true, false);

  return loaded ? (
    <div>
      loaded dynamically: <LazyDynamic />
    </div>
  ) : (
    <div>
      <button onClick={load}>Load dynamic import Component</button>
    </div>
  );
}