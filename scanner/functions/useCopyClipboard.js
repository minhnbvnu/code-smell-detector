function useCopyClipboard(successDuration = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => clearTimeout(id);
    }
  }, [isCopied, successDuration]);

  return [
    isCopied,
    (text) => {
      const didCopy = copyToClipboard(text);
      setIsCopied(didCopy);
    },
  ];
}