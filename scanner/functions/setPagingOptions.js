function setPagingOptions(args) {
            if (onBeforePagingInfoChanged.notify(getPagingInfo(), null, self) !== false) {
                if (args.pageSize != undefined) {
                    pagesize = args.pageSize;
                    pagenum = pagesize ? Math.min(pagenum, Math.max(0, Math.ceil(totalRows / pagesize) - 1)) : 0;
                }
                if (args.pageNum != undefined) {
                    pagenum = Math.min(args.pageNum, Math.max(0, Math.ceil(totalRows / pagesize) - 1));
                }
                onPagingInfoChanged.notify(getPagingInfo(), null, self);
                refresh();
            }
        }