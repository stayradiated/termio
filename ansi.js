var _ = require('underscore');

var Ansi = function () {

  this.reset();

  _.each(this._attrs, function (_, attr) {
    this[attr] = function (value) {
      this._attrs[attr] = value;
    };
  }, this);

};

_.extend(Ansi.prototype, {
  set: function (value) {
    switch (value) {

      case 0: this.reset();            break;
      case 1: this.bold(true);         break;
      case 3: this.italic(true);       break;
      case 4: this.underline(true);    break;
      case 7: this.reverse(true);      break;
      case 8: this.conceal(true);      break;
      case 9: this.strike(true);       break;

      case 21: this.bold(false);       break;
      case 22: this.bold(false);       break;
      case 23: this.italic(false);     break;
      case 24: this.underline(false);  break;
      case 27: this.reverse(false);    break;
      case 28: this.conceal(false);    break;
      case 29: this.strike(false);     break;

      case 30: this.foreground(0);     break;
      case 31: this.foreground(1);     break;
      case 32: this.foreground(2);     break;
      case 33: this.foreground(3);     break;
      case 34: this.foreground(4);     break;
      case 35: this.foreground(5);     break;
      case 36: this.foreground(6);     break;
      case 37: this.foreground(7);     break;
      case 39: this.foreground(false); break;

      case 40: this.background(0);     break;
      case 41: this.background(1);     break;
      case 42: this.background(2);     break;
      case 43: this.background(3);     break;
      case 44: this.background(4);     break;
      case 45: this.background(5);     break;
      case 46: this.background(6);     break;
      case 47: this.background(7);     break;
      case 49: this.background(false); break;

      case 90: this.foreground(8);     break;
      case 91: this.foreground(9);     break;
      case 92: this.foreground(10);    break;
      case 93: this.foreground(11);    break;
      case 94: this.foreground(12);    break;
      case 95: this.foreground(13);    break;
      case 96: this.foreground(14);    break;
      case 97: this.foreground(15);    break;

      case 100: this.background(8);    break;
      case 101: this.background(9);    break;
      case 102: this.background(10);   break;
      case 103: this.background(11);   break;
      case 104: this.background(12);   break;
      case 105: this.background(13);   break;
      case 106: this.background(14);   break;
      case 107: this.background(15);   break;

    }
  },

  reset: function () {
    this._attrs = {
      bold:       false,
      underline:  false,
      italic:     false,
      background: false,
      foreground: false,
      conceal:    false,
      strike:     false,
      reverse:    false
    };
  },

  attrs: function () {
    var output = {};
    for (var key in this._attrs) {
      if (this._attrs.hasOwnProperty(key));
      var value = this._attrs[key];
      if (value !== false) {
        output[key] = value;
      }
    }
    return output;
  }

});

module.exports = Ansi;
