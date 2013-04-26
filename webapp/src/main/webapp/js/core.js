/*********************************** ���ú���  start **********************************/

/* �������� */
_TYPE_NUMBER = "number";
_TYPE_OBJECT = "object";
_TYPE_FUNCTION = "function";
_TYPE_STRING = "string";
_TYPE_BOOLEAN = "boolean";

/* ���÷�����д */
$ = function(id){
	return document.getElementById(id);
}

/*
 * �ж�ֵ�Ƿ�Ϊnull����ַ���
 */
function isNullOrEmpty(value) {
	return (value == null || (typeof(value) == 'string' && value == ""));
}

/* ǰ̨��Ԫ���Զ��� */
function assertEquals(actual, expect, msg) {
	if( expect != actual ) {
		alert(msg || "" + "[expect: " + expect + ", actual: " + actual + "]");
	}
}

function assertTrue(result, msg) {
	if( !result && msg != null) {
		alert(msg);
	}
}

function assertNotNull(result, msg) {
	if( result == null && msg != null) {
		alert(msg);
	}
}

/* �������ƣ�Public��ȫ�־�̬���� */
var Public = {};

/* ��������� */
_BROWSER_IE = "IE";
_BROWSER_FF = "FF";
_BROWSER_OPERA = "OPERA";
_BROWSER_CHROME = "CHROME";
_BROWSER = _BROWSER_IE;

Public.checkBrowser = function() {
	var ua = navigator.userAgent.toUpperCase();
	if(ua.indexOf(_BROWSER_IE)!=-1) {
		_BROWSER = _BROWSER_IE;
	}
	else if(ua.indexOf(_BROWSER_FF)!=-1) {
		_BROWSER = _BROWSER_FF;
	}
	else if(ua.indexOf(_BROWSER_OPERA)!=-1) {
		_BROWSER = _BROWSER_OPERA;
	}
	else if(ua.indexOf(_BROWSER_CHROME) != -1 ) {
		_BROWSER = _BROWSER_CHROME;
	}
}
Public.checkBrowser();

Public.executeCommand = function(callback, param) {
	var returnVal;
	try
	{
		switch (typeof(callback))
		{
		case _TYPE_STRING:
			returnVal = eval(callback);
			break;
		case _TYPE_FUNCTION:
			returnVal = callback(param);
			break;
		case _TYPE_BOOLEAN:
			returnVal = callback;
			break;
		}
	}
	catch (e)
	{
		returnVal = false;
	}
	return returnVal;
}

/* ��ʾ�ȴ�״̬ */
Public.showWaitingLayer = function () {
	var waitingDiv = $("_waitingDiv");
	if(waitingDiv == null) {
		var waitingDiv = document.createElement("div");    
		waitingDiv.id = "_waitingDiv";    
		waitingDiv.style.width ="100%";    
		waitingDiv.style.height = "100%";    
		waitingDiv.style.position = "absolute";    
		waitingDiv.style.left = "0px";   
		waitingDiv.style.top = "0px";   
		waitingDiv.style.cursor = "wait"; 
 
 		var str = [];
		str[str.length] = "<TABLE width=\"100%\" height=\"100%\"><TR><TD align=\"center\">";
		str[str.length] = "	 <object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" ";
		str[str.length] = "		   codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" ";
		str[str.length] = "        width=\"140\" height=\"30\" id=\"loadingbar\" align=\"middle\">";
		str[str.length] = "		<param name=\"movie\" value=\"../images/loadingbar.swf\" />";
		str[str.length] = "		<param name=\"quality\" value=\"high\" />";
		str[str.length] = "		<param name=\"wmode\" value=\"transparent\" />";
		str[str.length] = "		<embed src=\"../images/loadingbar.swf\" quality=\"high\" ";
		str[str.length] = "		       wmode=\"transparent\" width=\"140\" height=\"30\" align=\"middle\" ";
		str[str.length] = "		       type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />";
		str[str.length] = "  </object>";
		str[str.length] = "</TD></TR></TABLE>";
		waitingDiv.innerHTML = str.join("\r\n");

		var coverDiv = document.createElement("div");  
		coverDiv.id = "coverDiv";
		coverDiv.style.width  = "100%";    
		coverDiv.style.height = "100%";    
		coverDiv.style.position = "absolute";    
		coverDiv.style.left = "0px";   
		coverDiv.style.top  = "0px";   
		coverDiv.style.zIndex = "10000"; 
		coverDiv.style.background = "black";   
		Element.setOpacity(coverDiv, 10);

		document.body.appendChild(waitingDiv);
		document.body.appendChild(coverDiv);
	}

	if(waitingDiv != null) {
		waitingDiv.style.display = "block";
	}
}

Public.hideWaitingLayer = function() {
	var waitingDiv = $("_waitingDiv");
	if( waitingDiv != null ) {
		setTimeout( function() {
			waitingDiv.style.display = "none";
			$("coverDiv").style.display = "none";
		}, 100);
	}
}

Public.writeTitle = function() {
	if(window.dialogArguments) {
		var title = window.dialogArguments.title;
		if( title != null ) {
			document.write("<title>" + title + new Array(100).join("��") + "</title>");
		}
	}
}
Public.writeTitle();


/* �������ɶ���Ψһ��ţ�Ϊ�˼���FF�� */

/* Ĭ��Ψһ�����ǰ׺ */
_UNIQUE_ID_DEFAULT_PREFIX = "_default_id";

var UniqueID = {};
UniqueID.key = 0;

UniqueID.generator = function(prefix) {
	var uid = String(prefix || _UNIQUE_ID_DEFAULT_PREFIX) + String(this.key);
	this.key ++;
	return uid;
}


/* ����ҳ�����ݣ�xml�������ȣ� */
var Cache = {};
Cache.Variables = new Collection();
Cache.XmlIslands = new Collection();

/* ������: ����java Map */
function Collection() {
	this.items = {};
}

Collection.prototype.add = function(id, item) {
	this.items[id] = item;
}

Collection.prototype.del = function(id) {
	delete this.items[id];
}

