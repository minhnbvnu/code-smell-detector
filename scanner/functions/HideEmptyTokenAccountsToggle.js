function HideEmptyTokenAccountsToggle() {
  const [hideEmptyTokenAccounts, setHideEmptyTokenAccounts] = useHideEmptyTokenAccounts();

  return (
    <>
      <Track
        onUpdate
        event={
          hideEmptyTokenAccounts
            ? "hideEmptyTokenAccountsEnabled"
            : "hideEmptyTokenAccountsDisabled"
        }
      />
      <Switch
        isChecked={hideEmptyTokenAccounts}
        onChange={setHideEmptyTokenAccounts}
        data-e2e="hideEmptyTokenAccounts_button"
      />
    </>
  );
}