function readFromSource(path) {
    switch (path) {
        case 'NBD':
            return require('../ndb/ndb.json');
            break;
        case 'DB':
            // TODO
            break;
    }
    return false;
}

function analyze(txt) {
    var json = readFromSource('NBD');
    var pattern = /[/.,!?\'\;\-:]*/g;
    var answer = '';

    if (typeof txt !== 'undefined') {
        var strSplited = txt.replace(pattern, '').split(' ');
        var read = 0;

        for (var i = 0; i < strSplited.length; i++) {
            if (strSplited[i].length < 3) continue;
            if (typeof json[strSplited[i]] !== 'undefined') {
                answer = json[strSplited[i]];
                read = 1;
            }
        }

        if (read == 0) {
            if (txt == '') {
                answer = json['not_you'];
            }
            else {
                // TODO add uknown question into unknownQuestion.txt
                answer = json['null'];
            }
        }
        read = 0;
    }
    return answer;
}

export {analyze}