Collection.prototype.clear = function() {
	this.items = {};
}

Collection.prototype.get = function(id) {
	return this.items[id];
}

/*
 *	ԭ�ͼ̳�
 *	������	function:Class		�����̳е���
 */
Collection.prototype.inherit = function(Class) {
	var inheritClass = new Class();
	for(var item in inheritClass) {
		this[item] = inheritClass[item];
	}
}


/* 
 * �������ҳ����cookie����.
 * Chromeֻ֧��������վ��cookie�Ķ�д�������Ա���html��cookie�����ǽ�ֹ�ġ�
 */
var Cookie = {};

Cookie.setValue = function(name, value, expires, path) {
	if(expires == null) {
		var exp = new Date();
		exp.setTime(exp.getTime() + 365*24*60*60*1000);
		expires = exp.toGMTString();
	}

	if(path == null) {
		path = "/";
	}
	window.document.cookie = name + "=" + escape(value) + ";expires=" + expires + ";path=" + path;
}

Cookie.getValue = function(name) {
	var value = null;
	var cookies = window.document.cookie.split(";");
	for(var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var index  = cookie.indexOf("=");
		var curName = cookie.substring(0, index).replace(/^ /gi,"");
		var curValue = cookie.substring(index + 1);
		
		if(name == curName){
			value = unescape(curValue);
		}
	}
	return value;
}

Cookie.del = function(name, path) {
	var expires = new Date(0).toGMTString();
	this.setValue(name, "", expires, path);
}

Cookie.delAll = function(path) {
	var cookies = window.document.cookie.split(";");
	for(var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var index  = cookie.indexOf("=");
		var curName = cookie.substring(0, index).replace(/^ /gi,"");
		this.del(curName, path);
	}
}

/* �����ȡ��ǰҳ���ַ���� */
var Query = {};
Query.items = {}; // {}��Map����key/value�����; []:����

Query.get = function(name, decode) {
	var str = this.items[name];
	if(decode == true) {
		str = unescape(str);
	}
	return str;
}

Query.set = function(name, value) {
	this.items[name] = value;
}

Query.parse = function(queryString) {
	var params = queryString.split("&");
	for(var i=0; i < params.length; i++) {
		var param = params[i];
		var name  = param.split("=")[0];
		var value = param.split("=")[1];
		this.set(name, value);
	}
}

Query.init = function() {
	var queryString = window.location.search.substring(1);
	this.parse(queryString);
}

Query.init();


var Log = {};
Log.info = [];

Log.clear = function() {
	this.info = [];
}

// д����־��Ϣ
Log.write = function(str) {
	var index = this.info.length;
	this.info.push("[" + index + "]" + str);

	return index;
}

Log.read = function(index) {
	if(index == null) {
		return this.info.join("\r\n");
	}
	else {
		return this.info[index];
	}
}

// ��չ���飬����������
Array.prototype.push = function(item) {
	this[this.length] = item;
}

