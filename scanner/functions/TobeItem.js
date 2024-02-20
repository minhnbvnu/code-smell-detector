function TobeItem({is, text}) {
  return (
    <li
      style={{
        textDecoration: is ? 'none' : 'line-through',
      }}
    >
      {text}
    </li>
  );
}