function mat_vec_mul(trans, m, n, a, lda, x, offsetx, y, offsety){
    if((trans != 'n') && (trans != 't')){
        return;
    }

    var i,j, n_size, m_size;
    var sum;
    if(lda == m){
        n_size = n;
        m_size = m;
    }
    else{
        n_size = m;
        m_size = n;
    }
    if(trans=='n'){
        for(i=0; i<m_size; ++i){
            sum = 0.0;
            for(j=0; j<n_size; ++j){
                sum  += a[i*n_size + j]*x[offsetx + j];
            }
            y[i + offsety] = sum;
        }
    }
    else{
        for(i=0; i<m_size; ++i){
            sum = 0.0;
            for(j=0; j<n_size; ++j){
                sum += a[j*n_size + i]*x[offsetx + j];
            }
            y[i + offsety] = sum;
        }
    }
}