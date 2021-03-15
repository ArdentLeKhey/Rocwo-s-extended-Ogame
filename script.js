// ==UserScript==
// @name         Rocwo's extended Ogame
// @namespace    https://github.com/ArdentLeKhey
// @version      0.1
// @description  Displays the exact bidding time (note that this time is randomized and that this script only displays a time as an indication)
// @author       Rocwo
// @grant        none
// @include      *.ogame*gameforge.com/game/index.php*
// ==/UserScript==



(function() {
    'use strict';

    function _GET(param) {
        var vars = {};
        window.location.href.replace( location.hash, '' ).replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    }

    function _GET_ANCRE(param) {
        var vars = {};
        window.location.hash.replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    }

    function SEC_TO_MIN(s){
        var str = (Math.floor(s/60)).toString() + "m " + (s%60).toString() + "s";
        return str;
    }

    var _GET = _GET();
    var _GET_ANCRE = _GET_ANCRE();

    var _5min = false;
    var timer = 0;
    setInterval(function(){
        if(_GET.page == "ingame" && _GET.component == "traderOverview" && _GET_ANCRE.page == "traderAuctioneer"){
            var native_timer = document.getElementsByClassName("auction_info")[0];
            if(native_timer.textContent.substr(15,2) == "5m"){
                if(!_5min){
                    _5min = true;
                    timer = 5*60-1;
                } else if(timer > 0){
                    timer--;
                    //console.log("timer : " + SEC_TO_MIN(timer));
                } else if(timer == 0){
                    //console.log("timer : " + SEC_TO_MIN(timer));
                }
                (function(elem){elem.innerHTML = elem.textContent.substr(0,42) + '<br><span style="color:#FF0000;">' + "(" + SEC_TO_MIN(timer) + ")" + '</span>'})(native_timer);
            } else {
                _5min = false;
            }
        }
    }, 1000);
})();
