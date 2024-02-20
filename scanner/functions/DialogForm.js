function DialogForm({
  open,
  onClose,
  onSubmit,
  children,
  ...rest
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: (e) => {
          e.preventDefault();
          if (onSubmit) {
            onSubmit();
          }
        },
      }}
      onClose={onClose}
      fullScreen={fullScreen}
      {...rest}
    >
      {children}
    </Dialog>
  );
}