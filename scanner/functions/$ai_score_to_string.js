function $ai_score_to_string(score) {
    if ($Math.abs(score) === Infinity) {
        return unparse(score);
    } else if (is_string(score)) {
        return score;
    } else {
        return format_number(score, "0.00");
    }
}