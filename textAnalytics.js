function compareKeywords(userArray, teacherArray){
    var newWordCount = 0;
    var newWords = [];
    var matchedWords = [];
    var matchedWordCount = 0;

    for (var i = 0; i < userArray.length; i++){
        var matched = false;
        for (var j = 0; j < teacherArray.length; j++){
            if (userArray[i] == teacherArray[j]){
                matched = true;
                matchedWords.push(userArray[i]);
                matchedWordCount++;
                break;
            }
        }
        if (matched == false){
            newWordCount++;
            newWords.push(userArray[i]);
        }
    }
    var percentageMatched = matchedWordCount/teacherArray.size;
    return {
        newWords: newWords,
        newWordCount: newWordCount,
        matchedWords: matchedWords,
        matchedWordCount: matchedWordCount
        percentageMatched: percentageMatched
    };
}
//Takes in array of Sentiment values, finds their average, and computers overall opinion level
//1 == Strongly Negative
//2 == Negative
//3 == Neutral
//4 == Positive
//5 == Strongly Positive
function finalScoreSentiment(arrayOfSentiments){
    var total = 0;
    for (var i = 0; i < arrayOfSentiments.size; i++){
        total += arrayofSentiments[i];
    }
    var average =  total/arrayOfSentiments.size;
    if (0 <= average <= 0.20){
        return 1;
    }
    else if (0.20 < average <= 0.40){
        return 2;
    }
    else if (0.40 < average <= 0.60){
        return 3;
    }
    else if (0.60 < average <= 0.80){
        return 4;
    }
    else if (0.8 < average <= 1){
        return 5;
    }
    else {
        return -1;
    }

}

function compare(teacherInput) {

    var params = {
        // Request parameters
        "s1": $("#text").val(),
        "s2": teacherInput,
    };

    $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/academic/v1.0/similarity?" + "s1=" + params.s1 + "&s2=" + params.s2,
        headers: {
            "Ocp-Apim-Subscription-Key": "963f6c662dc347279cf7d8e11f08ec1b",
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        type: "GET",
        // Request body
        data: {body},
    })
        .done(function(data) {
            return data;
        })
        .fail(function() {
            alert("error");
        });
});