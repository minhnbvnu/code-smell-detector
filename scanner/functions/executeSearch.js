function executeSearch(phrase)
{
    if (this.searchPhrase !== phrase)
    {
        this.current = 1;
        this.searchPhrase = phrase;
        loadData.call(this);
    }
}