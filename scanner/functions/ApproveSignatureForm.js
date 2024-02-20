function ApproveSignatureForm({
  origin,
  messages,
  messageDisplay,
  onApprove,
  onReject,
  autoApprove,
}) {
  const classes = useStyles();
  const buttonRef = useRef();

  const isMultiTx = messageDisplay === 'tx' && messages.length > 1;

  const renderFormContent = () => {
    if (messageDisplay === 'tx') {
      return (
        <SignTransactionFormContent
          autoApprove={autoApprove}
          origin={origin}
          messages={messages}
          onApprove={onApprove}
          buttonRef={buttonRef}
        />
      );
    } else {
      return (
        <SignFormContent
          origin={origin}
          message={messages[0]}
          messageDisplay={messageDisplay}
          buttonRef={buttonRef}
        />
      );
    }
  };

  return (
    <Card>
      {renderFormContent()}
      <CardActions className={classes.actions}>
        <Button onClick={onReject}>Cancel</Button>
        <Button
          ref={buttonRef}
          className={classes.approveButton}
          variant="contained"
          color="primary"
          onClick={onApprove}
        >
          Approve{isMultiTx ? ' All' : ''}
        </Button>
      </CardActions>
    </Card>
  );
}