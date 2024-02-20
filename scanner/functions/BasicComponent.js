function BasicComponent(props) {
  return (
    <div
      className={`basic-memo ${props.className}`}
      onClick={function handleOnClick() {}}
    >
      <div id="group-id" className="group">
        <span className="empty" />
      </div>
    </div>
  );
}