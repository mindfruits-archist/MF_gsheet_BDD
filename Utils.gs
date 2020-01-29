"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "converthtml",
    value: function converthtml(toconvert) {
      toconvert = toconvert.replace(/&nbsp;/g, " ");toconvert = toconvert.replace(/&amp;/g, "&");toconvert = toconvert.replace(/&euro;/g, "€");toconvert = toconvert.replace(/&pound;/g, "£");toconvert = toconvert.replace(/&yen;/g, "¥");toconvert = toconvert.replace(/&quot;/g, '"');toconvert = toconvert.replace(/&copy;/g, "©");toconvert = toconvert.replace(/&ccedil;/g, "ç");toconvert = toconvert.replace(/&reg;/g, "®");toconvert = toconvert.replace(/&larr;/g, "← →");toconvert = toconvert.replace(/&uarr;/g, "↑ ↓");toconvert = toconvert.replace(/&sect;/g, "§");toconvert = toconvert.replace(/&para;/g, "¶");toconvert = toconvert.replace(/&iquest;/g, "¿");toconvert = toconvert.replace(/&raquo;/g, "»");toconvert = toconvert.replace(/&laquo;/g, "«");toconvert = toconvert.replace(/&micro;/g, "µ");toconvert = toconvert.replace(/&brvbar;/g, "¦");toconvert = toconvert.replace(/&spades;/g, "♠");toconvert = toconvert.replace(/&clubs;/g, "♣");toconvert = toconvert.replace(/&hearts;/g, "♥");toconvert = toconvert.replace(/&diams;/g, "♦");toconvert = toconvert.replace(/&alpha;/g, "α");toconvert = toconvert.replace(/&beta;/g, "β");toconvert = toconvert.replace(/&chi;/g, "χ");toconvert = toconvert.replace(/&gamma;/g, "γ");toconvert = toconvert.replace(/&omega;/g, "ω");toconvert = toconvert.replace(/&Omega;/g, "Ω");toconvert = toconvert.replace(/&Phi;/g, "Φ");toconvert = toconvert.replace(/&Delta;/g, "Δ");toconvert = toconvert.replace(/&Gamma;/g, "Γ");toconvert = toconvert.replace(/&Theta;/g, "Θ");toconvert = toconvert.replace(/&Lambda;/g, "Λ");toconvert = toconvert.replace(/&Sigma;/g, "Σ");toconvert = toconvert.replace(/&epsi;/g, "ε");toconvert = toconvert.replace(/&zeta;/g, "ζ");toconvert = toconvert.replace(/&eta;/g, "η");toconvert = toconvert.replace(/&iota;/g, "ι");toconvert = toconvert.replace(/&kappa;/g, "κ");toconvert = toconvert.replace(/&lambda;/g, "λ");toconvert = toconvert.replace(/&mu;/g, "μ");toconvert = toconvert.replace(/&nu;/g, "ν");toconvert = toconvert.replace(/&xi;/g, "ξ");toconvert = toconvert.replace(/&pi;/g, "π");toconvert = toconvert.replace(/&rho;/g, "ρ");toconvert = toconvert.replace(/&chi;/g, "χ");toconvert = toconvert.replace(/&upsi;/g, "υ");toconvert = toconvert.replace(/&sigmav;/g, "ς");toconvert = toconvert.replace(/&Aacute;/g, "Á");toconvert = toconvert.replace(/&aacute;/g, "á");toconvert = toconvert.replace(/&Acirc;/g, "Â");toconvert = toconvert.replace(/&acirc;/g, "â");toconvert = toconvert.replace(/&agrave;/g, "à");toconvert = toconvert.replace(/&aring;/g, "å");toconvert = toconvert.replace(/&aelig/g, "æ");toconvert = toconvert.replace(/&eacute;/g, "é");toconvert = toconvert.replace(/&ecirc;/g, "ê");toconvert = toconvert.replace(/&egrave;/g, "è");toconvert = toconvert.replace(/&euml;/g, "ë");toconvert = toconvert.replace(/&icirc;/g, "î");toconvert = toconvert.replace(/&iuml;/g, "ï");toconvert = toconvert.replace(/&iacute;/g, "í");toconvert = toconvert.replace(/&igrave;/g, "ì");toconvert = toconvert.replace(/&ocirc;/g, "ô");toconvert = toconvert.replace(/&ouml;/g, "ö");toconvert = toconvert.replace(/&otilde;/g, "õ");toconvert = toconvert.replace(/&oslash;/g, "Ø");toconvert = toconvert.replace(/&œ/g, "œ");toconvert = toconvert.replace(/&ucirc;/g, "û");toconvert = toconvert.replace(/&ugrave;/g, "ù");toconvert = toconvert.replace(/&uacute;/g, "ú");toconvert = toconvert.replace(/&uuml;/g, "ü");toconvert = toconvert.replace(/&yacute;/g, "ý");toconvert = toconvert.replace(/&yuml;/g, "ÿ");toconvert = toconvert.replace(/&deg;/g, "°");toconvert = toconvert.replace(/&permil;/g, "‰");toconvert = toconvert.replace(/&prime;/g, "′");toconvert = toconvert.replace(/&Prime;/g, "″");toconvert = toconvert.replace(/&infin;/g, "∞");toconvert = toconvert.replace(/&plusmn;/g, "±");toconvert = toconvert.replace(/&times;/g, "×");toconvert = toconvert.replace(/&divide;/g, "÷");toconvert = toconvert.replace(/&lt;/g, "<");toconvert = toconvert.replace(/&gt;/g, ">");toconvert = toconvert.replace(/&frac14;/g, "¼");toconvert = toconvert.replace(/&frac12;/g, "½");toconvert = toconvert.replace(/&frac34;/g, "¾");toconvert = toconvert.replace(/&sup1;/g, "¹");toconvert = toconvert.replace(/&sup2;/g, "²");toconvert = toconvert.replace(/&sup3;/g, "³");
      return toconvert;
    }
  }, {
    key: "completedate",
    value: function completedate(time) {
      if (time < 10) time = "0" + String(time);
      return time;
    }
  }, {
    key: "getGaDateFormat",
    value: function getGaDateFormat(o) {
      if ((typeof o === "undefined" ? "undefined" : _typeof(o)) == undefined) o = { date: new Date(), format: "default" };else if (_typeof(o.date) == undefined) o.date = new Date();else if (typeof o.date == 'string') o.date = new Date(o.date);else throw "Il semble y avoir un problème avec le paramètre entré dans la fonction 'Utils::getGaDateFormat'";
      var tmp,
          d = o.date;
      switch (o.format) {
        case "ga":
          d = d.getFullYear() + '-' + this.completedate(d.getMonth() + 1) + '-' + this.completedate(d.getDate());
          break;
        case "":
          break;
        default:
          d = this.completedate(d.getDate()) + "/" + this.completedate(d.getMonth() + 1) + "/" + d.getFullYear();
          break;
      }
      return d;
    }
  }, {
    key: "merge",
    value: function merge(obj, src) {
      Object.keys(src).forEach(function (key) {
        obj[key] = src[key];
      });
      return obj;
    }
  }]);

  return Utils;
}();
