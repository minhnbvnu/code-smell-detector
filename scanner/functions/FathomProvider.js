function FathomProvider(props) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      load();
      setSiteId('ESMHTGZE');
      trackPageview();
    }
  }, [])
  return <div {...props} />
}