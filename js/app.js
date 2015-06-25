$(document).ready(function() {
  var question_array = [
    
    {'question': 'Question 1',
    'allanswers': [
      {'answer': 'Answer 1 for Question 1',
      'correct': false}, 
      {'answer': 'Answer 2 for Question 1',
      'correct': true}
    ]},
   
    {'question': 'Question 2',
    'allanswers': [
      {'answer': 'Answer 1 for Question 2',
      'correct': true},
      {'answer': 'Answer 2 for Question 2',
      'correct': false}
    ]}
    
  ];

var page_count = 0;
$('.direction_button').on('click', function() {
  var directionButton = $(this).attr('data-buttonid');
  
  if(directionButton === 'forward') { 
  $('#answer_list').empty().html(questionsLoop(page_count));
  page_count += 1;
  $('h2').text('Question ' + page_count)
  
  } else if(directionButton === 'back') {
  $('#answer_list').append(questionsLoop(page_count));
  page_count -= 1;
  $('h2').text('Question ' + page_count)
  
  };
   
});
  

function questionsLoop(page_count) {

  for (var i = 0; i < question_array[page_count].allanswers.length; i++) {
    
    $('#answer_list').append("<li>" + question_array[page_count].allanswers[i].answer + "</li>");
  }
 
};

});