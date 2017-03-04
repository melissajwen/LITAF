// function sends a POST request to the server and returns a 
// input: N/A, called when submit button on html file is pressed
// output: array of keywords generated from inputted text
function post() { 
    var _data = {
        "documents": [
            {
                "language": "en",
                "id": "1",
                "text": $("#text").val(),
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
            console.log(data);
        },
    });

    return false;
}

function parse() {
    var input = $("input").val();
    // ArrayList<String> input_list = Arrays.asList(input.split(", "));
    // var input_array = [input_list];
    // console.log(input_array[0]);

    // input: user text input from a form, paragraph
    // output: array of user keywords
}

function compare() {
    // input: array of user keywords
    // output: integrate a comparison api to assign a score
    return 0;
}

