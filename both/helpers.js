Object.defineProperty(Array.prototype, "sum", {
    enumerable: false,
    writable: true,
    value: function() {
      if (this.length == 0) return 0;
      return this.reduce(function(memo,num){
        if (typeof num == 'number' && !isNaN(num)) return memo+num;
        else return memo;
      },0);
    }
});

Object.defineProperty(Array.prototype, "count", {
    enumerable: false,
    writable: true,
    value: function() {
      if (this.length == 0) return 0;
      return this.reduce(function(memo,num){return (typeof num == 'number' && !isNaN(num)) ? memo+1 : memo},0)
    }
});