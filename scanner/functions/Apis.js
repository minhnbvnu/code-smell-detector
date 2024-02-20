function Apis() {
  const i18n = useI18n();
  return (
    <Box>
      <Stack spacing={3}>
        <Alert severity="info">
          <Link href={URL_KISS_PROXY} target="_blank">
            {i18n("about_api_proxy")}
          </Link>
        </Alert>

        <Box>
          {OPT_TRANS_ALL.map((translator) => (
            <ApiAccordion key={translator} translator={translator} />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}