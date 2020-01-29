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
    key: "_isObj",
    value: function _isObj(obj) {
      return isObject(obj);
    }
  }, {
    key: "__isObject",
    value: function __isObject(obj) {
      if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" && !Array.isArray(obj) && typeof obj.getName == "undefined") return true;else return false;
    }
  }, {
    key: "__isObjectArgOk__",
    value: function __isObjectArgOk__(obj, arr) {
      return 'this.__isObjectArgOk(sh, ["sh","pos"]) => estce que l objet sh contient les clé "sh" et "pos"';
    }
  }, {
    key: "__isObjectArgOk",
    value: function __isObjectArgOk(obj, arr) {
      for (a in arr) {
        if (arr.hasOwnProperty(a)) if (typeof obj[arr[a]] == "undefined") throw "SP::__isObjectArgOk => l'objet ne contient la les clés adéquates";
      }
    }
  }, {
    key: "__isGoodType",
    value: function __isGoodType(obj, type) {
      if (typeof obj == "undefined") throw "SP::__isGoodType => argument obj ne peut etre 'undefined'";
      if (typeof obj == "string") obj = this._spreadSheet(obj);
      if (typeof type == "undefined") if (this.__isObject(obj) && typeof obj.type != "undefined" && typeof obj.obj != "undefined") {
        type = obj.type;obj = obj.obj;
      } else throw "SP::__isGoodType 0=> arguments non valides";
      if (type != "r" && type != "sh" && type != "sp") throw "SP::__isGoodType 1=> argument type non valides";

      if (type == this.__getGSheetType(obj)) return true;else throw "SP::__isGoodType 2=> arguments obj non reconnu: this.__getGSheetType(obj)= " + this.__getGSheetType(obj);
    }
  }, {
    key: "__getGSheetType",
    value: function __getGSheetType(obj) {
      if (typeof obj.breakApart != "undefined") return "r";
      if (typeof obj.showSheet != "undefined") return "sh";
      if (typeof obj.copy != "undefined") return "sp";
      return false;
    }
  }, {
    key: "__getFirstRow",
    value: function __getFirstRow(sh) {
      var ok = this.__isGoodType({ obj: sh, type: 'sh' });

      var bool = true;
      var i = 1,
          j = 1;
      while (bool) {
        sh.getRange(i, 100);
      }
    }
  }, {
    key: "_ColtoInt",
    value: function _ColtoInt(range) {
      if (typeof range != "string") throw "SP::_ColtoInt => l'argument range entré n'est pas de type 'string'";
      return [0, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].indexOf(range);
    }
  }, {
    key: "changeSheet",
    value: function changeSheet(obj) {
      var name, sp;
      if (typeof obj == "string") name = obj;else if (this.__isObject(obj)) {
        this.__isObjectArgOk(sh, ["name"]);
        name = obj.name;
        if (_typeof(obj.sp)) sp = this.spsh(obj.sp);
      }
      if (typeof sp == "undefnied") this.sh = this._[name];else throw "SP::changeSheet => la fonction est à compléter, elle ne permet permet pas encore de récupérer un sh sur une autre sp";
    }
  }, {
    key: "getSheets__",
    value: function getSheets__(sp) {
      return "arguments: spreadsheet";
    }
  }, {
    key: "getSheets",
    value: function getSheets(sp) {
      var ok = this.__isGoodType({ obj: sp, type: 'sp' });

      var shs = sp.getSheets(),
          o = {};
      for (a in shs) {
        if (shs.hasOwnProperty(a)) o[shs[a].getName()] = shs[a];
      }return o;
    }
  }, {
    key: "getObjectlike__",
    value: function getObjectlike__(sp) {
      return "arguments(1||2): spreadsheet||(spreadsheet, position(string||number))";
    }
  }, {
    key: "getObj",
    value: function getObj(sh) {
      return getObjectlike(sh);
    }
  }, {
    key: "getSheetValues",
    value: function getSheetValues(o) {
      var a,
          tmp = [],
          vals,
          sh = typeof o.sheet == 'string' ? this._[o.sheet] : o.sheet;
      var fr = o.fr || 1,
          fc = o.fc || 1,
          nbr = o.nbr || sh.getLastRow() - (fr - 1),
          nbc = o.nbc || sh.getLastColumn() - (fc - 1);
      var reduce = o.reduce || false;
      vals = sh.getRange(fr, fc, nbr, nbc).getValues();
      if (vals.length == 1 && reduce) tmp = vals[0];
      if (vals[0].length == 1 && reduce) for (a in vals) {
        tmp.push(vals[a][0]);
      }if (tmp.length != 0) return tmp;
      return vals;
    }
  }, {
    key: "getObjectlike",
    value: function getObjectlike(sh, pos, action) {
      Logger.log("\n\nIL RESTE A POUVOIR RECUPERER UN OBJET MULTIDIMENTIONNEL\n\n");
      var ok = this.__isGoodType({ obj: sh.sh, type: 'sh' }),
          fr = 1,
          fc = 1,
          nr,
          nc,
          head;
      if (this.__isObject(sh)) {
        this.__isObjectArgOk(sh, ["sh"]);
        if (typeof sh.pos != "undefined") pos = sh.pos;
        if (typeof sh.action != "undefined") if (typeof sh.obj != "undefined") return this.setObjectlike(sh.sh, sh.obj, sh.pos);else throw "SP::getObjectlike => l'argument 'obj' ext manquant";
        sh = sh.sh;
      }
      var lr = sh.getLastRow(),
          lc = sh.getLastColumn();

      if (typeof pos == "undefined") {
        head = sh.getRange(fr, fc, 1, sh.getLastColumn()).getValues();
        for (var a in head) {
          if (head[0][a] == "" && head[0][a + 1] == "" && head[1][a] == "") throw "SP::getObjectlike 0=> l'argument 'pos' n'a pas été défini\nLa rangé n°1 est prise pour le 'head', mais il ne doit pas contenir de case vide.";
        } //throw "SP::getObjectlike 0=> l'argument 'headRow' doit être défini"
        fr = 2;fc = 1;
      } else {
        if (typeof pos == "string") {
          if (parseInt(pos) == pos) {
            fr = parseInt(pos) + 1;fc = 1;
          } else if (pos.substring(1) == parseInt(pos.substring(1))) {
            fr = parseInt(pos.substring(1)) + 1;fc = this._ColtoInt(pos.substring(0, 1));
          }
          //if(pos.length == 5 && pos.indexOf(':')==2){}
          else throw "SP::getObjectlike 1=> le paramètre pos est un string, mais il ne correspond à aucun parttern adéquat";
        } else if (typeof pos == "number") {
          fr = pos + 1;fc = 1;
        }
      }
      var fr_ = fr,
          fc_ = fc;
      while (sh.getRange(fr_, fc).getValue() != "") {
        fr_++;
      }lr = --fr_;
      while (sh.getRange(fr, fc_).getValue() != "") {
        fc_++;
      }lc = --fc_;
      nr = lr - fr + 1;
      nc = lc - fc + 1;
      if (typeof head == "undefined") head = sh.getRange(fr - 1, fc, 1, nc).getValues();

      Logger.log(arr);
      Logger.log(fr);
      Logger.log(fc);
      Logger.log(lr);
      Logger.log(lc);
      Logger.log(nr);
      Logger.log(nc);
      var vals = sh.getRange(fr, fc, nr, nc).getValues();
      var arr = [],
          o = {};
      for (a in vals) {
        if (vals.hasOwnProperty(a)) {
          o = {};
          for (i = 0; i < vals[0].length; i++) {
            o[head[0][i]] = vals[a][i];
          }arr.push(o);
        }
      }return arr;
    }
  }, {
    key: "setObjectlike",
    value: function setObjectlike(sh, obj, pos) {
      var ok = this.__isGoodType({ obj: sh.sh, type: 'sh' }),
          multidim = false,
          fr = 1,
          fc = 1,
          head = [],
          headR = [],
          val = [],
          vals = [];
      var i, nr, nc;
      if (this.__isObject(sh)) {
        this.__isObjectArgOk(sh, ["sh", "obj"]);
        if (typeof sh.pos != "undefined") pos = sh.pos;
        obj = sh.obj;
        sh = sh.sh;
      }
      if (this.__isObject(obj)) {
        multidim = true;
        i = 0;
        for (var a in obj) {
          if (i == 0) {
            val = [""];
            i++;
            // for(var aa in obj[a])head.push(aa)
            for (var aa in obj[a]) {
              val.push(aa);
            }vals.push(val);
          }
          val = [a];
          for (var aa in obj[a]) {
            val.push(obj[a][aa]);
          }vals.push(val);
        }
        nr = Object.keys(obj).length + 1;
        nc = Object.keys(obj).length + 1;
      } else {
        for (var a in obj) {
          if (obj.hasOwnProperty(a)) {
            val = [];
            if (a == 0) {
              for (aa in obj[a]) {
                val.push(aa);
              }vals.push(val);
              val = [];
            }
            for (aa in obj[a]) {
              val.push(obj[a][aa]);
            }vals.push(val);
          }
        }nr = obj.length + 1;
        nc = Object.keys(obj[0]).length;
      }

      if (typeof pos != "undefined") {
        if (typeof pos == "string") {
          if (parseInt(pos) == pos) {
            fr = parseInt(pos);multidim ? fc++ : "";
          } else if (pos.substring(1) == parseInt(pos.substring(1))) {
            fr = parseInt(pos.substring(1));fc = this._ColtoInt(pos.substring(0, 1));
          }
          //if(pos.length == 5 && pos.indexOf(':')==2){}
          else throw "SP::setObjectlike 1=> le paramètre pos est un string, mais il ne correspond à aucun parttern adéquat";
        } else if (typeof pos == "number") {
          fr = pos;multidim ? fc++ : "";
        }
      }
      Logger.log(vals);
      Logger.log(fr);
      Logger.log(fc);
      Logger.log(nr);
      Logger.log(nc);

      sh.getRange(fr, fc, nr, nc).setValues(vals);
      return true;
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
      var ss;
      if (typeof spsh !== "undefined") {
        if (spsh == "active" || spsh == "") ss = SpreadsheetApp.getActiveSpreadsheet();
        if (spsh.indexOf('https://') != -1) ss = SpreadsheetApp.openByUrl(spsh);
        if (spsh.length == 44) ss = SpreadsheetApp.openById(spsh);
        if ((typeof spsh === "undefined" ? "undefined" : _typeof(spsh)) == "object") ss = SpreadsheetApp.open(spsh);
      } else ss = SpreadsheetApp.getActiveSpreadsheet();
      if (typeof ss == "undefined" || ss == null) throw "SP::_spreadSheet => l'argument 'spsh' n'a aucune correspondance en terme de spreadsheet";
      return ss;
    }
  }, {
    key: "email_MF",
    value: function email_MF(obj) {
      if (!this.__isObject(obj)) throw "SP::email_MF => l'argument doit etre un objt JSON, typeof obj= " + (typeof obj === "undefined" ? "undefined" : _typeof(obj));
      this.__isObjectArgOk(sh, ["contact", "body", "subject"]);
      var contacts = obj.contacts || [obj.contact],
          body = obj.body,
          title = obj.subject;
      var template = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>Template d'emails Mindfruits</title><style> .mainDiv{font-family: Raleway, sans-serif;text-align:center;margin: 10px auto;width: 95%;max-width: 700px;font-size: 18px;background-color:#f8f8f8;padding: 5% 5%; border:2px #f0efef solid;} .mainDiv>img{margin:auto;display: block;margin-bottom:30px;} .btn{background-color: rgb(163, 204, 110); border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;border-radius:4px;font-weight:bold;text-transform:uppercase;} </style></head><body><div class=\"mainDiv\"><img src=\"https://www.mindfruits.biz/wp-content/uploads/2017/06/mindfruits.png\"></div><p style=\"text-align:center;\">Votre fid\xE8le serviteur,<br>Google Apps Script</p></body></html>";
      template.replace("{{content}}", body);

      for (var a in contacts) {
        MailApp.sendEmail({
          to: contacts[a],
          subject: subject,
          htmlBody: template
        });
      }
    }
  }, {
    key: "launchScriptUi",
    value: function launchScriptUi(o) {
      if (!this.__isObject(o)) throw "SP::email_MF => l'argument doit etre un objt JSON, typeof obj= " + (typeof obj === "undefined" ? "undefined" : _typeof(obj));
      this.__isObjectArgOk(sh, ["func"]);
      var ui = SpreadsheetApp.getUi();
      var result = ui.alert('Lancer le script ?', '"ok" pour lancer, "cancel" pour annuler', ui.ButtonSet.OK_CANCEL);
      if (result == ui.Button.OK) {
        eval(o.func + '()');
      } else if (result == ui.Button.CANCEL || result == ui.Button.CLOSE) {
        ui.alert("Aucune fonction n'a pas été lancé");
      }
    }
  }]);

  return SP;
}();
