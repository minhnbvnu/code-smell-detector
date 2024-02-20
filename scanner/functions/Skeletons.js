function Skeletons({ count = 30 }) {
  // Generating {count = 30} skeletons to match the size of the list.
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}