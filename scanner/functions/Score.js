function Score({ gameOver, score, ...props }) {
  const { highscore = 0, setHighscore } = React.useContext(GameContext)

  React.useEffect(() => {
    if (gameOver) {
      if (score > highscore) {
        setHighscore(score);
      }
    }
  }, [gameOver])


  const { top, left } = useSafeArea();

  return (
    <View pointerEvents="none" style={[styles.container, { top: Math.max(top, 16), left: Math.max(left, 8) }]}>
      <Text style={[styles.score, textShadow]}>{score}</Text>
      {highscore > 0 && (<Text style={[styles.highscore, textShadowHighscore]}>TOP {highscore}</Text>)}
    </View>
  )
}