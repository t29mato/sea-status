function getHayama() {
  // スクリプトの開始時刻 (スクリプトの実行時間測定用)
  var start = new Date();
  
  // spread sheetのシート設定
  var sheet = spreadsheet.getSheetByName(spot_data.Hayama.sheet_name);
  
  // ダイビングスポット別のAPI-URLの作成
  var fb_api_url = fb_url + spot_data.Hayama.fb_path + "/feed?access_token=" + access_token + "&limit=" + limit;
  var json_url = fb_api_url;
  
  // まとめてシートに転記用の配列を用意
  var arr_data = [];
  
  // FB-APIコールのループ
  for (var i = 0; i < api_loop; i++) {
    if (i > 0) {
      json_url = fb_api_url + "&after=" + jsonData.paging.cursors.after;
    }
    
    // FacebookAPIからデータから取得
    var json = UrlFetchApp.fetch(json_url);
    var jsonData = JSON.parse(json);
    
    // APIからのデータ数が0なら終了
    if (jsonData.data.length == 0) {
      break;
    }    
    
    // 取得したjsonデータをループで1レコードずつ処理
    for (var j = 0; j < jsonData.data.length; j++) {            
      
      // 記事情報にメッセージがあれば記事取得
      if (jsonData.data[j].message){
        msg = jsonData.data[j].message;
      } else {
        continue;
      }
      
      // データを配列に入れる
      var arr_tmp = [
        new Date(jsonData.data[j].created_time),
        getNum(msg, "水温", "度", "avg"),
        (getNum(msg, "透視度", "m", "min") != null) ? getNum(msg, "透視度", "m", "min") : getNum(msg, "透視度", "ｍ", "min"),
        msg
      ];
      
      // データを配列に追加
      arr_data.push(arr_tmp);
    }        
  }
  
  // 配列のデータをまとめてシートに転記
  sheet.getRange(2, 2, arr_data.length, arr_data[0].length).setValues(arr_data); 
  
  // スクリプトの終了時刻 (スクリプトの実行時間測定用)
  var end = new Date();
  
  // スクリプトの実行時間をログ出力
  Logger.log((end - start) / 1000);   
}