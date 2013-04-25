/*
 *	��ǩ��
 */
_TOOLBAR_NAMESPACE = "ToolBar";
_TAG_NAME_BOX = "Box";
_TAG_NAME_BUTTON = "Button";
_TAG_NAME_LISTBUTTON = "ListButton";
_TAG_NAME_TXTBUTTON = "TxtButton";
_TAG_NAME_SEPARATOR = "Separator";
_TAG_NAME_BUTTON_MORE = "ButtonMore";
_TAG_NAME_DIV = "div";
_TAG_NAME_IMG = "img";
_TAG_NAME_NOBR = "nobr";

/*
 *	xml�ڵ���
 */
_XML_NODE_NAME_BUTTON = "button";
_XML_NODE_NAME_LISTBUTTON = "listbutton";
_XML_NODE_NAME_TXTBUTTON = "txtbutton";
_XML_NODE_NAME_SEPARATOR = "separator";

_XML_NODE_TYPE_ELEMENT = 1;
_XML_NODE_TYPE_ATTRIBUTE = 2;
_XML_NODE_TYPE_TEXT = 3;
_XML_NODE_TYPE_COMMENT = 8;
_XML_NODE_TYPE_DOCUMENT = 9;

/*
 *	Ψһ�����ǰ׺
 */
_UNIQUE_ID_TOOLBAR_PREFIX = "toolbar__id";
_UNIQUE_ID_TOOLBAR_ITEM_PREFIX = "toolbar_item__id";
_UNIQUE_ID_DEFAULT_PREFIX = "default__id";

/*
 *	��ʽ����
 */
_STYLE_NAME_TOOLBAR_BUTTON_ACTIVE = "active";
_STYLE_NAME_TOOLBAR_BUTTON_INVERT = "invert";
_STYLE_NAME_TOOLBAR_BUTTON_DISABLE = "disable";
_STYLE_NAME_TOOLBAR_BUTTON_MORE_ACTIVE = "active";
_STYLE_NAME_TOOLBAR_BUTTON_MORE_INVERT = "invert";
_STYLE_NAME_TOOLBAR_LISTBUTTON_ACTIVE = "active";
_STYLE_NAME_TOOLBAR_LISTBUTTON_INVERT = "invert";
_STYLE_NAME_TOOLBAR_LISTBUTTON_ARROW = "arrow";
_STYLE_NAME_TOOLBAR_TXTBUTTON_ACTIVE = "active";
_STYLE_NAME_TOOLBAR_TXTBUTTON_INVERT = "invert";
_STYLE_NAME_TOOLBAR_TXTBUTTON_DISABLE = "disable";

/*
 *	�ļ���ַ
 */
_FILE_IMG_BUTTON_MORE = "icons/more.gif";
_FILE_IMG_LISTBUTTON_ARROW = "icons/arrow.gif";


/*
 *	�������ƣ�ToolBars��ȫ�־�̬����
 *	ְ�𣺸����������ToolBarʵ��
 */
var ToolBars = {};
ToolBars.items = {};

/*
 *	����һ��ToolBarʵ��
 *	������  object:tbObj  ToolBarʵ��������HTML����
 *	����ֵ��ToolBar:toolbar     ToolBarʵ��
 */
ToolBars.create = function(tbObj) {
	var toolbar = new ToolBar(tbObj);
	this.items[toolbar.uniqueID] = toolbar;

	return toolbar;
}

/*
 *	ͳ������ToolBarʵ������
 */
ToolBars.count = function() {
	var count = 0;
	for(var item in this.items) {
		count ++;
	}
	return count;
}

/*
 *	���ı���ʽ���������Ϣ
 */
ToolBars.toString = function() {
	var str = [];
	str[str.length] = "[ToolBars ����]";
	str[str.length] = "items:" + this.count();
	return str.join("\r\n");

}



/*
 *	�������ƣ�ToolBar
 *	ְ�𣺸���չʾ������
 */
