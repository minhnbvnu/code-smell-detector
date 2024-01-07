function FixtureError({error}) {
  return (
    <section>
      <h2>Error loading fixture</h2>
      <p>{error.message}</p>
    </section>
  );
}