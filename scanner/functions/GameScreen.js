function GameScreen(props) {
  const scheme = useColorScheme();
  const { character } = React.useContext(GameContext);

  // const appState = useAppState();

  return (
    <Game {...props} character={character} isDarkMode={scheme === "dark"} />
  );
}