function ratingToStars(rating) {
    return rating === undefined ? 0 : 1 + Math.round(rating * 4);
}