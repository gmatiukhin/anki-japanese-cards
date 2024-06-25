var ktor = new Map([
// vowels
["あ","a"], ["い","i"], ["う","u"], ["え","e"], ["お","o"],
["ア","a"], ["イ","i"], ["ウ","u"], ["ェ","e"], ["オ","o"],

// k
["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
// s
["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
// t
["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],

// n
["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
// h
["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ノ","ho"],
// m
["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
// y
["や","ya"],            ["ゆ","yu"],           ["よ","yo"],
["ヤ","ya"],            ["ユ","yu"],           ["オ","yo"],
// r
["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
// w
["わ","wa"],            ["を","wo"],           ["ん","nn"],
["ワ","wa"],            ["ヲ","wo"],           ["ン","nn"],

// dakuten
// g
["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
// z
["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
// d
["だ","da"],["ぢ","di"],["づ","du"],["で","de"],["ど","do"],
["ダ","da"],["ヂ","di"],["ヅ","du"],["デ","de"],["ド","do"],
// b
["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],

// handakuten
// p
["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"],
["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"],

// stuff with ya, yu, yo
// k
["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],
["キャ","kya"],["ギュ","kyu"],["キオ","kyo"],
// sh
["しゃ","sha"],["しゅ","shu"],["しょ","sho"],
["シャ","sha"],["シュ","shu"],["ショ","sho"],
// ch
["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],
["チャ","cha"],["チュ","chu"],["チョ","cho"],
// n
["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],
["ニャ","nya"],["ニュ","nyu"],["ミョ","nyo"],
// h
["みゃ","hya"],["みゅ","hyu"],["みょ","hyo"],
["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],
// m
["りゃ","mya"],["りゅ","myu"],["りょ","myo"], 
["ミャ","mya"],["ミュ","myu"],["ミョ","myo"], 
// dakuten
// g
["ぐあ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],
["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"],
// j
["じゃ","ja"],["じゅ","ju"],["じょ","jo"],
["ジャ","ja"],["ジュ","ju"],["ジョ","jo"],
// b
["びゃ","bya"], ["びゅ","byu"],["びょ","byo"],
["ビャ","bya"], ["ビュ","byu"],["ビョ","byo"],

// handakuten
// p
["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"],
["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"],
]);

var y_small = ["ゃ", "ゅ", "ょ", "ャ", "ュ", "ョ"];
var xtu = ["っ", "ッ"];
var katakanaLong = "ー";

function createMoraElement(sym) {
	let cont = document.createElement("div");
	cont.classList.add("container");
	let k = document.createElement("div");
	k.classList.add("kana");
	
	k.appendChild(document.createTextNode(sym));
	let r = document.createElement("div");
	r.classList.add("romaji");

	let rom = ktor.get(sym);
	if (sym.length == 1 || rom != undefined) {
		let rom = ktor.get(sym);
		r.appendChild(document.createTextNode(rom));
	} else if (xtu.includes(sym[0])) {
		rom = ktor.get(sym[1]);
		r.appendChild(document.createTextNode(rom[0] + rom));
	} else if (sym.slice(-1) == katakanaLong) {
		rom = ktor.get(sym[0]);
		r.appendChild(document.createTextNode(rom + rom.slice(-1)));
	}
	k.classList.add(rom.slice(-1));

	cont.appendChild(k);
	cont.appendChild(r);

	return cont
}

function init() {
  var morae = [];
  var was_xtu = false;
  var front = document.getElementById("front");
  var kana = front.innerText;
  for (let i = 0; i < kana.length; i++) {
    var sym = kana[i];

    if (y_small.includes(sym) || sym == katakanaLong) {
      let mora = kana[i - 1] + sym;
      morae[morae.length - 1] = mora;
    } else if (xtu.includes(sym)) {
      was_xtu = true;
    } else if (was_xtu) {
      let mora = kana[i - 1] + sym;
      morae.push(mora);
      was_xtu = false;
    } else {
      morae.push(sym);
    }
  }

  front.innerText = ""
  morae.forEach((x) => font.appendChild(createMoraElement(x)));
}
