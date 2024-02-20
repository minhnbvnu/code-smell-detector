function LinkItem({ label, url, icon }) {
  const match = useMatch(url);
  return (
    <ListItemButton component={NavLink} to={url} selected={!!match}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItemButton>
  );
}