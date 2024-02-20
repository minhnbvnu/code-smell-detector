function isInCurrentReportsBuffer(node) {
                return reportsBuffer.reports.some(r => r.node === node);
            }