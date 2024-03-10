    function H(a, b, c, d, e, f) {
      self[b] = function(b, d, e, f, g, h, k) {
    function cc(a, b, c, d, e, f, g) {
    function Ld(a, b, c, d, e, f) {
      self[b] = function(a, b, c, k, l, m, n, r, q) {
      self[a] = function(a, b, h, k, l, m, n) {
    function fb(a, b, c, d, e, f) {
    function oc(a, b, c, d) {
      var e = a.ab,
        f = a.c * b,
        g = a.C;
      b = g + b;
      var h = c,
        k = d;
      d = a.Ta;
      for (c = a.Ua; 0 < e--; ) {
        var l = a.gc[e],
          m = g,
          n = b,
          r = h,
          q = k,
          k = d,
          h = c,
          t = l.Ea;
        x(m < n);
        x(n <= l.nc);
        switch (l.hc) {
          case 2:
            pc(r, q, (n - m) * t, k, h);
            break;
          case 0:
            var v = l,
              p = m,
              u = n,
              w = k,
              y = h,
              A = v.Ea;
            0 == p &&
              (ee(r, q, null, null, 1, w, y),
              cc(r, q + 1, 0, 0, A - 1, w, y + 1),
              (q += A),
              (y += A),
              ++p);
            for (
              var E = 1 << v.b,
                B = E - 1,
                C = xa(A, v.b),
                N = v.K,
                v = v.w + (p >> v.b) * C;
              p < u;

            ) {
              var z = N,
                Q = v,
                S = 1;
              for (fe(r, q, w, y - A, 1, w, y); S < A; ) {
                var K = qc[(z[Q++] >> 8) & 15],
                  D = (S & ~B) + E;
                D > A && (D = A);
                K(r, q + +S, w, y + S - A, D - S, w, y + S);
                S = D;
              }
              q += A;
              y += A;
              ++p;
              p & B || (v += C);
            }
            n != l.nc && I(k, h - t, k, h + (n - m - 1) * t, t);
            break;
          case 1:
            t = r;
            u = q;
            r = l.Ea;
            q = 1 << l.b;
            w = q - 1;
            y = r & ~w;
            A = r - y;
            p = xa(r, l.b);
            E = l.K;
            for (l = l.w + (m >> l.b) * p; m < n; ) {
              B = E;
              C = l;
              N = new Jd();
              v = u + y;
              for (z = u + r; u < v; )
                dc(B[C++], N), Fb(N, t, u, q, k, h), (u += q), (h += q);
              u < z &&
                (dc(B[C++], N), Fb(N, t, u, A, k, h), (u += A), (h += A));
              ++m;
              m & w || (l += p);
            }
            break;
          case 3:
            if (r == k && q == h && 0 < l.b) {
              y = (n - m) * xa(l.Ea, l.b);
              t = h + (n - m) * t - y;
              u = k;
              r = t;
              q = k;
              w = h;
              A = y;
              p = [];
              for (y = A - 1; 0 <= y; --y) p[y] = q[w + y];
              for (y = A - 1; 0 <= y; --y) u[r + y] = p[y];
              rc(l, m, n, k, t, k, h);
            } else rc(l, m, n, r, q, k, h);
        }
        h = d;
        k = c;
      }
      k != c && I(d, c, h, k, f);
    }
    function zc(a, b, c, d, e, f) {
    function Jb(a, b, c, d, e, f, g) {
      var h = a.$ / d,
        k = a.$ % d,
        l = a.m,
        m = a.s,
        n = c + a.$,
        r = n;
      e = c + d * e;
      var q = c + d * f,
        t = 280 + m.ua,
        v = a.Pb ? h : 16777216,
        p = 0 < m.ua ? m.Wa : null,
        u = m.wc,
        w = n < q ? ha(m, k, h) : null;
      x(a.C < f);
      x(q <= e);
      var y = !1;
      a: for (;;) {
        for (; y || n < q; ) {
          var A = 0;
          if (h >= v) {
            var v = a,
              E = n - c;
            x(v.Pb);
            v.wd = v.m;
            v.xd = E;
            0 < v.s.ua && $b(v.s.Wa, v.s.vb);
            v = h + ie;
          }
          k & u || (w = ha(m, k, h));
          x(null != w);
          w.Qb && ((b[n] = w.qb), (y = !0));
          if (!y)
            if ((Sa(l), w.jc)) {
              var A = l,
                E = b,
                B = n,
                C = w.pd[pb(A) & (xb - 1)];
              x(w.jc);
              256 > C.g
                ? (qb(A, A.u + C.g), (E[B] = C.value), (A = 0))
                : (qb(A, A.u + C.g - 256), x(256 <= C.value), (A = C.value));
              0 == A && (y = !0);
            } else A = ua(w.G[0], w.H[0], l);
          if (l.h) break;
          if (y || 256 > A) {
            if (!y)
              if (w.nd) b[n] = (w.qb | (A << 8)) >>> 0;
              else {
                Sa(l);
                y = ua(w.G[1], w.H[1], l);
                Sa(l);
                E = ua(w.G[2], w.H[2], l);
                B = ua(w.G[3], w.H[3], l);
                if (l.h) break;
                b[n] = ((B << 24) | (y << 16) | (A << 8) | E) >>> 0;
              }
            y = !1;
            ++n;
            ++k;
            if (
              k >= d &&
              ((k = 0),
              ++h,
              null != g && h <= f && !(h % 16) && g(a, h),
              null != p)
            )
              for (; r < n; )
                (A = b[r++]),
                  (p.X[((506832829 * A) & 4294967295) >>> p.Mb] = A);
          } else if (280 > A) {
            A = ib(A - 256, l);
            E = ua(w.G[4], w.H[4], l);
            Sa(l);
            E = ib(E, l);
            E = nc(d, E);
            if (l.h) break;
            if (n - c < E || e - n < A) break a;
            else for (B = 0; B < A; ++B) b[n + B] = b[n + B - E];
            n += A;
            for (k += A; k >= d; )
              (k -= d), ++h, null != g && h <= f && !(h % 16) && g(a, h);
            x(n <= e);
            k & u && (w = ha(m, k, h));
            if (null != p)
              for (; r < n; )
                (A = b[r++]),
                  (p.X[((506832829 * A) & 4294967295) >>> p.Mb] = A);
          } else if (A < t) {
            y = A - 280;
            for (x(null != p); r < n; )
              (A = b[r++]), (p.X[((506832829 * A) & 4294967295) >>> p.Mb] = A);
            A = n;
            E = p;
            x(!(y >>> E.Xa));
            b[A] = E.X[y];
            y = !0;
          } else break a;
          y || x(l.h == db(l));
        }
        if (a.Pb && l.h && n < e)
          x(a.m.h),
            (a.a = 5),
            (a.m = a.wd),
            (a.$ = a.xd),
            0 < a.s.ua && $b(a.s.vb, a.s.Wa);
        else if (l.h) break a;
        else null != g && g(a, h > f ? f : h), (a.a = 0), (a.$ = n - c);
        return 1;
      }
      a.a = 3;
      return 0;
    }
    function rb(a, b, c, d, e) {
      var f = 1,
        g = [a],
        h = [b],
        k = d.m,
        l = d.s,
        m = null,
        n = 0;
      a: for (;;) {
        if (c)
          for (; f && D(k, 1); ) {
            var r = g,
              q = h,
              t = d,
              v = 1,
              p = t.m,
              u = t.gc[t.ab],
              w = D(p, 2);
            if (t.Oc & (1 << w)) f = 0;
            else {
              t.Oc |= 1 << w;
              u.hc = w;
              u.Ea = r[0];
              u.nc = q[0];
              u.K = [null];
              ++t.ab;
              x(4 >= t.ab);
              switch (w) {
                case 0:
                case 1:
                  u.b = D(p, 3) + 2;
                  v = rb(xa(u.Ea, u.b), xa(u.nc, u.b), 0, t, u.K);
                  u.K = u.K[0];
                  break;
                case 3:
                  var y = D(p, 8) + 1,
                    A = 16 < y ? 0 : 4 < y ? 1 : 2 < y ? 2 : 3;
                  r[0] = xa(u.Ea, A);
                  u.b = A;
                  var v = rb(y, 1, 0, t, u.K),
                    E;
                  if ((E = v)) {
                    var B,
                      C = y,
                      N = u,
                      z = 1 << (8 >> N.b),
                      Q = V(z);
                    if (null == Q) E = 0;
                    else {
                      var S = N.K[0],
                        K = N.w;
                      Q[0] = N.K[0][0];
                      for (B = 1; B < 1 * C; ++B) Q[B] = yb(S[K + B], Q[B - 1]);
                      for (; B < 4 * z; ++B) Q[B] = 0;
                      N.K[0] = null;
                      N.K[0] = Q;
                      E = 1;
                    }
                  }
                  v = E;
                  break;
                case 2:
                  break;
                default:
                  x(0);
              }
              f = v;
            }
          }
        g = g[0];
        h = h[0];
        if (f && D(k, 1) && ((n = D(k, 4)), (f = 1 <= n && 11 >= n), !f)) {
          d.a = 3;
          break a;
        }
        var H;
        if ((H = f))
          b: {
            var F = d,
              G = g,
              L = h,
              J = n,
              T = c,
              Da,
              ba,
              X = F.m,
              R = F.s,
              P = [null],
              U,
              W = 1,
              aa = 0,
              na = me[J];
            c: for (;;) {
              if (T && D(X, 1)) {
                var ca = D(X, 3) + 2,
                  ga = xa(G, ca),
                  ka = xa(L, ca),
                  qa = ga * ka;
                if (!rb(ga, ka, 0, F, P)) break c;
                P = P[0];
                R.xc = ca;
                for (Da = 0; Da < qa; ++Da) {
                  var ia = (P[Da] >> 8) & 65535;
                  P[Da] = ia;
                  ia >= W && (W = ia + 1);
                }
              }
              if (X.h) break c;
              for (ba = 0; 5 > ba; ++ba) {
                var Y = Dc[ba];
                !ba && 0 < J && (Y += 1 << J);
                aa < Y && (aa = Y);
              }
              var ma = wa(W * na, O);
              var ua = W,
                va = wa(ua, Ub);
              if (null == va) var la = null;
              else x(65536 >= ua), (la = va);
              var ha = V(aa);
              if (null == la || null == ha || null == ma) {
                F.a = 1;
                break c;
              }
              var pa = ma;
              for (Da = U = 0; Da < W; ++Da) {
                var ja = la[Da],
                  da = ja.G,
                  ea = ja.H,
                  Fa = 0,
                  ra = 1,
                  Ha = 0;
                for (ba = 0; 5 > ba; ++ba) {
                  Y = Dc[ba];
                  da[ba] = pa;
                  ea[ba] = U;
                  !ba && 0 < J && (Y += 1 << J);
                  d: {
                    var sa,
                      za = Y,
                      ta = F,
                      oa = ha,
                      db = pa,
                      eb = U,
                      Ia = 0,
                      Ka = ta.m,
                      fb = D(Ka, 1);
                    M(oa, 0, 0, za);
                    if (fb) {
                      var gb = D(Ka, 1) + 1,
                        hb = D(Ka, 1),
                        Ja = D(Ka, 0 == hb ? 1 : 8);
                      oa[Ja] = 1;
                      2 == gb && ((Ja = D(Ka, 8)), (oa[Ja] = 1));
                      var ya = 1;
                    } else {
                      var Ua = V(19),
                        Va = D(Ka, 4) + 4;
                      if (19 < Va) {
                        ta.a = 3;
                        var Aa = 0;
                        break d;
                      }
                      for (sa = 0; sa < Va; ++sa) Ua[ne[sa]] = D(Ka, 3);
                      var Ba = void 0,
                        sb = void 0,
                        Wa = ta,
                        ib = Ua,
                        Ca = za,
                        Xa = oa,
                        Oa = 0,
                        La = Wa.m,
                        Ya = 8,
                        Za = wa(128, O);
                      e: for (;;) {
                        if (!Z(Za, 0, 7, ib, 19)) break e;
                        if (D(La, 1)) {
                          var kb = 2 + 2 * D(La, 3),
                            Ba = 2 + D(La, kb);
                          if (Ba > Ca) break e;
                        } else Ba = Ca;
                        for (sb = 0; sb < Ca && Ba--; ) {
                          Sa(La);
                          var $a = Za[0 + (pb(La) & 127)];
                          qb(La, La.u + $a.g);
                          var jb = $a.value;
                          if (16 > jb) (Xa[sb++] = jb), 0 != jb && (Ya = jb);
                          else {
                            var lb = 16 == jb,
                              ab = jb - 16,
                              mb = oe[ab],
                              bb = D(La, pe[ab]) + mb;
                            if (sb + bb > Ca) break e;
                            else
                              for (var nb = lb ? Ya : 0; 0 < bb--; )
                                Xa[sb++] = nb;
                          }
                        }
                        Oa = 1;
                        break e;
                      }
                      Oa || (Wa.a = 3);
                      ya = Oa;
                    }
                    (ya = ya && !Ka.h) && (Ia = Z(db, eb, 8, oa, za));
                    ya && 0 != Ia ? (Aa = Ia) : ((ta.a = 3), (Aa = 0));
                  }
                  if (0 == Aa) break c;
                  ra && 1 == qe[ba] && (ra = 0 == pa[U].g);
                  Fa += pa[U].g;
                  U += Aa;
                  if (3 >= ba) {
                    var Pa = ha[0],
                      tb;
                    for (tb = 1; tb < Y; ++tb) ha[tb] > Pa && (Pa = ha[tb]);
                    Ha += Pa;
                  }
                }
                ja.nd = ra;
                ja.Qb = 0;
                ra &&
                  ((ja.qb =
                    ((da[3][ea[3] + 0].value << 24) |
                      (da[1][ea[1] + 0].value << 16) |
                      da[2][ea[2] + 0].value) >>>
                    0),
                  0 == Fa &&
                    256 > da[0][ea[0] + 0].value &&
                    ((ja.Qb = 1), (ja.qb += da[0][ea[0] + 0].value << 8)));
                ja.jc = !ja.Qb && 6 > Ha;
                if (ja.jc) {
                  var Ga,
                    Ea = ja;
                  for (Ga = 0; Ga < xb; ++Ga) {
                    var Ma = Ga,
                      Na = Ea.pd[Ma],
                      vb = Ea.G[0][Ea.H[0] + Ma];
                    256 <= vb.value
                      ? ((Na.g = vb.g + 256), (Na.value = vb.value))
                      : ((Na.g = 0),
                        (Na.value = 0),
                        (Ma >>= ub(vb, 8, Na)),
                        (Ma >>= ub(Ea.G[1][Ea.H[1] + Ma], 16, Na)),
                        (Ma >>= ub(Ea.G[2][Ea.H[2] + Ma], 0, Na)),
                        ub(Ea.G[3][Ea.H[3] + Ma], 24, Na));
                  }
                }
              }
              R.vc = P;
              R.Wb = W;
              R.Ya = la;
              R.yc = ma;
              H = 1;
              break b;
            }
            H = 0;
          }
        f = H;
        if (!f) {
          d.a = 3;
          break a;
        }
        if (0 < n) {
          if (((l.ua = 1 << n), !Zb(l.Wa, n))) {
            d.a = 1;
            f = 0;
            break a;
          }
        } else l.ua = 0;
        var Qa = d,
          cb = g,
          ob = h,
          Ra = Qa.s,
          Ta = Ra.xc;
        Qa.c = cb;
        Qa.i = ob;
        Ra.md = xa(cb, Ta);
        Ra.wc = 0 == Ta ? -1 : (1 << Ta) - 1;
        if (c) {
          d.xb = re;
          break a;
        }
        m = V(g * h);
        if (null == m) {
          d.a = 1;
          f = 0;
          break a;
        }
        f = (f = Jb(d, m, 0, g, h, h, null)) && !k.h;
        break a;
      }
      f
        ? (null != e ? (e[0] = m) : (x(null == m), x(c)), (d.$ = 0), c || Ac(l))
        : Ac(l);
      return f;
    }
    function Kc(a, b) {
      if (null == a) return 0;
      a.a = 0;
      a.sc = "OK";
      if (null == b) return T(a, 2, "null VP8Io passed to VP8GetHeaders()");
      var c = b.data;
      var d = b.w;
      var e = b.ha;
      if (4 > e) return T(a, 7, "Truncated header.");
      var f = c[d + 0] | (c[d + 1] << 8) | (c[d + 2] << 16);
      var g = a.Od;
      g.Rb = !(f & 1);
      g.td = (f >> 1) & 7;
      g.yd = (f >> 4) & 1;
      g.ub = f >> 5;
      if (3 < g.td) return T(a, 3, "Incorrect keyframe parameters.");
      if (!g.yd) return T(a, 4, "Frame not displayable.");
      d += 3;
      e -= 3;
      var h = a.Kc;
      if (g.Rb) {
        if (7 > e) return T(a, 7, "cannot parse picture header");
        if (!Jc(c, d, e)) return T(a, 3, "Bad code word");
        h.c = ((c[d + 4] << 8) | c[d + 3]) & 16383;
        h.Td = c[d + 4] >> 6;
        h.i = ((c[d + 6] << 8) | c[d + 5]) & 16383;
        h.Ud = c[d + 6] >> 6;
        d += 7;
        e -= 7;
        a.za = (h.c + 15) >> 4;
        a.Ub = (h.i + 15) >> 4;
        b.width = h.c;
        b.height = h.i;
        b.Da = 0;
        b.j = 0;
        b.v = 0;
        b.va = b.width;
        b.o = b.height;
        b.da = 0;
        b.ib = b.width;
        b.hb = b.height;
        b.U = b.width;
        b.T = b.height;
        f = a.Pa;
        M(f.jb, 0, 255, f.jb.length);
        f = a.Qa;
        x(null != f);
        f.Cb = 0;
        f.Bb = 0;
        f.Fb = 1;
        M(f.Zb, 0, 0, f.Zb.length);
        M(f.Lb, 0, 0, f.Lb);
      }
      if (g.ub > e) return T(a, 7, "bad partition length");
      f = a.m;
      ma(f, c, d, g.ub);
      d += g.ub;
      e -= g.ub;
      g.Rb && ((h.Ld = G(f)), (h.Kd = G(f)));
      h = a.Qa;
      var k = a.Pa,
        l;
      x(null != f);
      x(null != h);
      h.Cb = G(f);
      if (h.Cb) {
        h.Bb = G(f);
        if (G(f)) {
          h.Fb = G(f);
          for (l = 0; 4 > l; ++l) h.Zb[l] = G(f) ? ca(f, 7) : 0;
          for (l = 0; 4 > l; ++l) h.Lb[l] = G(f) ? ca(f, 6) : 0;
        }
        if (h.Bb) for (l = 0; 3 > l; ++l) k.jb[l] = G(f) ? na(f, 8) : 255;
      } else h.Bb = 0;
      if (f.Ka) return T(a, 3, "cannot parse segment header");
      h = a.ed;
      h.zd = G(f);
      h.Tb = na(f, 6);
      h.wb = na(f, 3);
      h.Pc = G(f);
      if (h.Pc && G(f)) {
        for (k = 0; 4 > k; ++k) G(f) && (h.vd[k] = ca(f, 6));
        for (k = 0; 4 > k; ++k) G(f) && (h.od[k] = ca(f, 6));
      }
      a.L = 0 == h.Tb ? 0 : h.zd ? 1 : 2;
      if (f.Ka) return T(a, 3, "cannot parse filter header");
      l = d;
      var m = e;
      e = l;
      d = l + m;
      h = m;
      a.Xb = (1 << na(a.m, 2)) - 1;
      k = a.Xb;
      if (m < 3 * k) c = 7;
      else {
        l += 3 * k;
        h -= 3 * k;
        for (m = 0; m < k; ++m) {
          var n = c[e + 0] | (c[e + 1] << 8) | (c[e + 2] << 16);
          n > h && (n = h);
          ma(a.Jc[+m], c, l, n);
          l += n;
          h -= n;
          e += 3;
        }
        ma(a.Jc[+k], c, l, h);
        c = l < d ? 0 : 5;
      }
      if (0 != c) return T(a, c, "cannot parse partitions");
      l = a.m;
      c = na(l, 7);
      e = G(l) ? ca(l, 4) : 0;
      d = G(l) ? ca(l, 4) : 0;
      h = G(l) ? ca(l, 4) : 0;
      k = G(l) ? ca(l, 4) : 0;
      l = G(l) ? ca(l, 4) : 0;
      m = a.Qa;
      for (n = 0; 4 > n; ++n) {
        if (m.Cb) {
          var r = m.Zb[n];
          m.Fb || (r += c);
        } else if (0 < n) {
          a.pb[n] = a.pb[0];
          continue;
        } else r = c;
        var q = a.pb[n];
        q.Sc[0] = Lb[ga(r + e, 127)];
        q.Sc[1] = Mb[ga(r + 0, 127)];
        q.Eb[0] = 2 * Lb[ga(r + d, 127)];
        q.Eb[1] = (101581 * Mb[ga(r + h, 127)]) >> 16;
        8 > q.Eb[1] && (q.Eb[1] = 8);
        q.Qc[0] = Lb[ga(r + k, 117)];
        q.Qc[1] = Mb[ga(r + l, 127)];
        q.lc = r + l;
      }
      if (!g.Rb) return T(a, 4, "Not a key frame.");
      G(f);
      g = a.Pa;
      for (c = 0; 4 > c; ++c) {
        for (e = 0; 8 > e; ++e)
          for (d = 0; 3 > d; ++d)
            for (h = 0; 11 > h; ++h)
              (k = K(f, Ee[c][e][d][h]) ? na(f, 8) : Fe[c][e][d][h]),
                (g.Wc[c][e].Yb[d][h] = k);
        for (e = 0; 17 > e; ++e) g.Xc[c][e] = g.Wc[c][Ge[e]];
      }
      a.kc = G(f);
      a.kc && (a.Bd = na(f, 8));
      return (a.cb = 1);
    }
    function De(a, b, c, d, e, f, g) {
    function Je(a, b) {
      for (a.M = 0; a.M < a.Va; ++a.M) {
        var c = a.Jc[a.M & a.Xb],
          d = a.m,
          e = a,
          f;
        for (f = 0; f < e.za; ++f) {
          var g = d;
          var h = e;
          var k = h.Ac,
            l = h.Bc + 4 * f,
            m = h.zc,
            n = h.ya[h.aa + f];
          h.Qa.Bb
            ? (n.$b = K(g, h.Pa.jb[0])
                ? 2 + K(g, h.Pa.jb[2])
                : K(g, h.Pa.jb[1]))
            : (n.$b = 0);
          h.kc && (n.Ad = K(g, h.Bd));
          n.Za = !K(g, 145) + 0;
          if (n.Za) {
            var r = n.Ob,
              q = 0;
            for (h = 0; 4 > h; ++h) {
              var t = m[0 + h];
              var v;
              for (v = 0; 4 > v; ++v) {
                t = Ke[k[l + v]][t];
                for (var p = Mc[K(g, t[0])]; 0 < p; )
                  p = Mc[2 * p + K(g, t[p])];
                t = -p;
                k[l + v] = t;
              }
              I(r, q, k, l, 4);
              q += 4;
              m[0 + h] = t;
            }
          } else
            (t = K(g, 156) ? (K(g, 128) ? 1 : 3) : K(g, 163) ? 2 : 0),
              (n.Ob[0] = t),
              M(k, l, t, 4),
              M(m, 0, t, 4);
          n.Dd = K(g, 142) ? (K(g, 114) ? (K(g, 183) ? 1 : 3) : 2) : 0;
        }
        if (e.m.Ka) return T(a, 7, "Premature end-of-partition0 encountered.");
        for (; a.ja < a.za; ++a.ja) {
          d = a;
          e = c;
          g = d.rb[d.sb - 1];
          k = d.rb[d.sb + d.ja];
          f = d.ya[d.aa + d.ja];
          if ((l = d.kc ? f.Ad : 0))
            (g.la = k.la = 0),
              f.Za || (g.Na = k.Na = 0),
              (f.Hc = 0),
              (f.Gc = 0),
              (f.ia = 0);
          else {
            var u,
              w,
              g = k,
              k = e,
              l = d.Pa.Xc,
              m = d.ya[d.aa + d.ja],
              n = d.pb[m.$b];
            h = m.ad;
            r = 0;
            q = d.rb[d.sb - 1];
            t = v = 0;
            M(h, r, 0, 384);
            if (m.Za) {
              var y = 0;
              var A = l[3];
            } else {
              p = V(16);
              var E = g.Na + q.Na;
              E = oa(k, l[1], E, n.Eb, 0, p, 0);
              g.Na = q.Na = (0 < E) + 0;
              if (1 < E) Nc(p, 0, h, r);
              else {
                var B = (p[0] + 3) >> 3;
                for (p = 0; 256 > p; p += 16) h[r + p] = B;
              }
              y = 1;
              A = l[0];
            }
            var C = g.la & 15;
            var N = q.la & 15;
            for (p = 0; 4 > p; ++p) {
              var z = N & 1;
              for (B = w = 0; 4 > B; ++B)
                (E = z + (C & 1)),
                  (E = oa(k, A, E, n.Sc, y, h, r)),
                  (z = E > y),
                  (C = (C >> 1) | (z << 7)),
                  (w = (w << 2) | (3 < E ? 3 : 1 < E ? 2 : 0 != h[r + 0])),
                  (r += 16);
              C >>= 4;
              N = (N >> 1) | (z << 7);
              v = ((v << 8) | w) >>> 0;
            }
            A = C;
            y = N >> 4;
            for (u = 0; 4 > u; u += 2) {
              w = 0;
              C = g.la >> (4 + u);
              N = q.la >> (4 + u);
              for (p = 0; 2 > p; ++p) {
                z = N & 1;
                for (B = 0; 2 > B; ++B)
                  (E = z + (C & 1)),
                    (E = oa(k, l[2], E, n.Qc, 0, h, r)),
                    (z = 0 < E),
                    (C = (C >> 1) | (z << 3)),
                    (w = (w << 2) | (3 < E ? 3 : 1 < E ? 2 : 0 != h[r + 0])),
                    (r += 16);
                C >>= 2;
                N = (N >> 1) | (z << 5);
              }
              t |= w << (4 * u);
              A |= (C << 4) << u;
              y |= (N & 240) << u;
            }
            g.la = A;
            q.la = y;
            m.Hc = v;
            m.Gc = t;
            m.ia = t & 43690 ? 0 : n.ia;
            l = !(v | t);
          }
          0 < d.L &&
            ((d.wa[d.Y + d.ja] = d.gd[f.$b][f.Za]),
            (d.wa[d.Y + d.ja].La |= !l));
          if (e.Ka) return T(a, 7, "Premature end-of-file encountered.");
        }
        Lc(a);
        c = a;
        d = b;
        e = 1;
        f = c.D;
        g = 0 < c.L && c.M >= c.zb && c.M <= c.Va;
        if (0 == c.Aa)
          a: {
            (f.M = c.M), (f.uc = g), Oc(c, f), (e = 1);
            w = c.D;
            f = w.Nb;
            t = Ya[c.L];
            g = t * c.R;
            k = (t / 2) * c.B;
            p = 16 * f * c.R;
            B = 8 * f * c.B;
            l = c.sa;
            m = c.ta - g + p;
            n = c.qa;
            h = c.ra - k + B;
            r = c.Ha;
            q = c.Ia - k + B;
            C = w.M;
            N = 0 == C;
            v = C >= c.Va - 1;
            2 == c.Aa && Oc(c, w);
            if (w.uc)
              for (E = c, z = E.D.M, x(E.D.uc), w = E.yb; w < E.Hb; ++w) {
                var Q = E;
                y = w;
                A = z;
                var S = Q.D,
                  D = S.Nb;
                u = Q.R;
                var S = S.wa[S.Y + y],
                  F = Q.sa,
                  H = Q.ta + 16 * D * u + 16 * y,
                  J = S.dd,
                  G = S.tc;
                if (0 != G)
                  if ((x(3 <= G), 1 == Q.L))
                    0 < y && Pc(F, H, u, G + 4),
                      S.La && Qc(F, H, u, G),
                      0 < A && Rc(F, H, u, G + 4),
                      S.La && Sc(F, H, u, G);
                  else {
                    var L = Q.B,
                      O = Q.qa,
                      P = Q.ra + 8 * D * L + 8 * y,
                      R = Q.Ha,
                      Q = Q.Ia + 8 * D * L + 8 * y,
                      D = S.ld;
                    0 < y &&
                      (Tc(F, H, u, G + 4, J, D),
                      Uc(O, P, R, Q, L, G + 4, J, D));
                    S.La && (Vc(F, H, u, G, J, D), Wc(O, P, R, Q, L, G, J, D));
                    0 < A &&
                      (Xc(F, H, u, G + 4, J, D),
                      Yc(O, P, R, Q, L, G + 4, J, D));
                    S.La && (Zc(F, H, u, G, J, D), $c(O, P, R, Q, L, G, J, D));
                  }
              }
            c.ia && alert("todo:DitherRow");
            if (null != d.put) {
              w = 16 * C;
              C = 16 * (C + 1);
              N
                ? ((d.y = c.sa),
                  (d.O = c.ta + p),
                  (d.f = c.qa),
                  (d.N = c.ra + B),
                  (d.ea = c.Ha),
                  (d.W = c.Ia + B))
                : ((w -= t),
                  (d.y = l),
                  (d.O = m),
                  (d.f = n),
                  (d.N = h),
                  (d.ea = r),
                  (d.W = q));
              v || (C -= t);
              C > d.o && (C = d.o);
              d.F = null;
              d.J = null;
              if (
                null != c.Fa &&
                0 < c.Fa.length &&
                w < C &&
                ((d.J = Le(c, d, w, C - w)),
                (d.F = c.mb),
                null == d.F && 0 == d.F.length)
              ) {
                e = T(c, 3, "Could not decode alpha data.");
                break a;
              }
              w < d.j &&
                ((t = d.j - w),
                (w = d.j),
                x(!(t & 1)),
                (d.O += c.R * t),
                (d.N += c.B * (t >> 1)),
                (d.W += c.B * (t >> 1)),
                null != d.F && (d.J += d.width * t));
              w < C &&
                ((d.O += d.v),
                (d.N += d.v >> 1),
                (d.W += d.v >> 1),
                null != d.F && (d.J += d.v),
                (d.ka = w - d.j),
                (d.U = d.va - d.v),
                (d.T = C - w),
                (e = d.put(d)));
            }
            f + 1 != c.Ic ||
              v ||
              (I(c.sa, c.ta - g, l, m + 16 * c.R, g),
              I(c.qa, c.ra - k, n, h + 8 * c.B, k),
              I(c.Ha, c.Ia - k, r, q + 8 * c.B, k));
          }
        if (!e) return T(a, 6, "Output aborted.");
      }
      return 1;
    }
    function Me(a, b) {
      if (null == a) return 0;
      if (null == b) return T(a, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!a.cb && !Kc(a, b)) return 0;
      x(a.cb);
      if (null == b.ac || b.ac(b)) {
        b.ob && (a.L = 0);
        var c = Ya[a.L];
        2 == a.L
          ? ((a.yb = 0), (a.zb = 0))
          : ((a.yb = (b.v - c) >> 4),
            (a.zb = (b.j - c) >> 4),
            0 > a.yb && (a.yb = 0),
            0 > a.zb && (a.zb = 0));
        a.Va = (b.o + 15 + c) >> 4;
        a.Hb = (b.va + 15 + c) >> 4;
        a.Hb > a.za && (a.Hb = a.za);
        a.Va > a.Ub && (a.Va = a.Ub);
        if (0 < a.L) {
          var d = a.ed;
          for (c = 0; 4 > c; ++c) {
            var e;
            if (a.Qa.Cb) {
              var f = a.Qa.Lb[c];
              a.Qa.Fb || (f += d.Tb);
            } else f = d.Tb;
            for (e = 0; 1 >= e; ++e) {
              var g = a.gd[c][e],
                h = f;
              d.Pc && ((h += d.vd[0]), e && (h += d.od[0]));
              h = 0 > h ? 0 : 63 < h ? 63 : h;
              if (0 < h) {
                var k = h;
                0 < d.wb &&
                  ((k = 4 < d.wb ? k >> 2 : k >> 1),
                  k > 9 - d.wb && (k = 9 - d.wb));
                1 > k && (k = 1);
                g.dd = k;
                g.tc = 2 * h + k;
                g.ld = 40 <= h ? 2 : 15 <= h ? 1 : 0;
              } else g.tc = 0;
              g.La = e;
            }
          }
        }
        c = 0;
      } else T(a, 6, "Frame setup failed"), (c = a.a);
      if ((c = 0 == c)) {
        if (c) {
          a.$c = 0;
          0 < a.Aa || (a.Ic = Ne);
          b: {
            c = a.Ic;
            var k = a.za,
              d = 4 * k,
              l = 32 * k,
              m = k + 1,
              n = 0 < a.L ? k * (0 < a.Aa ? 2 : 1) : 0,
              r = (2 == a.Aa ? 2 : 1) * k;
            e = ((3 * (16 * c + Ya[a.L])) / 2) * l;
            f = null != a.Fa && 0 < a.Fa.length ? a.Kc.c * a.Kc.i : 0;
            g = d + 832 + e + f;
            if (g != g) c = 0;
            else {
              if (g > a.Vb) {
                a.Vb = 0;
                a.Ec = V(g);
                a.Fc = 0;
                if (null == a.Ec) {
                  c = T(a, 1, "no memory during frame initialization.");
                  break b;
                }
                a.Vb = g;
              }
              g = a.Ec;
              h = a.Fc;
              a.Ac = g;
              a.Bc = h;
              h += d;
              a.Gd = wa(l, Ic);
              a.Hd = 0;
              a.rb = wa(m + 1, Hc);
              a.sb = 1;
              a.wa = n ? wa(n, Xa) : null;
              a.Y = 0;
              a.D.Nb = 0;
              a.D.wa = a.wa;
              a.D.Y = a.Y;
              0 < a.Aa && (a.D.Y += k);
              x(!0);
              a.oc = g;
              a.pc = h;
              h += 832;
              a.ya = wa(r, Kb);
              a.aa = 0;
              a.D.ya = a.ya;
              a.D.aa = a.aa;
              2 == a.Aa && (a.D.aa += k);
              a.R = 16 * k;
              a.B = 8 * k;
              l = Ya[a.L];
              k = l * a.R;
              l = (l / 2) * a.B;
              a.sa = g;
              a.ta = h + k;
              a.qa = a.sa;
              a.ra = a.ta + 16 * c * a.R + l;
              a.Ha = a.qa;
              a.Ia = a.ra + 8 * c * a.B + l;
              a.$c = 0;
              h += e;
              a.mb = f ? g : null;
              a.nb = f ? h : null;
              x(h + f <= a.Fc + a.Vb);
              Lc(a);
              M(a.Ac, a.Bc, 0, d);
              c = 1;
            }
          }
          if (c) {
            b.ka = 0;
            b.y = a.sa;
            b.O = a.ta;
            b.f = a.qa;
            b.N = a.ra;
            b.ea = a.Ha;
            b.Vd = a.Ia;
            b.fa = a.R;
            b.Rc = a.B;
            b.F = null;
            b.J = 0;
            if (!ad) {
              for (c = -255; 255 >= c; ++c) bd[255 + c] = 0 > c ? -c : c;
              for (c = -1020; 1020 >= c; ++c)
                cd[1020 + c] = -128 > c ? -128 : 127 < c ? 127 : c;
              for (c = -112; 112 >= c; ++c)
                dd[112 + c] = -16 > c ? -16 : 15 < c ? 15 : c;
              for (c = -255; 510 >= c; ++c)
                ed[255 + c] = 0 > c ? 0 : 255 < c ? 255 : c;
              ad = 1;
            }
            Nc = Oe;
            Za = Pe;
            Nb = Qe;
            pa = Re;
            Ob = Se;
            fd = Te;
            Xc = Ue;
            Tc = Ve;
            Yc = We;
            Uc = Xe;
            Zc = Ye;
            Vc = Ze;
            $c = $e;
            Wc = af;
            Rc = gd;
            Pc = hd;
            Sc = bf;
            Qc = cf;
            W[0] = df;
            W[1] = ef;
            W[2] = ff;
            W[3] = gf;
            W[4] = hf;
            W[5] = jf;
            W[6] = kf;
            W[7] = lf;
            W[8] = mf;
            W[9] = nf;
            Y[0] = of;
            Y[1] = pf;
            Y[2] = qf;
            Y[3] = rf;
            Y[4] = sf;
            Y[5] = tf;
            Y[6] = uf;
            ka[0] = vf;
            ka[1] = wf;
            ka[2] = xf;
            ka[3] = yf;
            ka[4] = zf;
            ka[5] = Af;
            ka[6] = Bf;
            c = 1;
          } else c = 0;
        }
        c && (c = Je(a, b));
        null != b.bc && b.bc(b);
        c &= 1;
      }
      if (!c) return 0;
      a.cb = 0;
      return c;
    }
    function kb(a, b, c, d, e, f) {
    function ea(a, b, c, d, e, f, g, h) {
    function Fa(a, b, c, d, e, f, g, h) {
    function Ue(a, b, c, d, e, f) {
    function Ve(a, b, c, d, e, f) {
    function Ye(a, b, c, d, e, f) {
    function Ze(a, b, c, d, e, f) {
    function We(a, b, c, d, e, f, g, h) {
    function Xe(a, b, c, d, e, f, g, h) {
    function $e(a, b, c, d, e, f, g, h) {
    function af(a, b, c, d, e, f, g, h) {
    function Rb(a, b, c, d, e, f, g) {
    function Gf(a, b, c, d, e, f, g) {
    function Hf(a, b, c, d, e, f, g) {
    function Le(a, b, c, d) {
      var e = b.width,
        f = b.o;
      x(null != a && null != b);
      if (0 > c || 0 >= d || c + d > f) return null;
      if (!a.Cc) {
        if (null == a.ga) {
          a.ga = new Ff();
          var g;
          (g = null == a.ga) ||
            ((g = b.width * b.o),
            x(0 == a.Gb.length),
            (a.Gb = V(g)),
            (a.Uc = 0),
            null == a.Gb
              ? (g = 0)
              : ((a.mb = a.Gb), (a.nb = a.Uc), (a.rc = null), (g = 1)),
            (g = !g));
          if (!g) {
            g = a.ga;
            var h = a.Fa,
              k = a.P,
              l = a.qc,
              m = a.mb,
              n = a.nb,
              r = k + 1,
              q = l - 1,
              t = g.l;
            x(null != h && null != m && null != b);
            ia[0] = null;
            ia[1] = Rb;
            ia[2] = Gf;
            ia[3] = Hf;
            g.ca = m;
            g.tb = n;
            g.c = b.width;
            g.i = b.height;
            x(0 < g.c && 0 < g.i);
            if (1 >= l) b = 0;
            else if (
              ((g.$a = (h[k + 0] >> 0) & 3),
              (g.Z = (h[k + 0] >> 2) & 3),
              (g.Lc = (h[k + 0] >> 4) & 3),
              (k = (h[k + 0] >> 6) & 3),
              0 > g.$a || 1 < g.$a || 4 <= g.Z || 1 < g.Lc || k)
            )
              b = 0;
            else if (
              ((t.put = kc),
              (t.ac = gc),
              (t.bc = lc),
              (t.ma = g),
              (t.width = b.width),
              (t.height = b.height),
              (t.Da = b.Da),
              (t.v = b.v),
              (t.va = b.va),
              (t.j = b.j),
              (t.o = b.o),
              g.$a)
            )
              b: {
                x(1 == g.$a), (b = Bc());
                c: for (;;) {
                  if (null == b) {
                    b = 0;
                    break b;
                  }
                  x(null != g);
                  g.mc = b;
                  b.c = g.c;
                  b.i = g.i;
                  b.l = g.l;
                  b.l.ma = g;
                  b.l.width = g.c;
                  b.l.height = g.i;
                  b.a = 0;
                  cb(b.m, h, r, q);
                  if (!rb(g.c, g.i, 1, b, null)) break c;
                  1 == b.ab && 3 == b.gc[0].hc && yc(b.s)
                    ? ((g.ic = 1),
                      (h = b.c * b.i),
                      (b.Ta = null),
                      (b.Ua = 0),
                      (b.V = V(h)),
                      (b.Ba = 0),
                      null == b.V ? ((b.a = 1), (b = 0)) : (b = 1))
                    : ((g.ic = 0), (b = Ec(b, g.c)));
                  if (!b) break c;
                  b = 1;
                  break b;
                }
                g.mc = null;
                b = 0;
              }
            else b = q >= g.c * g.i;
            g = !b;
          }
          if (g) return null;
          1 != a.ga.Lc ? (a.Ga = 0) : (d = f - c);
        }
        x(null != a.ga);
        x(c + d <= f);
        a: {
          h = a.ga;
          b = h.c;
          f = h.l.o;
          if (0 == h.$a) {
            r = a.rc;
            q = a.Vc;
            t = a.Fa;
            k = a.P + 1 + c * b;
            l = a.mb;
            m = a.nb + c * b;
            x(k <= a.P + a.qc);
            if (0 != h.Z)
              for (x(null != ia[h.Z]), g = 0; g < d; ++g)
                ia[h.Z](r, q, t, k, l, m, b),
                  (r = l),
                  (q = m),
                  (m += b),
                  (k += b);
            else
              for (g = 0; g < d; ++g)
                I(l, m, t, k, b), (r = l), (q = m), (m += b), (k += b);
            a.rc = r;
            a.Vc = q;
          } else {
            x(null != h.mc);
            b = c + d;
            g = h.mc;
            x(null != g);
            x(b <= g.i);
            if (g.C >= b) b = 1;
            else if ((h.ic || Aa(), h.ic)) {
              var h = g.V,
                r = g.Ba,
                q = g.c,
                v = g.i,
                t = 1,
                k = g.$ / q,
                l = g.$ % q,
                m = g.m,
                n = g.s,
                p = g.$,
                u = q * v,
                w = q * b,
                y = n.wc,
                A = p < w ? ha(n, l, k) : null;
              x(p <= u);
              x(b <= v);
              x(yc(n));
              c: for (;;) {
                for (; !m.h && p < w; ) {
                  l & y || (A = ha(n, l, k));
                  x(null != A);
                  Sa(m);
                  v = ua(A.G[0], A.H[0], m);
                  if (256 > v)
                    (h[r + p] = v),
                      ++p,
                      ++l,
                      l >= q && ((l = 0), ++k, k <= b && !(k % 16) && Ib(g, k));
                  else if (280 > v) {
                    var v = ib(v - 256, m);
                    var E = ua(A.G[4], A.H[4], m);
                    Sa(m);
                    E = ib(E, m);
                    E = nc(q, E);
                    if (p >= E && u - p >= v) {
                      var B;
                      for (B = 0; B < v; ++B) h[r + p + B] = h[r + p + B - E];
                    } else {
                      t = 0;
                      break c;
                    }
                    p += v;
                    for (l += v; l >= q; )
                      (l -= q), ++k, k <= b && !(k % 16) && Ib(g, k);
                    p < w && l & y && (A = ha(n, l, k));
                  } else {
                    t = 0;
                    break c;
                  }
                  x(m.h == db(m));
                }
                Ib(g, k > b ? b : k);
                break c;
              }
              !t || (m.h && p < u) ? ((t = 0), (g.a = m.h ? 5 : 3)) : (g.$ = p);
              b = t;
            } else b = Jb(g, g.V, g.Ba, g.c, g.i, b, se);
            if (!b) {
              d = 0;
              break a;
            }
          }
          c + d >= f && (a.Cc = 1);
          d = 1;
        }
        if (!d) return null;
        if (
          a.Cc &&
          ((d = a.ga), null != d && (d.mc = null), (a.ga = null), 0 < a.Ga)
        )
          return alert("todo:WebPDequantizeLevels"), null;
      }
      return a.nb + c * e;
    }
    function If(a, b, c, d, e, f) {
    function Kf(a, b, c, d, e, f, g, h) {
      self[a] = function(a, e, f, g, h, k, l, m, n, r, q, t, v, p, u, w, y) {
      self[a] = function(a, e, f, g, h, k, l, m, n) {
    function Oc(a, b) {
      var c,
        d,
        e = b.M,
        f = b.Nb,
        g = a.oc,
        h = a.pc + 40,
        k = a.oc,
        l = a.pc + 584,
        m = a.oc,
        n = a.pc + 600;
      for (c = 0; 16 > c; ++c) g[h + 32 * c - 1] = 129;
      for (c = 0; 8 > c; ++c)
        (k[l + 32 * c - 1] = 129), (m[n + 32 * c - 1] = 129);
      0 < e
        ? (g[h - 1 - 32] = k[l - 1 - 32] = m[n - 1 - 32] = 129)
        : (M(g, h - 32 - 1, 127, 21),
          M(k, l - 32 - 1, 127, 9),
          M(m, n - 32 - 1, 127, 9));
      for (d = 0; d < a.za; ++d) {
        var r = b.ya[b.aa + d];
        if (0 < d) {
          for (c = -1; 16 > c; ++c) I(g, h + 32 * c - 4, g, h + 32 * c + 12, 4);
          for (c = -1; 8 > c; ++c)
            I(k, l + 32 * c - 4, k, l + 32 * c + 4, 4),
              I(m, n + 32 * c - 4, m, n + 32 * c + 4, 4);
        }
        var q = a.Gd,
          t = a.Hd + d,
          v = r.ad,
          p = r.Hc;
        0 < e &&
          (I(g, h - 32, q[t].y, 0, 16),
          I(k, l - 32, q[t].f, 0, 8),
          I(m, n - 32, q[t].ea, 0, 8));
        if (r.Za) {
          var u = g;
          var w = h - 32 + 16;
          0 < e &&
            (d >= a.za - 1
              ? M(u, w, q[t].y[15], 4)
              : I(u, w, q[t + 1].y, 0, 4));
          for (c = 0; 4 > c; c++)
            u[w + 128 + c] = u[w + 256 + c] = u[w + 384 + c] = u[w + 0 + c];
          for (c = 0; 16 > c; ++c, p <<= 2)
            (u = g), (w = h + zd[c]), W[r.Ob[c]](u, w), yd(p, v, 16 * +c, u, w);
        } else if (((u = xd(d, e, r.Ob[0])), Y[u](g, h), 0 != p))
          for (c = 0; 16 > c; ++c, p <<= 2) yd(p, v, 16 * +c, g, h + zd[c]);
        c = r.Gc;
        u = xd(d, e, r.Dd);
        ka[u](k, l);
        ka[u](m, n);
        r = c >> 0;
        p = v;
        u = k;
        w = l;
        r & 255 && (r & 170 ? Nb(p, 256, u, w) : Ob(p, 256, u, w));
        c >>= 8;
        r = m;
        p = n;
        c & 255 && (c & 170 ? Nb(v, 320, r, p) : Ob(v, 320, r, p));
        e < a.Ub - 1 &&
          (I(q[t].y, 0, g, h + 480, 16),
          I(q[t].f, 0, k, l + 224, 8),
          I(q[t].ea, 0, m, n + 224, 8));
        c = 8 * f * a.B;
        q = a.sa;
        t = a.ta + 16 * d + 16 * f * a.R;
        v = a.qa;
        r = a.ra + 8 * d + c;
        p = a.Ha;
        u = a.Ia + 8 * d + c;
        for (c = 0; 16 > c; ++c) I(q, t + c * a.R, g, h + 32 * c, 16);
        for (c = 0; 8 > c; ++c)
          I(v, r + c * a.B, k, l + 32 * c, 8),
            I(p, u + c * a.B, m, n + 32 * c, 8);
      }
    }
    function Ad(a, b, c, d, e, f, g, h, k) {
      var l = [0],
        m = [0],
        n = 0,
        r = null != k ? k.kd : 0,
        q = null != k ? k : new md();
      if (null == a || 12 > c) return 7;
      q.data = a;
      q.w = b;
      q.ha = c;
      b = [b];
      c = [c];
      q.gb = [q.gb];
      a: {
        var t = b;
        var v = c;
        var p = q.gb;
        x(null != a);
        x(null != v);
        x(null != p);
        p[0] = 0;
        if (12 <= v[0] && !fa(a, t[0], "RIFF")) {
          if (fa(a, t[0] + 8, "WEBP")) {
            p = 3;
            break a;
          }
          var u = Ha(a, t[0] + 4);
          if (12 > u || 4294967286 < u) {
            p = 3;
            break a;
          }
          if (r && u > v[0] - 8) {
            p = 7;
            break a;
          }
          p[0] = u;
          t[0] += 12;
          v[0] -= 12;
        }
        p = 0;
      }
      if (0 != p) return p;
      u = 0 < q.gb[0];
      for (c = c[0]; ; ) {
        t = [0];
        n = [n];
        a: {
          var w = a;
          v = b;
          p = c;
          var y = n,
            A = l,
            z = m,
            B = t;
          y[0] = 0;
          if (8 > p[0]) p = 7;
          else {
            if (!fa(w, v[0], "VP8X")) {
              if (10 != Ha(w, v[0] + 4)) {
                p = 3;
                break a;
              }
              if (18 > p[0]) {
                p = 7;
                break a;
              }
              var C = Ha(w, v[0] + 8);
              var D = 1 + Yb(w, v[0] + 12);
              w = 1 + Yb(w, v[0] + 15);
              if (2147483648 <= D * w) {
                p = 3;
                break a;
              }
              null != B && (B[0] = C);
              null != A && (A[0] = D);
              null != z && (z[0] = w);
              v[0] += 18;
              p[0] -= 18;
              y[0] = 1;
            }
            p = 0;
          }
        }
        n = n[0];
        t = t[0];
        if (0 != p) return p;
        v = !!(t & 2);
        if (!u && n) return 3;
        null != f && (f[0] = !!(t & 16));
        null != g && (g[0] = v);
        null != h && (h[0] = 0);
        g = l[0];
        t = m[0];
        if (n && v && null == k) {
          p = 0;
          break;
        }
        if (4 > c) {
          p = 7;
          break;
        }
        if ((u && n) || (!u && !n && !fa(a, b[0], "ALPH"))) {
          c = [c];
          q.na = [q.na];
          q.P = [q.P];
          q.Sa = [q.Sa];
          a: {
            C = a;
            p = b;
            u = c;
            var y = q.gb,
              A = q.na,
              z = q.P,
              B = q.Sa;
            D = 22;
            x(null != C);
            x(null != u);
            w = p[0];
            var F = u[0];
            x(null != A);
            x(null != B);
            A[0] = null;
            z[0] = null;
            for (B[0] = 0; ; ) {
              p[0] = w;
              u[0] = F;
              if (8 > F) {
                p = 7;
                break a;
              }
              var G = Ha(C, w + 4);
              if (4294967286 < G) {
                p = 3;
                break a;
              }
              var H = (8 + G + 1) & -2;
              D += H;
              if (0 < y && D > y) {
                p = 3;
                break a;
              }
              if (!fa(C, w, "VP8 ") || !fa(C, w, "VP8L")) {
                p = 0;
                break a;
              }
              if (F[0] < H) {
                p = 7;
                break a;
              }
              fa(C, w, "ALPH") || ((A[0] = C), (z[0] = w + 8), (B[0] = G));
              w += H;
              F -= H;
            }
          }
          c = c[0];
          q.na = q.na[0];
          q.P = q.P[0];
          q.Sa = q.Sa[0];
          if (0 != p) break;
        }
        c = [c];
        q.Ja = [q.Ja];
        q.xa = [q.xa];
        a: if (
          ((y = a),
          (p = b),
          (u = c),
          (A = q.gb[0]),
          (z = q.Ja),
          (B = q.xa),
          (C = p[0]),
          (w = !fa(y, C, "VP8 ")),
          (D = !fa(y, C, "VP8L")),
          x(null != y),
          x(null != u),
          x(null != z),
          x(null != B),
          8 > u[0])
        )
          p = 7;
        else {
          if (w || D) {
            y = Ha(y, C + 4);
            if (12 <= A && y > A - 12) {
              p = 3;
              break a;
            }
            if (r && y > u[0] - 8) {
              p = 7;
              break a;
            }
            z[0] = y;
            p[0] += 8;
            u[0] -= 8;
            B[0] = D;
          } else
            (B[0] = 5 <= u[0] && 47 == y[C + 0] && !(y[C + 4] >> 5)),
              (z[0] = u[0]);
          p = 0;
        }
        c = c[0];
        q.Ja = q.Ja[0];
        q.xa = q.xa[0];
        b = b[0];
        if (0 != p) break;
        if (4294967286 < q.Ja) return 3;
        null == h || v || (h[0] = q.xa ? 2 : 1);
        g = [g];
        t = [t];
        if (q.xa) {
          if (5 > c) {
            p = 7;
            break;
          }
          h = g;
          r = t;
          v = f;
          null == a || 5 > c
            ? (a = 0)
            : 5 <= c && 47 == a[b + 0] && !(a[b + 4] >> 5)
            ? ((u = [0]),
              (y = [0]),
              (A = [0]),
              (z = new Ra()),
              cb(z, a, b, c),
              mc(z, u, y, A)
                ? (null != h && (h[0] = u[0]),
                  null != r && (r[0] = y[0]),
                  null != v && (v[0] = A[0]),
                  (a = 1))
                : (a = 0))
            : (a = 0);
        } else {
          if (10 > c) {
            p = 7;
            break;
          }
          h = t;
          null == a || 10 > c || !Jc(a, b + 3, c - 3)
            ? (a = 0)
            : ((r = a[b + 0] | (a[b + 1] << 8) | (a[b + 2] << 16)),
              (v = ((a[b + 7] << 8) | a[b + 6]) & 16383),
              (a = ((a[b + 9] << 8) | a[b + 8]) & 16383),
              r & 1 ||
              3 < ((r >> 1) & 7) ||
              !((r >> 4) & 1) ||
              r >> 5 >= q.Ja ||
              !v ||
              !a
                ? (a = 0)
                : (g && (g[0] = v), h && (h[0] = a), (a = 1)));
        }
        if (!a) return 3;
        g = g[0];
        t = t[0];
        if (n && (l[0] != g || m[0] != t)) return 3;
        null != k &&
          ((k[0] = q),
          (k.offset = b - k.w),
          x(4294967286 > b - k.w),
          x(k.offset == k.ha - c));
        break;
      }
      return 0 == p || (7 == p && n && null == k)
        ? (null != f && (f[0] |= null != q.na && 0 < q.na.length),
          null != d && (d[0] = g),
          null != e && (e[0] = t),
          0)
        : p;
    }
    function Cd(a, b, c, d) {
      if (null == d || 0 >= a || 0 >= b) return 2;
      if (null != c) {
        if (c.Da) {
          var e = c.cd,
            f = c.bd,
            g = c.v & -2,
            h = c.j & -2;
          if (0 > g || 0 > h || 0 >= e || 0 >= f || g + e > a || h + f > b)
            return 2;
          a = e;
          b = f;
        }
        if (c.da) {
          e = [c.ib];
          f = [c.hb];
          if (!bc(a, b, e, f)) return 2;
          a = e[0];
          b = f[0];
        }
      }
      d.width = a;
      d.height = b;
      a: {
        var k = d.width;
        var l = d.height;
        a = d.S;
        if (0 >= k || 0 >= l || !(a >= Ca && 13 > a)) a = 2;
        else {
          if (0 >= d.Rd && null == d.sd) {
            var g = (f = e = b = 0),
              h = k * Dd[a],
              m = h * l;
            11 > a ||
              ((b = (k + 1) / 2),
              (f = ((l + 1) / 2) * b),
              12 == a && ((e = k), (g = e * l)));
            l = V(m + 2 * f + g);
            if (null == l) {
              a = 1;
              break a;
            }
            d.sd = l;
            11 > a
              ? ((k = d.f.RGBA),
                (k.eb = l),
                (k.fb = 0),
                (k.A = h),
                (k.size = m))
              : ((k = d.f.kb),
                (k.y = l),
                (k.O = 0),
                (k.fa = h),
                (k.Fd = m),
                (k.f = l),
                (k.N = 0 + m),
                (k.Ab = b),
                (k.Cd = f),
                (k.ea = l),
                (k.W = 0 + m + f),
                (k.Db = b),
                (k.Ed = f),
                12 == a && ((k.F = l), (k.J = 0 + m + 2 * f)),
                (k.Tc = g),
                (k.lb = e));
          }
          b = 1;
          e = d.S;
          f = d.width;
          g = d.height;
          if (e >= Ca && 13 > e)
            if (11 > e)
              (a = d.f.RGBA),
                (h = Math.abs(a.A)),
                (b &= h * (g - 1) + f <= a.size),
                (b &= h >= f * Dd[e]),
                (b &= null != a.eb);
            else {
              a = d.f.kb;
              h = (f + 1) / 2;
              m = (g + 1) / 2;
              k = Math.abs(a.fa);
              var l = Math.abs(a.Ab),
                n = Math.abs(a.Db),
                r = Math.abs(a.lb),
                q = r * (g - 1) + f;
              b &= k * (g - 1) + f <= a.Fd;
              b &= l * (m - 1) + h <= a.Cd;
              b &= n * (m - 1) + h <= a.Ed;
              b = b & (k >= f) & (l >= h) & (n >= h);
              b &= null != a.y;
              b &= null != a.f;
              b &= null != a.ea;
              12 == e && ((b &= r >= f), (b &= q <= a.Tc), (b &= null != a.F));
            }
          else b = 0;
          a = b ? 0 : 2;
        }
      }
      if (0 != a) return a;
      null != c && c.fd && (a = Bd(d));
      return a;
    }
    this.WebPDecodeRGBA = function(a, b, c, d, e) {
      var f = Ua;
      var g = new Cf(),
        h = new Cb();
      g.ba = h;
      h.S = f;
      h.width = [h.width];
      h.height = [h.height];
      var k = h.width;
      var l = h.height,
        m = new Td();
      if (null == m || null == a) var n = 2;
      else
        x(null != m),
          (n = Ad(a, b, c, m.width, m.height, m.Pd, m.Qd, m.format, null));
      0 != n
        ? (k = 0)
        : (null != k && (k[0] = m.width[0]),
          null != l && (l[0] = m.height[0]),
          (k = 1));
      if (k) {
        h.width = h.width[0];
        h.height = h.height[0];
        null != d && (d[0] = h.width);
        null != e && (e[0] = h.height);
        b: {
          d = new Oa();
          e = new md();
          e.data = a;
          e.w = b;
          e.ha = c;
          e.kd = 1;
          b = [0];
          x(null != e);
          a = Ad(e.data, e.w, e.ha, null, null, null, b, null, e);
          (0 == a || 7 == a) && b[0] && (a = 4);
          b = a;
          if (0 == b) {
            x(null != g);
            d.data = e.data;
            d.w = e.w + e.offset;
            d.ha = e.ha - e.offset;
            d.put = kc;
            d.ac = gc;
            d.bc = lc;
            d.ma = g;
            if (e.xa) {
              a = Bc();
              if (null == a) {
                g = 1;
                break b;
              }
              if (te(a, d)) {
                b = Cd(d.width, d.height, g.Oa, g.ba);
                if ((d = 0 == b)) {
                  c: {
                    d = a;
                    d: for (;;) {
                      if (null == d) {
                        d = 0;
                        break c;
                      }
                      x(null != d.s.yc);
                      x(null != d.s.Ya);
                      x(0 < d.s.Wb);
                      c = d.l;
                      x(null != c);
                      e = c.ma;
                      x(null != e);
                      if (0 != d.xb) {
                        d.ca = e.ba;
                        d.tb = e.tb;
                        x(null != d.ca);
                        if (!hc(e.Oa, c, Va)) {
                          d.a = 2;
                          break d;
                        }
                        if (!Ec(d, c.width)) break d;
                        if (c.da) break d;
                        (c.da || hb(d.ca.S)) && Aa();
                        11 > d.ca.S ||
                          (alert("todo:WebPInitConvertARGBToYUV"),
                          null != d.ca.f.kb.F && Aa());
                        if (
                          d.Pb &&
                          0 < d.s.ua &&
                          null == d.s.vb.X &&
                          !Zb(d.s.vb, d.s.Wa.Xa)
                        ) {
                          d.a = 1;
                          break d;
                        }
                        d.xb = 0;
                      }
                      if (!Jb(d, d.V, d.Ba, d.c, d.i, c.o, ge)) break d;
                      e.Dc = d.Ma;
                      d = 1;
                      break c;
                    }
                    x(0 != d.a);
                    d = 0;
                  }
                  d = !d;
                }
                d && (b = a.a);
              } else b = a.a;
            } else {
              a = new Ce();
              if (null == a) {
                g = 1;
                break b;
              }
              a.Fa = e.na;
              a.P = e.P;
              a.qc = e.Sa;
              if (Kc(a, d)) {
                if (((b = Cd(d.width, d.height, g.Oa, g.ba)), 0 == b)) {
                  a.Aa = 0;
                  c = g.Oa;
                  e = a;
                  x(null != e);
                  if (null != c) {
                    k = c.Md;
                    k = 0 > k ? 0 : 100 < k ? 255 : (255 * k) / 100;
                    if (0 < k) {
                      for (l = m = 0; 4 > l; ++l)
                        (n = e.pb[l]),
                          12 > n.lc &&
                            (n.ia = (k * Qf[0 > n.lc ? 0 : n.lc]) >> 3),
                          (m |= n.ia);
                      m && (alert("todo:VP8InitRandom"), (e.ia = 1));
                    }
                    e.Ga = c.Id;
                    100 < e.Ga ? (e.Ga = 100) : 0 > e.Ga && (e.Ga = 0);
                  }
                  Me(a, d) || (b = a.a);
                }
              } else b = a.a;
            }
            0 == b && null != g.Oa && g.Oa.fd && (b = Bd(g.ba));
          }
          g = b;
        }
        f = 0 != g ? null : 11 > f ? h.f.RGBA.eb : h.f.kb.y;
      } else f = null;
      return f;
    };