//This file runs in the background, and we use it to detect changes/manipulations in the browser, and manually refresh by clicking the program icon if needed.
console.log("Background is running"); //Console log to display that our vackground extension is running

//Function below runs the program when you click the logo - browseraction
chrome.browserAction.onClicked.addListener(function (tab) { //listener detecting if the logo button is clicked
  var msg = "true"; //message to be send to the content.js
  chrome.tabs.sendMessage(tab.id, msg);//Sends message to tabs so content.js can read it
});

//Function below runs the program when it detects url changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { //Listener listening for updates on the url
  var msg = "true"; //message to be send to the content.js
  chrome.tabs.sendMessage(tab.id, msg); //Sends message to tabs so content.js can read it
});
