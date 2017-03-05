$(function() {
  $("#target").submit(function(e) {
    e.preventDefault();

    var _data = {
      name: $("#name").val(),
      student_id: $("#student_id").val(),
      email: $("#email").val(),
      answers: []
    }

    $(".answer").each(function() {
      _data.answers.push($(this).val());
    });

    $.post(window.location.href + "/new", _data, function(data) {
      window.location.href = window.location.origin + data.response_path; // Redirect user
    });

    return false;
  })
})