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
 *	����˵����ԭ�ͼ̳�
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
 *	����˵�������ݸ����ַ����ü�ԭ�ַ���
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
 *	����˵�������ֽڣ�����ʼλ�õ���ֹλ�ý�ȡ
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
 *	����˵�������ֽڣ�����ʼλ�ÿ�ʼ��ȡָ���ֽ���
 *	������	number:startB       ��ʼ�ֽ�λ��
			number:lenB         ��ȡ�ֽ���
 *	����ֵ��string:str          ��ȡ����ַ���
 */
String.prototype.substrB = function(startB, lenB){
	var str = this;
	return str.substringB(startB, startB + lenB);
}

/*
 *	����˵�������ֽڣ�����ʼλ�ÿ�ʼ��ȡָ���ֽ���
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
			if(null != value.toString){
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
 *	����˵������ȡ����ҳ�����λ��
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
 *	����˵���������������ռ�Ķ���
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
 *	����˵�������ض��󸲸Ƿ�Χ�ڵĸ����ȼ��Ŀؼ�(select��)
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

	var conflictTags = ["select"];
	for(var i = 0; i < conflictTags.length; i++) {
		var curTag = conflictTags[i];
		var curObjs = document.getElementByTagName(curTag);
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
	if( obj.conflict != null ) {
		for( var i = 0; i < obj.conflict.length; i++ ) {
			obj.conflict[i].style.visibility = "visible";
		}
	}
}

Element.write = function(obj, content) {
	obj.innerHTML = content;
}

/*
 * ����˵������̬�����ű�
 * ������	String:script			�ű�����
 */
Element.createScript = function(script) {
	var head = document.head || document.getElementsByTagName('head')[0];
	var scriptNode = Element.createElement("script");
	scriptNode.text = script;
	head.appendChild(scriptNode);
}

