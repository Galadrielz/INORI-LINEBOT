var exports = module.exports = {};
const fs = require('fs');
//const upfile = require('formidable');
//var GoogleSearch = require('google-search');


/*
var googleSearch = new GoogleSearch({
  key: '',
  cx: ''
});
 
googleSearch.build({
  q: "inori",
  start: 5,
  fileType: "pdf",
  num: 10, // Number of search results to return between 1 and 10, inclusive
  siteSearch: "https://www.google.co.id/?hl=id" // Restricts results to URLs from a specified site
}, function(error, response) {
  console.log(response);
});
*/




exports.masukPR = function(eventMsgText,event,client,reqProfile,replyText){
  let keyword = eventMsgText.substring(11);
  let input = "";
  let offsetData = 0;
  if(keyword.length < 3)return client.replyMessage(event.replyToken, replyText("keyword minimal 3 kata untuk mencegah bug"));
  
  let readData = fs.readFileSync("dataNote.json","utf8");
  let readDataObj = JSON.parse(readData);
  let subj = reqProfile.userId;

  for(let i = 0;i < readDataObj.data.length; i++){
    if(offsetData == 2){
       break; 
    }
    if(readDataObj.data[i].user == subj && readDataObj.data[i].isi == keyword){ 
        offsetData = 1;
        break;
     }
    if(i == readDataObj.data.length - 1 && offsetData !== 1){
       for(let k = 0; k < readDataObj.data.length; i++){
          if(readDataObj.data[k] == '{}'){
             offsetData = 2;
             readDataObj.data[k].user = subj;
             readDataObj.data[k].isi = keyword;
             break;
          }
          if(k == readDataObj.data.length - 1 && offsetData !== 2){
              offsetData = 2;
              readDataObj.data[k + 1] = JSON.parse('{}');
              readDataObj.data[k + 1].user = subj;
              readDataObj.data[k + 1].isi = keyword;
              break;
          }
       }
    }
  }
  if(offsetData == 1){
    return client.replyMessage(event.replyToken, replyText("Already Noted ^^"));
  }else{
    input = JSON.stringify(readDataObj);
    fs.writeFile('./dataNote.json',input,'utf8',function(err){
      if(err){
         console.log(err);
      }else{
        return client.replyMessage(event.replyToken, replyText("Success ^.^"));
      }
    });
  }
}



