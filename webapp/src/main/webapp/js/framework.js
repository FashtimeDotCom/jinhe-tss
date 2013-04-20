
/* ��ǰӦ���� */
APP_CODE = "TSS";
CONTEXTPATH = "tss/";
APPLICATION = "tss";

// URL_CORE = "/" + APPLICATION + "/common/";  // ������İ����·��
URL_CORE = "common/";  // ������İ����·��

URL_LOGOUT = "../logout.in";


/***************************************** xmlhttp start ****************************************/

/* �������� */
_ERROR_TYPE_OPERATION_EXCEPTION = 0;
_ERROR_TYPE_KNOWN_EXCEPTION = 1;
_ERROR_TYPE_UNKNOWN_EXCEPTION = 2;

/* ͨѶ��XML�ڵ��� */
_XML_NODE_RESPONSE_ROOT    = "Response";
_XML_NODE_REQUEST_ROOT     = "Request";
_XML_NODE_RESPONSE_ERROR   = "Error";
_XML_NODE_RESPONSE_SUCCESS = "Success";
_XML_NODE_REQUEST_NAME     = "Name";
_XML_NODE_REQUEST_VALUE    = "Value";
_XML_NODE_REQUEST_PARAM    = "Param";

/* HTTP��Ӧ״̬ */
_HTTP_RESPONSE_STATUS_LOCAL_OK = 0;
_HTTP_RESPONSE_STATUS_REMOTE_OK = 200;

/* HTTP��Ӧ����������� */
_HTTP_RESPONSE_DATA_TYPE_EXCEPTION = "exception";
_HTTP_RESPONSE_DATA_TYPE_SUCCESS = "success";
_HTTP_RESPONSE_DATA_TYPE_DATA = "data";

/* HTTP��ʱ(1����) */
_HTTP_TIMEOUT = 1*1000;

/*
 *  XMLHTTP����������󣬸�������XMLHTTP�������
 */
function HttpRequestParams() {
	this.url = "";
	this.method = "POST";
	this.async = true;
	this.content = {};
	this.header = {};
}

/*
 *	����˵�������÷�������
 *	������  string:name 		�����ֶ���
			string:value        ��������
 */
HttpRequestParams.prototype.setContent = function(name, value) {
	this.content[name] = value;
}

/*
 *	����˵��������xformר�ø�ʽ��������
 *	������	XmlNode:dataNode 	XmlNodeʵ����xform��data���ݽڵ�
			string:prefix 	    �ύ�ֶ�ǰ׺
 */
HttpRequestParams.prototype.setXFormContent = function(dataNode, prefix) {
	if(dataNode.nodeName != "data") return;

	var rename = dataNode.getAttribute(name);
	var nodes = dataNode.selectNodes("./row/*");
	for(var i = 0; i < nodes.length; i++) {
		var name = rename || nodes[i].nodeName; // ��data�ڵ��ϻ�ȡ�����������û������ԭ��
		var value = nodes[i].text;
		
		// ǰ׺��xform declare�ڵ������ã��Ա��ڰ�ֵ���õ�action��bean������
		if(null != prefix){
			name = prefix + "." + name;
		}

		this.setContent(name, value, false);
	}
}

/*
 *	����˵��������ƶ����Ƶķ�������
 *	������	string:name 		�����ֶ���
 */
HttpRequestParams.prototype.clearContent = function(name) {
	delete this.content[name];
}

/*
 *	����˵����������з�������
 */
HttpRequestParams.prototype.clearAllContent = function() {
	this.content = {};
}

/*
 *	����˵������������ͷ��Ϣ
 *	������	string:name 		ͷ��Ϣ�ֶ���
			string:value        ͷ��Ϣ����
 */
HttpRequestParams.prototype.setHeader = function(name, value) {
	this.header[name] = value;
}


/*
 *  XMLHTTP������󣬸�����XMLHTTP���󲢽�����Ӧ����
	���ӣ�
		var p = new HttpRequestParams();
		p.url = URL_GET_USER_NAME;
		p.setContent("loginName", loginName);
		p.setHeader("appCode", APP_CODE);

		var request = new HttpRequest(p);
		request.onresult = function(){
 
		}
		request.send();
 */
