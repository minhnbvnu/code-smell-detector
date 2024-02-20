function SwapButton({ size }) {
  const isExtensionWidth = useIsExtensionWidth();
  if (isExtensionWidth) {
    return <SwapButtonDialog size={size} />;
  } else {
    return <SwapButtonPopover size={size} />;
  }
}