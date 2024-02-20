function Qrcode({ value }) {
  const [showQrcode, setShowQrcode] = React.useState(false);
  const classes = useQrCodeStyles();

  return (
    <>
      <IconButton onClick={() => setShowQrcode(true)}>
        <QrcodeIcon />
      </IconButton>
      <Dialog open={showQrcode} onClose={() => setShowQrcode(false)}>
        <DialogContent className={classes.qrcodeContainer}>
          <QRCode value={value} size={256} includeMargin />
        </DialogContent>
      </Dialog>
    </>
  );
}