function HttpRequest(paramsInstance) {
	this.value = "";

	this.xmlhttp = new XmlHttp();
	this.xmlReader  = new XmlReader();

	this.params = paramsInstance;
}

/*
 *	����˵������ȡ��Ӧ����Դ����
 *	������	
 *	����ֵ��string:result       ��Ӧ����Դ����
 */
HttpRequest.prototype.getResponseText = function() {
	return this.value;
}

/*
 *	����˵������ȡ��Ӧ����XML�ĵ�����
 *	������	
 *	����ֵ��XmlReader:xmlReader       XML�ĵ�����
 */
HttpRequest.prototype.getResponseXml = function() {
	return this.xmlReader;
}

/*
 *	����˵������ȡ��Ӧ����XML�ĵ�ָ���ڵ����ֵ
 *	������	string:name             ָ���ڵ���
 *	����ֵ��any:value               ���ݽڵ��������Ͳ�ͬ����
 */
HttpRequest.prototype.getNodeValue = function(name) {
	if(this.xmlReader.documentElement == null) return;

	var documentElement = new XmlNode(this.xmlReader.documentElement);
	var node = documentElement.selectSingleNode("/" + _XML_NODE_RESPONSE_ROOT + "/" + name);
	if(node == null) return;

	var data;
	var datas = node.selectNodes("node()");
	for(var i = 0; i < datas.length; i++) {
		var temp = datas[i];
		switch (temp.nodeType)
		{
			case _XML_NODE_TYPE_TEXT:
				if(temp.nodeValue.replace(/\s*/g, "") != "") {
					data = temp;
				}
				break;
			case _XML_NODE_TYPE_ELEMENT:
			case _XML_NODE_TYPE_CDATA:
				data = temp;
				break;
		}
		
		if(data != null) break;
	}

	if(data != null) {
		data = data.cloneNode(true); // ���ظ��ƽڵ㣬�Ա��������ԭʼ�ĵ�
		switch(data.nodeType) {
			case _XML_NODE_TYPE_ELEMENT:
				return data;
			case _XML_NODE_TYPE_TEXT:
			case _XML_NODE_TYPE_CDATA:
				return data.nodeValue;
		}
	}
	return null
}

/*
 * ����˵��������XMLHTTP����
 * ������boolean  �Ƿ�ȴ�������������ٷ���
 * ����ֵ��
 */

 HttpRequest.prototype.send = function(wait) {
	 var oThis = this;

	 if(wait) {
		 var count = HttpRequests.getCount();
		 if(count == 0) {
			 oThis.send();
		 }
		 else {
			 HttpRequests.onFinishAll( function() {
				 oThis.send();
			 });
		 }
		 return;
	 }
	
	 try {
		 if(this.params.ani != null) {
			 Public.showWaitingLayer();
		 }

		 this.xmlhttp.onreadystatechange = function() {
			 if(oThis.xmlhttp.readyState == 4) {
				 oThis.clearTimeout();

				 var response = {};
				 response.responseText = oThis.xmlhttp.responseText;
				 response.responseXML  = oThis.xmlhttp.responseXML;
				 response.status       = oThis.xmlhttp.status;
				 response.statusText   = oThis.xmlhttp.statusText;

				 if(oThis.isAbort != true) {
					 setTimeout( function() {
						 oThis.abort();

						 Public.hideWaitingLayer();
						 oThis.onload(response);
						 
						 HttpRequests.del(oThis); // �Ӷ�����ȥ��
						 oThis.executeCallback();
					 }, 100);
				 }
				 else {
					 Public.hideWaitingLayer();

					 HttpRequests.del(oThis);  // �Ӷ�����ȥ��
					 oThis.executeCallback();
				 }
			 }
		 }

		 this.xmlhttp.open(this.params.method, this.params.url, this.params.async);
		 this.setTimeout(); // ���ӳ�ʱ�ж�
		 this.packageContent();
		 this.setCustomRequestHeader();
		 this.xmlhttp.send(this.requestBody);

		 HttpRequests.add(this); // �������

	 }
	 catch (e) {
		 Public.hideWaitingLayer();

		 //throw e;
		 var parserResult = {};
		 parserResult.dataType = _HTTP_RESPONSE_DATA_TYPE_EXCEPTION;
		 parserResult.type = 1;
		 parserResult.msg = e.description;
		 parserResult.description = e.description;
		 parserResult.source = "";

		 this.onexception(parserResult);
	 }
 }

