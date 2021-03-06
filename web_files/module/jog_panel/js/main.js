// UTF8 without BOM

/*
    JOG PANEL
*/
// JOG panel vars and functions
var jog =
{
    db: {},

    halsock:                false,
    halsock_open:           false,
    lcncsock:               false,
    lcncsock_open:          false,
    
    axes_used:  [],

    hotkeys:
    [
        // HOME buttons
        { name: "homeALL",        title: "HOME ALL", ctrl:0, shift:0, alt:0, key:36 }, // SHIFT + Home
        { name: "homeXY",         title: "HOME XY", ctrl:0, shift:0, alt:0, key:101 }, // SHIFT + num 5
        { name: "homeZ",          title: "HOME Z", ctrl:0, shift:0, alt:0, key:106 }, // SHIFT + num *
        { name: "homeA",          title: "HOME A", ctrl:0, shift:0, alt:0, key:111 }, // SHIFT + Num /
        // L1 buttons
        { name: "negX1",          title: "X - L1", ctrl:0, shift:0, alt:0, key:100 }, // SHIFT + num 4
        { name: "posX1",          title: "X + L1", ctrl:0, shift:0, alt:0, key:102 }, // SHIFT + num 6
        { name: "negY1",          title: "Y - L1", ctrl:0, shift:0, alt:0, key:98 }, // SHIFT + num 2
        { name: "posY1",          title: "Y + L1", ctrl:0, shift:0, alt:0, key:104 }, // SHIFT + num 8
        { name: "negX1_negY1",    title: "X - L1, Y - L1", ctrl:0, shift:0, alt:0, key:97 }, // SHIFT + num 1
        { name: "negX1_posY1",    title: "X - L1, Y + L1", ctrl:0, shift:0, alt:0, key:103 }, // SHIFT + num 7
        { name: "posX1_negY1",    title: "X + L1, Y - L1", ctrl:0, shift:0, alt:0, key:99 }, // SHIFT + num 3
        { name: "posX1_posY1",    title: "X + L1, Y + L1", ctrl:0, shift:0, alt:0, key:105 }, // SHIFT + num 9
        { name: "negZ1",          title: "Z - L1", ctrl:0, shift:0, alt:0, key:109 }, // SHIFT + num -
        { name: "posZ1",          title: "Z + L1", ctrl:0, shift:0, alt:0, key:107 }, // SHIFT + num +
        { name: "negA1",          title: "A - L1", ctrl:0, shift:0, alt:0, key:96 }, // SHIFT + num 0
        { name: "posA1",          title: "A + L1", ctrl:0, shift:0, alt:0, key:110 }, // SHIFT + num .
        // L2 buttons
        { name: "negX2",          title: "X - L2", ctrl:0, shift:0, alt:1, key:100 }, // ALT + num 4
        { name: "posX2",          title: "X + L2", ctrl:0, shift:0, alt:1, key:102 }, // ALT + num 6
        { name: "negY2",          title: "Y - L2", ctrl:0, shift:0, alt:1, key:98 }, // ALT + num 2
        { name: "posY2",          title: "Y + L2", ctrl:0, shift:0, alt:1, key:104 }, // ALT + num 8
        { name: "negX2_negY2",    title: "X - L2, Y - L2", ctrl:0, shift:0, alt:1, key:97 }, // ALT + num 1
        { name: "negX2_posY2",    title: "X - L2, Y + L2", ctrl:0, shift:0, alt:1, key:103 }, // ALT + num 7
        { name: "posX2_negY2",    title: "X + L2, Y - L2", ctrl:0, shift:0, alt:1, key:99 }, // ALT + num 3
        { name: "posX2_posY2",    title: "X + L2, Y + L2", ctrl:0, shift:0, alt:1, key:105 }, // ALT + num 9
        { name: "negZ2",          title: "Z - L2", ctrl:0, shift:0, alt:1, key:109 }, // ALT + num -
        { name: "posZ2",          title: "Z + L2", ctrl:0, shift:0, alt:1, key:107 }, // ALT + num +
        { name: "negA2",          title: "A - L2", ctrl:0, shift:0, alt:1, key:96 }, // ALT + PageUp
        { name: "posA2",          title: "A + L2", ctrl:0, shift:0, alt:1, key:110 }, // ALT + PageDown
        // L1 +
        { name: "posA1",          title: "A + L1", ctrl:0, shift:0, alt:0, key:231 } // SHIFT + num ,
    ],

    key_names:
    {
        8 : "BACKSPACE",
        9 : "TAB",
        13 : "ENTER",
        16 : "SHIFT",
        17 : "CTRL",
        18 : "ALT",
        19 : "PAUSE",
        20 : "CAPS LOCK",
        27 : "ESCAPE",
        33 : "PAGE UP",
        34 : "PAGE DOWN",
        35 : "END",
        36 : "HOME",
        37 : "LEFT",
        38 : "UP",
        39 : "RIGHT",
        40 : "DOWN",
        45 : "INSERT",
        46 : "DELETE",
        91 : "LEFT WIN",
        92 : "RIGHT WIN",
        93 : "SELECT",
        96 : "NUM 0",
        97 : "NUM 1",
        98 : "NUM 2",
        99 : "NUM 3",
        100 : "NUM 4",
        101 : "NUM 5",
        102 : "NUM 6",
        103 : "NUM 7",
        104 : "NUM 8",
        105 : "NUM 9",
        106 : "NUM *",
        107 : "NUM +",
        109 : "NUM -",
        110 : "NUM .",
        111 : "NUM /",
        112 : "F1",
        113 : "F2",
        114 : "F3",
        115 : "F4",
        116 : "F5",
        117 : "F6",
        118 : "F7",
        119 : "F8",
        120 : "F9",
        121 : "F10",
        122 : "F11",
        123 : "F12",
        144 : "NUM LOCK",
        145 : "SCROLL LOCK",
        186 : ";",
        187 : "=",
        188 : ",",
        189 : "-",
        190 : ".",
        191 : "/",
        192 : "`",
        219 : "[",
        220 : "\\",
        221 : "]",
        222 : "'",
        231 : "NUM ,"
    }
};

