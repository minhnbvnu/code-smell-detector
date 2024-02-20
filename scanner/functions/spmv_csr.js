function spmv_csr(matrix, dim, rowv, colv, v, y, out) {
    var row, row_start, row_end, jj;
    var sum = 0;

    for(row=0; row< dim; ++row){
        sum = y[row];
        row_start = rowv[row];
        row_end = rowv[row+1];

        for(jj = row_start; jj<row_end; ++jj){
            sum += matrix[jj] * v[colv[jj]];
        }

        out[row] = sum;
    }
}