function ToolBar(tbObj) {
	this.object = tbObj;
	this.btContainer = null;
	this.btMore = null;
	this.items = {};
	this.submenu = null;
	this.submenuMap = {};

	this.uniqueID = UniqueID.generator(_UNIQUE_ID_TOOLBAR_PREFIX);
	this.object.innerHTML = "";

	this.create();
	this.attachEvents();
}

/*
 *	��������
 */
ToolBar.prototype.create = function() {
	var box  = Element.createElement(_TAG_NAME_BOX, _TOOLBAR_NAMESPACE);
	var nobr = Element.createElement(_TAG_NAME_NOBR);
	var more = Element.createElement(_TAG_NAME_BUTTON_MORE, _TOOLBAR_NAMESPACE);
	var img  = Element.createElement(_TAG_NAME_IMG);

	img.src = _FILE_IMG_BUTTON_MORE;
	more._instance = this;

	box.appendChild(nobr);
	more.appendChild(img);

	this.object.appendChild(box);
	this.object.appendChild(more);

	this.btContainer = nobr;
	this.btMore = more;
	
	if( window.Menu ) {
		var submenu = new Menu();
		this.submenu = submenu;
	}
}

/*
 *	���밴ť����
 *	������  XmlNode/string:xmlstr       xml�ַ�������XmlNodeʵ��
 */
ToolBar.prototype.loadXML = function(xmlstr) {
	this.clear();

	//���ݲ����������ֻ�ȡxml��ʽ        
	var toolbarNode = null;
	switch(typeof(xmlstr)) {
		case "string":
			var xmlReader = new XmlReader(xmlstr);
			toolbarNode = new XmlNode(xmlReader.documentElement);
			break;
		case "object":
			if( window.XmlNode && (xmlstr instanceof window.XmlNode) ) {
				toolbarNode = xmlstr;
			} 
			else if( window.ActiveXObject && (xmlstr instanceof window.ActiveXObject) ) {
				toolbarNode = xmlstr;
			}
	}

	if( toolbarNode ) {
		var nodes = toolbarNode.selectNodes("*");
		for(var i=0; i < nodes.length; i++) {
			var curNode = nodes[i];
			this.add(curNode);
		}
	}
}

/*
 *	�������ToolBarItemʵ��
 */
ToolBar.prototype.clear = function() {
	for(var item in this.items) {
		this.del(item);
	}
	this.submenuMap = {};
}

/*
 *	�ͷ�ʵ��
 */
ToolBar.prototype.dispose = function() {
	this.clear();

	if( window.Menu ) {
		this.submenu.dispose();
	}
	for(var item in this) {
		delete this[item];
	}
}

/*
 *	��Ӱ�ť
 *	������  xmlNode/Object:itemObj    XML�ڵ��Object����
 */
ToolBar.prototype.add = function(itemObj) {
	if( _TYPE_OBJECT == typeof(itemObj) ) {

		//Node���ͣ�ת����Object
		if(_XML_NODE_TYPE_ELEMENT == itemObj.nodeType) {
			itemObj = this.convert(itemObj);
		}

		//���û��id�򴴽�һ��
		var id = itemObj.id || UniqueID.generator(_UNIQUE_ID_TOOLBAR_ITEM_PREFIX);
		itemObj.id = id;

		var item = new ToolBarItem(itemObj);
		item.dockTo(this.btContainer);

		this.items[id] = item;

		this.addSubMenuItem(itemObj);
	}
}

/*
 *	��xml�ڵ�ת����Object����
 *	������  xmlNode:node    XML�ڵ�
 *	����ֵ��    Object:itemObj      Object����
 */
