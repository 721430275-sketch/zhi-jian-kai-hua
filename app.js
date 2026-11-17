const $ = (id) => document.getElementById(id);
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => {
  t = clamp(t);
  return t * t * (3 - 2 * t);
};
const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
const fmtPercent = (value) => `${Math.round(clamp(value) * 100)}%`;

const FLOWERS = [
  { key: 'marigold', name: '万寿菊', latin: 'Tagetes erecta', short: 'Marigold', seed: 17, video: './assets/flowers/videos/01-marigold.mp4', description: '金色花瓣层层盛放。' },
  { key: 'white-rose', name: '白玫瑰', latin: 'Rosa', short: 'White rose', seed: 31, video: './assets/flowers/videos/02-white-rose.mp4', description: '白色花瓣从花心舒展。' },
  { key: 'balloon-flower', name: '桔梗', latin: 'Platycodon grandiflorus', short: 'Balloon flower', seed: 47, video: './assets/flowers/videos/03-balloon-flower.mp4', description: '蓝紫色花冠从花苞打开。' },
  { key: 'poppy', name: '虞美人', latin: 'Papaver rhoeas', short: 'Poppy', seed: 61, video: './assets/flowers/videos/04-poppy.mp4', description: '轻薄红色花瓣向外舒展。' },
  { key: 'hydrangea', name: '绣球花', latin: 'Hydrangea macrophylla', short: 'Hydrangea', seed: 73, video: './assets/flowers/videos/05-hydrangea.mp4', description: '一簇小花逐渐聚成花球。' },
  { key: 'hibiscus', name: '扶桑花', latin: 'Hibiscus rosa-sinensis', short: 'Hibiscus', seed: 89, video: './assets/flowers/videos/06-hibiscus.mp4', description: '大朵薄瓣向外舒展。' },
  { key: 'camellia', name: '山茶花', latin: 'Camellia japonica', short: 'Camellia', seed: 103, video: './assets/flowers/videos/07-camellia.mp4', description: '层叠花瓣从中心显露。' },
  { key: 'hyacinth', name: '风信子', latin: 'Hyacinthus orientalis', short: 'Hyacinth', seed: 127, video: './assets/flowers/videos/08-hyacinth.mp4', description: '成串小花逐层开放。' },
  { key: 'iris', name: '鸢尾花', latin: 'Iris germanica', short: 'Iris', seed: 139, video: './assets/flowers/videos/09-iris.mp4', description: '紫色花瓣向下展开。' },
  { key: 'lavender', name: '薰衣草', latin: 'Lavandula angustifolia', short: 'Lavender', seed: 151, video: './assets/flowers/videos/10-lavender.mp4', description: '细小紫花沿花穗连续绽开。' },
  { key: 'dahlia', name: '大丽花', latin: 'Dahlia pinnata', short: 'Dahlia', seed: 167, video: './assets/flowers/videos/11-dahlia.mp4', description: '尖瓣层叠向外绽放。' },
  { key: 'pansy', name: '三色堇', latin: 'Viola tricolor', short: 'Viola', seed: 181, video: './assets/flowers/videos/12-pansy.mp4', description: '紫色五瓣花面缓慢打开。' },
  { key: 'pink-lotus', name: '粉色荷花', latin: 'Nelumbo nucifera', short: 'Pink lotus', seed: 197, video: './assets/flowers/videos/13-pink-lotus.mp4', description: '莲瓣层叠，盛放时花心舒展。' },
  { key: 'cherry-blossom', name: '樱花', latin: 'Prunus serrulata', short: 'Cherry blossom', seed: 211, video: './assets/flowers/videos/14-cherry-blossom.mp4', description: '轻薄花瓣在枝头展开。' },
  { key: 'chrysanthemum', name: '菊花', latin: 'Chrysanthemum', short: 'Chrysanthemum', seed: 227, video: './assets/flowers/videos/15-chrysanthemum.mp4', description: '细长花瓣层层打开。' },
  { key: 'sunflower', name: '向日葵', latin: 'Helianthus annuus', short: 'Helianthus', seed: 239, video: './assets/flowers/videos/16-sunflower.mp4', description: '金色花瓣向阳绽放。' },
  { key: 'lily', name: '百合花', latin: 'Lilium', short: 'Lily', seed: 251, video: './assets/flowers/videos/17-lily.mp4', description: '白色花瓣与花药逐渐显现。' },
  { key: 'tulip', name: '郁金香', latin: 'Tulipa', short: 'Tulip', seed: 263, video: './assets/flowers/videos/18-tulip.mp4', description: '杯形花冠慢慢张开。' },
  { key: 'pink-rose', name: '粉玫瑰', latin: 'Rosa', short: 'Pink rose', seed: 277, video: './assets/flowers/videos/19-pink-rose.mp4', description: '粉色层叠花瓣从花心展开。' },
  { key: 'pink-peony', name: '粉色牡丹', latin: 'Paeonia lactiflora', short: 'Pink peony', seed: 293, video: './assets/flowers/videos/20-pink-peony.mp4', description: '层叠柔粉花瓣向外舒展。' },
  { key: 'plum', name: '梅花', latin: 'Prunus mume', short: 'Plum blossom', seed: 307, video: './assets/flowers/videos/21-plum.mp4', description: '五瓣花面轻盈展开。' },
  { key: 'haitang', name: '海棠花', latin: 'Malus spectabilis', short: 'Chinese crabapple', seed: 313, video: './assets/flowers/videos/22-haitang.mp4', description: '圆润花瓣从花苞打开。' },
];

const FALLBACK_PALETTE = ['#f4b4c0', '#e48b9d', '#c9687d', '#fff1e8'];
const FALLBACK_RINGS = [{ count: 7, radial: 70, length: 160, width: 96, lift: 8, offset: 0.16 }];
FLOWERS.forEach((flower) => { flower.palette = FALLBACK_PALETTE; flower.rings = FALLBACK_RINGS; });

