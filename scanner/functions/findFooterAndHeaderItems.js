function findFooterAndHeaderItems(selector)
{
    var footer = (this.footer) ? this.footer.find(selector) : $(),
        header = (this.header) ? this.header.find(selector) : $();
    return $.merge(footer, header);
}