		
function $X(xformId) {
	var element = $(xformId);
	var xformObj = new XForm(element);
	
	return xformObj;
}

var XForm = function(element) {
	this.element = element;
	this.form = element.firstChild;

	this.tempDom = new ActiveXObject("MSXML.DOMDocument");
	this.tempDom.async = false;

	this.xslDom = new ActiveXObject('MSXML.DOMDocument');
	this.xslDom.async = false;
	this.xslDom.resolveExternals = false;

	this.xmlDoc;
	this._width;
    this._height;
	
	this._baseurl  = element._baseurl || "";
	this._iconPath = this._baseurl + "icon/"

	this._columnList = {};
}


XForm.prototype.attachEvents = function() {
	// �س��Զ��۽���һ����input��button�ȣ�
	this.element.onkeydown = function() {
		var srcElement = event.srcElement;
		if(window.event.keyCode == 13 && srcElement.tagName.toLowerCase() != "textarea") {
			window.event.keyCode = 9;  // �൱�ڰ�����Tab��������ƶ�����һ��Ԫ����
		}
	}
	
	this.element.onselectstart = function() {
		event.cancelBubble = true; // �϶�ѡ���¼�ȡ��ð��
	}
}

XForm.prototype.load = function(data, dataType) {
	this.element.data = data;
	this.element.dataType = dataType || "node";
	this.reload();
}

XForm.prototype.reload = function() {
	// �����ϴεĴ�����Ϣ��
	hideErrorInfo();

	this.xslDom.load(this._baseurl + "xform.xsl");
	this.xslDom.selectSingleNode("/xsl:stylesheet/xsl:script").text = "\r\nvar uniqueID=\"" + this.element.uniqueID 
		+ "\";\r\nvar baseurl=\"" + this._baseurl + "\";\r\nvar formEditable=\"" + this.element.editable + "\";\r\n";

	var curXmlDom;
	switch(this.element.dataType) {
		case "url":
			tempDom.load(this.element.data);
			if(tempDom.parseError != 0) {
				alert("data��ַ�����⣬����XML����ȷ.");
			}

			var curXmlDom = tempDom.selectSingleNode("/*");
			if(curXmlDom == null) {
				alert("����Դ������.");
			}
			break;
		case "node":
			if("object" == typeof(this.element.data) && 1 == this.element.data.nodeType) {
				var curXmlDom = this.element.data;
			}
			break;
	}
	this.xmlDoc = new Class_XMLDocument(curXmlDom);
	
	if(this.xmlDoc != null && this.xmlDoc.xmlObj != null) {
		// ����comboedit����Ĭ�ϵ�һ���ֵ
		this.fixComboeditDefaultValue(this.xmlDoc.Row);

		var htmlStr = this.xmlDoc.transformXML(this.xslDom); // ����XSL��XML������Html
		this.element.innerHTML = htmlStr.replace(/<\/br>/gi, "");

		if(this.form != null) {
			this.form.attachEvent('onsubmit', this.checkForm);
			this.form.attachEvent('onreset', this.resetForm);

			// ��ӱ�����				
			var theTable = this.form.all.tags("TABLE")[0];
			if(theTable != null && this.element.getAttribute("caption") != null) {
				var count = theTable.rows(0).cells.length;
				for(var i = 0; i < theTable.rows(0).cells.length; i++) {
					count += parseInt(theTable.rows(0).cells(i).colSpan);
				}
				var captionTR = theTable.insertRow(0);
				var captionTD = captionTR.insertCell();
				captionTD.colSpan = count;
				captionTD.id = "titleBox";
				captionTD.className = "titleBox";
				captionTD.style.cssText = "font-size:12px;height:19px;background-image:url(" + this._iconPath + "titlebg.gif);background-repeat:no-repeat;";
				captionTD.innerHTML = this.element.getAttribute("caption");

				var tempDivHeight = _height - theTable.rows[0].offsetHeight - (theTable.rows[2] == null ? 0 : theTable.rows[2].offsetHeight);
				if(tempDivHeight > 0 && _overflow == true) {
					theTable.rows(1).cells(0).firstChild.style.height = tempDivHeight;
				}
			}
		}

		// �󶨸���column��Ӧ�ı༭��ʽ
		this.attachEditor();
	
		// ����onload�¼�
		var onload = this.element.getAttribute("onload");
		if(onload != null) {
			eval(onload);
		}

		// �Զ��۽�
		this.setFocus();
	}
}