/*
 * ����˵������̬������ʽ
 * ������	String:style			��ʽ����
 */
 Element.createStyle = function(style) {
	 if(window.DOMParser) {
		 var styleNode = document.createElement("style");
		 styleNode.tyle = "text/css";
		 styleNode.innerHTML = style;

		 var head = document.head || document.getElementByTagName("head")[0];
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
 * ����˵�����Ƿ������ϵ
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
 * ����˵������ȡԪ�صĵ�ǰ��ʽ
 * ������   Object:obj              html����
			string:rule             ��ʽ��(��:background-color)
 * ����ֵ��	string:str              ��ʽֵ
 */
Element.getCurrentStyle = function(obj, rule) {
	var str = "";
	if(null != obj) {
		if(window.DOMParser) {
			str = document.defaultView.getComputedStyle(obj, null).getPropertyValue(rule);
		} else {
			rule = rule.split("-");
			for(var i=1; i < rule.length; i++) {
				rule[i] = rule[i].substring(0, 1).toUpperCase() + rule[i].substring(1);
			}
			rule = rule.join("");
			str = obj.currentStyle[rule];
		}
	}
	return str;
}

/*
 * ����˵�������ƶ����϶��ı���
 * ������	Object:obj			Ҫ�϶��ı��ȵ�HTML����
 */
Element.attachColResize = function(obj, offsetX) {
	offsetX = 3 - (offsetX || 0);

	// �������ʵ�ʵ�����ֵ
	obj._absTop = this.absTop(obj);
	obj._absLeft = this.absLeft(obj);

	// ���resize��
	var ruleObj = document.createElement("DIV");
	ruleObj.id = "colRule";
	ruleObj.style.cssText = "cursor:col-resize;width:3px;height:" +��obj.offsetHeight 
		+ ";top:" + obj._absTop + ";left:" + (obj._absLeft + obj.offsetWidth - offsetX) 
		+ ";position:absolute;background-color:white;overflow:hidden;filter:alpha(opacity=0)";
	document.body.appendChild(ruleObj);

	var colResizeTimeout;
	var colResizeDelay = 20;

	// ����Ե
	function checkEdge(obj) {
		return event.clientX > obj.offsetWidth - offsetX - 2;
	}

	ruleObj.onmousedown = function() {
		if(checkEdge(obj) == true) {
			this.style.backgroundColor = "#999999";
			this.style.filter = "alpha(opacity=50)";

			this._isMouseDown = true;
			this._ox = event.clientX;

			Event.setCapture(this, Event.MOUSEDOWN);
		}
		else {
			this.style.backgroundColor = "white";
			this.style.filter = "alpha(opacity=0)";

			this._isMouseDown = false;
			Event.releaseCapture(this, Event.MOUSEDOWN);
		}
	};
	ruleObj.onmousemove = function() {
		if(this._isMouseDown == true) {
			this.style.left = Math.max(obj._absLeft, event.clientX - 3);
		}
	};
	ruleObj.onmouseup = function() {
		if(this._isMouseDown == true) {
			this._isMouseDown = false;
			Event.releaseCapture(this, Event.MOUSEUP);

			obj.style.width = Math.max(1, obj.offsetWidth - offsetX + event.clientX - this._ox);

			this.style.backgroundColor = "white";
			this.style.filter = "alpha(opacity=0)";
		}
	};
	obj.onresize = function() {
		clearTimeout(colResizeTimeout);
		colResizeTimeout = setTimeout( function() {
			// �������ʵ������λ��
			obj._absTop = Element.absTop(obj);
			obj._absLeft = Element.absLeft(obj);

			ruleObj.style.left = obj._absLeft + obj.offsetWidth - offsetX;
			ruleObj.style.top = obj._absTop;
			ruleObj.style.height = obj.offsetHeight;
		}, colResizeDelay);
	}
}

/*
 * ����˵�������ƶ����϶��ı�߶�
 * ������	Object:obj			Ҫ�϶��ı��ȵ�HTML����
 * ����ֵ��	
 */
Element.attachRowResize = function(obj, offsetY) {
	offsetY = 3 - (offsetY||0);

	// �������ʵ��X,Yλ��
	obj._absTop = this.absTop(obj);
	obj._absLeft = this.absLeft(obj);

	// ���resize��
	var ruleObj = document.createElement("DIV");
	ruleObj.id = "rowRule";
	ruleObj.style.cssText = "cursor:row-resize;height:3px;width:" + obj.offsetWidth 
		+ ";top:" + (obj._absTop+obj.offsetHeight-offsetY) 
		+ ";left:" + obj._absLeft + ";position:absolute;background-color:white;overflow:hidden;filter:alpha(opacity=0)";

	document.body.appendChild(ruleObj);

	var rowResizeTimeout;
	var rowResizeDelay = 20;

	//����Ե
	function checkEdge(obj) {
		return event.clientY > obj.offsetHeight - offsetY - 2;
	}

	ruleObj.onmousedown = function() {
		if(checkEdge(obj) == true) {
			this.style.backgroundColor = "#999999";
			this.style.filter = "alpha(opacity=50)";

			this._isMouseDown = true;
			this._oy = event.clientY;

			Event.setCapture(this, Event.MOUSEDOWN);
		} else {
			this.style.backgroundColor = "white";
			this.style.filter = "alpha(opacity=0)";

			this._isMouseDown = false;
			Event.releaseCapture(this, Event.MOUSEDOWN);
		}	
	};
	ruleObj.onmousemove = function() {
		if(this._isMouseDown==true) {
			this.style.top = Math.max(obj._absTop,event.clientY - 3);
		}
	};
	ruleObj.onmouseup = function() {
		if(this._isMouseDown==true) {
			this._isMouseDown = false;
			Event.releaseCapture(this, Event.MOUSEUP);

			obj.style.height = Math.max(1,obj.offsetHeight - offsetY + event.clientY - this._oy);

			this.style.backgroundColor = "white";
			this.style.filter = "alpha(opacity=0)";
		}
	
	};
	obj.onresize = function() {
		clearTimeout(rowResizeTimeout);
		rowResizeTimeout = setTimeout(function() {
			//�������ʵ��X,Yλ��
			obj._absTop = Element.absTop(obj);
			obj._absLeft = Element.absLeft(obj);

			ruleObj.style.top = obj._absTop + obj.offsetHeight - offsetY;
			ruleObj.style.left = obj._absLeft;
			ruleObj.style.width = obj.offsetWidth;
		},rowResizeDelay);
	}
	
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

/*
 *	����˵��������¼���������
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
Event.cancel = function(eventObj) {
	if(window.DOMParser) {
		eventObj.stopPropagation();
	}
	else {
		eventObj.cancelBubble = true;
	}
}

/*
 *	����˵���������¼�
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
				try
				{
					if(onloadType == _TYPE_FUNCTION) {
						thisObj.onload();
					} 
					else if(onloadType == _TYPE_STRING) {
						eval(thisObj.onload);
					}
				}
				catch (e)
				{
				}
			}
		}
		this.xmlDom.load(url);
	}

	this.documentElement = this.xmlDom.documentElement;
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


var ELEMENT_NODE_TYPE = "1";  // Ԫ��
var ATTRIBUTE_NODE_TYPE = "2"; // ����
var TEXT_NODE_TYPE = "3"; // �ı�
var COMMENTS_NODE_TYPE = "8"; // ע��
var DOCUMENT_NODE_TYPE = "9"; // �ĵ�

/* XML Node */
function XmlNode(node) {
	this.node = node;
	this.nodeName = node.nodeName;
	this.nodeType = node.nodeType;
	this.nodeValue = node.nodeValue;
	this.text = node.text;
	this.firstChild = node.firstChild;
	this.lastChild = node.lastChild;
	this.childNodes = node.childNodes;
	this.attributes = node.attributes;
}

XmlNode.prototype.getAttribute = function(name) {
	if(ELEMENT_NODE_TYPE == this.nodeType) {
		return this.node.getAttribute(name);
	}
}

XmlNode.prototype.setAttribute = function(name, value, isCDATA) {
	if(ELEMENT_NODE_TYPE != this.nodeType) {
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
	if(ELEMENT_NODE_TYPE == this.nodeType) {
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
	if(window.ActiveXObject) {
		tempNode = new XmlNode(this.node.cloneNode(deep));
	} else {
		tempNode = new XmlNode(new XmlReader(this.toXml()).documentElement);
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
		if(_XML_NODE_TYPE_DOCUMENT==this.nodeType) {
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
	return null != xmlNode && this.node == xmlNode.node;
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

/*
 *  ��������
 */
_ERROR_TYPE_OPERATION_EXCEPTION = 0;
_ERROR_TYPE_KNOWN_EXCEPTION = 1;
_ERROR_TYPE_UNKNOWN_EXCEPTION = 2;
/*
 *  ͨѶ��XML�ڵ���
 */
_XML_NODE_RESPONSE_ROOT    = "Response";
_XML_NODE_REQUEST_ROOT     = "Request";
_XML_NODE_RESPONSE_ERROR   = "Error";
_XML_NODE_RESPONSE_SUCCESS = "Success";
_XML_NODE_REQUEST_NAME     = "Name";
_XML_NODE_REQUEST_VALUE    = "Value";
_XML_NODE_REQUEST_PARAM    = "Param";    
/*
 *  XML�ڵ�����
 */
_XML_NODE_TYPE_ELEMENT    = 1;
_XML_NODE_TYPE_ATTRIBUTE  = 2;
_XML_NODE_TYPE_TEXT		  = 3;
_XML_NODE_TYPE_CDATA	  = 4;
_XML_NODE_TYPE_PROCESSING = 7;
_XML_NODE_TYPE_COMMENT    = 8;
_XML_NODE_TYPE_DOCUMENT   = 9;
/*
 *  HTTP��Ӧ״̬
 */
_HTTP_RESPONSE_STATUS_LOCAL_OK = 0;
_HTTP_RESPONSE_STATUS_REMOTE_OK = 200;
/*
 *  HTTP��Ӧ�����������
 */
_HTTP_RESPONSE_DATA_TYPE_EXCEPTION = "exception";
_HTTP_RESPONSE_DATA_TYPE_SUCCESS = "success";
_HTTP_RESPONSE_DATA_TYPE_DATA = "data";
/*
 *  HTTP��ʱ(1����)
 */
_HTTP_TIMEOUT = 60*1000;