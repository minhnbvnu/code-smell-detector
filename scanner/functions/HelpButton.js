function HelpButton({ url }) {
  const i18n = useI18n();
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() => {
        window.open(url, "_blank");
      }}
      startIcon={<HelpIcon />}
    >
      {i18n("help")}
    </Button>
  );
}