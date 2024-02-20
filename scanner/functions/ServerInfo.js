function ServerInfo() {
  return (
    <div className={styles['server-info']}>
      Rendered at {new Date().toTimeString()} with Vercel.
    </div>
  );
}