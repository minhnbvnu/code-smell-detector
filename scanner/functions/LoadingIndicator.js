function LoadingIndicator() {
  let theme = useContext(Theme);
  return <div className={theme + '-loading'}>Loading...</div>;
}