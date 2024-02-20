function absolutize_url(absolute_url_regex, relative_url_root, url) {
        if (relative_url_root && !absolute_url_regex.test(url)) {
            url = join_relative_urls(relative_url_root, url);
        }
        return url;
    }