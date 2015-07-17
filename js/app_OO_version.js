"use strict";
$(document).ready(function() {

var directionID;

var question_array = [
  {question: 'Question 1',
   allanswers: [
     {answer: 'Answer 1 for Question 1',
      correct: 'Incorrect' },
     {answer: 'Answer 2 for Question 1',
      correct: 'Correct'},
     {answer: 'Answer 3 for Question 1',
      correct: 'Incorrect'}
   ]},
  {question: 'Question 2',
   allanswers: [
     {answer: 'Answer 1 for Question 2',
      correct: 'Correct'},
     {answer: 'Answer 2 for Question 2',
      correct: 'Incorrect'}
   ]},
  {question: 'Question 3',
   allanswers: [
     {answer: 'Answer 1 for Question 3',
      correct: 'Correct'},
     {answer: 'Answer 2 for Question 3',
      correct: 'Incorrect'}
      ]}
        
];

var configMap = {
  quizArray: question_array,
  $IDanswer_list: $('#answer_list'),  
  $IDquestion_header: $('#question_header'),
  $setH2: $('h2'),
  listItems_html: '<li><input type=\'radio\' name=\'answerclick\' class=\'input_answer\' style=\'list-style-type: none\' data-question-id='
};

var questionObject = {};
  
var randomNum = function() {
    return parseInt(Math.random().toString().split('.')[1]);
}();

var questionLocalStorage = function(questionObject) {
  this.questionObject = questionObject;
}

questionLocalStorage.prototype = {
  questionStorage: function() {
    var questionCol = localStorage.questionCollection;
    var qCollectionKey = JSON.parse(questionCol)['randomKey'];
    questionObject['answerKey'] = {};
    questionObject['randomKey'] = randomNum;
    if (questionCol === undefined || questionCol === 0 || questionCol === "undefined"|| JSON.parse(questionCol)['randomKey'] !== randomNum) {
      localStorage.clear();
      localStorage.setItem('questionCollection', JSON.stringify(questionObject));
    }
  }
};

  var questionStore = new questionLocalStorage();
  questionStore.questionStorage();

function setPage(pageNum) {
    configMap.$IDquestion_header.data('page-num', pageNum).attr('data-page-num', pageNum);
    console.log("setPage pageNum: " + pageNum);
}


function QuizApp(button, pageNum) {

  this.button = button;
  this.pageNum = 0;
  this.quizTable = configMap.quizArray;
  this.quizLength = this.quizTable.length;

}

QuizApp.prototype.QuizDirection = function () {
  //this.pageNum +=1;
  this.questionLength = this.quizTable[this.pageNum].allanswers.length;
  
  $('.direction_forward, .quiz_construct').show();
  $('.answer_construct, .check_answers').hide();
  $('.answer_construct > #answer_results').find('li').empty();

  console.log('QuizApp: ' + this.button + " " + this.pageNum);

  if (this.button === 'forward' && this.pageNum <= this.quizLength) {
    console.log('Going: ' + this.button);
    console.log('At page: ' + this.pageNum);
    this.GenerateQuestions();
    setPage(this.pageNum);
    
  } else if (this.button === 'back' && this.pageNum > 0) {
    console.log('Going: ' + this.button);
    console.log('At page: ' + this.pageNum);
  }
}

QuizApp.prototype.GenerateQuestions = function () {
  var rawHtml = '';
  var qid = 0;
  var qCollection = JSON.parse(localStorage.questionCollection)['answerKey'];
  var qColPageNum = qCollection[this.pageNum];
  var questionArray = this.quizTable[this.pageNum];
  
  configMap.$setH2.text(this.quizTable[this.pageNum].question + ' in loop');

  if (qColPageNum === undefined || qColPageNum === null) {
      questionObject.answerKey[this.pageNum] =null;
      localStorage.setItem('questionCollection', JSON.stringify(questionObject));
  }
  
  for( qid; qid < (this.questionLength); qid++ ) {
    if (qColPageNum === qid) {
        rawHtml = configMap.listItems_html + this.pageNum + '_' + qid + ' checked>' + questionArray.allanswers[qid].answer + '</li>';
    } else {
        rawHtml = configMap.listItems_html + this.pageNum + '_' + qid + '>' + questionArray.allanswers[qid].answer + '</li>';
    }
    configMap.$IDanswer_list.append(rawHtml);

  }
  this.qID = qid;
  this.selectionListener();
}


QuizApp.prototype.selectionListener = function () {
  var inputID = $('input[type=radio]:checked').data('question-id');
  console.log('QuizApp inputID: ' + inputID);
  var vID = inputID.split('_');
  var answerID = parseInt((vID[1], 10));
  var questionID = parseInt((vID[0], 10));

  //configMap.$IDanswer_list.emtpy().html(
  this.answerID = this.qID;
  console.log('selectionListener this.answerID: ' + this.answerID);
  $('ul').find('li').on('click', function () {
      console.log('answerID: ' + answerID + 'questionID: ' + questionID);


      //localStorage.setItem('questionCollection', JSON.stringify(questionObject));
  });
}



/*
startQuiz.button = 'forward';
startQuiz.pageNum = 1;
startQuiz.QuizDirection();
startQuiz.GenerateQuestions();
startQuiz.selectionListener();
startQuiz.button = 'back';
startQuiz.QuizDirection();
startQuiz.selectionListener();
*/

var startQuiz = new QuizApp();

$('.direction_button').on('click', function () {
    var buttonID = $(this).data('buttonid'),
    pageID = configMap.$IDquestion_header.data('page-num');
    startQuiz.button = buttonID;
    startQuiz.pageNum = pageID;
    startQuiz.QuizDirection();
    
    });
});
