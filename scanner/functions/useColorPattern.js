function useColorPattern(canvasCtx) {
  const lineColorsImagePromise = useTypedSelector(getLineColorsImage);
  const lineColorsImage = usePromiseValueOrNull(lineColorsImagePromise);
  return Object(react["useMemo"])(() => {
    if (canvasCtx == null || lineColorsImage == null) {
      return null;
    }

    return canvasCtx.createPattern(lineColorsImage, "repeat-x");
  }, [canvasCtx, lineColorsImage]);
}