exports.hpsNote = function(eventMsgText,event,client,reqProfile,replyText){
  let offset = 0;
  let input = "";
  let keyword = eventMsgText.substring(17); 
  let readData = fs.readFileSync("dataNote.json","utf8");
  let readDataObj = JSON.parse(readData);
  readData = JSON.stringify(readDataObj);
  let subj = reqProfile.userId;
  
  for(let i = 0; i < readDataObj.data.length;i++){
    if(readDataObj.data[i].user == subj && readDataObj.data[i].isi.includes(keyword)){
      readDataObj.data[i] = '{}';
      input = JSON.stringify(readDataObj);
      offset = 1;
      break;
    }
    if(i == readDataObj.data.length - 1)input = readData;
  }
      fs.writeFile('./dataNote.json',input,'utf8',function(err){
        if(err){
          console.log(err);
        }else{
          if(offset !== 1){
             return client.replyMessage(event.replyToken, replyText("No \"" + keyword + "\" in your ID " + subj +" data, Ty"));
          }else{
              return client.replyMessage(event.replyToken, replyText("Success ^.^"));
          }
        }
      });
  
}
  
  
exports.jadwalMapel = function(eventMsgText,event,client,reqProfile,replyText,offset,hari,outputHari){
  let i;
  let output = "";
  let keyword = eventMsgText.substring(12);
  let adPr = "";
  let offset1 = 0;

  const senin = ["Kimia","Kimia","Mtk Wajib","Mtk wajib","Istirahat ^^","Bhs Inggris","Bhs Inggris","Bhs Jawa","Istirahat ^^","Biologi","Biologi","Otsukaresama-desu ^^"];
  const selasa = ["Olahraga","Olahraga","Olahraga","PKN","Istirahat ^^","Bhs Indonesia","Bhs Indonesia","Agama","Istirahat ^^","Sejarah","Prakarya","Prakarya","Otsukaresama-desu ^^"];
  const rabu = ["Mtk Wajib","Mtk Wajib","Ekonomi","Ekonomi","Istirahat ^^","Fisika","Fisika","Bhs Jawa","Istirahat ^^","Kimia","Kimia","Senbud","Otsukaresamaa-desu ^^"];
  const kamis = ["Mtk Peminatan","Mtk Peminatan","Biologi","Biologi","Istirahat ^^","Sejarah","Ekonomi","Ekonomi","Istirahat ^^","Bhs Indonesia","Bhs Indonesia","Otsukaresama-desu ^^"];
  const jumat = ["Fisika","Fisika","PKN","Seni Budaya","Istirahat ^^","Agama","Agama","Istirahat","Mtk Peminatan","Mtk Peminatan","Otsukaresama-desu ^.^","Have a nice day ^3^"];
  
  
  if(keyword.includes("bes")){
    offset += 1;   if(offset > 6){ 
                       offset -= 6;
                     }
     outputHari = hari[offset];
     keyword = outputHari;
     keyword = keyword.toLowerCase();
  }
  if(keyword.length == 0){
    keyword = outputHari;
    keyword = keyword.toLowerCase();
  }
  if(keyword.includes("sen")){
    keyword = senin;
  }
  if(keyword.includes("sel")){
    keyword = selasa;
  }
  if(keyword.includes("rab")){
    keyword = rabu;
  }
  if(keyword.includes("kam")){
    keyword = kamis;
  }
  if(keyword.includes("jum")){
    keyword = jumat;
  }
 
  for(i in keyword){
    output += " ~> " + keyword[i] + "\n";    
  }
  output += " \n\t\t\t ^ 3 ^  \n";
  
  let readData = fs.readFileSync("dataNote.json","utf8");
  let readDataObj = JSON.parse(readData);
  readData = JSON.stringify(readDataObj);
  let subj = reqProfile.userId;
  
  for(i = 0; i < readDataObj.data.length; i++){
    if(readDataObj.data[i].user == subj){
      if(readDataObj.data[i].isi.indexOf("pr") < 3 && readDataObj.data[i].isi.indexOf("pr") !== -1){
        adPr += "Adha PR, ~> "+ readDataObj.data[i].isi +"\n";
        offset1 = 1;
      }
      else if(readDataObj.data[i].isi.indexOf("ulangan") < 8 && readDataObj.data[i].isi.indexOf("ulangan") !== -1){
        adPr += "Adha Ulangan, ~>" + readDataObj.data[i].isi + "\n"; 
        offset1 = 1;
      }else{
        adPr += "Adha Note, ~>" + readDataObj.data[i].isi + "\n"; 
        offset1 = 1;
      }
    }else{
      offset1 = 0;
    }
  }
  
  if(readDataObj.data.length == 0)adPr += "Your Id's note is empty\n Thanks for using my Bot hehe";
  if(offset1 == 0)adPr += "Your Id's note is empty\n Thanks for using my Bot hehe";
  adPr += "\n\t\t\t ^ 3 ^ ";
  output += adPr;
  return client.replyMessage(event.replyToken, replyText(output));
  
}


exports.googleTranslate = function(eventMsgText,event,client,translateg,replyText){ 
  let keyword = event.message.text.substring(15);
  let text = keyword.slice(1, keyword.indexOf("=>") - 1);
  let tujuan = keyword.substring(keyword.indexOf("=>") + 3);
  
  if(tujuan.length <= 6){
    translateg(text, { from:tujuan.slice(0,tujuan.indexOf("-")), to:tujuan.substring(tujuan.indexOf("-")+ 1) }).then( res =>{
      let hasil = res.text + "";
      let hasilfin = hasil.charAt(0).toUpperCase();
      let hasilfinal = hasilfin + hasil.substring(1);
      return client.replyMessage(event.replyToken, replyText("Result =\n\n" + hasilfinal + "\n\nPowered By Google Translate"));                                                
    })
  }
  if(tujuan.length > 6){ 
      return client.replyMessage(event.replyToken, replyText("Azerbaijan => az\nMalayalam => ml\nAlbanian => sq\nMaltese => mt\nAmharic => am\nMacedonian => mk\nEnglish => en\nMaori	=> mi\nArabic => ar\nMarathi => mr\nArmenian => hy\nMari => mhr\nAfrikaans => af\nMongolian => mn\nBasque => eu\nGerman => de\nBashkir => ba\nNepali => ne\nBelarusian => be\nNorwegian => no\nBengali => bn \nPunjabi => pa\nBurmese => my\nPapiamento => pap\nBulgarian => bg\nPersian => fa\nBosnian => bs\nPolish => pl\nWelsh => cy\nPortuguese => pt\nHungarian => hu\nRomanian => ro\nVietnamese => vi\nRussian => ru\nHaitian(Creole) => ht\nCebuano => ceb\nGalician => gl\nSerbian	=> sr\nDutch => nl\nSinhala => si\nHill Mari => mrj\nSlovakian => sk\nGreek => el\nSlovenian => sl\nGeorgian => ka\nSwahili => sw\nGujarati => gu\nSundanese => su\nDanish => da\nTajik => tg\nHebrew => he\nThailand => th\nYiddish => yi\nTagalog => tl\nIndonesian => id\nTamil => ta\nIrish => ga\nTatar => tt\nItalian => it\nTelugu => te\nIcelandic => is\nTurkish => tr \nSpanish => es\nUdmurt => udm\nKazakh => kk\nUzbek => uz\nKannada => kn\nUkrainian => uk\nCatalan => ca\nUrdu => ur\nKyrgyz => ky\nFinnish => fi\nChinese => zh\nFrench => fr\nKorean => ko\nHindi => hi\nXhosa => xh\nCroatian => hr\nKhmer => km\nCzech => cs\nLaotian => lo\nSwedish => sv\nLatin => la\nScottish => gd\nLatvian => lv\nEstonian => et\nLithuanian => lt\nEsperanto => eo\nLuxembourgish => lb\nJawa => jv\nMalagasy => mg\nJapanese => ja\nMalay => ms	\nAbis.."));
  }
}

