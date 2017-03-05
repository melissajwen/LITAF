// function sends a POST request to the server and returns a 
// input: N/A, called when submit button on html file is pressed
// output: array of keywords generated from inputted text
var score;

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
