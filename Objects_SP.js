class Code{
  constructor(){
    this.utils = new Utils()
    this.prototypes = new Prototypes()
    this.sp = new SP()
    this.bdd = new SP_BDD()
  }
}
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
class Prototypes {
  constructor(arr){
    if(typeof arr != "undefined")
      for(a in arr)
        eval("this."+arr[a]+"()")
    else{
      this.myDate()
      this.myString()
      this.myObject()
    }
  }
  myObject(){
    Object.prototype.length = function(){
      return Object.keys(this).length
    }
  }
  myString(){
    String.prototype.sansAccent = function(){
        var accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];
        var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

        var str = this;
        for(var i = 0; i < accent.length; i++){
            str = str.replace(accent[i], noaccent[i]);
        }

        return str;
    }
  }
  myDate(){
    Date.prototype.getYearDay = function() { //1 - 366
    	var year  = this.getFullYear();
    	var month = this.getMonth();
    	var day   = this.getDate();

    	var offset = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    	//l'année bissextile n'est utile qu'à partir de mars
    	var bissextile = (month < 2) ? 0 : (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0));

        return parseInt(day + offset[month] + bissextile);
    }

    Date.prototype.getMonday = function() {
    	var offset = (this.getDay() + 6) % 7;
    	return new Date(this.getFullYear(), this.getMonth(), this.getDate()-offset);
    }

    Date.prototype.getWeek = function() { //1 - 53
    	var year = this.getFullYear();
    	var week;

    	//dernier lundi de l'année
    	var lastMonday = new Date(year, 11, 31).getMonday();

    	//la date est dans la dernière semaine de l'année
    	//mais cette semaine fait partie de l'année suivante
    	if(this >= lastMonday && lastMonday.getDate() > 28) {
    		week = 1;
    	}
    	else {
    		//premier lundi de l'année
    		var firstMonday = new Date(year, 0, 1).getMonday();

    		//correction si nécessaire (le lundi se situe l'année précédente)
    		if(firstMonday.getFullYear() < year) firstMonday = new Date(year, 0, 8).getMonday();

    		//nombre de jours écoulés depuis le premier lundi
    		var days = this.getYearDay() - firstMonday.getYearDay();

    		//window.alert(days);

    		//si le nombre de jours est négatif on va chercher
    		//la dernière semaine de l'année précédente (52 ou 53)
    		if(days < 0) {
    			week = new Date(year, this.getMonth(), this.getDate()+days).getWeek();
    		}
    		else {
    			//numéro de la semaine
    			week = 1 + parseInt(days / 7);

    			//on ajoute une semaine si la première semaine
    			//de l'année ne fait pas partie de l'année précédente
    			week += (new Date(year-1, 11, 31).getMonday().getDate() > 28);
    		}
    	}

    	return parseInt(week);
    }
  }
}

