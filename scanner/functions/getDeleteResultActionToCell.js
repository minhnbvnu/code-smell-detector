function getDeleteResultActionToCell(cell) {
    switch (where) {
      case TableResultAction.where.Column:
        if (cell.isColSpan) {
          return TableResultAction.resultAction.SubtractSpanCount;
        }

        break;

      case TableResultAction.where.Row:
        if (!cell.isVirtual && cell.isRowSpan) {
          return TableResultAction.resultAction.AddCell;
        } else if (cell.isRowSpan) {
          return TableResultAction.resultAction.SubtractSpanCount;
        }

        break;
    }

    return TableResultAction.resultAction.RemoveCell;
  }