XForm.prototype.attachEditor = function() {
	var cols = this.xmlDoc.Columns;
	for(var i = 0; i < cols.length; i++) {
		var colName   = cols[i].getAttribute("name");
		var colMode   = cols[i].getAttribute("mode");
		var colEditor = cols[i].getAttribute("editor");
		var nodeValue = this.getColumnValue(colName);

		// ȡlayout�а󶨸�columne��Ԫ��
		var tempObj = $(colName);
		if(tempObj == null) {
			continue;
		}

		var curInstance;
		switch(colMode) {
			case "string":
				if(colEditor == "comboedit") {
					curInstance = new Mode_ComboEdit(colName, this);
				}
				else if(colEditor == "radio") {
					curInstance = new Mode_Radio(colName, this);
				}
				else {
					curInstance = new Mode_String(colName, this);
				}
				break;
			case "number":
				curInstance = new Mode_Number(colName, this);
				break;
			case "function":
				curInstance = new Mode_Function(colName, this);
				break;
			case "hidden":
				curInstance = new Mode_Hidden(colName, this);
				break;
		}
		curInstance.saveAsDefaultValue();
		this._columnList[colName] = curInstance;
	}
}

XForm.prototype.checkForm = function() {
	// �����ϴεĴ�����Ϣ��
	hideErrorInfo();

	var cols = this.xmlDoc.Columns;
	for(var i = 0; i < cols.length; i++) {
		var colName  = cols[i].getAttribute("name");
		var _column = this._columnList[colName];
		if(_column != null) {
			if(_column.validate() == false) {
				return false;
			}
		}
		else { // layout�ڲ�����ʱ��������ʵ��ִ��У��
			var _columnTemp = {};
			_columnTemp.obj = {
				empty: cols[i].getAttribute("empty"),
				errorInfo: cols[i].getAttribute("errorInfo"),
				caption: cols[i].getAttribute("caption"),
				submitReg: cols[i].getAttribute("submitReg"),
				value: this.getColumnValue(colName)
			};

			_columnTemp.validate = validate;
			if(_columnTemp.validate() == false) {
				return false;
			}
		}
	}

	$("xml").value = this.xmlDoc.Data.xml;

	return true;
}

XForm.prototype.resetForm = function() {
	//�����ϴεĴ�����Ϣ��
	hideErrorInfo();

	var cols = this.xmlDoc.Columns;
	for(var i = 0; i < cols.length; i++) {
		var colName = cols[i].getAttribute("name");
		if(this._columnList[colName] != null) {
			this._columnList[colName].reset();
		}
	}
	if(event != null) {
		event.returnValue = false;
	}
}

XForm.prototype.updateData = function(obj) {
	if(event.propertyName == "checked") {
		var newValue = obj.checked == true ? 1 : 0;
	}
	else if(obj.tagName.toLowerCase() == "select") {
		var newValue = obj._value;            
	}
	else {
		var newValue = obj.value;
	}

	var oldValue = this.getColumnValue(obj.binding);
	if(newValue != oldValue && newValue != null && newValue != "") {
		this.setColumnValue(obj.binding, newValue);
	}
}

XForm.prototype.updateDataExternal = function(name, value) {
	var node = this.getColumn(name);
	var oldValue  = this.getData(name);

	this.setColumnValue(name, value);
	
	// ����ҳ����ʾ����
	var tempSrcElement;
	var _column = this._columnList[name];
	if(_column != null) {
		_column.setValue(value);
		tempSrcElement = _column.obj;
	}
	else {
		tempSrcElement = { binding: name };
	}
}

