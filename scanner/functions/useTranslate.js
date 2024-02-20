function useTranslate(q, rule, setting) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sameLang, setSamelang] = useState(false);

  const { translator, fromLang, toLang } = rule;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (!q.replace(/\[(\d+)\]/g, "").trim()) {
          setText(q);
          setSamelang(false);
          return;
        }

        const deLang = await tryDetectLang(q, setting.detectRemote);
        const disableLangs = setting.disableLangs || [];
        if (
          deLang &&
          (toLang.includes(deLang) || disableLangs.includes(deLang))
        ) {
          setSamelang(true);
        } else {
          const [trText, isSame] = await apiTranslate({
            translator,
            text: q,
            fromLang,
            toLang,
            apiSetting:
              setting.transApis?.[translator] || DEFAULT_TRANS_APIS[translator],
          });
          setText(trText);
          setSamelang(isSame);
        }
      } catch (err) {
        console.log("[translate]", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [q, translator, fromLang, toLang, setting]);

  return { text, sameLang, loading };
}