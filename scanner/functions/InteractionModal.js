function InteractionModal({
  okButtonText = 'Ok',
  onOk,
  showCancelButton = true,
  cancelButtonText = 'Cancel',
  onCancel,
  children
}) {
  const [shouldShowModal, setShouldShowModal] = useState(true);

  const handleOk = useCallback(() => {
      setShouldShowModal(false);
      onOk && onOk();
  }, [onOk]);

  const handleCancel = useCallback(() => {
      setShouldShowModal(false);
      onCancel && onCancel();
  }, [onCancel]);

  return (
    <Modal size="sm" show={shouldShowModal}>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {showCancelButton && (
          <Button onClick={handleCancel}>
            {cancelButtonText}
          </Button>
        )}
        <Button onClick={handleOk} appearance="primary">
          {okButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}