XForm.prototype.updateUnbindingDataExternal = function(id, value) {
	$(id).value = value;

	var node = this.xmlDoc.Layout.selectSingleNode(".//*[@id='" + id + "']");
	if(node != null) {
		node.setAttribute("value", value);
	}
}

XForm.prototype.setEditable = function(status) {
	if(this.element.editable != status ) {
		return��
	}

	this.element.editable = status;

	var buttonBox = $("buttonBox");
	if(buttonBox != null) {
		buttonBox.style.display = (status == "true" ? "block": "none");
	}

	var cols = this.xmlDoc.Columns;
	for(var i = 0; i < cols.length; i++) {
		var name = cols[i].getAttribute("name");
		var _column = _columnList[name];
		if(_column != null) {
			var columnEditable = cols[i].getAttribute("editable");
			if (columnEditable == "false") continue;
			_column.setEditable(status);
		}
	}

	this.setFocus();
}

XForm.prototype.getData = function(name, replace) {
	var nodeValue = this.getColumnValue(name);
	if(true == replace) {
		nodeValue = nodeValue.replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;");
	}
	return nodeValue;
}

XForm.prototype.getColumn = function(name) {
	var _column = this.xmlDoc.columnsMap[name];
	if(_column == null) {
		alert(name + "������");
	}
	return _column;
}

XForm.prototype.xml = function() {
	return xmlDoc.toString();
}

// <row user="2222" password="aaaaaaaaa" id="222" date="2005/09/09"/>
XForm.prototype.reloadData = function(rowNode) {
	// ����comboedit����Ĭ�ϵ�һ���ֵ
	this.fixComboeditDefaultValue(rowNode);

	// �����ϴεĴ�����Ϣ��
	hideErrorInfo();

	var cols = this.xmlDoc.Columns;  // ��column����Ϊ��ȡ����
	for(var i = 0; i < cols.length; i++) {
		var name  = cols[i].getAttribute("name");
		var value = rowNode.getAttribute(name);
		this.updateDataExternal(name, value || "");
	}
}

XForm.prototype.fixComboeditDefaultValue = function(rowNode) {
	var cols = this.xmlDoc.Columns;
	for(var i = 0; i < cols.length; i++) {
		var name   = cols[i].getAttribute("name");
		var empty  = cols[i].getAttribute("empty");
		var editor = cols[i].getAttribute("editor");
		var editorValue = cols[i].getAttribute("editorvalue") || "";
		var firstValue = editorValue.split("|")[0];
		var value = this.getColumnValue(name);

		// ��empty = false(��ʾ������Ϊ��)ʱ�������б��Ĭ��ֵ�Զ�ȡ��һ��ֵ
		if((value == null || value.length == 0) && firstValue != "" && (editor=="comboedit" || editor=="radio") && empty=="false") {
			this.setColumnValue(name, firstValue);
		}
	}
}


XForm.prototype.saveAsDefaultValue = function() {
	//�����ϴεĴ�����Ϣ��
	hideErrorInfo();

	var cols = this.xmlDoc.Columns;
	for(var i = 0; i < cols.length; i++) {
		var colName = cols[i].getAttribute("name");
		var _column = _columnList[colName];
		_column.saveAsDefaultValue();    
	}
}

XForm.prototype.setFocus = function(name) {
	if( name == null || name == "") {
		var column = this.xmlDoc.declare.selectSingleNode("column[(@editable='true' or not(@editable)) and (@display!='none' or not(@display))]");
		if(column == null) {
			return;
		}
		name = column.getAttribute("name");
	}

	var _column = this._columnList[name];
	if( _column != null ) {
		_column.setFocus();
		$(name).focus();
	}
}

XForm.prototype.setColumnEditable = function(name, booleanValue) {
	var _columnNode = this.getColumn(name);
	_columnNode.setAttribute("editable", booleanValue);
	
	var _column = this._columnList[name];
	if( _column != null ) {
		_column.setEditable(booleanValue);
	}
}


