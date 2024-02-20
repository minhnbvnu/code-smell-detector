async function generateStaticParams() {
  const database = await getDatabase();
  return database?.map((page) => {
    const slug = page.properties.Slug?.formula?.string;
    return ({ id: page.id, slug });
  });
}