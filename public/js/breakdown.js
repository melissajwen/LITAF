/*
  Yes, exposing API keys like this is a bad idea and definitely shouldn't be done..
  But for the sake of this hackathon (and the fact that these API keys are free anyways and
  that we prob won't use them after this..) we're making these calls through the client.

  Possible remedy for the future: Create routes on our server that will proxy calls to the API
*/

function compare(studentInput, teacherInput, cb) {
  var params = {
    // Request parameters
    "s1": studentInput,
    "s2": teacherInput,
  };

  $.ajax({
    url: "https://westus.api.cognitive.microsoft.com/academic/v1.0/similarity",
    headers: {
      "Ocp-Apim-Subscription-Key": "963f6c662dc347279cf7d8e11f08ec1b",
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    type: "POST",
    data: JSON.stringify(params)
  }).done(function(data) {
    cb(data);
  })
};

function keyphraseAnalysis(documents, cb) { 
  var _data = {
    "documents": []
  }

  for(var i=0;i<documents.length;i++) {
    _data.documents.push({
      "language": "en",
      "id": i,
      "text": documents[i]
    });
  }

  $.ajax({
    type: "POST",
    url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyphrases",
    headers: {
      "Ocp-Apim-Subscription-Key": "d05d5e62debe44349a0355ca5e32c5d3", 
      "Content-Type": "application/json", 
      "Accept": "application/json"
    },
    data: JSON.stringify(_data),
    success: function(data) {
      var keyPhrases = [];

      for(doc in data["documents"]) {
        keyPhrases.push(data["documents"][doc]["keyPhrases"]);
      }

      cb(keyPhrases);
    },
  });

  //var keywords = JSON.parse(data).
  return false;
}

function getMatchingKeyphrases(studentKeyphrases, teacherKeyphrases, cb) {
  var returnPhrases = [];
  for(var i=0;i<studentKeyphrases.length;i++) {
    var stKeyPhrases = studentKeyphrases[i];
    var tchKeyPhrases = teacherKeyphrases[i];
    var matchingPhrases = [];

    for(var j=0;j<stKeyPhrases.length;j++) {
      for(var k=0;k<tchKeyPhrases.length;k++) {
        if (stKeyPhrases[j].toLowerCase() === tchKeyPhrases[k].toLowerCase()) {
          matchingPhrases.push(stKeyPhrases[j]);
        }
      }
    }

    returnPhrases.push(matchingPhrases);
  }

  cb(returnPhrases);
}

$(function() {
  var studentAnswers = [];
  var teacherAnswers =[];
  
  $(".response-question").each(function() {
    var studentAnswer = $(this).find("p.student-answer").html();
    var teacherAnswer = $(this).find("p.teacher-answer").html();

    var self = $(this);
    compare(studentAnswer, teacherAnswer, function(data) {
      self.find(".similarity").html(data);
    });

    studentAnswers.push(studentAnswer);
    teacherAnswers.push(teacherAnswer);
  });

  var studentKeyphrases = [];
  var teacherKeyphrases = [];

  keyphraseAnalysis(studentAnswers, function(data) {
    studentKeyphrases = data;
    $(".response-question").each(function(i) {
      $(this).find(".student-keyphrases").html(data[i].join(", "))
    });

    keyphraseAnalysis(teacherAnswers, function(data) {
      teacherKeyphrases = data;
      $(".response-question").each(function(i) {
        $(this).find(".teacher-keyphrases").html(data[i].join(", "))
      });

      getMatchingKeyphrases(studentKeyphrases, teacherKeyphrases, function(data) {
        $(".response-question").each(function(i) {
          var numStudentKeyphrases = studentKeyphrases[i].length;
          var numMatchingKeyphrases = data[i].length;

          if (data[i].length === 0) {
            $(this).find(".matching-keyphrases").html("No matching keyphrases");
          } else {
            $(this).find(".matching-keyphrases").html(data[i].join(", "));
          }

          var similarity = parseFloat($(this).find(".similarity").html());
          var percentMatchingKeyphrases = numMatchingKeyphrases / numStudentKeyphrases;

          var score = 0;
          var result = "";
          var reason = "";

          if (similarity < 0.3) {
            score = 0;
            reason += "The student's answer has little conceptual similarity to the teacher's answer. ";
          } else if (similarity >= 0.3 && similarity < 0.8) {
            score = 25;
            reason += "The student's answer has some conceptual similarity to the teacher's answer. ";
          } else if (similarity >= 0.8) {
            score = 50;
            reason += "The student's answer has a lot conceptual similarity to the teacher's answer. ";
          }

          if (percentMatchingKeyphrases <= 0.3) {
            score += 0;
            reason += "The student's answer has little key phrases in common with the teacher's answer";
          } else if (percentMatchingKeyphrases > 0.3 && percentMatchingKeyphrases <= 0.7) {
            score += 25;
            reason += "The student's answer shares a few key phrases with the teacher's answer";
          } else if (percentMatchingKeyphrases > 0.7) {
            score += 50;
            reason += "The student's answer shares a lot of key phrases with the teacher's answer. ";
          }

          if (score <= 30) {
            result = "incorrect";
          } else if (score > 30 && score < 70) {
            result = "plausible";
          } else if (score >= 70) {
            result = "correct";
          }

          $(this).find(".summary").html("This student's answer seems <b>" + result + "</b>. " + reason);
        });
      })
    });
  });

  
});