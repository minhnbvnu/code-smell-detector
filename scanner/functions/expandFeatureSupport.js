function expandFeatureSupport(input) {
  // https://stackoverflow.com/a/1732454/96656
  const re = /<feature-support\s+chrome="(?<chrome>[^"]+)"\s+firefox="(?<firefox>[^"]+)"\s+safari="(?<safari>[^"]+)"\s+nodejs="(?<nodejs>[^"]+)"\s+babel="(?<babel>[^"]+)"><\/feature-support>/g;
  return input.replace(re, (...args) => {
    const groups = args[args.length - 1];
    const buf = ['<ul class="feature-support">'];
    for (const [key, value] of Object.entries(groups)) {
      const [version, url] = value.split(' ');
      const {className, description} = describeSupport(version);
      buf.push(`
        <li class="environment ${ className }${ url ? ' has-link' : ''}">
          ${ url ? `<a href="${ encodeURI(url) }">` : '' }
            <span class="icon ${ key }">${ environmentIdToName(key) }:</span>
            ${ description }
          ${ url ? '</a>' : '' }
        </li>
      `);
    }
    buf.push('</ul><div class="feature-support-info"><a href="/features/support">about this feature support listing</a></div>');
    return buf.join('\n').replace(/\s+/g, ' ');
  });
}