/*
 *	����˵������ʱ�ж�����
 */
HttpRequest.prototype.setTimeout = function(noConfirm) {
	var oThis = this;

	this.timeout = setTimeout(function() {
		if(noConfirm != true && confirm("��������Ӧ��������Ҫ�ж�������") == true) {
			oThis.isAbort = true;
			oThis.abort();
			oThis.isAbort = false;
		}
		else {
			oThis.clearTimeout();
			oThis.setTimeout(true);
		}
	}, _HTTP_TIMEOUT);
}

/*
 *	����˵���������ʱ
 */
HttpRequest.prototype.clearTimeout = function() {
	clearTimeout(this.timeout);
}

/*
 *	����˵�����Է������ݽ��з�װ����XML��ʽ����
 */
HttpRequest.prototype.packageContent = function() {
	var contentXml = new XmlReader("<" + _XML_NODE_REQUEST_ROOT+"/>");
	var contentXmlRoot = new XmlNode(contentXml.documentElement);

	function setParamNode(name, value) {
		var tempNameNode  = contentXml.createElement(_XML_NODE_REQUEST_NAME);
		var tempCDATANode = contentXml.createCDATA(name);
		tempNameNode.appendChild(tempCDATANode);

		var tempValueNode = contentXml.createElement(_XML_NODE_REQUEST_VALUE);
		var tempCDATANode = contentXml.createCDATA(value);
		tempValueNode.appendChild(tempCDATANode);

		var tempParamNode = contentXml.createElement(_XML_NODE_REQUEST_PARAM);
		tempParamNode.appendChild(tempNameNode);
		tempParamNode.appendChild(tempValueNode);

		contentXmlRoot.appendChild(tempParamNode);
	}

	for(var name in this.params.content) {
		var value = this.params.content[name];
		if(value == null) {
			continue;
		}

		setParamNode(name, value);
	}

	var contentStr = contentXml.toXml();
	this.xmlhttp.setRequestHeader("Content-Length", contentStr.length);
	this.requestBody = contentStr;
}

/*
 *	����˵���������Զ�������ͷ��Ϣ
 */
HttpRequest.prototype.setCustomRequestHeader = function() {
	this.xmlhttp.setRequestHeader("REQUEST-TYPE", "xmlhttp");
	this.xmlhttp.setRequestHeader("REFERER", this.params.url);
	for(var item in this.params.header) {									
		var itemValue = String(this.params.header[item]);
		if( itemValue != "" ) {
			this.xmlhttp.setRequestHeader(item, itemValue);
		}
	}

	// ��ҳ��url���в���token���
	var token = Query.get("token");
	if( token != null ) {
		var exp = new Date();  
		exp.setTime(exp.getTime() + (30*1000));
		var expires = exp.toGMTString();  // ����ʱ���趨Ϊ30s
		Cookie.setValue("token", token, expires, "/" + CONTEXTPATH);
	}
	this.xmlhttp.setRequestHeader("CONTENT-TYPE","text/xml");
	this.xmlhttp.setRequestHeader("CONTENT-TYPE","application/octet-stream");
}

/*
 *	����˵��������������ɣ��Խ�����д���
 *	������	Object:response     �ö��������ֵ�̳���xmlhttp����
 */
