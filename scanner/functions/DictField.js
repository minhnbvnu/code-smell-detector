function DictField({ word }) {
  const [dictResult, setDictResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const dictRes = await apiTranslate({
          text: word,
          translator: OPT_TRANS_BAIDU,
          fromLang: "en",
          toLang: "zh-CN",
        });
        dictRes[2].type === 1 && setDictResult(JSON.parse(dictRes[2].result));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [word]);

  if (loading) {
    return <CircularProgress size={24} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return <DictCont dictResult={dictResult} />;
}