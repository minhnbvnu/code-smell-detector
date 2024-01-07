function AboutPage({counter, dispatch}) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <h2>src/modern/AboutPage.js</h2>
      <h3 style={{color: theme}}>
        This component is rendered by the outer React ({React.version}).
      </h3>
      <Greeting />
      <br />
      <p>
        Counter: {counter}{' '}
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </p>
    </>
  );
}