function googleProfileToMatrixProfile(profile) {
  const { id, emails, displayName: name, photos, provider } = profile;

  const email = emails?.[0]?.value;
  const imageUrl = photos?.[0]?.value;

  return {
    id,
    imageUrl,
    provider,
    name,
    email
  };
}