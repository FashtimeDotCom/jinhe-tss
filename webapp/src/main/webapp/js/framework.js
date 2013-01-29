/* ��ǰӦ���� */
APP_CODE = "TSS";
CONTEXTPATH = "tss/";
APPLICATION = "tss";
URL_CORE = "/" + APPLICATION + "/common/";  // ������İ����·��

URL_LOGOUT = "../logout.in";


/***************************************** xmlhttp start ****************************************/

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
			boolean:flag        ͬ���Ƿ񸲸�(Ĭ��true)
 */
HttpRequestParams.prototype.setContent = function(name, value, flag) {
	if(flag || true) {
		this.content[name] = value;
	}
	else {
		var oldValue = this.content[name];
		if( oldValue == null ) {
			this.content[name] = value; // ԭ��û��ֵ
		}
		else if(oldValue instanceof Array) {
			oldValue[oldValue.length] = value; // ԭ���Ѿ�������
		} 
		else {
			this.content[name] = [oldValue, value]; // ԭ���ǵ�ֵ
		}
	}
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
		if(null!=prefix){
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
	this.xmldom  = new XmlReader();

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
	return this.xmldom;
}

/*
 *	����˵������ȡ��Ӧ����XML�ĵ�ָ���ڵ����ֵ
 *	������	string:name             ָ���ڵ���
 *	����ֵ��any:value               ���ݽڵ��������Ͳ�ͬ����
 */
HttpRequest.prototype.getNodeValue = function(name) {
	if(this.xmldom.documentElement == null) return;

	var documentElement = new XmlNode(this.xmldom.documentElement);
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
	
	 try
	 {
		 if(this.params.ani != null) {
			 Public.showWaitingLayer();
		 }

		 this.xmlhttp.onreadystatechange = function() {
			 if(OThis.xmlhttp.readyState == 4) {
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
	 catch (e)
	 {
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

		if( value instanceof Array ) {
			for(var i = 0; i < value.length; i++) {
				setParamNode(name, value[i]);                
			}
		} 
		else {
			setParamNode(name,value);
		}
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

	// ��ͨ���������xmlReader����xmldom
	this.xmldom = responseParser.xmlReader;

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
	this.xmldom.loadXML("");
}

HttpRequest.prototype.ondata = HttpRequest.prototype.onresult = HttpRequest.prototype.onsuccess = HttpRequest.prototype.onexception = function() {

}

/*
 *	����˵������ֹXMLHTTP����
 */
HttpRequest.prototype.abort = function() {
	if(null!=this.xmlhttp) {
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

		if( informationNode != null) {		
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