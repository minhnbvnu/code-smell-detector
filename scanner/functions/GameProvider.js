function GameProvider({ children }) {
  const [character, setCharacter] = React.useState(defaultState.character);
  const [highscore, setHighscore] = React.useState(defaultState.highscore);

  React.useEffect(() => {
    const parseModulesAsync = async () => {
      try {
        const { character, highscore } = await rehydrateAsync();
        setCharacter(character);
        setHighscore(highscore);
      } catch (ignored) {}
      //   setLoaded(true);
    };

    parseModulesAsync();
  }, []);

  return (
    <GameContext.Provider
      value={{
        character,
        setCharacter: (character) => {
          setCharacter(character);
          cacheAsync({ character, highscore });
        },
        highscore,
        setHighscore: (highscore) => {
          setHighscore(highscore);
          cacheAsync({ character, highscore });
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
}