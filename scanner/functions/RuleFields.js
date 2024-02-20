function RuleFields({ rule, rules, setShow, setKeyword }) {
  const initFormValues = rule || {
    ...DEFAULT_RULE,
    transOpen: "true",
  };
  const editMode = !!rule;

  const i18n = useI18n();
  const [disabled, setDisabled] = useState(editMode);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(initFormValues);
  const {
    pattern,
    selector,
    keepSelector = "",
    terms = "",
    translator,
    fromLang,
    toLang,
    textStyle,
    transOpen,
    bgColor,
    textDiyStyle,
  } = formValues;

  const hasSamePattern = (str) => {
    for (const item of rules.list) {
      if (item.pattern === str && rule?.pattern !== str) {
        return true;
      }
    }
    return false;
  };

  const handleFocus = (e) => {
    e.preventDefault();
    const { name } = e.target;
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handlePatternChange = useMemo(
    () =>
      debounce(async (patterns) => {
        setKeyword(patterns.trim());
      }, 500),
    [setKeyword]
  );

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues((pre) => ({ ...pre, [name]: value }));
    if (name === "pattern" && !editMode) {
      handlePatternChange(value);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (editMode) {
      setDisabled(true);
    } else {
      setShow(false);
    }
    setErrors({});
    setFormValues(initFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!pattern.trim()) {
      errors.pattern = i18n("error_cant_be_blank");
    }
    if (hasSamePattern(pattern)) {
      errors.pattern = i18n("error_duplicate_values");
    }
    if (pattern === "*" && !errors.pattern && !selector.trim()) {
      errors.selector = i18n("error_cant_be_blank");
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (editMode) {
      // 编辑
      setDisabled(true);
      rules.put(rule.pattern, formValues);
    } else {
      // 添加
      rules.add(formValues);
      setShow(false);
      setFormValues(initFormValues);
    }
  };

  const GlobalItem = rule?.pattern !== "*" && (
    <MenuItem key={GLOBAL_KEY} value={GLOBAL_KEY}>
      {GLOBAL_KEY}
    </MenuItem>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          size="small"
          label={i18n("pattern")}
          error={!!errors.pattern}
          helperText={errors.pattern || i18n("pattern_helper")}
          name="pattern"
          value={pattern}
          disabled={rule?.pattern === "*" || disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          multiline
        />
        <TextField
          size="small"
          label={i18n("selector")}
          error={!!errors.selector}
          helperText={errors.selector || i18n("selector_helper")}
          name="selector"
          value={selector}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          multiline
        />
        <TextField
          size="small"
          label={i18n("keep_selector")}
          helperText={i18n("keep_selector_helper")}
          name="keepSelector"
          value={keepSelector}
          disabled={disabled}
          onChange={handleChange}
          multiline
        />
        <TextField
          size="small"
          label={i18n("terms")}
          helperText={i18n("terms_helper")}
          name="terms"
          value={terms}
          disabled={disabled}
          onChange={handleChange}
          multiline
        />

        <Box>
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                select
                size="small"
                fullWidth
                name="transOpen"
                value={transOpen}
                label={i18n("translate_switch")}
                disabled={disabled}
                onChange={handleChange}
              >
                {GlobalItem}
                <MenuItem value={"true"}>{i18n("default_enabled")}</MenuItem>
                <MenuItem value={"false"}>{i18n("default_disabled")}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                select
                size="small"
                fullWidth
                name="translator"
                value={translator}
                label={i18n("translate_service")}
                disabled={disabled}
                onChange={handleChange}
              >
                {GlobalItem}
                {OPT_TRANS_ALL.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                select
                size="small"
                fullWidth
                name="fromLang"
                value={fromLang}
                label={i18n("from_lang")}
                disabled={disabled}
                onChange={handleChange}
              >
                {GlobalItem}
                {OPT_LANGS_FROM.map(([lang, name]) => (
                  <MenuItem key={lang} value={lang}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                select
                size="small"
                fullWidth
                name="toLang"
                value={toLang}
                label={i18n("to_lang")}
                disabled={disabled}
                onChange={handleChange}
              >
                {GlobalItem}
                {OPT_LANGS_TO.map(([lang, name]) => (
                  <MenuItem key={lang} value={lang}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                select
                size="small"
                fullWidth
                name="textStyle"
                value={textStyle}
                label={i18n("text_style")}
                disabled={disabled}
                onChange={handleChange}
              >
                {GlobalItem}
                {OPT_STYLE_ALL.map((item) => (
                  <MenuItem key={item} value={item}>
                    {i18n(item)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {OPT_STYLE_USE_COLOR.includes(textStyle) && (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <TextField
                  size="small"
                  fullWidth
                  name="bgColor"
                  value={bgColor}
                  label={i18n("bg_color")}
                  disabled={disabled}
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>
        </Box>

        {textStyle === OPT_STYLE_DIY && (
          <TextField
            size="small"
            label={i18n("diy_style")}
            helperText={i18n("diy_style_helper")}
            name="textDiyStyle"
            value={textDiyStyle}
            disabled={disabled}
            onChange={handleChange}
            multiline
          />
        )}

        {rules &&
          (editMode ? (
            // 编辑
            <Stack direction="row" spacing={2}>
              {disabled ? (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisabled(false);
                    }}
                  >
                    {i18n("edit")}
                  </Button>
                  {rule?.pattern !== "*" && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.preventDefault();
                        rules.del(rule.pattern);
                      }}
                    >
                      {i18n("delete")}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button size="small" variant="contained" type="submit">
                    {i18n("save")}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    {i18n("cancel")}
                  </Button>
                </>
              )}
            </Stack>
          ) : (
            // 添加
            <Stack direction="row" spacing={2}>
              <Button size="small" variant="contained" type="submit">
                {i18n("save")}
              </Button>
              <Button size="small" variant="outlined" onClick={handleCancel}>
                {i18n("cancel")}
              </Button>
            </Stack>
          ))}
      </Stack>
    </form>
  );
}