ToolBar.prototype.convert = function(node) {
	var itemObj = {};
	itemObj.type = node.nodeName;
	itemObj.subitems = [];
	for(var i=0; i < node.attributes.length; i++) {
		var attr = node.attributes[i];
		itemObj[attr.nodeName] = attr.nodeValue;
	}
	var childs = node.childNodes;
	for(var i=0;i <= childs.length; i++) {
		var curChild = childs[i];
		if(_XML_NODE_TYPE_ELEMENT == curChild.nodeType) {
			var subItemObject = {};
			for(var j=0; j < curChild.attributes.length; j++) {
				var attr = curChild.attributes[j];
				subItemObject[attr.nodeName] = attr.nodeValue;
			}
			itemObj.subitems[itemObj.subitems.length] = subItemObject;
		}
	}
	return itemObj;
}

/*
 *	Ϊ���ఴť�����˵����ѡ��
 *	������  xmlNode/Object:itemObj    XML�ڵ��Object����
 */
ToolBar.prototype.addSubMenuItem = function(itemObj) {
	if( window.Menu && _XML_NODE_NAME_SEPARATOR != itemObj.type) {
		var subMenuItem = {};
		subMenuItem.label = itemObj.label;
		subMenuItem.callback = itemObj.cmd;
		subMenuItem.icon = itemObj.icon;
		subMenuItem.enable = true;
		subMenuItem.visible = true;

		this.submenuMap[itemObj.id] = this.submenu.addItem(subMenuItem);
	}
}

/*
 *	���ָ����ť
 *	������  string:id       ��ťID
 */
ToolBar.prototype.del = function(id) {
	var curItem = this.items[id];
	if( curItem ) {
		curItem.dispose();
		delete this.items[id];
		this.delSubMenuItem(id);
	}
}

/*
 *	�Ӹ��ఴť�����˵�ɾ��ѡ��
 *	������  string:id       ��ťID
 */
ToolBar.prototype.delSubMenuItem = function(id) {
	var submenuUniqueID = this.submenuMap[id];
	this.submenu.delItem(submenuUniqueID);
}

/*
 *	���¼�
 */
ToolBar.prototype.attachEvents = function() {
	this.object.onselectstart = _toolbar_onselectstart;
	this.btMore.onmouseover   = _toolbar_more_onmouseover;
	this.btMore.onmouseout    = _toolbar_more_onmouseout;
	this.btMore.onmousedown   = _toolbar_more_onmousedown;
	this.btMore.onmouseup     = _toolbar_more_onmouseup;
	this.btMore.onclick       = _toolbar_more_onclick;
}

/*
 *	���ఴť����Ч��
 */
ToolBar.prototype.active = function() {
	this.btMore.className = _STYLE_NAME_TOOLBAR_BUTTON_MORE_ACTIVE;
}

/*
 *	���ఴť����Ч��
 */
ToolBar.prototype.inactive = function() {
	this.btMore.className = "";
}

/*
 *	���ఴť����Ч��
 */
ToolBar.prototype.invert = function() {
	this.btMore.className = _STYLE_NAME_TOOLBAR_BUTTON_MORE_INVERT;
}

/*
 *	ͳ������ToolBarItemʵ������
 */
ToolBar.prototype.count = function() {
	var count = 0;
	for(var item in this.items) {
		count++;
	}
	return count;
}

/*
 *	�����ఴť�Ƿ�Ӧ����Ч
 */
ToolBar.prototype.checkMore = function() {
	var count = 0;
	for(var item in this.items) {
		var curItem = this.items[item];
		switch(curItem.type) {
			case _XML_NODE_NAME_BUTTON:
			case _XML_NODE_NAME_LISTBUTTON:
				if( curItem.isOutSide()) {
					count ++;
				}
				break;
			case _XML_NODE_NAME_SEPARATOR:
				break;
		}
	}

	return count > 0;
}

/*
 *	����������ఴť�¼�
 */
ToolBar.prototype.fireOnShowMore = function() {
	if( this.checkMore() ) {
		Public.execCommand(this.onShowMore);
		this.refreshSubMenu();
	}
}

/*
 *	ˢ�¸��ఴť�����˵�ѡ��
 *	������  xmlNode/Object:itemObj    XML�ڵ��Object����
 */
