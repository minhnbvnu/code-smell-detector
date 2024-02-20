function host_and_ports_match(url1, url2) {
        if (url1.indexOf('http') < 0)
            url1 = 'http://' + url1;
        if (url2.indexOf('http') < 0)
            url2 = 'http://' + url2;
        var a = url.parse(url1), b = url.parse(url2);
        return a.host == b.host
            && String(a.port || (a.protocol == 'https:' ? 443 : 80))
                == String(b.port || (b.protocol == 'https:' ? 443 : 80));
    }