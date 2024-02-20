function CardPlatformApp() {
  const { state: urlParams } = useLocation();
  const { manifests } = usePlatformApp();
  const manifest = manifests.get(CARD_APP_ID);

  const themeType = useTheme("colors.palette.type");

  // TODO for next urlscheme evolutions:
  // - check if local settings allow to launch an app from this branch, else display an error
  // - check if the app is available in store, else display a loader if apps are getting fetched from remote, else display an error stating that the app doesn't exist

  return (
    <Card grow style={{ overflow: "hidden" }}>
      {manifest ? (
        <WebPlatformPlayer
          config={{
            topBarConfig: {
              shouldDisplayName: false,
              shouldDisplayInfo: false,
              shouldDisplayClose: false,
            },
          }}
          manifest={manifest}
          inputs={{
            theme: themeType,
            ...urlParams,
          }}
        />
      ) : null}
    </Card>
  );
}