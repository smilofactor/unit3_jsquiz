$(document).ready(function() {
"use strict";
    var directionID;
    var question_array = [

        {question: 'Question 1',
            allanswers: [
                {answer: 'Answer 1 for Question 1',
                    correct: false},
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


    function questionsLoop(pageNum) {
        var questionArray = question_array[pageNum - 1];
        $('h2').text(questionArray.question + ' in loop');

        for (var i = 0; i < questionArray.allanswers.length; i++) {
            $('#answer_list').append("<li>" + questionArray.allanswers[i].answer + "</li>");}
    };

    function pageCount(directionID) {
        var pageLimit = question_array.length;
        var buttonDirect = directionID.buttonID;
        var pageNum = directionID.pageID;

        if (pageNum === 0 && buttonDirect === 'back') {
            alert('Already at start of quiz');

        } else if (buttonDirect === 'forward') {
            if (pageNum < pageLimit) {

                pageNum += 1;
                $('#question_header').data('page-num', pageNum).attr('data-page-num', pageNum);
                //$('#question_header').empty().attr('data-page-num', pageNum);

                $('#answer_list').empty().html(questionsLoop(pageNum));
            } else {
                alert("Quiz over");
            }

        } else {
            pageNum -= 1;
            $('#question_header').data('page-num', pageNum).attr('data-page-num', pageNum);
            //$('#question_header').data('page-num', pageNum);
            if (pageNum > 0) {
                $('#answer_list').empty().html(questionsLoop(pageNum));
            } else {
                $('h2').text('Introduction');
            }
        }

    };

    $('.direction_button').on('click', function() {

        var buttonID = $(this).data('buttonid');
        var pageID = $('#question_header').data('page-num');

        directionID = ({pageID: pageID, buttonID: buttonID});
        pageCount(directionID);

    });

});