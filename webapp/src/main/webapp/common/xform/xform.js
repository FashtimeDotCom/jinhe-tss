		
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




function Mode_String(colName, element) {
	this.name = colName;
	this.obj = $(colName);
	 
	var tempThis = this;
	this.obj._value = this.obj.value;

	this.setEditable();

	this.obj.onblur = function() {
		if("text" == this.type) {
			this.value = this.value.replace(/(^\s*)|(\s*$)/g, "");
		}

		if(this.value == "" && this.empty == "false") {
			showErrorInfo("������ [" + this.caption.replace(/\s/g, "") + "]", this);
		}
		else if(this.inputReg != "null" && eval(this.inputReg).test(this.value) == false){
			showErrorInfo("[" + this.caption.replace(/\s/g, "") + "] ��ʽ����ȷ���������", this);
		}
		else {
			element.updateData(this);
		}
	}

	this.obj.onpropertychange = function() {
		if(window.event.propertyName == "value") {
			if(this.inputReg != "null" && eval(this.inputReg).test(this.value) == false){ // ���벻����
				restore(this, this._value);
			}
			else if(this.value.replace(/[^\u0000-\u00FF]/g, "**").length > parseInt(this.maxLength)) {
				restore(this, this.value.substringB(0, this.maxLength));
			}
			else{
				this._value = this.value;
			}
		}
	};
}

Mode_String.prototype = {
	setValue : function(s) {
		this.obj._value = this.obj.value = s;
	},
	
	setEditable : function(s) {
		s = s || this.obj.getAttribute("editable");
		this.obj.editable = s;

		var disabled = (s == "false");
		this.obj.className = (disabled ? "string_disabled" : "string");

		if(this.obj.tagName != "TEXTAREA") {
			this.obj.disabled = disabled;  // textarea ��ֹ״̬�޷�������ʾ�������ݣ����Ը�Ϊֻ��
		} else {
			this.obj.readOnly = disabled;        
		}
	},
	
	validate : validate,
	
	reset : function() {
		this.obj.value = this.obj.defaultValue;
	},

	saveAsDefaultValue : function() {
		this.obj.defaultValue = this.obj.value;
	},

	setFocus : function(){
		try {
			this.obj.focus();
		} catch(e){ }
	}
}
 



// ����ѡ��򣬵�ѡ���ѡ
function Mode_ComboEdit(colName, element) {
	this.name = colName;
	this.obj = $(colName);
 
	var tempThis = this;
	this.obj._value = this.obj.attributes["value"].nodeValue;

	var valueList = {};
	var valueArr = this.obj._value.split(",");
	for(var i=0; i < valueArr.length; i++) {
		var x = valueArr[i];
		valueList[x] = true;
	}

	var valueList = this.obj.editorvalue;
	var textList  = this.obj.editortext;
	
	var isMatch = false;
	var selectedIndex = [];
	for(var i=0; valueList != null && i < valueList.split('|').length; i++){
		var value = valueList.split('|')[i];
		var tempLable = textList.split('|')[i];

		if(tempLable=="&#124;"){
			tempLable = "|";
		}

		var option = new Option();
		option.value = value;
		option.text  = tempLable;
		this.obj.options[this.obj.options.length] = option;

		if(true == valueList[value]) {
			isMatch = true;
			this.obj.options[this.obj.options.length].selected = true;
		}
	}

	this.obj.disabled = (this.obj.getAttribute("editable") == "false");

	if(isMatch){
		this.obj.defaultSelectedIndex = selectedIndex.join(",");
	} 
	else {
		this.obj.defaultSelectedIndex = this.obj.selectedIndex = -1;
	}
	
	this.obj.onchange = function() {
		var x = [];
		for(var i=0; i < this.options.length; i++) {
			var opt = this.options[i];
			if(opt.selected) {
				x[x.length] = opt.value;
			}
		}
		this._value = x.join(",");
		element.updateData(this);
	}
}

Mode_ComboEdit.prototype.setValue = function(s) {
	var valueList = {};
	s = s.split(",");
	for(var i = 0;i < s.length; i++){
		valueList[s[i]] = true;
	}
	var isMatch = false;
	for(var i=0; i < this.obj.options.length; i++){
		var opt = this.obj.options[i];
		if(valueList[opt.value]) {
			opt.selected = true;
			isMatch = true;
		}
	}

	if(false == isMatch){
		this.obj.selectedIndex = -1;	
	}
}

Mode_ComboEdit.prototype.setEditable = function(s) {
	this.obj.disabled  = (s == "true" ? false : true);
	this.obj.className = (s == "true" ? "comboedit" : "comboedit_disabled");
	this.obj.editable = s;
}

