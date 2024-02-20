function needsIndefiniteArticle(options) {
        return (options.indefinite_article !== undefined && typeof options.indefinite_article != 'string' && options.indefinite_article);
    }