function ApiFields({ translator }) {
  const i18n = useI18n();
  const { api, updateApi, resetApi } = useApi(translator);
  const { url = "", key = "", model = "", prompt = "" } = api;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateApi({
      [name]: value,
    });
  };

  const buildinTranslators = [
    OPT_TRANS_MICROSOFT,
    OPT_TRANS_DEEPLFREE,
    OPT_TRANS_BAIDU,
    OPT_TRANS_TENCENT,
  ];

  const mulkeysTranslators = [
    OPT_TRANS_DEEPL,
    OPT_TRANS_OPENAI,
    OPT_TRANS_GEMINI,
    OPT_TRANS_CLOUDFLAREAI,
  ];

  return (
    <Stack spacing={3}>
      {!buildinTranslators.includes(translator) && (
        <>
          <TextField
            size="small"
            label={"URL"}
            name="url"
            value={url}
            onChange={handleChange}
          />
          <TextField
            size="small"
            label={"KEY"}
            name="key"
            value={key}
            onChange={handleChange}
            multiline={mulkeysTranslators.includes(translator)}
            helperText={
              mulkeysTranslators.includes(translator) ? i18n("mulkeys_help") : ""
            }
          />
        </>
      )}
      {(translator === OPT_TRANS_OPENAI || translator === OPT_TRANS_GEMINI) && (
        <>
          <TextField
            size="small"
            label={"MODEL"}
            name="model"
            value={model}
            onChange={handleChange}
          />
          <TextField
            size="small"
            label={"PROMPT"}
            name="prompt"
            value={prompt}
            onChange={handleChange}
            multiline
          />
        </>
      )}

      <Stack direction="row" spacing={2}>
        <TestButton translator={translator} api={api} />
        {!buildinTranslators.includes(translator) && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              resetApi();
            }}
          >
            {i18n("restore_default")}
          </Button>
        )}
      </Stack>

      {translator === OPT_TRANS_CUSTOMIZE && (
        <pre>{i18n("custom_api_help")}</pre>
      )}
    </Stack>
  );
}