function run_hmm_bwa(hmm, in_obs, iterations, threshold){

    /* Host-side variables */
    var a;
    var b;
    var pi;
    var new_log_lik;
    var old_log_lik = 0;
    var iter;

    /* Initialize HMM values */
    a = hmm.a;
    b = hmm.b;
    pi = hmm.pi;
    nsymbols = hmm.nsymbols;
    nstates = hmm.nstates;
    obs = in_obs.data;
    length = in_obs.length;

    /* Allocate host memory */
    scale = new Float32Array(length);

    alpha = new Float32Array(nstates*length);
    beta = new Float32Array(nstates*length);
    gamma_sum =  new Float32Array(nstates);
    xi_sum =  new Float32Array(nstates*nstates);
    c = new Float32Array(nstates);
    ones_n = new Float32Array(nstates);
    ones_s = new Float32Array(nsymbols);

    init_ones_dev(ones_s, nsymbols);

    //   /**
    //    * a_d => a
    //    * b_d => b
    //    * pi_d => pi
    //    */

    /* Run BWA for either max iterations or until threshold is reached */
    for (iter = 0; iter < iterations; iter++) {
        new_log_lik = calc_alpha(a, b, pi);
        if (new_log_lik == EXIT_ERROR) {
            return EXIT_ERROR;
        }
        if (calc_beta(a, b) == EXIT_ERROR) {
            return EXIT_ERROR;
        }

        calc_gamma_sum();

        if (calc_xi_sum(a, b) == EXIT_ERROR) {
            return EXIT_ERROR;
        }

        if (estimate_a(a) == EXIT_ERROR) {
            return EXIT_ERROR;
        }

        if (estimate_b(b) == EXIT_ERROR) {
            return EXIT_ERROR;
        }

        if (estimate_pi(pi) == EXIT_ERROR) {
            return EXIT_ERROR;
        }

        /* check log_lik vs. threshold */
        if (threshold > 0 && iter > 0) {
            if (fabs(pow(10,new_log_lik) - pow(10,old_log_lik)) < threshold) {
                break;
            }
        }

        old_log_lik = new_log_lik;
    }
    return new_log_lik;
}