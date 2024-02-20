function ClearCacheBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const showClearCacheBanner = useSelector(showClearCacheBannerSelector);
  const dispatch = useDispatch();
  const softReset = useSoftReset();
  const onClick = useCallback(() => {
    try {
      setIsLoading(true);
      softReset();
      dispatch(setShowClearCacheBanner(false));
    } catch (err) {
      setIsLoading(false);
    }
  }, [dispatch, softReset]);

  if (!showClearCacheBanner && !isLoading) return null;
  return (
    <TopBanner
      status="orange"
      content={{
        message: <Trans i18nKey="banners.cleanCache.title" />,
        Icon: TriangleWarning,
        right: (
          <Link id="modal-migrate-accounts-button" onClick={onClick}>
            {isLoading ? <Spinner size={16} /> : <Trans i18nKey="banners.cleanCache.cta" />}
          </Link>
        ),
      }}
      bannerId={"migrate"}
    />
  );
}