HttpRequest.prototype.onload = function(response) {
	this.value = response.responseText;

	//Զ��(200) �� ����(0)������
	var httpStatus = response.status;
	var httpStatusText = response.statusText;
	if(httpStatus != _HTTP_RESPONSE_STATUS_LOCAL_OK && httpStatus != _HTTP_RESPONSE_STATUS_REMOTE_OK) {
		var param = {};
		param.dataType = _HTTP_RESPONSE_DATA_TYPE_EXCEPTION;
		param.type = 1;
		param.source = this.value;
		param.msg = "HTTP " + httpStatus + " ����\r\n" + httpStatusText;
		param.description = "����Զ�̵�ַ\"" + this.params.url + "\"����";
		new Message_Exception(param, this);
		this.returnValue = false;
		return;
	}

	var responseParser = new HTTP_Response_Parser(this.value);

	// ��ͨ���������xmlReader
	this.xmlReader = responseParser.xmlReader;

	if(responseParser.result.dataType ==_HTTP_RESPONSE_DATA_TYPE_EXCEPTION) {
		new Message_Exception(responseParser.result, this);
		this.returnValue = false;
	}
	else if(responseParser.result.dataType==_HTTP_RESPONSE_DATA_TYPE_SUCCESS) {
		new Message_Success(responseParser.result, this);
		this.returnValue = true;
	}
	else {
		this.ondata();
		this.onresult();
		this.returnValue = true;

		// �����������к��ű��������Զ�ִ��
		var script = this.getNodeValue("script");
		if( script != null) {
			Element.createScript(script); // ����scriptԪ�ز���ӵ�head��.
		}
	}

	// ���ԭʼ�ĵ�
	this.xmlReader.xmlDom.loadXML("");
}

HttpRequest.prototype.ondata = HttpRequest.prototype.onresult = HttpRequest.prototype.onsuccess = HttpRequest.prototype.onexception = function() {

}

/*
 *	����˵������ֹXMLHTTP����
 */
HttpRequest.prototype.abort = function() {
	if(null != this.xmlhttp) {
		this.xmlhttp.abort();
	}
}

/*
 *	����˵����ִ�лص�����
 */
HttpRequest.prototype.executeCallback = function() {
	if( HttpRequests.getCount() == 0 && HttpRequests.callback != null ) {
		HttpRequests.callback();
		HttpRequests.callback = null;
	}
}


/*
 *  �������ƣ�HTTP_Response_Parser����
 *  ְ�𣺸�����������̨��Ӧ����
 *
 *  �ɹ���Ϣ��ʽ
 *  <Response>
 *      <Success>
 *          <type>1</type>
 *          <msg><![CDATA[ ]]></msg>
 *          <description><![CDATA[ ]]></description>
 *      </Success>
 *  </Response>
 *
 *  ������Ϣ��ʽ
 *  <Response>
 *      <Error>
 *          <type>1</type>
 *          <relogin>1</relogin>
 *          <msg><![CDATA[ ]]></msg>
 *          <description><![CDATA[ ]]></description>
 *      </Error>
 *  </Response>
 */
function HTTP_Response_Parser(responseText) {
	this.source = responseText;
	this.xmlReader = new XmlReader(responseText);
 
	this.result = {};
	var parseError = this.xmlReader.getParseError();
	if( parseError != null) {
		this.result.dataType = _HTTP_RESPONSE_DATA_TYPE_EXCEPTION;
		this.result.source = this.source;
		this.result.msg = "�������쳣";
		this.result.description = "���ݳ����ڵ�" + parseError.line + "�е�" + parseError.linepos + "�ַ�\r\n" + parseError.reason;
	} 
	else {
		var documentNode = new XmlNode(this.xmlReader.documentElement);
		var informationNode = documentNode.selectSingleNode("/" + _XML_NODE_RESPONSE_ROOT + "/*");
		var hasInformation = false;

		if( informationNode == null) {		
			this.result.dataType = _HTTP_RESPONSE_DATA_TYPE_EXCEPTION; // δ�ҵ���Ч�ڵ�����Ϊ���쳣��Ϣ
		}
		else if(informationNode.nodeName == _XML_NODE_RESPONSE_ERROR) { // ֻҪ��Error�ڵ����Ϊ���쳣��Ϣ
			this.result.dataType = _HTTP_RESPONSE_DATA_TYPE_EXCEPTION;
			this.result.source = this.source;
			hasInformation = true;
		}
		else if(informationNode.nodeName == _XML_NODE_RESPONSE_SUCCESS) { //ֻҪ��Success����Ϊ�ǳɹ���Ϣ
			this.result.dataType = _HTTP_RESPONSE_DATA_TYPE_SUCCESS;
			hasInformation = true;
		} 
		else {
			this.result.dataType = _HTTP_RESPONSE_DATA_TYPE_DATA;
		}

		if(hasInformation) {
			var detailNodes = informationNode.selectNodes("*");
			for(var i = 0; i < detailNodes.length; i++) {
				var tempName  = detailNodes[i].nodeName;
				var tempValue = detailNodes[i].text;
				this.result[tempName] = tempValue;
			}
		}
	}
}


