    /*
     *	��̨��Ӧ���ݽڵ�����
     */
    XML_MAIN_TREE = "MenuTree";

    XML_MENU_INFO = "MenuInfo";
    XML_MENU_ITEM_INFO = "MenuItemInfo";
    XML_EXPORT_INFO = "Export";
    XML_OPERATION = "Operation";

    /*
     *	Ĭ��Ψһ�����ǰ׺
     */
    CACHE_MENU_DETAIL = "menuDetail__id";
    CACHE_VIEW_MENU_DETAIL = "viewMenuDetail__id";
    CACHE_MENU_ITEM_DETAIL = "menuItemDetail__id";
    CACHE_VIEW_MENU_ITEM_DETAIL = "viewMenuItemDetail__id";
    CACHE_MAIN_TREE = "tree__id";
    CACHE_TOOLBAR = "toolbar__id";
    /*
     *	����
     */
    OPERATION_ADD = "����$label";
    OPERATION_VIEW = "�鿴\"$label\"";
    OPERATION_DEL = "ɾ��\"$label\"";
    OPERATION_EDIT = "�༭\"$label\"";
    /*
     *	XMLHTTP�����ַ����
     */
    URL_INIT = "data/menu_init.xml";
    URL_MENU_DETAIL = "data/menu1.xml";
    URL_MENU_ITEM_DETAIL = "data/menu1.xml";
    URL_SAVE_MENU_DETAIL = "data/_success.xml";
    URL_SAVE_MENU_ITEM_DETAIL = "data/_success.xml";
    URL_DEL_MENU = "data/_success.xml";
    URL_DEL_MENU_ITEM = "data/_success.xml";
    URL_SORT_MENU = "data/_success.xml";
    URL_MOVE_MENU_ITEM = "data/_success.xml";
    URL_GET_OPERATION = "data/operation.xml";
	URL_GET_PS_TREE = "data/sitetree_init.xml";
	URL_REFLUSH_MENU_CACHE = "data/_success.xml";

    URL_INIT = "pms/navigator!getAllNavigator4Tree.action";
    URL_MENU_DETAIL = "pms/navigator!getNavigatorInfo.action";
    URL_MENU_ITEM_DETAIL = "pms/navigator!getNavigatorInfo.action";
    URL_SAVE_MENU_DETAIL = "pms/navigator!save.action";
    URL_SAVE_MENU_ITEM_DETAIL = "pms/navigator!save.action";
    URL_DEL_MENU = "pms/navigator!delete.action";
    URL_DEL_MENU_ITEM = "pms/navigator!delete.action";
    URL_SORT_MENU = "pms/navigator!sort.action";
    URL_MOVE_MENU_ITEM = "pms/navigator!move.action";
    URL_GET_OPERATION = "data/operation.xml";
    URL_GET_PS_TREE = "pms/navigator!getPortalStructuresByPortal4Tree.action";
    URL_REFLUSH_MENU_CACHE = "pms/cache!refresh.action";

    /*
     *	��ʱ
     */
    TIMEOUT_TAB_CHANGE = 200;
    /*
     *	icon·��
     */
    ICON = "../platform/images/icon/";

    var toolbar = null;

    /*
     *	����˵����ҳ���ʼ��
     *	������	
     *	����ֵ��
     */
    function init(){
        initPaletteResize();
   //     initUserInfo();
        initToolBar();
        initNaviBar("pms.5");
        initMenus();
        initBlocks();
        initWorkSpace(false);
        initEvents();
        initFocus();

        loadInitData();
    }
    /*
     *	����˵����ҳ���ʼ����������(��������������)
     *	������	
     *	����ֵ��
     */
    function loadInitData(){
        var p = new HttpRequestParams();
        p.url = URL_INIT;

        var request = new HttpRequest(p);
        request.onresult = function(){
            var _operation = this.getNodeValue(XML_OPERATION);

            var groupTreeNode = this.getNodeValue(XML_MAIN_TREE);
            var groupTreeNodeID = CACHE_MAIN_TREE;

            Cache.XmlIslands.add(groupTreeNodeID,groupTreeNode);

            loadToolBar(_operation);
            initTree(groupTreeNodeID);
        }
        request.send();
    }
    /*
     *	����˵������������������
     *	������	string:_operation      ����Ȩ��
     *	����ֵ��
     */
    function loadToolBar(_operation){
        var xmlIsland = Cache.XmlIslands.get(CACHE_TOOLBAR);
        if(null==xmlIsland){//��û�оʹ���

            var str = [];
            str[str.length] = "<toolbar>";

            //����
            str[str.length] = "    <button id=\"a1\" code=\"p1\" icon=\"" + ICON + "icon_pre.gif\" label=\"��ҳ\" cmd=\"ws.prevTab()\" enable=\"true\"/>";
            str[str.length] = "    <button id=\"a2\" code=\"p2\" icon=\"" + ICON + "icon_next.gif\" label=\"��ҳ\" cmd=\"ws.nextTab()\" enable=\"true\"/>";
            str[str.length] = "    <separator/>";

            //�˵�����
            str[str.length] = "    <button id=\"b1\" code=\"2\" icon=\"" + ICON + "view.gif\" label=\"�鿴\" cmd=\"editTreeNode(false)\" enable=\"'0'!=getTreeNodeType()\"/>";
            str[str.length] = "    <button id=\"b2\" code=\"2\" icon=\"" + ICON + "edit.gif\" label=\"�༭\" cmd=\"editTreeNode()\" enable=\"'0'!=getTreeNodeType()\"/>";
            str[str.length] = "    <button id=\"b3\" code=\"2\" icon=\"" + ICON + "del.gif\" label=\"ɾ��\" cmd=\"delTreeNode()\" enable=\"'0'!=getTreeNodeType()\"/>";
            str[str.length] = "    <button id=\"b5\" code=\"2\" icon=\"" + ICON + "move.gif\" label=\"�ƶ���...\" cmd=\"moveMenuItemTo()\" enable=\"'0'!=getTreeNodeType() &amp;&amp; '1'!=getTreeNodeType()\"/>";
            str[str.length] = "    <button id=\"b6\" code=\"2\" icon=\"" + ICON + "new_menu.gif\" label=\"�½��˵�\" cmd=\"addNewMenu()\" enable=\"'0'==getTreeNodeType()\"/>";
            str[str.length] = "</toolbar>";

            var xmlReader = new XmlReader(str.join("\r\n"));
            var xmlNode = new XmlNode(xmlReader.documentElement);

            Cache.XmlIslands.add(CACHE_TOOLBAR,xmlNode);
            xmlIsland = xmlNode;

            //���빤����
            toolbar.loadXML(xmlIsland);
        }

        //������ʾ
        var buttons = xmlIsland.selectNodes("./button");
        for(var i=0,iLen=buttons.length;i<iLen;i++){
            var curButton = buttons[i];
            var id = curButton.getAttribute("id");
            var code = curButton.getAttribute("code");
            var enableStr = curButton.getAttribute("enable");

            var reg = new RegExp("(^"+code+",)|(^"+code+"$)|(,"+code+",)|(,"+code+"$)","gi");
            var visible = false;
            if("string"==typeof(_operation)){
                visible = (true==reg.test(_operation)?true:false);
            }
            toolbar.setVisible(id,visible);

            if(true==visible){
                var enable = Public.execCommand(enableStr);
                toolbar.enable(id,enable);
            }
        }
    }
    /*
     *	����˵�����˵���ʼ��
     *	������	
     *	����ֵ��
     */
    function initMenus(){
        initTreeMenu();
    }
    /*
     *	����˵�������˵���ʼ��
     *	������	
     *	����ֵ��
     */
    function initTreeMenu(){
        var item1 = {
            label:"�½��˵�",
            callback:addNewMenu,
            enable:function(){return true;},
            visible:function(){return "0"==getTreeNodeType() && true==getOperation("2");}
        }
        var item2 = {
            label:"ɾ��",
            callback:delTreeNode,
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return "0"!=getTreeNodeType() && true==getOperation("2");}
        }
        var item3 = {
            label:"�༭",
            callback:editTreeNode,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return "0"!=getTreeNodeType() && true==getOperation("2");}
        }
        var item5 = {
            label:"�½��˵���",
            callback:null,
            enable:function(){return true;},
            visible:function(){return "0"!=getTreeNodeType() && true==getOperation("2");}
        }
        var item6 = {
            label:"�ƶ���...",
            callback:moveMenuItemTo,
            icon:ICON + "move.gif",
            enable:function(){return true;},
            visible:function(){return "0"!=getTreeNodeType() && "1"!=getTreeNodeType() && true==getOperation("2");}
        }
        var item7 = {
            label:"�鿴",
            callback:function(){
                editTreeNode(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return "0"!=getTreeNodeType() && true==getOperation("2");}
        }
		var item8 = {
            label:"ˢ�²˵�����",
            callback:flushMenuCache,
            enable:function(){return true;},
            visible:function(){return "0"!=getTreeNodeType() && "1"==getTreeNodeType() && true==getOperation("2");}
        }

        var submenu = new Menu();
		subItem3 = {
            label:"�Ż��ڲ�����",
            callback:function(){addNewMenuItem("3")},
            enable:function(){return true;},
            visible:function(){return true;}        
        }
        subItem4 = {
            label:"��ͨ��ʽ",
            callback:function(){addNewMenuItem("4")},
            enable:function(){return true;},
            visible:function(){return true;}        
        }
        subItem5 = {
            label:"�ֲ��滻��ʽ",
            callback:function(){addNewMenuItem("5")},
            enable:function(){return true;},
            visible:function(){return true;}        
        }
        subItem6 = {
            label:"��Ϊ��ʽ",
            callback:function(){addNewMenuItem("6")},
            enable:function(){return true;},
            visible:function(){return true;}        
        }
		subItem7 = {
            label:"CMS��Ŀ��ʽ",
            callback:function(){addNewMenuItem("7")},
            enable:function(){return true;},
            visible:function(){return true;}        
        }

        submenu.addItem(subItem4);
		submenu.addItem(subItem3);
        submenu.addItem(subItem6);
		submenu.addItem(subItem5);
		submenu.addItem(subItem7);
        item5.submenu = submenu;

        var treeObj = $("tree");

        var menu1 = new Menu();
        menu1.addItem(item7);
        menu1.addItem(item3);
        menu1.addItem(item2);
        menu1.addItem(item6);
        menu1.addSeparator();
        menu1.addItem(item1);
        menu1.addItem(item5);

	    menu1.addSeparator();
        menu1.addItem(item8);

        //menu1.attachTo(treeObj,"contextmenu");
        treeObj.contextmenu = menu1;
    }
    /*
     *	����˵���������ʼ��
     *	������	
     *	����ֵ��
     */
    function initBlocks(){
        var paletteObj = $("palette");
        Blocks.create(paletteObj);

        var treeContainerObj = $("treeContainer");
        Blocks.create(treeContainerObj,treeContainerObj.parentNode);

        var statusContainerObj = $("statusContainer");
        Blocks.create(statusContainerObj,statusContainerObj.parentNode,false);

        //״̬��Ϣ��ʵ���̳�WritingBlock��д����
        var block = Blocks.getBlock("statusContainer");
        if(null!=block){
            block.inherit(WritingBlock);
        }     
    }
    /*
     *	����˵������ʾ�û�״̬��Ϣ
     *	������	number:rowIndex     grid�����к�
     *	����ֵ��
     */
    function showUserStatus(rowIndex){
        var gridObj = $("grid");
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var rowName = gridObj.getNamedNodeValue_Xml(rowIndex,"userName");
        var rowID = rowNode.getAttribute("id");
        var rowPermission = rowNode.getAttribute("permission");

        var block = Blocks.getBlock("statusContainer");
        if(null!=block){
            block.open();
            block.writeln("����",rowName);
            block.writeln("ID",rowID);
            block.writeln("Ȩ��",rowID);
            block.close();
        }
    }
    /*
     *	����˵������Դ����ʼ��
     *	������	string:cacheID      ��������ID
     *	����ֵ��
     */
    function initTree(cacheID){
        var treeObj = $("tree");
        Public.initHTC(treeObj,"isLoaded","oncomponentready",function(){
            initTreeData(cacheID);
        });
    }
    /*
     *	����˵������Դ����������
     *	������
     *	����ֵ��
     */
    function initTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID);
        if(null!=xmlIsland){
            var treeObj = $("tree");
            treeObj.load(xmlIsland.node);

            treeObj.onTreeNodeActived = function(eventObj){
                onTreeNodeActived(eventObj);
            }
            treeObj.onTreeNodeDoubleClick = function(eventObj){
                onTreeNodeDoubleClick(eventObj);
            }
            treeObj.onTreeNodeRightClick = function(eventObj){
                onTreeNodeRightClick(eventObj);
            }
            treeObj.onTreeNodeMoved = function(eventObj){
                onTreeNodeMoved(eventObj);
            }
        }    
    }
    /*
     *	����˵�����۽���ʼ��
     *	������	
     *	����ֵ��
     */
    function initFocus(){
        var treeTitleObj = $("treeTitle");
        var statusTitleObj = $("statusTitle");

        Focus.register(treeTitleObj.firstChild);
        Focus.register(statusTitleObj.firstChild);
    }
    /*
     *	����˵�����¼��󶨳�ʼ��
     *	������	
     *	����ֵ��
     */
    function initEvents(){
        var treeBtRefreshObj = $("treeBtRefresh");
        var treeTitleBtObj = $("treeTitleBt");
        var statusTitleBtObj = $("statusTitleBt");
        var paletteBtObj = $("paletteBt");

        var treeTitleObj = $("treeTitle");
        var statusTitleObj = $("statusTitle");
        
        Event.attachEvent(treeBtRefreshObj,"click",onClickTreeBtRefresh);
        Event.attachEvent(treeTitleBtObj,"click",onClickTreeTitleBt);
        Event.attachEvent(statusTitleBtObj,"click",onClickStatusTitleBt);
        Event.attachEvent(paletteBtObj,"click",onClickPaletteBt);

        Event.attachEvent(treeTitleObj,"click",onClickTreeTitle);
        Event.attachEvent(statusTitleObj,"click",onClickStatusTitle);
    }
    /*
     *	����˵����������ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeActived(eventObj){
        var treeTitleObj = $("treeTitle");
        Focus.focus(treeTitleObj.firstChild.id);

        showTreeNodeStatus({id:"ID",name:"����",creator:"������",createTime:"����ʱ��",modifier:"�޸���",modifyTime:"�޸�ʱ��"});

        var treeNode = eventObj.treeNode;
        //��ֹ��Ϊ���빤�������ݶ����²���Ӧ˫���¼�
        clearTimeout(window._toolbarTimeout);
        window._toolbarTimeout = setTimeout(function(){
            loadToolBarData(treeNode);
        },0);
    }
    /*
     *	����˵����˫�����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeDoubleClick(eventObj){
        var treeNode = eventObj.treeNode;
        var id = getTreeNodeId();
        var type = getTreeNodeType();
        getTreeOperation(treeNode,function(_operation){
            var canAddNewMenu = checkOperation("pm1",_operation);
            var canEdit = checkOperation("pm3",_operation);
            if("_rootId"!=id && "0"!=type){
                editTreeNode(canEdit);            
            }
        });
    }
    /*
     *	����˵�����һ����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeRightClick(eventObj){
        var treeObj = $("tree");
        var treeNode = eventObj.treeNode;

        showTreeNodeStatus({id:"ID",name:"����",creator:"������",createTime:"����ʱ��",modifier:"�޸���",modifyTime:"�޸�ʱ��"});

        var x = eventObj.clientX;
        var y = eventObj.clientY;
        getTreeOperation(treeNode,function(_operation){
            if(null!=treeObj.contextmenu){
                treeObj.contextmenu.show(x,y);                
            }
            loadToolBar(_operation);
        });
    }
    /*
     *	����˵�����϶����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeMoved(eventObj){
        sortMenuTo(eventObj);
    }
    /*
     *	����˵������������������
     *	������	treeNode:treeNode       treeNodeʵ��
     *	����ֵ��
     */
    function loadToolBarData(treeNode){
        if(null!=treeNode){
            getTreeOperation(treeNode,function(_operation){
                loadToolBar(_operation);
            });
        }
    }
    /*
     *	����˵�����༭�˵���Ϣ
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editMenuInfo(editable){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadMenuDetailData(treeID,editable);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};            
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeName);
                inf.SID = CACHE_VIEW_MENU_DETAIL + treeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeName);
                inf.SID = CACHE_MENU_DETAIL + treeID;
            }
            inf.defaultPage = "page1";
            inf.phases = null;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����˵��ڵ�������ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentId             ���ڵ�id
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadMenuDetailData(treeID,editable,id,portalId,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_MENU_DETAIL + treeID;
        }else{
            var cacheID = CACHE_MENU_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_MENU_DETAIL;
            p.setContent("id", treeID);
            //���������
            if(true==isNew){
                p.setContent("isNew", 1);
                p.setContent("portalId", portalId);
                p.setContent("parentId", id);
                p.setContent("type", 1);
            }else{
              p.setContent("type", getTreeNodeType());
            }
            
            var request = new HttpRequest(p);
            request.onresult = function(){
                var menuInfoNode = this.getNodeValue(XML_MENU_INFO);

                var menuInfoNodeID = cacheID+"."+XML_MENU_INFO;

                Cache.XmlIslands.add(menuInfoNodeID,menuInfoNode);

                Cache.Variables.add(cacheID,[menuInfoNodeID]);

                initMenuPages(cacheID,editable,id,isNew);
            }
            request.send();
        }else{
            initMenuPages(cacheID,editable,id,isNew);
        }
    }
    /*
     *	����˵�����˵����ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:treeID               ���ڵ�id
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function initMenuPages(cacheID,editable,id,isNew){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadMenuInfoFormData(cacheID,editable);
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = function(){
            saveMenu(cacheID,id,isNew);
        }
    }
    /*
     *	����˵�����˵���Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadMenuInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_MENU_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵��������˵�
     *	������	string:cacheID      ��������id
                string:treeID       ���ڵ�id
                boolean:isNew       �Ƿ�����
     *	����ֵ��
     */
    function saveMenu(cacheID,parentId,isNew){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_MENU_DETAIL;

        //�Ƿ��ύ
        var flag = false;
        
        var groupCache = Cache.Variables.get(cacheID);
        if(null!=groupCache){       

            //�˵�������Ϣ
            var menuInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_MENU_INFO);

            if(null!=menuInfoNode){
                var menuInfoDataNode = menuInfoNode.selectSingleNode(".//data");
                if(null!=menuInfoDataNode){
                    flag = true;

                    var prefix = menuInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(menuInfoDataNode,prefix);
                }
            }
        }

        if(true==flag){
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            var page1BtSaveObj = $("page1BtSave");
            syncButton([page1BtSaveObj],request);

            request.onresult = function(){
                if(true==isNew){
                    //�������
                    detachReminder(cacheID);

                    var treeNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
                    appendTreeNode(parentId,treeNode);

                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.onsuccess = function(){
                if(true!=isNew){
                    //�������
                    detachReminder(cacheID);

                    //�������ڵ�����
                    var id = cacheID.trim(CACHE_MENU_DETAIL);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
        }
    }
    /*
     *	����˵�����½��˵�
     *	������
     *	����ֵ��
     */
    function addNewMenu(){
        
        var treeName = "�˵�";
        var treeID = new Date().valueOf();
        
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var parentId = treeNode.getAttribute("id");
            var portalId = treeNode.getAttribute("portalId");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadMenuDetailData(treeID,true,id, portalId,true);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_ADD.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_MENU_DETAIL + treeID;
            var tab = ws.open(inf);
        }
    }

    /*
     *	����˵����ѡ�����ļ�
     *	������
     *	����ֵ��
     */
    function getFile(name){
        var page1FormObj = $("page1Form");
        page1FormObj.updateDataExternal(name,"file_id1");
    }
    /*
     *	����˵����ɾ�����ڵ�
     *	������
     *	����ֵ��
     */
    function delTreeNode(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }
        if("2"==getTreeNodeType()){
            delMenu();
        }else{
            delMenuItem();
        }
    }
    /*
     *	����˵����ɾ���˵�
     *	������
     *	����ֵ��
     */
    function delMenu(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var p = new HttpRequestParams();
            var id = treeNode.getId();

            p.url = URL_DEL_MENU;		
            p.setContent("id",id);

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                var parentNode = treeNode.getParent();
                if(null!=parentNode){
                    treeObj.setActiveTreeNode(parentNode.getId());
                }
                //������ɾ��
                treeObj.removeTreeNode(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵����ɾ���˵���
     *	������
     *	����ֵ��
     */
    function delMenuItem(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var p = new HttpRequestParams();
            var id = treeNode.getId();

            p.url = URL_DEL_MENU_ITEM;		
            p.setContent("id",id);

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                var parentNode = treeNode.getParent();
                if(null!=parentNode){
                    treeObj.setActiveTreeNode(parentNode.getId());
                }
                //������ɾ��
                treeObj.removeTreeNode(treeNode);
            }
            request.send();
        }
    }

    /*
     *	����˵����ͬһ���ڵ����ƶ�Menu�ڵ�
     *	������	
     *	����ֵ��
     */
    function sortMenuTo(eventObj){
        var treeObj = $("tree");
        var movedTreeNode = eventObj.movedTreeNode;
        var toTreeNode = eventObj.toTreeNode;
        var moveState = eventObj.moveState;

        //ֻ����˵�������
        if("0"==movedTreeNode.getAttribute("type") || "1"==movedTreeNode.getAttribute("type")){
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SORT_MENU;
        p.setContent("targetId",toTreeNode.getId());
        p.setContent("id",movedTreeNode.getId());
        p.setContent("direction",moveState);//-1Ŀ���Ϸ�,1Ŀ���·�

        var request = new HttpRequest(p);
        request.onsuccess = function(){
            //�ƶ����ڵ�
            treeObj.moveTreeNode(movedTreeNode, toTreeNode, moveState);
        }
        request.send();
    }
    /*
     *	����˵������ȡ�ڵ�id
     *	������  
     *	����ֵ��string:id   ���ڵ�id
     */
    function getTreeNodeId(){
        return getTreeAttribute("id");
    }
    /*
     *	����˵������ȡ�ڵ�type
     *	������  
     *	����ֵ��string:type   ���ڵ�type
     */
    function getTreeNodeType(){
        return getTreeAttribute("type");
    }
    /*
     *	����˵������ȡ�ڵ�disabled
     *	������  
     *	����ֵ��string:disabled   ���ڵ�disabled
     */
    function getTreeNodeDisabled(){
        return getTreeAttribute("disabled");
    }
    /*
     *	����˵�����༭���ڵ�
     *	������	boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editTreeNode(editable){
        if("1"==getTreeNodeType()){
            editMenuInfo(editable);
        }else{
            editMenuItemInfo(editable);
        }
    }
    /*
     *	����˵����ˢ�����ڵ�ͣ������״̬
     *	������	treeNode:treeNode       treeNodeʵ��
                string:state            ͣ/����״̬
     *	����ֵ��
     */
    function refreshTreeNodeState(treeNode,state){
        treeNode.setAttribute("disabled",state);
        treeNode.setAttribute("icon",ICON + "icon_menu" + (state=="1"?"_stop":"") + ".gif");       
    }

    /*
     *	����˵�����½��˵���
     *	������  string:type     
     *	����ֵ��
     */
    function addNewMenuItem(type){
        
        var treeName = "�˵���";
        var treeID = new Date().valueOf();
        
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var parentId = treeNode.getAttribute("id");
            var portalId = treeNode.getAttribute("portalId");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadMenuItemDetailData(treeID,true,parentId,portalId,type,true);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_ADD.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_MENU_ITEM_DETAIL + treeID;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����༭�˵�����Ϣ
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editMenuItemInfo(editable){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadMenuItemDetailData(treeID,editable);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeName);
                inf.SID = CACHE_VIEW_MENU_ITEM_DETAIL + treeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeName);
                inf.SID = CACHE_MENU_ITEM_DETAIL + treeID;
            }
            inf.defaultPage = "page1";
            inf.phases = null;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����˵�����ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentId             ���ڵ�id
                string:type                 �˵�������
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadMenuItemDetailData(treeID,editable,parentId,portalId,type,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_MENU_ITEM_DETAIL + treeID;
        }else{
            var cacheID = CACHE_MENU_ITEM_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_MENU_ITEM_DETAIL;
           
            //���������
            if(true==isNew){
                p.setContent("isNew", 1);
                p.setContent("parentId", parentId);
                p.setContent("portalId", portalId);
                p.setContent("type", type);
            }else{
               p.setContent("id", treeID);
               p.setContent("type", getTreeNodeType());
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var menuItemInfoNode = this.getNodeValue(XML_MENU_ITEM_INFO);

                var menuItemInfoNodeID = cacheID+"."+XML_MENU_ITEM_INFO;

                Cache.XmlIslands.add(menuItemInfoNodeID,menuItemInfoNode);

                Cache.Variables.add(cacheID,[menuItemInfoNodeID]);

                initMenuItemPages(cacheID,editable,parentId,isNew);
            }
            request.send();
        }else{
            initMenuItemPages(cacheID,editable,parentId,isNew);
        }
    }
    /*
     *	����˵�����˵������ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:treeID               ���ڵ�id
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function initMenuItemPages(cacheID,editable,parentId,isNew){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadMenuItemInfoFormData(cacheID,editable);
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = function(){
            saveMenuItem(cacheID,parentId,isNew);
        }
    }
    /*
     *	����˵�����˵�����Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadMenuItemInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_MENU_ITEM_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵��������˵�
     *	������	string:cacheID      ��������id
                string:treeID       ���ڵ�id
                boolean:isNew       �Ƿ�����
     *	����ֵ��
     */
    function saveMenuItem(cacheID,parentId,isNew){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_MENU_ITEM_DETAIL;

        //�Ƿ��ύ
        var flag = false;
        
        var groupCache = Cache.Variables.get(cacheID);
        if(null!=groupCache){       

            //�˵��������Ϣ
            var menuItemInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_MENU_ITEM_INFO);

            if(null!=menuItemInfoNode){
                var menuItemInfoDataNode = menuItemInfoNode.selectSingleNode(".//data");
                if(null!=menuItemInfoDataNode){
                    flag = true;

                    var prefix = menuItemInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(menuItemInfoDataNode,prefix);
                }
            }
        }

        if(true==flag){
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            var page1BtSaveObj = $("page1BtSave");
            syncButton([page1BtSaveObj],request);

            request.onresult = function(){
                if(true==isNew){
                    //�������
                    detachReminder(cacheID);

                    var treeNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
                    appendTreeNode(parentId,treeNode);

                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.onsuccess = function(){
                if(true!=isNew){
                    //�������
                    detachReminder(cacheID);

                    //�������ڵ�����
                    var id = cacheID.trim(CACHE_MENU_ITEM_DETAIL);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
        }
    }
    /*
     *	����˵������������ѡ����ʾ����
     *	������	string:contentName      xform����
                string:contentId        xform����
                string:type             ����������ʾ��������
     *	����ֵ��
     */
    function getContent(contentName,contentId,type){
        var action = URL_GET_PS_TREE;

		var page1FormObj = $("page1Form");
        var portalId = page1FormObj.getData("portalId");
        var params = {
            action:"portlet",
            portalId:portalId,
            type:type
        };

        var portlet = window.showModalDialog("sitetree.htm",{params:params,title:"��ѡ��˵����Ӧ����",action:action},"dialogWidth:300px;dialogHeight:400px;");
        if(null!=portlet){
            page1FormObj.updateDataExternal(contentId, portlet.id);
            page1FormObj.updateDataExternal(contentName, portlet.name);
        }
    }

    /*
     *	����˵������������ѡ����ĿID
     *	����ֵ��
     */
	function getChannel(){
        var action = URL_GET_PS_TREE;

		var page1FormObj = $("page1Form");

        var channel = window.showModalDialog("channeltree.htm",{title:"��ѡ��˵����Ӧ��Ŀ"},"dialogWidth:300px;dialogHeight:400px;");
        if(null!=channel){
			page1FormObj.updateDataExternal('name', channel.name);
            page1FormObj.updateDataExternal('url', "${common.articleListUrl}&channelId=" + channel.id);
            page1FormObj.updateDataExternal('description', "���˵����Ӧ��ĿΪ��" + channel.name);
        }
    }
    /*
     *	����˵�����ƶ��˵���ڵ�
     *	������	
     *	����ֵ��
     */
    function moveMenuItemTo(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var name = treeNode.getName();
            var portalId = treeNode.getAttribute("portalId");

            var action = "pms/navigator!getNavigators4Tree.action";
            var params = {
                id:id,
                portalId:portalId,
                action:"moveTo"
            };

            var menu = window.showModalDialog("sitetree.htm",{params:params,title:"��\""+name+"\"�ƶ���",action:action},"dialogWidth:300px;dialogHeight:400px;");
            if(null!=menu){
                var p = new HttpRequestParams();
                p.url = URL_MOVE_MENU_ITEM;
                p.setContent("targetId",menu.id);
                p.setContent("id",id);
                p.setContent("portalId",portalId);

                var request = new HttpRequest(p);
                request.onsuccess = function(){
                    //�ƶ����ڵ�
                    var curNode = treeObj.getTreeNodeById(id);
                    var parentNode = treeObj.getTreeNodeById(menu.id);
                    parentNode.node.appendChild(curNode.node);
                    parentNode.node.setAttribute("_open","true");

                    var xmlNode = new XmlNode(curNode.node);
                    clearOperation(xmlNode);

                    treeObj.reload();
                }
                request.send();
            }
        }
    }
       
    /*
     *	����˵������ȡ������Ȩ��
     *	������	treeNode:treeNode       treeNodeʵ��
                function:callback       �ص�����
     *	����ֵ��
     */
    function getTreeOperation(treeNode,callback){
        var id = treeNode.getId();
        var _operation = treeNode.getAttribute("_operation");

        if(null==_operation || ""==_operation){//����ڵ��ϻ�û��_operation���ԣ�������Ӻ�̨��ȡ��Ϣ
            var p = new HttpRequestParams();
            p.url = URL_GET_OPERATION;
            p.setContent("resourceId",id);

            var request = new HttpRequest(p);
            request.onresult = function(){
                _operation = this.getNodeValue(XML_OPERATION);
                treeNode.setAttribute("_operation",_operation);

                if(null!=callback){
                    callback(_operation);
                }
            }
            request.send();            
        }else{
            if(null!=callback){
                callback(_operation);
            }
        }    
    }

	/*
     *	����˵����ˢ�²˵�����
     *	������
     *	����ֵ��
     */
    function flushMenuCache(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        var p = new HttpRequestParams();
        p.url = URL_REFLUSH_MENU_CACHE;
        if(null!=treeNode){
            var treeID = treeNode.getId();
            p.setContent("key",treeID);
            p.setContent("code","menu_pool");
            var request = new HttpRequest(p);

            request.send();	
        }
    }


    window.onload = init;

	//�ر�ҳ���Զ�ע��
    logoutOnClose();