exports.animeQuote = function(client, replyText, event){ 
  
  let readData = fs.readFileSync("data.json","utf8");
  let readDataObj = JSON.parse(readData);
  readData = JSON.stringify(readDataObj);
  
  var random_number = Math.floor(Math.random() * readDataObj.anime_quote.length);
  return client.replyMessage(event.replyToken, replyText("\""+readDataObj.anime_quote[random_number].quotesentence +"\"\n\nBy:"+readDataObj.anime_quote[random_number].quotecharacter +"\nFrom: "+ readDataObj.anime_quote[random_number].quoteanime));
}





exports.ontranslate = function(eventMsgText,event,client,reqProfile,replyText){
  let readDataObj = JSON.parse(fs.readFileSync("dataNote.json","utf8"));
  let offset = 0;
  let userId = reqProfile.userId;
  
  if(userId == 'undefined'){return client.replyMessage(event.replyToken, replyText("Sorry your line id is undefined, please use valid line apk from playstore or register id"))}
  
  for(let i = 0; i < readDataObj.transdat.length;i++){
   if(readDataObj.transdat[i].user == userId){
      offset = 1;
      break;
    }
  }
  
  if(offset == 1){return client.replyMessage(event.replyToken, replyText("Sorry, Already Active XD"))}
  offset = 0;
  
  let data = {user : userId };
  
   for(let i = 0; i < readDataObj.transdat.length;i++){
     if(readDataObj.transdat[i] == '{}'){
        readDataObj.transdat[i] = data;
        offset = 1;
        break;
      }
    }
   if(offset == 0){ 
     readDataObj.transdat[readDataObj.transdat.length] = data;
   }  
  
  fs.writeFileSync("dataNote.json",JSON.stringify(readDataObj),"utf8");
  if(reqProfile.userId !== "U89fbd2cbd5f0ba51d0f320346796249b"){
    return client.replyMessage(event.replyToken, replyText("Success ^^\nthanks for using my bot hehe"));
  }else{
    return client.replyMessage(event.replyToken, replyText("Success Darling\nI Love U ^ 3 ^"));
  }
}




exports.offtranslate = function(eventMsgText,event,client,reqProfile,replyText){
  let userId = reqProfile.userId;
  let offset = 0;
   let readDataObj = JSON.parse(fs.readFileSync("dataNote.json","utf8"));
  
  if(userId == 'undefined'){return client.replyMessage(event.replyToken, replyText("Sorry your line id is undefined, please use valid line apk from playstore or register id"))}
  
  for(let i = 0; i < readDataObj.transdat.length; i++){
    if(readDataObj.transdat[i].user == userId){
      readDataObj.transdat[i] = '{}';
      offset = 1;
      break;
    }
  }

  if(offset == 0){  /* if there is any change on data */
    return client.replyMessage(event.replyToken, replyText("Translate mode is not active"));               
  }
  fs.writeFileSync("dataNote.json",JSON.stringify(readDataObj),"utf8");
  if(reqProfile.userId !== "U89fbd2cbd5f0ba51d0f320346796249b"){
    return client.replyMessage(event.replyToken, replyText("Success ^^\nthanks for using my bot hehe"));
  }else{
    return client.replyMessage(event.replyToken, replyText("Success Darling\nI Love U ^ 3 ^"));
  }
}

exports.gSearch = function(eventMsgText,event,client,reqProfile,replyText){
  var keyword = eventMsgText.substring(13);
  
  
  
  
}


