"use strict";
$(document).ready(function() {

var directionID,

question_array = [
  {question: 'Question 1',
   allanswers: [
     {answer: 'Answer 1 for Question 1',
      correct: false },
     {answer: 'Answer 2 for Question 1',
      correct: true}
   ]},
  {question: 'Question 2',
   allanswers: [
     {answer: 'Answer 1 for Question 2',
      correct: true},
     {answer: 'Answer 2 for Question 2',
      correct: false}
   ]},
  {question: 'Question 3',
   allanswers: [
     {answer: 'Answer 1 for Question 3',
      correct: true},
     {answer: 'Answer 2 for Question 3',
      correct: false}
      ]}
        
],

configMap = {
  $IDanswer_list: $('#answer_list'),
  $IDquestion_header: $('#question_header'),
  $setH2: $('h2'),
  listItems_html: "<li><input type='radio' name='answerclick' class='input_answer' style='list-style-type: none' data-question-id="
},

questionObject = {},

randomNum = function() {
 return parseInt(Math.random().toString().split('.')[1]);
}(),


questionLocalStorage = function(questionObject) { 
  this.questionObject = questionObject;
}

questionLocalStorage.prototype = {
questionStorage: function() {
  var questionCO = localStorage.questionCollection;
  questionObject['answerKey'] = {};
  questionObject['randomKey'] = randomNum;

  if ( questionCO === undefined || JSON.parse(questionCO)['randomKey'] !== randomNum ) {
      localStorage.setItem("questionCollection", JSON.stringify(questionObject));
    }
  
  }
};
  var questionStore = new questionLocalStorage();
  questionStore.questionStorage();
 
  
function checkAnswers() {
  var answerKey,
      correctKey,
      answerKeyObject = {},
      questionCO = JSON.parse(localStorage.questionCollection)['answerKey'];

   for (var responseValue in questionCO) {
   answerKey = questionCO[responseValue];

    if (answerKey !== null) { 

     correctKey = question_array[responseValue].allanswers[answerKey].correct;
     answerKeyObject[responseValue] = correctKey;
    
    } else {

    answerKeyObject[responseValue] = 'No answer';
    
    }

  }

  console.log("JSON.stringify(answerKeyObject): " + JSON.stringify(answerKeyObject));
  
  }

  
function setPage(pageNum) {
	configMap.$IDquestion_header.data('page-num', pageNum).attr('data-page-num', pageNum);
};

  
function clearAnswerList(pageNum){
	configMap.$IDanswer_list.empty().html(questionsLoop(pageNum));
};

  
//Continue in this function
function questionsLoop(pageNum) {
    var
    rawHtml = '',
    i = 0,
    questionID = pageNum - 1,
    questionCO = JSON.parse(localStorage.questionCollection)['answerKey'],
    questionArray = question_array[questionID],
    setCheckboxID,
    setCheckbox;
  
    configMap.$setH2.text(questionArray.question + ' in loop');

    if (questionCO[questionID] === undefined || questionCO[questionID] === null) { 
  
    console.log(questionObject.answerKey);
    questionObject.answerKey[questionID] = null;
    localStorage.setItem("questionCollection", JSON.stringify(questionObject));
  
  }
 

    for (i; i < questionArray.allanswers.length; i++) {

      if (questionCO[questionID] === i) {
        rawHtml = configMap.listItems_html + questionID + "_" + i + " checked>" + questionArray.allanswers[i].answer + "</li>";
      } else {
    	rawHtml = configMap.listItems_html + questionID + "_" + i + ">" + questionArray.allanswers[i].answer + "</li>";
      }
      configMap.$IDanswer_list.append(rawHtml);
    }     

  };

  
function pageCount(directionID) {
	var 
  pageLimit = question_array.length,
  buttonDirect = directionID.buttonID,
  pageNum = directionID.pageID;

  $('.direction_forward').show();
  $('.check_answers').hide();
  $('.submit_answer').show();

    if (pageNum === 0 && buttonDirect === 'back') {

      //Doing something
      //Had an alert stating:
      //already start at quiz
      
    } else if (buttonDirect === 'forward') {
      
      $('.direction_back').show();

      if (pageNum < pageLimit) {
        pageNum += 1;
        setPage(pageNum);
        clearAnswerList(pageNum);
      
        } else {

          checkAnswers();
          $('.check_answers').show();
          $('.direction_forward').hide();
          $('.submit_answer').hide();

        }

    } else {
      pageNum -= 1;
      setPage(pageNum);

      if (pageNum > 0) { clearAnswerList(pageNum); } 
      
      else {
        configMap.$setH2.text('Introduction');
        configMap.$IDanswer_list.find('li').remove();
        $('.direction_back').hide();

      }
      
    };
  };
  

  $('.direction_button').on('click', function() {
    var buttonID = $(this).data('buttonid'),
    pageID = configMap.$IDquestion_header.data('page-num');

    directionID = ({
      pageID: pageID,
      buttonID: buttonID
    });
    pageCount(directionID);
  });  
  

var parsedIDConstruct = function(answerID, questionID) {
	this.answerID = answerID;
	this.questionID = questionID;
}
 
parsedIDConstruct.prototype = {
	inputIDValues: function() {
    var
     inputID = $('input[type=radio]:checked').data('question-id'),
     VID = inputID.split("_");
    
      this.answerID = parseInt(VID[1], 10);
      this.questionID = parseInt(VID[0], 10);
	}
}


 $('.submit_answer').on('click', function() {

    var parsedID = new parsedIDConstruct();
    parsedID.inputIDValues();
    var answerID = parsedID.answerID,
        questionID = parsedID.questionID;
    questionObject.answerKey[questionID] = answerID;
    localStorage.setItem("questionCollection", JSON.stringify(questionObject));

   
  });

});