const SCIENCE_BY_KEY = {
  "haitang": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看萼片",
      "title": "萼片还护着花瓣",
      "body": "海棠花（Malus spectabilis）是蔷薇科苹果属的观赏乔木。花未开时，三角卵形的萼片先把花瓣包紧，像一层薄甲，帮里面娇嫩的组织挡风、挡雨、挡夜霜。\n\n蕾里先透出粉红色，外面看着还收着。华北一带常见花期在 4–5 月；再往南，有时会提早一点。\n\n易错点：公园里喊「海棠」的，常常是西府海棠、垂丝海棠，甚至贴梗海棠（其实属木瓜属）。本页按《中国植物志》的「海棠花」来讲。",
      "deepHref": "https://www.iplant.cn/z/frps/26307",
      "deepLabel": "深入了解 · 《中国植物志》海棠花"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "萼片松开，粉白瓣尖探头",
      "body": "捏合稍稍松开，萼片向外翻，花苞裂出一条缝。粉白的瓣尖先冒出来——这正是海棠花「蕾中粉红、开后转白」的过渡。\n\n近伞形花序一般有 4–6 朵，簇在小枝顶端。单朵花径大约 4–5 厘米。习性上它喜光、怕长期积水；地栽想养好，排水比猛施肥更要紧。",
      "deepHref": "https://www.iplant.cn/z/frps/26307",
      "deepLabel": "深入了解 · 《中国植物志》海棠花"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花瓣",
      "title": "五片花瓣，从中心向外推开",
      "body": "海棠花通常五片花瓣，卵形，基部有短爪。半开时瓣片一层层外推，把花心让出来；颜色也从蕾里的粉，渐渐褪向近白或浅粉白。\n\n同属里很出名的西府海棠（Malus × micromalus）树姿更直立、花更密，果偏小偏红，民间常和海棠花一起叫「海棠」。分辨时多看叶缘锯齿、果萼是否宿存、果色偏黄还是偏红。\n\n园艺上还有重瓣粉、重瓣白等变种。看见「花瓣很多、鼓成一团」的，多半是栽培品种。",
      "deepHref": "https://www.iplant.cn/z/frps/26307",
      "deepLabel": "深入了解 · 《中国植物志》海棠花"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看花蕊与传粉",
      "title": "花药立起，等昆虫来访",
      "body": "盛放后，雄蕊大约 20–25 枚，花丝长短不齐；花柱通常 5 枚（偶尔 4），基部有白绒毛，比雄蕊略长一点。金黄的花药露在花心，就是传粉的「工位」。\n\n海棠主要靠虫媒：蜜蜂、蝇类等蹭过花药，再把花粉带到柱头。果期多在 8–9 月。海棠花的果近球形、偏黄，萼片宿存；西府海棠果更小更红。看见秋果，也能反过来核对春天开的是哪一种。",
      "deepHref": "https://www.iplant.cn/z/frps/26307",
      "deepLabel": "深入了解 · 《中国植物志》海棠花"
    }
  ],
  "marigold": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看总苞",
      "title": "头状花序还收在杯状总苞里",
      "body": "花未开时，一层连合成杯状的总苞先把小花包住。\n\n本页学名按万寿菊（Tagetes erecta，菊科万寿菊属）。它是一年生草本，原产墨西哥，我国各地常见栽培；广东、云南南部等处有归化记录。\n\n易错点：中文名「金盏花」在园艺口语里有时指欧洲金盏花（Calendula officinalis，金盏花属），两者不是同一种。本页画面与拉丁名对应的是万寿菊。\n\n叶羽状分裂，叶缘常有油腺，揉叶有特殊气味。",
      "deepHref": "https://www.iplant.cn/z/frps/45025",
      "deepLabel": "深入了解 · 《中国植物志》万寿菊"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "舌状花开始探出总苞",
      "body": "捏合稍松，黄色或暗橙色的舌状花从总苞口露出来。头状花序单生枝端，花序梗顶部常呈棍棒状膨大——这是万寿菊的一个辨认点。\n\n花期多在 7–9 月。喜光、耐粗放，适合花坛成片栽植；积水过久茎基部易出问题，排水仍然重要。",
      "deepHref": "https://www.iplant.cn/z/frps/45025",
      "deepLabel": "深入了解 · 《中国植物志》万寿菊"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看舌状花",
      "title": "外围一圈「花瓣」其实是小花",
      "body": "头状花序不是一朵花：外围一层舌状花负责「好看」，中央管状花负责结实。半开时舌片陆续展开，花径大约 5–8 厘米。\n\n园艺品种颜色从金黄到橙红都有，重瓣类型舌状花层数更多。对照时留意总苞是否连合成杯、有没有半透明油点。",
      "deepHref": "https://www.iplant.cn/z/frps/45025",
      "deepLabel": "深入了解 · 《中国植物志》万寿菊"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看管状花",
      "title": "中央管状花露出，瘦果将成熟",
      "body": "盛放后中央管状花清晰可见，顶端五裂。传粉多依赖昆虫。瘦果线形，常带冠毛状鳞片或芒。\n\n万寿菊也常作伴栽、驱虫景观植物；精油与色素用途因品种与加工而异。课堂观察重点：总苞结构、舌状花与管状花的分工。",
      "deepHref": "https://www.iplant.cn/z/frps/45025",
      "deepLabel": "深入了解 · 《中国植物志》万寿菊"
    }
  ],
  "white-rose": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看萼片",
      "title": "五枚萼片把花瓣裹成卵形蕾",
      "body": "白玫瑰属于蔷薇属（Rosa）的栽培类型。蔷薇属种类与品种极多，杂交系谱复杂；本页按「白色栽培玫瑰」做形态观察，不把画面钉死到某一个野生种。\n\n花苞阶段，萼片常伸出尖头，把层层花瓣包紧。蔷薇科花的典型数是五（或五的倍数），重瓣品种是雄蕊瓣化的结果。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "外轮花瓣先松开",
      "body": "初开时最外层花瓣先外翻，露出里面更白的瓣面。许多切花月季在这一阶段最适合观赏：花型紧、不易散瓣。\n\n栽培上喜光、喜通风；闷湿环境易滋生白粉病等。浇水宜见干见湿，叶面长期潮湿不利于健康。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花瓣层",
      "title": "重瓣结构一层层展开",
      "body": "半开时可以看到：外轮瓣较平展，内轮仍抱心。真正的「玫瑰香」因品种而异，有的偏茶香、有的几乎无味。\n\n与「蔷薇」「月季」的民间叫法常混用。植物学上它们都在蔷薇属；园艺分类更看花型、花期与亲本系。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看花心",
      "title": "雄蕊或花心完全露出",
      "body": "单瓣或半重瓣类型盛放后，金黄花药围着柱头，便于虫媒传粉；高度重瓣类型雄蕊可能几乎瓣化，结实能力下降。\n\n蔷薇属果实称蔷薇果（假果），秋冬变红或橙，富含维生素 C 的种类可做果酱——是否结实要看品种与授粉条件。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    }
  ],
  "balloon-flower": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看「气球」",
      "title": "花蕾鼓成气球状，故名桔梗",
      "body": "桔梗（Platycodon grandiflorus）是桔梗科桔梗属唯一常见栽培种，多年生草本。英文名 balloon flower 正来自花蕾鼓胀如气球的形态。\n\n根可入药，传统功效多描述为止咳祛痰、利咽排脓；亦可腌制食用。分布横跨东北至西南多个省区，以及日本、朝鲜半岛与俄罗斯远东。",
      "deepHref": "https://www.iplant.cn/info/Platycodon%20grandiflorus",
      "deepLabel": "深入了解 · 植物智桔梗"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "气球裂开，露出宽钟状花冠",
      "body": "初开时花蕾顶端裂开，蓝紫色（偶见白、粉栽培型）花冠展开成宽钟状。花单朵顶生，或数朵排成顶生聚伞花序。\n\n花期多在 7–9 月。喜阳光充足、排水良好的环境；黏重积水地块不利于宿根越冬。",
      "deepHref": "https://www.iplant.cn/info/Platycodon%20grandiflorus",
      "deepLabel": "深入了解 · 植物智桔梗"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花冠裂片",
      "title": "五裂花冠向外翻展",
      "body": "花冠宽钟状，裂片三角形。半开时裂片逐渐外翻，可以看到内部的雄蕊与花柱。花丝基部扩大成片状，边缘常有流苏状结构——这是细看时的趣味点。\n\n柱头通常五裂。蒴果成熟后自顶端开裂。",
      "deepHref": "https://www.iplant.cn/info/Platycodon%20grandiflorus",
      "deepLabel": "深入了解 · 植物智桔梗"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看传粉与用途",
      "title": "花心大开，等昆虫来访",
      "body": "盛放后花心完全暴露，主要靠昆虫传粉。果期约 8–10 月。\n\n除观赏外，桔梗是东北等地著名的药食两用植物。课堂观察重点：花蕾的气球感、钟状花冠、以及根部入药的文化背景——形态与用途可以一起记。",
      "deepHref": "https://www.iplant.cn/info/Platycodon%20grandiflorus",
      "deepLabel": "深入了解 · 植物智桔梗"
    }
  ],
  "poppy": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看苞片",
      "title": "两枚苞片把花蕾包得圆鼓",
      "body": "虞美人（Papaver rhoeas）是罂粟科罂粟属一年生草本，原产欧洲与西亚一带，我国常见栽培观赏。花蕾下垂或略垂，外面常有两枚苞片保护。\n\n与鸦片罂粟（Papaver somniferum）同属不同种：虞美人以观赏为主，花色鲜红、粉、白等，花瓣极薄。",
      "deepHref": "https://www.iplant.cn/info/Papaver%20rhoeas",
      "deepLabel": "深入了解 · 植物智虞美人"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "苞片脱落，纸质花瓣弹出",
      "body": "初开时常是「啪」地一下：苞片裂开脱落，皱缩的花瓣迅速展开。花瓣薄如纸，边缘常有褶皱，风一吹就轻颤。\n\n花期偏春末夏初（因地区而异）。自播能力强，花坛中常成片出现。",
      "deepHref": "https://www.iplant.cn/info/Papaver%20rhoeas",
      "deepLabel": "深入了解 · 植物智虞美人"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花瓣与斑",
      "title": "四片花瓣围出碗状花冠",
      "body": "典型结构是四片花瓣。半开时花瓣仍带褶皱，基部常有深色斑块（因品种而异）。雄蕊多数，围绕中心的子房。\n\n罂粟属花丝、花药形态是分种线索之一；观赏栽培时先记「四瓣、薄瓣、易落」。",
      "deepHref": "https://www.iplant.cn/info/Papaver%20rhoeas",
      "deepLabel": "深入了解 · 植物智虞美人"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看蒴果",
      "title": "花瓣易落，留下胡椒瓶似的蒴果",
      "body": "盛放短暂，花瓣很快脱落，留下壶状蒴果：成熟后顶端孔裂，种子像胡椒瓶一样洒出——这是风播与自播的设计。\n\n传粉主要靠昆虫。观察时抓住「薄瓣易落」和「蒴果孔裂」两点，就比只记颜色更有科学感。",
      "deepHref": "https://www.iplant.cn/info/Papaver%20rhoeas",
      "deepLabel": "深入了解 · 植物智虞美人"
    }
  ],
  "hydrangea": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看花序",
      "title": "球形花序里多数是不育花",
      "body": "园艺上看到的「花球」，多半由大型不育花的萼片组成；真正能结实的孕性花往往藏在内侧，数量较少。\n\n绣球（Hydrangea macrophylla）是虎耳草科绣球属灌木，高约 1–4 米。\n\n花期大致 6–8 月。原变种在华东、华南至西南多省有野生或栽培记录。",
      "deepHref": "https://www.iplant.cn/z/frps/20123",
      "deepLabel": "深入了解 · 《中国植物志》绣球"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "不育花萼片开始展开染色",
      "body": "初开时外围不育花的萼片展开，颜色常为粉、蓝或白。土壤酸碱度会影响部分品种的花色（偏酸偏蓝、偏碱偏粉是常见园艺经验），但具体反应因品种而异。\n\n喜半荫与湿润、排水良好的腐殖质土；烈日暴晒叶片易焦边。",
      "deepHref": "https://www.iplant.cn/z/frps/20123",
      "deepLabel": "深入了解 · 《中国植物志》绣球"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看不育花",
      "title": "萼片像花瓣，其实是变态萼",
      "body": "半开时花球逐渐圆满。不育花通常有 4 枚阔卵形至近圆形萼片，负责招蜂引蝶的「广告牌」；孕性花较小，有花瓣与雄蕊。\n\n把进度停在半开，最容易看清「花不是花瓣」这个反常识点。",
      "deepHref": "https://www.iplant.cn/z/frps/20123",
      "deepLabel": "深入了解 · 《中国植物志》绣球"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看孕性花",
      "title": "拨开外侧，才见真正的结实花",
      "body": "盛放后花序直径可达约 8–20 厘米。轻轻拨开外侧不育花，有时能看到中央少量孕性花。蒴果陀螺状，种子细小。\n\n叶片与花含多种酚苷类成分；民间有药用记载，但观赏栽培请勿自行药用。观察重点：不育花与孕性花的分工。",
      "deepHref": "https://www.iplant.cn/z/frps/20123",
      "deepLabel": "深入了解 · 《中国植物志》绣球"
    }
  ],
  "hibiscus": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看副萼",
      "title": "副萼与萼片一起护住花蕾",
      "body": "扶桑（朱槿，Hibiscus rosa-sinensis）是锦葵科木槿属常绿灌木，俗名还有大红花、佛桑等。热带亚热带庭园极常见，花期几乎全年（温暖地区）。\n\n花蕾外包萼片，外侧常有副萼。叶阔卵形至狭卵形，缘有齿。",
      "deepHref": "https://www.iplant.cn/info/Hibiscus%20rosa-sinensis",
      "deepLabel": "深入了解 · 植物智朱槿"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "漏斗形花冠开始张开",
      "body": "初开时花冠呈漏斗形，直径常约 6–10 厘米，颜色以玫瑰红、淡红、黄等园艺色为多。花通常单生叶腋，有的品种略下垂。\n\n喜高温强光；怕霜冻。北方多作盆栽，冬季需移入室内保温。",
      "deepHref": "https://www.iplant.cn/info/Hibiscus%20rosa-sinensis",
      "deepLabel": "深入了解 · 植物智朱槿"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花柱",
      "title": "雄蕊筒与花柱成「芯」",
      "body": "锦葵科的标志结构：花丝连合成雄蕊筒，包围花柱。半开时这根「芯」非常醒目，柱头常五裂。\n\n重瓣品种雄蕊瓣化更明显，花型更鼓。单瓣类型更易看清虫媒传粉的路径。",
      "deepHref": "https://www.iplant.cn/info/Hibiscus%20rosa-sinensis",
      "deepLabel": "深入了解 · 植物智朱槿"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看一日花",
      "title": "单朵花寿命短，靠连续开放维持景观",
      "body": "许多朱槿单朵花只开一天左右，但植株能不断抽蕾，所以整体花期很长。传粉依赖昆虫；栽培上及时摘残花有助观感。\n\n它是热带园林的标志花卉之一。观察时抓住「副萼 + 雄蕊筒」两点，就能和蔷薇科大花区分开。",
      "deepHref": "https://www.iplant.cn/info/Hibiscus%20rosa-sinensis",
      "deepLabel": "深入了解 · 植物智朱槿"
    }
  ],
  "camellia": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看苞被",
      "title": "多层苞片与萼片组成杯状苞被",
      "body": "山茶（Camellia japonica）是山茶科山茶属灌木或小乔木。花顶生，苞片与萼片约 10 片，组成杯状苞被，把花瓣护在里面。\n\n花期偏冬春（约 1–4 月），是少有的耐寒常绿观赏花木。四川、台湾、山东、江西等地有野生记录，全国广泛栽培，品种极多。",
      "deepHref": "https://www.iplant.cn/z/frps/38897",
      "deepLabel": "深入了解 · 《中国植物志》山茶"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "红色或粉色瓣片从苞被中推出",
      "body": "初开时外轮花瓣先露头。原种记载花瓣约 6–7 片，园艺重瓣可远多于此。颜色以红、淡红为主，也有白花类型。\n\n喜半荫、喜酸性和排水良好的土壤；积水易烂根，北方冬季注意防寒风。",
      "deepHref": "https://www.iplant.cn/z/frps/38897",
      "deepLabel": "深入了解 · 《中国植物志》山茶"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花瓣与雄蕊",
      "title": "层叠花瓣围出圆形花面",
      "body": "半开时花型最完整：重瓣品种层层叠叠，单瓣/半重瓣则能看见雄蕊。雄蕊多轮，外轮花丝基部常连生。\n\n山茶与茶（Camellia sinensis）同属：一个偏观赏，一个偏叶片利用。叶子都革质有锯齿，但用途完全不同。",
      "deepHref": "https://www.iplant.cn/z/frps/38897",
      "deepLabel": "深入了解 · 《中国植物志》山茶"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看果实与用途",
      "title": "蒴果圆球形，种子可榨油",
      "body": "盛放后传粉、结实；蒴果圆球形，木质果爿开裂。花有止血等传统药用记载；种子可榨工业用油。\n\n观赏价值主要在冬春花期与常绿叶色。观察重点：杯状苞被、革质叶、以及与茶树同属的关系。",
      "deepHref": "https://www.iplant.cn/z/frps/38897",
      "deepLabel": "深入了解 · 《中国植物志》山茶"
    }
  ],
  "hyacinth": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看花穗",
      "title": "鳞茎抽出的花序还包在鞘状叶里",
      "body": "风信子（Hyacinthus orientalis）是天门冬科（原归百合科）风信子属的鳞茎植物，原产地中海东部，世界广泛栽培。花序总状，小花密生成穗。\n\n花苞阶段，整个花穗常被叶鞘或苞片保护，颜色尚未完全显现。",
      "deepHref": "https://www.iplant.cn/info/Hyacinthus%20orientalis",
      "deepLabel": "深入了解 · 植物智风信子"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "下部小花先开，香味开始释放",
      "body": "初开时常从花穗下部的小花开始张开，向上推进。花色有蓝、紫、粉、白、黄等园艺色。以浓香著称，是春季球根花卉的代表。\n\n栽培需经历适度低温才能顺利抽薹开花（促成栽培另当别论）。",
      "deepHref": "https://www.iplant.cn/info/Hyacinthus%20orientalis",
      "deepLabel": "深入了解 · 植物智风信子"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看小花结构",
      "title": "钟状花被六裂，反卷如星",
      "body": "单朵小花的花被合生，先端六裂，裂片常向外反卷。半开的花穗最香、也最适合近距离观察「穗状排列」。\n\n叶基生、带状，与花葶同时抽出。浇水避免鳞茎顶部长期积水。",
      "deepHref": "https://www.iplant.cn/info/Hyacinthus%20orientalis",
      "deepLabel": "深入了解 · 植物智风信子"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看传粉与养护",
      "title": "整穗盛放，虫媒与观赏兼得",
      "body": "盛放后整穗小花开放，吸引蜂类等传粉者。花后进入养鳞茎阶段：保留叶片制造养分，待叶黄再休眠。\n\n注意：鳞茎含刺激性成分，处理时建议戴手套，勿误食。观察重点：总状花序与六裂花被。",
      "deepHref": "https://www.iplant.cn/info/Hyacinthus%20orientalis",
      "deepLabel": "深入了解 · 植物智风信子"
    }
  ],
  "iris": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看佛焰苞",
      "title": "绿色苞片把花蕾夹在中间",
      "body": "本页按德国鸢尾（Iris germanica）一类园艺鸢尾来观察。鸢尾属种类极多，有根状茎与球茎两大类；德国鸢尾是常见的有髯鸢尾，园艺品种丰富。\n\n花蕾包在佛焰苞状的苞片中，抽出后方显颜色。",
      "deepHref": "https://www.iplant.cn/info/Iris%20germanica",
      "deepLabel": "深入了解 · 植物智德国鸢尾"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "垂瓣先翻下，旗瓣后竖起",
      "body": "初开时外轮三枚「垂瓣」下翻，内轮三枚「旗瓣」竖立——六枚花被分成两轮，是鸢尾的经典造型。有髯鸢尾的垂瓣中央常有毛状附属物（髯毛）。\n\n喜阳光与排水良好的土壤；根状茎宜浅栽，忌长期积水。",
      "deepHref": "https://www.iplant.cn/info/Iris%20germanica",
      "deepLabel": "深入了解 · 植物智德国鸢尾"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看三数结构",
      "title": "花被、雄蕊都按三的节奏",
      "body": "半开时结构最清楚：花被两轮各三枚，雄蕊三枚，子房下位。柱头瓣化成花瓣状，盖在花药上方，引导昆虫先擦到柱头再碰到花粉——一种精巧的虫媒装置。\n\n花色从紫、蓝到黄、白、复色都有。",
      "deepHref": "https://www.iplant.cn/info/Iris%20germanica",
      "deepLabel": "深入了解 · 植物智德国鸢尾"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看传粉路径",
      "title": "昆虫钻入「跑道」完成授粉",
      "body": "盛放后，昆虫沿着垂瓣上的须毛或色斑（蜜导）钻向花心，背或头会依次接触柱头与花药。单朵花寿命不长，但花茎上可陆续开放。\n\n鸢尾属在中国野生资源丰富，但「德国鸢尾」主要是园林栽培系统。观察重点：旗瓣/垂瓣与柱头瓣化。",
      "deepHref": "https://www.iplant.cn/info/Iris%20germanica",
      "deepLabel": "深入了解 · 植物智德国鸢尾"
    }
  ],
  "lavender": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看花穗",
      "title": "轮伞花序在枝顶聚成穗",
      "body": "薰衣草（Lavandula angustifolia）是唇形科薰衣草属半灌木，原产地中海地区，我国广泛引种。叶线形，被星状绒毛，干后常呈灰绿或灰白。\n\n花苞阶段，蓝紫色小花还收在穗状排列的轮伞花序里。",
      "deepHref": "https://www.iplant.cn/z/frps/13625",
      "deepLabel": "深入了解 · 《中国植物志》薰衣草"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "下部轮伞先开，香气渐浓",
      "body": "初开时常从花穗下部的轮伞开始。花冠二唇形，长约为花萼的两倍。《中国植物志》记载花期约在 6 月（产地中海习性；我国栽培区随气候略有前后）。\n\n喜光、耐旱、怕涝；黏重积水地块易烂根。",
      "deepHref": "https://www.iplant.cn/z/frps/13625",
      "deepLabel": "深入了解 · 《中国植物志》薰衣草"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看唇形花",
      "title": "上唇两裂、下唇三裂",
      "body": "半开时能看清唇形花冠：上唇直伸两裂，下唇开展三裂。雄蕊四枚，不伸出花冠。揉花或晒干后香气更明显。\n\n精油是重要香料原料，鲜花/干花含油率不同，主要成分包括乙酸芳樟酯等（具体比例因产地与加工而异）。",
      "deepHref": "https://www.iplant.cn/z/frps/13625",
      "deepLabel": "深入了解 · 《中国植物志》薰衣草"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看用途",
      "title": "芳香油与观赏兼得",
      "body": "盛放的花穗是收割精油的常用时期。除香料外，也广泛用于庭园花境与干花。果实为小坚果。\n\n观察重点：唇形花、轮伞花序、灰白绒毛叶——这三点基本能把它和常见菊科紫花区分开。",
      "deepHref": "https://www.iplant.cn/z/frps/13625",
      "deepLabel": "深入了解 · 《中国植物志》薰衣草"
    }
  ],
  "dahlia": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看总苞",
      "title": "多层总苞护着头状花序",
      "body": "大丽花（Dahlia pinnata）是菊科大丽花属多年生草本，有巨大棒状块根，原产墨西哥，全球栽培品种极多。茎直立粗壮，叶一至三回羽状全裂。\n\n花苞阶段，头状花序被多层总苞包裹：外层偏叶质，内层偏膜质。",
      "deepHref": "https://www.iplant.cn/z/frps/44676",
      "deepLabel": "深入了解 · 《中国植物志》大丽花"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "舌状花开始外展",
      "body": "初开时外围舌状花展开，颜色白、红、紫等皆有。花序常较大，有长梗，有时略下垂。花期长，约 6–12 月（因地区与栽培而异）。\n\n喜凉爽气候与充足阳光；块根需防冻贮。",
      "deepHref": "https://www.iplant.cn/z/frps/44676",
      "deepLabel": "深入了解 · 《中国植物志》大丽花"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花型分类",
      "title": "从单瓣到球型，都是小花的排列变化",
      "body": "半开时最易分辨园艺类型：单瓣、细瓣、菊花状、牡丹花状、球状等。本质仍是舌状花与管状花的组合；有的品种几乎全为舌状花。\n\n把进度停在半开，对照瓣形与层数，比只看颜色更有收获。",
      "deepHref": "https://www.iplant.cn/z/frps/44676",
      "deepLabel": "深入了解 · 《中国植物志》大丽花"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看块根与用途",
      "title": "花谢后养分回到块根",
      "body": "盛放后中央管状花（若存在）负责结实；瘦果长圆形、扁平。根内含菊糖，文献记载医药上可有类似葡萄糖的用途讨论。\n\n观赏上适合花坛与切花。观察重点：块根习性、头状花序与总苞分层。",
      "deepHref": "https://www.iplant.cn/z/frps/44676",
      "deepLabel": "深入了解 · 《中国植物志》大丽花"
    }
  ],
  "pansy": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看两侧对称",
      "title": "花蕾已显「花脸」轮廓",
      "body": "三色堇（Viola tricolor）是堇菜科堇菜属草本，欧洲原产，园艺上常作二年生花卉栽培。花两侧对称，五瓣，常有黄、紫、白等复色，形似小脸，故名。\n\n花苞阶段就能看出上下瓣大小不等的趋势。",
      "deepHref": "https://www.iplant.cn/info/Viola%20tricolor",
      "deepLabel": "深入了解 · 植物智三色堇"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "下瓣先展，露出色斑与须线",
      "body": "初开时下瓣与侧瓣展开，常有深色斑块与放射状须线——这些是蜜导，指引昆虫走向距（花距里有蜜）。\n\n喜凉爽，忌酷暑；长江流域多作冬春花坛，夏季常枯萎或需遮荫。",
      "deepHref": "https://www.iplant.cn/info/Viola%20tricolor",
      "deepLabel": "深入了解 · 植物智三色堇"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看距",
      "title": "后方的距是藏蜜的口袋",
      "body": "半开时从侧面能看到花距。雄蕊的药隔常有附属物，与传粉机制相关。园艺大花三色堇（有时写作 Viola × wittrockiana）多由近缘种杂交选育，花更大、色块更夸张。\n\n本页拉丁名按 V. tricolor；大花品种可理解为同属园艺复合体。",
      "deepHref": "https://www.iplant.cn/info/Viola%20tricolor",
      "deepLabel": "深入了解 · 植物智三色堇"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看虫媒",
      "title": "蜂类顺着须线钻入",
      "body": "盛放后昆虫循着色斑与须线进入，完成传粉。蒴果成熟三裂。\n\n观察重点：两侧对称、花距、蜜导斑纹——这是认识堇菜科的一把钥匙。",
      "deepHref": "https://www.iplant.cn/info/Viola%20tricolor",
      "deepLabel": "深入了解 · 植物智三色堇"
    }
  ],
  "pink-lotus": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看出水",
      "title": "花蕾伸出水面，尖卵形",
      "body": "莲（Nelumbo nucifera，睡莲科莲属）是多年生水生草本。根状茎横走肥厚（藕），叶盾状圆形；花梗与叶柄常散生小刺。\n\n花蕾出水前尖卵形，颜色粉、红或白。花期约 6–8 月，果期 8–10 月。我国南北均可自生或栽培。",
      "deepHref": "https://www.iplant.cn/z/frps/13324",
      "deepLabel": "深入了解 · 《中国植物志》莲"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "外轮花瓣松开，香气浮动",
      "body": "初开时外轮花瓣展开，花径可达约 10–20 厘米，常有香气。花瓣矩圆状椭圆形至倒卵形，由外向内渐小。\n\n喜强光浅水；水深与施肥影响开花。与睡莲不同：莲叶与花高出水面，睡莲叶多浮水。",
      "deepHref": "https://www.iplant.cn/z/frps/13324",
      "deepLabel": "深入了解 · 《中国植物志》莲"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花托",
      "title": "中央的莲房开始显形",
      "body": "半开时可以看到膨大的花托（莲房）与大量雄蕊。花瓣有时会瓣化成雄蕊状，或反之。花粉多，吸引甲虫与蜂类等。\n\n叶面有白粉、不沾水，是超疏水结构的经典例子。",
      "deepHref": "https://www.iplant.cn/z/frps/13324",
      "deepLabel": "深入了解 · 《中国植物志》莲"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看用途",
      "title": "藕、莲子、荷叶各有其用",
      "body": "盛放后进入结实：坚果藏在莲房里，成熟变黑褐色；种子即莲子。藕作蔬菜或制藕粉；叶、梗、房、须、子等均有传统药用与食用记载。\n\n文化上荷花象征高洁。观察重点：出水叶花、盾状叶、莲房结构。",
      "deepHref": "https://www.iplant.cn/z/frps/13324",
      "deepLabel": "深入了解 · 《中国植物志》莲"
    }
  ],
  "cherry-blossom": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看总苞",
      "title": "伞形花序外有总苞片保护",
      "body": "本页对应樱属山樱花类（Cerasus serrulata，旧常写 Prunus serrulata）。乔木，花序伞房总状或近伞形，有花数朵；总苞片在花芽阶段保护花蕾。\n\n花期约 4–5 月（因地区与品种而异）。园艺上常见的日本晚樱等是变种或栽培系。",
      "deepHref": "https://www.iplant.cn/z/frps/19258",
      "deepLabel": "深入了解 · 《中国植物志》山樱花"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "淡粉或白色五瓣展开",
      "body": "初开时花瓣白色至粉红色，先端常微凹。萼筒管状，萼片三角披针形。叶缘有单锯齿或重锯齿，齿尖有时具腺体。\n\n喜光，要求排水良好；忌低洼积水。",
      "deepHref": "https://www.iplant.cn/z/frps/19258",
      "deepLabel": "深入了解 · 《中国植物志》山樱花"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看雄蕊",
      "title": "雄蕊多数，花丝细长",
      "body": "半开时约数十枚雄蕊围着花柱，花丝纤细。单瓣类型结构清楚；重瓣樱花则雄蕊瓣化，花期往往更长、结实更少。\n\n与梅花相比：樱花常成伞形簇生、花梗明显；梅花多近无梗或梗极短、花香更典型。",
      "deepHref": "https://www.iplant.cn/z/frps/19258",
      "deepLabel": "深入了解 · 《中国植物志》山樱花"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看果与文化",
      "title": "核果紫黑，花期短暂",
      "body": "盛放后很快进入落花。核果球形或卵球形，熟时紫黑色。樱花文化以赏花为主，果一般不做大宗鲜食（与甜樱桃栽培种不同）。\n\n观察重点：花序总梗/花梗、锯齿叶、以及与梅的区别。",
      "deepHref": "https://www.iplant.cn/z/frps/19258",
      "deepLabel": "深入了解 · 《中国植物志》山樱花"
    }
  ],
  "chrysanthemum": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看总苞",
      "title": "多层总苞片覆瓦状排列",
      "body": "菊花在植物志系统中常归菊属 Chrysanthemum（栽培菊花多指 Chrysanthemum × morifolium 等园艺复合体）。头状花序外包多层总苞片，像瓦片一样叠着。\n\n本页拉丁名写到属一级，因观赏菊品种系复杂，不宜把画面钉死到单一野生种。",
      "deepHref": "https://www.iplant.cn/info/Chrysanthemum",
      "deepLabel": "深入了解 · 植物智菊属"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "舌状花向外展开",
      "body": "初开时外围舌状花伸展，中央管状花仍较密。花色、瓣型因品种差异极大：平瓣、勺瓣、管瓣、桂瓣等。\n\n传统花期偏秋；现代设施栽培可四季见花。喜凉爽，忌烈日暴晒与积水。",
      "deepHref": "https://www.iplant.cn/info/Chrysanthemum",
      "deepLabel": "深入了解 · 植物智菊属"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看头状花序",
      "title": "「一朵菊」其实是一群小花",
      "body": "半开时最适合理解头状花序：舌状花负责外观，管状花负责结实。中国菊花栽培历史悠久，品种分类体系细致。\n\n文化上菊与梅兰竹并称；重阳赏菊是常见民俗。",
      "deepHref": "https://www.iplant.cn/info/Chrysanthemum",
      "deepLabel": "深入了解 · 植物智菊属"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看用途",
      "title": "观赏、茶饮与切花",
      "body": "盛放后管状花开放，具备结实能力（许多观赏品种仍以营养繁殖为主）。杭白菊等可作茶用，具体种类与加工决定品质。\n\n观察重点：总苞覆瓦状排列、舌状花/管状花分工。",
      "deepHref": "https://www.iplant.cn/info/Chrysanthemum",
      "deepLabel": "深入了解 · 植物智菊属"
    }
  ],
  "sunflower": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看总苞",
      "title": "叶质总苞片包住巨大花盘",
      "body": "向日葵（Helianthus annuus）是菊科向日葵属一年生高大草本，原产北美，世界广为栽培。头状花序极大，直径约 10–30 厘米，常单生茎端。\n\n花苞阶段，多层叶质总苞片覆瓦状包住花盘。",
      "deepHref": "https://www.iplant.cn/z/frps/45024",
      "deepLabel": "深入了解 · 《中国植物志》向日葵"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "舌状花先亮相，花盘仍较紧",
      "body": "初开时外围黄色舌状花展开，中央管状花仍密集成盘。花盘在花蕾期会跟随太阳方向转动（向日性），盛开结实后转动减弱——这是常见科普点，细节随发育阶段变化。\n\n花期约 7–9 月。",
      "deepHref": "https://www.iplant.cn/z/frps/45024",
      "deepLabel": "深入了解 · 《中国植物志》向日葵"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看两种小花",
      "title": "边缘不结实，中央才结籽",
      "body": "舌状花通常不结实，管状花两性、结实。半开时从边缘向中心，管状花依次开放。瘦果即葵花籽，含油量高，供食用与榨油。\n\n茎叶被粗毛，叶心状卵形，有长柄。",
      "deepHref": "https://www.iplant.cn/z/frps/45024",
      "deepLabel": "深入了解 · 《中国植物志》向日葵"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看籽实",
      "title": "管状花谢后，花盘沉甸甸",
      "body": "盛放至结实，花盘渐重，常下倾。瘦果倒卵形，冠毛膜片状早落。花盘、籽壳、茎秆还可作饲料或工业原料。\n\n观察重点：头状花序分工、向日性、以及「一盘不是一朵花」。",
      "deepHref": "https://www.iplant.cn/z/frps/45024",
      "deepLabel": "深入了解 · 《中国植物志》向日葵"
    }
  ],
  "lily": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看鳞茎抽葶",
      "title": "花蕾直立或略垂，六枚花被紧贴",
      "body": "百合属（Lilium）是百合科具鳞茎的多年生草本，全球约数十种，中国种类丰富。花被六枚，两轮，常组成喇叭形、钟形或反卷形。\n\n本页拉丁名写到属，因观赏百合（亚洲系、东方系、麝香百合等）多为种间杂交。花苞阶段六枚花被片紧靠。",
      "deepHref": "https://www.iplant.cn/z/frps/5143",
      "deepLabel": "深入了解 · 《中国植物志》百合属"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "花被片外翻，露出花药",
      "body": "初开时花被片逐渐分离外展，花药丁字着生，花粉常橙红或褐黄，易沾衣——切花常会先去雄。\n\n喜凉爽通风；鳞茎忌积水腐烂。不同杂交系对光照与酸碱偏好略有差别。",
      "deepHref": "https://www.iplant.cn/z/frps/5143",
      "deepLabel": "深入了解 · 《中国植物志》百合属"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看蜜腺",
      "title": "花被片基部有蜜腺沟",
      "body": "半开时可见花被片基部的蜜腺，有的种类两侧有乳头状或流苏状突起。雄蕊六枚，花丝钻形；花柱细长，柱头三裂。\n\n许多种类花有香气，东方百合尤甚。",
      "deepHref": "https://www.iplant.cn/z/frps/5143",
      "deepLabel": "深入了解 · 《中国植物志》百合属"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看用途",
      "title": "观赏、食用鳞茎与药用传统",
      "body": "盛放后虫媒传粉。蒴果矩圆形室背开裂。部分种类鳞茎可食或入药；花可提取香料。具体食用/药用种类需核对，勿把所有观赏百合当菜。\n\n观察重点：六枚花被、丁字药、鳞茎习性。",
      "deepHref": "https://www.iplant.cn/z/frps/5143",
      "deepLabel": "深入了解 · 《中国植物志》百合属"
    }
  ],
  "tulip": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看鳞茎皮",
      "title": "杯形花蕾直立在花葶顶端",
      "body": "郁金香属（Tulipa）是百合科鳞茎植物。栽培郁金香（常为 Tulipa gesneriana 复合体）花大、单朵顶生，花被片六枚。\n\n本页拉丁名写到属。《中国植物志》记载我国有多种野生郁金香，主产新疆；园林常见的大花类型多为引种栽培。",
      "deepHref": "https://www.iplant.cn/z/frps/5142",
      "deepLabel": "深入了解 · 《中国植物志》郁金香属"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "杯状花被开始张开",
      "body": "初开时花被成杯状或漏斗状钟形，颜色极丰富。花药基着，雄蕊六枚。喜冬季寒冷、夏季干燥的气候节律；暖湿地区常作一年生栽培。\n\n花期多在春季。",
      "deepHref": "https://www.iplant.cn/z/frps/5142",
      "deepLabel": "深入了解 · 《中国植物志》郁金香属"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花被",
      "title": "内外轮花被片形状可略有差异",
      "body": "半开是赏花高峰：花形端正，尚未过度张开。有的品种外轮与内轮花被片颜色或斑纹不同。柱头三裂，子房三室。\n\n阴雨低温会延长花期；高温则加速谢花。",
      "deepHref": "https://www.iplant.cn/z/frps/5142",
      "deepLabel": "深入了解 · 《中国植物志》郁金香属"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看结实",
      "title": "花被落后留下蒴果",
      "body": "盛放末期花被片展开甚至外翻，随后脱落。蒴果室背开裂，种子扁平。栽培上花后及时摘果有助鳞茎膨大。\n\n观察重点：单朵顶生、六枚花被、鳞茎生活史。",
      "deepHref": "https://www.iplant.cn/z/frps/5142",
      "deepLabel": "深入了解 · 《中国植物志》郁金香属"
    }
  ],
  "pink-rose": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看萼片",
      "title": "粉色花蕾被萼片紧裹",
      "body": "粉玫瑰同属蔷薇属（Rosa）栽培类型。与白玫瑰页相同：品种系复杂，本页做形态观察，不锁定单一野生种。\n\n花苞呈卵形或坛状，萼片先端常延伸成须状裂片。粉色系在园艺上常被赋予柔和、浪漫的象征，但植物学特征仍看结构不看寓意。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "外轮粉瓣先翻开",
      "body": "初开时外轮花瓣展开，颜色常外深内浅或相反，因品种而异。切花月季在此阶段瓶插寿命较好。\n\n栽培要点与白玫瑰类似：充足光照、通风、避免叶面长时间潮湿。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看层叠",
      "title": "螺旋状花心逐渐松开",
      "body": "许多现代月季花心呈螺旋状排列。半开时层叠最明显，也是摄影常用角度。重瓣程度越高，雄蕊越少。\n\n可与白玫瑰对照：结构同源，色素表达不同。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看花心",
      "title": "花心展开，芳香因品种而异",
      "body": "盛放后花型最开张，部分品种露出花心与少量雄蕊。芳香物质组成复杂，有的浓香、有的几乎无香。\n\n若能结成蔷薇果，秋冬可观察假果颜色。课堂重点仍是「五基数与重瓣来源」。",
      "deepHref": "https://www.iplant.cn/info/Rosa",
      "deepLabel": "深入了解 · 植物智蔷薇属"
    }
  ],
  "pink-peony": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看苞片",
      "title": "数枚苞片护住硕大花蕾",
      "body": "本页学名按芍药（Paeonia lactiflora，毛茛科芍药属）——多年生草本，根粗壮。显示名写「粉色牡丹」，但牡丹通常指木本的 Paeonia suffruticosa。二者同属，习性不同：芍药草本，牡丹灌木。\n\n花蕾外包苞片与萼片。花期约 5–6 月。",
      "deepHref": "https://www.iplant.cn/z/frps/23792",
      "deepLabel": "深入了解 · 《中国植物志》芍药"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "粉瓣外展，花径可达碗口",
      "body": "初开时花瓣展开，直径常约 8–12 厘米。原种记载花瓣约 9–13 片、白色居多；栽培者颜色丰富，重瓣极常见。\n\n喜凉爽、排水良好的土壤；忌夏季湿热积水。",
      "deepHref": "https://www.iplant.cn/z/frps/23792",
      "deepLabel": "深入了解 · 《中国植物志》芍药"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看花盘",
      "title": "花盘浅杯状，只包住心皮基部",
      "body": "半开时可见雄蕊多数、花丝黄色；花盘浅杯状，仅包裹心皮基部——这是与牡丹的重要区别：牡丹花盘革质，几乎完全包住心皮。\n\n若画面偏木本、枝干明显，更接近牡丹；草本丛生则更接近芍药。",
      "deepHref": "https://www.iplant.cn/z/frps/23792",
      "deepLabel": "深入了解 · 《中国植物志》芍药"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看药用传统",
      "title": "根称白芍，花供观赏",
      "body": "盛放后虫媒传粉；蓇葖果顶端具喙。根药用称「白芍」，传统描述多与镇痛、养血等有关——具体用药须遵医嘱。\n\n延伸阅读可对照牡丹条目（丹皮）。观察重点：草本 vs 灌木、花盘包被程度。",
      "deepHref": "https://www.iplant.cn/z/frps/23792",
      "deepLabel": "深入了解 · 《中国植物志》芍药"
    }
  ],
  "plum": [
    {
      "max": 0.28,
      "eyebrow": "花苞阶段 · 看芽",
      "title": "花芽饱满，往往先花后叶",
      "body": "梅（Armeniaca mume，蔷薇科；也常写 Prunus mume）是我国著名早春花木。花多在叶前开放，故有「干枝梅」等别称。\n\n花苞阶段，萼片常带绛紫，花瓣尚未展。品种有直枝、垂枝、龙游等姿态。",
      "deepHref": "https://www.iplant.cn/z/frps/6746",
      "deepLabel": "深入了解 · 《中国植物志》梅"
    },
    {
      "max": 0.62,
      "eyebrow": "初开阶段",
      "title": "五瓣展开，清香浮动",
      "body": "初开时五枚花瓣展开，白、粉、红等色皆有，重瓣品种常见。花梗极短或近无，花贴着枝干开——这是与樱花最直观的区别之一。\n\n喜冬季有一定低温；暖冬地区有时花期紊乱。",
      "deepHref": "https://www.iplant.cn/z/frps/6746",
      "deepLabel": "深入了解 · 《中国植物志》梅"
    },
    {
      "max": 0.9,
      "eyebrow": "半开阶段 · 看雄蕊",
      "title": "雄蕊多数，花丝细长放射",
      "body": "半开时金黄或淡色花丝呈放射状，极具辨识度。萼筒钟状。叶后出，缘有细锯齿。\n\n文化上梅象征坚韧；「梅兰竹菊」四君子其一。果可制乌梅、青梅等，但观赏品种结实性不一。",
      "deepHref": "https://www.iplant.cn/z/frps/6746",
      "deepLabel": "深入了解 · 《中国植物志》梅"
    },
    {
      "max": 1.01,
      "eyebrow": "盛放阶段 · 看果与分类",
      "title": "核果成熟前先赏花",
      "body": "盛放后进入展叶与幼果阶段。植物志系统中梅归杏属 Armeniaca；许多资料仍用 Prunus mume，同指一物。\n\n观察重点：先花后叶、近无梗、萼片色泽，以及与樱、桃的对比。",
      "deepHref": "https://www.iplant.cn/z/frps/6746",
      "deepLabel": "深入了解 · 《中国植物志》梅"
    }
  ]
};