ToolBar.prototype.refreshSubMenu = function() {
	if( window.Menu ) {
		for(var item in this.items) {
			var curItem = this.items[item];
			var visible = curItem.isOutSide();
			var enable = curItem.enable;
			if(_XML_NODE_NAME_SEPARATOR != curItem.type) {

				var submenuItemUniqueID = this.submenuMap[item];
				var submenuItem = this.submenu.items[submenuItemUniqueID];
				submenuItem.visible = visible;
				submenuItem.enable = enable;

				var absLeft = Element.absLeft(this.btMore);
				var absTop = Element.absTop(this.btMore);
				var offsetHeight = this.btMore.offsetHeight;
				var offX = this.btMore.offsetWidth;
				this.submenu.show(offsetLeft,offsetTop+offsetHeight,true,offX);
			}
		}
	}
}

/*
 *	ͣ�ð�ť
 */
ToolBar.prototype.disable = function(id) {
	this.enable(id, false);
}

/*
 *	���ð�ť
 */
ToolBar.prototype.enable = function(id, enable) {
	var curItem = this.items[id];
	if( curItem ) {
		curItem.enable = (null == enable ? true : enable);
		curItem.refresh();
	}
}

/*
 *	���ð�ť�Ƿ�ɼ�
 */
ToolBar.prototype.setVisible = function(id, visible) {
	var curItem = this.items[id];
	if( curItem ) {
		curItem.visible = ( null == visible ? true : visible);
		curItem.refresh();
	}
}

/*
 *	���ı���ʽ���������Ϣ
 */
ToolBar.prototype.toString = function() {
	var str = [];
	str[str.length] = "[ToolBar ����]";
	str[str.length] = "uniqueID:" + this.uniqueID;
	str[str.length] = "items:" + this.count();
	return str.join("\r\n");
}

 
 
 
/*
 *	�������ƣ�ToolBarItem
 *	ְ�𣺸��𹤾�����ť/�ָ��ߵȵ�չʾ
 */
function ToolBarItem(itemObj) {
	this.object = null;
	this.id = itemObj.id;
	this.label = itemObj.label;
	this.icon = itemObj.icon;
	this.cmd = itemObj.cmd;
	this.enable = ("false"==itemObj.enable?false:true);
	this.visible = ("false"==itemObj.visible?false:true);
	this.type = itemObj.type;
	this.subitems = itemObj.subitems;
	this.submenu = null;
 
	this.create();
	this.createListItem();
	this.refresh();
	this.attachEvents();
}

/*
 *	��������չʾ
 */
ToolBarItem.prototype.create = function() {
	switch(this.type) {
		case _XML_NODE_NAME_BUTTON:
			var img = Element.createElement(_TAG_NAME_IMG);
			img.src = this.icon;

			var div = Element.createElement(_TAG_NAME_BUTTON, _TOOLBAR_NAMESPACE);
			div.id = this.id;
			div.title = this.label;
			div._instance = this;

			div.appendChild(img);

			this.object = div;
			break;
		case _XML_NODE_NAME_LISTBUTTON:
			var img = Element.createElement(_TAG_NAME_IMG);
			img.src = this.icon;

			var arrow = Element.createElement(_TAG_NAME_IMG); // ��ͷ
			arrow.src = _FILE_IMG_LISTBUTTON_ARROW;
			arrow.className = _STYLE_NAME_TOOLBAR_LISTBUTTON_ARROW;

			var div = Element.createElement(_TAG_NAME_LISTBUTTON, _TOOLBAR_NAMESPACE);
			div.id = this.id;
			div.title = this.label;
			div._instance = this;

			div.appendChild(img);
			div.appendChild(arrow);

			this.object = div;
			break;
		case _XML_NODE_NAME_SEPARATOR:
			this.object = Element.createElement(_TAG_NAME_SEPARATOR, _TOOLBAR_NAMESPACE);;
			break;
		case _XML_NODE_NAME_TXTBUTTON:

			var div = Element.createElement(_TAG_NAME_TXTBUTTON, _TOOLBAR_NAMESPACE);
			div.id = this.id;
			div.title = this.label;
			div.innerText = this.label;
			div._instance = this;

			this.object = div;
			break;
	}
}

