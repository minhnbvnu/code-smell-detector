function generateRandomCSR(dim, density, stddev) {
    var i, j, nnz_ith_row, nnz, update_interval, rand_col;
    var nnz_ith_row_double, nz_error, nz_per_row_doubled, high_bound;
    var used_cols;
    var m = {};

    // lets figure out how many non zero entries we have
    m.num_rows = dim;
    m.num_cols = dim;
    m.density_perc = density/10000.0;
    m.nz_per_row = dim*density/1000000;
    m.num_nonzeros = Math.round(m.nz_per_row*dim);
    m.stdev = stddev * m.nz_per_row;

    m.Arow = new Uint32Array(m.num_rows+1);
    m.Acol = new Uint32Array(m.num_nonzeros); // TA

    m.Arow[0] = 0;
    nnz = 0;
    nz_per_row_doubled = 2*m.nz_per_row;
    high_bound = Math.min(m.num_cols, nz_per_row_doubled);
    used_cols = new Int8Array(m.num_cols);

    update_interval = Math.round(m.num_rows/10.0);
    for(i=0; i<m.num_rows; ++i) {
        if(i % update_interval == 0) console.log(i + " rows of " + m.num_rows +
                " generated. Continuing...");

     nnz_ith_row_double = randNorm();
     nnz_ith_row_double *= m.stdev;
     nnz_ith_row_double += m.nz_per_row;

     if(nnz_ith_row_double < 0) nnz_ith_row = 0;
     else if (nnz_ith_row_double > high_bound) nnz_ith_row = high_bound;
     else nnz_ith_row = Math.abs(Math.round(nnz_ith_row_double));

     m.Arow[i+1] = m.Arow[i] + nnz_ith_row;

     // no realloc in javascript typed arrays
     if(m.Arow[i+1] > m.num_nonzeros) {
         var temp =  m.Acol;
         m.Acol = new Int32Array(m.Arow[i+1]); // TA
         m.Acol.set(temp, 0);
     }

     for(j=0; j<m.num_cols; ++j) {
         used_cols[j] = 0;
     }

     for(j=0; j<nnz_ith_row; ++j) {
         rand_col = genRand(0, m.num_cols -1);
         if(used_cols[rand_col]) {
             --j;
         }
         else {
             m.Acol[m.Arow[i]+j] = rand_col;
             used_cols[rand_col] = 1;
         }
     }

     // sort the column entries
     sortArray(m.Acol, m.Arow[i], m.Arow[i+1]); // TA
    }

    nz_error = (Math.abs(m.num_nonzeros - m.Arow[m.num_rows]))/m.num_nonzeros;
    if(nz_error >= 0.5)
     console.log("WARNING: Actual NNZ differs from Theoretical NNZ by" +
             nz_error*100+ "%\n");

    m.num_nonzeros = m.Arow[m.num_rows];
    console.log("Actual NUM_nonzeros: " + m.num_nonzeros + "\n");

    m.density_perc = m.num_nonzeros*100.0/(m.num_cols*m.num_rows);
    m.density_ppm = Math.round(m.density_perc * 10000.0);
    console.log("Actual Density: " + m.density_perc + "% ppm: " + m.density_ppm);

    m.Ax = new Float32Array(m.num_nonzeros);
    for(i=0; i<m.num_nonzeros; ++i) {
        m.Ax[i] = randf();
        while(m.Ax[i] === 0.0)
            m.Ax[i] = randf();
    }
    return m;
}