// make a default copy of the hotkeys
jog.hotkeys_defaults = JSON.parse( JSON.stringify(jog.hotkeys) );

// have we a localStorage?
if ( window.localStorage !== null ) jog.db = window.localStorage;




// simple click animation
jog.simpleClickAnimation = function ( id )
{
    document.querySelector("#"+id).style.opacity = "0";
    setTimeout( 'document.querySelector("#'+id+'").style.opacity = "1";', 200 );
}
jog.simplePressedAnimation = function ( id )
{
    document.querySelector("#"+id).style.opacity = "0.2";
}
jog.simpleUnpressedAnimation = function ( id )
{
    document.querySelector("#"+id).style.opacity = "1";
}
// simple Button Action Effect
jog.simpleButtonEffect = function ( id, success, text, code_after )
{
    var btn_box = document.querySelector("#" + id);

    if ( btn_box.dataset.animated && btn_box.dataset.animated == "1" ) return;

    var _color       = btn_box.style.color,
        _text        = btn_box.innerHTML,
        _backColor   = btn_box.style.backgroundColor;

    btn_box.dataset.animated        = "1";
    btn_box.style.color             = success ? "green" : "red";
    btn_box.style.backgroundColor   = success ? "rgba(0,255,0,0.2)" : "rgba(255,0,0,0.2)";
    if ( text ) btn_box.innerHTML   = text;

    setTimeout (
        'var btn_box = document.querySelector("#' + id + '");' +
        'btn_box.style.color = "' + _color + '";' +
        'btn_box.style.backgroundColor = "' + _backColor + '";' +
        ( text ? 'btn_box.innerHTML = "' + _text + '";' : '' ) +
        'btn_box.dataset.animated = "0";' +
        ( code_after ? code_after : '' ),
        1500
    );
}




