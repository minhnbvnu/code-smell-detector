function HandCTA({ style }) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sprite.length)
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return <Image source={sprite[index]} style={[styles.image, style]} />
}