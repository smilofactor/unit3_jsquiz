$(document).ready(function() {
  "use strict";
  var directionID;

  var $answer_list = $('#answer_list');
  var $question_header = $('#question_header');
  var $setH2 = $('h2');

  var question_array = [{
      question: 'Question 1',
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
        ]}
  ];

  function setPage(pageNum) {
   $question_header.data('page-num', pageNum).attr('data-page-num', pageNum);
   
   //$('#question_header').data('page-num', pageNum).attr('data-page-num', pageNum);
   //$('#question_header').empty().attr('data-page-num', pageNum);

  };

  function clearAnswerList(pageNum){
   $answer_list.empty().html(questionsLoop(pageNum));

  //$answer_list.empty().html(questionsLoop(pageNum));
  //$('#answer_list').empty().html(questionsLoop(pageNum));

  };

  function questionsLoop(pageNum) {
    var questionID = pageNum - 1
    var questionArray = question_array[questionID];
    $setH2.text(questionArray.question + ' in loop');

    for (var i = 0; i < questionArray.allanswers.length; i++) {
      $answer_list.append("<li><input type='radio' class='input_answer' data-question-id=" + questionID + "_" + i + ">" + questionArray.allanswers[i].answer + "</li>");

      //$('#answer_list').append("<li><input type='radio' class='input_answer' data-question-id=" + questionID + "_" + i + ">" + questionArray.allanswers[i].answer + "</li>");
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

        $setH2.text('Introduction');
        //$('#answer_list').empty();

        $answer_list.find('li').remove();
        //$('#answer_list').find('li').remove();

      }
    };

  };

  $('.direction_button').on('click', function() {
    var buttonID = $(this).data('buttonid');
    var pageID = $('#question_header').data('page-num');

    directionID = ({
      pageID: pageID,
      buttonID: buttonID
    });
    pageCount(directionID);

  });

  $('.check_answer').on('click', function() {
    var inputID = $('input[type=radio][checked]').val();
    var questionID = $('#question_header').data('page-num');
    var questionArrayAnswers = question_array[questionID].allanswers;

    alert(inputID);

  });

});