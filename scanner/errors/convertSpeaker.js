function convertSpeaker (speaker) {
  switch (speaker) {
    case '空':
    case '空哥': return '空（空哥）'
    case '荧':
    case '荧妹': return '荧（荧妹）'
    case '神里绫华':
    case '龟龟': return '神里绫华（龟龟）'
    case '菲谢尔':
    case '皇女': return '菲谢尔（皇女）'
    case '公子':
    case '达达利亚': return '达达利亚（公子）'
    case '诺艾尔':
    case '女仆': return '诺艾尔（女仆）'
    case '甘雨':
    case '椰羊': return '甘雨（椰羊）'
    case '雷神':
    case '雷电将军': return '雷电将军（雷神）'
    case '珊瑚宫心海':
    case '心海': return '珊瑚宫心海（心海，扣扣米）'
    case '荒泷一斗':
    case '一斗': return '荒泷一斗（一斗）'
    case '神子':
    case '八重神子': return '八重神子（神子）'
    case '绫人':
    case '神里绫人': return '神里绫人（绫人）'
    case '万叶':
    case '枫原万叶': return '枫原万叶（万叶）'
    case '猫猫':
    case '迪奥娜': return '迪奥娜（猫猫）'
    case '草神':
    case '纳西妲': return '纳西妲（草神）'
  }

  return speaker
}