/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
class SP {
  constructor(sp){
    this.data = []
    this._sp = []
    if(arguments[0] == undefined){
      this.sp = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById("1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss")
    }
    else{
      this.sp = this.spsh(sp)
    }
    this.sh = this.sp.getActiveSheet()
    this._ = this.getSheets(this.sp)
    this._tmpsp = this.sp
    this._tmpsh = this.sh

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
  _isObj(obj){return isObject(obj)}
  __isObject(obj){
    if(typeof obj=="object" && !Array.isArray(obj) && typeof obj.getName == "undefined")return true
    else return false
  }
  __isObjectArgOk__(obj, arr){return'this.__isObjectArgOk(sh, ["sh","pos"]) => estce que l objet sh contient les clé "sh" et "pos"'}
  __isObjectArgOk(obj, arr){
    for(a in arr)if(arr.hasOwnProperty(a))if(typeof obj[arr[a]] == "undefined")throw"SP::__isObjectArgOk => l'objet ne contient la les clés adéquates"
  }
  __isGoodType(obj, type){
      if (typeof obj == "undefined") throw "SP::__isGoodType => argument obj ne peut etre 'undefined'";
      if (typeof obj == "string") obj = this._spreadSheet(obj)
      if (typeof type == "undefined")
        if(this.__isObject(obj) && typeof obj.type != "undefined" && typeof obj.obj != "undefined") {
          type = obj.type;obj = obj.obj;
        } else throw "SP::__isGoodType 0=> arguments non valides";
      if (type != "r" && type != "sh" && type != "sp") throw "SP::__isGoodType 1=> argument type non valides";

      if (type == this.__getGSheetType(obj)) return true;
      else throw "SP::__isGoodType 2=> arguments obj non reconnu: this.__getGSheetType(obj)= "+this.__getGSheetType(obj);
  }
  __getGSheetType(obj){
    if(typeof obj.breakApart!="undefined")return "r"
    if(typeof obj.showSheet!="undefined")return "sh"
    if(typeof obj.copy!="undefined")return "sp"
    return false
  }
  __getFirstRow(sh){
    var ok = this.__isGoodType({obj: sh, type: 'sh'})

    var bool=true
    var i=1,j=1
    while(bool)
      sh.getRange(i,100, )
  }
  _ColtoInt(range){
    if(typeof range != "string")throw"SP::_ColtoInt => l'argument range entré n'est pas de type 'string'"
    return [0,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"].indexOf(range)
  }
  changeSheet(obj){
    var name, sp
    if(typeof obj == "string")name = obj
    else if(this.__isObject(obj)){
      this.__isObjectArgOk(sh, ["name"]);
      name = obj.name
      if(typeof obj.sp)sp=this.spsh(obj.sp)
    }
    if(typeof sp == "undefnied")this.sh=this._[name]
    else throw"SP::changeSheet => la fonction est à compléter, elle ne permet permet pas encore de récupérer un sh sur une autre sp"
  }
  getSheets__(sp){return"arguments: spreadsheet"}
  getSheets(sp){
    var a, ok = this.__isGoodType({obj: sp, type: 'sp'})

    var shs = sp.getSheets(), o = {}
    for(a in shs)  if(shs.hasOwnProperty(a))o[shs[a].getName()] = shs[a]
    return  o
  }
  getObjectlike__(sp){return"arguments(1||2): spreadsheet||(spreadsheet, position(string||number))"}
  getObj(sh){return getObjectlike(sh)}
  getSheetValues(o){
    var a, tmp = [], vals, sh = typeof o.sheet == 'string' ? this._[o.sheet] : o.sheet
    var fr = o.fr || 1, fc = o.fc || 1, nbr = o.nbr || sh.getLastRow() - (fr-1), nbc = o.nbc || sh.getLastColumn() - (fc-1)
    var reduce = o.reduce || false
    vals = sh.getRange(fr, fc, nbr, nbc).getValues()
    if(vals.length == 1 && reduce)tmp = vals[0]
    if(vals[0].length == 1 && reduce)for(a in vals)tmp.push(vals[a][0])
    if(tmp.length!=0)return tmp
    return vals
  }
  getObjectlike(sh, pos, action){
    Logger.log("\n\nIL RESTE A POUVOIR RECUPERER UN OBJET MULTIDIMENTIONNEL\n\n")
    var ok = this.__isGoodType({obj: sh.sh, type: 'sh'}), fr = 1, fc = 1, nr, nc, head
    if(this.__isObject(sh)){
      this.__isObjectArgOk(sh, ["sh"]);
      if(typeof sh.pos != "undefined")pos=sh.pos
      if(typeof sh.action != "undefined")
        if(typeof sh.obj != "undefined")return this.setObjectlike(sh.sh, sh.obj, sh.pos)
        else throw"SP::getObjectlike => l'argument 'obj' ext manquant"
      sh=sh.sh
    }
    var lr = sh.getLastRow(), lc = sh.getLastColumn()

    if(typeof pos == "undefined"){
      head = sh.getRange(fr,fc,1,sh.getLastColumn()).getValues()
      for(var a in head)if(head[0][a]==""&&head[0][a+1]==""&&head[1][a]=="")
        throw "SP::getObjectlike 0=> l'argument 'pos' n'a pas été défini\nLa rangé n°1 est prise pour le 'head', mais il ne doit pas contenir de case vide."
        //throw "SP::getObjectlike 0=> l'argument 'headRow' doit être défini"
      fr=2;fc=1;
    }else{
      if(typeof pos=="string"){
        if(parseInt(pos) == pos){fr=parseInt(pos) + 1;fc=1;}
        else if(pos.substring(1) == parseInt(pos.substring(1))){fr=parseInt(pos.substring(1)) + 1;fc=this._ColtoInt(pos.substring(0,1))}
        //if(pos.length == 5 && pos.indexOf(':')==2){}
        else throw"SP::getObjectlike 1=> le paramètre pos est un string, mais il ne correspond à aucun parttern adéquat"
      }
      else if(typeof pos == "number"){fr=pos+1;fc=1}
    }
    var fr_=fr, fc_=fc
    while(sh.getRange(fr_, fc).getValue()!="")fr_++
    lr=--fr_
    while(sh.getRange(fr, fc_).getValue()!="")fc_++
    lc=--fc_
    nr = lr-fr+1
    nc = lc-fc+1
    if(typeof head == "undefined")
      head = sh.getRange(fr-1,fc,1,nc).getValues()

    Logger.log(arr)
    Logger.log(fr)
    Logger.log(fc)
    Logger.log(lr)
    Logger.log(lc)
    Logger.log(nr)
    Logger.log(nc)
    var vals = sh.getRange(fr,fc,nr,nc).getValues()
    var arr = [], o = {}
    for(a in vals)if(vals.hasOwnProperty(a)){
      o = {}
      for(i=0;i<vals[0].length;i++)
        o[head[0][i]] = vals[a][i]
      arr.push(o)
    }
    return arr
  }
  setObjectlike(sh, obj, pos){
    var ok = this.__isGoodType({obj: sh.sh, type: 'sh'}), multidim = false, fr = 1, fc = 1, head = [], headR = [], val = [], vals = []
    var i, nr, nc
    if(this.__isObject(sh)){
      this.__isObjectArgOk(sh, ["sh", "obj"]);
      if(typeof sh.pos != "undefined")pos=sh.pos
      obj=sh.obj
      sh=sh.sh
    }
    if(this.__isObject(obj)){
      multidim = true
      i=0
      for(var a in obj){
        if(i==0){
          val = [""]
          i++;
          // for(var aa in obj[a])head.push(aa)
          for(var aa in obj[a])val.push(aa)
          vals.push(val)
        }
        val = [a]
        for(var aa in obj[a])val.push(obj[a][aa])
        vals.push(val)
      }
      nr = Object.keys(obj).length + 1;
      nc = Object.keys(obj).length + 1;
    }else{
      for(var a in obj)if(obj.hasOwnProperty(a)){
        val = []
        if(a==0){
          for(aa in obj[a])val.push(aa)
          vals.push(val)
          val = []
        }
        for(aa in obj[a])val.push(obj[a][aa])
        vals.push(val)
      }
      nr = obj.length + 1;
      nc = Object.keys(obj[0]).length;
    }

    if(typeof pos != "undefined"){
      if(typeof pos=="string"){
        if(parseInt(pos) == pos){fr=parseInt(pos);multidim?fc++:"";}
        else if(pos.substring(1) == parseInt(pos.substring(1))){fr=parseInt(pos.substring(1));fc=this._ColtoInt(pos.substring(0,1));}
        //if(pos.length == 5 && pos.indexOf(':')==2){}
        else throw"SP::setObjectlike 1=> le paramètre pos est un string, mais il ne correspond à aucun parttern adéquat"
      }
      else if(typeof pos == "number"){fr=pos;multidim?fc++:"";}
    }
    Logger.log(vals)
    Logger.log(fr)
    Logger.log(fc)
    Logger.log(nr)
    Logger.log(nc)

    sh.getRange(fr,fc,nr,nc).setValues(vals)
    return true
  }
  insSh(array){this.insertSheet(array)}
  insertSheet(array, pos){
    if(typeof array =="string")array = [array]
    if(typeof array =="undefined")array = ["insertedSheet"]
    var nbr = pos || this.sp.getSheets().length
    for(a in array) if(array.hasOwnProperty(a)){
      var sheet = this.sp.getSheetByName(array[a]);
      if(sheet != null)
        this.sp.deleteSheet(sheet);
      yourNewSheet = this.sp.insertSheet();
      yourNewSheet.setName(array[a]);
      this.sp.moveActiveSheet(nbr)
    }
    return yourNewSheet
  }
  spsh(spsh){return this._spreadSheet(spsh)}
  _spreadSheet(spsh){
    var ss
    if(typeof spsh !== "undefined"){
      if(spsh == "active" || spsh == "")ss = SpreadsheetApp.getActiveSpreadsheet()
      if(spsh.indexOf('https://') != -1)ss = SpreadsheetApp.openByUrl(spsh)
      if(spsh.length == 44)ss = SpreadsheetApp.openById(spsh)
      if(typeof spsh == "object")ss = SpreadsheetApp.open(spsh)
    }else ss = SpreadsheetApp.getActiveSpreadsheet()
    if(typeof ss=="undefined" || ss == null)throw"SP::_spreadSheet => l'argument 'spsh' n'a aucune correspondance en terme de spreadsheet"
    return ss
  }
  email_MF(obj){
    if(!this.__isObject(obj))throw"SP::email_MF => l'argument doit etre un objt JSON, typeof obj= "+typeof obj
    this.__isObjectArgOk(sh, ["contact", "body", "subject"]);
    var contacts = obj.contacts || [obj.contact], body=obj.body, title=obj.subject
    var template=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Template d'emails Mindfruits</title><style> .mainDiv{font-family: Raleway, sans-serif;text-align:center;margin: 10px auto;width: 95%;max-width: 700px;font-size: 18px;background-color:#f8f8f8;padding: 5% 5%; border:2px #f0efef solid;} .mainDiv>img{margin:auto;display: block;margin-bottom:30px;} .btn{background-color: rgb(163, 204, 110); border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;border-radius:4px;font-weight:bold;text-transform:uppercase;} </style></head><body><div class="mainDiv"><img src="https://www.mindfruits.biz/wp-content/uploads/2017/06/mindfruits.png"></div><p style="text-align:center;">Votre fidèle serviteur,<br>Google Apps Script</p></body></html>`;
    template.replace("{{content}}", body)

    for(var a in contacts)
      MailApp.sendEmail({
        to:contacts[a],
        subject: subject,
        htmlBody: template
      });
  }
  launchScriptUi(o){
    if(!this.__isObject(o))throw"SP::email_MF => l'argument doit etre un objt JSON, typeof obj= "+typeof obj
    this.__isObjectArgOk(sh, ["func"]);
    var ui = SpreadsheetApp.getUi()
    var result = ui.alert(
        'Lancer le script ?',
      '"ok" pour lancer, "cancel" pour annuler',
        ui.ButtonSet.OK_CANCEL);
    if (result == ui.Button.OK) {
      eval(o.func+'()')
    } else if (result == ui.Button.CANCEL || result == ui.Button.CLOSE) {
      ui.alert("Aucune fonction n'a pas été lancé");
    }
  }
}

/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
class SP_BDD extends SP{
  constructor(){
    super()
    this.sp = SpreadsheetApp.openById('1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss')
    this._ = super.getSheets(this.sp)
    this.people = this.bddpeople()
    this.email = this.bddemail();this.templates = this.bddemail()
    this.contacts = this.bddcontacts()
    this.global = this.bddglobal()
  }

    _get(obj){
      var arr = []
      for(a in this.global.clients) if(this.global.clients.hasOwnProperty(a))
        for(aa in obj) if(obj.hasOwnProperty(a)){
          if(this.global.clients[a][aa] == obj[aa])
            arr.push(this.global.clients[a][aa])
        }
      return arr
    }
/********************************************************************************************************************************************************/
/******************************les fonctions utiles pour sheet global************************************************************************************************/
/*
* obj: object contenant en clé la donnée à rechercher, en valeur la valeur recherchée
* label: la valeur de retour désirée
*/
/********************************************************************************************************************************************************/
    _getUrl(obj){   return this._get_(obj,"url")    }
    _getManager(obj){   return this._get_(obj,"manager")    }
    _getGAId(obj){   return this._get_(obj,"gaid")    }
    _getGAdsId(obj){   return this._get_(obj,"gadsid")    }
    _getGMCID(obj){   return this._get_(obj,"gmcid")    }
    _getGAGoals(obj){   return this._get_(obj,"ga")    }
    _get_(obj, label){
      var arr = []
      for(a in this.global.clients)if(this.global.clients.hasOwnProperty(a))
        for(aa in obj)if(obj.hasOwnProperty(aa))
          if(aa == label)throw "Le label entré ne peut etre recherché dans cette fonction"
          else{
            if(this.global.clients[a][aa] == obj[aa])
              arr.push({response: this.global.clients[a][label], request: obj[aa], requestedKey: aa, client: a})
          }
      return arr
    }
/********************************************************************************************************************************************************/
/********************************les fonction utiles pour sheet people et contacts*********************************************************************************************/
/********************************************************************************************************************************************************/

  bddemail(){var t = this._.Email
    var sh = t.getRange("B4:H7").getValues()
    var o = {header: sh[0][1], footer: sh[1][1], footerInterne: sh[2][1], button: sh[3][1]}
    o.aggrgate = function(){
      var content = arguments[0] ? obj.content : ""
      var btn = arguments[0] ? obj.btn : "Click"

      return o.header+content+o.footer+o.footerInterne+"<button style='"+o.button+"'>"+btn+"</button>"
    }
    return o
  }
  bddpeople(){var a, i, t = this._.people;
    var sh = t.getRange(1,1,t.getLastRow(),t.getLastColumn()).getValues()
    var o = {_: {}}
    o._.globalManagers = []
    o._.adwordsManagers = []
    o._.seoManagers = []
    for(a in sh)if(sh.hasOwnProperty(a)){
      var person = sh[a][1]+" "+sh[a][2]
      if(a==0)o._.headers = []
      else o[person] = {}
      for(i=0;i<sh[0].length;i++){
        if(a==0)o._.headers[i] = sh[a][i]
        else{
          o[person][sh[0][i]] = sh[a][i]
          if(sh[0][i] == "global")o._.globalManagers.push(person)
          if(sh[0][i] == "adwords")o._.adwordsManagers.push(person)
          if(sh[0][i] == "seo")o._.globalManagers.push(person)
        }
      }
    }

    o.isGlobal = function(name){    for(a in o)if(a.indexOf(name))if(o[a].global=="Oui")return true;else return false;  }
    o.isAdwords = function(name){    for(a in o)if(a.indexOf(name))if(o[a].adwords=="Oui")return true;else return false;  }
    o.isSeo = function(name){    for(a in o)if(a.indexOf(name))if(o[a].seo=="Oui")return true;else return false;  }
    o.getEmail = function(name){    for(a in o)if(a.indexOf(name))return o[a].email  }
    o.getTel = function(name){    for(a in o)if(a.indexOf(name))return o[a].telephone  }
    o.getImage = function(name){    for(a in o)if(a.indexOf(name))return o[a].image  }


    return o
  }
  bddcontacts(){var t = this._.contacts;
    var a, i, sh = t.getRange(1,1,t.getLastRow(),t.getLastColumn()).getValues()
    var o = {_: {}}
    for(a in sh)if(sh.hasOwnProperty(a)){
      var person = sh[a][1]+" "+sh[a][2]
      if(a==0)o._.headers = []
      else o[person] = {}
      for(i=0;i<sh[0].length;i++)
        if(a==0)o._.headers[i] = sh[a][i]
        else o[person][sh[0][i]] = sh[a][i]
    }
    return o
  }

  bddglobal() {
    var i, tmp,tmpbis,cpt,cptbis
  /********************************************************************************************************************************************************/
  /********************************************************************************************************************************************************/
  /********************************************************************************************************************************************************/
    var sp = SpreadsheetApp.openById('1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss')
    var global = sp.getSheetByName('global')
    var people = sp.getSheetByName('people')
    var email = sp.getSheetByName('Email')
    var o = {}

    o.global_ = global.getRange(2,1,global.getLastRow(),global.getLastColumn())
    o.global = {clients: {}, managers: {}, ga: {}, seo: {}, ads: {}, budgetFixe: {}, gmc: {}, goalsCA: {}, goalsGA: {}}
    //o.people_ = people.getRange(1,1,people.getLastRow(),people.getLastColumn()).getValues()
    //o.people = {employer: {}, employers: {}, global: {}, ads: {}, seo: {}}

  /********************************************************************************************************************************************************/
    var headers = []
    tmpbis = o.global_.getValues()
    cpt = o.global
    for(var a in tmpbis)if(obj.hasOwnProperty(a))if(a==0){
        headers = tmpbis[a]
      }else{
        tmp = tmpbis[a]

        cpt.clients[tmp[0]] = {arr: tmp}
        for(i in headers)if(headers.hasOwnProperty(i))
          cpt.clients[tmp[0]][headers[i].toLowerCase().sansAccent().trim().replace(/ /g,'_')] = tmp[i]

        if(tmp[2] == "Oui"){
          for(i in tmp[3].split(','))if(tmp[3].split(',').hasOwnProperty(i)){
            if(!cpt.managers[tmp[3].split(',')[i].sansAccent().trim()])
              cpt.managers[tmp[3].split(',')[i].sansAccent().trim()] = {}
            cpt.managers[tmp[3].split(',')[i].sansAccent().trim()][tmp[0]] = {client: tmp[0], url: tmp[1], manager: tmp[3], arr: [tmp[1], tmp[3]]}
          }
        }
        if(tmp[5] == "Oui"){
          cpt.ga[tmp[0]] = {id: tmp[4], client: tmp[0], seo: tmp[6], arr: [tmp[4], tmp[5], tmp[6]]}
        }
        if(tmp[6] == "Oui"){
          cpt.seo[tmp[0]] = {id: tmp[4], client: tmp[0], reporting: tmp[5], arr: [tmp[4], tmp[5], tmp[6]]}
        }
        if(tmp[8] == "Oui"){
          cpt.ads[tmp[0]] = {id: tmp[7], client: tmp[0], reporting: tmp[8], budgetfixe: tmp[10], budget: tmp[9], arr: [tmp[7], tmp[8], tmp[9], tmp[10]]}
        }
        if(tmp[10] == "Oui"){
          cpt.budgetFixe[tmp[0]] = {id: tmp[7], reporting: tmp[8], budgetfixe: tmp[10], budget: tmp[9], arr: [tmp[7], tmp[8], tmp[9], tmp[10]]}
        }
        if(tmp[12] == "Oui"){
          cpt.gmc[tmp[0]] = {id: tmp[0], arr: [tmp[11]]}
        }
        if(tmp[13] == "Oui"){
          cpt.goalsCA[tmp[0]] = {ca: tmp[13], ga: tmp[14], arr: [tmp[13], tmp[14]]}
        }
        if(tmp[14] != ""){
          cpt.goalsGA[tmp[0]] = {ca: tmp[13], ga: tmp[14], arr: [tmp[13], tmp[14]]}
        }
      }
  /********************************************************************************************************************************************************//*
    tmpbis = o.people_
    cpt = o.people
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
    Logger.log('ok')
    //this._.global = o.global_
    return o.global


  }
}

/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
class Utils {
  constructor(){

  }
  converthtml(toconvert){
    toconvert = toconvert.replace(/&nbsp;/g," ");toconvert = toconvert.replace(/&amp;/g,"&");toconvert = toconvert.replace(/&euro;/g,"€");toconvert = toconvert.replace(/&pound;/g,"£");toconvert = toconvert.replace(/&yen;/g,"¥");toconvert = toconvert.replace(/&quot;/g,'"');toconvert = toconvert.replace(/&copy;/g,"©");toconvert = toconvert.replace(/&ccedil;/g,"ç");toconvert = toconvert.replace(/&reg;/g,"®");toconvert = toconvert.replace(/&larr;/g,"← →");toconvert = toconvert.replace(/&uarr;/g,"↑ ↓");toconvert = toconvert.replace(/&sect;/g,"§");toconvert = toconvert.replace(/&para;/g,"¶");toconvert = toconvert.replace(/&iquest;/g,"¿");toconvert = toconvert.replace(/&raquo;/g,"»");toconvert = toconvert.replace(/&laquo;/g,"«");toconvert = toconvert.replace(/&micro;/g,"µ");toconvert = toconvert.replace(/&brvbar;/g,"¦");toconvert = toconvert.replace(/&spades;/g,"♠");toconvert = toconvert.replace(/&clubs;/g,"♣");toconvert = toconvert.replace(/&hearts;/g,"♥");toconvert = toconvert.replace(/&diams;/g,"♦");toconvert = toconvert.replace(/&alpha;/g,"α");toconvert = toconvert.replace(/&beta;/g,"β");toconvert = toconvert.replace(/&chi;/g,"χ");toconvert = toconvert.replace(/&gamma;/g,"γ");toconvert = toconvert.replace(/&omega;/g,"ω");toconvert = toconvert.replace(/&Omega;/g,"Ω");toconvert = toconvert.replace(/&Phi;/g,"Φ");toconvert = toconvert.replace(/&Delta;/g,"Δ");toconvert = toconvert.replace(/&Gamma;/g,"Γ");toconvert = toconvert.replace(/&Theta;/g,"Θ");toconvert = toconvert.replace(/&Lambda;/g,"Λ");toconvert = toconvert.replace(/&Sigma;/g,"Σ");toconvert = toconvert.replace(/&epsi;/g,"ε");toconvert = toconvert.replace(/&zeta;/g,"ζ");toconvert = toconvert.replace(/&eta;/g,"η");toconvert = toconvert.replace(/&iota;/g,"ι");toconvert = toconvert.replace(/&kappa;/g,"κ");toconvert = toconvert.replace(/&lambda;/g,"λ");toconvert = toconvert.replace(/&mu;/g,"μ");toconvert = toconvert.replace(/&nu;/g,"ν");toconvert = toconvert.replace(/&xi;/g,"ξ");toconvert = toconvert.replace(/&pi;/g,"π");toconvert = toconvert.replace(/&rho;/g,"ρ");toconvert = toconvert.replace(/&chi;/g,"χ");toconvert = toconvert.replace(/&upsi;/g,"υ");toconvert = toconvert.replace(/&sigmav;/g,"ς");toconvert = toconvert.replace(/&Aacute;/g,"Á");toconvert = toconvert.replace(/&aacute;/g,"á");toconvert = toconvert.replace(/&Acirc;/g,"Â");toconvert = toconvert.replace(/&acirc;/g,"â");toconvert = toconvert.replace(/&agrave;/g,"à");toconvert = toconvert.replace(/&aring;/g,"å");toconvert = toconvert.replace(/&aelig/g,"æ");toconvert = toconvert.replace(/&eacute;/g,"é");toconvert = toconvert.replace(/&ecirc;/g,"ê");toconvert = toconvert.replace(/&egrave;/g,"è");toconvert = toconvert.replace(/&euml;/g,"ë");toconvert = toconvert.replace(/&icirc;/g,"î");toconvert = toconvert.replace(/&iuml;/g,"ï");toconvert = toconvert.replace(/&iacute;/g,"í");toconvert = toconvert.replace(/&igrave;/g,"ì");toconvert = toconvert.replace(/&ocirc;/g,"ô");toconvert = toconvert.replace(/&ouml;/g,"ö");toconvert = toconvert.replace(/&otilde;/g,"õ");toconvert = toconvert.replace(/&oslash;/g,"Ø");toconvert = toconvert.replace(/&œ/g,"œ");toconvert = toconvert.replace(/&ucirc;/g,"û");toconvert = toconvert.replace(/&ugrave;/g,"ù");toconvert = toconvert.replace(/&uacute;/g,"ú");toconvert = toconvert.replace(/&uuml;/g,"ü");toconvert = toconvert.replace(/&yacute;/g,"ý");toconvert = toconvert.replace(/&yuml;/g,"ÿ");toconvert = toconvert.replace(/&deg;/g,"°");toconvert = toconvert.replace(/&permil;/g,"‰");toconvert = toconvert.replace(/&prime;/g,"′");toconvert = toconvert.replace(/&Prime;/g,"″");toconvert = toconvert.replace(/&infin;/g,"∞");toconvert = toconvert.replace(/&plusmn;/g,"±");toconvert = toconvert.replace(/&times;/g,"×");toconvert = toconvert.replace(/&divide;/g,"÷");toconvert = toconvert.replace(/&lt;/g,"<");toconvert = toconvert.replace(/&gt;/g,">");toconvert = toconvert.replace(/&frac14;/g,"¼");toconvert = toconvert.replace(/&frac12;/g,"½");toconvert = toconvert.replace(/&frac34;/g,"¾");toconvert = toconvert.replace(/&sup1;/g,"¹");toconvert = toconvert.replace(/&sup2;/g,"²");toconvert = toconvert.replace(/&sup3;/g,"³");
    return toconvert;
  }
  completedate(time) {
    if(time<10)time = "0" + String(time)
    return time
  }
  getGaDateFormat(o){
    if(typeof o == undefined)o = {date: new Date(), format: "default"}
    else if(typeof o.date == undefined)o.date = new Date()
    else if(typeof o.date == 'string')o.date = new Date(o.date)
    else throw "Il semble y avoir un problème avec le paramètre entré dans la fonction 'Utils::getGaDateFormat'"
    var tmp, d = o.date
    switch(o.format){
      case"ga":
        d = d.getFullYear()+'-'+this.completedate(d.getMonth()+1)+'-'+this.completedate(d.getDate())
      break;
      case"":
      break;
      default:
        d = this.completedate(d.getDate())+"/"+this.completedate(d.getMonth()+1)+"/"+d.getFullYear()
      break;
    }
    return d
  }
  merge(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
  }
}

/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
/********************************************************************************************************************************************************/
