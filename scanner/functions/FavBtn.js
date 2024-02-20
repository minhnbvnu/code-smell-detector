function FavBtn({ word }) {
  const { favWords, toggleFav } = useFavWords();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await toggleFav(word);
    } catch (err) {
      console.log("[set fav]", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton disabled={loading} size="small" onClick={handleClick}>
      {favWords[word] ? (
        <FavoriteIcon fontSize="inherit" />
      ) : (
        <FavoriteBorderIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}