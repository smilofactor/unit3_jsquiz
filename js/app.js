"use strict";
$(document).ready(function() {

var directionID,

question_array = [{
    question: 'Question 1',
    allanswers: [
    {answer: 'Answer 1 for Question 1',
      correct: false },
      {answer: 'Answer 2 for Question 1',
      correct: true}
      ]}, {
    question: 'Question 2',
    allanswers: [
      {answer: 'Answer 1 for Question 2',
      correct: true},
      {answer: 'Answer 2 for Question 2',
      correct: false}
      ]}
],

configMap = {
  $IDanswer_list: $('#answer_list'),
  $IDquestion_header: $('#question_header'),
  $setH2: $('h2'),
  listItems_html: "<li><input type='radio' name='answerclick' class='input_answer' data-question-id="

};

function setPage(pageNum) {
	configMap.$IDquestion_header.data('page-num', pageNum).attr('data-page-num', pageNum);
};

function clearAnswerList(pageNum){
	configMap.$IDanswer_list.empty().html(questionsLoop(pageNum));
};

function questionsLoop(pageNum) {
    var questionID = pageNum - 1
    var questionArray = question_array[questionID];
    configMap.$setH2.text(questionArray.question + ' in loop');

    for (var i = 0; i < questionArray.allanswers.length; i++) {
    	configMap.$IDanswer_list.append(configMap.listItems_html + questionID + "_" + i + ">" + questionArray.allanswers[i].answer + "</li>");

    }
  };


function pageCount(directionID) {
	var pageLimit = question_array.length;
    var buttonDirect = directionID.buttonID;
    var pageNum = directionID.pageID;

    if (pageNum === 0 && buttonDirect === 'back') {

    } else if (buttonDirect === 'forward') {
      if (pageNum < pageLimit) {

        pageNum += 1;
        setPage(pageNum);
        clearAnswerList(pageNum);

      } else {
        alert("Quiz over");
      }

    } else {

      pageNum -= 1;
      setPage(pageNum);

      if (pageNum > 0) {

        clearAnswerList(pageNum);

      } else {

        configMap.$setH2.text('Introduction');

        configMap.$IDanswer_list.find('li').remove();
      }
    };

  };



function parseInputID(retVal) {
	var inputID = $('input[type=radio]:checked').data('question-id');
	return parseInt(inputID.split("_")[retVal], 10);
}


  $('.direction_button').on('click', function() {
    var buttonID = $(this).data('buttonid');
    var pageID = configMap.$IDquestion_header.data('page-num');

    directionID = ({
      pageID: pageID,
      buttonID: buttonID
    });
    pageCount(directionID);

  });


  $('.check_answer').on('click', function() {

    var answerID = parseInputID(1);
    var questionID = parseInputID(0);
   
    var arrayAnswer = question_array[questionID].allanswers[answerID].correct;

    alert(answerID + " " + arrayAnswer);

  });

});