Mode_ComboEdit.prototype.validate = function() {
	var empty = this.obj.getAttribute("empty");
	var value = this.obj.value;
	if(value == "" && empty == "false") {
		showErrorInfo("[" + this.obj.caption.replace(/\s/g, "") + "] ������Ϊ�գ���ѡ��", this.obj);
		return false;
	}
	return true;
}

Mode_ComboEdit.prototype.reset = function() {
	this.obj.selectedIndex = -1;
	var selectedIndex = this.obj.defaultSelectedIndex;
	if(selectedIndex != "") {
		selectedIndex = selectedIndex.split(",");
		for(var i=0; i < selectedIndex.lengt; i++) {
			this.obj.options[selectedIndex[i]].selected = true;
		}
	}
}

Mode_ComboEdit.prototype.saveAsDefaultValue = function() {
	var selectedIndex = [];
	for(var i=0; i < this.obj.options.length; i++){
		var opt = this.obj.options[i];
		if(opt.selected) {
			selectedIndex[selectedIndex.length] = i;
		}
	}
	this.obj.defaultSelectedIndex = selectedIndex.join(",");
}

Mode_ComboEdit.prototype.setFocus = function() {
	try {
		this.obj.focus();
	} catch(e) {
	}
}




function Mode_Radio(colName, element) {
	this.name = colName;
	this.obj = $(colName);

	var tempThis = this;
	this.obj._value = this.obj.value;

	var tempRadios = "";
	var valueList = this.obj.editorvalue;
	var textList = this.obj.editortext;
	var valueArray = valueList.split('|');
	for(var i=0; i < valueArray.length; i++ ) {
		var value = valueArray[i];
		var tempLable = textList.split('|')[i];

		var tempID   = this.obj.binding + '_radio_' + this.obj.uniqueID + "_" + i;
		var tempName = this.obj.binding + '_radio_' + this.obj.uniqueID;
		tempRadios += '<input type="radio" class="radio" id="' + tempID + '" name="' + tempName + '" value="' + value + '"' 
			+ (this.obj._value == value ? ' checked' : '') + (this.obj.getAttribute('editable') == 'false' ? ' disabled' : '') 
			+ ' binding="' + this.obj.binding + '">' + '<label for="' + tempID + '">' + tempLable + '</label>';
	}
	this.obj.innerHTML = tempRadios;
	
	var inputObjs = this.obj.all.tags("INPUT");
	var tempObj   = this.obj;
	for(var i=0; i < inputObjs.length; i++) {
		var inputObj = inputObjs[i];
		inputObj.style.cssText = tempObj.defaultStyle;
		inputObj.multipleIndex = tempObj.multipleIndex;

		inputObj.onclick = function() {
			element.updateData(this);
			tempObj._value = this.value;
		}
	}
}

Mode_Radio.prototype.setValue = function(value) {
	var inputObjs = this.obj.all.tags("INPUT");
	for(var i=0; i < inputObjs.length; i++) {
		var inputObj = inputObjs[i];
		if(inputObj.value == value ) {
			inputObj.checked = true;
			this.obj._value = inputObj.value;
			return;
		} 
		else {
			inputObj.checked = false;
		}
	}
}

Mode_Radio.prototype.setEditable = function(s) {
	var inputObjs = this.obj.all.tags("INPUT");
	for(var i=0; i < inputObjs.length; i++) {
		var inputObj = inputObjs[i];
		inputObj.disabled = (s == "true" ? false : true);
	}
	this.obj.editable = s;
}

Mode_Radio.prototype.validate = function() {
	return true;
}

Mode_Radio.prototype.reset = function() {
	var inputObjs = this.obj.all.tags("INPUT");
	for(var i=0; i < inputObjs.length; i++) {
		var inputObj = inputObjs[i];
		inputObj.checked = inputObj.defaultChecked;
	}
}
Mode_Radio.prototype.saveAsDefaultValue = function() {
	var inputObjs = this.obj.all.tags("INPUT");
	for(var i=0; i < inputObjs.length; i++){
		var inputObj = inputObjs[i];
		inputObj.defaultChecked = inputObj.checked;
	}
}
Mode_Radio.prototype.setFocus = function(){
	var inputObjs = this.obj.all.tags("INPUT");
	try{
		inputObjs[0].focus();
	}catch(e){
	}
}




