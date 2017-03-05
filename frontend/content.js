// function sends a POST request to the server and returns a 
// input: N/A, called when submit button on html file is pressed
// output: array of keywords generated from inputted text
var score;
var keyPhrases;

function keywordAnalysis() { 
    var _data = {
        "documents": [
            {
                "language": "en",
                "id": "1",
                "text": $("#k_text").val(),
            }
        ]
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
            keyPhrases = data["documents"][0]["keyPhrases"];
            console.log(keyPhrases);
        },
    });

    //var keywords = JSON.parse(data).
    return false;
}

function sentimentAnalysis() { 
    var _data = {
        "documents": [
            {
                "language": "en",
                "id": "1",
                "text": $("#s_text").val(),
            }
        ]
    }

    $.ajax({
        type: "POST",
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment",
        headers: {
            "Ocp-Apim-Subscription-Key": "d05d5e62debe44349a0355ca5e32c5d3", 
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        data: JSON.stringify(_data),
        success: function(data) {
            score = data["documents"][0]["score"];
            console.log(score);
        },
    });

    return false;
}

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
        matchedWordCount: matchedWordCount,
        percentageMatched: percentageMatched
    };
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
};