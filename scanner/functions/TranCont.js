function TranCont({
  text,
  translator,
  fromLang,
  toLang,
  toLang2 = "en",
  setToLang,
  setToLang2,
  transApis,
}) {
  const i18n = useI18n();
  const [trText, setTrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dictResult, setDictResult] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setTrText("");
        setError("");
        setDictResult(null);

        // 互译
        if (toLang !== toLang2 && toLang2 !== "none") {
          const detectLang = await apiBaiduLangdetect(text);
          if (detectLang === toLang) {
            setToLang(toLang2);
            setToLang2(toLang);
            return;
          }
        }

        const apiSetting =
          transApis[translator] || DEFAULT_TRANS_APIS[translator];
        const tranRes = await apiTranslate({
          text,
          translator,
          fromLang,
          toLang,
          apiSetting,
        });
        setTrText(tranRes[0]);

        // 词典
        if (isValidWord(text) && toLang.startsWith("zh")) {
          if (fromLang === "en" && translator === OPT_TRANS_BAIDU) {
            tranRes[2].type === 1 &&
              setDictResult(JSON.parse(tranRes[2].result));
          } else {
            const dictRes = await apiTranslate({
              text,
              translator: OPT_TRANS_BAIDU,
              fromLang: "en",
              toLang: "zh-CN",
            });
            dictRes[2].type === 1 &&
              setDictResult(JSON.parse(dictRes[2].result));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    text,
    translator,
    fromLang,
    toLang,
    toLang2,
    setToLang,
    setToLang2,
    transApis,
  ]);

  return (
    <>
      <Box>
        <TextField
          size="small"
          label={i18n("translated_text")}
          // disabled
          fullWidth
          multiline
          value={trText}
          InputProps={{
            endAdornment: (
              <Stack
                direction="row"
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              >
                <CopyBtn text={trText} />
              </Stack>
            ),
          }}
        />
      </Box>

      {loading && <CircularProgress size={24} />}
      {error && <Alert severity="error">{error}</Alert>}
      {dictResult && <DictCont dictResult={dictResult} />}
    </>
  );
}