function genericScienceStages(flower) {
  const base = flower.description || '这是一朵可以随手势开合的花。';
  return [
    {
      max: 0.28,
      eyebrow: '花苞阶段',
      title: `${flower.name}还收在苞里`,
      body: `${base}\n\n花苞阶段，外层萼片或苞片护住花瓣。捏合收紧时，画面回到合拢；慢慢张开，才会看见里面的结构。\n\n花期、传粉细节因种而异——可先观察开合节奏，再对照正式植物志条目。`,
      deepHref: '',
      deepLabel: '',
    },
    {
      max: 0.62,
      eyebrow: '初开阶段',
      title: '瓣尖开始露出来',
      body: `${flower.name}（${flower.latin}）正在从花苞过渡到半开。${base}\n\n这一段适合盯着边缘：瓣片怎么翻开、颜色有没有变化。左右滑动可换花对比。`,
      deepHref: '',
      deepLabel: '',
    },
    {
      max: 0.90,
      eyebrow: '半开阶段 · 看花瓣',
      title: '花瓣继续向外舒展',
      body: `半开时，${flower.name}的花瓣把花心让出来。${base}\n\n可以把进度停在这一段，慢慢对照花瓣层数、形状和颜色；完整词条会在后续版本补上「深入了解」链接。`,
      deepHref: '',
      deepLabel: '',
    },
    {
      max: 1.01,
      eyebrow: '盛放阶段 · 看花蕊',
      title: '花心结构最清楚',
      body: `盛放时，雄蕊、雌蕊或管状花心更容易看清。${base}\n\n真实传粉多依赖昆虫或风力；本页用手势模拟开合，方便课堂里反复观察形态，不代替野外记录。`,
      deepHref: '',
      deepLabel: '',
    },
  ];
}

