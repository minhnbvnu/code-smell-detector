function bwa_hmm(v_, n_, s_, t_)
{
    /* Initialize variables */
    hmm = {};                /* Initial HMM */
    obs = {};                /* Observation sequence */
    var a;
    var b;
    var pi;
    var obs_seq;
    var log_lik;           /* Output likelihood of FO */
    var mul;
    var m;
    var s = s_ || S, t = t_ || T;
    var n = n_ || N;
    var v_model= v_;
    var i;

    if(!v_model){
        console.log("invalid arguments, must specify varying model");
        return 1;
    }

    if(v_model == 'n')
    {
        /* Create observation sequence */
        obs.length = T;
        obs_seq = new Int32Array(T);
        for (i = 0; i < T; i++) {
            obs_seq[i] = 0;
        }
        obs.data = obs_seq;

        /* Run timed tests from 1*mul to 9*mul states */
        if (n >= 8000) {
            return 0;
        }
        // n = 7000;
        /* Assign HMM parameters */
        hmm.nstates = n;
        hmm.nsymbols = S;

        a = new Float32Array(n*n);
        for (i = 0; i < (n * n); i++) {
            a[i] = 1.0/n;
        }
        hmm.a = a;

        b = new Float32Array(n*s);
        for (i = 0; i < (n * S); i++) {
            b[i] = 1.0/S;
        }
        hmm.b = b;

        pi = new Float32Array(n);
        for (i = 0; i < n; i++) {
            pi[i] = 1.0/n;
        }
        hmm.pi = pi;


        /* Run the BWA on the observation sequence */
        var t1 = performance.now();
        log_lik = run_hmm_bwa(hmm, obs, ITERATIONS, 0);
        var t2 = performance.now();

        console.log("The time is " + (t2-t1)/1000 + " seconds");
        console.log("Observations\tLog_likelihood\n");
        console.log(n + "\t");
        console.log(log_lik + "\n");

    } else if(v_model == 's'){
        /* Create observation sequence */
        obs.length = T;
        obs_seq = new Int32Array(T);
        for (i = 0; i < T; i++) {
            obs_seq[i] = 0;
        }
        obs.data = obs_seq;

        if (s >= 8000) {
            return 0;
        }

        /* Assign HMM parameters */
        hmm.nstates = N;
        hmm.nsymbols = s;
        a = new Float32ARray(N*N);
        for (i = 0; i < (N * N); i++) {
            a[i] = 1.0/N;
        }
        hmm.a = a;
        b = new Float32Array(N*s);
        for (i = 0; i < (N * s); i++) {
            b[i] = 1.0/s;
        }
        hmm.b = b;
        pi = new Float32Array(N);
        for (i = 0; i < N; i++) {
            pi[i] = 1.0/N;
        }
        hmm.pi = pi;

        /* Run the BWA on the observation sequence */
        var t1 = performance.now();
        log_lik = run_hmm_bwa(hmm, obs, ITERATIONS, 0);
        var t2 = performance.now();

        console.log("The time is " + (t2-t1)/1000 + " seconds");
        console.log("Observations\tLog_likelihood\n");
        console.log(s +"\t");
        console.log(log_lik + "\n");

    } else if(v_model == 't')
    {
        if (t >= 10000) {
            return 0;
        }
        /* Create HMM */
        hmm.nstates = N;
        hmm.nsymbols = S;
        a = new Float32Array(N*N);
        for (i = 0; i < (N * N); i++) {
            a[i] = 1.0/N;
        }
        hmm.a = a;
        b = new Float32Array(N*S);
        for (i = 0; i < (N * S); i++) {
            b[i] = 1.0/S;
        }
        hmm.b = b;
        pi = new Float32Array(N);
        for (i = 0; i < N; i++) {
            pi[i] = 1.0/N;
        }
        hmm.pi = pi;

        /* Create observation sequence */
        obs.length = t;
        obs_seq = new Int32Array(t);
        for (i = 0; i < t; i++) {
            obs_seq[i] = 0;
        }
        obs.data = obs_seq;

        /* Run the BWA on the observation sequence */
        var t1 = performance.now();
        log_lik = run_hmm_bwa(hmm, obs, ITERATIONS, 0);
        var t2 = performance.now();

        console.log("The time is " + (t2-t1)/1000 + " seconds");
        console.log("Observations\tLog_likelihood\n");
        console.log(t + "\t");
        console.log(log_lik + "\n");
    }
    return { status: 1,
             options: "bwa_hmm(" + [v_, n_, s_, t_].join(",") + ")",
             time: (t2-t1)/1000 };
}