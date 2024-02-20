function useImage(src) {
  const [status, setStatus] = useState({ loaded: false, failed: false })
  useEffect(() => {
    const mainImage = new Image();
    mainImage.onload = () => setStatus({ ...status, loaded: true });
    mainImage.src = src;
  }, [src]);
  return status;
}