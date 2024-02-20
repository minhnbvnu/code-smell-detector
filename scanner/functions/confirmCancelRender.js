function confirmCancelRender(props) {
  const { hasCancel, hasConfirm, confirm, cancel } = props;
  if (hasCancel && hasConfirm) {
    return (
      <div className="twoButton">
        <p onClick={cancel}>取消</p>
        <p onClick={confirm}>确定</p>
      </div>
    );
  }
  if (hasConfirm || hasCancel) {
    return (
      <div className="oneButton">
        {hasCancel && <p onClick={cancel}>取消</p>}
        {hasConfirm && <p onClick={confirm}>确定</p>}
      </div>
    );
  }
  return null;
}