/*
 *  �������ƣ�XmlHttp���󣬸���XmlHttp���󴴽�
 */
function XmlHttp() {
	if(window.ActiveXObject) {
		return new ActiveXObject("MSXML2.XMLHTTP");
	} 
	else if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} 
	else {
		alert("�����������֧��XMLHTTP");
		return null;
	}
}

/*
 *  �������ƣ�Message_Success����
 *  ְ�𣺸�����ɹ���Ϣ
 */
function Message_Success(param, request) {
	request.ondata();

	var str = [];
	str[str.length] = "Success";
	str[str.length] = "type=\"" + param.type + "\"";
	str[str.length] = "msg=\"" + param.msg + "\"";
	str[str.length] = "description=\"" + param.description + "\"";

	if(param.type != "0" && request.params.type != "0") {
		alert(param.msg, str.join("\r\n"));
	}

	request.onsuccess(param);
}

/*
 *  �������ƣ�Message_Exception����
 *  ְ�𣺸������쳣��Ϣ
 *
 *  ע�⣺���������չʾ�쳣��Ϣ��ͨ��alert������window.alert=Alert��Alert��framework.js���������¶��壩�⣬
 *  �����Ը����Ƿ���Ҫ���µ�¼����һ�η���request����ע��˴�����Message_Exception(param, request)����
 *  request��Ȼ������һ�η��ͷ����쳣��Ϣ��request������½��Ϣ�����loginName/pwd�ȣ�ͨ��_relogin.htmҳ���ã���
 *  ��һ�η��͸�request���󣬴Ӷ�ͨ��AutoLoginFilter����֤��ȡ��ҵ�����ݡ�  
 *  �������ĺô��ǣ���session������Ҫ���µ�½ʱ�������뿪��ǰҳ��ص���½ҳ��½����֤���û������������ԡ�
 */
function Message_Exception(param, request) {
	request.ondata();

	var str = [];
	str[str.length] = "Error";
	str[str.length] = "type=\"" + param.type + "\"";
	str[str.length] = "msg=\"" + param.msg + "\"";
	str[str.length] = "description=\"" + param.description + "\"";
	str[str.length] = "source=\"" + param.source + "\"";

	if(param.type != "0" && request.params.type != "0") {
		alert(param.msg, str.join("\r\n"));
	}

	request.onexception(param);

	//��ʼ��Ĭ��ֵ
	if( request.params.relogin != null) {
		param.relogin = request.params.relogin;
	}
	else if( param.relogin == null ) { // Ĭ�ϲ����µ�¼
		param.relogin = "0";
	}

	if(param.relogin == "1") {
		Cookie.del("token","/" + CONTEXTPATH); // ���������

		var loginObj = window.showModalDialog(URL_CORE + "_relogin.htm", {title:"�����µ�¼"},"dialogWidth:250px;dialogHeight:200px;resizable:yes");
		if( loginObj != null) {
			var p = request.params;
			p.setHeader("loginName", loginObj.loginName);
			p.setHeader("password",  loginObj.password);
			p.setHeader("identifier", loginObj.identifier);

			request.send();
		}
	}
	else if(param.relogin == "2" ) { // �����¼Ӧ����ת����Ҫ�����û���Ŀ��ϵͳ�е�����
		var loginObj = window.showModalDialog(URL_CORE + "_relogin2.htm",{title:"��������������"},"dialogWidth:250px;dialogHeight:200px;resizable:yes");
		if(loginObj != null) {
			request.params.setHeader("pwd", loginObj.password);
			request.send();
		}
	}
}


/*
 *	�������ƣ�HttpRequests��ȫ�־�̬����
 *	ְ�𣺸�������http��������
 */
var HttpRequests = {};
HttpRequests.items = [];

/*
 *	����˵������ֹ������������
 */
HttpRequests.closeAll = function() {
	for(var i = 0; i < this.items.length; i++) {
		this.items[i] = true;
		this.items[i].abort();
		this.items[i] = false;
	}
}

