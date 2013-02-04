
    /*
     *	��ǩ��
     */
    _TOOLBAR_NAMESPACE = "ToolBar";
    _TAG_NAME_BAR = "Bar";
    _TAG_NAME_BOX = "Box";
    _TAG_NAME_BUTTON = "Button";
    _TAG_NAME_LISTBUTTON = "ListButton";
    _TAG_NAME_TXTBUTTON = "TxtButton";
    _TAG_NAME_SEPARATOR = "Separator";
    _TAG_NAME_BUTTON_MORE = "ButtonMore";
    _TAG_NAME_TABLE = "table";
    _TAG_NAME_TBODY = "tbody";
    _TAG_NAME_TR = "tr";
    _TAG_NAME_TD = "td";
    _TAG_NAME_DIV = "div";
    _TAG_NAME_IMG = "img";
    _TAG_NAME_NOBR = "nobr";
    /*
     *	xml�ڵ���
     */
    _XML_NODE_NAME_TOOLBAR = "toolbar";
    _XML_NODE_NAME_BUTTON = "button";
    _XML_NODE_NAME_LISTBUTTON = "listbutton";
    _XML_NODE_NAME_TXTBUTTON = "txtbutton";
    _XML_NODE_NAME_LISTITEM = "item";
    _XML_NODE_NAME_SEPARATOR = "separator";
    _XML_ATTRIBUTE_NAME_ID = "id";
    _XML_ATTRIBUTE_NAME_LABEL = "label";
    _XML_ATTRIBUTE_NAME_ICON = "icon";
    _XML_ATTRIBUTE_NAME_CMD = "cmd";
    _XML_ATTRIBUTE_NAME_ENABLE = "enable";
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
    _STYLE_NAME_TOOLBAR_SEPARATOR = "separator";
    _STYLE_NAME_TOOLBAR_LISTBUTTON_ACTIVE = "active";
    _STYLE_NAME_TOOLBAR_LISTBUTTON_INVERT = "invert";
    _STYLE_NAME_TOOLBAR_LISTBUTTON_ARROW = "arrow";
    _STYLE_NAME_TOOLBAR_TXTBUTTON_ACTIVE = "active";
    _STYLE_NAME_TOOLBAR_TXTBUTTON_INVERT = "invert";
    _STYLE_NAME_TOOLBAR_TXTBUTTON_DISABLE = "disable";
    /*
     *	�ض��ַ�
     */
    _STRING_NO_BREAK_SPACE = "&nbsp;";
    /*
     *	�ߴ�
     */
    _SIZE_TOOLBAR_WIDTH = 133;
    /*
     *	�ļ���ַ
     */
    _FILE_IMG_BUTTON_MORE = "more.gif";
    _FILE_IMG_LISTBUTTON_ARROW = "arrow.gif";





    /*
     *	�������ƣ�ToolBars��ȫ�־�̬����
     *	ְ�𣺸����������ToolBarʵ��
     *
     */
    var ToolBars = {};
    ToolBars.items = {};
    /*
     *	����˵��������һ��ToolBarʵ��
     *	������  object:tbObj  ToolBarʵ��������HTML����
     *	����ֵ��ToolBar:toolbar     ToolBarʵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-19
     *
     */
    ToolBars.create = function(tbObj){
        var toolbar = new ToolBar(tbObj);
        this.items[toolbar.uniqueID] = toolbar;

        return toolbar;
    }
    /*
     *	����˵����ͳ������ToolBarʵ������
     *	������
     *	����ֵ��number:count	ToolBarʵ������
     *	���ߣ�ë��
     *	���ڣ�2006-4-19
     *
     */
    ToolBars.count = function(){
        var count = 0;
        for(var item in this.items){
            count++;
        }
        return count;
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    ToolBars.toString = function(){
        var str = [];
        str[str.length] = "[ToolBars ����]";
        str[str.length] = "items:" + this.count();
        return str.join("\r\n");

    }






    /*
     *	�������ƣ�ToolBar
     *	ְ�𣺸���չʾ������
     *
     */
    function ToolBar(tbObj){
        this.object = tbObj;
        this.uniqueID = null;
        this.btContainer = null;
        this.btMore = null;
        this.items = {};
        this.submenu = null;
        this.submenuMap = {};
        this.init();
    }
    /*
     *	����˵����ToolBar��ʼ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.init = function(){
        this.uniqueID = UniqueID.generator(_UNIQUE_ID_TOOLBAR_PREFIX);
		this.object.innerHTML = "";

        this.create();
        this.attachEvents();
    }
    /*
     *	����˵������������
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.create = function(){
        var box = Element.createElement(_TAG_NAME_BOX,_TOOLBAR_NAMESPACE);
        var nobr = Element.createElement(_TAG_NAME_NOBR);
        var more = Element.createElement(_TAG_NAME_BUTTON_MORE,_TOOLBAR_NAMESPACE);
        var img = Element.createElement(_TAG_NAME_IMG);

        img.src = _FILE_IMG_BUTTON_MORE;
        more._instance = this;

        box.appendChild(nobr);
        more.appendChild(img);

        this.object.appendChild(box);
        this.object.appendChild(more);

        this.btContainer = nobr;
        this.btMore = more;
        
        if(null!=window.Menu){
            var submenu = new Menu();
            this.submenu = submenu;
        }
    }
    /*
     *	����˵�������밴ť����
     *	������  XmlNode/string:xmlstr       xml�ַ�������XmlNodeʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-5-23
     *
     */
    ToolBar.prototype.loadXML = function(xmlstr){
        this.clear();

        //���ݲ����������ֻ�ȡxml��ʽ        
        var toolbarNode = null;
        switch(typeof(xmlstr)){
            case "string":
                var xmlReader = new XmlReader(xmlstr);
                toolbarNode = new XmlNode(xmlReader.documentElement);
                break;
            case "object":
                if(null!=window.XmlNode && (xmlstr instanceof window.XmlNode)){
                    toolbarNode = xmlstr;
                }else if(null!=window.ActiveXObject && (xmlstr instanceof window.ActiveXObject)){
                    toolbarNode = xmlstr;
                }
        }
        if(null!=toolbarNode){
            var nodes = toolbarNode.selectNodes("*");
            for(var i=0,iLen=nodes.length;i<iLen;i++){
                var curNode = nodes[i];
                if(_XML_NODE_NAME_SEPARATOR==curNode.nodeName){
                    if(0<i && i<iLen-1 && _XML_NODE_NAME_SEPARATOR!=nodes[i+1].nodeName){
                          this.add(curNode);
                      }
                }else{
                    this.add(curNode);
                }
            }
        }
    }
    /*
     *	����˵�����������ToolBarItemʵ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.clear = function(){
        for(var item in this.items){
            this.del(item);
        }
        this.submenuMap = {};
    }
    /*
     *	����˵�����ͷ�ʵ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.dispose = function(){
        this.clear();

        if(null!=window.Menu){
            this.submenu.dispose();
        }
        for(var item in this){
            delete this[item];
        }
    }
    /*
     *	����˵������Ӱ�ť
     *	������  xmlNode/Object:itemObj    XML�ڵ��Object����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.add = function(itemObj){
        if(_TYPE_OBJECT==typeof(itemObj)){

            //Node���ͣ�ת����Object
            if(_XML_NODE_TYPE_ELEMENT==itemObj.nodeType){
                itemObj = this.convert(itemObj);
            }

            //���û��id�򴴽�һ��
            var id = itemObj.id;
            if(null==id){
                id = UniqueID.generator(_UNIQUE_ID_TOOLBAR_ITEM_PREFIX);
                itemObj.id = id;
            }

            var item = new ToolBarItem(itemObj);
            item.dockTo(this.btContainer);

            this.items[id] = item;

            this.addSubMenuItem(itemObj);
        }
    }
    /*
     *	����˵������xml�ڵ�ת����Object����
     *	������  xmlNode:node    XML�ڵ�
     *	����ֵ��    Object:itemObj      Object����
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.convert = function(node){
        var itemObj = {};
        itemObj.type = node.nodeName;
        itemObj.subitems = [];
        for(var i=0,iLen=node.attributes.length;i<iLen;i++){
            var attr = node.attributes[i];
            itemObj[attr.nodeName] = attr.nodeValue;
        }
        var childs = node.childNodes;
        for(var i=0,iLen=childs.length;i<iLen;i++){
            var curChild = childs[i];
            if(_XML_NODE_TYPE_ELEMENT==curChild.nodeType){

                var subItemObject = {};
                for(var j=0,jLen=curChild.attributes.length;j<jLen;j++){
                    var attr = curChild.attributes[j];
                    subItemObject[attr.nodeName] = attr.nodeValue;
                }
                itemObj.subitems[itemObj.subitems.length] = subItemObject;
            }
        }
        return itemObj;
    }
    /*
     *	����˵����Ϊ���ఴť�����˵����ѡ��
     *	������  xmlNode/Object:itemObj    XML�ڵ��Object����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.addSubMenuItem = function(itemObj){
        if(null!=window.Menu){
            if(_XML_NODE_NAME_SEPARATOR!=itemObj.type){
                var subMenuItem = {};
                subMenuItem.label = itemObj.label;
                subMenuItem.callback = itemObj.cmd;
                subMenuItem.icon = itemObj.icon;
                subMenuItem.enable = true;
                subMenuItem.visible = true;

                this.submenuMap[itemObj.id] = this.submenu.addItem(subMenuItem);
            }
        }
    }
    /*
     *	����˵�������ָ����ť
     *	������  string:id       ��ťID
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.del = function(id){
        var curItem = this.items[id];
        if(null!=curItem){
            curItem.dispose();

            delete this.items[id];

            this.delSubMenuItem(id);
        }
    }
    /*
     *	����˵�����Ӹ��ఴť�����˵�ɾ��ѡ��
     *	������  string:id       ��ťID
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.delSubMenuItem = function(id){
        var submenuUniqueID = this.submenuMap[id];
        this.submenu.delItem(submenuUniqueID);
    }
    /*
     *	����˵�������¼�
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.attachEvents = function(){
        this.object.onselectstart = _toolbar_onselectstart;
        this.btMore.onmouseover = _toolbar_more_onmouseover;
        this.btMore.onmouseout = _toolbar_more_onmouseout;
        this.btMore.onmousedown = _toolbar_more_onmousedown;
        this.btMore.onmouseup = _toolbar_more_onmouseup;
        this.btMore.onclick = _toolbar_more_onclick;
    }
    /*
     *	����˵�������ఴť����Ч��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.active = function(){
        this.btMore.className = _STYLE_NAME_TOOLBAR_BUTTON_MORE_ACTIVE;
    }
    /*
     *	����˵�������ఴť����Ч��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.inactive = function(){
        this.btMore.className = "";
    }
    /*
     *	����˵�������ఴť����Ч��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.invert = function(){
        this.btMore.className = _STYLE_NAME_TOOLBAR_BUTTON_MORE_INVERT;
    }
    /*
     *	����˵����ͳ������ToolBarItemʵ������
     *	������
     *	����ֵ��number:count	ToolBarItemʵ������
     *	���ߣ�ë��
     *	���ڣ�2006-4-15
     *
     */
    ToolBar.prototype.count = function(){
        var count = 0;
        for(var item in this.items){
            count++;
        }
        return count;
    }
    /*
     *	����˵���������ఴť�Ƿ�Ӧ����Ч
     *	������
     *	����ֵ��    boolean:flag    �Ƿ�Ӧ����Ч(true��ʾӦ����Ч)
     *	���ߣ�ë��
     *	���ڣ�2006-4-15
     *
     */
    ToolBar.prototype.checkMore = function(){
        var flag = false;
        var count = 0;
        for(var item in this.items){
            var curItem = this.items[item];
            switch(curItem.type){
                case _XML_NODE_NAME_BUTTON:
                    if(true==curItem.isOutSide()){
                        count++;
                    }
                    break;
                case _XML_NODE_NAME_LISTBUTTON:
                    if(true==curItem.isOutSide()){
                        count++;
                    }
                    break;
                case _XML_NODE_NAME_SEPARATOR:
                    break;
            }
        }
        if(0<count){
            flag = true;
        }
        return flag;
    }
    /*
     *	����˵��������������ఴť�¼�
     *	������
     *	����ֵ��number:count	ToolBarItemʵ������
     *	���ߣ�ë��
     *	���ڣ�2006-4-15
     *
     */
    ToolBar.prototype.fireOnShowMore = function(){
        if(true==this.checkMore()){
            Public.execCommand(this.onShowMore);
            this.refreshSubMenu();
        }
    }
    /*
     *	����˵����ˢ�¸��ఴť�����˵�ѡ��
     *	������  xmlNode/Object:itemObj    XML�ڵ��Object����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.refreshSubMenu = function(){
        if(null!=window.Menu){
            for(var item in this.items){
                var curItem = this.items[item];
                var visible = curItem.isOutSide();
                var enable = curItem.enable;
                if(_XML_NODE_NAME_SEPARATOR!=curItem.type){

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
     *	����˵����ͣ�ð�ť
     *	������  string:id       ��ťid
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-15
     *
     */
    ToolBar.prototype.disable = function(id){
        this.enable(id,false);
    }
    /*
     *	����˵�������ð�ť
     *	������  string:id       ��ťid
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-15
     *
     */
    ToolBar.prototype.enable = function(id,enable){
        var curItem = this.items[id];
        if(null!=curItem){
            curItem.enable = (null==enable?true:enable);
            curItem.refresh();
        }
    }
    /*
     *	����˵�������ð�ť�Ƿ�ɼ�
     *	������  string:id       ��ťid
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-15
     *
     */
    ToolBar.prototype.setVisible = function(id,visible){
        var curItem = this.items[id];
        if(null!=curItem){
            curItem.visible = (null==visible?true:visible);
            curItem.refresh();
        }
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBar.prototype.toString = function(){
        var str = [];
        str[str.length] = "[ToolBar ����]";
        str[str.length] = "uniqueID:" + this.uniqueID;
        str[str.length] = "items:" + this.count();
        return str.join("\r\n");
    }







    /*
     *	�������ƣ�ToolBarItem
     *	ְ�𣺸��𹤾�����ť/�ָ��ߵȵ�չʾ
     *
     */
    function ToolBarItem(itemObj){
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
        this.init();
    }
    /*
     *	����˵����ToolBarItem��ʼ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.init = function(){
        this.create();
        this.createListItem();
        this.refresh();
        this.attachEvents();
    }
    /*
     *	����˵������������չʾ
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.create = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                var img = Element.createElement(_TAG_NAME_IMG);
                img.src = this.icon;

                var div = Element.createElement(_TAG_NAME_BUTTON,_TOOLBAR_NAMESPACE);
                div.id = this.id;
                div.title = this.label;
                div._instance = this;

                div.appendChild(img);

                this.object = div;
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                var img = Element.createElement(_TAG_NAME_IMG);
                img.src = this.icon;

                var arrow = Element.createElement(_TAG_NAME_IMG);
                arrow.src = _FILE_IMG_LISTBUTTON_ARROW;
                arrow.className = _STYLE_NAME_TOOLBAR_LISTBUTTON_ARROW;

                var div = Element.createElement(_TAG_NAME_LISTBUTTON,_TOOLBAR_NAMESPACE);
                div.id = this.id;
                div.title = this.label;
                div._instance = this;

                div.appendChild(img);
                div.appendChild(arrow);

                this.object = div;
                break;
            case _XML_NODE_NAME_SEPARATOR:

                var div = Element.createElement(_TAG_NAME_SEPARATOR,_TOOLBAR_NAMESPACE);

                this.object = div;
                break;
            case _XML_NODE_NAME_TXTBUTTON:

                var div = Element.createElement(_TAG_NAME_TXTBUTTON,_TOOLBAR_NAMESPACE);
                div.id = this.id;
                div.title = this.label;
                div.innerText = this.label;
                div._instance = this;

                this.object = div;
                break;
        }
    }
    /*
     *	����˵����ˢ�°�ť״̬
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.refresh = function(){
        if(false==this.enable){
            this.disable();
        }else{
            this.inactive();
        }
        if(false==this.visible){
            this.hide();
        }else{
            this.show();
        }
    }
    /*
     *	����˵�������¼�
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.attachEvents = function(){
        this.object.onmouseover = _toolbar_bt_onmouseover;
        this.object.onmouseout = _toolbar_bt_onmouseout;
        this.object.onmousedown = _toolbar_bt_onmousedown;
        this.object.onmouseup = _toolbar_bt_onmouseup;
        this.object.onclick = _toolbar_bt_onclick;
    }
    /*
     *	����˵����������λ��ָ������
     *	������  object:container    HTML��������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.dockTo = function(container){
        container.appendChild(this.object);
    }
    /*
     *	����˵������ť����Ч��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.active = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_BUTTON_ACTIVE;
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_LISTBUTTON_ACTIVE;
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_TXTBUTTON_ACTIVE;
                break;
        }
    }
    /*
     *	����˵������ť����Ч��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.inactive = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                this.object.className = "";
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                this.object.className = "";
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                this.object.className = "";
                break;
        }
    }
    /*
     *	����˵������ť����Ч��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.invert = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_BUTTON_INVERT;
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_LISTBUTTON_INVERT;
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_TXTBUTTON_INVERT;
                break;
        }
    }
    /*
     *	����˵������ť��ֹЧ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.disable = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_BUTTON_DISABLE;
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                this.object.className = _STYLE_NAME_TOOLBAR_TXTBUTTON_DISABLE;
                break;
        }
    }
    /*
     *	����˵������ť����
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.hide = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                this.object.style.display = "none";
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                this.object.style.display = "none";
                break;
        }
    }
    /*
     *	����˵������ť��ʾ
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.show = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                this.object.style.display = "";
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                this.object.style.display = "";
                break;
        }
    }
    /*
     *	����˵����ִ�а�ť����
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.execCallBack = function(){
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                Public.execCommand(this.cmd);
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                this.showListItem();
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                Public.execCommand(this.cmd);
                break;
        }
    }
    /*
     *	����˵��������ListButton�������б���
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.createListItem = function(){
        if(this.type==_XML_NODE_NAME_LISTBUTTON){
            //����Menu�ؼ�����
            if(null!=window.Menu){
                var submenu = new Menu();
                for(var i=0,iLen=this.subitems.length;i<iLen;i++){
                    var curSubItem = this.subitems[i];
                    var curMenuSubItem = {};
                    curMenuSubItem.label = curSubItem.label;
                    curMenuSubItem.callback = curSubItem.cmd;
                    curMenuSubItem.icon = curSubItem.icon;

                    submenu.addItem(curMenuSubItem);
                }
                this.submenu = submenu;
            }
        }
    }
    /*
     *	����˵������ʾListButton�������б���
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.showListItem = function(){
        if(this.type==_XML_NODE_NAME_LISTBUTTON){
            //����Menu�ؼ�����
            if(null!=window.Menu){
                var absLeft = Element.absLeft(this.object);
                var absTop = Element.absTop(this.object);
                var h = this.object.offsetHeight;
                var offX = this.object.offsetWidth;
                this.submenu.show(offsetLeft,offsetTop+h,true,offX);
            }
        }
    }
    /*
     *	����˵������ȡ��ť�Ƿ��ڹ�����ʾ����
     *	������
     *	����ֵ��    bollean:flag    �Ƿ��ڹ�����ʾ����(true��ʾ����)
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    ToolBarItem.prototype.isOutSide = function(){
        var flag = false;
        switch(this.type){
            case _XML_NODE_NAME_BUTTON:
                var refLeft = this.object.offsetLeft+this.object.offsetWidth/2;
                var rightBound = this.object.parentNode.parentNode.offsetWidth;
                flag = (refLeft>rightBound);
                break;
            case _XML_NODE_NAME_LISTBUTTON:
                var refLeft = this.object.offsetLeft+this.object.offsetWidth/2;
                var rightBound = this.object.parentNode.parentNode.offsetWidth;
                flag = (refLeft>rightBound);
                break;
            case _XML_NODE_NAME_SEPARATOR:
                break;
            case _XML_NODE_NAME_TXTBUTTON:
                var refLeft = this.object.offsetLeft+this.object.offsetWidth/2;
                var rightBound = this.object.parentNode.parentNode.offsetWidth;
                flag = (refLeft>rightBound);
                break;
        }
        return flag;
    }
    /*
     *	����˵�����ͷ�ʵ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-19
     *
     */
    ToolBarItem.prototype.dispose = function(){
        Element.removeNode(this.object);

        for(var item in this){
            delete this[item];
        }
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    ToolBarItem.prototype.toString = function(){
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
     *	����˵���������ͣ���ఴť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_more_onmouseover(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance){
            if(true==_instance.checkMore()){
                _instance.active();
            }
        }
    }
    /*
     *	����˵��������뿪���ఴť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_more_onmouseout(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance){
            if(true==_instance.checkMore()){
                _instance.inactive();
            }
        }
    }
    /*
     *	����˵������갴�¸��ఴť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_more_onmousedown(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance){
            if(true==_instance.checkMore()){
                _instance.invert();
            }
        }
    }
    /*
     *	����˵��������ɿ����ఴť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_more_onmouseup(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance){
            if(true==_instance.checkMore()){
                _instance.active();
            }
        }
    }
    /*
     *	����˵������������ఴť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_more_onclick(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        this._instance.fireOnShowMore();
    }
    /*
     *	����˵���������ͣ��ť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_bt_onmouseover(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance && false!=_instance.enable){
            _instance.active();
        }
    }
    /*
     *	����˵��������뿪��ť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_bt_onmouseout(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance && false!=_instance.enable){
            _instance.inactive();
        }
    }
    /*
     *	����˵������갴�°�ť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_bt_onmousedown(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance && false!=_instance.enable){
            _instance.invert();
        }
    }
    /*
     *	����˵��������ɿ���ť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_bt_onmouseup(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance && false!=_instance.enable){
            _instance.active();
        }
    }
    /*
     *	����˵�����������ť
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_bt_onclick(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        var _instance = srcElement._instance;
        if(null!=_instance && false!=_instance.enable){
            _instance.execCallBack();
        }
    }
    /*
     *	����˵��������϶�ѡ������
     *	������  event:eventObj    �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    function _toolbar_onselectstart(eventObj){		
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = this;
        Event.cancel(eventObj);
    }
    