/*
 *	ˢ�°�ť״̬
 */
ToolBarItem.prototype.refresh = function() {
	if(false == this.enable) {
		this.disable();
	} else {
		this.inactive();
	}
	
	if(false == this.visible) {
		this.hide();
	} else {
		this.show();
	}
}

/*
 *	���¼�
 */
ToolBarItem.prototype.attachEvents = function() {
	this.object.onmouseover = _toolbar_bt_onmouseover;
	this.object.onmouseout  = _toolbar_bt_onmouseout;
	this.object.onmousedown = _toolbar_bt_onmousedown;
	this.object.onmouseup   = _toolbar_bt_onmouseup;
	this.object.onclick     = _toolbar_bt_onclick;
}

/*
 *	������λ��ָ������
 *	������  object:container    HTML��������
 */
ToolBarItem.prototype.dockTo = function(container) {
	container.appendChild(this.object);
}

/*
 *	��ť����Ч��
 */
ToolBarItem.prototype.active = function() {
	switch(this.type) {
		case _XML_NODE_NAME_BUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_BUTTON_ACTIVE;
			break;
		case _XML_NODE_NAME_LISTBUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_LISTBUTTON_ACTIVE;
			break;
		case _XML_NODE_NAME_TXTBUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_TXTBUTTON_ACTIVE;
			break;
	}
}

/*
 *	��ť����Ч��
 */
ToolBarItem.prototype.inactive = function() {
	switch(this.type) {
		case _XML_NODE_NAME_BUTTON:
		case _XML_NODE_NAME_LISTBUTTON:
		case _XML_NODE_NAME_TXTBUTTON:
			this.object.className = "";
			break;
	}
}

/*
 *	��ť����Ч��
 */
ToolBarItem.prototype.invert = function() {
	switch(this.type) {
		case _XML_NODE_NAME_BUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_BUTTON_INVERT;
			break;
		case _XML_NODE_NAME_LISTBUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_LISTBUTTON_INVERT;
			break;
		case _XML_NODE_NAME_TXTBUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_TXTBUTTON_INVERT;
			break;
	}
}

/*
 *	��ť��ֹЧ��
 */
ToolBarItem.prototype.disable = function() {
	switch(this.type) {
		case _XML_NODE_NAME_BUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_BUTTON_DISABLE;
			break;
		case _XML_NODE_NAME_TXTBUTTON:
			this.object.className = _STYLE_NAME_TOOLBAR_TXTBUTTON_DISABLE;
			break;
	}
}

/*
 *	��ť����
 */
ToolBarItem.prototype.hide = function() {
	switch(this.type) {
		case _XML_NODE_NAME_BUTTON:
		case _XML_NODE_NAME_TXTBUTTON:
			this.object.style.display = "none";
			break;
	}
}

/*
 *	��ť��ʾ
 */
ToolBarItem.prototype.show = function() {
	switch(this.type) {
		case _XML_NODE_NAME_BUTTON:
		case _XML_NODE_NAME_TXTBUTTON:
			this.object.style.display = "";
			break;
	}
}

/*
 *	ִ�а�ť����
 */
ToolBarItem.prototype.execCallBack = function() {
	switch(this.type) {
		case _XML_NODE_NAME_LISTBUTTON:
			this.showListItem();
			break;
		case _XML_NODE_NAME_BUTTON:
		case _XML_NODE_NAME_TXTBUTTON:
			Public.execCommand(this.cmd);
			break;
	}
}

/*
 *	����ListButton�������б���(����Menu�ؼ�����)
 */
