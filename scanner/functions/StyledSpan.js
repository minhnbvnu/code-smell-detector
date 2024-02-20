function StyledSpan({ textStyle, textDiyStyle, bgColor, children }) {
  switch (textStyle) {
    case OPT_STYLE_LINE: // 下划线
      return (
        <LineSpan $lineStyle="solid" $lineColor={bgColor}>
          {children}
        </LineSpan>
      );
    case OPT_STYLE_DOTLINE: // 点状线
      return (
        <LineSpan $lineStyle="dotted" $lineColor={bgColor}>
          {children}
        </LineSpan>
      );
    case OPT_STYLE_DASHLINE: // 虚线
      return (
        <LineSpan $lineStyle="dashed" $lineColor={bgColor}>
          {children}
        </LineSpan>
      );
    case OPT_STYLE_WAVYLINE: // 波浪线
      return (
        <LineSpan $lineStyle="wavy" $lineColor={bgColor}>
          {children}
        </LineSpan>
      );
    case OPT_STYLE_FUZZY: // 模糊
      return <FuzzySpan>{children}</FuzzySpan>;
    case OPT_STYLE_HIGHLIGHT: // 高亮
      return (
        <HighlightSpan $bgColor={bgColor || DEFAULT_COLOR}>
          {children}
        </HighlightSpan>
      );
    case OPT_STYLE_BLOCKQUOTE: // 引用
      return (
        <BlockquoteSpan $lineColor={bgColor || DEFAULT_COLOR}>
          {children}
        </BlockquoteSpan>
      );
    case OPT_STYLE_DIY: // 自定义
      return <DiySpan $diyStyle={textDiyStyle}>{children}</DiySpan>;
    default:
      return <span>{children}</span>;
  }
}