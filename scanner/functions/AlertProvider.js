function AlertProvider({ children }) {
  const vertical = "top";
  const horizontal = "center";
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");

  const showAlert = (msg, type) => {
    setOpen(true);
    setMessage(msg);
    setSeverity(type);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const error = (msg) => showAlert(msg, "error");
  const warning = (msg) => showAlert(msg, "warning");
  const info = (msg) => showAlert(msg, "info");
  const success = (msg) => showAlert(msg, "success");

  return (
    <AlertContext.Provider value={{ error, warning, info, success }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}