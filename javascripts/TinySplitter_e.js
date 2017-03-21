function TinySplitter() {
    this.split_symbol = ".";
    return this;
}

TinySplitter.prototype.split = function(text) {
    var output    = [];
    var sentences = text.split(this.split_symbol);
    for (var i = 0; i < sentences.length; i++) {
        if (sentences[i] != "") {
            output.push(sentences[i] + this.split_symbol);
        }
    }
    return output;
}
