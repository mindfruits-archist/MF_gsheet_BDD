"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SP_BDD = function (_SP) {
  _inherits(SP_BDD, _SP);

  function SP_BDD() {
    _classCallCheck(this, SP_BDD);

    var _this = _possibleConstructorReturn(this, (SP_BDD.__proto__ || Object.getPrototypeOf(SP_BDD)).call(this));

    _this.sp = SpreadsheetApp.openById('1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss');
    _this._ = _get(SP_BDD.prototype.__proto__ || Object.getPrototypeOf(SP_BDD.prototype), "getSheets", _this).call(_this, _this.sp);
    _this.people = _this.bddpeople();
    _this.email = _this.bddemail();_this.templates = _this.bddemail();
    _this.contacts = _this.bddcontacts();
    _this.global = _this.bddglobal();
    return _this;
  }

  _createClass(SP_BDD, [{
    key: "_get",
    value: function _get(obj) {
      var arr = [];
      for (a in this.global.clients) {
        if (this.global.clients.hasOwnProperty(a)) for (aa in obj) {
          if (obj.hasOwnProperty(a)) {
            if (this.global.clients[a][aa] == obj[aa]) arr.push(this.global.clients[a][aa]);
          }
        }
      }return arr;
    }
    /********************************************************************************************************************************************************/
    /******************************les fonctions utiles pour sheet global************************************************************************************************/
    /********************************************************************************************************************************************************/

  }, {
    key: "_getUrl",
    value: function _getUrl(obj) {
      return this._get_(obj, "url");
    }
  }, {
    key: "_getManager",
    value: function _getManager(obj) {
      return this._get_(obj, "manager");
    }
  }, {
    key: "_getGAId",
    value: function _getGAId(obj) {
      return this._get_(obj, "gaid");
    }
  }, {
    key: "_getGAdsId",
    value: function _getGAdsId(obj) {
      return this._get_(obj, "gadsid");
    }
  }, {
    key: "_getGMCID",
    value: function _getGMCID(obj) {
      return this._get_(obj, "gmcid");
    }
  }, {
    key: "_getGAGoals",
    value: function _getGAGoals(obj) {
      return this._get_(obj, "ga");
    }
  }, {
    key: "_get_",
    value: function _get_(obj, label) {
      var arr = [];
      for (a in this.global.clients) {
        if (this.global.clients.hasOwnProperty(a)) for (aa in obj) {
          if (obj.hasOwnProperty(a)) {
            if (this.global.clients[a][aa] == obj[aa]) arr.push({ response: this.global.clients[a][label], request: obj[aa], requestedKey: aa, client: a });
          }
        }
      }return arr;
    }
    /********************************************************************************************************************************************************/
    /********************************les fonction utiles pour sheet people et contacts*********************************************************************************************/
    /********************************************************************************************************************************************************/

  }, {
    key: "bddemail",
    value: function bddemail() {
      var t = this._.Email;
      var sh = t.getRange("B4:H7").getValues();
      var o = { header: sh[0][1], footer: sh[1][1], footerInterne: sh[2][1], button: sh[3][1] };
      o.aggrgate = function () {
        var content = arguments[0] ? obj.content : "";
        var btn = arguments[0] ? obj.btn : "Click";

        return o.header + content + o.footer + o.footerInterne + "<button style='" + o.button + "'>" + btn + "</button>";
      };
      return o;
    }
  }, {
    key: "bddpeople",
    value: function bddpeople() {
      var t = this._.people;
      var sh = t.getRange(1, 1, t.getLastRow(), t.getLastColumn()).getValues();
      var o = { _: {} };
      o._.globalManagers = [];
      o._.adwordsManagers = [];
      o._.seoManagers = [];
      for (a in sh) {
        if (sh.hasOwnProperty(a)) {
          var person = sh[a][1] + " " + sh[a][2];
          if (a == 0) o._.headers = [];else o[person] = {};
          for (i = 0; i < sh[0].length; i++) {
            if (a == 0) o._.headers[i] = sh[a][i];else {
              o[person][sh[0][i]] = sh[a][i];
              if (sh[0][i] == "global") o._.globalManagers.push(person);
              if (sh[0][i] == "adwords") o._.adwordsManagers.push(person);
              if (sh[0][i] == "seo") o._.globalManagers.push(person);
            }
          }
        }
      }o.isGlobal = function (name) {
        for (a in o) {
          if (a.indexOf(name)) if (o[a].global == "Oui") return true;else return false;
        }
      };
      o.isAdwords = function (name) {
        for (a in o) {
          if (a.indexOf(name)) if (o[a].adwords == "Oui") return true;else return false;
        }
      };
      o.isSeo = function (name) {
        for (a in o) {
          if (a.indexOf(name)) if (o[a].seo == "Oui") return true;else return false;
        }
      };
      o.getEmail = function (name) {
        for (a in o) {
          if (a.indexOf(name)) return o[a].email;
        }
      };
      o.getTel = function (name) {
        for (a in o) {
          if (a.indexOf(name)) return o[a].telephone;
        }
      };
      o.getImage = function (name) {
        for (a in o) {
          if (a.indexOf(name)) return o[a].image;
        }
      };

      return o;
    }
  }, {
    key: "bddcontacts",
    value: function bddcontacts() {
      var t = this._.contacts;
      var sh = t.getRange(1, 1, t.getLastRow(), t.getLastColumn()).getValues();
      var o = { _: {} };
      for (a in sh) {
        if (sh.hasOwnProperty(a)) {
          var person = sh[a][1] + " " + sh[a][2];
          if (a == 0) o._.headers = [];else o[person] = {};
          for (i = 0; i < sh[0].length; i++) {
            if (a == 0) o._.headers[i] = sh[a][i];else o[person][sh[0][i]] = sh[a][i];
          }
        }
      }return o;
    }
  }, {
    key: "bddglobal",
    value: function bddglobal() {
      var tmp, tmpbis, cpt, cptbis;
      /********************************************************************************************************************************************************/
      /********************************************************************************************************************************************************/
      /********************************************************************************************************************************************************/
      var sp = SpreadsheetApp.openById('1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss');
      var global = sp.getSheetByName('global');
      var people = sp.getSheetByName('people');
      var email = sp.getSheetByName('Email');
      var Object = {};

      Object.global_ = global.getRange(2, 1, global.getLastRow(), global.getLastColumn());
      Object.global = { clients: {}, managers: {}, ga: {}, seo: {}, ads: {}, budgetFixe: {}, gmc: {}, goalsCA: {}, goalsGA: {}
        //Object.people_ = people.getRange(1,1,people.getLastRow(),people.getLastColumn()).getValues()
        //Object.people = {employer: {}, employers: {}, global: {}, ads: {}, seo: {}}

        /********************************************************************************************************************************************************/
      };var headers = [];
      tmpbis = Object.global_.getValues();
      cpt = Object.global;
      for (var a in tmpbis) {
        if (obj.hasOwnProperty(a)) if (a == 0) {
          headers = tmpbis[a];
        } else {
          tmp = tmpbis[a];

          cpt.clients[tmp[0]] = { arr: tmp };
          for (i in headers) {
            if (headers.hasOwnProperty(i)) cpt.clients[tmp[0]][headers[i].toLowerCase().sansAccent().trim().replace(/ /g, '_')] = tmp[i];
          }if (tmp[2] == "Oui") {
            for (i in tmp[3].split(',')) {
              if (tmp[3].split(',').hasOwnProperty(i)) {
                if (!cpt.managers[tmp[3].split(',')[i].sansAccent().trim()]) cpt.managers[tmp[3].split(',')[i].sansAccent().trim()] = {};
                cpt.managers[tmp[3].split(',')[i].sansAccent().trim()][tmp[0]] = { client: tmp[0], url: tmp[1], manager: tmp[3], arr: [tmp[1], tmp[3]] };
              }
            }
          }
          if (tmp[5] == "Oui") {
            cpt.ga[tmp[0]] = { id: tmp[4], client: tmp[0], seo: tmp[6], arr: [tmp[4], tmp[5], tmp[6]] };
          }
          if (tmp[6] == "Oui") {
            cpt.seo[tmp[0]] = { id: tmp[4], client: tmp[0], reporting: tmp[5], arr: [tmp[4], tmp[5], tmp[6]] };
          }
          if (tmp[8] == "Oui") {
            cpt.ads[tmp[0]] = { id: tmp[7], client: tmp[0], reporting: tmp[8], budgetfixe: tmp[10], budget: tmp[9], arr: [tmp[7], tmp[8], tmp[9], tmp[10]] };
          }
          if (tmp[10] == "Oui") {
            cpt.budgetFixe[tmp[0]] = { id: tmp[7], reporting: tmp[8], budgetfixe: tmp[10], budget: tmp[9], arr: [tmp[7], tmp[8], tmp[9], tmp[10]] };
          }
          if (tmp[12] == "Oui") {
            cpt.gmc[tmp[0]] = { id: tmp[0], arr: [tmp[11]] };
          }
          if (tmp[13] == "Oui") {
            cpt.goalsCA[tmp[0]] = { ca: tmp[13], ga: tmp[14], arr: [tmp[13], tmp[14]] };
          }
          if (tmp[14] != "") {
            cpt.goalsGA[tmp[0]] = { ca: tmp[13], ga: tmp[14], arr: [tmp[13], tmp[14]] };
          }
        }
      } /********************************************************************************************************************************************************/ /*
                                                                                                                                                                   tmpbis = Object.people_
                                                                                                                                                                   cpt = Object.people
                                                                                                                                                                   for(var a in tmpbis){
                                                                                                                                                                   tmp = tmpbis[a]
                                                                                                                                                                   cpt.employers[tmp[2]+" "+tmp[1]] = tmp
                                                                                                                                                                   cpt.employer[tmp[1]] = {nom: tmp[2], email: tmp[3], gmail: tmp[4], tel: tmp[9], fixe: tmp[10], image: tmp[11], global: tmp[5], ads: tmp[6], seo: tmp[7]}
                                                                                                                                                                   if(tmp[5] == "Oui"){
                                                                                                                                                                   cpt.global[tmp[1]] = {prenom: tmp[1], arr: tmp}
                                                                                                                                                                   }
                                                                                                                                                                   if(tmp[6] == "Oui"){
                                                                                                                                                                   cpt.ads[tmp[1]] = {prenom: tmp[1], arr: tmp}
                                                                                                                                                                   }
                                                                                                                                                                   if(tmp[7] == "Oui"){
                                                                                                                                                                   cpt.seo[tmp[1]] = {prenom: tmp[1], arr: tmp}
                                                                                                                                                                   }
                                                                                                                                                                   }
                                                                                                                                                                   /********************************************************************************************************************************************************/
      Logger.log('ok');
      this._.global = Object.global_;
      return Object.global;
    }
  }]);

  return SP_BDD;
}(SP);
