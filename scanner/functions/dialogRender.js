function dialogRender(props) {
  const { title, children } = props;
  return (
    <div className="dialogRender">
      <h3 className="title">{title}</h3>
      {children}
      {confirmCancelRender({ ...props })}
    </div>
  );
}