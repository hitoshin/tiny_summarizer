function TinySummarizer() {
    this.stop_words = ["は", "を", "が", "の", "です", "。", "、",
                       "に", "と", "て", "で", "た", "が",
                       "だっ", "も", "こと", "れ", "られる", "に対し",
                       "「", "」", "い", "う", "から", "れる", "れ", "ん",
                       "（", "）", "に"];
    this.tf_dict = {};
    return this;
}

TinySummarizer.prototype.preprocess = function(words) {
    this.lengths   = [];
    this.scores    = [];
    for (var i = 0; i < words.length; i++) {
        //this.sentences[i] = "";
        for (var j = 0; j < words[i].length; j++) {
            var word = words[i][j];
            //document.write(word);
            //this.sentences[i] += word;
            if (this.stop_words.indexOf(word) == -1) {
                if (word in this.tf_dict) {
                    this.tf_dict[word] += 1;
                } else {
                    this.tf_dict[word] = 1;
                }
            }
        }
        this.lengths[i] = words[i].length;
        //this.lengths[i] = this.sentences[i].length;
    }

    for (var i = 0; i < this.keywords.length; i++) {
        if (this.keywords[i] in this.tf_dict) {
            this.tf_dict[this.keywords[i]] = Math.pow(this.tf_dict[this.keywords[i]], 2);
        }
    }

    for (var i = 0; i < words.length; i++) {
        this.scores[i] = 0;
        for (var j = 0; j < words[i].length; j++) {
            var word = words[i][j];
            if (word in this.tf_dict) {
                this.scores[i] += this.tf_dict[word];
            }
        }
    }
    this.scores[0] += 100;
}

TinySummarizer.prototype.decode = function(length) {
    var insert   = [];
    var n        = this.sentences.length;
    var score    = [];
    this.solution = [];
    // Initizalize
    for (var i = 0; i < n; i++) {
        insert[i]   = [];
        score[i]    = [];
        this.solution[i] = 0;
        for (var k = 0; k < length + 1; k++) {
            insert[i][k] = 0;
            score[i][k]  = 0;
        }
    }
    // Search
    for (var i = 0; i < n; i++) {
        for (var k = 0; k < length + 1; k++) {
            if (i == 0) {
                if (this.lengths[i] <= k) {
                    insert[i][k] = 1;
                    score[i][k]  = this.scores[i];
                }
            } else {
                if (this.lengths[i] <= k && score[i - 1][k] <= score[i - 1][k - this.lengths[i]] + this.scores[i]) {
                    insert[i][k] = 1;
                    score[i][k]  = score[i - 1][k - this.lengths[i]] + this.scores[i];
                } else {
                    score[i][k] = score[i - 1][k];
                }
            }
            
        }
    }
    // Trace
    var k = length;
    for (var i = n - 1; i >= 0; i--) {
        if (insert[i][k] == 1) {
            k -= this.lengths[i];
            this.solution[i] = 1;
        }
    }
}

TinySummarizer.prototype.output = function() {
    var output = "";
    for (var i = 0; i < this.solution.length; i++) {
        if (this.solution[i] == 1) {
            output += this.sentences[i];
        }
    }
    return output;
}

TinySummarizer.prototype.summarize = function(keywords, length, sentences, words) {
    this.keywords  = keywords;
    this.sentences = sentences;

    this.preprocess(words);
    this.decode(length);
    
    return this.output();
}

TinySummarizer.prototype.test = function() {
    for (var word in this.tf_dict) {
        document.write(word + " " + this.tf_dict[word] + "<br>");
    }
    for (var i = 0; i < this.lengths.length; i++) {
        document.write(this.lengths[i] + "<br>");
    }
    for (var i = 0; i < this.scores.length; i++) {
        document.write(this.scores[i] + "<br>");
    }
    for (var i = 0; i < this.sentences.length; i++) {
        document.write(this.sentences[i] + "<br>");
    }
}
