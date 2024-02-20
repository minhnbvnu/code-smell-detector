function PillsDaysCount() {
  const [selected, onChange, options] = useTimeRange();
  return (
    <>
      <Track onUpdate event="PillsDaysChange" selected={selected} />
      {/* $FlowFixMe */}
      <Pills items={options} activeKey={selected} onChange={onChange} bordered />
    </>
  );
}