function Mode_Number(colName, element) {
	this.name = colName;
	this.obj = $(colName);

	var tempThis = this;
	this.obj._value = this.obj.value;

	if(this.obj.getAttribute('empty') == "false") {
		this.obj.insertAdjacentHTML("afterEnd", "<span style='color:red;position:relative;left:3px;top:-2px'>*</span>");
	}

	this.obj.disabled = (this.obj.getAttribute("editable") == "false");
	this.obj.className = (this.obj.disabled ? "string_disabled" : "string");	

	this.obj.onfocus = function() {
		var tempEvent = this.onpropertychange;
		this.onpropertychange = null;
		this.value = stringToNumber(this.value);
		this.onpropertychange = tempEvent;
		this.select();
	}
	this.obj.onblur = function() {
		if(this.value=="" && this.empty == "false") {
			showErrorInfo("������ [" + this.caption.replace(/\s/g, "") + "]", this);
		}
		else if(this.inputReg != "null" && eval(this.inputReg).test(this.value) == false) {
			showErrorInfo("[" + this.caption.replace(/\s/g, "") + "] ��ʽ����ȷ���������", this);
		}
		else {
			tempThis.setValue(this.value);
			element.updateData(this);
		}
	}

	this.obj.onpropertychange = function() {
		if(window.event.propertyName == "value") {
			if(this.inputReg != "null" && eval(this.inputReg).test(this.value) == false) { // ���벻�Ϸ�
				var value = stringToNumber(this._value);
				if(eval(this.inputReg).test(value)) {
					restore(this, value);
				} else {
					restore(this, "");
				}
			} else {
				this._value = this.value;
			}
		}
	};
}

Mode_Number.prototype.setValue = function(value) {
	restore(this.obj, numberToString(value, this.obj.pattern));
}

Mode_Number.prototype.setEditable = function(s) {
	this.obj.disabled  = (s == "true" ? false : true);
	this.obj.className = (s == "true" ? "string" : "string_disabled");
	this.obj.editable = s;
}

Mode_Number.prototype.validate = validate;

Mode_Number.prototype.reset = function() {
	this.obj.value = this.obj.defaultValue;
}

Mode_Number.prototype.saveAsDefaultValue = function() {
	this.obj.defaultValue = this.obj.value;
}

Mode_Number.prototype.setFocus = function(){
	try {
		this.obj.focus();
	} catch(e) {
	}
}



function Mode_Function(colName, element) {
	this.name = colName;
	this.obj = $(colName);

	var tempThis = this;
	this.obj._value = this.obj.value;

	if(this.obj.clickOnly!="false"){ // ��ͨ��column��clickOnly�������Ƿ�������ֹ�����
		this.obj.readOnly = true;
	}
	
	//�������Ϊ�գ�����Ǻ�
	if(this.obj.getAttribute('empty') == "false"){
		this.obj.insertAdjacentHTML("afterEnd", "<span style='color:red;position:relative;left:3px;top:-2px'>*</span>");
	}

	this.obj.disabled  = (this.obj.getAttribute("editable") == "false");
	this.obj.className = (this.obj.disabled ? "function_disabled" : "function");

	waitingForVisible(function() {
		tempThis.obj.style.width = Math.max(1, tempThis.obj.offsetWidth - 20);
	});

	this.obj.onblur = function() {
		if("text" == this.type) {
			this.value = this.value.replace(/(^\s*)|(\s*$)/g, "");
		}
		
		if(this.value=="" && this.empty=="false"){
			showErrorInfo("������ [" + this.caption.replace(/\s/g, "") + "]", this);
		} 
		else if(this.inputReg!="null" && eval(this.inputReg).test(this.value) == false) {
			showErrorInfo("[" + this.caption.replace(/\s/g,"") + "] ��ʽ����ȷ�������",this);
		}
		else{
			element.updateData(this);
		}
	};
	this.obj.onpropertychange = function() {
		if(window.event.propertyName == "value") {
			if(this.inputReg != "null" && eval(this.inputReg).test(this.value) == false) { // ���벻����
				restore(this, this._value);
			} 
			else if(this.value.replace(/[^\u0000-\u00FF]/g, "**").length > parseInt(this.maxLength)) {
				restore(this, this.value.substringB(0, this.maxLength));
			} 
			else {
				this._value = this.value;
			}
		}
	};

	if( !this.obj.disabled ) {
		var tempThisObj = this.obj;

		//��ӵ����ť
		this.obj.insertAdjacentHTML('afterEnd', '<button style="width:20px;height:18px;background-color:transparent;border:0px;"><img src="' + _iconPath + 'function.gif"></button>');
		var btObj = this.obj.nextSibling; // ��̬��ӽ�ȥ�İ�ť
		btObj.onclick = function(){
			try {
				eval(tempThisObj.cmd);
			} catch(e) {
				showErrorInfo("�����Զ���JavaScript����<" + tempThisObj.cmd + ">�����쳣��Ϣ��" + e.description, tempThisObj);
				throw(e);
			}
		}
	}	
}

