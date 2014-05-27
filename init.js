var xmlHttp = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
 try {
    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
     try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
     } catch (e2) {
        xmlHttp = false;
     }
 }
 @end @*/

if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
    xmlHttp = new XMLHttpRequest();
}

function Get_Cookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if (( !start ) && ( name != document.cookie.substring(0, name.length) )) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function hidelayer(layer_ref) {
    state = 'hidden';
    if (document.all) { //IS IE 4 or 5 (or 6 beta)
        eval("if( document.all." + layer_ref + " ) document.all." + layer_ref + ".style.visibility = state");
    }
    if (document.layers) { //IS NETSCAPE 4 or below
        if (document.layers[layer_ref]) document.layers[layer_ref].visibility = state;
    }
    if (document.getElementById && !document.all) {
        maxwell_smart = document.getElementById(layer_ref);
        if (maxwell_smart) maxwell_smart.style.visibility = state;
    }
}

function showlayer(layer_ref) {
    state = 'visible';
    if (document.all) { //IS IE 4 or 5 (or 6 beta)
        eval("if( document.all." + layer_ref + " ) document.all." + layer_ref + ".style.visibility = state");
    }
    if (document.layers) { //IS NETSCAPE 4 or below
        if (document.layers[layer_ref]) document.layers[layer_ref].visibility = state;
    }
    if (document.getElementById && !document.all) {
        maxwell_smart = document.getElementById(layer_ref);
        if (maxwell_smart) maxwell_smart.style.visibility = state;
    }
}


function GotoContent() {
    window.location.replace("#label" + document.bookfooter.contents.value);
}

function getBodyScrollTop() {
    return self.pageYOffset ||
        (document.documentElement && document.documentElement.scrollTop) ||
        (document.body && document.body.scrollTop);
}

function getDocumentHeight() {
    return (document.body.scrollHeight > document.body.offsetHeight) ?
        document.body.scrollHeight :
        document.body.offsetHeight;
}

var timeoutpid = 0;
function ServerStatus() {
    if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
        if (response.length > 2) {
            document.getElementById('note').innerHTML = '<br>' + response;
            showlayer('note');
            clearTimeout(timeoutpid);
            timeoutpid = setTimeout("document.getElementById('note').innerHTML = ''; hidelayer('note');", 10000);
        }
    }
}


function SavePosition() {
    var pos = getBodyScrollTop();
    var height = getDocumentHeight();
    var percent = Math.round(pos * 100000 / height);
    var url = "/saveBookPos.php?book=1019974&pos=" + percent;
    document.cookie = "booklastposition1019974=" + percent + "; path=/; expires=Mon, 01-Jan-2050 00:00:00 GMT";
    p = percent / 1000;
    document.getElementById('scrollpercent').innerHTML = p.toFixed(1) + '%';
}

function RestorePosition(ppos) {
    var percent = Get_Cookie('booklastposition1019974');
    if (ppos) {
        percent = ppos;
    }
    else {
        document.bgColor = 'ffffff';
        document.fgColor = '363636';
        var b = document.getElementsByTagName('p');
        for (i = 0; i < b.length; i++) {
            b[i].style.fontSize = '14px';

        }
    }
    var height = getDocumentHeight();
    var pos = Math.round(percent * height / 100000);
    if (percent > 0) {
        if (typeof( window.pageYOffset ) == 'number') {
            window.pageYOffset = pos;
        }
        else if (document.body && ( document.body.scrollLeft || document.body.scrollTop )) {
            document.body.scrollTop = pos;
        }
        else if (document.documentElement && document.documentElement.scrollTop) {
            document.documentElement.scrollTop = pos;
        }
        window.scroll(0, pos);
    }
    document.getElementById('note').innerHTML = '';
}

function ReaderSettings() {
    var bcolor = document.bookfooter.backgroundcolor.value;
    if (bcolor.length == 6) {
        document.bgColor = "#" + bcolor;
        document.cookie = "bgColor=" + bcolor + "; path=/; expires=Mon, 01-Jan-2050 00:00:00 GMT";
    }
    var fcolor = document.bookfooter.textcolor.value;
    if (fcolor.length == 6) {
        document.fgColor = "#" + fcolor;
        document.cookie = "fgColor=" + fcolor + "; path=/; expires=Mon, 01-Jan-2050 00:00:00 GMT";
    }
    var fsize = document.bookfooter.fsize.value;
    if (fsize > 4) {
        var pos = getBodyScrollTop();
        var height = getDocumentHeight();
        var percent = Math.round(pos * 100000 / height);
        var b = document.getElementsByTagName('p');
        for (i = 0; i < b.length; i++) {
            b[i].style.fontSize = fsize + "px";

        }
        if (percent == 0) percent = 1;
        setTimeout("RestorePosition(" + percent + ")", 500);
        document.cookie = "fontSize=" + fsize + "; path=/; expires=Mon, 01-Jan-2050 00:00:00 GMT";
    }

}

function DisplaySettings(id) {
    state = 'unknown';
    if (document.all) { //IS IE 4 or 5 (or 6 beta)
        eval("if( document.all." + id + " ) state=document.all." + id + ".style.display");
    }
    if (document.layers) { //IS NETSCAPE 4 or below
        if (document.layers[id]) state = document.layers[id].display;
    }
    if (document.getElementById && !document.all) {
        maxwell_smart = document.getElementById(id);
        if (maxwell_smart) state = maxwell_smart.style.display;
    }
    if (state == 'none') state = 'inline';
    else state = 'none';
    if (document.all) {
        eval("if( document.all." + id + " ) document.all." + id + ".style.display = state");
    }
    if (document.layers) {
        if (document.layers[id]) document.layers[id].display = state;
    }
    if (document.getElementById && !document.all) {
        maxwell_smart = document.getElementById(id);
        if (maxwell_smart) maxwell_smart.style.display = state;
    }
}

function tableruler() {
    return 0;
}