/*
 *	����˵��������һ����������
 */
HttpRequests.add = function(request) {
	this.items[this.items.length] = request;
}

/*
 *	����˵����ȥ��һ����������
 */
HttpRequests.del = function(request) {
	for(var i = 0; i < this.items.length; i++) {
		if(this.items[i] == request ) {
			this.items.splice(i, 1); // splice() �������ڲ��롢ɾ�����滻�����Ԫ��
			break;
		}
	}
}

/*
 *	����˵����ͳ�Ƶ�ǰ������
 */
HttpRequests.getCount = function() {
	return this.items.length;
}

/*
 *	����˵�����ȴ���ǰ����ȫ������
 */
HttpRequests.onFinishAll = function(callback) {
	this.callback = callback;
}


/*
 *  �������ƣ�Ajax�������
 *  ְ���ٴη�װ����xmlhttpʹ��
 */
function Ajax() {
	var arg = arguments[0];

	var p = new HttpRequestParams();
	p.url = arg.url;

	for(var item in arg.headers) {
		p.setHeader(item, arg.headers[item]);
	}
	for(var item in arg.contents) {
		p.setContent(item, arg.contents[item]);
	}

	var request = new HttpRequest(p);
	if(arg.onresult != null) {
		request.onresult = arg.onresult;
	}
	if(arg.onexception != null) {
		request.onexception = arg.onexception;
	}
	if(arg.onsuccess != null) {
		request.onsuccess = arg.onsuccess;
	}
	request.send();

	return request;
}

/***************************************** xmlhttp end ****************************************/

/*
 *	����˵�������·�װalert
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
 *	����˵�������·�װconfirm
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
 *	����˵��������/��/ȡ��������ť�ĶԻ���
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
 *	����˵�������·�װprompt
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
 *	����˵��������ҳ��js����
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

document.oncontextmenu = function(eventObj) {
	eventObj = eventObj || window.event;
	var srcElement = Event.getSrcElement(eventObj);
	var tagName = srcElement.tagName.toLowerCase();
	if("input" != tagName && "textarea" != tagName) {
		event.returnValue = false;            
	}
}


/*
 *	����˵�����û���Ϣ��ʼ��
 */
function initUserInfo() {
	var p = new HttpRequestParams();
	p.url = "ums/user!getOperatorInfo.action";
	p.setHeader("appCode", APP_CODE);
	p.setHeader("anonymous", "true");

	var request = new HttpRequest(p);
	request.onresult = function() {
		var userName = this.getNodeValue("name");
		$("userInfo").innerText = userName;
	}
	request.send();
}

function logout() {
	var p = new HttpRequestParams();
	p.url = URL_CORE + URL_LOGOUT;

	var request = new HttpRequests(p);
	request.onsuccess = function() {
		Cookie.del("token", "/" + CONTEXTPATH);
		location.href = URL_CORE + "../login.htm";
	}
	request.send();
}

// �ر�ҳ��ʱ���Զ�ע��
function logoutOnClose() {
	window.attachEvent("onuload", function() {
		if(10*1000 < window < screenTop || 10*1000 < window.screenLeft) {
			logout();
		}
	});
}





// �뿪����
var Reminder = {};

Reminder.items = {};   // ������
Reminder.count = 0;
Reminder.flag  = true; // �Ƿ�Ҫ����

