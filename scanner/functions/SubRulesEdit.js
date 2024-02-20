function SubRulesEdit({ subList, addSub, updateDataCache }) {
  const i18n = useI18n();
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    setShowInput(false);
    setInputText("");
    setInputError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const url = inputText.trim();

    if (!url) {
      setInputError(i18n("error_cant_be_blank"));
      return;
    }

    if (subList.find((item) => item.url === url)) {
      setInputError(i18n("error_duplicate_values"));
      return;
    }

    try {
      setLoading(true);
      const rules = await syncSubRules(url);
      if (rules.length === 0) {
        throw new Error("empty rules");
      }
      await addSub(url);
      await updateDataCache(url);
      setShowInput(false);
      setInputText("");
    } catch (err) {
      console.log("[fetch rules]", err);
      setInputError(i18n("error_fetch_url"));
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const handleFocus = (e) => {
    e.preventDefault();
    setInputError("");
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          size="small"
          variant="contained"
          disabled={showInput}
          onClick={(e) => {
            e.preventDefault();
            setShowInput(true);
          }}
        >
          {i18n("add")}
        </Button>
        <HelpButton url={URL_KISS_RULES_NEW_ISSUE} />
      </Stack>

      {showInput && (
        <>
          <TextField
            size="small"
            value={inputText}
            error={!!inputError}
            helperText={inputError}
            onChange={handleInput}
            onFocus={handleFocus}
            label={i18n("subscribe_url")}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              size="small"
              variant="contained"
              onClick={handleSave}
              disabled={loading}
            >
              {i18n("save")}
            </Button>
            <Button size="small" variant="outlined" onClick={handleCancel}>
              {i18n("cancel")}
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}