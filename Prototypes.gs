"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prototypes = function () {
    function Prototypes(arr) {
        _classCallCheck(this, Prototypes);

        if (typeof arr != "undefined") for (a in arr) {
            eval("this." + arr[a] + "()");
        } else {
            this.myDate();
            this.myString();
        }
    }

    _createClass(Prototypes, [{
        key: "myString",
        value: function myString() {
            String.prototype.sansAccent = function () {
                var accent = [/[\300-\306]/g, /[\340-\346]/g, // A, a
                /[\310-\313]/g, /[\350-\353]/g, // E, e
                /[\314-\317]/g, /[\354-\357]/g, // I, i
                /[\322-\330]/g, /[\362-\370]/g, // O, o
                /[\331-\334]/g, /[\371-\374]/g, // U, u
                /[\321]/g, /[\361]/g, // N, n
                /[\307]/g, /[\347]/g];
                var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

                var str = this;
                for (var i = 0; i < accent.length; i++) {
                    str = str.replace(accent[i], noaccent[i]);
                }

                return str;
            };
        }
    }, {
        key: "myDate",
        value: function myDate() {
            Date.prototype.getYearDay = function () {
                //1 - 366
                var year = this.getFullYear();
                var month = this.getMonth();
                var day = this.getDate();

                var offset = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

                //l'année bissextile n'est utile qu'à partir de mars
                var bissextile = month < 2 ? 0 : year % 400 == 0 || year % 4 == 0 && year % 100 != 0;

                return parseInt(day + offset[month] + bissextile);
            };

            Date.prototype.getMonday = function () {
                var offset = (this.getDay() + 6) % 7;
                return new Date(this.getFullYear(), this.getMonth(), this.getDate() - offset);
            };

            Date.prototype.getWeek = function () {
                //1 - 53
                var year = this.getFullYear();
                var week;

                //dernier lundi de l'année
                var lastMonday = new Date(year, 11, 31).getMonday();

                //la date est dans la dernière semaine de l'année
                //mais cette semaine fait partie de l'année suivante
                if (this >= lastMonday && lastMonday.getDate() > 28) {
                    week = 1;
                } else {
                    //premier lundi de l'année
                    var firstMonday = new Date(year, 0, 1).getMonday();

                    //correction si nécessaire (le lundi se situe l'année précédente)
                    if (firstMonday.getFullYear() < year) firstMonday = new Date(year, 0, 8).getMonday();

                    //nombre de jours écoulés depuis le premier lundi
                    var days = this.getYearDay() - firstMonday.getYearDay();

                    //window.alert(days);

                    //si le nombre de jours est négatif on va chercher
                    //la dernière semaine de l'année précédente (52 ou 53)
                    if (days < 0) {
                        week = new Date(year, this.getMonth(), this.getDate() + days).getWeek();
                    } else {
                        //numéro de la semaine
                        week = 1 + parseInt(days / 7);

                        //on ajoute une semaine si la première semaine
                        //de l'année ne fait pas partie de l'année précédente
                        week += new Date(year - 1, 11, 31).getMonday().getDate() > 28;
                    }
                }

                return parseInt(week);
            };
        }
    }]);

    return Prototypes;
}();
