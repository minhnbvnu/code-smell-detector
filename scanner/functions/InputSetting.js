function InputSetting() {
  const i18n = useI18n();
  const { inputRule, updateInputRule } = useInputRule();

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    switch (name) {
      case "triggerTime":
        value = limitNumber(value, 10, 1000);
        break;
      default:
    }
    updateInputRule({
      [name]: value,
    });
  };

  const handleShortcutInput = useCallback(
    (val) => {
      updateInputRule({ triggerShortcut: val });
    },
    [updateInputRule]
  );

  const {
    transOpen,
    translator,
    fromLang,
    toLang,
    triggerShortcut,
    triggerCount,
    triggerTime,
    transSign,
  } = inputRule;

  return (
    <Box>
      <Stack spacing={3}>
        <FormControlLabel
          control={
            <Switch
              size="small"
              name="transOpen"
              checked={transOpen}
              onChange={() => {
                updateInputRule({ transOpen: !transOpen });
              }}
            />
          }
          label={i18n("use_input_box_translation")}
        />

        <TextField
          select
          size="small"
          name="translator"
          value={translator}
          label={i18n("translate_service")}
          onChange={handleChange}
        >
          {OPT_TRANS_ALL.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          name="fromLang"
          value={fromLang}
          label={i18n("from_lang")}
          onChange={handleChange}
        >
          {OPT_LANGS_FROM.map(([lang, name]) => (
            <MenuItem key={lang} value={lang}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          name="toLang"
          value={toLang}
          label={i18n("to_lang")}
          onChange={handleChange}
        >
          {OPT_LANGS_TO.map(([lang, name]) => (
            <MenuItem key={lang} value={lang}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          name="transSign"
          value={transSign}
          label={i18n("input_trans_start_sign")}
          onChange={handleChange}
          helperText={i18n("input_trans_start_sign_help")}
        >
          <MenuItem value={""}>{i18n("style_none")}</MenuItem>
          {OPT_INPUT_TRANS_SIGNS.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <ShortcutInput
                value={triggerShortcut}
                onChange={handleShortcutInput}
                label={i18n("trigger_trans_shortcut")}
                helperText={i18n("trigger_trans_shortcut_help")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                select
                fullWidth
                size="small"
                name="triggerCount"
                value={triggerCount}
                label={i18n("shortcut_press_count")}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                size="small"
                label={i18n("combo_timeout")}
                type="number"
                name="triggerTime"
                defaultValue={triggerTime}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}