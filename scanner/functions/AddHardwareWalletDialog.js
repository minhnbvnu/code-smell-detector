function AddHardwareWalletDialog({ open, onAdd, onClose }) {
  const [view, setView] = useState(AddHardwareView.Splash);
  const [hardwareAccount, setHardwareAccount] = useState(null);
  return (
    <DialogForm onClose={onClose} open={open} onEnter={() => {}} fullWidth>
      {view === AddHardwareView.Splash ? (
        <AddHardwareWalletSplash
          onClose={onClose}
          onContinue={() => setView(AddHardwareView.Accounts)}
        />
      ) : view === AddHardwareView.Accounts ? (
        <LedgerAccounts
          onContinue={(account) => {
            setHardwareAccount(account);
            setView(AddHardwareView.Confirm);
          }}
          open={open}
          onClose={onClose}
        />
      ) : (
        <ConfirmHardwareWallet
          account={hardwareAccount}
          onDone={() => {
            onAdd(hardwareAccount);
            onClose();
            setView(AddHardwareView.Splash);
          }}
          onBack={() => {
            setView(AddHardwareView.Accounts);
          }}
        />
      )}
    </DialogForm>
  );
}