function scienceStagesFor(flower) {
  if (flower?.key && SCIENCE_BY_KEY[flower.key]) return SCIENCE_BY_KEY[flower.key];
  return genericScienceStages(flower);
}

function scienceStageAt(flower, progress) {
  const stages = scienceStagesFor(flower);
  return stages.find((s) => progress < s.max) || stages[stages.length - 1];
}

const OBSERVE_BY_KEY = {
  marigold: [
    ['看杯状总苞怎样包住花序。', '总苞里包着的是一朵花还是许多小花？'],
    ['看舌状花从总苞口露出。', '先露出的黄色部分是什么？'],
    ['看外围逐渐展开的舌状花。', '看似花瓣的部分为什么也是小花？'],
    ['看花序外围与中央的区别。', '舌状花和中央管状花有什么不同？'],
  ],
  hydrangea: [
    ['看花序中聚拢的小花。', '这一团由一朵花还是许多小花组成？'],
    ['看小花逐渐舒展。', '花序里的小花是同时打开的吗？'],
    ['看花球中小花的排列。', '每朵小花和整团花球有什么关系？'],
    ['看花球外围与中央。', '哪些小花更容易吸引你的目光？'],
  ],
  haitang: [
    ['看萼片包裹粉红花蕾。', '花蕾外面的萼片起什么作用？'],
    ['看粉白瓣尖从萼片间露出。', '花瓣颜色与花蕾有什么变化？'],
    ['看花瓣向外展开的形状。', '你能分辨出几片花瓣？'],
    ['看花心中露出的花药。', '昆虫来访时可能碰到花心的哪里？'],
  ],
  'pink-lotus': [
    ['看莲瓣包围花心。', '花苞外形像什么？'],
    ['看外层莲瓣开始松开。', '外层与内层莲瓣有什么不同？'],
    ['看层叠莲瓣逐渐让出花心。', '花瓣的层次如何变化？'],
    ['看舒展的莲瓣和花心。', '盛放时花心比花苞时清楚了多少？'],
  ],
};
const STAGE_NAMES = ['花苞', '初开', '半开', '盛放'];
const TOUR_ROUTE = ['marigold', 'hydrangea', 'pink-lotus', 'haitang', 'sunflower'];
const TOUR_DELAY = 7000;
const OBSERVATION_KEY = 'fingertip_iter5_observations';
const COACH_KEY = 'fingertip_iter5_coach_done';
let observations = {};
try { observations = JSON.parse(localStorage.getItem(OBSERVATION_KEY) || '{}') || {}; } catch (_) {}
let lastObservation = '';
let coachStep = -1;
let tour = { active: false, paused: false, index: 0, timer: null, phase: 0, handRatio: null };

