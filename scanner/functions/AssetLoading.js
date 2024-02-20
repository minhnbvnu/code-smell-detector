function AssetLoading({ children }) {
  const [fontLoaded] = useFonts({
    retro: require("./assets/fonts/retro.ttf"),
  });

  const [audioLoaded, audioLoadingError] = useResolvedValue(() =>
    AudioManager.setupAsync()
  );

  const [modelsLoaded, modelLoadingError] = useResolvedValue(() =>
    ModelLoader.loadModels()
  );

  console.log("Loading:", {
    fonts: fontLoaded,
    audio: audioLoaded,
    models: modelsLoaded,
  });

  if (modelLoadingError) {
    return (
      <ErrorScreen
        message={modelLoadingError.message}
        stack={modelLoadingError.stack}
      />
    );
  }
  if (audioLoadingError) {
    return (
      <ErrorScreen
        message={audioLoadingError.message}
        stack={audioLoadingError.stack}
      />
    );
  }
  if (modelsLoaded && fontLoaded && audioLoaded) {
    return children;
  }

  return <EXAppLoading />;
}