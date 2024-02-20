function SK(n,t){let e=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(n[n.length-1]/2),r=i*Math.ceil(n[n.length-2]/2),o=r,s="",a="b, r, c";for(let l=2;l<n.length-1;l++)o*=n[n.length-l-1],s=`
      int b${l} = index / ${o};
      index -= b${l} * ${o};
    `+s,a=`b${l}, `+a;return`
    ivec${n.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      ${s}

      int b = index / ${r};
      index -= b * ${r};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec${n.length}(${a});
    }
  `}