function stageIndex(flower, progress) { return scienceStagesFor(flower).findIndex(stage => progress < stage.max); }
function observationPrompt(flower, index) {
  return OBSERVE_BY_KEY[flower.key]?.[index] || [
    `观察${flower.name}的轮廓和颜色：${flower.description}`,
    ['花苞的轮廓像什么？', '与花苞相比，花的轮廓有什么变化？', '向外展开的部分与中心有什么不同？', '盛放时花的轮廓和颜色有什么变化？'][index],
  ];
}
function saveObservations() { try { localStorage.setItem(OBSERVATION_KEY, JSON.stringify(observations)); } catch (_) {} }
function recordObservation(flower, index) {
  const signature = `${flower.key}:${index}`;
  if (signature === lastObservation && observations[flower.key]) return;
  lastObservation = signature;
  const entry = observations[flower.key] ||= { name: flower.name, stages: [], questions: [] };
  entry.name = flower.name;
  if (!entry.stages.includes(STAGE_NAMES[index])) { entry.stages.push(STAGE_NAMES[index]); saveObservations(); }
}
function coachStart(force = false) {
  let done = false;
  try { done = localStorage.getItem(COACH_KEY) === '1'; } catch (_) {}
  if (!force && done) return;
  coachStep = 0; renderCoach();
}
function renderCoach() {
  const steps = ['捏合手指或拖动进度条，控制花朵开合。', '点“半开”标签，停下来观察并阅读科普。', '左右挥手或按方向键切花；上划打开花名列表，指尖悬停并捏合确认。'];
  $('coach').hidden = coachStep < 0;
  if (coachStep >= 0) { $('coachCount').textContent = `使用引导 ${coachStep + 1} / 3`; $('coachText').textContent = steps[coachStep]; }
}
function coachAdvance(action) {
  if (coachStep < 0) return;
  if ((coachStep === 0 && action === 'control') || (coachStep === 1 && action === 'half') || (coachStep === 2 && action === 'flower')) {
    coachStep++;
    if (coachStep === 3) { coachFinish(); showToast('引导完成，开始观察吧'); } else renderCoach();
  }
}
function coachFinish() { coachStep = -1; try { localStorage.setItem(COACH_KEY, '1'); } catch (_) {} renderCoach(); }
function updateTourUI() {
  $('tourBtn').textContent = tour.active ? (tour.paused ? '继续巡演' : '暂停巡演') : '开始巡演';
  $('tourExitBtn').hidden = !tour.active;
  $('tourStatus').hidden = !tour.active;
}
function endTour(message = '巡演已退出') {
  if (!tour.active) return;
  clearTimeout(tour.timer); tour.active = false; tour.paused = false; updateTourUI(); showToast(message);
}
function pauseTour() {
  if (!tour.active || tour.paused) return;
  clearTimeout(tour.timer); tour.paused = true; tour.handRatio = null;
  $('tourStatus').textContent = `巡演 ${tour.index + 1} / ${TOUR_ROUTE.length}：${currentFlower().name} · 已暂停，进度由你控制。`; updateTourUI();
}
function tourSchedule() {
  clearTimeout(tour.timer);
  tour.timer = setTimeout(() => {
    if (!tour.active || tour.paused) return;
    if (tour.phase === 0) {
      tour.phase = 1;
      $('tourStatus').textContent = `巡演 ${tour.index + 1} / ${TOUR_ROUTE.length}：${currentFlower().name} · 可以继续观察花的变化。`;
      tourSchedule();
    } else if (++tour.index < TOUR_ROUTE.length) tourVisit();
    else endTour('巡演完成，观察记录已保存在本机');
  }, TOUR_DELAY);
}
function tourVisit() {
  const index = FLOWERS.findIndex((flower) => flower.key === TOUR_ROUTE[tour.index]);
  selectFlower(index, false, true); setProgress(.62, '巡演');
  tour.phase = 0; tour.handRatio = null;
  $('tourStatus').textContent = `巡演 ${tour.index + 1} / ${TOUR_ROUTE.length}：${currentFlower().name} · 先看看科普面板中的问题。`;
  updateTourUI(); tourSchedule();
}
function summaryText() {
  const entries = Object.entries(observations);
  if (!entries.length) return '还没有观察记录。切换阶段会自动记录，点击“记下这个问题”可保存问题。';
  return entries.map(([key, item]) => `${FLOWERS.find(f => f.key === key)?.name || item.name}\n到达阶段：${item.stages.join('、') || '无'}${item.questions.length ? `\n记下的问题：\n${item.questions.map(q => `- ${q}`).join('\n')}` : ''}`).join('\n\n');
}
function renderSummary() {
  $('summaryList').textContent = summaryText();
  $('summaryClear').disabled = $('summaryDownload').disabled = !Object.keys(observations).length;
}
let lastScience = '';

function syncScienceDocumentSpace() {
  const pageShell = document.querySelector('.page-shell');
  const main = document.querySelector('main');
  const science = document.querySelector('.science-side');
  if (!pageShell || !main || !science) return;
  if (!window.matchMedia('(min-width: 981px)').matches) {
    pageShell.style.removeProperty('padding-bottom');
    return;
  }
  const scrollY = window.scrollY || window.pageYOffset || 0;
  const mainBottom = main.getBoundingClientRect().bottom + scrollY;
  const scienceBottom = science.getBoundingClientRect().bottom + scrollY;
  // Keep the document at one viewport when the complete panel already fits.
  const paddingBottom = scienceBottom > mainBottom
    ? Math.ceil(scienceBottom - mainBottom + 8)
    : 0;
  const value = `${paddingBottom}px`;
  if (pageShell.style.paddingBottom !== value) {
    pageShell.style.paddingBottom = value;
    window.requestAnimationFrame(syncScienceDocumentSpace);
  }
}

function updateSciencePanel() {
  const eyebrow = $('scienceEyebrow');
  const title = $('scienceTitle');
  const body = $('scienceBody');
  const link = $('scienceDeepLink');
  if (!eyebrow || !title || !body || !link) return;
  /* science moved to right column */
  const flower = currentFlower();
  const stage = scienceStageAt(flower, state.progress);
  const index = stageIndex(flower, state.progress);
  const signature = `${flower.key}:${index}`;
  document.querySelectorAll('.range-labels button').forEach((button, i) => { button.classList.toggle('active', i === index); button.setAttribute('aria-pressed', String(i === index)); });
  if (signature === lastScience) return;
  lastScience = signature;
  const [look, think] = observationPrompt(flower, index);
  $('scienceLook').textContent = look;
  $('scienceThink').textContent = think;
  recordObservation(flower, index);
  eyebrow.textContent = stage.eyebrow;
  title.textContent = stage.title;
  body.textContent = stage.body;
  $('scienceAnnouncement').textContent = `${flower.name}，${STAGE_NAMES[index]}阶段`;
  const wrap = body.parentElement;
  if (wrap) wrap.scrollTop = 0;
  if (stage.deepHref) {
    link.hidden = false;
    link.href = stage.deepHref;
    link.textContent = stage.deepLabel || '深入了解';
    link.target = '_blank';
    link.rel = 'noopener';
  } else {
    link.hidden = true;
    link.removeAttribute('href');
  }
  syncScienceDocumentSpace();
}



const PETAL_LINES = [
  [0, 0, .22, -.34, .18],
  [0, 0, -.19, -.43, .13],
  [0, 0, .03, -.57, .22],
];

const state = {
  ready: false,
  flowerIndex: 0,
  progress: 0.04,
  photoReady: false,
  playing: false,
  playStart: 0,
  playOrigin: 0,
  playDuration: 4300,
  playLastUpdate: 0,
  recording: null,
  cameraOn: false,
  trackerLoaded: false,
  tracker: null,
  detecting: false,
  lastDetectAt: 0,
  handPresent: false,
  pinchDistance: 0,
  pinchRatio: 0,
  handSource: '鼠标备用',
  handedness: '',
  lastSeen: 0,
  injected: null,
  swipeTrail: [],
  swipeCooldown: 0,
  swipeLocked: false,
  swipeDirection: '',
  fps: 0,
  frameTimes: [],
  lastFrame: performance.now(),
  toastTimer: 0,
  videoSeeking: false,
  videoTargetTime: 0,
  videoDisplayedTime: 0,
  videoLastSeekAt: 0,
  videoSeekInterval: 40,
  photoRequestId: 0,
  photoSeekRequestId: 0,
  videoFrameReady: false,
  hasVideoCanvasFrame: false,
  videoFrameCallbackId: 0,
  videoError: false,
  photoError: false,
};

const flowerCanvas = $('flowerCanvas');
const photoCanvas = $('photoCanvas');
const cameraVideo = $('cameraVideo');
const skeletonCanvas = $('skeletonCanvas');
const bloomVideo = $('bloomVideo');
const photoVideo = $('photoVideo');
function currentFlower() { return FLOWERS[state.flowerIndex]; }

