function setTotals(total)
{
    this.total = total;
    this.totalPages = (this.rowCount === -1) ? 1 :
        Math.ceil(this.total / this.rowCount);
}