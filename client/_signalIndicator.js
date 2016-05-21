Template._signalIndicator.helpers({
	significance: function() {
		var p = this.sig;
		if (typeof p != 'number' || p>0.1) return "zero";
		if (p>0.01) return "ten";
		if (p>0.001) return "hundred";
		else return "thousand";
	}
})