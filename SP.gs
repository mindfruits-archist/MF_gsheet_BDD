"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SP = function () {
  function SP(sp) {
    _classCallCheck(this, SP);

    this.data = [];
    this._sp = [];
    if (arguments[0] == undefined) {
      this.sp = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById("1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss");
    } else {
      this.sp = this.spsh(sp);
    }
    this.sh = this.sp.getActiveSheet();
    this._ = this.getSheets(this.sp);
    this._tmpsp = this.sp;
    this._tmpsh = this.sh;
  }

  //this.activedsheetObject = this.activeSheetObject(this.sp.getId());
  /*activeSheetObject(id){
    switch (id) {
      case "1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss":
        return new SP_BDD_();break;
      case "1E-4PUe2gHSUFUbIpBGW2yiSMOyEIvFguMUjUUjJmXX8":
        return new SP_Biblio_();break;
      default: return null;
    }
  }*/


  _createClass(SP, [{
    key: "getSheets",
    value: function getSheets(sp) {
      var shs = sp.getSheets(),
          o = {};
      for (a in shs) {
        if (shs.hasOwnProperty(a)) o[shs[a].getName()] = shs[a];
      }return o;
    }
  }, {
    key: "getObjectlikeSheet",
    value: function getObjectlikeSheet(sh) {
      var sh = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
      var arr = [],
          o = {};
      for (a in sh) {
        if (a != 0) if (sh.hasOwnProperty(a)) {
          o = {};
          for (i = 0; i < sh[0].length; i++) {
            o[sh[0][i]] = sh[a][i];
          }arr.push(o);
        }
      }return arr;
    }
  }, {
    key: "insSh",
    value: function insSh(array) {
      this.insertSheet(array);
    }
  }, {
    key: "insertSheet",
    value: function insertSheet(array, pos) {
      if (typeof array == "string") array = [array];
      if (typeof array == "undefined") array = ["insertedSheet"];
      var nbr = pos || this.sp.getSheets().length;
      for (a in array) {
        if (array.hasOwnProperty(a)) {
          var sheet = this.sp.getSheetByName(array[a]);
          if (sheet != null) this.sp.deleteSheet(sheet);
          yourNewSheet = this.sp.insertSheet();
          yourNewSheet.setName(array[a]);
          this.sp.moveActiveSheet(nbr);
        }
      }return yourNewSheet;
    }
  }, {
    key: "spsh",
    value: function spsh(_spsh) {
      return this._spreadSheet(_spsh);
    }
  }, {
    key: "_spreadSheet",
    value: function _spreadSheet(spsh) {
      if (typeof spsh !== "undefined") {
        if (spsh == "active" || spsh == "") ss = SpreadsheetApp.getActiveSpreadsheet();
        if (spsh.indexOf('https://') != -1) ss = SpreadsheetApp.openByUrl(spsh);
        if (spsh.length == 44) ss = SpreadsheetApp.openById(spsh);
        if ((typeof spsh === "undefined" ? "undefined" : _typeof(spsh)) == "object") ss = SpreadsheetApp.open(spsh);
      } else ss = SpreadsheetApp.getActiveSpreadsheet();
      return ss;
    }
  }]);

  return SP;
}();
