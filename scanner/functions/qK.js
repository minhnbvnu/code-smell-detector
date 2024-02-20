function qK(n,t,e,i){if(n===1)return"";let r=i.slice(-2);return`
    int r = ${r[0]};
    int c = ${r[1]};
    int rp1 = r + 1;
    int cp1 = c + 1;

    bool cEdge = cp1 >= ${t};
    bool rEdge = rp1 >= ${e};
  `}