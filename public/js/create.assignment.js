/*
  DISCLAIMER: This code is as hackathon as you can get -- Due to the time crunch we were on, I didn't have
  time to whip up a front end with Angular or React.. So instead, here's a very archaic JavaScript + jQuery
  script...
*/

$(function() {
  var questionCount = 0;

  $('#addQuestion').click(function(e) {
    var $question = $(`
      <div class="question" data-index="` + questionCount + `">
        <div class="form-group">
          <label>Question</label>
          <input type="text" class="form-control q_text" placeholder="Who was Joseph Stalin?">
        </div>

        <div class="form-group">
          <label>Ideal Answer</label>
          <textarea class="form-control q_answer" placeholder="Joseph Stalin was..."></textarea>
        </div>

        <div class="form-group">
          <label>Key Words (Separate by comma)</label>
          <textarea class="form-control q_words" placeholder="ussr, soviet russia, cold war"></textarea>
        </div>

        <div class="text-right">
          <a class="btn btn-sm btn-danger delete"><i class="glyphicon glyphicon-trash"></i> Delete</a>
        </div>

        <hr>
      </div>`);

    $question.find(".delete").click(function() {
      $(this).parents(".question").slideUp(function() {
        $(this).remove();
      });
    });

    $question.appendTo('.questions').slideDown();
  });

  $('#createAssignment').click(function(e) {
    var questions = [];

    $('.question').each(function() {
      questions.push({
        text: $(this).find('.q_text').val(),
        ideal_answer: $(this).find('.q_answer').val(),
        key_words: $(this).find('.q_words').val().split(/[\s,]+/)
      });
    });

    var title = $('.a_title').val();
    var description = $('.a_description').val();

    alert(title + ' / ' + description);

    $.post('/assignment/create', {
      title: title,
      description: description,
      questions: questions
    }, function(data) {
      window.location.href = window.location.origin + data.master_path; // Redirect user
    })
  })
})