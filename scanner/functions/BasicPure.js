function BasicPure(props) {
  return (
    <div
      className={`basic-pure ${props.className}`}
      onClick={function handleOnClick() {}}
    >
      <div id="group-id" className="group">
        <span>{props.children}</span>
        <span className="empty" />
      </div>
    </div>
  );
}