Reminder.del = function(id) {
	if(this.items[id] != null) {
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
 * ����˵����ͳ��������
 */
Reminder.getCount = function() {
	if( true== this.flag) {
		return this.count;
	} else {
		return 0;
	}
}

/*
 * ����˵����ȡ������
 */
Reminder.cancel = function() {
	this.flag = false;
}

/*
 * ����˵������������
 */
Reminder.restore = function() {
	this.flag = true;
}

window.attachEvent("onbeforeunload", function() {
	if(Reminder.getCount() > 0) {            
		event.returnValue = "��ǰ�� <" + count + "> ���޸�δ���棬��ȷ��Ҫ�뿪��";
	}
});

/* ����˵������xform������뿪���� */
function attachReminder(id, xform) {
	if(xform != null) {
		xform.ondatachange = function() {
			Reminder.add(id); // �����б仯ʱ������뿪����
		}
	}
	else {
		Reminder.add(id);
	}
}

/*
 *	����˵������������ʾ����
 *	������	string:url                      ͬ�����������ַ
			xmlNode:data                    XmlNodeʵ��
 *	����ֵ��
 */
var Progress = function(url, data, cancelUrl) {
	this.progressUrl = url;
	this.cancelUrl = cancelUrl;
	this.id = UniqueID.generator();
	this.refreshData(data);
}

/*
 *	����˵������������
 */
Progress.prototype.refreshData = function(data) {
	this.percent      = data.selectSingleNode("./percent").text;
	this.delay        = data.selectSingleNode("./delay").text;
	this.estimateTime = data.selectSingleNode("./estimateTime").text;
	this.code         = data.selectSingleNode("./code").text;

	var feedback = data.selectSingleNode("./feedback");
	if(feedback != null) {
		alert(feedback.text);
	}
}

/*
 *	��ʼִ��
 */
Progress.prototype.start = function() {
	this.show();
	this.next();
}

/*
 *	ִֹͣ��
 */
Progress.prototype.stop = function() {
	var p = new HttpRequestParams();
	p.url = this.cancelUrl;
	p.setContent("code", this.code);

	var thisObj = this;
	var request = new HttpRequest(p);
	request.onsuccess = function() {
		thisObj.hide();
		clearTimeout(thisObj.timeout);
	}
	request.send();
}

/*
 *	����˵������ʾ����
 *	������
 *	����ֵ��
 */
Progress.prototype.show = function() {
	var thisObj = this;
	var barObj = $(this.id);
	if(null == barObj) {
		barObj = Element.createElement("div");
		barObj.id = this.id;
		barObj.style.width = "200px";
		barObj.style.height = "50px";
		barObj.style.paddingRight = "3px";
		barObj.style.paddingTop = "8px";
		barObj.style.position = "absolute";
		barObj.style.color = "#5276A3";
		barObj.style.textAlign = "center";
		barObj.style.visibility = "hidden";
		document.body.appendChild(barObj);

		barObj.innerHTML = "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" width=\"140\" height=\"30\" id=\"loadingbar\" align=\"middle\">"
			 + "<param name=\"allowScriptAccess\" value=\"sameDomain\" />"
			 + "<param name=\"movie\" value=\"../platform/images/loadingbar.swf\" />"
			 + "<param name=\"quality\" value=\"high\" />"
			 + "<param name=\"wmode\" value=\"transparent\" />"
			 + "<embed src=\"../platform/images/loadingbar.swf\" quality=\"high\" wmode=\"transparent\" width=\"140\" height=\"30\" name=\"loadingbar\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />"
			 + "</object><div/>";
	}
	barObj.style.left = (document.body.offsetWidth - 200) / 2 + "px";
	barObj.style.top  = (document.body.offsetHeight - 50) / 2 + "px";

	var str = [];
	str[str.length] = "<div style=\"height:3px;font-size:1px;background-color:#FFFFFF;width:100%;text-align:left\">";
	str[str.length] = "<div style=\"height:3px;font-size:1px;background-color:#5276A3;width:" + this.percent + "%\"/>";
	str[str.length] = "</div>";
	str[str.length] = "<div style=\"padding-top:5px\">";
	str[str.length] = "<span style=\"font-size:16px;font-family:Arial;font-weight:bold\">" + this.percent + "%</span>";
	str[str.length] = "&nbsp;&nbsp;ʣ��ʱ��:<span style=\"font-size:16px;font-family:Arial;font-weight:bold\">" + this.estimateTime + "</span>��";
	str[str.length] = "</div>";
	str[str.length] = "<div style=\"padding-top:5px\">";
	str[str.length] = "<a href=\"#\" style=\"margin-top:30px;color:#5276A3;text-decoration:underline\">ȡ ��</a>";
	str[str.length] = "</div>";
	barObj.childNodes[1].innerHTML = str.join("");
	barObj.style.visibility = "visible";

	var link = barObj.getElementsByTagName("a")[0];
	link.onclick = function() {
		thisObj.stop();
	}
}

/*
 *	����˵�������ؽ���
 */
Progress.prototype.hide = function() {
	var barObj = $(this.id);
	if(null != barObj) {
		barObj.style.visibility = "hidden";
	}
}

/*
 *	����˵���� ͬ������
 */
Progress.prototype.sync = function() {
	var p = new HttpRequestParams();
	p.url = this.progressUrl;
	p.setContent("code", this.code);
	p.ani = false;

	var thisObj = this;
	var request = new HttpRequest(p);
	request.onexception = function() {
		thisObj.hide();
	}
	request.onresult = function() {
		var data = this.getNodeValue("ProgressInfo");
		thisObj.refreshData(data);
		thisObj.show();
		thisObj.next();
	}
	request.send();
}

/*
 *	����˵���� ��ʱ������һ��ͬ��
 */
Progress.prototype.next = function() {
	var thisObj = this;

	var percent = parseInt(this.percent);
	var delay   = parseInt(this.delay) * 1000;
	if(100 > percent) {
		this.timeout = setTimeout(function() {
			thisObj.sync();
		}, delay);
	}
	else if(null != this.oncomplete) {
		setTimeout(function() {
			thisObj.hide();
			thisObj.oncomplete();
		}, 200);
	}
}


/*
 *	�������ƣ�Blocks
 *	ְ�𣺸����������Blockʵ��
 */
var Blocks = {};
Blocks.items = {};

/*
 *	����˵������������ʵ��
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
 *	����˵������ȡ����ʵ��
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
 *	����˵������ʼ������
 */
Block.prototype.init = function() {
	this.width  = this.object.currentStyle.width;
	this.height = this.object.currentStyle.height;

	if(false == this.visible) {
		this.hide();
	}
}

/*
 *	����˵������ʾ��ϸ��Ϣ
 *	������	boolean:useFixedSize	�Ƿ����ù̶��ߴ���ʾ
 */
Block.prototype.show = function(useFixedSize) {
	if( null != this.associate ) {
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
 *	����˵����������ϸ��Ϣ
 */
Block.prototype.hide = function() {
	if( null!= this.associate){
		this.associate.style.display = "none";
	}
	this.object.style.display = "none";

	this.visible = false;
}

/*
 *	����˵�����л���ʾ����״̬
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
 *	����˵����ԭ�ͼ̳�
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
 *	����˵�����򿪷���д��ģʽ
 */
WritingBlock.prototype.open = function(){
	this.mode = "line";
	this.line = 0;
	this.writeTable();
}

/*
 *	����˵����д�����ģʽ�õı��
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
 *	����˵�����������
 */
WritingBlock.prototype.clear = function() {
	this.object.innerHTML = "";
}

/*
 *	����˵�����رշ���д��ģʽ
 */
WritingBlock.prototype.close = function() {
	this.mode = null;
}

/*
 *	����˵��������д�����ݣ��������У�
 *	������	string:name     ����
			string:value    ֵ
 */
WritingBlock.prototype.writeln = function(name, value) {
	if("line" == this.mode){
		var table = this.object.firstChild;
		if(null != table && "TABLE" != table.nodeName.toUpperCase()) {
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

		if(null != value && value.length > this.maxLength) {
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
 *	����˵����д������
 *	������	string:content		����
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
 *	����˵����ע�����
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
 *	����˵�����۽�����
 *	������	object:focusObj		��Ҫ�۽���HTML����
 *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
 */
Focus.focus = function(id){
	var focusObj = this.items[id];
	if(null != focusObj && id != this.lastID){
		if(null != this.lastID) {
			this.blurItem(this.lastID);
		}
		
		focusObj.style.filter = ""; // ʩ�Ӿ۽�Ч��
		this.lastID = id;
	}
}

/*
 *	����˵����ʩ��ʧ��Ч��
 *	������	string:id			��Ҫ�۽���HTML����
 *	����ֵ��
 */
Focus.blurItem = function(id){
	var focusObj = this.items[id];
	if(null!=focusObj){
		focusObj.style.filter = "alpha(opacity=50) gray()";
	}
}

/*
 *	����˵�����ͷŶ���
 *	������	object:focusObj		��Ҫ�۽���HTML����
 *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
 */
Focus.unregister = function(id){
	var focusObj = this.items[id];
	if(null != focusObj){
		delete this.items[id];
	}
}