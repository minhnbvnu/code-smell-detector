function JinhuaGame( casino, typeid, roomid, options ) {
	var defaults = {		// 默认值，可配置
		max_seats: 6,
		no_joker: true,
		no_color: [],
		no_number: [],
		ready_countdown: 10,
		turn_countdown: 10,
		ante: 50,			// 锅底
		bet_min: 50,		// 最少投注
		bet_max: -1,		// 最大投注
		raise_min: 50,		// 最少加注
		raise_multiple: false,		// true: 加注时翻倍计算, false: 加注时增量计算
		pot_cap: -1,		// 封顶, -1 表示不封顶
		
		rake_percent: 0.03,			// 3% 抽水，赢家的提成比例
		rake_pot: 500,				// 底池达到一定金额，比如底池高于500元抽水，低于500元不抽水。
		rake_cap: 200,				// 抽水会设置上限，比如澳门现场局抽水上限200元。
	};
	if(options && (typeof options === 'object')) {
		for(var i in options) defaults[i] = options[i];
	}
	
	Room.call(this, casino, typeid, roomid, defaults);
	
	this.first_turn = 0;		// 开始押注的座位编号
	
	this.ready_gamers = 0;		// 准备进入牌局的玩家计数
	this.ready_countdown = -1;	// 2个以上玩家准备启动的开局倒计时
	
	this.is_ingame = false;		// 牌局进行中
	
	this.turn_countdown = -1;	// 当前玩家的倒计时
	this.in_gamers = [];		// 参与本局的所有玩家
	this.cards = {};			// seat -> cards, 座位对应的可见牌，[0,0,0]表示不可见
	this.chips = {};			// seat -> n, 每个座位投入的筹码数
	
	this.pot_chips = [];		// 彩池里的全部筹码，按投注顺序
	this.pot = 0;				// 彩池总数
	this.max_chip = 0;			// 当前最大下注的多少
	this.last_raise = 0;		// 最近一次加注的多少
	this.no_raise_counter = 0;	// 无加注的次数
	
	this.round_counter = 1;		// 牌局的轮数
}