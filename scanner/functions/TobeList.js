function TobeList({items}) {
  return (
    <ul>
      {items.map(item => (
        <TobeItem key={item.id} is={item.is} text={item.text} />
      ))}
    </ul>
  );
}