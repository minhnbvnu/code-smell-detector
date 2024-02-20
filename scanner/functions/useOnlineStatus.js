function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

  useEventListener('online', () => setOnlineStatus(true));
  useEventListener('offline', () => setOnlineStatus(false));

  return onlineStatus;
}