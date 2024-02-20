function getPagingInfo() {
            var totalPages = pagesize ? Math.max(1, Math.ceil(totalRows / pagesize)) : 1;
            return { pageSize: pagesize, pageNum: pagenum, totalRows: totalRows, totalPages: totalPages, dataView: self };
        }