/*
    =============================================================================
    *****************************************************************************
    The contents of this file are subject to the Mozilla Public License
    Version 1.1 (the "License"); you may not use this file except in
    compliance with the License. You may obtain a copy of the License at
    http://www.mozilla.org/MPL/

    Software distributed under the License is distributed on an "AS IS"
    basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
    License for the specific language governing rights and limitations
    under the License.

    The Original Code is jsAvroPhonetic

    The Initial Developer of the Original Code is
    Mehdi Hasan Khan <mhasan@omicronlab.com>

    Copyright (C) OmicronLab (http://www.omicronlab.com). All Rights Reserved.


    Contributor(s): ______________________________________.

    *****************************************************************************
    =============================================================================
*/


// var start, end, time = new Date().getTime();
// start = new Date().getTime();

imports.searchPath.unshift('.');
const db = imports.database;
const RegexServer = imports.avroregexlib;
const utfconv = imports.utf8;

function DBSearch () {
    this._init();
}

DBSearch.prototype = {
    
	search: function (enText) {
        
        var lmc = enText.toLowerCase().charAt(0); 
        var tableList = [];
        switch (lmc) {
            case 'a':
                tableList = ["a", "aa", "e", "oi", "o", "nya", "y"];
                break;
            case 'b':
                tableList = ["b", "bh"];
                break;
            case 'c':
                tableList = ["c", "ch", "k"];
                break;
            case 'd':
                tableList = ["d", "dh", "dd", "ddh"];
                break;
            case 'e':
                tableList = ["i", "ii", "e", "y"];
                break;
            case 'f':
                tableList = ["ph", "e"];
                break;
            case 'g':
                tableList = ["g", "gh", "j"];
                break;
            case 'h':
                tableList = ["h", "e"];
                break;
            case 'i':
                tableList = ["aa", "i", "ii", "y"];
                break;
            case 'j':
                tableList = ["j", "jh", "z"];
                break;
            case 'k':
                tableList = ["k", "kh"];
                break;
            case 'l':
                tableList = ["l", "e"];
                break;
            case 'm':
                tableList = ["e", "h", "m"];
                break;
            case 'n':
                tableList = ["e", "n", "nya", "nga", "nn"];
                break;
            case 'o':
                tableList = ["a", "u", "uu", "oi", "o", "ou", "y"];
                break;
            case 'p':
                tableList = ["p", "ph"];
                break;
            case 'q':
                tableList = ["k"];
                break;
            case 'r':
                tableList = ["aa", "rri", "h", "r", "rr", "rrh"];
                break;
            case 's':
                tableList = ["e", "s", "sh", "ss"];
                break;
            case 't':
                tableList = ["t", "th", "tt", "tth", "khandatta"];
                break;
            case 'u':
                tableList = ["i", "u", "uu", "y"];
                break;
            case 'v':
                tableList = ["bh"];
                break;
            case 'w':
                tableList = ["o", "dd"];
                break;
            case 'x':
                tableList = ["e", "k"];
                break;
            case 'y':
                tableList = ["i", "o", "y"];
                break;
            case 'z':
                tableList = ["h", "j", "jh", "z"];
                break;
            default:
                break;
         }
         
         var pattern = this._regex.parse(enText);
         pattern = '^' + pattern + '$';
         
        var retWords = [];
        
        for(i in tableList) {
             var table = 'w_' + tableList[i];
             retWords = retWords.concat(this._searchInArray(pattern, db.tables[table]));
         }
        
        return retWords;
  	},
  	
  	
  	_searchInArray: function(pattern, wArray){
        var retWords = [];
        var word = '';
        var re = new RegExp(pattern);

        for (w in wArray){
            word = wArray[w];
            if (re.test(word)){
                retWords.push(word);
            }
        }
  	    return retWords;
  	},


	_printWords: function (enText) {
	    var words = this.search(enText);
	    for (w in words){
            print(words[w]);
        }
  	},
  	
  	
	_init: function () {
        this._regex = new RegexServer.AvroRegex();
  	}
}


/* --------- */
/* Test code */
/* --------- */
// var __dbSearch = new DBSearch ();
// end = new Date().getTime();
// time = end - start;
// print("Loading took: " + time);
// 
// start = new Date().getTime();
// 
// __dbSearch._printWords('onirban');
// 
// end = new Date().getTime();
// time = end - start;
// print("Searching took: " + time);