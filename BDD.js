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
        for(aa in obj)if(obj.hasOwnProperty(a)){
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
  bddpeople(){var t = this._.people;
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
    var sh = t.getRange(1,1,t.getLastRow(),t.getLastColumn()).getValues()
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
    var tmp,tmpbis,cpt,cptbis
  /********************************************************************************************************************************************************/
  /********************************************************************************************************************************************************/
  /********************************************************************************************************************************************************/
    var sp = SpreadsheetApp.openById('1BXXPAHb6qlyKj_zUyhtZAaVuUppI8nffxB9E5OW0Iss')
    var global = sp.getSheetByName('global')
    var people = sp.getSheetByName('people')
    var email = sp.getSheetByName('Email')
    var Object = {}

    Object.global_ = global.getRange(2,1,global.getLastRow(),global.getLastColumn())
    Object.global = {clients: {}, managers: {}, ga: {}, seo: {}, ads: {}, budgetFixe: {}, gmc: {}, goalsCA: {}, goalsGA: {}}
    //Object.people_ = people.getRange(1,1,people.getLastRow(),people.getLastColumn()).getValues()
    //Object.people = {employer: {}, employers: {}, global: {}, ads: {}, seo: {}}

  /********************************************************************************************************************************************************/
    var headers = []
    tmpbis = Object.global_.getValues()
    cpt = Object.global
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
    Logger.log('ok')
    this._.global = Object.global_
    return Object.global


  }
}
