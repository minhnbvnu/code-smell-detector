function NavigationButtons() {
  const isExtensionWidth = useIsExtensionWidth();
  const [page] = usePage();

  if (isExtensionPopup) {
    return null;
  }

  let elements = [];
  if (page === 'wallet') {
    elements = [
      isExtension && <ConnectionsButton />,
      <WalletSelector />,
      <NetworkSelector />,
    ];
  } else if (page === 'connections') {
    elements = [<WalletButton />];
  }

  if (isExtension && isExtensionWidth) {
    elements.push(<ExpandButton />);
  }

  return elements;
}