function RowHeader({children, checked, onChange}) {
  return (
    <div
      css={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </div>
  );
}