//変数spreadsheetに指定のスプレッドシートオブジェクトを取得します
var spreadsheet = SpreadsheetApp.openById("1oYowkf9MWtgNo666DicxhENR1cDZsfSVLkpE74FTvXQ");

//JSONのURL
var fb_url = "https://graph.facebook.com/v3.0/";
var access_token ="EAACEdEose0cBAOvBgTO7ZBdvSWNp3hROA4XIXATVUb9cnlOPwSXl9ZBuWFTqnn4fjTowR9CXpvNA44t1zNC21ZATGCe5beMcuWA7EczGWRiUQSGh0m6X84uvbK3v2XXiZAoBqaxoYpvYsSzZBaGUZAu9RXDxDDZCkXAOnRkZBlnfxsyvTsNNtQ2INJxNgVv4P5NDAuwckYN38gZDZD";

var limit = 100;
var after = "";
var api_loop = 50;

var spot_data = {
  "IOP": {
    "fb_path": "izuoceanicpark",
    "sheet_name": "IOP"
  },
  "Futo": {
    "fb_path": "FutoDS",
    "sheet_name": "富戸"
  },
  "Akazawa": {
    "fb_path": "akazawa.dc",
    "sheet_name": "赤沢"
  },  
  "Atagawa": {
    "fb_path": "atagawadive",
    "sheet_name": "熱川"
  },  
  "Kumomi": {
    "fb_path": "collinsdc",
    "sheet_name": "雲見"
  },  
  "Hayama": {
    "fb_path": "hayamads",
    "sheet_name": "葉山"
  },  
  "Jogashima": {
    "fb_path": "jdc.kaikyou",
    "sheet_name": "城ヶ島"
  },  
  "Izuohshima": {
    "fb_path": "arima.idc",
    "sheet_name": "伊豆大島"
  },  
};



// スポット別にjsonから必要な値を取得する関数
function getNum(msg, start_word, end_word, type) {    
  var start_pos = msg.indexOf(start_word);
  var end_pos = msg.indexOf(end_word, start_pos);
  var str = zenNum2HanNum(msg.substr(start_pos , end_pos - start_pos)).trim();
  var num = str.match(/[0-9]+\.?[0-9]*/g);
  
  // テスト時に必要なログ

  Logger.log("start_word: " + start_word);
  Logger.log("end_word: " + end_word);
  Logger.log("start_pos: " + start_pos);
  Logger.log("end_pos: " + end_pos);
  Logger.log("str: " + str);
  Logger.log("num: " + num);

  
  
  // 取得した値の正規化
  if (num == null) {
    return null;
  }
  if (num.length == 1) {
    return num;
  } else if (num.length == 2) { 
    if (type == "min") {
      return parseInt(num[0]); // 最小値を取得する
    } else if (type == "avg") {
      return (parseInt(num[0]) + parseInt(num[1])) / 2;  // 平均値を取得する        
    }
  } else {
    return null;
  }
}

// 数値を半角数字に変更する関数
function zenNum2HanNum(num) {
  var z = ["０","１","２","３","４","５","６","７","８","９"];
  for(var i=0; i<10; i++) num = num.replace(new RegExp(z[i],"g"), i);
  return num;
}
