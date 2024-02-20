function useWorker(
  scriptPath,
  workerOptions,
  attributes,
) {
  const [worker, setWorker] = useState(undefined);

  useEffect(() => {
    const newWorker = new Worker(scriptPath, workerOptions);
    // attach attributes
    if (attributes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in attributes) {
        newWorker[key] = attributes[key];
      }
    }

    setWorker(newWorker);

    return () => {
      newWorker.terminate();
      setWorker(undefined);
    };
  }, [scriptPath]);

  return worker;
}