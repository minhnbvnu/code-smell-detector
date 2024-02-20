function happy2() {
  var tlHappy2 = new TimelineMax({ repeat: -1 });
  tlHappy2
    .to(
      leaf_stem_3,
      0.3,
      { attr: { x2: 335, y2: 268 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_3, 0.3, { x: 15, y: -7 }, "two+=0.5")
    .to(
      leaf_stem_4,
      0.3,
      { attr: { x2: 340, y2: 337 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_4, 0.3, { x: 15, y: -7 }, "two+=0.5")
    .to(
      leaf_stem_1,
      0.3,
      { attr: { x2: 289, y2: 360 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_1, 0.3, { x: -2, y: 0 }, "two+=0.5")
    .to(
      leaf_stem_2,
      0.3,
      { attr: { x2: 287.2, y2: 287 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_2, 0.3, { x: -5, y: 0 }, "two+=0.5")
    .to(
      head,
      0.3,
      {
        y: 0,
        x: 5,
        rotation: 5,
        transformOrigin: "center bottom",
        ease: Power0.easeNone
      },
      "two+=0.5"
    )
    .to(
      stem_1,
      0.3,
      { x: 2, morphSVG: stem_4, ease: Power0.easeNone },
      "two+=0.5"
    )
    .to(
      leaf_stem_3,
      0.3,
      { attr: { x2: 313.3, y2: 278.1 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_3, 0.3, { x: 0, y: 0 }, "three+=0.5")
    .to(
      leaf_stem_4,
      0.3,
      { attr: { x2: 312.6, y2: 351.2 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_4, 0.3, { x: 0, y: 0 }, "three+=0.5")
    .to(
      leaf_stem_1,
      0.3,
      { attr: { x2: 250, y2: 340 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_1, 0.3, { x: -15, y: -7 }, "three+=0.5")
    .to(
      leaf_stem_2,
      0.3,
      { attr: { x2: 235, y2: 265 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_2, 0.3, { x: -15, y: -7 }, "three+=0.5")
    .to(
      head,
      0.3,
      {
        y: 0,
        x: 0,
        rotation: 0,
        transformOrigin: "center bottom",
        ease: Power0.easeNone
      },
      "three+=0.5"
    )
    .to(
      stem_1,
      0.3,
      { x: 0, morphSVG: stem_1, ease: Power0.easeNone },
      "three+=0.5"
    );
  return tlHappy2;
}