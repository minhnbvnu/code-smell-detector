function _floor1_fit($vb,$look,$logmdct,$logmask) {
 $vb = $vb|0;
 $look = $look|0;
 $logmdct = $logmdct|0;
 $logmask = $logmask|0;
 var $$$0$i = 0, $$$i$i = 0, $$$i$i27 = 0, $$$i$i58 = 0, $$$i5$i = 0, $$0$i = 0, $$0$i$i = 0, $$0$i$i28 = 0, $$0$i$i59 = 0, $$0$i10 = 0, $$0$i54 = 0, $$0$i6$i = 0, $$0$i63 = 0, $$0$i7 = 0, $$0$i8 = 0, $$0$p$i = 0, $$pn$i = 0, $$pre = 0, $$pre116 = 0, $$pre117 = 0;
 var $$val$i = 0.0, $$val$i26 = 0.0, $$val$i61 = 0.0, $$val4$i = 0.0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0;
 var $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0;
 var $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0;
 var $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0;
 var $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0.0, $173 = 0.0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0.0, $184 = 0.0;
 var $185 = 0.0, $186 = 0, $187 = 0.0, $188 = 0.0, $189 = 0.0, $19 = 0, $190 = 0.0, $191 = 0, $192 = 0.0, $193 = 0.0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0;
 var $202 = 0, $203 = 0.0, $204 = 0.0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0.0, $214 = 0.0, $215 = 0, $216 = 0, $217 = 0.0, $218 = 0.0, $219 = 0.0, $22 = 0;
 var $220 = 0.0, $221 = 0, $222 = 0.0, $223 = 0.0, $224 = 0, $225 = 0, $226 = 0, $227 = 0.0, $228 = 0.0, $229 = 0.0, $23 = 0, $230 = 0.0, $231 = 0.0, $232 = 0, $233 = 0.0, $234 = 0.0, $235 = 0.0, $236 = 0, $237 = 0, $238 = 0.0;
 var $239 = 0, $24 = 0.0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0.0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0;
 var $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0;
 var $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0;
 var $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0.0;
 var $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0.0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0;
 var $33 = 0.0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0;
 var $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0;
 var $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0.0, $76 = 0.0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0.0, $83 = 0.0, $84 = 0.0, $85 = 0, $86 = 0, $87 = 0;
 var $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $err$010$i = 0, $err$1$i = 0, $exitcond = 0, $exitcond109 = 0, $exitcond110 = 0, $exitcond112 = 0, $exitcond114 = 0;
 var $exitcond115 = 0, $fit_valueA = 0, $fit_valueB = 0, $fits = 0, $hineighbor = 0, $hy0 = 0, $hy1 = 0, $i$01$i = 0, $i$01$i25 = 0, $i$0104 = 0, $i$1102 = 0, $i$398 = 0, $i$593 = 0, $i$687 = 0, $i$778 = 0, $ispos$i = 0, $ispos$i56 = 0, $ispos2$i = 0, $j$080 = 0, $j$080$in = 0;
 var $j$1 = 0, $j$183 = 0, $j$184 = 0, $loneighbor = 0, $ly0 = 0, $ly1 = 0, $memo = 0, $mse$0$lcssa$i = 0, $mse$011$i = 0, $n$0$lcssa$i = 0, $n$012$i = 0, $na$0$lcssa$i = 0, $na$0$lcssa$i47 = 0, $na$07$i = 0, $na$07$i19 = 0, $na$1$i = 0, $na$1$i34 = 0, $nb$0$lcssa$i = 0, $nb$0$lcssa$i41 = 0, $nb$013$i = 0;
 var $nb$013$i13 = 0, $nb$1$i = 0, $nb$1$i40 = 0, $neg$i = 0, $neg$i57 = 0, $neg3$i = 0, $nonzero$092 = 0, $nonzero$1 = 0, $or$cond = 0, $or$cond$i = 0, $or$cond6 = 0, $output$0 = 0, $x1$$i = 0, $x2a$0$lcssa$i = 0, $x2a$0$lcssa$i50 = 0, $x2a$04$i = 0, $x2a$04$i22 = 0, $x2a$1$i = 0, $x2a$1$i31 = 0, $x2b$0$lcssa$i = 0;
 var $x2b$0$lcssa$i44 = 0, $x2b$010$i = 0, $x2b$010$i16 = 0, $x2b$1$i = 0, $x2b$1$i37 = 0, $xa$0$lcssa$i = 0, $xa$0$lcssa$i52 = 0, $xa$02$i = 0, $xa$02$i24 = 0, $xa$1$i = 0, $xa$1$i29 = 0, $xb$0$lcssa$i = 0, $xb$0$lcssa$i46 = 0, $xb$08$i = 0, $xb$08$i18 = 0, $xb$1$i = 0, $xb$1$i35 = 0, $xya$0$lcssa$i = 0, $xya$0$lcssa$i48 = 0, $xya$06$i = 0;
 var $xya$06$i20 = 0, $xya$1$i = 0, $xya$1$i33 = 0, $xyb$0$lcssa$i = 0, $xyb$0$lcssa$i42 = 0, $xyb$012$i = 0, $xyb$012$i14 = 0, $xyb$1$i = 0, $xyb$1$i39 = 0, $y$09$i = 0, $y$1$i = 0, $y0 = 0, $y1 = 0, $y2a$0$lcssa$i = 0, $y2a$0$lcssa$i49 = 0, $y2a$05$i = 0, $y2a$05$i21 = 0, $y2a$1$i = 0, $y2a$1$i32 = 0, $y2b$0$lcssa$i = 0;
 var $y2b$0$lcssa$i43 = 0, $y2b$011$i = 0, $y2b$011$i15 = 0, $y2b$1$i = 0, $y2b$1$i38 = 0, $ya$0$lcssa$i = 0, $ya$0$lcssa$i51 = 0, $ya$03$i = 0, $ya$03$i23 = 0, $ya$1$i = 0, $ya$1$i30 = 0, $yb$0$lcssa$i = 0, $yb$0$lcssa$i45 = 0, $yb$09$i = 0, $yb$09$i17 = 0, $yb$1$i = 0, $yb$1$i36 = 0, dest = 0, label = 0, sp = 0;
 var stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 4912|0;
 $fits = sp + 1328|0;
 $fit_valueA = sp + 1064|0;
 $fit_valueB = sp + 804|0;
 $loneighbor = sp + 544|0;
 $hineighbor = sp + 284|0;
 $memo = sp + 24|0;
 $y0 = sp + 20|0;
 $y1 = sp + 16|0;
 $ly0 = sp + 12|0;
 $ly1 = sp + 8|0;
 $hy0 = sp + 4|0;
 $hy1 = sp;
 $0 = ((($look)) + 1296|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($look)) + 1288|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ((($look)) + 1284|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ($5|0)>(0);
 if ($6) {
  $i$0104 = 0;
  while(1) {
   $7 = (($fit_valueA) + ($i$0104<<2)|0);
   HEAP32[$7>>2] = -200;
   $8 = (($i$0104) + 1)|0;
   $exitcond115 = ($8|0)==($5|0);
   if ($exitcond115) {
    break;
   } else {
    $i$0104 = $8;
   }
  }
  if ($6) {
   $i$1102 = 0;
   while(1) {
    $9 = (($fit_valueB) + ($i$1102<<2)|0);
    HEAP32[$9>>2] = -200;
    $10 = (($i$1102) + 1)|0;
    $exitcond114 = ($10|0)==($5|0);
    if ($exitcond114) {
     break;
    } else {
     $i$1102 = $10;
    }
   }
   if ($6) {
    $11 = $5 << 2;
    _memset(($loneighbor|0),0,($11|0))|0;
    $i$398 = 0;
    while(1) {
     $12 = (($hineighbor) + ($i$398<<2)|0);
     HEAP32[$12>>2] = 1;
     $13 = (($i$398) + 1)|0;
     $exitcond112 = ($13|0)==($5|0);
     if ($exitcond112) {
      break;
     } else {
      $i$398 = $13;
     }
    }
    if ($6) {
     $15 = $5 << 2;
     _memset(($memo|0),-1,($15|0))|0;
     $16 = ($5|0)>(1);
     if (!($16)) {
      $output$0 = 0;
      STACKTOP = sp;return ($output$0|0);
     }
     $17 = (($3) + -1)|0;
     $18 = ((($1)) + 1112|0);
     $19 = (($5) + -1)|0;
     $$pre = HEAP32[$look>>2]|0;
     $70 = $$pre;$i$593 = 0;$nonzero$092 = 0;
     while(1) {
      $66 = (($i$593) + 1)|0;
      $67 = (($look) + ($66<<2)|0);
      $68 = HEAP32[$67>>2]|0;
      $69 = (($fits) + (($i$593*56)|0)|0);
      dest=$69; stop=dest+56|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
      HEAP32[$69>>2] = $70;
      $71 = (((($fits) + (($i$593*56)|0)|0)) + 4|0);
      HEAP32[$71>>2] = $68;
      $72 = ($68|0)<($3|0);
      $x1$$i = $72 ? $68 : $17;
      $73 = ($x1$$i|0)<($70|0);
      if ($73) {
       $na$0$lcssa$i47 = 0;$nb$0$lcssa$i41 = 0;$x2a$0$lcssa$i50 = 0;$x2b$0$lcssa$i44 = 0;$xa$0$lcssa$i52 = 0;$xb$0$lcssa$i46 = 0;$xya$0$lcssa$i48 = 0;$xyb$0$lcssa$i42 = 0;$y2a$0$lcssa$i49 = 0;$y2b$0$lcssa$i43 = 0;$ya$0$lcssa$i51 = 0;$yb$0$lcssa$i45 = 0;
      } else {
       $i$01$i25 = $70;$na$07$i19 = 0;$nb$013$i13 = 0;$x2a$04$i22 = 0;$x2b$010$i16 = 0;$xa$02$i24 = 0;$xb$08$i18 = 0;$xya$06$i20 = 0;$xyb$012$i14 = 0;$y2a$05$i21 = 0;$y2b$011$i15 = 0;$ya$03$i23 = 0;$yb$09$i17 = 0;
       while(1) {
        $74 = (($logmask) + ($i$01$i25<<2)|0);
        $$val$i26 = +HEAPF32[$74>>2];
        $75 = $$val$i26 * 7.3142857551574707;
        $76 = $75 + 1023.5;
        $77 = (~~(($76)));
        $78 = ($77|0)>(1023);
        $79 = ($77|0)<(0);
        $$$i$i27 = $79 ? 0 : $77;
        $$0$i$i28 = $78 ? 1023 : $$$i$i27;
        $80 = ($$0$i$i28|0)==(0);
        do {
         if ($80) {
          $na$1$i34 = $na$07$i19;$nb$1$i40 = $nb$013$i13;$x2a$1$i31 = $x2a$04$i22;$x2b$1$i37 = $x2b$010$i16;$xa$1$i29 = $xa$02$i24;$xb$1$i35 = $xb$08$i18;$xya$1$i33 = $xya$06$i20;$xyb$1$i39 = $xyb$012$i14;$y2a$1$i32 = $y2a$05$i21;$y2b$1$i38 = $y2b$011$i15;$ya$1$i30 = $ya$03$i23;$yb$1$i36 = $yb$09$i17;
         } else {
          $81 = (($logmdct) + ($i$01$i25<<2)|0);
          $82 = +HEAPF32[$81>>2];
          $83 = +HEAPF32[$18>>2];
          $84 = $83 + $82;
          $85 = !($84 >= $$val$i26);
          if ($85) {
           $95 = (($i$01$i25) + ($xb$08$i18))|0;
           $96 = (($$0$i$i28) + ($yb$09$i17))|0;
           $97 = Math_imul($i$01$i25, $i$01$i25)|0;
           $98 = (($97) + ($x2b$010$i16))|0;
           $99 = Math_imul($$0$i$i28, $$0$i$i28)|0;
           $100 = (($99) + ($y2b$011$i15))|0;
           $101 = Math_imul($$0$i$i28, $i$01$i25)|0;
           $102 = (($101) + ($xyb$012$i14))|0;
           $103 = (($nb$013$i13) + 1)|0;
           $na$1$i34 = $na$07$i19;$nb$1$i40 = $103;$x2a$1$i31 = $x2a$04$i22;$x2b$1$i37 = $98;$xa$1$i29 = $xa$02$i24;$xb$1$i35 = $95;$xya$1$i33 = $xya$06$i20;$xyb$1$i39 = $102;$y2a$1$i32 = $y2a$05$i21;$y2b$1$i38 = $100;$ya$1$i30 = $ya$03$i23;$yb$1$i36 = $96;
           break;
          } else {
           $86 = (($i$01$i25) + ($xa$02$i24))|0;
           $87 = (($$0$i$i28) + ($ya$03$i23))|0;
           $88 = Math_imul($i$01$i25, $i$01$i25)|0;
           $89 = (($88) + ($x2a$04$i22))|0;
           $90 = Math_imul($$0$i$i28, $$0$i$i28)|0;
           $91 = (($90) + ($y2a$05$i21))|0;
           $92 = Math_imul($$0$i$i28, $i$01$i25)|0;
           $93 = (($92) + ($xya$06$i20))|0;
           $94 = (($na$07$i19) + 1)|0;
           $na$1$i34 = $94;$nb$1$i40 = $nb$013$i13;$x2a$1$i31 = $89;$x2b$1$i37 = $x2b$010$i16;$xa$1$i29 = $86;$xb$1$i35 = $xb$08$i18;$xya$1$i33 = $93;$xyb$1$i39 = $xyb$012$i14;$y2a$1$i32 = $91;$y2b$1$i38 = $y2b$011$i15;$ya$1$i30 = $87;$yb$1$i36 = $yb$09$i17;
           break;
          }
         }
        } while(0);
        $104 = (($i$01$i25) + 1)|0;
        $105 = ($i$01$i25|0)<($x1$$i|0);
        if ($105) {
         $i$01$i25 = $104;$na$07$i19 = $na$1$i34;$nb$013$i13 = $nb$1$i40;$x2a$04$i22 = $x2a$1$i31;$x2b$010$i16 = $x2b$1$i37;$xa$02$i24 = $xa$1$i29;$xb$08$i18 = $xb$1$i35;$xya$06$i20 = $xya$1$i33;$xyb$012$i14 = $xyb$1$i39;$y2a$05$i21 = $y2a$1$i32;$y2b$011$i15 = $y2b$1$i38;$ya$03$i23 = $ya$1$i30;$yb$09$i17 = $yb$1$i36;
        } else {
         $na$0$lcssa$i47 = $na$1$i34;$nb$0$lcssa$i41 = $nb$1$i40;$x2a$0$lcssa$i50 = $x2a$1$i31;$x2b$0$lcssa$i44 = $x2b$1$i37;$xa$0$lcssa$i52 = $xa$1$i29;$xb$0$lcssa$i46 = $xb$1$i35;$xya$0$lcssa$i48 = $xya$1$i33;$xyb$0$lcssa$i42 = $xyb$1$i39;$y2a$0$lcssa$i49 = $y2a$1$i32;$y2b$0$lcssa$i43 = $y2b$1$i38;$ya$0$lcssa$i51 = $ya$1$i30;$yb$0$lcssa$i45 = $yb$1$i36;
         break;
        }
       }
      }
      $106 = (((($fits) + (($i$593*56)|0)|0)) + 8|0);
      HEAP32[$106>>2] = $xa$0$lcssa$i52;
      $107 = (((($fits) + (($i$593*56)|0)|0)) + 12|0);
      HEAP32[$107>>2] = $ya$0$lcssa$i51;
      $108 = (((($fits) + (($i$593*56)|0)|0)) + 16|0);
      HEAP32[$108>>2] = $x2a$0$lcssa$i50;
      $109 = (((($fits) + (($i$593*56)|0)|0)) + 20|0);
      HEAP32[$109>>2] = $y2a$0$lcssa$i49;
      $110 = (((($fits) + (($i$593*56)|0)|0)) + 24|0);
      HEAP32[$110>>2] = $xya$0$lcssa$i48;
      $111 = (((($fits) + (($i$593*56)|0)|0)) + 28|0);
      HEAP32[$111>>2] = $na$0$lcssa$i47;
      $112 = (((($fits) + (($i$593*56)|0)|0)) + 32|0);
      HEAP32[$112>>2] = $xb$0$lcssa$i46;
      $113 = (((($fits) + (($i$593*56)|0)|0)) + 36|0);
      HEAP32[$113>>2] = $yb$0$lcssa$i45;
      $114 = (((($fits) + (($i$593*56)|0)|0)) + 40|0);
      HEAP32[$114>>2] = $x2b$0$lcssa$i44;
      $115 = (((($fits) + (($i$593*56)|0)|0)) + 44|0);
      HEAP32[$115>>2] = $y2b$0$lcssa$i43;
      $116 = (((($fits) + (($i$593*56)|0)|0)) + 48|0);
      HEAP32[$116>>2] = $xyb$0$lcssa$i42;
      $117 = (((($fits) + (($i$593*56)|0)|0)) + 52|0);
      HEAP32[$117>>2] = $nb$0$lcssa$i41;
      $118 = (($na$0$lcssa$i47) + ($nonzero$092))|0;
      $exitcond110 = ($66|0)==($19|0);
      if ($exitcond110) {
       $nonzero$1 = $118;
       break;
      } else {
       $70 = $68;$i$593 = $66;$nonzero$092 = $118;
      }
     }
    } else {
     label = 9;
    }
   } else {
    label = 9;
   }
  } else {
   label = 9;
  }
 } else {
  label = 9;
 }
 if ((label|0) == 9) {
  $14 = ($5|0)==(0);
  if (!($14)) {
   $output$0 = 0;
   STACKTOP = sp;return ($output$0|0);
  }
  $20 = ((($fits)) + 4|0);
  dest=$fits; stop=dest+56|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
  HEAP32[$20>>2] = $3;
  $21 = ($3|0)<(1);
  if ($21) {
   $na$0$lcssa$i = 0;$nb$0$lcssa$i = 0;$x2a$0$lcssa$i = 0;$x2b$0$lcssa$i = 0;$xa$0$lcssa$i = 0;$xb$0$lcssa$i = 0;$xya$0$lcssa$i = 0;$xyb$0$lcssa$i = 0;$y2a$0$lcssa$i = 0;$y2b$0$lcssa$i = 0;$ya$0$lcssa$i = 0;$yb$0$lcssa$i = 0;
  } else {
   $22 = ((($1)) + 1112|0);
   $i$01$i = 0;$na$07$i = 0;$nb$013$i = 0;$x2a$04$i = 0;$x2b$010$i = 0;$xa$02$i = 0;$xb$08$i = 0;$xya$06$i = 0;$xyb$012$i = 0;$y2a$05$i = 0;$y2b$011$i = 0;$ya$03$i = 0;$yb$09$i = 0;
   while(1) {
    $23 = (($logmask) + ($i$01$i<<2)|0);
    $$val$i = +HEAPF32[$23>>2];
    $24 = $$val$i * 7.3142857551574707;
    $25 = $24 + 1023.5;
    $26 = (~~(($25)));
    $27 = ($26|0)>(1023);
    $28 = ($26|0)<(0);
    $$$i$i = $28 ? 0 : $26;
    $$0$i$i = $27 ? 1023 : $$$i$i;
    $29 = ($$0$i$i|0)==(0);
    do {
     if ($29) {
      $na$1$i = $na$07$i;$nb$1$i = $nb$013$i;$x2a$1$i = $x2a$04$i;$x2b$1$i = $x2b$010$i;$xa$1$i = $xa$02$i;$xb$1$i = $xb$08$i;$xya$1$i = $xya$06$i;$xyb$1$i = $xyb$012$i;$y2a$1$i = $y2a$05$i;$y2b$1$i = $y2b$011$i;$ya$1$i = $ya$03$i;$yb$1$i = $yb$09$i;
     } else {
      $30 = (($logmdct) + ($i$01$i<<2)|0);
      $31 = +HEAPF32[$30>>2];
      $32 = +HEAPF32[$22>>2];
      $33 = $32 + $31;
      $34 = !($33 >= $$val$i);
      if ($34) {
       $44 = (($i$01$i) + ($xb$08$i))|0;
       $45 = (($$0$i$i) + ($yb$09$i))|0;
       $46 = Math_imul($i$01$i, $i$01$i)|0;
       $47 = (($46) + ($x2b$010$i))|0;
       $48 = Math_imul($$0$i$i, $$0$i$i)|0;
       $49 = (($48) + ($y2b$011$i))|0;
       $50 = Math_imul($$0$i$i, $i$01$i)|0;
       $51 = (($50) + ($xyb$012$i))|0;
       $52 = (($nb$013$i) + 1)|0;
       $na$1$i = $na$07$i;$nb$1$i = $52;$x2a$1$i = $x2a$04$i;$x2b$1$i = $47;$xa$1$i = $xa$02$i;$xb$1$i = $44;$xya$1$i = $xya$06$i;$xyb$1$i = $51;$y2a$1$i = $y2a$05$i;$y2b$1$i = $49;$ya$1$i = $ya$03$i;$yb$1$i = $45;
       break;
      } else {
       $35 = (($i$01$i) + ($xa$02$i))|0;
       $36 = (($$0$i$i) + ($ya$03$i))|0;
       $37 = Math_imul($i$01$i, $i$01$i)|0;
       $38 = (($37) + ($x2a$04$i))|0;
       $39 = Math_imul($$0$i$i, $$0$i$i)|0;
       $40 = (($39) + ($y2a$05$i))|0;
       $41 = Math_imul($$0$i$i, $i$01$i)|0;
       $42 = (($41) + ($xya$06$i))|0;
       $43 = (($na$07$i) + 1)|0;
       $na$1$i = $43;$nb$1$i = $nb$013$i;$x2a$1$i = $38;$x2b$1$i = $x2b$010$i;$xa$1$i = $35;$xb$1$i = $xb$08$i;$xya$1$i = $42;$xyb$1$i = $xyb$012$i;$y2a$1$i = $40;$y2b$1$i = $y2b$011$i;$ya$1$i = $36;$yb$1$i = $yb$09$i;
       break;
      }
     }
    } while(0);
    $53 = (($i$01$i) + 1)|0;
    $exitcond109 = ($53|0)==($3|0);
    if ($exitcond109) {
     $na$0$lcssa$i = $na$1$i;$nb$0$lcssa$i = $nb$1$i;$x2a$0$lcssa$i = $x2a$1$i;$x2b$0$lcssa$i = $x2b$1$i;$xa$0$lcssa$i = $xa$1$i;$xb$0$lcssa$i = $xb$1$i;$xya$0$lcssa$i = $xya$1$i;$xyb$0$lcssa$i = $xyb$1$i;$y2a$0$lcssa$i = $y2a$1$i;$y2b$0$lcssa$i = $y2b$1$i;$ya$0$lcssa$i = $ya$1$i;$yb$0$lcssa$i = $yb$1$i;
     break;
    } else {
     $i$01$i = $53;$na$07$i = $na$1$i;$nb$013$i = $nb$1$i;$x2a$04$i = $x2a$1$i;$x2b$010$i = $x2b$1$i;$xa$02$i = $xa$1$i;$xb$08$i = $xb$1$i;$xya$06$i = $xya$1$i;$xyb$012$i = $xyb$1$i;$y2a$05$i = $y2a$1$i;$y2b$011$i = $y2b$1$i;$ya$03$i = $ya$1$i;$yb$09$i = $yb$1$i;
    }
   }
  }
  $54 = ((($fits)) + 8|0);
  HEAP32[$54>>2] = $xa$0$lcssa$i;
  $55 = ((($fits)) + 12|0);
  HEAP32[$55>>2] = $ya$0$lcssa$i;
  $56 = ((($fits)) + 16|0);
  HEAP32[$56>>2] = $x2a$0$lcssa$i;
  $57 = ((($fits)) + 20|0);
  HEAP32[$57>>2] = $y2a$0$lcssa$i;
  $58 = ((($fits)) + 24|0);
  HEAP32[$58>>2] = $xya$0$lcssa$i;
  $59 = ((($fits)) + 28|0);
  HEAP32[$59>>2] = $na$0$lcssa$i;
  $60 = ((($fits)) + 32|0);
  HEAP32[$60>>2] = $xb$0$lcssa$i;
  $61 = ((($fits)) + 36|0);
  HEAP32[$61>>2] = $yb$0$lcssa$i;
  $62 = ((($fits)) + 40|0);
  HEAP32[$62>>2] = $x2b$0$lcssa$i;
  $63 = ((($fits)) + 44|0);
  HEAP32[$63>>2] = $y2b$0$lcssa$i;
  $64 = ((($fits)) + 48|0);
  HEAP32[$64>>2] = $xyb$0$lcssa$i;
  $65 = ((($fits)) + 52|0);
  HEAP32[$65>>2] = $nb$0$lcssa$i;
  $nonzero$1 = $na$0$lcssa$i;
 }
 $119 = ($nonzero$1|0)==(0);
 if ($119) {
  $output$0 = 0;
  STACKTOP = sp;return ($output$0|0);
 }
 HEAP32[$y0>>2] = -200;
 HEAP32[$y1>>2] = -200;
 $120 = (($5) + -1)|0;
 (_fit_line($fits,$120,$y0,$y1,$1)|0);
 $121 = HEAP32[$y0>>2]|0;
 HEAP32[$fit_valueA>>2] = $121;
 HEAP32[$fit_valueB>>2] = $121;
 $122 = HEAP32[$y1>>2]|0;
 $123 = ((($fit_valueB)) + 4|0);
 HEAP32[$123>>2] = $122;
 $124 = ((($fit_valueA)) + 4|0);
 HEAP32[$124>>2] = $122;
 $125 = ($5|0)>(2);
 do {
  if ($125) {
   $126 = ((($1)) + 1112|0);
   $127 = ((($1)) + 1096|0);
   $128 = ((($1)) + 1100|0);
   $129 = ((($1)) + 1104|0);
   $i$687 = 2;
   L50: while(1) {
    $130 = (((($look)) + 520|0) + ($i$687<<2)|0);
    $131 = HEAP32[$130>>2]|0;
    $132 = (($loneighbor) + ($131<<2)|0);
    $133 = HEAP32[$132>>2]|0;
    $134 = (($hineighbor) + ($131<<2)|0);
    $135 = HEAP32[$134>>2]|0;
    $136 = (($memo) + ($133<<2)|0);
    $137 = HEAP32[$136>>2]|0;
    $138 = ($137|0)==($135|0);
    L52: do {
     if (!($138)) {
      $139 = (((($look)) + 520|0) + ($133<<2)|0);
      $140 = HEAP32[$139>>2]|0;
      $141 = (((($look)) + 520|0) + ($135<<2)|0);
      $142 = HEAP32[$141>>2]|0;
      HEAP32[$136>>2] = $135;
      $143 = (((($1)) + 836|0) + ($133<<2)|0);
      $144 = HEAP32[$143>>2]|0;
      $145 = (((($1)) + 836|0) + ($135<<2)|0);
      $146 = HEAP32[$145>>2]|0;
      $147 = (($fit_valueA) + ($133<<2)|0);
      $148 = HEAP32[$147>>2]|0;
      $149 = ($148|0)<(0);
      $150 = (($fit_valueB) + ($133<<2)|0);
      $151 = HEAP32[$150>>2]|0;
      if ($149) {
       $$0$i54 = $151;
      } else {
       $152 = ($151|0)<(0);
       if ($152) {
        $$0$i54 = $148;
       } else {
        $153 = (($151) + ($148))|0;
        $154 = $153 >> 1;
        $$0$i54 = $154;
       }
      }
      $155 = (($fit_valueA) + ($135<<2)|0);
      $156 = HEAP32[$155>>2]|0;
      $157 = ($156|0)<(0);
      $158 = (($fit_valueB) + ($135<<2)|0);
      $159 = HEAP32[$158>>2]|0;
      if ($157) {
       $$0$i63 = $159;
      } else {
       $160 = ($159|0)<(0);
       if ($160) {
        $$0$i63 = $156;
       } else {
        $161 = (($159) + ($156))|0;
        $162 = $161 >> 1;
        $$0$i63 = $162;
       }
      }
      $163 = ($$0$i54|0)==(-1);
      $164 = ($$0$i63|0)==(-1);
      $or$cond = $163 | $164;
      if ($or$cond) {
       label = 38;
       break L50;
      }
      $165 = (($$0$i63) - ($$0$i54))|0;
      $166 = (($146) - ($144))|0;
      $ispos$i56 = ($165|0)>(-1);
      $neg$i57 = (0 - ($165))|0;
      $167 = $ispos$i56 ? $165 : $neg$i57;
      $168 = (($165|0) / ($166|0))&-1;
      $169 = $165 >> 31;
      $170 = $169 | 1;
      $171 = (($logmask) + ($144<<2)|0);
      $$val4$i = +HEAPF32[$171>>2];
      $172 = $$val4$i * 7.3142857551574707;
      $173 = $172 + 1023.5;
      $174 = (~~(($173)));
      $175 = ($174|0)>(1023);
      $176 = ($174|0)<(0);
      $$$i$i58 = $176 ? 0 : $174;
      $$0$i$i59 = $175 ? 1023 : $$$i$i58;
      $177 = Math_imul($168, $166)|0;
      $ispos2$i = ($177|0)>(-1);
      $neg3$i = (0 - ($177))|0;
      $178 = $ispos2$i ? $177 : $neg3$i;
      $179 = (($167) - ($178))|0;
      $180 = (($$0$i54) - ($$0$i$i59))|0;
      $181 = Math_imul($180, $180)|0;
      $182 = (($logmdct) + ($144<<2)|0);
      $183 = +HEAPF32[$182>>2];
      $184 = +HEAPF32[$126>>2];
      $185 = $184 + $183;
      $186 = !($185 >= $$val4$i);
      if ($186) {
       label = 42;
      } else {
       $187 = (+($$0$i54|0));
       $188 = +HEAPF32[$127>>2];
       $189 = $188 + $187;
       $190 = (+($$0$i$i59|0));
       $191 = $189 < $190;
       if (!($191)) {
        $192 = +HEAPF32[$128>>2];
        $193 = $187 - $192;
        $194 = $193 > $190;
        if (!($194)) {
         label = 42;
        }
       }
      }
      L66: do {
       if ((label|0) == 42) {
        label = 0;
        $195 = (($144) + 1)|0;
        $196 = ($195|0)<($146|0);
        if ($196) {
         $202 = $195;$err$010$i = 0;$mse$011$i = $181;$n$012$i = 1;$y$09$i = $$0$i54;
         while(1) {
          $197 = (($err$010$i) + ($179))|0;
          $198 = ($197|0)<($166|0);
          $199 = $198 ? 0 : $170;
          $200 = $198 ? 0 : $166;
          $err$1$i = (($197) - ($200))|0;
          $$pn$i = (($y$09$i) + ($168))|0;
          $y$1$i = (($$pn$i) + ($199))|0;
          $201 = (($logmask) + ($202<<2)|0);
          $$val$i61 = +HEAPF32[$201>>2];
          $203 = $$val$i61 * 7.3142857551574707;
          $204 = $203 + 1023.5;
          $205 = (~~(($204)));
          $206 = ($205|0)>(1023);
          $207 = ($205|0)<(0);
          $$$i5$i = $207 ? 0 : $205;
          $$0$i6$i = $206 ? 1023 : $$$i5$i;
          $208 = (($y$1$i) - ($$0$i6$i))|0;
          $209 = Math_imul($208, $208)|0;
          $210 = (($209) + ($mse$011$i))|0;
          $211 = (($n$012$i) + 1)|0;
          $212 = (($logmdct) + ($202<<2)|0);
          $213 = +HEAPF32[$212>>2];
          $214 = $213 + $184;
          $215 = $214 >= $$val$i61;
          $216 = ($$0$i6$i|0)!=(0);
          $or$cond$i = $215 & $216;
          if ($or$cond$i) {
           $217 = (+($y$1$i|0));
           $218 = +HEAPF32[$127>>2];
           $219 = $218 + $217;
           $220 = (+($$0$i6$i|0));
           $221 = $219 < $220;
           if ($221) {
            break L66;
           }
           $222 = +HEAPF32[$128>>2];
           $223 = $217 - $222;
           $224 = $223 > $220;
           if ($224) {
            break L66;
           }
          }
          $225 = (($202) + 1)|0;
          $226 = ($225|0)<($146|0);
          if ($226) {
           $202 = $225;$err$010$i = $err$1$i;$mse$011$i = $210;$n$012$i = $211;$y$09$i = $y$1$i;
          } else {
           $mse$0$lcssa$i = $210;$n$0$lcssa$i = $211;
           break;
          }
         }
        } else {
         $mse$0$lcssa$i = $181;$n$0$lcssa$i = 1;
        }
        $227 = +HEAPF32[$127>>2];
        $228 = $227 * $227;
        $229 = (+($n$0$lcssa$i|0));
        $230 = $228 / $229;
        $231 = +HEAPF32[$129>>2];
        $232 = $230 > $231;
        if (!($232)) {
         $233 = +HEAPF32[$128>>2];
         $234 = $233 * $233;
         $235 = $234 / $229;
         $236 = $235 > $231;
         if (!($236)) {
          $237 = (($mse$0$lcssa$i|0) / ($n$0$lcssa$i|0))&-1;
          $238 = (+($237|0));
          $239 = $238 > $231;
          if ($239) {
           break;
          }
         }
        }
        $272 = (($fit_valueA) + ($i$687<<2)|0);
        HEAP32[$272>>2] = -200;
        $273 = (($fit_valueB) + ($i$687<<2)|0);
        HEAP32[$273>>2] = -200;
        break L52;
       }
      } while(0);
      HEAP32[$ly0>>2] = -200;
      HEAP32[$ly1>>2] = -200;
      HEAP32[$hy0>>2] = -200;
      HEAP32[$hy1>>2] = -200;
      $240 = (($fits) + (($140*56)|0)|0);
      $241 = (($131) - ($140))|0;
      $242 = (_fit_line($240,$241,$ly0,$ly1,$1)|0);
      $243 = (($fits) + (($131*56)|0)|0);
      $244 = (($142) - ($131))|0;
      $245 = (_fit_line($243,$244,$hy0,$hy1,$1)|0);
      $246 = ($242|0)!=(0);
      if ($246) {
       HEAP32[$ly0>>2] = $$0$i54;
       $247 = HEAP32[$hy0>>2]|0;
       HEAP32[$ly1>>2] = $247;
      }
      $248 = ($245|0)==(0);
      if (!($248)) {
       $249 = HEAP32[$ly1>>2]|0;
       HEAP32[$hy0>>2] = $249;
       HEAP32[$hy1>>2] = $$0$i63;
       if ($246) {
        $250 = (($fit_valueA) + ($i$687<<2)|0);
        HEAP32[$250>>2] = -200;
        $251 = (($fit_valueB) + ($i$687<<2)|0);
        HEAP32[$251>>2] = -200;
        break;
       }
      }
      $252 = HEAP32[$ly0>>2]|0;
      HEAP32[$150>>2] = $252;
      $253 = ($133|0)==(0);
      if ($253) {
       HEAP32[$fit_valueA>>2] = $252;
      }
      $254 = HEAP32[$ly1>>2]|0;
      $255 = (($fit_valueA) + ($i$687<<2)|0);
      HEAP32[$255>>2] = $254;
      $256 = HEAP32[$hy0>>2]|0;
      $257 = (($fit_valueB) + ($i$687<<2)|0);
      HEAP32[$257>>2] = $256;
      $258 = HEAP32[$hy1>>2]|0;
      HEAP32[$155>>2] = $258;
      $259 = ($135|0)==(1);
      if ($259) {
       HEAP32[$123>>2] = $258;
      }
      $260 = $256 & $254;
      $261 = ($260|0)>(-1);
      if ($261) {
       $262 = ($131|0)>(0);
       L95: do {
        if ($262) {
         $j$080$in = $131;
         while(1) {
          $j$080 = (($j$080$in) + -1)|0;
          $264 = (($hineighbor) + ($j$080<<2)|0);
          $265 = HEAP32[$264>>2]|0;
          $266 = ($265|0)==($135|0);
          if (!($266)) {
           break L95;
          }
          HEAP32[$264>>2] = $i$687;
          $267 = ($j$080$in|0)>(1);
          if ($267) {
           $j$080$in = $j$080;
          } else {
           break;
          }
         }
        }
       } while(0);
       $j$183 = (($131) + 1)|0;
       $263 = ($j$183|0)<($5|0);
       if ($263) {
        $j$184 = $j$183;
        while(1) {
         $268 = (($loneighbor) + ($j$184<<2)|0);
         $269 = HEAP32[$268>>2]|0;
         $270 = ($269|0)==($133|0);
         if (!($270)) {
          break L52;
         }
         HEAP32[$268>>2] = $i$687;
         $j$1 = (($j$184) + 1)|0;
         $271 = ($j$1|0)<($5|0);
         if ($271) {
          $j$184 = $j$1;
         } else {
          break;
         }
        }
       }
      }
     }
    } while(0);
    $274 = (($i$687) + 1)|0;
    $275 = ($274|0)<($5|0);
    if ($275) {
     $i$687 = $274;
    } else {
     label = 68;
     break;
    }
   }
   if ((label|0) == 38) {
    _exit(1);
    // unreachable;
   }
   else if ((label|0) == 68) {
    $$pre116 = HEAP32[$fit_valueA>>2]|0;
    $$pre117 = HEAP32[$fit_valueB>>2]|0;
    $278 = $$pre116;$280 = $$pre117;
    break;
   }
  } else {
   $278 = $121;$280 = $121;
  }
 } while(0);
 $276 = $5 << 2;
 $277 = (__vorbis_block_alloc($vb,$276)|0);
 $279 = ($278|0)<(0);
 if ($279) {
  $$0$i10 = $280;
 } else {
  $281 = ($280|0)<(0);
  if ($281) {
   $$0$i10 = $278;
  } else {
   $282 = (($280) + ($278))|0;
   $283 = $282 >> 1;
   $$0$i10 = $283;
  }
 }
 HEAP32[$277>>2] = $$0$i10;
 $284 = HEAP32[$124>>2]|0;
 $285 = ($284|0)<(0);
 $286 = HEAP32[$123>>2]|0;
 if ($285) {
  $$0$i8 = $286;
 } else {
  $287 = ($286|0)<(0);
  if ($287) {
   $$0$i8 = $284;
  } else {
   $288 = (($286) + ($284))|0;
   $289 = $288 >> 1;
   $$0$i8 = $289;
  }
 }
 $290 = ((($277)) + 4|0);
 HEAP32[$290>>2] = $$0$i8;
 if ($125) {
  $i$778 = 2;
 } else {
  $output$0 = $277;
  STACKTOP = sp;return ($output$0|0);
 }
 while(1) {
  $291 = (($i$778) + -2)|0;
  $292 = (((($look)) + 1032|0) + ($291<<2)|0);
  $293 = HEAP32[$292>>2]|0;
  $294 = (((($look)) + 780|0) + ($291<<2)|0);
  $295 = HEAP32[$294>>2]|0;
  $296 = (((($1)) + 836|0) + ($293<<2)|0);
  $297 = HEAP32[$296>>2]|0;
  $298 = (((($1)) + 836|0) + ($295<<2)|0);
  $299 = HEAP32[$298>>2]|0;
  $300 = (($277) + ($293<<2)|0);
  $301 = HEAP32[$300>>2]|0;
  $302 = (($277) + ($295<<2)|0);
  $303 = HEAP32[$302>>2]|0;
  $304 = (((($1)) + 836|0) + ($i$778<<2)|0);
  $305 = HEAP32[$304>>2]|0;
  $306 = $301 & 32767;
  $307 = $303 & 32767;
  $308 = (($307) - ($306))|0;
  $309 = (($299) - ($297))|0;
  $ispos$i = ($308|0)>(-1);
  $neg$i = (0 - ($308))|0;
  $310 = $ispos$i ? $308 : $neg$i;
  $311 = (($305) - ($297))|0;
  $312 = Math_imul($310, $311)|0;
  $313 = (($312|0) / ($309|0))&-1;
  $314 = ($308|0)<(0);
  $315 = (0 - ($313))|0;
  $$0$p$i = $314 ? $315 : $313;
  $$0$i7 = (($$0$p$i) + ($306))|0;
  $316 = (($fit_valueA) + ($i$778<<2)|0);
  $317 = HEAP32[$316>>2]|0;
  $318 = ($317|0)<(0);
  $319 = (($fit_valueB) + ($i$778<<2)|0);
  $320 = HEAP32[$319>>2]|0;
  if ($318) {
   $$0$i = $320;
  } else {
   $321 = ($320|0)<(0);
   if ($321) {
    $$0$i = $317;
   } else {
    $322 = (($320) + ($317))|0;
    $323 = $322 >> 1;
    $$0$i = $323;
   }
  }
  $324 = ($$0$i|0)<(0);
  $325 = ($$0$i7|0)==($$0$i|0);
  $or$cond6 = $324 | $325;
  $326 = $$0$i7 | 32768;
  $$$0$i = $or$cond6 ? $326 : $$0$i;
  $327 = (($277) + ($i$778<<2)|0);
  HEAP32[$327>>2] = $$$0$i;
  $328 = (($i$778) + 1)|0;
  $exitcond = ($328|0)==($5|0);
  if ($exitcond) {
   $output$0 = $277;
   break;
  } else {
   $i$778 = $328;
  }
 }
 STACKTOP = sp;return ($output$0|0);
}