String.prototype.convertEntry = function() {
	var str = this;
	str = str.repalce(/\&/g, "&amp;");
	str = str.repalce(/\"/g, "&quot;");
	str = str.repalce(/\</g, "&lt;");
	str = str.repalce(/\>/g, "&gt;");
	return str;
}

String.prototype.revertEntity = function() {
	var str = this;
	str = str.replace(/&quot;/g, "\"");
	str = str.replace(/&lt;/g,   "\<");
	str = str.replace(/&gt;/g,   "\>");
	str = str.replace(/&amp;/g,  "\&");
	return str;
}

String.prototype.convertCDATA = function() {
	var str = this;
	str = str.replace(/\<\!\[CDATA\[/g, "&lt;![CDATA[");
	str = str.replace(/\]\]>/g, "]]&gt;");
	return str;
}

String.prototype.revertCDATA = function(){
	var str = this;
	str = str.replace(/&lt;\!\[CDATA\[/g, "<![CDATA[");
	str = str.replace(/\]\]&gt;/g, "]]>");
	return str;
}

/*
 *	���ݸ����ַ����ü�ԭ�ַ���
 *	������	string:trimStr  Ҫ�ü����ַ���
 *	����ֵ��string:str      �ü�����ַ���
 */
String.prototype.trim = function(trimStr){
	var str = this;
	if( 0 == str.indexOf(trimStr) ){
		str = str.substring(trimStr.length);
	}
	return str;
}

/*
 *	���ֽڣ�����ʼλ�õ���ֹλ�ý�ȡ
 *	������	number:startB       ��ʼ�ֽ�λ��
			number:endB         ��ֹ�ֽ�λ��
 *	����ֵ��string:str          ��ȡ����ַ���
 *	����˵��������ʼλ������˫�ֽ��ַ��м�ʱ��ǿ�Ƴɸ��ַ��Ҳࣻ����ֹλ������˫�ֽ��ַ��м�ʱ��ǿ�Ƴɸ��ַ����
 */
String.prototype.substringB = function(startB, endB){
	var str = this;

	var start , end;
	var iByte = 0;
	for(var i = 0 ; i < str.length ; i ++){

		if( iByte >= startB && null == start ){
			start = i;
		}
		if( iByte > endB && null == end){
			end = i - 1;
		}else if( iByte == endB && null == end ){
			end = i;
		}

		var chr = str.charAt(i);
		if( true == /[^\u0000-\u00FF]/.test( chr ) ){
			iByte += 2;
		}else{
			iByte ++;
		}
	}
	return str.substring(start,end);
}
/*
 *	���ֽڣ�����ʼλ�ÿ�ʼ��ȡָ���ֽ���
 *	������	number:startB       ��ʼ�ֽ�λ��
			number:lenB         ��ȡ�ֽ���
 *	����ֵ��string:str          ��ȡ����ַ���
 */
String.prototype.substrB = function(startB, lenB){
	var str = this;
	return str.substringB(startB, startB + lenB);
}

/*
 *	���ֽڣ�����ʼλ�ÿ�ʼ��ȡָ���ֽ���
 */
String.prototype.getBytes = function(){
	var str = this;
	return str.replace(/[^\u0000-\u00FF]/,"*").length;
}

// ��չ���ڣ���ȡ��λ�����
Date.prototype.getFullYear = function() {
	var year = this.getYear();
	if(year < 1000) {
		year += 1900;
	}
	return year;
}

function convertToString(value) {
	if(value == null) {
		return "null";
	}

	var str = "";
	switch( typeof(value) ) {
		case _TYPE_NUMBER:
		case _TYPE_BOOLEAN:
		case _TYPE_FUNCTION:
			str = value.toString();
			break;
		case _TYPE_OBJECT:
			if(value.toString != null){
				str = value.toString();
			} else {
				str = "[object]";
			}
			break;
		case _TYPE_STRING:
			str = value;
			break;
		case "undefined":
			str = "";
			break;
	}
	return str;
}

/*********************************** ���ú���  end **********************************/

/*********************************** html dom ���� start **********************************/

var Element = {};

Element.removeNode = function(node) {
	if( node == null ) return;

	if(window.DOMParser) {
		var parentNode = node.parentNode;
		if( parentNode != null ) {
			parentNode.removeChild(node);
		}
	}
	else {
		node.removeNode(true);
	}
}

/*
 *	��ȡ����ҳ�����λ��
 *	������	object:srcElement       HTML����
 *	����ֵ��number:offsetLeft       ����ҳ�����λ��
 */
Element.absLeft = function(srcElement) {
	var absLeft = 0;
	var tempObj = srcElement;
	while( tempObj != null && tempObj != document.body) {
		absLeft += tempObj.offsetLeft - tempObj.offsetParent.scrollLeft;
		tempObj = tempObj.offsetParent;
	}
	return absLeft;
}
Element.absTop = function(srcElement) {
	var absTop = 0;
	var tempObj = srcElement;
	while( tempObj != null && tempObj != document.body) {
		absTop += tempObj.offsetTop - tempObj.offsetParent.scrollTop;
		tempObj = tempObj.offsetParent;
	}
	return absTop;
}

/*
 *	�����������ռ�Ķ���
 *	������	string:tagName		�����ǩ��
			string:ns			�����ռ�
 *	����ֵ��object	html����
 */
Element.createElement = function(tagName, ns) {
	var obj;
	if( ns == null ) {
		obj = document.createElement(tagName);
	}
	else {
		var tempDiv = document.createElement("DIV");
		tempDiv.innerHTML = "<" + ns + ":" + tagName + "/>";
		obj = tempDiv.firstChild.cloneNode(false);
		Element.removeNode(tempDiv);
	}
	return obj;
}

/*
 *	���ض��󸲸Ƿ�Χ�ڵĸ����ȼ��Ŀؼ�(select��)
 *	������	Object:obj			html����
 *	����ֵ��
 */
Element.hideConflict = function(obj) {
	var x = Element.absLeft(obj);
	var y = Element.absTop(obj);
	var w = obj.offsetWidth;
	var h = obj.offsetHeight;
	var rect = {x:x, y:y, w:w, h:h};

	function isInside(point, rect) {
		if(point.x > rect.x + rect.w || point.x < rect.x 
			|| point.y > rect.y + rect.h || point.y < rect.y ) {
			return false;
		}
		return true;
	}

	var conflict = [];
	var conflictTags = ["select"];
	for(var i = 0; i < conflictTags.length; i++) {
		var curTag = conflictTags[i];
		var curObjs = document.getElementsByTagName(curTag);
		for(var j = 0; j < curObjs.length; j++) {
			var curObj = curObjs[j];

			var x1 = Element.absLeft(curObj);
			var y1 = Element.absTop(curObj);
			var w1 = curObj.offsetWidth;
			var h1 = curObj.offsetHeight;
			var x2 = x1 + w1;
			var y2 = y1 + h1;

			var flag = isInside( {x:x1, y:y1}, rect );
			flag = flag || isInside( {x:x2, y:y1}, rect );
			flag = flag || isInside( {x:x2, y:y2}, rect );
			flag = flag || isInside( {x:x1, y:y2}, rect );

			if(flag == true) {
				curObj.style.visibility = "hidden";
				conflict[conflict.length] = curObj;
			}
		}
	}
	obj.conflict = conflict;
	return obj;
}

Element.showConflict = function(obj) {
	// �����п����Ѿ�������;���ͷŵ��ˣ�obj�����
	if( typeof(obj) != "undefined" && obj.conflict != null ) {
		for( var i = 0; i < obj.conflict.length; i++ ) {
			obj.conflict[i].style.visibility = "visible";
		}
	}
}

Element.write = function(obj, content) {
	obj.innerHTML = content;
}

/*
 * ��̬�����ű�
 * ������	String:script			�ű�����
 */
Element.createScript = function(script) {
	var head = document.head || document.getElementsByTagName('head')[0];
	if( head != null) {
		var scriptNode = Element.createElement("script");
		scriptNode.text = script;
		head.appendChild(scriptNode);
	}
}

/*
 * ��̬������ʽ
 * ������	String:style			��ʽ����
 */
 Element.createStyle = function(style) {
	 if(window.DOMParser) {
		 var styleNode = document.createElement("style");
		 styleNode.tyle = "text/css";
		 styleNode.innerHTML = style;

		 var head = document.head || document.getElementsByTagName("head")[0];
		 head.appendChild(styleNode);
	 }
	 else {
		 var styleNode = document.createStyleSheet();
		 styleNode.cssText = style;
	 }
}

/* ����͸���� */
Element.setOpacity = function(obj, opacity) {
	if(opacity == null || opacity == "") {
		opacity = 100;
	}

	if(window.DOMParser) {
		obj.style.opacity = opacity / 100;
	}
	else {
		obj.style.filter = "alpha(opacity=" + opacity + ")";
	}
}

/*
 * �Ƿ������ϵ
 * ������   Object:parentObj        html����
			Object:obj              html����
 * ����ֵ��	
 */
Element.contains = function(parentNode, node) {
	if(parentNode == null || node == null) {
		return false;
	}

	if(window.DOMParser) {
		while(node != null && node != document.body) {
			node = node.parentNode;
			if(node == parentNode) {
				return true;
			}
		}
		return false;
	}
	else {
		return parentNode.contains(node);
	}
}

/*
 * ��ȡԪ�صĵ�ǰ��ʽ
 * ������   Object:obj              html����
			string:rule             ��ʽ��(��:background-color)
 * ����ֵ��	string:str              ��ʽֵ
 */
Element.getCurrentStyle = function(obj, rule) {
	if(obj == null) {
		return "";
	}

	if(window.DOMParser) {
		return document.defaultView.getComputedStyle(obj, null).getPropertyValue(rule);
	} 
	else {
		rule = rule.split("-");
		for(var i=1; i < rule.length; i++) {
			rule[i] = rule[i].substring(0, 1).toUpperCase() + rule[i].substring(1);
		}
		rule = rule.join("");
		return obj.currentStyle[rule];
	}
}

/*
 * ���ƶ����϶��ı���
 * ������	Object:obj			Ҫ�϶��ı��ȵ�HTML����
 */
Element.attachColResize = function(obj, offsetX) {
	offsetX = 3 - (offsetX || 0);

	// �������ʵ�ʵ�����ֵ
	obj._absTop  = this.absTop(obj);
	obj._absLeft = this.absLeft(obj);

	// ���resize��
	var ruleObj = document.createElement("DIV");
	ruleObj.id = "colRule";
	ruleObj.style.cssText = "cursor:col-resize;width:" + offsetX + "px;height:" +��obj.offsetHeight 
		+ ";top:" + obj._absTop + ";left:" + (obj._absLeft + obj.offsetWidth - offsetX) 
		+ ";position:absolute;background-color:white;overflow:hidden;filter:alpha(opacity=0)";
	document.body.appendChild(ruleObj);

	var moveHandler = function() {
		if(ruleObj._isMouseDown == true) {
			ruleObj.style.left = Math.max(obj._absLeft, event.clientX - offsetX);

			if (document.addEventListener) {             
				document.addEventListener("mouseup", stopHandler, true);  
			}
		}
	}

	var stopHandler = function() {
		ruleObj._isMouseDown = false;
		obj.style.width = Math.max(1, obj.offsetWidth + event.clientX - ruleObj._fromX); 

		ruleObj.style.backgroundColor = "white";
		ruleObj.style.filter = "alpha(opacity=0)";

		if (ruleObj.releaseCapture) {             
			ruleObj.releaseCapture();         
		} 
		else {
			document.removeEventListener("mousemove", moveHandler, true);
			document.removeEventListener("mouseup", stopHandler, true);  
		}	
	}
 
	ruleObj.onmousedown = function() {
		this.style.backgroundColor = "#999999";
		this.style.filter = "alpha(opacity=50)";

		this._isMouseDown = true;
		this._fromX = event.clientX;

		if (this.setCapture) {             
			this.setCapture();    
		} 
		else {
			document.addEventListener("mousemove", moveHandler, true);
		}
	};
	ruleObj.onmousemove = function() {
		moveHandler();
	};
	ruleObj.onmouseup = function() { 
		stopHandler();
	};
}

Element.attachResize = function(obj) {
	// ���ˮƽ������ק���ߣ�3px��ϸ
	var rightLine = document.createElement("DIV");
	ruleObj.id = "rightLine";
	ruleObj.style.cssText = "cursor:col-resize;width:" + offsetX + "px;height:" +��obj.offsetHeight 
		+ ";top:" + obj._absTop + ";left:" + (obj._absLeft + obj.offsetWidth - offsetX) 
		+ ";position:absolute;background-color:white;overflow:hidden;filter:alpha(opacity=0)";
	document.body.appendChild(ruleObj);
}



/*********************************** html dom ����  end **********************************/

/*********************************** �¼���Event������  start **********************************/

var Event = {};
Event.MOUSEDOWN = 1;
Event.MOUSEUP   = 2;
Event.MOUSEOVER = 4;
Event.MOUSEOUT  = 8;
Event.MOUSEMOVE = 16;
Event.MOUSEDRAG = 32;

Event.timeout = {};

/*
 *	����¼���������
 *	������	event:eventObj      �¼�����
 *	����ֵ��object:object       HTML����
 */
Event.getSrcElement = function(eventObj) {
	var srcElement = null;
	if(window.DOMParser) {
		srcElement = eventObj.target;
	}
	else {
		srcElement = eventObj.srcElement;
	}
	return srcElement;
}

/* ʹ�¼�ʼ�ղ�׽���������¼�����Χ�� */
Event.setCapture = function(srcElement, eventType) {
	if (srcElement.setCapture) {             
		srcElement.setCapture();         
	} 
	else if(window.captureEvents){           
		window.captureEvents(eventType);         
	}
}

/* ʹ�¼�����ʼ�ղ�׽���� */
Event.releaseCapture = function(srcElement, eventType) {
	if(srcElement.releaseCapture){
		srcElement.releaseCapture();
	}
	else if(window.captureEvents) {
		window.captureEvents(eventType);
	}
}

/* ȡ���¼� */
Event.cancel = function(eventObj) {
	if(window.DOMParser) {
		eventObj.preventDefault();
	}
	else {
		eventObj.returnValue = false;
	}
}

/* ��ֹ�¼�����ð�� */
Event.cancelBubble = function(eventObj) {
	if(window.DOMParser) {
		eventObj.stopPropagation();
	}
	else {
		eventObj.cancelBubble = true;
	}
}

/*
 *	�����¼�
 *	������	object:srcElement       HTML����
			string:eventName        �¼�����(����onǰ׺)
			function:listener       �ص�����                
 *	����ֵ��
 */
Event.attachEvent = function(srcElement, eventName, listener) {
	if(null == srcElement || null == eventName || null == listener) {
		alert("��Ҫ�Ĳ���Ϊ�գ�����");
		return;
	}

	if(window.DOMParser) {
		srcElement.addEventListener(eventName, listener, false);
	}
	else {
		srcElement.attachEvent("on" + eventName, listener);
	}
}
Event.detachEvent = function(srcElement, eventName, listener) {
	if(null == srcElement || null == eventName || null == listener) {
		alert("��Ҫ�Ĳ���Ϊ�գ�����");
		return;
	}

	if(window.DOMParser) {
		srcElement.removeEventListener(eventName, listener, false);
	}
	else {
		srcElement.detachEvent("on" + eventName, listener);
	}
}

Event.fireOnScrollBar = function(eventObj) {
	var isOnScrollBar = false;
	var srcElement = this.getSrcElement(eventObj);

	// �Ƿ������������
	if(srcElement.offsetWidth > srcElement.clientWidth) {
		var offsetX = Event.offsetX(eventObj);
		if(offsetX > srcElement.clientWidth) {
			isOnScrollBar = true;
		}
	}

	// �Ƿ��к��������
	if(false == isOnScrollBar && srcElement.offsetHeight > srcElement.clientHeight) {
		var offsetY = Event.offsetY(eventObj);
		if(offsetY > srcElement.clientHeight) {
			isOnScrollBar = true;
		}
	}
	return isOnScrollBar;
}

// �¼���Դ�������λ��X
Event.offsetX = function(eventObj) {
	var clientX = eventObj.clientX;
	var srcElement = this.getSrcElement(eventObj);
	var offsetLeft = Element.absLeft(srcElement);

	return clientX - offsetLeft;
}

// �¼���Դ�������λ��Y
Event.offsetY = function(eventObj) {
	var clientY = eventObj.clientY;
	var srcElement = this.getSrcElement(eventObj);
	var offsetTop = Element.absTop(srcElement);

	return clientY - offsetTop;
}


/*********************************** �¼���Event������  end **********************************/

/*********************************** xml�ĵ����ڵ���ز���  start **********************************/

/*
 * ���ַ���ת����xml�ڵ����
 */
function loadXmlToNode(xml) {
	var xr = new XmlReader(xml);
	return xt.xmlDom;
}


function XmlReader(text) {
	this.xmlDom = null;

	if (window.DOMParser) {
		var parser = new DOMParser();
		this.xmlDom = parser.parseFromString(text, "text/xml");
	}
	else { // Internet Explorer
		this.xmlDom = new ActiveXObject("Msxml2.DOMDOCUMENT");
		this.xmlDom.async = false;
		this.xmlDom.loadXML(text); 
    } 

	this.documentElement = this.xmlDom.documentElement;
}

XmlReader.prototype.createElement = function(name) {
	var node = this.xmlDom.createElement(name);
	var xmlNode = new XmlNode(node);
	return xmlNode;
}

XmlReader.prototype.createCDATA = function(data) {
	var xmlNode;
	data = String(data).convertCDATA();
	if(window.DOMParser) {
		var tempReader = new XmlReader("<root><![CDATA[" + data + "]]></root>");
		var xmlNode = new XmlNode(tempReader.documentElement.firstChild);
	}
	else {
		xmlNode = new XmlNode(this.xmlDom.createCDATASection(data));
	}
	return xmlNode;
}

 XmlReader.prototype.createElementCDATA = function(name, data) {
	var xmlNode   = this.createElement(name);
	var cdataNode = this.createCDATA(data);
	xmlNode.appendChild(cdataNode);
	return xmlNode;
}

XmlReader.prototype.load = function(url, async) {
	if(window.DOMParser) {

	}
	else {
		var thisObj = this;
		this.xmlDom.async = async;
		this.xmlDom.onreadystatechange = function() {
			if(thisObj.xmlDom.readyState == 4) {
				var onloadType = typeof(thisObj.onload);
				try {
					if(onloadType == _TYPE_FUNCTION) {
						thisObj.onload();
					} 
					else if(onloadType == _TYPE_STRING) {
						eval(thisObj.onload);
					}
				}
				catch (e) { }
			}
		}
		this.xmlDom.load(url);
	}

	this.documentElement = this.xmlDom.documentElement;
}

/*
 *	��ȡ��������
 */
XmlReader.prototype.getParseError = function() {
	var parseError = null;
	if(window.DOMParser) {

	} 
	else {
		if( this.xmlDom.parseError.errorCode != 0 ) {
			parseError = this.xmlDom.parseError;
		}
	}
	return parseError;
}

XmlReader.prototype.toString = function() {
	var str = [];
	str[str.length] = "[XmlReader Object]";
	str[str.length] = "xml:" + this.toXml();
	return str.join("\r\n");
}

XmlReader.prototype.toXml = function() {
	var str = "";
	if(window.DOMParser) { 
		var xmlSerializer = new XMLSerializer();
        str = xmlSerializer.serializeToString(this.xmlDom.documentElement);
	}
	else {
		str = this.xmlDom.xml;
	}
	return str;
}

/*
 *  XML�ڵ�����
 */
_XML_NODE_TYPE_ELEMENT    = 1; // Ԫ��
_XML_NODE_TYPE_ATTRIBUTE  = 2; // ����
_XML_NODE_TYPE_TEXT		  = 3; // �ı�
_XML_NODE_TYPE_CDATA	  = 4; 
_XML_NODE_TYPE_PROCESSING = 7;
_XML_NODE_TYPE_COMMENT    = 8; // ע��
_XML_NODE_TYPE_DOCUMENT   = 9; // �ĵ�


/* XML Node */
function XmlNode(node) {
	this.node = node;
	this.nodeName = this.node.nodeName;
	this.nodeType = this.node.nodeType;
	this.nodeValue = this.node.nodeValue;
	this.text = this.node.text;
	this.firstChild = this.node.firstChild;
	this.lastChild = this.node.lastChild;
	this.childNodes = this.node.childNodes;
	this.attributes = this.node.attributes;
}

XmlNode.prototype.getAttribute = function(name) {
	if(_XML_NODE_TYPE_ELEMENT == this.nodeType) {
		return this.node.getAttribute(name);
	}
}

XmlNode.prototype.setAttribute = function(name, value, isCDATA) {
	if(_XML_NODE_TYPE_ELEMENT != this.nodeType) {
		return;
	}

	value = value || "";
	if(isCDATA == 1) {
		this.setCDATA(name, value);
	}
	else {
		this.node.setAttribute(name, value);
	}
}

/* ɾ���ڵ����� */
XmlNode.prototype.removeAttribute = function(name) {
	if(_XML_NODE_TYPE_ELEMENT == this.nodeType) {
		return this.node.removeAttribute(name);
	}
}

XmlNode.prototype.getCDATA = function(name) {
	var node = this.selectSingleNode(name + "/node()");
	if(node != null) {
		return node.nodeValue.revertCDATA();
	}
}

XmlNode.prototype.setCDATA = function(name, value) {
	var oldNode = this.selectSingleNode(name);
	if(oldNode == null) {
		var xmlReader = new XmlReader("<xml/>");
		var newNode = xmlReader.createElementCDATA(name, value);
		this.appendChild(newNode);
	}
	else {
		var CDATANode = oldNode.selectSingleNode("node()");
		CDATANode.removeNode();

		var xmlReader = new XmlReader("<xml/>");
		CDATANode = xmlReader.createCDATA(value);
		oldNode.appendChild(CDATANode);
	}
}

XmlNode.prototype.removeCDATA = function(name) {
	var node = this.selectSingleNode(name);
	if(node != null) {
		node.removeNode(true);
	}
}

XmlNode.prototype.cloneNode = function(deep) {
	var tempNode;
	if( window.DOMParser ) {
		tempNode = new XmlNode(new XmlReader(this.toXml()).documentElement);
	} else {
		tempNode = new XmlNode(this.node.cloneNode(deep));
	}
	return tempNode;
}

XmlNode.prototype.getParent = function() {
	var xmlNode = null;
	if( this.node.parentNode != null ) {
		xmlNode = new XmlNode(this.node.parentNode);
	}
	return xmlNode;
}

XmlNode.prototype.removeNode = function() {
	var parentNode = this.node.parentNode;
	if(parentNode != null) {
		parentNode.removeChild(this.node);
	}
}

XmlNode.prototype.selectSingleNode = function(xpath) {
	var xmlNode = null;
	if(window.DOMParser) {
		var ownerDocument;
		if(_XML_NODE_TYPE_DOCUMENT == this.nodeType) {
			ownerDocument = this.node;
		} else {
			ownerDocument = this.node.ownerDocument;
		}
		var xPathResult = ownerDocument.evaluate(xpath, this.node, ownerDocument.createNSResolver(ownerDocument.documentElement), 9);
		if (xPathResult && xPathResult.singleNodeValue) {
			xmlNode = new XmlNode(xPathResult.singleNodeValue);
		}    
	} 
	else {
		var node = this.node.selectSingleNode(xpath);
		if(node != null) {
			xmlNode = new XmlNode(node);
		}
	}
	return xmlNode;
}

/*
 *	��ѯ����ڵ�
 *	������	string:xpath		xpath
 *	����ֵ��array:xmlNodes      XmlNodeʵ������
 */
XmlNode.prototype.selectNodes = function(xpath) {
	var xmlNodes = [];
	if(window.DOMParser) {
		var ownerDocument = null;
		if(_XML_NODE_TYPE_DOCUMENT == this.nodeType) {
			ownerDocument = this.node;
		} else {
			ownerDocument = this.node.ownerDocument;
		}
		var xPathResult = ownerDocument.evaluate(xpath, this.node, ownerDocument.createNSResolver(ownerDocument.documentElement), XPathResult.ORDERED_NODE_ITERATOR_TYPE);
		if (xPathResult) {
			var oNode = xPathResult.iterateNext() ;
			while(oNode) {
				xmlNodes[xmlNodes.length] = new XmlNode(oNode);
				oNode = xPathResult.iterateNext();
			}
		}
	} 
	else {
		var nodes = this.node.selectNodes(xpath);
		for(var i = 0; i < nodes.length; i++) {
			xmlNodes[xmlNodes.length] = new XmlNode(nodes[i]);
		}
	}
	return xmlNodes;
}

XmlNode.prototype.appendChild = function(xmlNode) {
	this.node.appendChild(xmlNode.node);

	this.nodeValue = this.node.nodeValue;
	this.text = this.node.text;
	this.firstChild = this.node.firstChild;
	this.lastChild = this.node.lastChild;
	this.childNodes = this.node.childNodes;
}

XmlNode.prototype.getFirstChild = function() {
	if(this.firstChild) {
		var node = new XmlNode(this.firstChild);
		return node;
	}
	return null;
}

XmlNode.prototype.getLastChild = function() {
	if(this.lastChild) {
		var node = new XmlNode(this.lastChild);
		return node;
	}
	return null;
}

// �����ӽڵ�
XmlNode.prototype.replaceChild = function(newNode, oldNode) {
	var oldParent = oldNode.getParent();
	if(oldParent != null && oldParent.equals(this)) {
		try
		{
			this.node.replaceChild(newNode.node, oldNode.node);
		}
		catch (e)
		{
		}
	}
}
		

// �����ڵ�
XmlNode.prototype.swapNode = function(xmlNode) {
	var parentNode = this.getParent();
	if(parentNode != null) {
		parentNode.replaceChild(xmlNode, this);
	}
}

/*
 *	��ȡǰһ���ֵܽڵ�
 */
XmlNode.prototype.getPrevSibling = function() {
	var xmlNode = null;
	if(null!=this.node.previousSibling) {
		xmlNode = new XmlNode(this.node.previousSibling);
	}
	return xmlNode;
}

/*
 * ��ȡ��һ���ֵܽڵ�
 */
XmlNode.prototype.getNextSibling = function() {
	if(this.node.nextSibling != null) {
		var node = new XmlNode(this.node.nextSibling);
		return node;
	}
	return null;
}

XmlNode.prototype.equals = function(xmlNode) {
	return xmlNode != null && this.node == xmlNode.node;
}

XmlNode.prototype.toString = function() {
	var str = [];
	str[str.length] = "[XmlNode]";
	str[str.length] = "nodeName:" + this.nodeName;
	str[str.length] = "nodeType:" + this.nodeType;
	str[str.length] = "nodeValue:" + this.nodeValue;
	str[str.length] = "xml:" + this.toXml();
	return str.join("\r\n");
}

XmlNode.prototype.toXml = function() {
	if(window.DOMParser) {
		var xs = new XMLSerializer();
		return xs.serializeToString(this.node);
	}
	else {
		return this.node.xml
	}
}

/*********************************** xml�ĵ����ڵ���ز���  end **********************************/

// �뿪����
var Reminder = {};

Reminder.items = {};   // ������
Reminder.count = 0;
Reminder.flag  = true; // �Ƿ�Ҫ����

Reminder.del = function(id) {
	if( this.items[id] ) {
		delete this.item[id];
		this.count--;
	}
}

Reminder.remind = function() {
	if(this.getCount() > 0) {
		alert("��Ȼ�� <" + this.count + ">���޸�δ���棬���ȱ���");
	}
}

/*
 * ͳ��������
 */
Reminder.getCount = function() {
	if( true== this.flag) {
		return this.count;
	} else {
		return 0;
	}
}

/*
 * ȡ������
 */
Reminder.cancel = function() {
	this.flag = false;
}

/*
 * ��������
 */
Reminder.restore = function() {
	this.flag = true;
}

window.attachEvent("onbeforeunload", function() {
	if(Reminder.getCount() > 0) {            
		event.returnValue = "��ǰ�� <" + count + "> ���޸�δ���棬��ȷ��Ҫ�뿪��";
	}
});

/* ��xform������뿪���� */
function attachReminder(id, xform) {
	if( xform ) {
		xform.ondatachange = function() {
			Reminder.add(id); // �����б仯ʱ������뿪����
		}
	}
	else {
		Reminder.add(id);
	}
}



/*
 *	�������ƣ�Blocks
 *	ְ�𣺸����������Blockʵ��
 */
var Blocks = {};
Blocks.items = {};

/*
 *	��������ʵ��
 *	������	Object:blockObj		HTML����
			Object:associate	������HTML����
			boolean:visible		Ĭ����ʾ״̬
 *	����ֵ��
 */
Blocks.create = function(blockObj, associate, visible) {
	var block = new Block(blockObj, associate, visible);
	this.items[block.uniqueID] = block;
}
/*
 *	��ȡ����ʵ��
 *	������	string:id		HTML����id
 *	����ֵ��Block:block		Blockʵ��
 */
Blocks.getBlock = function(id) {
	var block = this.items[id];
	return block;
}


/*
 *	�������ƣ�Block
 *	ְ�𣺸������������ʾ���ص�
 */
var Block = function(blockObj, associate, visible) {
	this.object = blockObj;
	this.uniqueID = this.object.id;
	this.associate = associate;
	this.visible = visible || true;

	this.width = null;
	this.height = null;	
	this.mode = null;

	this.init();
}

/*
 *	��ʼ������
 */
Block.prototype.init = function() {
	this.width  = this.object.currentStyle.width;
	this.height = this.object.currentStyle.height;

	if(false == this.visible) {
		this.hide();
	}
}

/*
 *	��ʾ��ϸ��Ϣ
 *	������	boolean:useFixedSize	�Ƿ����ù̶��ߴ���ʾ
 */
Block.prototype.show = function(useFixedSize) {
	if( this.associate ) {
		this.associate.style.display = "";
	}
	this.object.style.display = "";

	var width  = "auto";
	var height = "auto";
	
	// ���ù̶��ߴ�
	if(false != useFixedSize) {
		width  = this.width || width;
		height = this.height || height;
	}
	this.object.style.width = width;
	this.object.style.height = height;

	this.visible = true;
}

/*
 *	������ϸ��Ϣ
 */
Block.prototype.hide = function() {
	if(  this.associate){
		this.associate.style.display = "none";
	}
	this.object.style.display = "none";

	this.visible = false;
}

/*
 *	�л���ʾ����״̬
 *	������	boolean:visible		�Ƿ���ʾ״̬����ѡ���޲�����Ĭ���л���һ״̬��
 */
Block.prototype.switchTo = function(visible) {
	visible = visible || !this.visible;

	if( visible){
		this.show();	
	}
	else {
		this.hide();
	}
}

/*
 *	ԭ�ͼ̳�
 *	������	function:Class		�����̳е���
 */
Block.prototype.inherit = function(Class) {
	var inheritClass = new Class();
	for(var item in inheritClass){
		this[item] = inheritClass[item];
	}
}


/*
 *	�������ƣ�WritingBlock
 *	ְ�𣺸�����������д��
 *
 */
function WritingBlock() {
	this.mode = null;
	this.line = 0;
	this.minLine = 3;
	this.maxLength = 16;
}

/*
 *	�򿪷���д��ģʽ
 */
WritingBlock.prototype.open = function(){
	this.mode = "line";
	this.line = 0;
	this.writeTable();
}

/*
 *	д�����ģʽ�õı��
 */
WritingBlock.prototype.writeTable = function() {
	var str = [];
	str[str.length] = "<table class=hfull><tbody>";
	for(var i = 0;i < this.minLine; i++) {
		str[str.length] = "<tr>";
		str[str.length] = "  <td class=bullet>&nbsp;</td>";
		str[str.length] = "  <td style=\"width: 55px\"></td>";
		str[str.length] = "  <td></td>";
		str[str.length] = "</tr>";
	}
	str[str.length] = "</tbody></table>";

	this.object.innerHTML = str.join("");    
}

/*
 *	�������
 */
WritingBlock.prototype.clear = function() {
	this.object.innerHTML = "";
}

/*
 *	�رշ���д��ģʽ
 */
WritingBlock.prototype.close = function() {
	this.mode = null;
}

/*
 *	����д�����ݣ��������У�
 *	������	string:name     ����
			string:value    ֵ
 */
WritingBlock.prototype.writeln = function(name, value) {
	if("line" == this.mode){
		var table = this.object.firstChild;
		if(table && "TABLE" != table.nodeName.toUpperCase()) {
			this.clear();
			table = null;
		}
		if(null == table) {
			this.writeTable();
		}

		// ������С���������������
		if(this.line >= this.minLine) {
			var newrow = table.rows[0].cloneNode(true);
			table.firstChild.appendChild(newrow);
		}

		if(value && value.length > this.maxLength) {
			value = value.substring(0, this.maxLength) + "...";
		}

		var row = table.rows[this.line];
		var cells = row.cells;
		cells[1].innerText = name + ":";
		cells[2].innerText = value || "-";

		this.line++;
	}
}

/*
 *	д������
 */
WritingBlock.prototype.write = function(content) {
	this.mode = null;
	this.object.innerHTML = content;
}


/*
 *	�������ƣ�Focus��ȫ�־�̬����
 *	ְ�𣺸����������ע���������ľ۽�����
 */
var Focus = {};
Focus.items = {};
Focus.lastID = null;

/*
 *	ע�����
 *	������	object:focusObj		��Ҫ�۽���HTML����
 *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
 */
Focus.register = function(focusObj) {
	var id = focusObj.id;

	//���id���������Զ�����һ��
	if(null == id || "" == id) {
		id = UniqueID.generator();
		focusObj.id = id;
	}
	this.items[id] = focusObj;

	this.focus(id);
	return id;
}

/*
 *	�۽�����
 *	������	object:focusObj		��Ҫ�۽���HTML����
 *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
 */
Focus.focus = function(id){
	var focusObj = this.items[id];
	if(focusObj && id != this.lastID){
		if(this.lastID) {
			this.blurItem(this.lastID);
		}
		
		focusObj.style.filter = ""; // ʩ�Ӿ۽�Ч��
		this.lastID = id;
	}
}

/*
 *	ʩ��ʧ��Ч��
 *	������	string:id			��Ҫ�۽���HTML����
 */
Focus.blurItem = function(id){
	var focusObj = this.items[id];
	if(focusObj){
		focusObj.style.filter = "alpha(opacity=50) gray()";
	}
}

/*
 *	�ͷŶ���
 *	������	object:focusObj		��Ҫ�۽���HTML����
 *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
 */
Focus.unregister = function(id){
	var focusObj = this.items[id];
	if(focusObj){
		delete this.items[id];
	}
}




/*
 *	���·�װalert
 *	������	string:info     ��Ҫ��Ϣ
			string:detail   ��ϸ��Ϣ
 */
function Alert(info, detail) {
	info = convertToString(info);
	detail = convertToString(detail);

	var maxWords = 100;
	var params = {};
	params.type = "alert";
	params.info = info;
	params.detail = detail;
	if("" == detail && maxWords < info.length) {
		params.info = info.substring(0, maxWords) + "...";
		params.detail = info;        
	}
	params.title = "";
	window.showModalDialog(URL_CORE + '_info.htm', params, 'dialogwidth:280px; dialogheight:150px; status:yes; help:no;resizable:yes;unadorned:yes');
}

/*
 *	���·�װconfirm
 *	������	string:info             ��Ҫ��Ϣ
			string:detail           ��ϸ��Ϣ
 *	����ֵ��boolean:returnValue     �û�ѡ��ȷ��/ȡ��
 */
function Confirm(info,detail) {
	info = convertToString(info);
	detail = convertToString(detail);

	var maxWords = 100;
	var params = {};
	params.type = "confirm";
	params.info = info;
	params.detail = detail;
	if("" == detail && maxWords<info.length) {
		params.info = info.substring(0, maxWords) + "...";
		params.detail = info;        
	}
	params.title = "";
	var returnValue = window.showModalDialog(URL_CORE + '_info.htm', params, 'dialogwidth:280px; dialogheight:150px; status:yes; help:no;resizable:yes;unadorned:yes');
	return returnValue;
}

/*
 *	����/��/ȡ��������ť�ĶԻ���
 *	������	string:info             ��Ҫ��Ϣ
			string:detail           ��ϸ��Ϣ
 *	����ֵ��boolean:returnValue     �û�ѡ����/��/ȡ��
 */
function Confirm2(info,detail) {
	info = convertToString(info);
	detail = convertToString(detail);

	var maxWords = 100;
	var params = {};
	params.type = "confirm2";
	params.info = info;
	params.detail = detail;
	if("" == detail && maxWords < info.length) {
		params.info = info.substring(0, maxWords) + "...";
		params.detail = info;        
	}
	params.title = "";
	var returnValue = window.showModalDialog(URL_CORE + '_info.htm', params, 'dialogwidth:280px; dialogheight:150px; status:yes; help:no;resizable:yes;unadorned:yes');
	return returnValue;
}

/*
 *	���·�װprompt
 *	������	string:info             ��Ҫ��Ϣ
			string:defaultValue     Ĭ��ֵ
			string:title            ����
			boolean:protect         �Ƿ񱣻�
			number:maxBytes         ����ֽ���
 *	����ֵ��string:returnValue      �û����������
 */
function Prompt(info, defaultValue, title, protect, maxBytes) {
	info = convertToString(info);
	defaultValue = convertToString(defaultValue);
	title = convertToString(title);

	var params = {};
	params.info = info;
	params.defaultValue = defaultValue;
	params.title = title;
	params.protect = protect;
	params.maxBytes = maxBytes;
	var returnValue = window.showModalDialog(URL_CORE + '_prompt.htm', params, 'dialogwidth:280px; dialogheight:150px; status:yes; help:no;resizable:no;unadorned:yes');
	return returnValue;
}

/*
 *	����ҳ��js����
 */
function onError(msg,url,line) {
	alert(msg, "����:" + msg + "\r\n��:" + line + "\r\n��ַ:" + url);
	event.returnValue = true;
}

window._alert = window.alert;
window._confirm = window.confirm;
window._prompt = window.prompt;

// window.alert = Alert;
window.confirm = Confirm;
window.confirm2 = Confirm2;
window.prompt = Prompt;
window.onerror = onError;


