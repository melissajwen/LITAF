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

function