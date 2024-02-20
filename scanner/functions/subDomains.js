function subDomains(url) {
    const subDomainsPtrn = /\$\{u:([\w-_.|]+)\}/.exec(url);

    if (!subDomainsPtrn) {
        return url;
    }

    const subDomainsList = subDomainsPtrn[1].split('|');

    return url.replace(subDomainsPtrn[0], subDomainsList[(subDomainsCount++) % subDomainsList.length]);
}