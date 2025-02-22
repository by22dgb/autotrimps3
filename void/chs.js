/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

var cnItems = {
    _OTHER_: [],
    'The Mechanism of How Void Maps Drop': '虚空地图掉落机制',
    'Void Maps are a unique type of map which can only show up after \nyou have used the portal device, and which reward a juicy amount of \nhelium (or at least, a juicy amount ': '虚空地图是一种独特的地图，只在您传送后出现，奖励大量氦(或者至少对于',
    'for the zone you clear it on': '通过它的区域而言',
    ').\n Elusive and unpredictable, they appear to show up whenever they wish. \nThrough a little bit of magic and a whole lot of looking at code, \nhowever, all of their secrets have been revealed.': '数量可观的氦)。它们难以捉摸，不可预测，似乎总是随心所欲地出现。但通过对源代码施加一些“魔法”，我们已经知道了它们的秘密。',
    'Void Maps are dropped by a combined random-chance ': '虚空地图掉落由随机概率',
    'and': '和',
    ' a\n constrained time delay system. You cannot get a new void map \nimmediately after getting the last one, but you also cannot predict \nexactly when the next one will drop.': '限时延迟系统共同控制。您无法在获得一张虚空地图后立刻获得下一张虚空地图，也无法精确预测下一张虚空地图何时掉落。',
    'These systems are switched between perfectly continuously. If \nyou pass beyond the time delay period and then switch away from your \nvoid map drop chance heirloom, you are seamlessly back in the (now \nlonger) time delay period. Or, if you are slogging along through the \nnatural time delay period and then switch to an heirloom with high void \nmap drop chance, you can suddenly have significant chances to acquire a \nvoid map on each world cell you clear.': '这两个系统之间是无缝切换的。如果您度过了延迟期，并换下了虚空地图掉落概率的传家宝，则会进入更加长的延迟期。又或者，您正在延迟期中，换上拥有更高虚空地图掉落概率的传家宝，则每个世界格子都有更高概率获得虚空地图。',
    'The time delay portion of the drop mechanism': '掉落机制的延迟期部分',
    'The time delay period is an enforced wait of a certain number of\n world cells that you need to clear before the void maps can possibly \ndrop. It mostly depends on your highest zone ever (your "HZE"), though \nif you portal only a small distance (25 zones or less) before your HZE \nthen it will use that last portal zone instead.': '延迟期将强制您等待，需要通过一定数量的世界格子，虚空地图才可能掉落。它主要跟您的最高到达区域有关，不过如果您上周目在该区域之前25个区域的范围内传送了，则会改为跟上周目到达的区域有关。',
    'Whichever number it uses, it then clamps to a minimum of 80 and a\n maximum of 200 (inclusive). For HZE 80 and below, the time delay is ': '无论最后跟哪个区域有关，它的数值范围将限制在80至200之间(均包含本数)。对于最高到达区域不超过区域80的，延迟期为',
    ' cells. Above that, it delays by an additional 13 cells per zone, up to a maximum of ': '个格子。之后每个区域延迟期增加13个格子，直到最高到达区域不低于区域200时达到最大，为',
    ' cells at HZE 200 and above.': '个格子。',
    'The time delay is modified, however, by the Void Map Drop Chance\n on Shield heirlooms and by the effect of the Golden Void upgrades, \nwhether you have one or both. The time delay is ': '延迟期还会受到盾牌传家宝上虚空地图掉落概率和金色虚空升级影响。无论只拥有其中一个，还是拥有两个，延迟期都会',
    'decreased': '减少',
    ' by \nthose percentages, so if you had a time delay of 1000 cells, and a 25% \nVMDC mod on your shield, then your time delay would act as if it were \n750 cells. Or, if you had a time delay of 2000 (as if you had portalled \non zone 157...almost), and a shield with 50% VMDC and 50% VMDC from \ngolden voids, then you would have a practical time delay of only 500 \ncells, as both 50% modifiers independently halve the delay.': '相应百分比。如果您的延迟期本来为1000个格子，盾牌上的虚空地图掉落概率词缀效果为25%，那么延迟期将变为750个格子。如果您的延迟期本来为2000个格子，并且拥有50%的虚空地图掉落概率和50%的金色虚空升级效果，那么延迟期将变为只有500个格子，因为它们都将独立影响延迟期。',
    'Golden Voids\' VMDC bonus cannot exceed 72%, while shield heirlooms have a varying cap on VMDC based on the rarity of the shield.': '金色虚空升级的效果无法超过72%，而盾牌传家宝上的虚空地图掉落概率效果上限与盾牌稀有度有关。',
    'The random chance portion of the drop mechanism': '掉落机制的随机概率部分',
    'Past the time delay portion, every ten world cells cleared \ncontributes an additive 0.002% chance for a void map to drop from each \nworld cell. After 8 zones (which is 800 cells), the chance would thus be\n at .16% per cell.': '度过延迟期后，每通过10个世界格子，都会使虚空地图掉落的概率增加0.002%。通过8个区域(即800个格子)后，概率将增加0.16%。',
    'This is a very unreliable randomness - so many random chances, but at such initially small odds, means that it takes ': '它的随机性极不可靠，如此多的随机概率，初始概率又如此低，因此基本上需要',
    'quite a while': '经过一段时间',
    ' for the void map to have a reasonable chance to drop, but it also means\n that despite it being theoretically possible for a void map to fail to \ndrop for 500 zones of this random rolling phase, it would be \nastronomically unlikely for a void map to drop later than 38 zones into \nthe phase.': '才有较大的可能掉落。由于它完全随机，当然可能出现经过500个区域还不掉落的情况，但可以说，如果经过38个区域还没掉落虚空地图，那概率已经是小到天文数字倒数的级别了。',
    'Also throwing an additional bit of confusion into the mix: the \nrandom function used by Trimps is... a choice. It is surprisingly \nperiodic, definitely not quite uniform, and just generally a bad choice \nfor being a ': '此外，还有一个因素令人困惑：脆皮游戏使用的随机函数实在令人费解。它呈现出明显的周期性，分布显然不够均匀，可以说完全不能算是随机函数的',
    'good': '好',
    ' random function. That said, it is not actually\n unrandom - it is unpredictable, and gives a good curve of results when \ngraphed over the full possible range.': '选择。尽管如此，它还是有足够的随机性，无法预测结果，把所有结果绘制成图表时，仍然有良好的结果曲线。',
    'For hard numbers, this random chance portion is on average ': '具体数值方面，随机概率平均为',
    ' cells long, with a standard deviation of 473.45 cells. The median \nduration is 801 cells, while 40% drop before 683 cells and 40% drop \nafter 925 cells, and 1% drop before 90 cells and 1% drop after 2219 \ncells. The maximum wait time is 3087 cells, and the minimum is 11.': '个格子，标准差为473.45个格子。中位数为801个格子，40%虚空地图会在683个格子前掉落，40%虚空地图会在925个格子后掉落，1%虚空地图会在90个格子前掉落，1%虚空地图会在2219个格子后掉落。最多需要经过3087个格子，最少需要经过11个格子。',
    'These numbers are sourced from a complete survey of the possible\n seeds one can start this portion with, with a small portion of seeds \nsurveyed which should be impossible but which are nonetheless \ntechnically within reach. To explain: upon portalling, a random number \nbetween 0 and 999999 (inclusive) is generated, and is used as the seed \nfor the random function exclusively for the Void Map dropping chances. \nThis seed then only increases, by one or two per world cell cleared, \nuntil the next portal. Due to the nature of the game, this seed cannot \never exceed 1161999. This limit is even, almost certainly, an \noverestimate of the highest seed ever reached - but it is a guaranteed \nline that the game cannot cross, at least in version 5.9.2 (previous or \nfuture versions may differ, and I will probably still be observing the \nlimit to see if it ever climbs above what I have explored here).': '以上数据来源于对所有初始随机种子的完整计算，甚至包含了一些理论上可能出现但几乎不出现的随机种子。具体来说：每次传送时，系统会生成一个0至999999之间(包含本数)的随机数，专门用于计算虚空地图掉落概率。到传送之前，每通过一个世界格子，它就增加1或者2。由于游戏机制限制，该种子数值永远不会超过1161999。这个上限可以说已经是对种子数值上限的严重高估，但在5.9.2版本中，可以说它是绝对无法超过的界限(过往或之后的游戏版本可能会有出入，我将一直观察上限，看它是否有可能突破该数值)。',
    'Some comments on strategies and implications': '关于策略和可能影响的评价',
    'The way that the time delay gets longer as one pushes past zone \n80 (until one begins pushing past zone 200) might seem to imply that \npushing to new highest zones is actually a net loss. However, the \nchallenges, bonuses, and features those zones unlock are some incredibly\n powerful benefits, and the delay per zone is not even that significant:\n at its greatest effect, with the switch from portal-zone 80 to \nportal-zone 81, it will delay each void map by about ': '随着超过区域80，在到达区域200之前，延迟期会变得越来越长，看起来推进区域会损失虚空地图。但相应区域解锁的挑战、加成和机制会提供非常多的好处，并且每个区域增加的延迟期其实并不显著：考虑延迟期最大的情况，从区域80到区域81，每张虚空地图的延迟期大概增加',
    ', and each zone\'s effect tapers down to a mere ': '，而从区域199到区域200后，延迟期只增加',
    ' at the portal-zone 199 to portal-zone 200 switch. Do not fear pushing.': '。所以不要因此不推进区域。',
    'Golden Voids are a significant boost to how many voids one can \nexpect to get. However, when one\'s Achievement bonus is small, the time \nit takes to acquire all 8 Golden Voids weakens them dramatically, \nespecially since the first 5 Golden Voids are not even giving half of \nthe total boost yet. The rule of thumb is to not bother with Golden \nVoids until you have 2500% achievement percentage and are reaching zone \n350 regularly - before then, the extra helium income from additional \nGolden Heliums will outweigh the extra helium from the additional void \nmaps you (might) get.': '金色虚空可以显著增加得到的虚空地图数量。但当成就的加成较低时，需要很长的时间才能获取全部8个金色虚空升级，它们就没有那么强大了，而且前5个金色虚空升级的加成甚至还没有全部8个的一半。经验之谈是，在成就的加成未达到2500%，且无法稳定推进到区域350之前，无需考虑金色虚空升级，因为金色氦升级效果更好。',
    'With higher tiers of shield heirlooms, the cap on their Void Map\n Drop Chance mods increases to mathematically alarming numbers. At 80%, \nthe mechanism is dominated by the random chance portion, but everything \nstill ends up working properly. Above 95% or so, the shield is doing so \nmuch on its own that ': '随着盾牌传家宝稀有度提升，它的虚空地图掉落概率也会增加到数学上惊人的数值。当达到80%时，掉落机制主要由随机概率决定，但整体仍然可以正常运作。如果超过95%，盾牌自身的效果将强到使',
    'Golden Voids stop being relevant': '金色虚空升级变得无关紧要',
    '. If your \nshield has that much VMDC, stop buying Golden Voids, and instead invest \nthose goldens elsewhere. They will have more effect there. ...They will \nhave ': '。如果盾牌有那么高的效果，可以停止购买金色虚空升级，改为购买其他金色升级。它们会有更大效果的……',
    'any': '任何',
    ' effect there.': '效果都好。',
    'Other Sources of Void Maps (with Obfuscated Spoilers': '虚空地图的其他来源(含模糊剧透',
    'Throughout the game, there are multiple ways of getting more Void\n Maps, through both deterministic means and through means which depend \non the randomness inherent in the basic void map dropping mechanism. The\n following list has most of the spoilers scrubbed off, but proceed with \ncaution unless you are okay with hintings of spoilers.': '游戏过程中还有其他获得更多虚空地图的办法，既可能是确定多获得的，也可能是依赖于机制中固有随机概率部分的。以下内容已经去除了大部分剧透内容，但如果您仍然不想看到任何剧透提示，则谨慎往下阅读。',
    'An early source gives deterministically more void maps for every void map earned from ': '某种早期就解锁的机制可以确定使',
    ' source, capping out at 10% more voids overall.': '地方获得的虚空地图增加，总的来说至多增加10%的虚空地图。',
    'One source eventually gives a flat total of 20 additional void maps for free every portal.': '通过某种途径，最终可以在传送后额外免费获得20张虚空地图。',
    'A certain pair of unlocks give a variable number of free immediate void maps on portal based on the zone you portalled from.': '某个可解锁项根据您上周目进行传送的区域，提供不同数量的免费虚空地图。',
    'Yet another source adds a mechanism by which guaranteed void maps drop for every so many zones cleared ': '通过另外某种途径，在基本掉落机制',
    'on top of': '之外',
    ' the basic dropping mechanism.': '，每通过若干个区域就会保证有虚空地图掉落。',
    'One source, oddly enough, gives its own 20% VMDC as an ': '通过某种奇怪的途径，可以使金色虚空升级的加成',
    'additive': '增加',
    ' bonus on the Golden Voids, bringing that up to a possible 92% VMDC.': '20%，使它的效果变为92%。',
    'Another source can give back 5% of the voids you cleared last portal.': '还有某种途径，可以根据上周目传送时通过的虚空地图数量，返还其数量5%的虚空地图。',
}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    ": ": "：",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "：",
    "： ": "：",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    "\n": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*\-?$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\s*[A-Za-z]\s*$/, //带单字母的纯空格
    /^\s([IVXLCDM]+)$/, //不抓取罗马数字
    /^(.*)[\u4E00-\u9FFF]+(.*)$/, //不抓取中文
    /^[e\.\s\d]+\(\+?$/, //不抓取内容
    /^[\.\d]+%$/, //不抓取内容
    /^\d+[\.\/]$/, //不抓取内容
    /^\d+%\s$/, //不抓取内容
    /^\d\.[e\d]+$/, //不抓取内容
    /^\d{2}\/\d{2}\/\d{4} v[\d\.]+$/, //不抓取脚本内容
    /^[e\.\d]+%\s\/$/, //不抓取内容
    /^\s\d+$/, //不抓取内容
    /^\s?\d{2}:\d{2}$/, //不抓取内容
    /^x\d+\)\s$/, //不抓取内容
    /^：[e\.\(\s\d]+$/, //不抓取内容
];

var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
]);