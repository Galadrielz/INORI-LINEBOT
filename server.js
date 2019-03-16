const fs = require('fs'); //read or write or even it can append(update) file hehe
const util = require('util'); // setTimeout ,etc check documentation nodejs
const upfile = require('formidable'); //upload file etc check documentation nodejs
const line = require('@line/bot-sdk'); // from line
const express = require('express');
const axios = require('axios');
const config = {
  channelAccessToken: "<YOUR CHANNEL ACCESS TOKEN>",
  channelSecret: "<YOUR CHANNEL SECRET>",
};
const ai = require("./AI.js");
const func = require('./func.js');

// LINE sdk client
const client = new line.Client(config);
const os = require("os");
const app = express();
const XMLHttpRequest = require("xhr2");

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err)=>{
      console.log(err);
    });

}); 
var gis = require('g-i-s');
//const translateg = require('google-translate-api'); // this proxy got banned, fck -__-"
const translateg = require('@k3rn31p4nic/google-translate-api');


// NOTE:API ETC ADA DI mylongData.js, export menggunakan node.js
//globaltunnel

var start = Date.now();

//============================================================================VARIABEL
  var inoriLeaveImg = "https://i.pinimg.com/736x/bb/32/5b/bb325b37fdf18d3b9ebcff8a762d0a76--crowns-anime-pictures.jpg"
  var inoriAndMeImg = "https://i.pinimg.com/736x/f7/e1/a4/f7e1a482a7131af71a4dbc61a640c458.jpg"
  let eventMsgText;
  let hasil = 1;
  var url = "myData.json"            // REGEXP (space included \s)
  const regexSpace = /[\s]/g;
  const regExp = /[a-zA-Z0-9!#%*•,-/\:;$\&\n\s\+\(\)\"\'~\`\|√π÷×∆£¢€¥\^°\=©®™\℅\<\>?@\[-\]_\{\}]/g;
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let tanggal = date.getDate();
  let offset = date.getDay();
  let jam = date.getHours() + 7; if(jam > 24){
                                   jam -= 24;
                                   tanggal += 1;
                                   offset += 1;
                                   if(offset > 6){ 
                                     offset -= 7;
                                    }
                                  };
  let menit = date.getMinutes();  if(menit < 10){
                                    menit = "0" + menit;
                                  };
  var hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  let outputHari = hari[offset];
    
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!FUNCTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function replyText(rtext) {
    return {
      type: "text",
      text: rtext
    };
  }

  function replyImg(originalContent, thumbnail) {
    return {
      type: "image",
      originalContentUrl: originalContent,
      previewImageUrl: thumbnail
    };
  }
function replyKeyword() {
    return {
      "type": "template",
      "altText": "Keyword",
      "template": {
          "type": "buttons",
          "title": "Keyword",
          "text": "KEYWORD INORIBOT",
          "actions": [
              {
                "type": "message",
                "label": "Keyword",
                "text": "Inori keyword"
              },
            {
              "type":"message",
              "label":"PERKENALAN",
              "text":"Inori perkenalkan dirimu"
            },
              {
                "type": "uri",
                "label": "Developer",
                "uri": "http://line.me/ti/p/~gy76vtr"
              }
          ]
      }
    };
  }
 
//-------------------------------------------------------------LINE EVENT------------------------------------------------------------------------------------------------------------


function handleEvent(event) {      
  
    //~~~~~~~~~>>>SETUP<<~~~~~~~~~~~~~~~~~~~~~
  var source = event.source.type;
  const reqProfile = {
     "userId": event.source.userId,
     "groupId": event.source.groupId || null,
     "roomId": event.source.roomId || null
  }
  var userProfile = client.getProfile(reqProfile.userId);
  
  // ~~~~~~~~~~~~~~~~>>>handle event ^^<<<~~~~~~~~~~~~~~~~~~~~
  
  if(event.type == 'join'){
    return client.replyMessage(event.replyToken, replyText("Terima kasih telah mengundang bot ini ^^\n\silahkan ketik \"inori keyword list\" untuk melihat keyword dan perkenalan"));
  }else{
    let msg = event.message.text;
    eventMsgText = msg.toLowerCase();
    let clearspace = msg.replace(/\s+/g, '');
    let spacelength = msg.length - clearspace.length;
    let match;
    let transdatOffset;
   
    if(!eventMsgText.includes("inori")){  //translate
      
      
      let readDataObj = JSON.parse(fs.readFileSync("dataNote.json","utf8"));
      if(readDataObj.transdat.length == 0){
        transdatOffset = 0; 
      }else{
        for(let i = 0; i < readDataObj.transdat.length; i++){
          if(readDataObj.transdat[i].user == reqProfile.userId){
             translateg(msg, {to:"id"}).then( res =>{/* translate i only accept japan and english for this*/
               
               var language = res.from.language.iso;
               if(language == 'ja' || language == 'en'){  
                 return client.replyMessage(event.replyToken, replyText(res.text));
               }
               
               transdatOffset = 0;
             }).catch(err => {
                 console.log(err);
                 return client.replyMessage(event.replyToken, replyText("Sorry, translate API is under maintenance, please wait and use again later :v"));
             });
            
             break;
          }
        }
      }
    }
 
  
  
    if(eventMsgText.includes("inori")){
      if(reqProfile.userId !== ("U89fbd2cbd5f0ba51d0f320346796249b")){
        let keyword = event.message.text;
        let input = "";
        let offsetData;
        let subj = reqProfile.userId;
        let i;
        let readData = fs.readFileSync("keylog.json","utf8");
        let readDataObj = JSON.parse(readData);
        readData = JSON.stringify(readDataObj);
        offsetData = readData.slice(0,readData.indexOf("]}"));
        if(readDataObj.data.length == 0){
          input = offsetData + "{ \"user\" : "+JSON.stringify(subj)+",\n \"isi\":"+JSON.stringify(keyword)+"\n}]}";
        }else{
          input = offsetData + ",{ \"user\" : "+JSON.stringify(subj)+",\n \"isi\":"+JSON.stringify(keyword)+"\n}]}";    
        }
          fs.writeFileSync('./keylog.json',input,'utf8');
      }
    }
  
    //======================================================================================================================================================================================
    if(eventMsgText == ("afk")){
      if(reqProfile.userId == ("U89fbd2cbd5f0ba51d0f320346796249b")){
        hasil = 0;
        return client.replyMessage(event.replyToken, replyText("Oke darling"));
      }
    }
    else if(eventMsgText == ("im back")){
      if(reqProfile.userId == ("U89fbd2cbd5f0ba51d0f320346796249b")){
        hasil = 1;
				return client.replyMessage(event.replyToken, replyText("Welcome back my Dearest!!^^"));
        }
    }
    //==========================================================================================================================================================================================
    if(eventMsgText == ("dar")){
       if (hasil == 0){
         return client.replyMessage(event.replyToken, replyText("Gomen nee, my darling lagi sibuk, mungkin lagi tidur, main game atau coli mungkin :v, klo penting nanti aja ya, ty^^"));
       }
    }
    else if(eventMsgText.includes("darta")){
      if (hasil == 0){
        return client.replyMessage(event.replyToken, replyText("Gomen nee, my darling lagi sibuk, mungkin lagi tidur, main game atau coli mungkin :v, klo penting nanti aja ya, ty^^"));
      }
    }
    //===================================================================================================================================================================================
    if(eventMsgText == ("inori tanggal brp skrg?")){
      return client.replyMessage(event.replyToken, replyText( year + " - " + month + " - " + tanggal + " / " + jam + ":" + menit +"\n    Hari = " + outputHari +" \n ~> GMT+7.00 ^^ "));
    }
    if(eventMsgText.includes("inori my permission msg")){
      return client.replyMessage(event.replyToken, replyText("Hi, I really like your art, I am actually a programmer and I am making my own site, I am impressed with your art, I will be very happy if you allow me to use this image on my site. thank you"));
    }
                                                                                                                                                                                                  
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>INTRO/KEYWORD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    else if(eventMsgText == ("hai inori")){
      if(reqProfile.userId == ("U89fbd2cbd5f0ba51d0f320346796249b")){
        return client.replyMessage(event.replyToken, replyText("Hai Sayangkuuuuuu^^\n\Boku no Darling :3"))
      }else {         
        return userProfile.then(profile => client.replyMessage(event.replyToken, replyText("Hai.." + profile.displayName + "^.^")))
      }
    }                                                                                                    
    else if(eventMsgText == ("inori")) {
      if (reqProfile.userId !== ("U89fbd2cbd5f0ba51d0f320346796249b")){
        let echo = ["N-nani ", "Ya ", "Ada apa " , "Yes, sir "];
        let resultEcho = Math.floor(Math.random() * echo.length);
        return userProfile.then(profile => client.replyMessage(event.replyToken, replyText(echo[resultEcho] + profile.displayName + "??")));
      }
      if (reqProfile.userId == ("U89fbd2cbd5f0ba51d0f320346796249b")){
        let echo = ["Yes, darling?", "N-nani, darling?", "Ada apa Sayangku?", "Iya, my Dearest?"];
        let resultEcho = Math.floor(Math.random() * echo.length);
        return client.replyMessage(event.replyToken, replyText(echo[resultEcho]))
      }
    }
      //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if(eventMsgText ===("inori keyword list")){
      return client.replyMessage(event.replyToken, replyKeyword());
    }
                                                       //NOTE{KEYWORD ADA DI DEVELOPER LINE, BELUM DIGANTI}
      
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HIBURAN, {DADU, BAKA, SPAM, RAMAL DLL.}
    else if(eventMsgText.includes("darling, cari gambar kita") || eventMsgText.includes("inori cari gambar kita") || eventMsgText.includes("darling cari gambar kita")){ 
      if(reqProfile.userId == ("U89fbd2cbd5f0ba51d0f320346796249b")){
        return client.replyMessage(event.replyToken,[replyText("Okay Darling hehe^^"), replyImg(inoriAndMeImg, inoriAndMeImg)]);
      }                                                       
      else if(reqProfile.userId !== ("U89fbd2cbd5f0ba51d0f320346796249b")){
        return client.replyMessage(event.replyToken, replyText("Who are u?"));                                                     
      }
    }  
        //----------------------------------------------------------------------------------------------------------------------------------
																																																	 
    else if(eventMsgText == ("inori kocok dadu")){
      var dadu = ["1 !!","2 !!",
                  "3 !!","4 !!",
                  "5 !!","6 !!"
                 ];   
      let myRandom = Math.floor(Math.random() * dadu.length);
      return client.replyMessage(event.replyToken, replyText("OK ^.^, Hasilnya adalaahhh: " + dadu[myRandom])); 
    }
  
      //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if (eventMsgText.includes ("inori spam")){     
			let echo = {type:'text', text:"Spam"};
      let keyword = event.message.text.substring(12);
      return client.replyMessage(event.replyToken, [echo,echo,echo,echo,echo]);                  
    }
    else if(eventMsgText.includes ("inori medium spam")){
		  let echo = {type:'text', text:"Spam\n\Spam\n\Spam\n\Spam\n\Spam\n\Spam\n\Spam\n\Spam\n\Spam\n\Spam"};
      let keyword = event.message.text.substring(12);
      return client.replyMessage(event.replyToken, [echo,echo,echo,echo,echo]);  
    }
    else if(eventMsgText==("inori max spam")){  
      if(reqProfile.groupId == ("Caa294118593cca4a1ed633ec86189f8a")){
        return client.replyMessage(event.replyToken, replyText("Hus saru, gaboleh spam banyak2 :v"))
      }
      else if(reqProfile.groupId !== ("Caa294118593cca4a1ed633ec86189f8a")){
        let echo = {type:'text', text:"s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m\n\s\n\p\n\a\n\m"}
        let keyword = event.message.text.substring(12);
        return client.replyMessage(event.replyToken, [echo,echo,echo,echo,echo]);  
      }
    }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                              
    else if(eventMsgText == ("inori ramal")){
      let ramal = [
        "Hari ini adalah hari tersial mu!",
        "Nanti pasti kamu akan tidur",
        "Hari ini mungkin kamu akan bertemu jodohmu",
        "Tiada yang lebih baik dari hari ini bagimu",
        "Hari ini mungkin hari adalah hari terindahmu",
        "Hari ini mungkin hari terakhirmu",
        "Hari ini adalah hari terburukmu"
      ];
      let ramalRand = Math.round(Math.random() * ramal.length);
      return client.replyMessage(event.replyToken, replyText(ramal[ramalRand]));
    }
  
    else if(eventMsgText == ("inori ramal buat besok")){             
      let ramal = [
        "Besok adalah hari tersial mu! ^^ ",
        "Besok malam pasti kamu akan tidur",
        "Besok mungkin kamu akan bertemu jodohmu",
        "Tiada yang lebih baik dari hari esok bagimu",
        "Besok mungkin hari terakhirmu ^.^",
        "Besok mungkin hari terakhirmu ^.^",
        "Besok adalah hari terburukmu",
        "Besok adalahh hari yang baik untukmu",
        "Besok adalah hari terindah mu ^.^"
      ];
      let ramalRand = Math.round(Math.random() * ramal.length);
      let echo = { type: 'text', text: ramal[ramalRand] }
      return client.replyMessage(event.replyToken, echo);            
    }
    //- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if(eventMsgText == ("inori anime quote")){                             
      return func.animeQuote(client, replyText, event);
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if(eventMsgText.includes ("inori baka") || eventMsgText.includes ("inori goblok") || eventMsgText.includes ("inori tolol")) {
      return client.replyMessage(event.replyToken, replyText("Evernest yang goblok :v"));
    }  
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FUNCTION,{STRING, DLL}<<<
    else if(eventMsgText.includes ("inori cek id group")) {
      return client.replyMessage(event.replyToken, replyText(reqProfile.groupId));
    }
   
     //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if(eventMsgText.includes("inori unlink")){
      if(reqProfile.userId == "U89fbd2cbd5f0ba51d0f320346796249b" ){
        let input = "{\"data\":[]}";
        fs.writeFile("./keylog.json",input,'utf8',function(err){
           if(err){
             return client.replyMessage(event.replyToken, replyText(err.toString()));
           }else{
             return client.replyMessage(event.replyToken, replyText("Success"));
           }
        });
         }else{
          return client.replyMessage(event.replyToken, replyText("Only Admin Ty"));  
         }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if(eventMsgText == "inori read"){
      if(reqProfile.userId == "U89fbd2cbd5f0ba51d0f320346796249b" ){
        let readData = fs.readFileSync("dataNote.json","utf8");
        let readDataObj = JSON.parse(readData);
        readData = JSON.stringify(readDataObj);
        readData = readData.substring(readData.indexOf("}],") + 3);
        return client.replyMessage(event.replyToken, replyText(readData));
      }else{
        return client.replyMessage(event.replyToken, replyText("Only Admin Ty"));
      }
    }
    else if(eventMsgText == "inori read keyword"){
      if(reqProfile.userId == "U89fbd2cbd5f0ba51d0f320346796249b" ){
        let readData = fs.readFileSync("keylog.json","utf8");
        let readDataObj = JSON.parse(readData);
        readData = JSON.stringify(readDataObj);
        return client.replyMessage(event.replyToken, replyText(readData));
      }else{
        return client.replyMessage(event.replyToken, replyText("Only Admin Ty"));
      }
    }
    else if(eventMsgText == "inori read translate"){
      if(reqProfile.userId == "U89fbd2cbd5f0ba51d0f320346796249b" ){
        let readData = fs.readFileSync("dataNote.json","utf8");
        let readDataObj = JSON.parse(readData);
        readData = JSON.stringify(readDataObj);
        return client.replyMessage(event.replyToken, replyText(JSON.stringify(readDataObj.transdat)));
      }else{
        return client.replyMessage(event.replyToken, replyText("Only Admin Ty"));
      }
    }
    else if(eventMsgText == "inori liat note"){
      
      let adPr = "~>~>~>Your Note: <~<~<~\n\n";
      let offset1;
      let readData = fs.readFileSync("dataNote.json","utf8");
      let readDataObj = JSON.parse(readData);
      readData = JSON.stringify(readDataObj);
      var subj = reqProfile.userId;
      for(let i = 0; i < readDataObj.data.length; i++){
      if(readDataObj.data[i].user == subj){
        if(readDataObj.data[i].isi.indexOf("pr") < 3 && readDataObj.data[i].isi.indexOf("pr") !== -1){
          adPr += "Adha PR, ~> "+ readDataObj.data[i].isi +"\n";
          offset1 = 1;
        }
        else if(readDataObj.data[i].isi.indexOf("ulangan") < 8 && readDataObj.data[i].isi.indexOf("ulangan") !== -1){
          adPr += "Adha Ulangan, ~> " + readDataObj.data[i].isi + "\n"; 
          offset1 = 1;
        }else{
          adPr += "Adha Note, ~> " + readDataObj.data[i].isi + "\n"; 
          offset1 = 1;
        }
      }else{
        offset1 = 0;
      }
    }
    if(offset1 == 0)adPr += "Your ID's note is empty, Thanks for using my Bot ^_^";
    adPr += "\t\t\t^\t3\t^";
    return client.replyMessage(event.replyToken, replyText(adPr));  
  }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                       
    else if(eventMsgText.includes("inori test length")) { 
      if(reqProfile.userId == ("U89fbd2cbd5f0ba51d0f320346796249b")){
        let keyword = event.message.text.substring(18); 
        let echo = ["Yes, Sayangkuu^^", "Okay Darling^^", "I love U darling^^"];
        let resultEcho = Math.floor(Math.random() * echo.length);
        let echo1 = "Result length = " + keyword.length;                                                                                                             
        return client.replyMessage(event.replyToken, replyText(echo[resultEcho] +"\n" + echo1));
      }
      else if(reqProfile.userId !== ("U89fbd2cbd5f0ba51d0f320346796249b")){
        let echo = ["Gomen nee anata nee not my Darling ^^", "You're not my DARLING!", "Just for my DARLING", "Gomen nee"];
        let resultEcho = Math.floor(Math.random() * echo.length);
        return client.replyMessage(event.replyToken, replyText(echo[resultEcho]));
      }
    }                                                                                               
    else if(eventMsgText.includes("inori bilang")){
      let keyword = event.message.text.substring(13);
      let echo3 = ["Evernest Sayangkuu ^.^", "Darta Sayangkuu ^.^"];
      let myRand = Math.floor(Math.random() * echo3.length);
      if(keyword.length <= 0) {
        return client.replyMessage(event.replyToken, replyText("Bilang apa??"));
      }
      else if(keyword.includes("cinta")||keyword.includes("love")||keyword.includes("suka")||keyword.includes("sayang")||keyword.includes("syg")){
        return client.replyMessage(event.replyToken, replyText(echo3[myRand]));
      }
      else if(keyword.includes("o cen")||keyword.includes("husband")||keyword.includes("suami")||keyword.includes("darta")||keyword.includes("waifu")||keyword.includes("evernest")) {
        return client.replyMessage(event.replyToken, replyText(echo3[myRand]));
      }else{
        return client.replyMessage(event.replyToken, replyText(keyword));
      }
    }
        
    else if(eventMsgText.includes("inori balikkan")){
      let keyword = event.message.text.substring(15);
      if (keyword.length <= 0){
        return client.replyMessage(event.replyToken, replyText("Balikkan apa?"));
      }                             
      var resultKeyword = "" ;
      for (let i = 0; i <= keyword.length; i++){
        resultKeyword += keyword.charAt(keyword.length - i);
      } 
      return client.replyMessage(event.replyToken, replyText(resultKeyword));
    }
                             //--------------
    else if(eventMsgText.includes("inori replace")){
     let keyword = event.message.text.substring(13) ;
     let reqKeyword = keyword.slice(1, keyword.indexOf("=>") -1);
     let keyword2 = keyword.substring(keyword.indexOf("dalam") + 6);
     let jadi = keyword.slice(keyword.indexOf("=>") +3, keyword.indexOf("dalam")-1);
     let reqKeywordfin = new RegExp(reqKeyword, 'g');
     let resKeyword = keyword2.replace(reqKeywordfin , jadi);
     return client.replyMessage(event.replyToken, replyText(resKeyword));
    }
                             //----------------
                             
    else if(eventMsgText.includes("inori translate")){
      func.googleTranslate(eventMsgText,event,client,translateg,replyText);
    }
      //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if(eventMsgText.includes("inori cari gambar")){
      let keyword = event.message.text.substring(18);
      function logResults(error, results) {
          if (error) {
            return client.replyMessage(event.replyToken, replyText("Image terlalu besar, silahkan coba lagi"));
          }else{
            let randomRes = Math.round(Math.random() * results.length);
            let reshasil = results[randomRes];
            let reshasilu = reshasil.url;
            return client.replyMessage(event.replyToken,replyImg(reshasilu,reshasilu));
          }
       }
        gis({searchTerm:keyword,
               queryStringAddition: '&safe=active&tbs=isz:m',
               filterOutDomains: ['google.com','i.redd.it','cloudfront.net','narvii.com','akamaihd.net',
                              'wattpad.com','img.fireden.net','vignette.wikia.nocookie.net',
                              'drawfolio.com','pbs.twimg.com','sirtaptap.com','static.tvtropes.org',
                              'tumblr.com','paigeeworld.com','photobucket.com','kontek.net','pinimg.com']
                }, logResults);
        }
    else if(eventMsgText.includes("inori mapel")){
      func.jadwalMapel(eventMsgText,event,client,reqProfile,replyText,offset,hari,outputHari);
    }
    else if(eventMsgText.includes("inori note")){
      func.masukPR(eventMsgText,event,client,reqProfile,replyText);
    }
    else if(eventMsgText.includes("inori hapus note")){
      func.hpsNote(eventMsgText,event,client,reqProfile,replyText);
    }
    
    else if(eventMsgText.includes("inori on translate")){
      func.ontranslate(eventMsgText,event,client,reqProfile,replyText);
    }
    else if(eventMsgText == ("inori off translate")){
      func.offtranslate(eventMsgText,event,client,reqProfile,replyText);
    }
    else if(eventMsgText.includes("inori browse")){
      func.gSearch(eventMsgText,event,client,reqProfile,replyText);
    }
    
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>evLibr.js copas high 
    
     //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>STUDY AI<<<
        
    else if(eventMsgText.includes("inori") && eventMsgText.includes("gunting batu kertas")){
      let i = 1;
      new Promise((resolve,reject) => {
        client.replyMessage(event.replyToken, replyText("Ok ^^, pada hitungan ketiga chat gunting/batu/kertas yaa.."));
        resolve(replyFirst);
      });
      
      function replyFirst(){
        if(i <= 2){
          setTimeout(replyFirst,1000);
        }
        client.replyMessage(event.replyToken, replyText(i));
        return i++;
      }
      
      if(i == 3){
        ai.RockScissorPaper(eventMsgText,event,client,reqProfile,replyText);
      }
    }
              
      //==============================================================================================================================================================================================                                                                                                                                                            
    else if(eventMsgText === ("bye inori")) {
      let echo = ["Ok..", "Bye - bye ", "Cya"];
      let resultEcho = Math.floor(Math.random() * echo.length);
      return client.replyMessage(event.replyToken, [replyText(echo[resultEcho]), replyImg(inoriLeaveImg, inoriLeaveImg)]).then(result => {    
        if (source === "room") {                                                                         
          client.leaveRoom(reqProfile.roomId);                     
          }
        else if (source === "group") {
          client.leaveGroup(reqProfile.groupId);
        }
      }).catch(err => {
        return client.replyMessage(event.replyToken, replyText("Leave keyword = ERROR \n\Silahkan kick bot melalui setting grup"));
      })
    }                                                 
  }
}



// listen on port
const port = 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);// ECMASCRIPT 7
});