function seedRandom(seed) {
  let value = (seed >>> 0) + 0x6d2b79f5;
  return () => {
    value |= 0;
    value = value + 0x6d2b79f5 | 0;
    let t = Math.imul(value ^ value >>> 15, 1 | value);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function canvasMetrics(canvas) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(260, rect.width || canvas.clientWidth || 260);
  const height = Math.max(230, rect.height || canvas.clientHeight || 230);
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  if (canvas._cssWidth !== width || canvas._cssHeight !== height || canvas._dpr !== dpr) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas._cssWidth = width;
    canvas._cssHeight = height;
    canvas._dpr = dpr;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  return { ctx, width, height };
}

function drawBackdrop(ctx, width, height, photo, time, flower) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  if (photo) {
    gradient.addColorStop(0, '#f7f1ea');
    gradient.addColorStop(.55, '#e9dfd7');
    gradient.addColorStop(1, '#d9cfc6');
  } else {
    gradient.addColorStop(0, '#172622');
    gradient.addColorStop(.5, '#0d1817');
    gradient.addColorStop(1, '#091111');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * .5, height * .43, 0, width * .5, height * .43, Math.min(width, height) * .58);
  glow.addColorStop(0, photo ? 'rgba(255,245,232,.72)' : 'rgba(174, 221, 159, .13)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const rand = seedRandom(flower.seed + (photo ? 29 : 91));
  const count = photo ? 48 : 64;
  ctx.save();
  ctx.globalAlpha = photo ? .18 : .24;
  for (let i = 0; i < count; i += 1) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * (photo ? 1.5 : 1.8) + .35;
    const a = .15 + rand() * .7;
    ctx.fillStyle = photo ? `rgba(255,255,255,${a})` : `rgba(213,242,181,${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r * (0.9 + .15 * Math.sin(time * .0005 + i)), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawStem(ctx, cx, baseY, topY, photo, open) {
  const stemGradient = ctx.createLinearGradient(cx - 12, topY, cx + 14, baseY);
  stemGradient.addColorStop(0, '#9baf66');
  stemGradient.addColorStop(.6, '#536d4f');
  stemGradient.addColorStop(1, '#283f32');
  ctx.save();
  ctx.lineCap = 'round';
  ctx.strokeStyle = stemGradient;
  ctx.lineWidth = photo ? 17 : 12;
  ctx.beginPath();
  ctx.moveTo(cx + 4, topY);
  ctx.bezierCurveTo(cx - 4, topY + 75, cx + 14, baseY - 68, cx - 3, baseY);
  ctx.stroke();
  ctx.globalAlpha = .45;
  ctx.strokeStyle = '#d5eb9b';
  ctx.lineWidth = photo ? 2.5 : 2;
  ctx.beginPath();
  ctx.moveTo(cx + 1, topY + 2);
  ctx.bezierCurveTo(cx - 1, topY + 70, cx + 11, baseY - 70, cx - 4, baseY - 4);
  ctx.stroke();

  const leafScale = .6 + open * .4;
  ctx.globalAlpha = .92 * leafScale;
  ctx.fillStyle = '#6e8c5d';
  ctx.beginPath();
  ctx.ellipse(cx - 37, baseY - 78, 43, 16, -.36, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + 34, baseY - 40, 38, 14, .42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPetal(ctx, cx, cy, spec, angle, radial, length, width, color, highlight, open, index) {
  const x = cx + Math.cos(angle) * radial;
  const y = cy + Math.sin(angle) * radial * .5 - spec.lift * open;
  const tilt = (1 - open) * -Math.sin(angle) * .64;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2 + tilt);
  ctx.scale(1, .82 + open * .18);

  ctx.shadowColor = 'rgba(37, 35, 34, .16)';
  ctx.shadowBlur = 6 + (1 - open) * 5;
  ctx.shadowOffsetY = 3;
  const fill = ctx.createLinearGradient(0, -length, 0, 12);
  fill.addColorStop(0, highlight);
  fill.addColorStop(.34, color);
  fill.addColorStop(1, color.replace(')', ', .9)').replace('rgb(', 'rgba('));
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(width * .78, -length * .2, width * .75, -length * .7, width * .2, -length);
  ctx.bezierCurveTo(width * .06, -length * 1.08, -width * .18, -length * 1.02, -width * .28, -length * .84);
  ctx.bezierCurveTo(-width * .62, -length * .44, -width * .58, -length * .15, 0, 5);
  ctx.closePath();
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = `rgba(255,248,238,${.2 + open * .16})`;
  ctx.lineWidth = 1.1;
  ctx.stroke();

  ctx.globalAlpha = .3 + open * .35;
  ctx.strokeStyle = 'rgba(255,250,240,.74)';
  ctx.lineWidth = 1;
  for (const [sx, sy, ex, ey, branch] of PETAL_LINES) {
    ctx.beginPath();
    ctx.moveTo(sx * width, sy * length);
    ctx.quadraticCurveTo(ex * width, ey * length * .7, ex * width * 1.03, ey * length);
    ctx.stroke();
    if (open > .35) {
      ctx.beginPath();
      ctx.moveTo(ex * width * .92, ey * length * .86);
      ctx.lineTo((ex + branch) * width, (ey + .11) * length);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawCore(ctx, cx, cy, size, flower, open, time) {
  const core = ctx.createRadialGradient(cx - size * .2, cy - size * .24, 0, cx, cy, size);
  core.addColorStop(0, flower.palette[3]);
  core.addColorStop(.36, '#f1c870');
  core.addColorStop(1, '#a96b4a');
  ctx.save();
  ctx.globalAlpha = .62 + open * .38;
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.ellipse(cx, cy - size * .08, size * (.44 + open * .2), size * (.3 + open * .12), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = .72;
  const rand = seedRandom(flower.seed + 908);
  const count = Math.round(9 + open * 22);
  for (let i = 0; i < count; i += 1) {
    const angle = rand() * Math.PI * 2;
    const radius = (0.12 + rand() * .65) * size * (.26 + open * .28);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius * .55 - size * .07;
    ctx.fillStyle = i % 3 === 0 ? '#fff1a9' : '#cb8d43';
    ctx.beginPath();
    ctx.arc(x, y, 1.6 + rand() * 1.7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawAiState(ctx, image, crop, box, alpha, scale = 1, shiftX = 0) {
  if (!image || !image.complete || !image.naturalWidth) return;
  const [x, y, w, h] = crop;
  const sourceX = image.naturalWidth * x;
  const sourceY = image.naturalHeight * y;
  const sourceW = image.naturalWidth * w;
  const sourceH = image.naturalHeight * h;
  const sourceAspect = sourceW / sourceH;
  let drawH = box.height * scale;
  let drawW = drawH * sourceAspect;
  if (drawW > box.width * .9) {
    drawW = box.width * .9;
    drawH = drawW / sourceAspect;
  }
  const dx = box.x + (box.width - drawW) * .5 + shiftX;
  const dy = box.y + (box.height - drawH) * .5;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, dx, dy, drawW, drawH);
  ctx.restore();
}

function drawBloomSprite(ctx, image, box, progress, alpha = 1) {
  if (!image || !image.complete || !image.naturalWidth) return false;
  const frames = 16;
  const columns = 4;
  const rows = 4;
  const frame = clamp(progress) * (frames - 1);
  const left = Math.floor(frame);
  const right = Math.min(frames - 1, left + 1);
  const mix = frame - left;
  const frameWidth = image.naturalWidth / columns;
  const frameHeight = image.naturalHeight / rows;
  const frameInset = Math.min(frameWidth, frameHeight) * .035;
  const sourceWidth = frameWidth - frameInset * 2;
  const sourceHeight = frameHeight - frameInset * 2;
  const aspect = sourceWidth / sourceHeight;
  let drawHeight = box.height * .96;
  let drawWidth = drawHeight * aspect;
  if (drawWidth > box.width * .92) {
    drawWidth = box.width * .92;
    drawHeight = drawWidth / aspect;
  }
  const dx = box.x + (box.width - drawWidth) * .5;
  const dy = box.y + (box.height - drawHeight) * .5;
  const drawFrame = (index, opacity) => {
    ctx.globalAlpha = opacity;
    const column = index % columns;
    const row = Math.floor(index / columns);
    ctx.drawImage(image, column * frameWidth + frameInset, row * frameHeight + frameInset, sourceWidth, sourceHeight, dx, dy, drawWidth, drawHeight);
  };
  ctx.save();
  drawFrame(left, alpha * (1 - mix));
  if (right !== left) drawFrame(right, alpha * mix);
  ctx.restore();
  return true;
}

function renderAiFlower(canvas, flower, progress, { photo = false, time = performance.now() } = {}) {
  const { ctx, width, height } = canvasMetrics(canvas);
  const open = ease(progress);
  const image = flower.image;
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, photo ? '#f8f3ec' : '#e9e1d7');
  background.addColorStop(1, photo ? '#e7ddd3' : '#d8ccc1');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const box = {
    x: width * .05,
    y: photo ? height * .02 : height * .045,
    width: width * .9,
    height: photo ? height * .94 : height * .87,
  };
  const breath = 1 + Math.sin(time * .0012) * .008 * open;
  if (photo) {
    drawAiState(ctx, image, flower.crop.open, box, 1, 1.02, 0);
  } else if (flower.bloomSpriteImage && drawBloomSprite(ctx, flower.bloomSpriteImage, box, progress)) {
    ctx.save();
    ctx.globalAlpha = .08 + open * .1;
    ctx.fillStyle = '#fff9e9';
    ctx.beginPath();
    ctx.ellipse(width * .5, height * .88, width * .25, height * .025, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    drawAiState(ctx, image, flower.crop.closed, box, 1 - open, .86 + open * .06, -10 * (1 - open));
    drawAiState(ctx, image, flower.crop.open, box, open, .93 + open * .07, 10 * (1 - open));
    ctx.save();
    ctx.globalAlpha = .08 + open * .1;
    ctx.fillStyle = '#fff9e9';
    ctx.beginPath();
    ctx.ellipse(width * .5, height * .88, width * .25, height * .025, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 轻微的“镜头呼吸”让生图素材在动效里保持生命感。
  if (!photo && breath !== 1) {
    ctx.save();
    ctx.globalAlpha = .025 * open;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}

function drawVideoFrame(canvas, video, { photo = false } = {}) {
  const { ctx, width, height } = canvasMetrics(canvas);
  const sourceWidth = video.videoWidth;
  const sourceHeight = video.videoHeight;
  if (!(sourceWidth > 0 && sourceHeight > 0)) return false;
  ctx.fillStyle = photo ? '#f4eee8' : '#eef3f9';
  ctx.fillRect(0, 0, width, height);
  const sourceAspect = sourceWidth / sourceHeight;
  const maxWidth = width * (photo ? .94 : .98);
  const maxHeight = height * (photo ? .94 : .98);
  let drawWidth = maxWidth;
  let drawHeight = drawWidth / sourceAspect;
  if (drawHeight > maxHeight) {
    drawHeight = maxHeight;
    drawWidth = drawHeight * sourceAspect;
  }
  const dx = (width - drawWidth) * .5;
  const dy = photo ? (height - drawHeight) * .5 : (height - drawHeight);
  ctx.save();
  ctx.globalAlpha = .98;
  ctx.drawImage(video, 0, 0, sourceWidth, sourceHeight, dx, dy, drawWidth, drawHeight);
  ctx.restore();
  if (!photo) state.hasVideoCanvasFrame = true;
  return true;
}

function renderVideoFlower(canvas, flower, time = performance.now(), { photo = false, video = bloomVideo } = {}) {
  return drawVideoFrame(canvas, video, { photo });
}

function drawVideoPlaceholder(canvas, message, photo = false) {
  const { ctx, width, height } = canvasMetrics(canvas);
  ctx.fillStyle = photo ? '#f4eee8' : '#eef3f9';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = photo ? '#6b716b' : '#5b6d82';
  ctx.font = '600 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(message, width * .5, height * .5);
}

function renderFlower(canvas, flower, progress, { photo = false, time = performance.now() } = {}) {
  const video = photo ? photoVideo : bloomVideo;
  const videoSrc = flower.video ? new URL(flower.video, window.location.href).href : '';
  // 主舞台已有画面时，seek/解码短暂降级期间始终保留上一帧；不要把它替换成“视频加载中…”。
  if (!photo && flower.video && state.hasVideoCanvasFrame && (
    video.currentSrc !== videoSrc || video.readyState < 2 || (state.videoSeeking && !state.videoFrameReady)
  )) return;
  if (flower.video && video.currentSrc === videoSrc && video.readyState >= 2) {
    // 手势 seek 期间视频暂时没有可显示的新帧时，保留上一帧，避免 clearRect 后闪出白底。
    if (!photo && state.videoSeeking && !state.videoFrameReady) return;
    renderVideoFlower(canvas, flower, time, { photo, video });
    return;
  }
  if (flower.video) {
    const failed = photo ? state.photoError : state.videoError;
    drawVideoPlaceholder(canvas, photo ? (failed ? '照片帧加载失败' : '照片帧加载中…') : (failed ? '视频加载失败' : '视频加载中…'), photo);
    return;
  }
  drawVideoPlaceholder(canvas, '当前花朵没有视频资源', photo);
}

function capturePhotoFrame(flower, requestId = state.photoRequestId) {
  const expectedSrc = flower.video ? new URL(flower.video, window.location.href).href : '';
  if (requestId !== state.photoRequestId || flower !== currentFlower() || photoVideo.currentSrc !== expectedSrc) return;
  if (photoVideo.readyState < 2 || !Number.isFinite(photoVideo.duration) || photoVideo.duration <= 0) return;
  const target = Math.max(0, photoVideo.duration - (1 / 120));
  const draw = () => {
    if (requestId !== state.photoRequestId || flower !== currentFlower() || photoVideo.currentSrc !== expectedSrc) return;
    renderVideoFlower(photoCanvas, flower, performance.now(), { photo: true, video: photoVideo });
    state.photoReady = true;
    $('photoStamp').textContent = `刚刚生成 · ${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
  };
  if (Math.abs(photoVideo.currentTime - target) <= .008) draw();
  else { state.photoSeekRequestId = requestId; photoVideo.currentTime = target; }
}

function loadPhotoVideo(flower) {
  if (!flower.video) return;
  const next = new URL(flower.video, window.location.href).href;
  if (photoVideo.currentSrc === next) {
    capturePhotoFrame(flower);
    return;
  }
  state.photoError = false;
  state.photoSeekRequestId = 0;
  photoVideo.pause();
  photoVideo.src = flower.video;
  photoVideo.load();
}

function updatePhoto() {
  const flower = currentFlower();
  state.photoSeekRequestId = 0;
  state.photoReady = false;
  const nameEl = $('photoName');
  const latinEl = $('photoLatin');
  if (nameEl) nameEl.textContent = flower.name;
  if (latinEl) latinEl.textContent = flower.latin;
  const corner = document.querySelector('.photo-corner');
  if (corner) corner.textContent = `${String(state.flowerIndex + 1).padStart(2, '0')} / ${String(FLOWERS.length).padStart(2, '0')}`;
  loadPhotoVideo(flower);
  if ($('photoCanvas')) capturePhotoFrame(flower);
}

function updateFlowerLabels() {
  const flower = currentFlower();
  $('stageName').textContent = flower.name;
  $('stageLatin').textContent = flower.latin;
  $('stageCounter').textContent = `${String(state.flowerIndex + 1).padStart(2, '0')} / ${String(FLOWERS.length).padStart(2, '0')}`;
  document.querySelectorAll('.flower-tab').forEach((tab, index) => {
    const active = index === state.flowerIndex;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  updatePhoto();
  updateSciencePanel();
}

function updateHud(time = performance.now()) {
  if (time - state.lastHudAt < 66) return;
  state.lastHudAt = time;
  $('progressRange').value = String(state.progress);
  $('progressValue').textContent = fmtPercent(state.progress);
  $('stageProgressBar').style.width = `${state.progress * 100}%`;
  $('modeTag').textContent = state.handPresent ? '右手手势' : '鼠标备用';
  $('stageState').textContent = state.recording ? '正在录制动效' : state.playing ? '正在播放' : state.handPresent ? '右手已连接' : '等待手势';
  document.querySelector('.live-state')?.classList.toggle('live', state.handPresent);
  $('pinchReadout').textContent = state.handPresent ? `${state.pinchDistance.toFixed(3)} · ${fmtPercent(state.progress)}%` : '—';
  $('sourceReadout').textContent = state.handSource;
  $('handReadout').textContent = state.handPresent ? `${state.handedness || '右手'} 已检测` : state.cameraOn ? '寻找右手…' : '未检测';
  $('connectionPill').classList.toggle('connected', state.cameraOn && state.trackerLoaded);
  $('connectionPill').innerHTML = `<i></i>${state.cameraOn ? (state.trackerLoaded ? '摄像头已连接' : '摄像头已开启') : '未连接摄像头'}`;
  updateSciencePanel();
}

function currentVideoReady() {
  const flower = currentFlower();
  const src = flower.video ? new URL(flower.video, window.location.href).href : '';
  return !!(flower.video && bloomVideo.currentSrc === src && bloomVideo.readyState >= 2);
}

function renderFrame(time = performance.now()) {
  // 进度、科普和画布使用同一帧；没有视频帧回调时由 rAF 读取当前帧。
  if (state.videoPlayback && currentVideoReady() && !state.videoSeeking) {
    const mediaTime = 'requestVideoFrameCallback' in HTMLVideoElement.prototype ? state.videoDisplayedTime : bloomVideo.currentTime;
    state.progress = clamp(mediaTime / bloomVideo.duration);
  }
  renderFlower(flowerCanvas, currentFlower(), state.progress, { time });
  updateHud(time);
}

function setProgress(value, source = '鼠标备用') {
  if (source === '鼠标备用') pauseTour();
  state.progress = clamp(Number(value) || 0);
  state.handSource = source;
  if (state.playing || state.videoPlayback) stopPlayback();
  syncBloomVideoTime();
  updateSciencePanel();
}

function syncBloomVideoTime(now = performance.now()) {
  const flower = currentFlower();
  const videoSrc = flower.video ? new URL(flower.video, window.location.href).href : '';
  if (!flower.video || state.videoPlayback || bloomVideo.currentSrc !== videoSrc || bloomVideo.readyState < 1 || !Number.isFinite(bloomVideo.duration)) return;
  const target = state.progress * bloomVideo.duration;
  state.videoTargetTime = target;
  const distance = Math.abs(bloomVideo.currentTime - target);
  const frameTolerance = 1 / 120;
  if (distance <= frameTolerance || state.videoSeeking || now - state.videoLastSeekAt < state.videoSeekInterval) return;
  state.videoSeeking = true;
  state.videoFrameReady = false;
  state.videoLastSeekAt = now;
  bloomVideo.currentTime = target;
}

function selectFlower(index, announce = true, fromTour = false) {
  if (!fromTour) { endTour(); coachAdvance('flower'); }
  stopPlayback();
  state.flowerIndex = (index + FLOWERS.length) % FLOWERS.length;
  state.progress = .04;
  loadBloomVideo(currentFlower());
  updateFlowerLabels();
  document.querySelectorAll('.flower-tab')[state.flowerIndex]?.scrollIntoView?.({ inline: 'nearest', block: 'nearest' });
  renderFrame();
  if (announce) showToast(`已切换到${currentFlower().name} · 右手捏合可控制开花`);
}

function switchFlower(direction) {
  state.swipeDirection = direction > 0 ? '向右' : '向左';
  selectFlower(state.flowerIndex + (direction > 0 ? 1 : -1));
  state.swipeCooldown = 950;
  state.swipeLocked = true;
}

function showToast(message, ms = 2600) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove('show'), ms);
}

function hideWelcome() { const layer = $('welcomeLayer'); if (!layer.classList.contains('hidden')) { layer.classList.add('hidden'); if (layer.contains(document.activeElement)) $('helpBtn').focus(); } }

function downloadBlob(blob, name) {
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(href), 1500);
}

