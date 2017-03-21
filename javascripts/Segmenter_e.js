function Segmenter() {
	this.split_symbol = " ";
	return this;
}

Segmenter.prototype.segment = function(text) {
	var output = [];
	var words = text.split(this.split_symbol);
	//for (var i = 0; i < words.length; i++) {
	//	document.write(i + ":" + words[i] + "<br>");
    //}
	return words;
}