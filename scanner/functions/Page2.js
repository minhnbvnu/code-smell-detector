function Page2() {
  let theme = useContext(Theme);
  return (
    <div className={theme + '-box'}>
      <Suspend>Content of a different page</Suspend>
    </div>
  );
}