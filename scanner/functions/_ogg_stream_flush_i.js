function _ogg_stream_flush_i($os,$og,$force,$nfill) {
 $os = $os|0;
 $og = $og|0;
 $force = $force|0;
 $nfill = $nfill|0;
 var $$ = 0, $$0 = 0, $$02 = 0, $$1 = 0, $$157 = 0, $$158 = 0, $$lcssa = 0, $$lobit = 0, $$pre = 0, $$pre38 = 0, $$pre39 = 0, $$pre40 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0;
 var $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0;
 var $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0;
 var $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0;
 var $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0;
 var $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0;
 var $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0;
 var $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0;
 var $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $acc$018 = 0, $bytes$0$lcssa = 0, $exitcond = 0, $exitcond160 = 0, $granule_pos$0$lcssa$off0 = 0, $granule_pos$0$lcssa$off16 = 0, $granule_pos$0$lcssa$off24 = 0, $granule_pos$0$lcssa$off32 = 0, $granule_pos$0$lcssa$off40 = 0, $granule_pos$0$lcssa$off48 = 0, $granule_pos$0$lcssa$off56 = 0, $granule_pos$0$lcssa$off8 = 0, $granule_pos$019$off0 = 0, $granule_pos$019$off16 = 0, $granule_pos$019$off24 = 0;
 var $granule_pos$019$off32 = 0, $granule_pos$019$off40 = 0, $granule_pos$019$off48 = 0, $granule_pos$019$off56 = 0, $granule_pos$019$off8 = 0, $granule_pos$1$off0 = 0, $granule_pos$1$off16 = 0, $granule_pos$1$off24 = 0, $granule_pos$1$off32 = 0, $granule_pos$1$off40 = 0, $granule_pos$1$off48 = 0, $granule_pos$1$off56 = 0, $granule_pos$1$off8 = 0, $granule_pos$2$off0 = 0, $granule_pos$2$off16 = 0, $granule_pos$2$off24 = 0, $granule_pos$2$off32 = 0, $granule_pos$2$off40 = 0, $granule_pos$2$off48 = 0, $granule_pos$2$off56 = 0;
 var $granule_pos$2$off8 = 0, $granule_pos$27$off0 = 0, $granule_pos$27$off16 = 0, $granule_pos$27$off24 = 0, $granule_pos$27$off32 = 0, $granule_pos$27$off40 = 0, $granule_pos$27$off48 = 0, $granule_pos$27$off56 = 0, $granule_pos$27$off8 = 0, $or$cond = 0, $or$cond159 = 0, $or$cond4 = 0, $packet_just_done$021 = 0, $packet_just_done$1 = 0, $packets_done$020 = 0, $packets_done$1 = 0, $storemerge = 0, $vals$0 = 0, $vals$1$lcssa = 0, $vals$117 = 0;
 var $vals$2 = 0, $vals$26 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($os)) + 28|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)>(255);
 $$ = $2 ? 255 : $1;
 $3 = ($os|0)==(0|0);
 if ($3) {
  $$0 = 0;
  return ($$0|0);
 }
 $4 = HEAP32[$os>>2]|0;
 $5 = ($4|0)==(0|0);
 $6 = ($$|0)==(0);
 $or$cond4 = $6 | $5;
 if ($or$cond4) {
  $$0 = 0;
  return ($$0|0);
 }
 $7 = ((($os)) + 332|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = ($8|0)==(0);
 L7: do {
  if ($9) {
   $13 = ((($os)) + 16|0);
   $vals$0 = 0;
   while(1) {
    $14 = ($vals$0|0)<($$|0);
    if (!($14)) {
     $$1 = $force;$granule_pos$2$off0 = 0;$granule_pos$2$off16 = 0;$granule_pos$2$off24 = 0;$granule_pos$2$off32 = 0;$granule_pos$2$off40 = 0;$granule_pos$2$off48 = 0;$granule_pos$2$off56 = 0;$granule_pos$2$off8 = 0;$vals$2 = $vals$0;
     label = 14;
     break L7;
    }
    $15 = HEAP32[$13>>2]|0;
    $16 = (($15) + ($vals$0<<2)|0);
    $17 = HEAP32[$16>>2]|0;
    $18 = $17 & 255;
    $19 = ($18|0)==(255);
    $20 = (($vals$0) + 1)|0;
    if ($19) {
     $vals$0 = $20;
    } else {
     $$1 = $force;$granule_pos$2$off0 = 0;$granule_pos$2$off16 = 0;$granule_pos$2$off24 = 0;$granule_pos$2$off32 = 0;$granule_pos$2$off40 = 0;$granule_pos$2$off48 = 0;$granule_pos$2$off56 = 0;$granule_pos$2$off8 = 0;$vals$2 = $20;
     label = 14;
     break;
    }
   }
  } else {
   $10 = ($$|0)>(0);
   if ($10) {
    $11 = ((($os)) + 16|0);
    $12 = ((($os)) + 20|0);
    $acc$018 = 0;$granule_pos$019$off0 = -1;$granule_pos$019$off16 = -1;$granule_pos$019$off24 = -1;$granule_pos$019$off32 = -1;$granule_pos$019$off40 = -1;$granule_pos$019$off48 = -1;$granule_pos$019$off56 = -1;$granule_pos$019$off8 = -1;$packet_just_done$021 = 0;$packets_done$020 = 0;$vals$117 = 0;
    while(1) {
     $21 = ($acc$018|0)>($nfill|0);
     $22 = ($packet_just_done$021|0)>(3);
     $or$cond = $21 & $22;
     if ($or$cond) {
      $$02 = 1;$granule_pos$0$lcssa$off0 = $granule_pos$019$off0;$granule_pos$0$lcssa$off16 = $granule_pos$019$off16;$granule_pos$0$lcssa$off24 = $granule_pos$019$off24;$granule_pos$0$lcssa$off32 = $granule_pos$019$off32;$granule_pos$0$lcssa$off40 = $granule_pos$019$off40;$granule_pos$0$lcssa$off48 = $granule_pos$019$off48;$granule_pos$0$lcssa$off56 = $granule_pos$019$off56;$granule_pos$0$lcssa$off8 = $granule_pos$019$off8;$vals$1$lcssa = $vals$117;
      break;
     }
     $23 = HEAP32[$11>>2]|0;
     $24 = (($23) + ($vals$117<<2)|0);
     $25 = HEAP32[$24>>2]|0;
     $26 = $25 & 255;
     $27 = (($26) + ($acc$018))|0;
     $28 = ($26|0)==(255);
     if ($28) {
      $granule_pos$1$off0 = $granule_pos$019$off0;$granule_pos$1$off16 = $granule_pos$019$off16;$granule_pos$1$off24 = $granule_pos$019$off24;$granule_pos$1$off32 = $granule_pos$019$off32;$granule_pos$1$off40 = $granule_pos$019$off40;$granule_pos$1$off48 = $granule_pos$019$off48;$granule_pos$1$off56 = $granule_pos$019$off56;$granule_pos$1$off8 = $granule_pos$019$off8;$packet_just_done$1 = 0;$packets_done$1 = $packets_done$020;
     } else {
      $29 = HEAP32[$12>>2]|0;
      $30 = (($29) + ($vals$117<<3)|0);
      $31 = $30;
      $32 = $31;
      $33 = HEAP32[$32>>2]|0;
      $34 = (($31) + 4)|0;
      $35 = $34;
      $36 = HEAP32[$35>>2]|0;
      $37 = (($packets_done$020) + 1)|0;
      $38 = $33&255;
      $39 = (_bitshift64Lshr(($33|0),($36|0),8)|0);
      $40 = tempRet0;
      $41 = $39&255;
      $42 = (_bitshift64Lshr(($33|0),($36|0),16)|0);
      $43 = tempRet0;
      $44 = $42&255;
      $45 = (_bitshift64Lshr(($33|0),($36|0),24)|0);
      $46 = tempRet0;
      $47 = $45&255;
      $48 = $36&255;
      $49 = (_bitshift64Lshr(($33|0),($36|0),40)|0);
      $50 = tempRet0;
      $51 = $49&255;
      $52 = (_bitshift64Lshr(($33|0),($36|0),48)|0);
      $53 = tempRet0;
      $54 = $52&255;
      $55 = (_bitshift64Lshr(($33|0),($36|0),56)|0);
      $56 = tempRet0;
      $57 = $55&255;
      $granule_pos$1$off0 = $38;$granule_pos$1$off16 = $44;$granule_pos$1$off24 = $47;$granule_pos$1$off32 = $48;$granule_pos$1$off40 = $51;$granule_pos$1$off48 = $54;$granule_pos$1$off56 = $57;$granule_pos$1$off8 = $41;$packet_just_done$1 = $37;$packets_done$1 = $37;
     }
     $58 = (($vals$117) + 1)|0;
     $59 = ($58|0)<($$|0);
     if ($59) {
      $acc$018 = $27;$granule_pos$019$off0 = $granule_pos$1$off0;$granule_pos$019$off16 = $granule_pos$1$off16;$granule_pos$019$off24 = $granule_pos$1$off24;$granule_pos$019$off32 = $granule_pos$1$off32;$granule_pos$019$off40 = $granule_pos$1$off40;$granule_pos$019$off48 = $granule_pos$1$off48;$granule_pos$019$off56 = $granule_pos$1$off56;$granule_pos$019$off8 = $granule_pos$1$off8;$packet_just_done$021 = $packet_just_done$1;$packets_done$020 = $packets_done$1;$vals$117 = $58;
     } else {
      $$02 = $force;$granule_pos$0$lcssa$off0 = $granule_pos$1$off0;$granule_pos$0$lcssa$off16 = $granule_pos$1$off16;$granule_pos$0$lcssa$off24 = $granule_pos$1$off24;$granule_pos$0$lcssa$off32 = $granule_pos$1$off32;$granule_pos$0$lcssa$off40 = $granule_pos$1$off40;$granule_pos$0$lcssa$off48 = $granule_pos$1$off48;$granule_pos$0$lcssa$off56 = $granule_pos$1$off56;$granule_pos$0$lcssa$off8 = $granule_pos$1$off8;$vals$1$lcssa = $58;
      break;
     }
    }
    $60 = ($vals$1$lcssa|0)==(255);
    if ($60) {
     $granule_pos$27$off0 = $granule_pos$0$lcssa$off0;$granule_pos$27$off16 = $granule_pos$0$lcssa$off16;$granule_pos$27$off24 = $granule_pos$0$lcssa$off24;$granule_pos$27$off32 = $granule_pos$0$lcssa$off32;$granule_pos$27$off40 = $granule_pos$0$lcssa$off40;$granule_pos$27$off48 = $granule_pos$0$lcssa$off48;$granule_pos$27$off56 = $granule_pos$0$lcssa$off56;$granule_pos$27$off8 = $granule_pos$0$lcssa$off8;$vals$26 = 255;
    } else {
     $$1 = $$02;$granule_pos$2$off0 = $granule_pos$0$lcssa$off0;$granule_pos$2$off16 = $granule_pos$0$lcssa$off16;$granule_pos$2$off24 = $granule_pos$0$lcssa$off24;$granule_pos$2$off32 = $granule_pos$0$lcssa$off32;$granule_pos$2$off40 = $granule_pos$0$lcssa$off40;$granule_pos$2$off48 = $granule_pos$0$lcssa$off48;$granule_pos$2$off56 = $granule_pos$0$lcssa$off56;$granule_pos$2$off8 = $granule_pos$0$lcssa$off8;$vals$2 = $vals$1$lcssa;
     label = 14;
    }
   } else {
    $$1 = $force;$granule_pos$2$off0 = -1;$granule_pos$2$off16 = -1;$granule_pos$2$off24 = -1;$granule_pos$2$off32 = -1;$granule_pos$2$off40 = -1;$granule_pos$2$off48 = -1;$granule_pos$2$off56 = -1;$granule_pos$2$off8 = -1;$vals$2 = 0;
    label = 14;
   }
  }
 } while(0);
 if ((label|0) == 14) {
  $61 = ($$1|0)==(0);
  if ($61) {
   $$0 = 0;
   return ($$0|0);
  } else {
   $granule_pos$27$off0 = $granule_pos$2$off0;$granule_pos$27$off16 = $granule_pos$2$off16;$granule_pos$27$off24 = $granule_pos$2$off24;$granule_pos$27$off32 = $granule_pos$2$off32;$granule_pos$27$off40 = $granule_pos$2$off40;$granule_pos$27$off48 = $granule_pos$2$off48;$granule_pos$27$off56 = $granule_pos$2$off56;$granule_pos$27$off8 = $granule_pos$2$off8;$vals$26 = $vals$2;
  }
 }
 $62 = ((($os)) + 40|0);
 HEAP8[$62>>0]=1399285583&255;HEAP8[$62+1>>0]=(1399285583>>8)&255;HEAP8[$62+2>>0]=(1399285583>>16)&255;HEAP8[$62+3>>0]=1399285583>>24;
 $63 = ((($os)) + 44|0);
 HEAP8[$63>>0] = 0;
 $64 = ((($os)) + 45|0);
 HEAP8[$64>>0] = 0;
 $65 = ((($os)) + 16|0);
 $66 = HEAP32[$65>>2]|0;
 $67 = HEAP32[$66>>2]|0;
 $68 = $67 >>> 8;
 $$lobit = $68 & 1;
 $69 = $$lobit ^ 1;
 $70 = $69 | 2;
 $$157 = $9 ? $70 : $69;
 $storemerge = $$157&255;
 HEAP8[$64>>0] = $storemerge;
 $71 = ((($os)) + 328|0);
 $72 = HEAP32[$71>>2]|0;
 $73 = ($72|0)!=(0);
 $74 = ($1|0)==($vals$26|0);
 $or$cond159 = $73 & $74;
 if ($or$cond159) {
  $$158 = $9 ? $70 : $69;
  $75 = $$158 | 4;
  $76 = $75&255;
  HEAP8[$64>>0] = $76;
 }
 HEAP32[$7>>2] = 1;
 $77 = ((($os)) + 46|0);
 HEAP8[$77>>0] = $granule_pos$27$off0;
 $78 = ((($os)) + 47|0);
 HEAP8[$78>>0] = $granule_pos$27$off8;
 $79 = ((($os)) + 48|0);
 HEAP8[$79>>0] = $granule_pos$27$off16;
 $80 = ((($os)) + 49|0);
 HEAP8[$80>>0] = $granule_pos$27$off24;
 $81 = ((($os)) + 50|0);
 HEAP8[$81>>0] = $granule_pos$27$off32;
 $82 = ((($os)) + 51|0);
 HEAP8[$82>>0] = $granule_pos$27$off40;
 $83 = ((($os)) + 52|0);
 HEAP8[$83>>0] = $granule_pos$27$off48;
 $84 = ((($os)) + 53|0);
 HEAP8[$84>>0] = $granule_pos$27$off56;
 $85 = ((($os)) + 336|0);
 $86 = HEAP32[$85>>2]|0;
 $87 = $86&255;
 $88 = ((($os)) + 54|0);
 HEAP8[$88>>0] = $87;
 $89 = $86 >>> 8;
 $90 = $89&255;
 $91 = ((($os)) + 55|0);
 HEAP8[$91>>0] = $90;
 $92 = $86 >>> 16;
 $93 = $92&255;
 $94 = ((($os)) + 56|0);
 HEAP8[$94>>0] = $93;
 $95 = $86 >>> 24;
 $96 = $95&255;
 $97 = ((($os)) + 57|0);
 HEAP8[$97>>0] = $96;
 $98 = ((($os)) + 340|0);
 $99 = HEAP32[$98>>2]|0;
 $100 = ($99|0)==(-1);
 if ($100) {
  HEAP32[$98>>2] = 0;
  $102 = 0;
 } else {
  $102 = $99;
 }
 $101 = (($102) + 1)|0;
 HEAP32[$98>>2] = $101;
 $103 = $102&255;
 $104 = ((($os)) + 58|0);
 HEAP8[$104>>0] = $103;
 $105 = $102 >>> 8;
 $106 = $105&255;
 $107 = ((($os)) + 59|0);
 HEAP8[$107>>0] = $106;
 $108 = $102 >>> 16;
 $109 = $108&255;
 $110 = ((($os)) + 60|0);
 HEAP8[$110>>0] = $109;
 $111 = $102 >>> 24;
 $112 = $111&255;
 $113 = ((($os)) + 61|0);
 HEAP8[$113>>0] = $112;
 $114 = ((($os)) + 62|0);
 $115 = $vals$26&255;
 $116 = ((($os)) + 66|0);
 HEAP8[$114>>0]=0&255;HEAP8[$114+1>>0]=(0>>8)&255;HEAP8[$114+2>>0]=(0>>16)&255;HEAP8[$114+3>>0]=0>>24;
 HEAP8[$116>>0] = $115;
 $117 = ($vals$26|0)>(0);
 if ($117) {
  $118 = HEAP32[$66>>2]|0;
  $119 = $118&255;
  $120 = ((($os)) + 67|0);
  HEAP8[$120>>0] = $119;
  $121 = $118 & 255;
  $exitcond160 = ($vals$26|0)==(1);
  if ($exitcond160) {
   $$lcssa = $121;
  } else {
   $123 = 1;$130 = $121;
   while(1) {
    $$pre = HEAP32[$65>>2]|0;
    $122 = (($$pre) + ($123<<2)|0);
    $124 = HEAP32[$122>>2]|0;
    $125 = $124&255;
    $126 = (($123) + 27)|0;
    $127 = (((($os)) + 40|0) + ($126)|0);
    HEAP8[$127>>0] = $125;
    $128 = $124 & 255;
    $129 = (($128) + ($130))|0;
    $131 = (($123) + 1)|0;
    $exitcond = ($131|0)==($vals$26|0);
    if ($exitcond) {
     $$lcssa = $129;
     break;
    } else {
     $123 = $131;$130 = $129;
    }
   }
  }
  $$pre38 = HEAP32[$os>>2]|0;
  $$pre39 = HEAP32[$0>>2]|0;
  $$pre40 = HEAP32[$65>>2]|0;
  $138 = $$pre38;$142 = $$pre39;$144 = $$pre40;$bytes$0$lcssa = $$lcssa;
 } else {
  $138 = $4;$142 = $1;$144 = $66;$bytes$0$lcssa = 0;
 }
 HEAP32[$og>>2] = $62;
 $132 = (($vals$26) + 27)|0;
 $133 = ((($os)) + 324|0);
 HEAP32[$133>>2] = $132;
 $134 = ((($og)) + 4|0);
 HEAP32[$134>>2] = $132;
 $135 = ((($os)) + 12|0);
 $136 = HEAP32[$135>>2]|0;
 $137 = (($138) + ($136)|0);
 $139 = ((($og)) + 8|0);
 HEAP32[$139>>2] = $137;
 $140 = ((($og)) + 12|0);
 HEAP32[$140>>2] = $bytes$0$lcssa;
 $141 = (($142) - ($vals$26))|0;
 HEAP32[$0>>2] = $141;
 $143 = (($144) + ($vals$26<<2)|0);
 $145 = $141 << 2;
 _memmove(($144|0),($143|0),($145|0))|0;
 $146 = ((($os)) + 20|0);
 $147 = HEAP32[$146>>2]|0;
 $148 = (($147) + ($vals$26<<3)|0);
 $149 = HEAP32[$0>>2]|0;
 $150 = $149 << 3;
 _memmove(($147|0),($148|0),($150|0))|0;
 $151 = HEAP32[$135>>2]|0;
 $152 = (($151) + ($bytes$0$lcssa))|0;
 HEAP32[$135>>2] = $152;
 _ogg_page_checksum_set($og);
 $$0 = 1;
 return ($$0|0);
}