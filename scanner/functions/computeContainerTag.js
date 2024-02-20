function computeContainerTag(html) {
        return containerTagHash[html.substr(0, 3) // faster than using regex
        ] || 'div';
    }