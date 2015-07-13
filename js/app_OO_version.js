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
  $IDquestion_header: $('#question_header'),
  $setH2: $('h2')
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
    
  } else if (this.button === 'back' && this.pageNum > 0) {
    console.log('Going: ' + this.button);
    console.log('At page: ' + this.pageNum);
  }
}

QuizApp.prototype.GenerateQuestions = function () {
  //console.log(question_array[this.pageNum].question);
  var rawHtml = '';
  var qid = 0;
  var qCollection = JSON.parse(localStorage.questionCollection)['answerKey'];
  
  configMap.$setH2.text(this.quizTable[this.pageNum].question + ' in loop');

  
  for( qid = 0; qid < (this.questionLength); qid++ ) {
    console.log('Answer: ' + this.quizTable[this.pageNum].allanswers[qid].answer);

    /*
    if (qCollection[this.pageNum] === qid) {
    } else {
    
    }
    */

  }
  this.qID = qid;
}


QuizApp.prototype.selectionListener = function () {
  //var inputID = $('input[type=radio]:checked').data('question-id'),
  //vID = inputID.split('_');
  //this.answerID = parseInt((vID[1], 10);
  //this.questionID = parseInt(vID[0], 10);
  this.answerID = this.qID;
  console.log('selectionListener this.answerID: ' + this.answerID);
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