jog.halsock_onopen = function(e)
{
    if ( !jog.halsock_open ) log.add("[JOG] HAL socket is open","green");
    jog.halsock_open = true;
    // send hello with some passwords
    jog.halsock.send("hello "+HALRMT_HELLO_PASSWORD+" joghal 1\r\n");
    // check axis count
    jog.axes_count_answers = 0;
    jog.axes_used = [];
    setTimeout(
        function() {
            var msg = "";
            for ( var a = 0; a < AXES.length; a++ ) msg += "get pinval ini."+a+".max_acceleration\r\n";
            jog.halsock.send(msg);
        },
        200
    );
}
jog.halsock_onmessage = function(e)
{
    var answers = e.data.match(/PINVAL[\ \t]+ini\.[0-9]+\.max_acceleration[\ \t]+[\-\.0-9]+/igm);

    if ( answers ) {
        jog.axes_count_answers += answers.length;
        for ( var s = 0, p; s < answers.length; s++ ) {
            p       = answers[s].match(/\-?[0-9](\.?[0-9]+)?/g);
            p[0]    = n(p[0]);

            if ( n(p[1]) > 0 && p[0] >= 0 && p[0] < AXES.length )
                jog.axes_used[ jog.axes_used.length ] = AXES[ p[0] ];
        }
    }

    if ( jog.axes_count_answers >= AXES.length ) {
        // remove current JOG rows before inserting something new
        var children = document.querySelectorAll("#JOG_table div.row");
        var jog_table = document.querySelector("#JOG_table");
        for ( var i = 0; i < children.length; i++ ) jog_table.removeChild(children[i]);

        switch ( jog.axes_used.join("") ) {
            case "xy": // laser, plasma
                loadto( "web_files/module/jog_panel/html/JOG_table_xy.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "xz": // lathe
                loadto( "web_files/module/jog_panel/html/JOG_table_xz.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "xyz": // router
                loadto( "web_files/module/jog_panel/html/JOG_table_xyz.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "xza": // rotary axis A along X
                loadto( "web_files/module/jog_panel/html/JOG_table_xza.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "yzb": // rotary axis B along Y
                loadto( "web_files/module/jog_panel/html/JOG_table_yzb.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "xyza": // with rotary axis A along X
                loadto( "web_files/module/jog_panel/html/JOG_table_xyza.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "xyzb": // with rotary axis B along Y
                loadto( "web_files/module/jog_panel/html/JOG_table_xyzb.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "xyzab": // with rotate table
                loadto( "web_files/module/jog_panel/html/JOG_table_xyzab.html", "before", "#JOG_table", jog.jog_table_init ); break;
            case "xyzac": // with rotate head
                loadto( "web_files/module/jog_panel/html/JOG_table_xyzac.html", "before", "#JOG_table", jog.jog_table_init ); break;
            default:
                loadto( "web_files/module/jog_panel/html/JOG_table_xyzabc.html", "before", "#JOG_table", jog.jog_table_init );
        }
    }

}
jog.halsock_onclose = function(e)
{
    if ( jog.halsock_open ) log.add("[JOG] HAL socket is closed ("+e.code+":"+e.reason+")","red");
    jog.halsock_open = false;
}

jog.lcncsock_onopen = function(e)
{
    if ( !jog.lcncsock_open ) log.add("[JOG] LCNC socket is open","green");
    jog.lcncsock_open = true;
    // send hello with some passwords
    jog.lcncsock.send("hello "+LINUXCNCRSH_HELLO_PASSWORD+" joglcnc 1\r\n");
}
jog.lcncsock_onmessage = function(e)
{
}
jog.lcncsock_onclose = function(e)
{
    if ( jog.lcncsock_open ) log.add("[JOG] LCNC socket is closed ("+e.code+":"+e.reason+")","red");
    jog.lcncsock_open = false;
}

jog.check_sockets = function()
{
    if ( !parent.location.protocol.match("http") ) return;
    if ( !jog.halsock_open ) {
        jog.halsock = websock.create(HALSOCK_URL, SOCK_PROTO, jog.halsock_onopen, jog.halsock_onmessage, jog.halsock_onclose);
    }
    if ( !jog.lcncsock_open ) {
        jog.lcncsock = websock.create(LCNCSOCK_URL, SOCK_PROTO, jog.lcncsock_onopen, jog.lcncsock_onmessage, jog.lcncsock_onclose);
    }
}




// here is a good place to send command text to the LinuxCNC controller
jog.exec_mdi = function ( outcmd )
{
    if ( !jog.lcncsock_open ) {
        log.add("[JOG] LCNC socket isn't available","red");
        return;
    }
    if ( typeof(outcmd) == "string" ) outcmd = [outcmd];

    var mdi = "";
    for ( var i = 0; i < outcmd.length; i++ ) {
        if ( outcmd[i].trim() != "" ) mdi += "set mdi " + outcmd[i] + "\r\n";
    }

    if ( mdi == "" ) return;

    jog.lcncsock.send(
        "set enable " + LINUXCNCRSH_ENABLE_PASSWORD + "\r\n" +
        "set mode mdi\r\n" +
        mdi +
        "set enable off\r\n"
    );

    log.add("[JOG] " + outcmd.join(" "));
}
jog.exec = function ( outcmd )
{
    if ( !jog.lcncsock_open ) {
        log.add("[JOG] LCNC socket isn't available","red");
        return;
    }
    if ( outcmd.trim() == "" ) return;

    jog.lcncsock.send(
        "set enable " + LINUXCNCRSH_ENABLE_PASSWORD + "\r\n" +
        outcmd +
        "set enable off\r\n"
    );

    log.add("[JOG] lcnc " + outcmd);
}




jog.set_html = function ( element, content, wrapper )
{
    if ( typeof(element) == "string" ) element = document.querySelector(element);
    if ( !element ) return;
    
    element.innerHTML = wrapper ? 
    "<"+wrapper+">" + content + "</"+wrapper+">":
    content;
}




// any of inputs was changed
jog.inputs_changed = function ( event )
{
    switch ( event.target.id )
    {
        case "jog_type":
            jog.db["jog.type"] = document.querySelector("#" + event.target.id).value; break;

        case "jog_inputs_feed":
            jog.db["jog.feed"] = document.querySelector("#" + event.target.id).value; break;

        case "jog_inputs_L1":
        case "jog_inputs_L2":
            // saving actual values
            jog.db["jog.L1"] = document.querySelector("#jog_inputs_L1").value;
            jog.db["jog.L2"] = document.querySelector("#jog_inputs_L2").value;

            // conversation to unsigned numbers
            var L1_pos  = n( jog.db["jog.L1"] );
            var L1_neg  = -1 * L1_pos;
            var L2_pos  = n( jog.db["jog.L2"] );
            var L2_neg  = -1 * L2_pos;

            // changing buttons texts
            for ( var a = 0, axis; a < AXES.length; a++ ) {
                if ( jog.axes_used.indexOf(AXES[a]) < 0 ) continue;
                axis = AXES[a].toUpperCase();
                jog.set_html( "#jog_btn_neg"+axis+"1", L1_neg, "div" );
                jog.set_html( "#jog_btn_pos"+axis+"1", L1_pos, "div" );
                jog.set_html( "#jog_btn_neg"+axis+"2", L2_neg, "div" );
                jog.set_html( "#jog_btn_pos"+axis+"2", L2_pos, "div" );
            }

            if ( jog.axes_used.join("").match(/^xy/i) ) {
                jog.set_html( "#jog_btn_negX1_negY1", "X" + L1_neg + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negX2_negY1", "X" + L2_neg + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negX1_negY2", "X" + L1_neg + "<br />" + "Y" + L2_neg, "div" );
                jog.set_html( "#jog_btn_negX2_negY2", "X" + L2_neg + "<br />" + "Y" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posX1_posY1", "X" + L1_pos + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posX2_posY1", "X" + L2_pos + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posX1_posY2", "X" + L1_pos + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posX2_posY2", "X" + L2_pos + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negX1_posY1", "X" + L1_neg + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negX2_posY1", "X" + L2_neg + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negX1_posY2", "X" + L1_neg + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negX2_posY2", "X" + L2_neg + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posX1_negY1", "X" + L1_pos + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posX2_negY1", "X" + L2_pos + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posX1_negY2", "X" + L1_pos + "<br />" + "Y" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posX2_negY2", "X" + L2_pos + "<br />" + "Y" + L2_neg, "div" );
            }

            if ( jog.axes_used.join("").match(/^xza$/i) ) {
                jog.set_html( "#jog_btn_negX1_negA1", "X" + L1_neg + "<br />" + "A" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negX2_negA1", "X" + L2_neg + "<br />" + "A" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negX1_negA2", "X" + L1_neg + "<br />" + "A" + L2_neg, "div" );
                jog.set_html( "#jog_btn_negX2_negA2", "X" + L2_neg + "<br />" + "A" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posX1_posA1", "X" + L1_pos + "<br />" + "A" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posX2_posA1", "X" + L2_pos + "<br />" + "A" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posX1_posA2", "X" + L1_pos + "<br />" + "A" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posX2_posA2", "X" + L2_pos + "<br />" + "A" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negX1_posA1", "X" + L1_neg + "<br />" + "A" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negX2_posA1", "X" + L2_neg + "<br />" + "A" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negX1_posA2", "X" + L1_neg + "<br />" + "A" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negX2_posA2", "X" + L2_neg + "<br />" + "A" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posX1_negA1", "X" + L1_pos + "<br />" + "A" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posX2_negA1", "X" + L2_pos + "<br />" + "A" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posX1_negA2", "X" + L1_pos + "<br />" + "A" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posX2_negA2", "X" + L2_pos + "<br />" + "A" + L2_neg, "div" );
            }

            if ( jog.axes_used.join("").match(/^yzb$/i) ) {
                jog.set_html( "#jog_btn_negB1_negY1", "B" + L1_neg + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negB2_negY1", "B" + L2_neg + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negB1_negY2", "B" + L1_neg + "<br />" + "Y" + L2_neg, "div" );
                jog.set_html( "#jog_btn_negB2_negY2", "B" + L2_neg + "<br />" + "Y" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posB1_posY1", "B" + L1_pos + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posB2_posY1", "B" + L2_pos + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posB1_posY2", "B" + L1_pos + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posB2_posY2", "B" + L2_pos + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negB1_posY1", "B" + L1_neg + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negB2_posY1", "B" + L2_neg + "<br />" + "Y" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negB1_posY2", "B" + L1_neg + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negB2_posY2", "B" + L2_neg + "<br />" + "Y" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posB1_negY1", "B" + L1_pos + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posB2_negY1", "B" + L2_pos + "<br />" + "Y" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posB1_negY2", "B" + L1_pos + "<br />" + "Y" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posB2_negY2", "B" + L2_pos + "<br />" + "Y" + L2_neg, "div" );
            }

            if ( jog.axes_used.join("").match(/^xz$/i) ) {
                jog.set_html( "#jog_btn_negZ1_negX1", "Z" + L1_neg + "<br />" + "X" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negZ2_negX1", "Z" + L2_neg + "<br />" + "X" + L1_neg, "div" );
                jog.set_html( "#jog_btn_negZ1_negX2", "Z" + L1_neg + "<br />" + "X" + L2_neg, "div" );
                jog.set_html( "#jog_btn_negZ2_negX2", "Z" + L2_neg + "<br />" + "X" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posZ1_posX1", "Z" + L1_pos + "<br />" + "X" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posZ2_posX1", "Z" + L2_pos + "<br />" + "X" + L1_pos, "div" );
                jog.set_html( "#jog_btn_posZ1_posX2", "Z" + L1_pos + "<br />" + "X" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posZ2_posX2", "Z" + L2_pos + "<br />" + "X" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negZ1_posX1", "Z" + L1_neg + "<br />" + "X" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negZ2_posX1", "Z" + L2_neg + "<br />" + "X" + L1_pos, "div" );
                jog.set_html( "#jog_btn_negZ1_posX2", "Z" + L1_neg + "<br />" + "X" + L2_pos, "div" );
                jog.set_html( "#jog_btn_negZ2_posX2", "Z" + L2_neg + "<br />" + "X" + L2_pos, "div" );
                jog.set_html( "#jog_btn_posZ1_negX1", "Z" + L1_pos + "<br />" + "X" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posZ2_negX1", "Z" + L2_pos + "<br />" + "X" + L1_neg, "div" );
                jog.set_html( "#jog_btn_posZ1_negX2", "Z" + L1_pos + "<br />" + "X" + L2_neg, "div" );
                jog.set_html( "#jog_btn_posZ2_negX2", "Z" + L2_pos + "<br />" + "X" + L2_neg, "div" );
            }
    }
}

jog.on_mouseup = function ( event )
{
    if ( !jog.btn_pressed_id ) return;

    jog.btn_clicked( { target: { id: jog.btn_pressed_id }, type: "mouseup" } );
}

// some of the move buttons was clicked
jog.btn_clicked = function ( event )
{
    var id;

    if ( /^jog_btn_/.test(event.target.id) ) id = event.target.id;
    else if ( /^jog_btn_/.test(event.target.parentElement.id) ) id = event.target.parentElement.id;
    else return;

    var jog_type = document.querySelector("#jog_type").value;
    
    if ( jog_type == "auto" || /^jog_btn_(home|stop)/.test(id) ) { // auto mode or GOTO/STOpALL btns
        if ( event.type == "mouseup" ) return;
        jog.simpleClickAnimation(id);
    } else { // manual mode
        if ( event.type == "mousedown" ) { // btn pressed
            jog.btn_pressed_id = id;
            jog.simplePressedAnimation(id);
        } else { // btn released
            jog.btn_pressed_id = false;
            jog.simpleUnpressedAnimation(id);
            jog.exec_mdi("G4 P0.01"); // stop any movements
            return;
        }
    }
    
    // stop all movements
    if ( id == "jog_btn_stopALL" ) {
        jog.exec_mdi("G4 P0.01");
        return;
    }

    var feed = n( document.querySelector("#jog_inputs_feed").value );

    // GOTO buttons
    if ( /^jog_btn_home/.test(id) ) {
        if ( /home[XYZABC]$/.test(id) ) { // single axis
            jog.exec_mdi( ["G90", "G1 " + id.match(/([XYZABC])$/i)[0] + "0 F" + feed] );
        } else if ( /home[XYZABC]{2}$/.test(id) ) { // double axes
            var axes = id.match(/([XYZABC])([XYZABC])$/i); axes.shift();
            jog.exec_mdi( ["G90", "G1 " + axes.join("0 ") + "0 F" + feed] );
        } else { // all axes
            jog.exec_mdi( ["G90", "G1 " + jog.axes_used.join("0 ").toUpperCase() + "0 F" + feed] );
        }
        return;
    }

    var L1 = n( document.querySelector("#jog_inputs_L1").value );
    var L2 = n( document.querySelector("#jog_inputs_L2").value );

    if ( /btn_(pos|neg)([XYZABC])([0-9])$/.test(id) ) { // +/- of single axis
        var p = id.match( /(pos|neg)([XYZABC])([0-9])$/ );
        jog.exec_mdi( [
            "G91", 
            "G1 " + p[2] + (p[1] == "neg" ? "-" : "") + Math.abs(p[3] == "1" ? L1 : L2) + " F" + feed,
            "G90"
        ] );
    } else if ( /btn_(pos|neg)([XYZABC])([0-9])_(pos|neg)([XYZABC])([0-9])$/.test(id) ) { // +/- of double  axes
        var p = id.match( /(pos|neg)([XYZABC])([0-9])_(pos|neg)([XYZABC])([0-9])$/ );
        jog.exec_mdi( [
            "G91", 
            "G1 " + p[2] + (p[1] == "neg" ? "-" : "") + Math.abs(p[3] == "1" ? L1 : L2) + 
            " "   + p[5] + (p[4] == "neg" ? "-" : "") + Math.abs(p[6] == "1" ? L1 : L2) + " F" + feed,
            "G90"
        ] );
    }
}




// catch any input elements focus state
jog.on_input_focus_in = function()
{
    jog.input_is_active = true;
}
jog.on_input_focus_out = function()
{
    jog.input_is_active = false;
}

// any keyboard key was pressed
jog.on_keyboard_key = function ( event )
{
    if ( !jog.hotkeys_enabled || jog.input_is_active || jog.settings_visible ) return;

    for ( var i = jog.hotkeys.length - 1; i >= 0; i-- )
    {
        if
        (
            jog.hotkeys[i].alt   == event.altKey &&
            jog.hotkeys[i].shift == event.shiftKey &&
            jog.hotkeys[i].ctrl  == event.ctrlKey &&
            jog.hotkeys[i].key   == event.keyCode
        )
        {
            jog.btn_clicked( { target: { id: "jog_btn_" + jog.hotkeys[i].name } } );
            return;
        }
    }
}

// blur any input element on keyboard ENTER key
jog.on_input_keyup = function ( event )
{
    if ( event.keyCode == 13 ) this.blur();
}




// open/close settings window
jog.settings_show = function()
{
    if ( jog.settings_visible ) return;

    document.querySelector("#JOG_settings").style.display = "block";
    jog.settings_visible = true;
}
jog.settings_hide = function ( event )
{
    if ( ! jog.settings_visible ) return;

    document.querySelector("#JOG_settings").style.display = "none";
    jog.settings_visible = false;
}




// on settings tab click
jog.on_settings_tab_click = function ( event )
{
    var tab         = event.target,
        tab_parent  = tab.parentElement,
        tab_index   = tab_parent.children.length - 1,
        contents    = document.querySelector("#jog_settings_tabs_content");

    for ( ; tab_index >= 0; tab_index-- )
    {
        if ( tab_parent.children[tab_index] == tab )
        {
            tab_parent.children[tab_index].classList.add("jog_settings_active_tab");
            contents.children[tab_index].style.display = "block";
        }
        else
        {
            tab_parent.children[tab_index].classList.remove("jog_settings_active_tab");
            contents.children[tab_index].style.display = "none";
        }
    }
}




// create content for settings hotkeys tab
jog.add_hotkeys_tab_to_settings = function()
{
    // repeat start of this function if settings is not loaded
    if ( !set ) return setTimeout(jog.add_hotkeys_tab_to_settings, 3000);

    var settings_panel  = document.querySelector("#settings"),
        html            = "",
        hotkeys_obj     = {};

    for ( var i = 0, size = jog.hotkeys.length; i < size; i++ )
    {
        if ( ! hotkeys_obj[ jog.hotkeys[i].title ] )
            hotkeys_obj[ jog.hotkeys[i].title ] = [];

        hotkeys_obj[ jog.hotkeys[i].title ].push(
            '<i class="btn" onclick="jog.on_settings_hotkey_click(' + i + ')">' +
                ( jog.hotkeys[i].ctrl > 0 ? "CTRL + " : "" ) +
                ( jog.hotkeys[i].alt > 0 ? "ALT + " : "" ) +
                ( jog.hotkeys[i].shift > 0 ? "SHIFT + " : "" ) +
                ( jog.key_names[ jog.hotkeys[i].key ] ? jog.key_names[ jog.hotkeys[i].key ] : jog.hotkeys[i].key ) +
            "</i>"
        );
    }

    html +=
        '<div class="hotkeys_state_box">' +
            '<label for="jog_settings_hotkeys_enabled_flag">enable hotkeys</label>' +
            '<input type="checkbox" checked="checked" id="jog_settings_hotkeys_enabled_flag" />' +
        '</div>';

    for ( var name in hotkeys_obj )
    {
        html +=
            '<div class="jog_hotkey_box">' +
                "<b>" + name + ":</b>&nbsp;" +
                hotkeys_obj[name].join(" , ") +
            "</div> ";
    }

    set.add_settings_tab("JOG Hotkeys", html);

    settings_panel.innerHTML +=
        '<div class="jog_settings_hotkey_edit" id="jog_settings_hotkey_edit">' +
            '<div class="box">' +
                '<div class="key_name" id="jog_settings_hotkey_edit_name" >key name:</div>' +
                '<input type="text" id="jog_settings_hotkey_edit_input" placeholder="press any keys" disabled="disabled" />' +
                '<div class="btn" id="jog_settings_hotkey_edit_reset" title="Reset current hotkey to default value">reset</div>\r\n' +
                '<div class="btn" id="jog_settings_hotkey_edit_delete" title="Delete current hotkey">delete</div>\r\n' +
                '<div class="btn" id="jog_settings_hotkey_edit_save" title="Save entered keys">save</div>\r\n' +
                '<div class="btn" id="jog_settings_hotkey_edit_cancel" title="Close this window">close</div>' +
            '</div>' +
        '</div>';

    // add event listener for hotkeys state checkbox and get current state
    jog.hotkeys_enabled = document.querySelector("#jog_settings_hotkeys_enabled_flag").checked ? true : false;
    document.querySelector("#jog_settings_hotkeys_enabled_flag").addEventListener("click", jog.on_settings_hotkeys_state_change);

    // hotkey edit box buttons
    document.querySelector('#jog_settings_hotkey_edit_cancel')
        .addEventListener( "click", jog.on_edit_hotkey_CANCEL_click );
    document.querySelector('#jog_settings_hotkey_edit_save')
        .addEventListener( "click", jog.on_edit_hotkey_SAVE_click );
    document.querySelector('#jog_settings_hotkey_edit_delete')
        .addEventListener( "click", jog.on_edit_hotkey_DELETE_click );
    document.querySelector('#jog_settings_hotkey_edit_reset')
        .addEventListener( "click", jog.on_edit_hotkey_RESET_click );
}

// on hotkey box click
jog.on_settings_hotkey_click = function ( id )
{
    var edit_box = document.querySelector("#jog_settings_hotkey_edit");

    edit_box.dataset.hotkey_id = id;
    edit_box.querySelector("#jog_settings_hotkey_edit_name").innerHTML = "Action: &nbsp;" + jog.hotkeys[id].title;
    edit_box.querySelector("#jog_settings_hotkey_edit_input").value = "" +
        ( jog.hotkeys[id].ctrl > 0 ? "CTRL + " : "" ) +
        ( jog.hotkeys[id].alt > 0 ? "ALT + " : "" ) +
        ( jog.hotkeys[id].shift > 0 ? "SHIFT + " : "" ) +
        ( jog.key_names[ jog.hotkeys[id].key ] ? jog.key_names[ jog.hotkeys[id].key ] : jog.hotkeys[id].key ) +
        "";

    edit_box.style.display = "block";
}

// on hotkey edit box button click
jog.on_edit_hotkey_CANCEL_click = function()
{
    document.querySelector("#jog_settings_hotkey_edit").style.display = "none";
}
jog.on_edit_hotkey_SAVE_click = function()
{
    var edit_box = document.querySelector("#jog_settings_hotkey_edit");

    jog.simpleButtonEffect (
        "jog_settings_hotkey_edit_save",
        true,
        "SAVED",
        'document.querySelector("#jog_settings_hotkey_edit").style.display = "none";'
    );
}
jog.on_edit_hotkey_DELETE_click = function()
{
    var edit_box = document.querySelector("#jog_settings_hotkey_edit");
    jog.simpleButtonEffect( "jog_settings_hotkey_edit_delete", false );
}
jog.on_edit_hotkey_RESET_click = function()
{
    var edit_box = document.querySelector("#jog_settings_hotkey_edit");
    jog.simpleButtonEffect( "jog_settings_hotkey_edit_reset", true, "RESETED" );
}
jog.on_settings_hotkeys_state_change = function()
{
    jog.hotkeys_enabled = document.querySelector("#jog_settings_hotkeys_enabled_flag").checked ? true : false;
}




// do it when window is fully loaded
jog.jog_table_init = function()
{
    // add event listeners for any input fields focus states
    // it helps to prevent HOTKEYS action while some input is active
    var list = document.querySelectorAll("textarea, input");
    for ( var i = 0, size = list.length; i < size; i++ ) {
        list[i].addEventListener("focus", jog.on_input_focus_in);
        list[i].addEventListener("blur", jog.on_input_focus_out);
    }

    // add event listener for any keyboard keys
    document.querySelector("body").addEventListener("keyup", jog.on_keyboard_key);
    // add event listener for any mouse up
    document.querySelector("body").addEventListener("mouseup", jog.on_mouseup);

    // put saved values into the input fields
    if ( jog.db["jog.type"] != null )   document.querySelector("#jog_type").value = jog.db["jog.type"] ;
    if ( jog.db["jog.L1"] != null )     document.querySelector("#jog_inputs_L1").value = jog.db["jog.L1"] ;
    if ( jog.db["jog.L2"] != null )     document.querySelector("#jog_inputs_L2").value = jog.db["jog.L2"] ;
    if ( jog.db["jog.feed"] != null )   document.querySelector("#jog_inputs_feed").value = jog.db["jog.feed"] ;

    // update buttons text if L1 or L2 was changed
    if ( jog.db["jog.L1"] != null || jog.db["jog.L2"] != null ) {
        jog.inputs_changed( { target: { id: "jog_inputs_L1" } } );
    }

    // add event listener for the input fields changes
    document.querySelector("#JOG_inputs_table").addEventListener("keyup", jog.inputs_changed);

    // add event listener for the jog type selector changes
    document.querySelector("#jog_type").addEventListener("change", jog.inputs_changed);

    // add event listener for buttons clicks
    document.querySelector("#JOG_table").addEventListener("mousedown", jog.btn_clicked);

    // add event listeners for any input fields of the JOG panel
    // it needs to blur any input element on keyboard ENTER key
    list = document.querySelectorAll("#JOG_table input");
    for ( var i = 0, size = list.length; i < size; i++ ) {
        list[i].addEventListener("keyup", jog.on_input_keyup);
    }
    
    // update language strings
    lng.update();
}




// do it when window is fully loaded
jog.js_init = function()
{
    console.log("jog.js_init()");

    // create sockets to talk with LCNC
    if ( parent.location.protocol.match("http") ) {
        jog.halsock = websock.create(HALSOCK_URL, SOCK_PROTO, jog.halsock_onopen, jog.halsock_onmessage, jog.halsock_onclose);
        jog.lcncsock = websock.create(LCNCSOCK_URL, SOCK_PROTO, jog.lcncsock_onopen, jog.lcncsock_onmessage, jog.lcncsock_onclose);
    }
    // create check timer for these sockets
    setInterval(jog.check_sockets, SOCK_CHECK_INTERVAL);

    // add panel settings to the Settings tab
    if ( typeof(tabs) == "object" && typeof(set) == "object" ) {
        // create TMP element
        jog.tmp_settings_block = document.createElement("div");
        jog.tmp_settings_block.style.display = "none";
        document.querySelector("body").appendChild(jog.tmp_settings_block);

        loadto("web_files/module/jog_panel/html/JOG_settings_block.html", "a", jog.tmp_settings_block, 
            function() {
                jog.settings_block = set.add("&#x2009;JOG panel&#x2009;", jog.tmp_settings_block.innerHTML);
                document.querySelector("body").removeChild(jog.tmp_settings_block);
                lng.update();
            }
        );
    }
}




window.addEventListener( "DOMContentLoaded", jog.js_init );