ToolBarItem.prototype.createListItem = function() {
	if(this.type == _XML_NODE_NAME_LISTBUTTON && window.Menu) {
		var submenu = new Menu();
		for(var i=0; i < this.subitems.length; i++) {
			var subItem = this.subitems[i];
			var menuSubItem = {};
			menuSubItem.label = subItem.label;
			menuSubItem.callback = subItem.cmd;
			menuSubItem.icon = subItem.icon;

			submenu.addItem(menuSubItem);
		}
		this.submenu = submenu;
	}
}

/*
 *	��ʾListButton�������б���(����Menu�ؼ�����)
 */
ToolBarItem.prototype.showListItem = function() {
	if(this.type == _XML_NODE_NAME_LISTBUTTON && window.Menu) {
		var absLeft = Element.absLeft(this.object);
		var absTop  = Element.absTop(this.object);
		var h = this.object.offsetHeight;
		var offX = this.object.offsetWidth;
		this.submenu.show(absLeft, absTop + h, true, offX);
	}
}

/*
 *	��ȡ��ť�Ƿ��ڹ�����ʾ����
 */
ToolBarItem.prototype.isOutSide = function() {
	var flag = false;
	switch(this.type) {
		case _XML_NODE_NAME_SEPARATOR:
			break;
		case _XML_NODE_NAME_BUTTON:
		case _XML_NODE_NAME_LISTBUTTON:
		case _XML_NODE_NAME_TXTBUTTON:
			var refLeft = this.object.offsetLeft + this.object.offsetWidth / 2;
			var rightBound = this.object.parentNode.parentNode.offsetWidth;
			flag = (refLeft > rightBound);
			break;
	}
	return flag;
}

/*
 *	�ͷ�ʵ��
 */
ToolBarItem.prototype.dispose = function() {
	Element.removeNode(this.object);

	for(var item in this) {
		delete this[item];
	}
}

/*
 *	���ı���ʽ���������Ϣ
 */
ToolBarItem.prototype.toString = function() {
	var str = [];
	str[str.length] = "[ToolBarItem ����]";
	str[str.length] = "id:" + this.id;
	str[str.length] = "label:" + this.label;
	str[str.length] = "type:" + this.type;
	str[str.length] = "icon:" + this.icon;
	str[str.length] = "cmd:" + this.cmd;
	return str.join("\r\n");
}



/*
 *	����뿪���ఴť
 *	������  event:eventObj    �¼�����
 */
function _toolbar_more_onmouseout() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if( _instance && _instance.checkMore() ) {
		_instance.inactive();
	}
}

/*
 *	��갴�¸��ఴť
 */
function _toolbar_more_onmousedown() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if( _instance && _instance.checkMore() ) {
		_instance.invert();
	}
}

/*
 *	�����ͣ���ఴť or ����ɿ����ఴť
 */
function _toolbar_more_onmouseover() = function _toolbar_more_onmouseup() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if( _instance && _instance.checkMore() ) {
		_instance.active();
	}
}

/*
 *	��������ఴť
 */
function _toolbar_more_onclick() {		
	this._instance.fireOnShowMore();
}
/*
 *	�����ͣ��ť
 */
function _toolbar_bt_onmouseover() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if(_instance && _instance.enable) {
		_instance.active();
	}
}

/*
 *	����뿪��ť
 */
function _toolbar_bt_onmouseout() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if(_instance && _instance.enable) {
		_instance.inactive();
	}
}

/*
 *	��갴�°�ť
 */
function _toolbar_bt_onmousedown() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if(_instance && _instance.enable) {
		_instance.invert();
	}
}

/*
 *	����ɿ���ť
 */
function _toolbar_bt_onmouseup() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if( _instance &&  _instance.enable) {
		_instance.active();
	}
}

/*
 *	�������ť
 */
function _toolbar_bt_onclick() {		
	var srcElement = this;
	var _instance = srcElement._instance;
	if( _instance && _instance.enable) {
		_instance.execCallBack();
	}
}

/*
 *	����϶�ѡ������
 */
function _toolbar_onselectstart(eventObj) {		
	Event.cancel(eventObj || window.event);
}