function downloadPhoto() {
  photoCanvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `指尖开花第二版-${currentFlower().name}.png`);
  }, 'image/png');
  showToast('花朵照片已生成，正在下载 PNG');
}

function beginPlayback({ record = false } = {}) {
  if (record) {
    if (!flowerCanvas.captureStream || typeof MediaRecorder === 'undefined') {
      showToast('当前浏览器不支持画布录制，已改为播放开花动画');
      record = false;
    } else {
      let stream;
      try { stream = flowerCanvas.captureStream(120); } catch { stream = flowerCanvas.captureStream(60); }
      let recorder;
      try { recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' }); }
      catch { recorder = new MediaRecorder(stream); }
      const chunks = [];
      const recordingFlowerName = currentFlower().name;
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        if (chunks.length) downloadBlob(new Blob(chunks, { type: recorder.mimeType || 'video/webm' }), `指尖开花第二版-${recordingFlowerName}-开花动效.webm`);
        showToast('动效视频已生成，正在下载 WebM');
      };
      recorder.start();
      state.recording = recorder;
    }
  }
  state.playOrigin = 0;
  state.playStart = performance.now();
  state.playLastUpdate = state.playStart;
  state.playDuration = currentVideoReady() && Number.isFinite(bloomVideo.duration) && bloomVideo.duration > 0 ? bloomVideo.duration * 1150 : 20000;
  state.playing = true;
  if (currentVideoReady()) {
    state.videoPlayback = true;
    state.videoTargetTime = 0;
    state.videoSeeking = true;
    state.videoFrameReady = false;
    bloomVideo.playbackRate = .25;
    bloomVideo.currentTime = 0;
    bloomVideo.play().catch(() => { if (state.videoPlayback) stopPlayback(); });
  } else state.progress = 0;
  $('playBtn').textContent = 'Ⅱ 暂停开花';
}

function stopPlayback() {
  state.playing = false;
  state.videoPlayback = false;
  bloomVideo.pause();
  bloomVideo.playbackRate = 1;
  $('playBtn').textContent = '▶ 播放开花';
  if (state.recording) finishRecording();
}

function finishRecording() {
  const recorder = state.recording;
  state.recording = null;
  if (recorder && recorder.state !== 'inactive') recorder.stop();
}

function updatePlayback(now) {
  if (!state.playing) return;
  if (state.videoPlayback && Number.isFinite(bloomVideo.duration) && bloomVideo.duration > 0) {
    const dt = Math.max(0, (now - state.playLastUpdate) / 1000);
    state.playLastUpdate = now;
    // 等待首帧或缓冲时冻结曲线时钟，恢复后继续正向解码。
    if (bloomVideo.seeking || bloomVideo.readyState < 3 || (bloomVideo.paused && !bloomVideo.ended)) state.playStart += dt * 1000;
    const u = clamp((now - state.playStart) / state.playDuration);
    const targetTime = ease(u) * bloomVideo.duration;
    const curveRate = 6 * u * (1 - u) * bloomVideo.duration * 1000 / state.playDuration;
    // 用速率追赶小幅偏差，禁止逐帧 seek；平滑调速避免速率突变。
    const correction = clamp((targetTime - bloomVideo.currentTime) * .6, -.2, .2);
    const targetRate = clamp(curveRate + correction, .25, 1.35);
    bloomVideo.playbackRate = lerp(bloomVideo.playbackRate, targetRate, 1 - Math.exp(-dt / .12));
    if (bloomVideo.ended) {
      renderFrame(now);
      stopPlayback();
    }
    return;
  }
  const t = clamp((now - state.playStart) / state.playDuration);
  state.progress = ease(t);
  if (t >= 1) {
    stopPlayback();
    if (state.recording) finishRecording();
  }
}

const SKELETON_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

function drawSkeleton(landmarks) {
  const rect = skeletonCanvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  if (skeletonCanvas.width !== Math.round(rect.width * dpr) || skeletonCanvas.height !== Math.round(rect.height * dpr)) {
    skeletonCanvas.width = Math.round(rect.width * dpr);
    skeletonCanvas.height = Math.round(rect.height * dpr);
  }
  const ctx = skeletonCanvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  if (!landmarks) return;
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = 'rgba(212,239,117,.85)';
  for (const [a, b] of SKELETON_CONNECTIONS) {
    const p = landmarks[a]; const q = landmarks[b];
    if (!p || !q) continue;
    ctx.beginPath(); ctx.moveTo(p.x * rect.width, p.y * rect.height); ctx.lineTo(q.x * rect.width, q.y * rect.height); ctx.stroke();
  }
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  if (thumbTip && indexTip) {
    const ax = thumbTip.x * rect.width;
    const ay = thumbTip.y * rect.height;
    const bx = indexTip.x * rect.width;
    const by = indexTip.y * rect.height;
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(240,142,159,.2)';
    ctx.shadowColor = 'rgba(240,142,159,.8)';
    ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f08e9f';
    ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    ctx.restore();
  }
  for (let index = 0; index < landmarks.length; index += 1) {
    const p = landmarks[index];
    ctx.fillStyle = index === 4 || index === 8 ? '#f08e9f' : '#e9f7c1';
    ctx.beginPath(); ctx.arc(p.x * rect.width, p.y * rect.height, index === 4 || index === 8 ? 3.3 : 2, 0, Math.PI * 2); ctx.fill();
  }
}

function normalizeLandmarks(value) {
  if (!value) return null;
  let raw = value;
  if (Array.isArray(value) && value[0]?.landmarks) raw = value[0].landmarks;
  if (value.landmarks) raw = value.landmarks;
  if (Array.isArray(raw) && Array.isArray(raw[0])) raw = raw[0];
  if (!Array.isArray(raw) || raw.length < 21) return null;
  return raw.slice(0, 21).map((point) => ({ x: Number(point.x), y: Number(point.y), z: Number(point.z || 0) }));
}

function rightHandResult(landmarks, handedness = 'Right') {
  const thumb = landmarks[4];
  const index = landmarks[8];
  const palmA = landmarks[5];
  const palmB = landmarks[17];
  if (!thumb || !index || !palmA || !palmB) {
    if (!$('flowerListLayer').hidden) updatePickerHand(landmarks, Infinity);
    return;
  }
  const distance = Math.hypot(thumb.x - index.x, thumb.y - index.y);
  const palm = Math.max(.06, Math.hypot(palmA.x - palmB.x, palmA.y - palmB.y));
  const ratio = distance / palm;
  // 用掌宽归一化后扩大控制范围：约 0.16 视为合拢，约 1.66 才达到全开。
  // 这样手指需要拉开更大距离，开合过程更容易细致控制。
  const target = clamp((ratio - .16) / 1.5);
  const now = performance.now();
  state.pinchDistance = distance; state.pinchRatio = ratio; state.handPresent = true;
  state.handedness = handedness; state.handSource = '右手手势'; state.lastSeen = now;
  drawSkeleton(landmarks);
  if (!$('flowerListLayer').hidden) { updatePickerHand(landmarks, ratio); return; }
  if (!$('summaryLayer').hidden || !$('welcomeLayer').classList.contains('hidden')) return;
  updateSwipe(landmarks[0]?.x ?? .5, landmarks[0]?.y ?? .5, now);
  if (!$('flowerListLayer').hidden) return;
  if (tour.active && !tour.paused) {
    if (tour.handRatio === null) tour.handRatio = ratio;
    if (Math.abs(ratio - tour.handRatio) < .08) return;
    pauseTour();
  }
  if (Math.abs(target - state.progress) > .03) coachAdvance('control');
  const dt = Math.max(.016, (now - state.lastFrame) / 1000);
  const smoothing = 1 - Math.exp(-dt / .12);
  state.progress += (target - state.progress) * smoothing;
  if (state.playing || state.videoPlayback) stopPlayback();
  syncBloomVideoTime(now);
  state.pinchDistance = distance;
  state.pinchRatio = ratio;
  state.handPresent = true;
  state.handedness = handedness;
  state.handSource = '右手手势';
  state.lastSeen = now;
  drawSkeleton(landmarks);
}

function updateSwipe(wristX, wristY, now) {
  state.swipeTrail.push({ x: wristX, y: wristY, t: now });
  while (state.swipeTrail.length && now - state.swipeTrail[0].t > 500) state.swipeTrail.shift();
  if (state.swipeCooldown <= 0 && state.swipeLocked && state.swipeTrail.length > 1) {
    const first = state.swipeTrail[0], last = state.swipeTrail[state.swipeTrail.length - 1];
    if (Math.hypot(last.x - first.x, last.y - first.y) < .05) state.swipeLocked = false;
  }
  if (state.swipeCooldown > 0 || state.swipeLocked || state.swipeTrail.length < 3 || state.pinchRatio < .65) return;
  const first = state.swipeTrail[0], last = state.swipeTrail[state.swipeTrail.length - 1];
  const dx = last.x - first.x, dy = last.y - first.y;
  const speed = Math.hypot(dx, dy) / (Math.max(80, last.t - first.t) / 1000);
  if (speed < .35) return;
  if (dy <= -.14 && Math.abs(dy) > Math.abs(dx) * 1.3) {
    state.swipeCooldown = 950; state.swipeLocked = true; state.swipeTrail = []; openFlowerList();
  } else if (Math.abs(dx) >= .14 && Math.abs(dx) > Math.abs(dy) * 1.3) {
    switchFlower(dx > 0 ? 1 : -1);
    state.swipeCooldown = 950; state.swipeLocked = true; state.swipeTrail = [];
  }
}

function clearHand() {
  if (state.handPresent && performance.now() - state.lastSeen > 240) {
    state.handPresent = false;
    state.handSource = state.cameraOn ? '摄像头寻找中' : '鼠标备用';
    state.swipeTrail = [];
    drawSkeleton(null);
  }
}

async function detectCamera(now) {
  if (!state.cameraOn || !state.tracker || state.detecting || now - state.lastDetectAt < 30 || cameraVideo.readyState < 2) return;
  state.detecting = true;
  state.lastDetectAt = now;
  try {
    const result = state.tracker.detectForVideo(cameraVideo, now);
    const hands = result?.landmarks || [];
    let rightIndex = -1;
    if (Array.isArray(result?.handednesses)) {
      rightIndex = result.handednesses.findIndex((hand) => String(hand?.[0]?.categoryName || '').toLowerCase().includes('right'));
    }
    const handIndex = rightIndex >= 0 ? rightIndex : (hands.length ? 0 : -1);
    if (handIndex >= 0 && hands[handIndex]) {
      rightHandResult(hands[handIndex], result.handednesses?.[handIndex]?.[0]?.categoryName || 'Right');
    } else clearHand();
  } catch (error) {
    state.handSource = '识别暂不可用';
    console.warn('[fingertip-flower-v2] hand detection failed', error);
  } finally {
    state.detecting = false;
  }
}

async function loadTracker() {
  if (state.trackerLoaded) return state.tracker;
  try {
    const { FilesetResolver, HandLandmarker } = await import('./vendor/mediapipe/vision_bundle.mjs');
    const fileset = await FilesetResolver.forVisionTasks('./vendor/mediapipe/wasm');
    state.tracker = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: './vendor/models/hand_landmarker.task', delegate: 'GPU' },
      runningMode: 'VIDEO', numHands: 2,
      minHandDetectionConfidence: .52, minHandPresenceConfidence: .48, minTrackingConfidence: .48,
    });
    state.trackerLoaded = true;
    return state.tracker;
  } catch (error) {
    state.handSource = '模型加载失败';
    console.warn('[fingertip-flower-v2] MediaPipe unavailable', error);
    showToast('手势模型未加载，页面仍可用鼠标备用操作', 4200);
    return null;
  }
}

async function startCamera() {
  hideWelcome();
  if (state.cameraOn || cameraVideo.srcObject) {
    showToast('摄像头已经开启');
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast('当前浏览器没有摄像头接口，已保留鼠标备用操作', 4200);
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 60, max: 60 } },
      audio: false,
    });
    cameraVideo.srcObject = stream;
    cameraVideo.classList.add('ready');
    $('cameraPlaceholder').style.display = 'none';
    state.cameraOn = true;
    $('cameraBtn').textContent = '已开启';
    $('topCameraBtn').textContent = '摄像头已开启';
    const tracker = await loadTracker();
    if (tracker) showToast('右手已就绪：食指与拇指张开，花朵会逐渐盛放');
  } catch (error) {
    state.cameraOn = false;
    state.handSource = '权限未开启';
    showToast('摄像头没有开启，已保留鼠标备用操作', 4200);
    console.warn('[fingertip-flower-v2] camera unavailable', error);
  }
}

function pointerProgress(event) {
  const rect = flowerCanvas.getBoundingClientRect();
  const y = clamp((event.clientY - rect.top) / rect.height);
  setProgress(1 - y, '鼠标备用');
  coachAdvance('control');
}

function buildFlowerTabs() {
  const container = $('flowerSwitcher');
  if (!container) return;
  container.replaceChildren();
  FLOWERS.forEach((flower, index) => {
    const button = document.createElement('button');
    button.className = 'flower-tab';
    button.type = 'button';
    button.dataset.flower = String(index);
    button.setAttribute('aria-pressed', String(index === state.flowerIndex));
    button.innerHTML = `<b>${flower.name}</b>`;
    container.append(button);
  });
}