XForm.prototype.showCustomErrorInfo = function(name, str) {
	var instance = this._columnList[name];
	if( instance != null ) {
		showErrorInfo(str, instance.obj);
	}
}

XForm.prototype.getColumnAttribute = function(name, attrName) {
	var column = this.xmlDoc.columnsMap[name];
	if(column != null) {
		return column.getAttribute(attrName);
	}
	else {
		alert("ָ������[" + name + "]������");
		return null;
	}
}

XForm.prototype.setLabelContent = function(name, content) {
	var labelObj = $("label_" + name);
	if(labelObj != null) {
		if(labelObj.length > 1) {
			labelObj = labelObj[0];
		}
		labelObj.innerHTML = content;
	}
}

XForm.prototype.getXmlDocument = function() {
	return this.xmlDoc.xmlObj;
}

/*
 * ��ȡrow�ڵ�����column��Ӧ��ֵ
 */
XForm.prototype.getColumnValue = function(name) {
	var rowNode = this.xmlDoc.Row;
	var node = rowNode.selectSingleNode(name);
	var nodeValue = (null == node ? null : node.text);

	return nodeValue;
}

/*
 *  ����˵��������row�ڵ�����column��Ӧ��ֵ
 *  ������  string:name             ����
			string/array:value      ֵ
 */
XForm.prototype.setColumnValue = function(name, value) {
	// ��ֵ������ֵȴ�����飬��ȡ��һ��
	if(value instanceof Array) { 
		value = value[0];
	}

	var rowNode = this.xmlDoc.Row;
	var node = rowNode.selectSingleNode(name);
	if( node == null ) { 
		node = this.tempDom.createElement(name); // ������ֵ�ڵ�
		rowNode.appendChild(node);
	}

	var CDATANode = node.selectSingleNode("cdata()");
	if( CDATANode != null) {
		CDATANode.text = value;
	}
	else{
		var newCDATANode = this.tempDom.createCDATASection(value);
		node.appendChild(newCDATANode);
	}
}


var Class_XMLDocument = function(xmlObj) {
	this.xmlObj = xmlObj;

	this.toString = function() {
		if(this.xmlObj != null) {
			return this.xmlObj.xml;
		}
		return null;
	}

	this.transformXML = function(xslObj) {			
		var tempXMLDom = new ActiveXObject('MSXML.DOMDocument');
		tempXMLDom.async = false;
		tempXMLDom.resolveExternals = false;
		tempXMLDom.loadXML(this.toString());

		return tempXMLDom.transformNode(xslObj).replace(/&amp;nbsp;/g, "&nbsp;").replace(/\u00A0/g, "&amp;nbsp;");
	}
	
	this.refresh = function() {
		if(this.xmlObj != null) {
			this.declare = this.xmlObj.selectSingleNode("./declare");
			this.Layout  = this.xmlObj.selectSingleNode("./layout");
			this.Script  = this.xmlObj.selectSingleNode("./script");
			this.Columns = this.xmlObj.selectNodes("./declare/column");
			this.Data    = this.xmlObj.selectSingleNode("./data");
			
			var tempDom = new ActiveXObject('MSXML.DOMDocument');
			tempDom.async = false;
			if(this.Data == null) {				
				var dataNode = tempDom.createElement("data");
				this.xmlObj.appendChild(dataNode);
				this.Data = dataNode;
			}
			
			this.Row = this.xmlObj.selectSingleNode("./data/row[0]");
			if(this.Row == null) {
				var rowNode = tempDom.createElement("row");
				this.Data.appendChild(rowNode);	
				this.Row = rowNode;
			}
			
			this.columnsMap = {};
			for(var i = 0; i < this.Columns.length; i++) {
				this.columnsMap[this.Columns[i].getAttribute("name")] = this.Columns[i];
			}
		}
	}

	this.refresh();
}