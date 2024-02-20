function Hypher(language) {

    /**
     * @type {!Hypher.TrieNode}
     */
    this.trie = this.createTrie(language['patterns']);

    /**
     * @type {!number}
     * @const
     */
    this.leftMin = language['leftmin'];

    /**
     * @type {!number}
     * @const
     */
    this.rightMin = language['rightmin'];

    /**
     * @type {!Object.<string, !Array.<string>>}
     */
    this.exceptions = {};

    if (language['exceptions']) {
        language['exceptions'].split(/,\s?/g).forEach(function (exception) {
            var hyphenationMarker = new RegExp(exception.indexOf('=') !== -1 ? '=' : '-', 'g');
            this.exceptions[exception.replace(hyphenationMarker, '')] = exception.split(hyphenationMarker);
        }, this);
    }
}