let modalReturnFocus = null;
let pickerPinched = true;
let pickerHighlighted = null;
function trapFocus(event, layer) {
  const items = [...layer.querySelectorAll('button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hidden);
  if (!items.length) return;
  const index = items.indexOf(document.activeElement);
  if (event.shiftKey && index <= 0) { event.preventDefault(); items[items.length - 1].focus(); }
  else if (!event.shiftKey && (index < 0 || index === items.length - 1)) { event.preventDefault(); items[0].focus(); }
}
function openSummary() { modalReturnFocus = document.activeElement; renderSummary(); $('summaryLayer').hidden = false; $('summaryClose').focus(); }
function closeSummary() { $('summaryLayer').hidden = true; modalReturnFocus?.focus?.(); }
function openFlowerList() {
  if (!$('flowerListLayer').hidden) return;
  modalReturnFocus = document.activeElement; pickerPinched = true; pickerHighlighted = null;
  const list = $('flowerList'); list.replaceChildren();
  FLOWERS.forEach((flower, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = flower.name;
    button.addEventListener('click', () => { closeFlowerList(); selectFlower(index); }); list.append(button);
  });
  $('flowerListLayer').hidden = false; $('handCursor').hidden = false; $('flowerListClose').focus();
}
function closeFlowerList() {
  $('flowerListLayer').hidden = true; $('handCursor').hidden = true; pickerHighlighted = null;
  state.swipeTrail = []; state.swipeCooldown = 950; state.swipeLocked = true;
  modalReturnFocus?.focus?.();
}
function updatePickerHand(landmarks, ratio) {
  const tip = landmarks[8] && Number.isFinite(landmarks[8].x) && Number.isFinite(landmarks[8].y) ? landmarks[8] : landmarks[12];
  if (!tip || !Number.isFinite(tip.x) || !Number.isFinite(tip.y)) return;
  const x = clamp(1 - tip.x) * window.innerWidth, y = clamp(tip.y) * window.innerHeight;
  const cursor = $('handCursor'); cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; cursor.hidden = false;
  const list = $('flowerList'); const rect = list.getBoundingClientRect();
  if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    if (y < rect.top + 35) list.scrollTop -= 8;
    else if (y > rect.bottom - 35) list.scrollTop += 8;
  }
  const hit = document.elementFromPoint(x, y)?.closest('button');
  const next = hit && list.contains(hit) ? hit : null;
  if (pickerHighlighted !== next) { pickerHighlighted?.classList.remove('hand-highlight'); pickerHighlighted = next; pickerHighlighted?.classList.add('hand-highlight'); }
  if (ratio > .55) pickerPinched = false;
  else if (ratio < .35 && !pickerPinched) { pickerPinched = true; pickerHighlighted?.click(); }
}
window.__ffTest = { openFlowerList, closeFlowerList, updatePickerHand };

function bindEvents() {
  document.querySelectorAll('.flower-tab').forEach((button) => button.addEventListener('click', () => selectFlower(Number(button.dataset.flower))));
  $('progressRange').addEventListener('input', (event) => { stopPlayback(); setProgress(event.target.value, '鼠标备用'); coachAdvance(coachStep === 1 && state.progress >= .62 && state.progress < .9 ? 'half' : 'control'); });
  document.querySelectorAll('.range-labels button').forEach((button) => button.addEventListener('click', () => { stopPlayback(); setProgress(button.dataset.progress, '鼠标备用'); coachAdvance(button.dataset.progress === '0.62' ? 'half' : 'control'); }));
  $('generatePhotoBtn').addEventListener('click', () => { updatePhoto(); showToast(`已生成${currentFlower().name}照片`); });
  $('downloadPhotoBtn').addEventListener('click', downloadPhoto);
  $('playBtn').addEventListener('click', () => {
    pauseTour(); coachAdvance('play');
    if (state.playing) stopPlayback();
    else beginPlayback();
  });
  $('recordBtn').addEventListener('click', () => {
    if (state.recording) { finishRecording(); stopPlayback(); } else { pauseTour(); stopPlayback(); beginPlayback({ record: true }); }
  });
  $('cameraBtn').addEventListener('click', startCamera);
  $('topCameraBtn').addEventListener('click', startCamera);
  $('welcomeCameraBtn').addEventListener('click', () => { startCamera(); coachStart(); });
  $('welcomeTryBtn').addEventListener('click', () => { hideWelcome(); coachStart(); showToast('已进入试玩：拖动进度条或按空格播放'); });
  $('helpBtn').addEventListener('click', () => { hideWelcome(); coachStart(true); });

  $('coachSkip').addEventListener('click', coachFinish);
  $('saveQuestionBtn').addEventListener('click', () => {
    const flower = currentFlower(); const index = stageIndex(flower, state.progress);
    recordObservation(flower, index);
    const question = observationPrompt(flower, index)[1];
    const questions = observations[flower.key].questions;
    if (!questions.includes(question)) questions.push(question);
    saveObservations(); showToast('问题已记入本机观察小结');
  });
  $('tourBtn').addEventListener('click', () => {
    if (!tour.active) { tour.active = true; tour.paused = false; tour.index = 0; tourVisit(); }
    else if (!tour.paused) pauseTour();
    else { tour.paused = false; tourVisit(); }
    updateTourUI();
  });
  $('tourExitBtn').addEventListener('click', () => endTour());
  $('summaryBtn').addEventListener('click', openSummary);
  $('summaryClose').addEventListener('click', closeSummary);
  $('flowerListClose').addEventListener('click', closeFlowerList);
  $('summaryClear').addEventListener('click', () => { observations = {}; lastObservation = `${currentFlower().key}:${stageIndex(currentFlower(), state.progress)}`; saveObservations(); renderSummary(); });
  $('summaryDownload').addEventListener('click', () => downloadBlob(new Blob(['指尖开花 · 观察小结\n仅保存在本机，不含摄像头画面。\n\n', summaryText()], { type: 'text/plain;charset=utf-8' }), '指尖开花-观察小结.txt'));

  let dragging = false;
  flowerCanvas.addEventListener('pointerdown', (event) => { dragging = true; flowerCanvas.setPointerCapture?.(event.pointerId); pointerProgress(event); });
  flowerCanvas.addEventListener('pointermove', (event) => { if (dragging) pointerProgress(event); });
  flowerCanvas.addEventListener('pointerup', () => { dragging = false; });
  flowerCanvas.addEventListener('pointercancel', () => { dragging = false; });
  window.addEventListener('keydown', (event) => {
    const welcomeOpen = !$('welcomeLayer').classList.contains('hidden');
    const modal = !$('flowerListLayer').hidden ? $('flowerListLayer') : !$('summaryLayer').hidden ? $('summaryLayer') : welcomeOpen ? $('welcomeLayer') : null;
    if (modal) {
      if (event.key === 'Escape') { event.preventDefault(); if (modal === $('flowerListLayer')) closeFlowerList(); else if (modal === $('summaryLayer')) closeSummary(); else hideWelcome(); }
      if (event.key === 'Tab') trapFocus(event, modal);
      return;
    }
    const editable = event.target.isContentEditable || event.target.closest?.('input, textarea, select, [contenteditable]');
    if (!editable && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); switchFlower(event.key === 'ArrowRight' ? 1 : -1); }
    if (event.code === 'Space' && !editable && !event.target.closest?.('button')) { event.preventDefault(); pauseTour(); coachAdvance('play'); state.playing ? stopPlayback() : beginPlayback(); }
    if (!editable && event.key.toLowerCase() === 'p') { updatePhoto(); showToast(`已生成${currentFlower().name}照片`); }
  });
  window.addEventListener('resize', () => { renderFrame(); updatePhoto(); syncScienceDocumentSpace(); });
}

function animationLoop(now) {
  const dt = Math.max(1, now - state.lastFrame);
  state.lastFrame = now;
  state.frameTimes.push(now);
  while (state.frameTimes.length && now - state.frameTimes[0] > 1000) state.frameTimes.shift();
  state.fps = state.frameTimes.length;
  if (state.swipeCooldown > 0) state.swipeCooldown -= dt;
  if (state.injected) rightHandResult(state.injected, 'Right（模拟）');
  detectCamera(now);
  clearHand();
  updatePlayback(now);
  // 手势/拖动模式下才追赶 seek 目标；原生播放模式保持连续解码。
  if (!state.videoPlayback) syncBloomVideoTime(now);
  if (currentVideoReady() && 'requestVideoFrameCallback' in HTMLVideoElement.prototype) updateHud(now);
  else renderFrame(now);
  state.ready = true;
  requestAnimationFrame(animationLoop);
}

function snapshot() {
  return {
    ready: state.ready,
    flower: currentFlower().key,
    flowerName: currentFlower().name,
    progress: state.progress,
    photoReady: state.photoReady,
    videoError: state.videoError,
    photoError: state.photoError,
    playing: state.playing,
    recording: !!state.recording,
    cameraOn: state.cameraOn,
    trackerLoaded: state.trackerLoaded,
    handPresent: state.handPresent,
    handSource: state.handSource,
    handedness: state.handedness,
    pinchDistance: state.pinchDistance,
    pinchRatio: state.pinchRatio,
    swipeDirection: state.swipeDirection,
    swipeCooldown: Math.max(0, state.swipeCooldown),
    swipeLocked: state.swipeLocked,
    fps: state.fps,
  };
}

window.__ff = {
  get ready() { return state.ready; },
  state: snapshot,
  setProgress(value) { setProgress(value, '测试输入'); return state.progress; },
  selectFlower(index) { selectFlower(Number(index) || 0, false); return currentFlower().key; },
  setLandmarks(value) {
    if (value === null || value === undefined) {
      state.injected = null;
      state.handPresent = false;
      state.handSource = state.cameraOn ? '摄像头寻找中' : '鼠标备用';
      drawSkeleton(null);
      return true;
    }
    const normalized = normalizeLandmarks(value);
    if (!normalized) return false;
    state.injected = normalized;
    return true;
  },
  dismissOverlay() { hideWelcome(); return true; },
};


function scheduleVideoFrameCallback() {
  if (!('requestVideoFrameCallback' in HTMLVideoElement.prototype) || state.videoFrameCallbackId) return;
  state.videoFrameCallbackId = bloomVideo.requestVideoFrameCallback((now, metadata) => {
    state.videoFrameCallbackId = 0;
    state.videoFrameReady = true;
    state.videoDisplayedTime = Number.isFinite(metadata?.mediaTime) ? metadata.mediaTime : bloomVideo.currentTime;
    if (state.videoSeeking && Math.abs(state.videoDisplayedTime - state.videoTargetTime) <= (1 / 120)) state.videoSeeking = false;
    renderFrame(now);
    scheduleVideoFrameCallback();
  });
}

function preloadFlowerAssets() {
  bloomVideo.addEventListener('loadstart', () => {
    state.videoError = false;
    state.videoSeeking = true;
    state.videoFrameReady = false;
    if (state.videoFrameCallbackId && bloomVideo.cancelVideoFrameCallback) {
      bloomVideo.cancelVideoFrameCallback(state.videoFrameCallbackId);
      state.videoFrameCallbackId = 0;
    }
  });
  bloomVideo.addEventListener('loadedmetadata', () => {
    state.videoSeeking = false;
    state.videoDisplayedTime = bloomVideo.currentTime;
    syncBloomVideoTime(performance.now());
    scheduleVideoFrameCallback();
    renderFrame();
  });
  bloomVideo.addEventListener('loadeddata', () => {
    state.videoFrameReady = true;
    scheduleVideoFrameCallback();
    renderFrame();
  });
  bloomVideo.addEventListener('seeked', () => {
    state.videoSeeking = false;
    state.videoFrameReady = true;
    state.videoDisplayedTime = bloomVideo.currentTime;
    scheduleVideoFrameCallback();
    renderFrame();
    if (Math.abs(bloomVideo.currentTime - state.videoTargetTime) > (1 / 120)) syncBloomVideoTime(performance.now());
  });
  bloomVideo.addEventListener('error', () => {
    state.videoError = true;
    state.videoSeeking = false;
    drawVideoPlaceholder(flowerCanvas, '视频加载失败');
  });

  photoVideo.addEventListener('loadedmetadata', () => capturePhotoFrame(currentFlower()));
  photoVideo.addEventListener('loadeddata', () => capturePhotoFrame(currentFlower()));
  photoVideo.addEventListener('seeked', () => {
    const requestId = state.photoSeekRequestId;
    if (!requestId) return;
    state.photoSeekRequestId = 0;
    capturePhotoFrame(currentFlower(), requestId);
  });
  photoVideo.addEventListener('error', () => {
    state.photoError = true;
    state.photoReady = false;
    drawVideoPlaceholder(photoCanvas, '照片帧加载失败', true);
  });

  loadBloomVideo(currentFlower());
  loadPhotoVideo(currentFlower());
}

function loadBloomVideo(flower) {
  if (!flower.video) return;
  const next = new URL(flower.video, window.location.href).href;
  if (bloomVideo.currentSrc === next) return;
  state.videoPlayback = false;
  state.videoError = false;
  state.videoSeeking = true;
  state.videoFrameReady = false;
  state.videoTargetTime = 0;
  bloomVideo.pause();
  bloomVideo.src = flower.video;
  bloomVideo.load();
}

buildFlowerTabs();
bindEvents();

function applyBootstrapFromQuery() {
  try {
    const params = new URLSearchParams(window.location.search);
    const key = (params.get('flower') || '').trim();
    if (key) {
      const idx = FLOWERS.findIndex((f) => f.key === key);
      if (idx >= 0) selectFlower(idx, false);
    }
    const p = params.get('p');
    if (p !== null && p.trim() !== '' && Number.isFinite(Number(p))) setProgress(Math.min(1, Math.max(0, Number(p) > 1 ? Number(p) / 100 : Number(p))), '链接参数');
    if (params.get('nowelcome') === '1') hideWelcome();
  } catch (_) {}
}

applyBootstrapFromQuery();
if (!$('welcomeLayer').classList.contains('hidden')) $('welcomeTryBtn').focus();
preloadFlowerAssets();
updateFlowerLabels();
requestAnimationFrame(animationLoop);


