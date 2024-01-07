function Clock() {
  const time = useTime();
  return <p>Time: {time}</p>;
}