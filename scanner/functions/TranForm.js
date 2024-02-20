function TranForm({ text, setText, tranboxSetting, transApis }) {
  const i18n = useI18n();

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [translator, setTranslator] = useState(tranboxSetting.translator);
  const [fromLang, setFromLang] = useState(tranboxSetting.fromLang);
  const [toLang, setToLang] = useState(tranboxSetting.toLang);
  const [toLang2, setToLang2] = useState(tranboxSetting.toLang2);
  const inputRef = useRef(null);

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Box>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <TextField
              select
              SelectProps={{ MenuProps: { disablePortal: true } }}
              fullWidth
              size="small"
              name="fromLang"
              value={fromLang}
              label={i18n("from_lang")}
              onChange={(e) => {
                setFromLang(e.target.value);
              }}
            >
              {OPT_LANGS_FROM.map(([lang, name]) => (
                <MenuItem key={lang} value={lang}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <TextField
              select
              SelectProps={{ MenuProps: { disablePortal: true } }}
              fullWidth
              size="small"
              name="toLang"
              value={toLang}
              label={i18n("to_lang")}
              onChange={(e) => {
                setToLang(e.target.value);
              }}
            >
              {OPT_LANGS_TO.map(([lang, name]) => (
                <MenuItem key={lang} value={lang}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <TextField
              select
              SelectProps={{ MenuProps: { disablePortal: true } }}
              fullWidth
              size="small"
              value={translator}
              name="translator"
              label={i18n("translate_service")}
              onChange={(e) => {
                setTranslator(e.target.value);
              }}
            >
              {OPT_TRANS_ALL.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TextField
          size="small"
          label={i18n("original_text")}
          inputRef={inputRef}
          fullWidth
          multiline
          value={editMode ? editText : text}
          disabled={!editMode}
          onChange={(e) => {
            setEditText(e.target.value);
          }}
          onClick={() => {
            setEditMode(true);
            setEditText(text);
            const timer = setTimeout(() => {
              clearTimeout(timer);
              inputRef.current?.focus();
            }, 100);
          }}
          onBlur={() => {
            setEditMode(false);
            setText(editText.trim());
          }}
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
                {editMode ? (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <DoneIcon fontSize="inherit" />
                  </IconButton>
                ) : (
                  <CopyBtn text={text} />
                )}
              </Stack>
            ),
          }}
        />
      </Box>

      <TranCont
        text={text}
        translator={translator}
        fromLang={fromLang}
        toLang={toLang}
        toLang2={toLang2}
        setToLang={setToLang}
        setToLang2={setToLang2}
        transApis={transApis}
      />
    </Stack>
  );
}