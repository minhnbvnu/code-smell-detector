function __vds_shared_init($v,$vi,$encp) {
 $v = $v|0;
 $vi = $vi|0;
 $encp = $encp|0;
 var $$0 = 0, $$pre = 0, $$pre26 = 0, $$pre28 = 0, $$pre29 = 0, $$pre30 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0;
 var $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0;
 var $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0;
 var $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0;
 var $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0;
 var $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0;
 var $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0;
 var $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0;
 var $98 = 0, $99 = 0, $i$117 = 0, $i$214 = 0, $i$37 = 0, $i$45 = 0, $i$54 = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 $0 = ((($vi)) + 28|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0|0);
 if ($2) {
  $$0 = 1;
  return ($$0|0);
 }
 $3 = ((($1)) + 8|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)<(1);
 if ($5) {
  $$0 = 1;
  return ($$0|0);
 }
 $6 = HEAP32[$1>>2]|0;
 $7 = ($6|0)<(64);
 if ($7) {
  $$0 = 1;
  return ($$0|0);
 }
 $8 = ((($1)) + 4|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = ($9|0)<($6|0);
 if ($10) {
  $$0 = 1;
  return ($$0|0);
 }
 $11 = ((($1)) + 3656|0);
 $12 = HEAP32[$11>>2]|0;
 dest=$v; stop=dest+112|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $13 = (_calloc(1,136)|0);
 $14 = ((($v)) + 104|0);
 HEAP32[$14>>2] = $13;
 $15 = ((($v)) + 4|0);
 HEAP32[$15>>2] = $vi;
 $16 = HEAP32[$3>>2]|0;
 $17 = (($16) + -1)|0;
 $18 = (_ov_ilog($17)|0);
 $19 = ((($13)) + 44|0);
 HEAP32[$19>>2] = $18;
 $20 = (_calloc(1,4)|0);
 $21 = ((($13)) + 12|0);
 HEAP32[$21>>2] = $20;
 $22 = (_calloc(1,4)|0);
 $23 = ((($13)) + 16|0);
 HEAP32[$23>>2] = $22;
 $24 = (_calloc(1,20)|0);
 HEAP32[$20>>2] = $24;
 $25 = (_calloc(1,20)|0);
 HEAP32[$22>>2] = $25;
 $26 = HEAP32[$1>>2]|0;
 $27 = $26 >> $12;
 _mdct_init($24,$27);
 $28 = HEAP32[$23>>2]|0;
 $29 = HEAP32[$28>>2]|0;
 $30 = HEAP32[$8>>2]|0;
 $31 = $30 >> $12;
 _mdct_init($29,$31);
 $32 = HEAP32[$1>>2]|0;
 $33 = (_ov_ilog($32)|0);
 $34 = (($33) + -7)|0;
 $35 = ((($13)) + 4|0);
 HEAP32[$35>>2] = $34;
 $36 = HEAP32[$8>>2]|0;
 $37 = (_ov_ilog($36)|0);
 $38 = (($37) + -7)|0;
 $39 = ((($13)) + 8|0);
 HEAP32[$39>>2] = $38;
 $40 = ($encp|0)==(0);
 L13: do {
  if ($40) {
   $84 = ((($1)) + 2848|0);
   $85 = HEAP32[$84>>2]|0;
   $86 = ($85|0)==(0|0);
   if ($86) {
    $87 = ((($1)) + 24|0);
    $88 = HEAP32[$87>>2]|0;
    $89 = (_calloc($88,56)|0);
    HEAP32[$84>>2] = $89;
    $90 = HEAP32[$87>>2]|0;
    $91 = ($90|0)>(0);
    if ($91) {
     $174 = $90;$i$214 = 0;
     while(1) {
      $92 = (((($1)) + 1824|0) + ($i$214<<2)|0);
      $93 = HEAP32[$92>>2]|0;
      $94 = ($93|0)==(0|0);
      if ($94) {
       $95 = $174;
       break;
      }
      $97 = HEAP32[$84>>2]|0;
      $98 = (($97) + (($i$214*56)|0)|0);
      $99 = (_vorbis_book_init_decode($98,$93)|0);
      $100 = ($99|0)==(0);
      if (!($100)) {
       label = 20;
       break;
      }
      $101 = HEAP32[$92>>2]|0;
      _vorbis_staticbook_destroy($101);
      HEAP32[$92>>2] = 0;
      $102 = (($i$214) + 1)|0;
      $103 = HEAP32[$87>>2]|0;
      $104 = ($102|0)<($103|0);
      if ($104) {
       $174 = $103;$i$214 = $102;
      } else {
       break L13;
      }
     }
     if ((label|0) == 20) {
      $$pre29 = HEAP32[$87>>2]|0;
      $95 = $$pre29;
     }
     $96 = ($95|0)>(0);
     if ($96) {
      $175 = $95;$i$54 = 0;
      while(1) {
       $168 = (((($1)) + 1824|0) + ($i$54<<2)|0);
       $169 = HEAP32[$168>>2]|0;
       $170 = ($169|0)==(0|0);
       if ($170) {
        $173 = $175;
       } else {
        _vorbis_staticbook_destroy($169);
        HEAP32[$168>>2] = 0;
        $$pre30 = HEAP32[$87>>2]|0;
        $173 = $$pre30;
       }
       $171 = (($i$54) + 1)|0;
       $172 = ($171|0)<($173|0);
       if ($172) {
        $175 = $173;$i$54 = $171;
       } else {
        break;
       }
      }
     }
     _vorbis_dsp_clear($v);
     $$0 = -1;
     return ($$0|0);
    }
   }
  } else {
   $41 = ((($13)) + 20|0);
   $42 = HEAP32[$1>>2]|0;
   _drft_init($41,$42);
   $43 = ((($13)) + 32|0);
   $44 = HEAP32[$8>>2]|0;
   _drft_init($43,$44);
   $45 = ((($1)) + 2848|0);
   $46 = HEAP32[$45>>2]|0;
   $47 = ($46|0)==(0|0);
   if ($47) {
    $48 = ((($1)) + 24|0);
    $49 = HEAP32[$48>>2]|0;
    $50 = (_calloc($49,56)|0);
    HEAP32[$45>>2] = $50;
    $51 = HEAP32[$48>>2]|0;
    $52 = ($51|0)>(0);
    if ($52) {
     $53 = ((($1)) + 1824|0);
     $54 = HEAP32[$53>>2]|0;
     (_vorbis_book_init_encode($50,$54)|0);
     $55 = HEAP32[$48>>2]|0;
     $56 = ($55|0)>(1);
     if ($56) {
      $58 = 1;
      while(1) {
       $$pre = HEAP32[$45>>2]|0;
       $57 = (($$pre) + (($58*56)|0)|0);
       $59 = (((($1)) + 1824|0) + ($58<<2)|0);
       $60 = HEAP32[$59>>2]|0;
       (_vorbis_book_init_encode($57,$60)|0);
       $61 = (($58) + 1)|0;
       $62 = HEAP32[$48>>2]|0;
       $63 = ($61|0)<($62|0);
       if ($63) {
        $58 = $61;
       } else {
        break;
       }
      }
     }
    }
   }
   $64 = ((($1)) + 28|0);
   $65 = HEAP32[$64>>2]|0;
   $66 = (_calloc($65,52)|0);
   $67 = ((($13)) + 56|0);
   HEAP32[$67>>2] = $66;
   $68 = HEAP32[$64>>2]|0;
   $69 = ($68|0)>(0);
   L38: do {
    if ($69) {
     $70 = ((($1)) + 2868|0);
     $71 = ((($vi)) + 8|0);
     $73 = $66;$i$117 = 0;
     while(1) {
      $72 = (($73) + (($i$117*52)|0)|0);
      $74 = (((($1)) + 2852|0) + ($i$117<<2)|0);
      $75 = HEAP32[$74>>2]|0;
      $76 = HEAP32[$75>>2]|0;
      $77 = (($1) + ($76<<2)|0);
      $78 = HEAP32[$77>>2]|0;
      $79 = (($78|0) / 2)&-1;
      $80 = HEAP32[$71>>2]|0;
      __vp_psy_init($72,$75,$70,$79,$80);
      $81 = (($i$117) + 1)|0;
      $82 = HEAP32[$64>>2]|0;
      $83 = ($81|0)<($82|0);
      if (!($83)) {
       break L38;
      }
      $$pre26 = HEAP32[$67>>2]|0;
      $73 = $$pre26;$i$117 = $81;
     }
    }
   } while(0);
   HEAP32[$v>>2] = 1;
  }
 } while(0);
 $105 = HEAP32[$8>>2]|0;
 $106 = ((($v)) + 16|0);
 HEAP32[$106>>2] = $105;
 $107 = ((($vi)) + 4|0);
 $108 = HEAP32[$107>>2]|0;
 $109 = $108 << 2;
 $110 = (_malloc($109)|0);
 $111 = ((($v)) + 8|0);
 HEAP32[$111>>2] = $110;
 $112 = (_malloc($109)|0);
 $113 = ((($v)) + 12|0);
 HEAP32[$113>>2] = $112;
 $114 = ($108|0)>(0);
 if ($114) {
  $115 = (_calloc($105,4)|0);
  HEAP32[$110>>2] = $115;
  $116 = ($108|0)>(1);
  if ($116) {
   $119 = 1;
   while(1) {
    $$pre28 = HEAP32[$111>>2]|0;
    $117 = (_calloc($105,4)|0);
    $118 = (($$pre28) + ($119<<2)|0);
    HEAP32[$118>>2] = $117;
    $120 = (($119) + 1)|0;
    $121 = ($120|0)<($108|0);
    if ($121) {
     $119 = $120;
    } else {
     break;
    }
   }
  }
 }
 $122 = ((($v)) + 36|0);
 HEAP32[$122>>2] = 0;
 $123 = ((($v)) + 40|0);
 HEAP32[$123>>2] = 0;
 $124 = HEAP32[$8>>2]|0;
 $125 = (($124|0) / 2)&-1;
 $126 = ((($v)) + 48|0);
 HEAP32[$126>>2] = $125;
 $127 = ((($v)) + 20|0);
 HEAP32[$127>>2] = $125;
 $128 = ((($1)) + 16|0);
 $129 = HEAP32[$128>>2]|0;
 $130 = (_calloc($129,4)|0);
 $131 = ((($13)) + 48|0);
 HEAP32[$131>>2] = $130;
 $132 = ((($1)) + 20|0);
 $133 = HEAP32[$132>>2]|0;
 $134 = (_calloc($133,4)|0);
 $135 = ((($13)) + 52|0);
 HEAP32[$135>>2] = $134;
 $136 = HEAP32[$128>>2]|0;
 $137 = ($136|0)>(0);
 if ($137) {
  $i$37 = 0;
  while(1) {
   $140 = (((($1)) + 800|0) + ($i$37<<2)|0);
   $141 = HEAP32[$140>>2]|0;
   $142 = (25640 + ($141<<2)|0);
   $143 = HEAP32[$142>>2]|0;
   $144 = ((($143)) + 8|0);
   $145 = HEAP32[$144>>2]|0;
   $146 = (((($1)) + 1056|0) + ($i$37<<2)|0);
   $147 = HEAP32[$146>>2]|0;
   $148 = (FUNCTION_TABLE_iii[$145 & 15]($v,$147)|0);
   $149 = HEAP32[$131>>2]|0;
   $150 = (($149) + ($i$37<<2)|0);
   HEAP32[$150>>2] = $148;
   $151 = (($i$37) + 1)|0;
   $152 = HEAP32[$128>>2]|0;
   $153 = ($151|0)<($152|0);
   if ($153) {
    $i$37 = $151;
   } else {
    break;
   }
  }
 }
 $138 = HEAP32[$132>>2]|0;
 $139 = ($138|0)>(0);
 if ($139) {
  $i$45 = 0;
 } else {
  $$0 = 0;
  return ($$0|0);
 }
 while(1) {
  $154 = (((($1)) + 1312|0) + ($i$45<<2)|0);
  $155 = HEAP32[$154>>2]|0;
  $156 = (25648 + ($155<<2)|0);
  $157 = HEAP32[$156>>2]|0;
  $158 = ((($157)) + 8|0);
  $159 = HEAP32[$158>>2]|0;
  $160 = (((($1)) + 1568|0) + ($i$45<<2)|0);
  $161 = HEAP32[$160>>2]|0;
  $162 = (FUNCTION_TABLE_iii[$159 & 15]($v,$161)|0);
  $163 = HEAP32[$135>>2]|0;
  $164 = (($163) + ($i$45<<2)|0);
  HEAP32[$164>>2] = $162;
  $165 = (($i$45) + 1)|0;
  $166 = HEAP32[$132>>2]|0;
  $167 = ($165|0)<($166|0);
  if ($167) {
   $i$45 = $165;
  } else {
   $$0 = 0;
   break;
  }
 }
 return ($$0|0);
}