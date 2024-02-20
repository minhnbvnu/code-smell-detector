function TestButton({ translator, api }) {
  const i18n = useI18n();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const handleApiTest = async () => {
    try {
      setLoading(true);
      const [text] = await apiTranslate({
        translator,
        text: "hello world",
        fromLang: "en",
        toLang: "zh-CN",
        apiSetting: api,
        useCache: false,
      });
      if (!text) {
        throw new Error("empty reault");
      }
      alert.success(i18n("test_success"));
    } catch (err) {
      // alert.error(`${i18n("test_failed")}: ${err.message}`);
      alert.error(
        <>
          <div>{`${i18n("test_failed")}: ${err.message}`}</div>
          <pre
            style={{
              maxWidth: 400,
              overflow: "auto",
            }}
          >
            {JSON.stringify(err.cause || {}, null, 2)}
          </pre>
        </>
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress size={16} />;
  }

  return (
    <Button size="small" variant="contained" onClick={handleApiTest}>
      {i18n("click_test")}
    </Button>
  );
}