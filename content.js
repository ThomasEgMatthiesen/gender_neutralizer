//Our main portion of the program, the function that actually replaces text

console.log("Gender Neutralizer is running"); //Shows that our extension is running in the console.

//Listenser listening for messages from background.js if there are any changes on the page
chrome.runtime.onMessage.addListener(gotMessage); //While chrome is running listen for messages and run gotMessage function when it receives
//function made if message is recieved from background.js
function gotMessage(message, sender, sendResponse) { //sender/sendresponse/message is part of chrome syntaxes, only message is requierd for our extension
  if (message === "true") { //if the message is equal "true" the walk function is executed, to avoid any irrelevant messages from running it
    walk(document.body); //Document.body grabs the entire contents of the current page and runs it in the walk function
  }
}

//The function below was taken and adapted to our code from here: https://goo.gl/ZxfZ3f

function walk(node) { //a function containing the content of the page, goes through each node on the site, node=all DOM elements (html objects)
 var child, next; //Variables for
//switch is used to select specific blocks of code of many to be executed
  switch (node.nodeType) { //Switch selects which codeblocks to be executed, nodeType distinguishes between the different kinds of nodes (text, fragments, elements etc.)
    case 1: //Element
    case 9: //Document
    case 11: //Document fragment
    //Below it goes through every child node and runs the walk function for each of them
      child = node.firstChild;
      //while function loops until it has gone through every child node.
      while (child) {
        next = child.nextSibling; //Goes to next child
        walk(child); //Walks the child node
        child = next; //Sets the next child as the next element to be inspected
      }
    break;
    case 3: //text node
    neutralizeGender(node); //If the node is a text node, it runs our neutralizeGender function using that node
    break; //Break is a part of the switch function
  }
}

//Our neutralizeGender function, that swaps out gender terms
function neutralizeGender(textNode) {
var v = textNode.nodeValue; //Extracts the text from the node.

//The loops below goes through each replacement word one after one, looking at all the corresponding checkwords in the text
//This loop goes through each replacement word
for (i = 0; i < genders.replacementWords.length; i++) { //Loops through the length of the replacement words in the genders.js file (25),

  //The loop below goes through each checkword
  for (j = 0; j < genders.checkWords[i].length; j++) { //Loops through the length of the current array of checkwords, that is to be replaced with current replacement word
    var replaceWord = genders.replacementWords[i]; //The current replacement word is grabbed from the genders.js file
    var checkWord = genders.checkWords[i][j]; //The current word to be checked if it matches words in the text node (The V variable)
    //The variable below converts checkwords into regular expressions
    //using "b" it looks for words (text seperated by spaces and ignoring symbols) g=global
    var checkExpression = new RegExp("\\b" + checkWord + "\\b", "g");

      //Looks for the word with first letter as uppercase
    v = v.replace(checkExpression, replaceWord); //replace the word
    checkWord = checkWord.toUpperCase();
    replaceWord = replaceWord.toUpperCase();
    checkExpression = new RegExp("\\b" + checkWord + "\\b", "g");

        //looks for the word with all letters as uppercase
      v = v.replace(checkExpression, replaceWord); //replace the word
      checkWord = checkWord.toLowerCase();
      replaceWord = replaceWord.toLowerCase();
      checkExpression = new RegExp("\\b" + checkWord + "\\b", "gi");

          //Looks for the word with all letters as lowercase
        v = v.replace(checkExpression, replaceWord); //replace the word
  }
}
textNode.nodeValue = v; //returns new value to the text
}
