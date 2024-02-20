function calcW () {
    var x = W[j - 15 * 2]
    var xl = W[j - 15 * 2 + 1]
    var gamma0 = Gamma0(x, xl)
    var gamma0l = Gamma0l(xl, x)

    x = W[j - 2 * 2]
    xl = W[j - 2 * 2 + 1]
    var gamma1 = Gamma1(x, xl)
    var gamma1l = Gamma1l(xl, x)

    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
    var Wi7 = W[j - 7 * 2]
    var Wi7l = W[j - 7 * 2 + 1]

    var Wi16 = W[j - 16 * 2]
    var Wi16l = W[j - 16 * 2 + 1]

    Wil = gamma0l + Wi7l
    Wi = gamma0 + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
    Wil = Wil + gamma1l
    Wi = Wi + gamma1 + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
    Wil = Wil + Wi16l
    Wi = Wi + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)
  }