Mode_Function.prototype.setValue = function(value) {
	this.obj._value = this.obj.value = value;
}
Mode_Function.prototype.setEditable = function(s) {
	this.obj.disabled  = (s == "false");
	this.obj.className = (this.obj.disabled ? "function_disabled" : "function");

	this.obj.nextSibling.disabled = this.obj.disabled;
	this.obj.nextSibling.className = (this.obj.disabled ? "bt_disabled" : "");
	this.obj.editable = s;
}
Mode_Function.prototype.validate = validate;
Mode_Function.prototype.reset = function() {
	this.obj.value = this.obj.defaultValue;
}
Mode_Function.prototype.saveAsDefaultValue = function() {
	this.obj.defaultValue = this.obj.value;
}
Mode_Function.prototype.setFocus = function() {
	try {
		this.obj.focus();
	} catch(e) {
	}
}



function Mode_Hidden(colName, element) {
	this.name = colName;
	this.obj = $(colName);
}
Mode_Hidden.prototype.setValue = function(s) {
}
Mode_Hidden.prototype.setEditable = function(s) {
}
Mode_Hidden.prototype.validate = function() {
	return true;
}
Mode_Hidden.prototype.reset = function() {
}
Mode_Hidden.prototype.saveAsDefaultValue = function() {
}
Mode_Hidden.prototype.setFocus = function() {
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



function validate() {
	var empty = this.obj.empty;
	var errorInfo = this.obj.errorInfo;
	var caption = this.obj.caption.replace(/\s/g,"");
	var submitReg = this.obj.submitReg;
	var value = this.obj.value;

	if(value == "" && empty == "false") {
		errorInfo = "[" + caption.replace(/\s/g, "") + "] ������Ϊ�գ���ѡ��";
	}

	if(submitReg != "null" && submitReg != null && !eval(submitReg).test(value)) {
		errorInfo = errorInfo || "[" + caption + "] ��ʽ����ȷ�������.";
	}

	if( errorInfo != "null" && errorInfo != null ) {
		showErrorInfo(errorInfo, this.obj);

		if(this.isInstance != false) {
			this.setFocus();
		}
		if(event != null) {
			event.returnValue = false;
		}
		return false;
	}

	return true;
}

function showErrorInfo(errorInfo, obj) {
	clearTimeout(200);
	
	setTimeout(function() {
		// ҳ��ȫ��Balllon����
		if(null != window.Balloons) {
			var balloon = Balloons.create(errorInfo);
			balloon.dockTo(obj);
		}
	}, 100);
}

function hideErrorInfo() {
	if(null != window.Balloons) {
		Balloons.dispose();
	}
}

function restore(obj, value) {    
	var tempEvent = obj.onpropertychange;
	if( tempEvent == null ) {
		clearTimeout(obj.timeout);
		tempEvent = obj._onpropertychange;
	}
	else {
		obj._onpropertychange = tempEvent;
	}

	obj.onpropertychange = null;
	obj.timeout = setTimeout(function() {
		obj.value = value;
		obj.onpropertychange = tempEvent;
	}, 10);
}

function waitingForVisible(func, element) {
	// �ؼ�δ����, ��ֱ��ִ��
	if( 0 != element.offsetWidth ) {
		func();
		return;
	}

	// �ؼ�����, ��ȴ�onresize
	var tasks = element.resizeTask || [];
	tasks[task.length] = func;
	element.resizeTask = tasks;

	if( element.onresize == null ) {
		element.onresize = function() {
			var tasks = element.resizeTask;
			for(var i=0; i < tasks.length; i++) {
				tasks[i]();
			}
			element.onresize = null;
		}
	}
}

function stringToNumber(str) {
	str = str.replace(/[^0-9\.\-]/g, '');
	if(str == "") {
		return 0;
	}
	return parseFloat(str);
}

function stringToDate(str, pattern) {
	var testYear  = str.substr(pattern.indexOf("yyyy"), 4);
	var testMonth = str.substr(pattern.indexOf("MM"), 2);
	var testDay   = str.substr(pattern.indexOf("dd"), 2);

	var testDate = testYear + "/" + testMonth + "/" + testDay;

	testDate = new Date(testDate);
	return new Date(testDate);
}

function numberToString(number, pattern) {
	return number.toString();
}