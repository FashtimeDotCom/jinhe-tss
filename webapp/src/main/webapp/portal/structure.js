    var _TEMP_CODE = new Date().getTime();
    /*
     *	��̨��Ӧ���ݽڵ�����
     */
    XML_DEFAULT_TOOLBAR = "DefaultToolBar";
    XML_TOOLBAR = "ToolBar";
    XML_MAIN_TREE = "SiteTree";

    XML_SITE_INFO = "SiteInfo";
    XML_PREVIEW = "html";
    XML_UPLOAD_INFO = "upload";
    XML_LAYOUT_PARAMETERS_INFO = "LayoutParameters";
    XML_DECORATOR_PARAMETERS_INFO = "DecoratorParameters";
    XML_PORTLET_PARAMETERS_INFO = "PortletParameters";
    XML_THEME_MANAGE = "ThemeManage";
    XML_CACHE_MANAGE = "CacheManage";
    XML_OPERATION = "Operation";
    /*
     *	Ĭ��Ψһ�����ǰ׺
     */
    CACHE_GRID_ROW_DETAIL = "row__id";
    CACHE_TREE_NODE_DETAIL = "treeNode__id";
    CACHE_VIEW_TREE_NODE_DETAIL = "viewTreeNode__id";
    CACHE_TREE_NODE_GRID = "treeNodeGrid__id";
    CACHE_MAIN_TREE = "tree__id";
    CACHE_TOOLBAR = "toolbar__id";
    CACHE_UPLOAD_DETAIL = "upload__id";
    CACHE_THEME_MANAGE = "themeManage__id";
    CACHE_CACHE_MANAGE = "cacheManage__id";
    /*
     *	����
     */
    OPERATION_ADD = "����$label";
    OPERATION_VIEW = "�鿴\"$label\"";
    OPERATION_DEL = "ɾ��\"$label\"";
    OPERATION_EDIT = "�༭\"$label\"";
    OPERATION_SETTING = "����\"$label\"";
    OPERATION_IMPORT = "�Ż�����";
    /*
     *	XMLHTTP�����ַ����
     */
    URL_INIT = "data/site_init.xml";
    URL_SITE_DETAIL = "data/site1.xml";
    URL_SAVE_SITE = "data/_success.xml";
    URL_DEL_SITE = "data/_success.xml";
    URL_STOP_SITE = "data/_success.xml";
    URL_START_SITE = "data/_success.xml";
    URL_MOVE_SITE = "data/_success.xml";
    URL_SORT_SITE = "data/_success.xml";
    URL_COPY_SITE = "data/copysite.xml";
    URL_COPY_SITE_TO = "data/copysite.xml";
    URL_VIEW_SITE = "portal!previewPortal.action";
    URL_GET_LAYOUT_PARAMETERS = "data/layoutparameters.xml";
    URL_GET_DECORATOR_PARAMETERS = "data/decoratorparameters.xml";
    URL_GET_PORTLET_PARAMETERS = "data/portletparameters.xml";
    URL_THEME_MANAGE = "data/thememanage.xml";
    URL_RENAME_THEME = "data/_success.xml";
    URL_DEL_THEME = "data/_success.xml";
    URL_COPY_THEME = "data/copytheme.xml";
    URL_PREVIEW_THEME = "data/_success.xml";
    URL_SET_DEFAULT_THEME = "data/_success.xml";
    URL_GET_OPERATION = "data/operation.xml";
    URL_FLUSH_CACHE = "data/_success.xml";
    URL_CACHE_MANAGE = "data/cachemanage.xml";
    URL_IMPORT_SITE = "data/upload1.htm";
    URL_EXPORT_SITE = "data/download.zip";
    URL_UPLOAD_DETAIL = "data/importsite.xml";

//    URL_INIT = "pms/portal!getAllPortals4Tree.action";
//    URL_SITE_DETAIL = "pms/portal!getPortalStructureInfo.action";
//    URL_SAVE_SITE = "pms/portal!save.action";
//    URL_DEL_SITE = "pms/portal!delete.action";
//    URL_STOP_SITE = "pms/portal!disable.action";
//    URL_START_SITE = "pms/portal!disable.action";
//    URL_MOVE_SITE = "pms/portal!move.action";
//    URL_SORT_SITE = "pms/portal!order.action";
//    URL_COPY_SITE = "pms/portal!copyPortal.action";
//    URL_COPY_SITE_TO = "pms/portal!copyTo.action";
//    URL_VIEW_SITE = "portal!previewPortal.action";
//    URL_GET_LAYOUT_PARAMETERS = "pms/layout!getDefaultParams4Xml.action";
//    URL_GET_DECORATOR_PARAMETERS = "pms/decorator!getDefaultParams4Xml.action";
//    URL_GET_PORTLET_PARAMETERS = "pms/portlet!getDefaultParams4Xml.action";
//    URL_THEME_MANAGE = "pms/portal!getThemes4Tree.action";
//    URL_RENAME_THEME = "pms/portal!renameTheme.action";
//    URL_DEL_THEME =  "pms/portal!removeTheme.action";
//    URL_COPY_THEME = "pms/portal!saveThemeAs.action";
//    URL_PREVIEW_THEME = "portal!previewPortal.action";
//    URL_SET_DEFAULT_THEME = "pms/portal!specifyDefaultTheme.action";
//    URL_GET_OPERATION = "pms/portal!getOperationsByResource.action";
//    URL_FLUSH_CACHE = "pms/portal!flushCache.action";
//    URL_CACHE_MANAGE = "pms/portal!cacheManage.action";
//    URL_IMPORT_SITE = "pms/portal!importPortal.action";
//    URL_EXPORT_SITE = "pms/portal!exportPortal.action";
//    URL_UPLOAD_DETAIL = "data/importsite.xml";


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
//        initUserInfo();
        initToolBar();
        initNaviBar("pms.1");
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

            //վ�����
            str[str.length] = "    <button id=\"b1\" code=\"7\" icon=\"" + ICON + "start.gif\" label=\"����\" cmd=\"startSite()\" enable=\"'1'==getSiteState()\"/>";
            str[str.length] = "    <button id=\"b2\" code=\"6\" icon=\"" + ICON + "stop.gif\" label=\"ͣ��\" cmd=\"stopSite()\" enable=\"'0'==getSiteState()\"/>";
            str[str.length] = "    <button id=\"b3\" code=\"1\" icon=\"" + ICON + "view.gif\" label=\"�鿴\" cmd=\"editSiteInfo(false)\" enable=\"'_rootId'!=getSiteId()\"/>";
            str[str.length] = "    <button id=\"b4\" code=\"2\" icon=\"" + ICON + "edit.gif\" label=\"�༭\" cmd=\"editSiteInfo()\" enable=\"'_rootId'!=getSiteId()\"/>";
            str[str.length] = "    <button id=\"b5\" code=\"3\" icon=\"" + ICON + "del.gif\" label=\"ɾ��\" cmd=\"delSite()\" enable=\"'_rootId'!=getSiteId()\"/>";
            str[str.length] = "    <button id=\"b6\" code=\"p_4\" icon=\"" + ICON + "copy.gif\" label=\"����\" cmd=\"copySite()\" enable=\"'_rootId'!=getSiteId()\"/>";
            str[str.length] = "    <button id=\"b7\" code=\"1\" icon=\"" + ICON + "copy_to.gif\" label=\"���Ƶ�...\" cmd=\"copySiteTo()\" enable=\"'0'!=getSiteType() &amp;&amp; '_rootId'!=getSiteId()\"/>";
            str[str.length] = "    <button id=\"b8\" code=\"3\" icon=\"" + ICON + "move.gif\" label=\"�ƶ���...\" cmd=\"moveSiteTo()\" enable=\"'0'!=getSiteType() &amp;&amp; '_rootId'!=getSiteId()\"/>";
            str[str.length] = "    <button id=\"b9\" code=\"4\" icon=\"" + ICON + "new_site.gif\" label=\"�½��Ż�\" cmd=\"addNewSite('0')\" enable=\"'_rootId'==getSiteId()\"/>";
            str[str.length] = "    <button id=\"b10\" code=\"4\" icon=\"" + ICON + "new_page.gif\" label=\"�½�ҳ��\" cmd=\"addNewSite('1')\" enable=\"'0'==getSiteType()\"/>";
            str[str.length] = "    <button id=\"b11\" code=\"4\" icon=\"" + ICON + "new_section.gif\" label=\"�½�����\" cmd=\"addNewSite('2')\" enable=\"'3'!=getSiteType() &amp;&amp; '0'!=getSiteType() &amp;&amp; '_rootId'!=getSiteId()\"/>";
            str[str.length] = "    <button id=\"b12\" code=\"4\" icon=\"" + ICON + "new_portlet.gif\" label=\"�½�portletʵ��\" cmd=\"addNewSite('3')\" enable=\"'1'==getSiteType() || '2'==getSiteType()\"/>";
            str[str.length] = "    <button id=\"b14\" code=\"2\" icon=\"" + ICON + "preview.gif\" label=\"Ԥ��\" cmd=\"preview()\" enable=\"'_rootId'!=getSiteId(); \"/>";
            str[str.length] = "    <button id=\"b15\" code=\"2\" icon=\"" + ICON + "theme.gif\" label=\"�������\" cmd=\"themeManage()\" enable=\"'0'==getSiteType()\"/>";
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
            label:"�½��Ż�",
            callback:function(){addNewSite("0");},
            enable:function(){return true;},
            visible:function(){return "_rootId"==getSiteId() && true==getOperation("4");}
        }
        var item2 = {
            label:"�½�ҳ��",
            callback:function(){addNewSite("1");},
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("4");}
        }
        var item3 = {
            label:"�½�����",
            callback:function(){addNewSite("2");},
            enable:function(){return true;},
            visible:function(){return "3"!=getSiteType() && "0"!=getSiteType() && "_rootId"!=getSiteId() && true==getOperation("4");}
        }
        var item4 = {
            label:"�½�portletʵ��",
            callback:function(){addNewSite("3");},
            enable:function(){return true;},
            visible:function(){return ("1"==getSiteType() || "2"==getSiteType()) && true==getOperation("4");}
        }
        var item6 = {
            label:"����",
            callback:copySite,
            icon:ICON + "copy.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getSiteId() && true==getOperation("p_4");}
        }
        var item7 = {
            label:"ɾ��",
            callback:delSite,
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getSiteId() && true==getOperation("3");}
        }
        var item8 = {
            label:"�༭",
            callback:editSiteInfo,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getSiteId() && true==getOperation("2");}
        }
        var item9 = {
            label:"ͣ��",
            callback:stopSite,
            icon:ICON + "stop.gif",
            enable:function(){return true;},
            visible:function(){return "0"==getSiteState() && true==getOperation("6");}
        }
        var item10 = {
            label:"����",
            callback:startSite,
            icon:ICON + "start.gif",
            enable:function(){return true;},
            visible:function(){return "1"==getSiteState() && true==getOperation("7");}
        }
        var item11 = {
            label:"�ƶ���...",
            callback:moveSiteTo,
            icon:ICON + "move.gif",
            enable:function(){return true;},
            visible:function(){return "0"!=getSiteType() && "_rootId"!=getSiteId() && true==getOperation("3");}
        }
        var item12 = {
            label:"Ԥ��",
            callback:preview,
            icon:ICON + "preview.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getSiteId()  && true==getOperation("2");}
        }
        var item13 = {
            label:"�������",
            callback:themeManage,
            icon:ICON + "theme.gif",
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("2");}
        }
        var item14 = {
            label:"���Ƶ�...",
            callback:copySiteTo,
            icon:ICON + "copy_to.gif",
            enable:function(){return true;},
            visible:function(){return "0"!=getSiteType() && "_rootId"!=getSiteId() && true==getOperation("1");}
        }
         var item15 = {
            label:"�������",
            callback:cacheManage,
            icon:ICON + "cache.gif",
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("1");}
        }
        var item16 = {
            label:"�鿴",
            callback:function(){
                editSiteInfo(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getSiteId() && true==getOperation("1");}
        }
        var item17 = {
            label:"��Դ����",
            callback:function(){resourceManage();},
            icon:ICON + "resource.gif",
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("2");}
        }
        var item18 = {
            label:"�����Ż�",
            callback:startSite,
            icon:ICON + "start.gif",
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && "1"==getSiteState() && true==getOperation("6");}
        }
        var item19 = {
            label:"�Ż���̬����",
            callback:staticIssue,
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("2");}
        }
        var item20 = {
            label:"�Ż�����",
            callback:exportSite,
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("2");}
        }
        var item21 = {
            label:"�Ż�����",
            callback:importSite,
            enable:function(){return true;},
            visible:function(){return "_rootId"==getSiteId() && true==getOperation("4");}
        }
        var item22 = {
            label:"�鿴ҳ������",
            callback:showPageView,
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("1");}
        }
        var item23 = {
            label:"�����ɫ",
            callback:setPortalPermission,
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getSiteId() && true==getOperation("2");}
        }
		var item24 = {
            label:"Զ�̷���",
            callback:function(){
               remoteIssue("0");
            },
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("2");}
        }
		var item25 = {
            label:"Զ�̷���(��ȫ����)",
			callback:function(){
                remoteIssue("1");
            },
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("2");}
        }
	    var item26 = {
            label:"ҳ�澲̬����",
            callback:staticIssueOnePage,
            enable:function(){return true;},
            visible:function(){return "0"==getSiteType() && true==getOperation("2");}
        }

        var treeObj = $("tree");

        var menu1 = new Menu();
        menu1.addItem(item9);
        menu1.addItem(item10);
        menu1.addItem(item18);
        menu1.addSeparator();
        menu1.addItem(item23);
        menu1.addSeparator();
        menu1.addItem(item12);
        menu1.addItem(item16);
        menu1.addItem(item8);
        menu1.addItem(item7);
        menu1.addItem(item6);
        menu1.addItem(item14);
        menu1.addItem(item11);
        menu1.addSeparator();
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu1.addItem(item3);
        menu1.addItem(item4);
//      menu1.addItem(item5);
        menu1.addSeparator();
        menu1.addItem(item13);
        menu1.addItem(item15);
        menu1.addItem(item17);
        menu1.addSeparator();
        menu1.addItem(item19);
		menu1.addItem(item26);
		menu1.addItem(item24);
		menu1.addItem(item25);
//      menu1.addItem(item20);
//      menu1.addItem(item21);
        menu1.addItem(item22);

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
        if(null!=block && "_rootId"!=rowID){
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
            treeObj.onTreeNodeMoved = function(eventObj){
                onTreeNodeMoved(eventObj);
            }
            treeObj.onTreeNodeRightClick = function(eventObj){
                onTreeNodeRightClick(eventObj);
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
        var id = getSiteId();
        getTreeOperation(treeNode,function(_operation){
            var canAddNewSite = checkOperation("1",_operation);
            var canView = checkOperation("1",_operation);
            var canEdit = checkOperation("2",_operation);
            if("_rootId"!=id){
                if(true == canEdit){
                    editSiteInfo();
                }else if(true == canView){
                    editSiteInfo(false);                
                }
            }
        });
    }
    /*
     *	����˵�����϶����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeMoved(eventObj){
        sortSiteTo(eventObj);
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
     *	����˵�����༭�Ż���Ϣ
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editSiteInfo(editable){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var treeType = treeNode.getAttribute("type");

            var portalNode = treeNode;
            if("0"!=treeType){//��������Ż��ڵ㣬��ȡ���ڵ�
                portalNode = treeNode.getParent();
            }
            var portalName = portalNode.getAttribute("code");
            var portalID = portalNode.getAttribute("portalId");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadTreeDetailData(treeID,editable,treeID,treeType,portalID,portalName);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeName);
                inf.SID = CACHE_VIEW_TREE_NODE_DETAIL + treeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeName);
                inf.SID = CACHE_TREE_NODE_DETAIL + treeID;
            }
            inf.defaultPage = "page1";
            inf.phases = null;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�������ڵ�������ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentID             ���ڵ�id
                string:treeType             ���ڵ�����(�˵������ֵ�)
                string:portalID             �Ż�id
                string:portalName           �Ż���
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadTreeDetailData(treeID,editable,parentID,treeType,portalID,portalName,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_TREE_NODE_DETAIL + treeID;
        }else{
            var cacheID = CACHE_TREE_NODE_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_SITE_DETAIL;

            //���������
            if(true==isNew){
                p.setContent("isNew", 1);
                p.setContent("type", treeType);
                //������������Ż�
                if(treeType == "0"){
                    p.setContent("parentId", "0");
                }else{
                    p.setContent("parentId", parentID);
                    p.setContent("portalId", portalID);
                }
            }else{
                p.setContent("id", treeID);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var siteInfoNode = this.getNodeValue(XML_SITE_INFO);

                //�������ڵ�type���ԣ�Ԥ�ȴ���xform���ݵ�
                preProcessXml(siteInfoNode,treeType);

                var siteInfoNodeID = cacheID+"."+XML_SITE_INFO;

                Cache.XmlIslands.add(siteInfoNodeID,siteInfoNode);

                Cache.Variables.add(cacheID,[siteInfoNodeID]);

                initSitePages(cacheID,editable,portalID,portalName,isNew,parentID);
            }
            request.send();
        }else{
            initSitePages(cacheID,editable,portalID,portalName,isNew,parentID);
        }
    }
    /*
     *	����˵�����Ż����ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:portalID             �Ż�id
                string:portalName           �Ż���
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function initSitePages(cacheID,editable,portalID,portalName,isNew,parentID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadSiteInfoFormData(cacheID,editable);
            page1FormObj.portalID = portalID;
            page1FormObj.portalName = portalName;
        });

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page1BtNextObj = $("page1BtNext");
        page1BtPrevObj.style.display = "none";
        page1BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = function(){
            saveSite(cacheID,parentID,isNew);
        }
    }
    /*
     *	����˵�����Ż���Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadSiteInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_SITE_INFO);
        if(null!=xmlIsland){

            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵���������Ż�
     *	������	string:cacheID          ��������id
                string:parentID         ���ڵ�id
                boolean:isNew           �Ƿ�����
     *	����ֵ��
     */
    function saveSite(cacheID,parentID,isNew){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_SITE;

        //�Ƿ��ύ
        var flag = false;
        var siteCache = Cache.Variables.get(cacheID);
        if(null!=siteCache){       
            //�Ż�������Ϣ
            var siteInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_SITE_INFO);
            if(null!=siteInfoNode){
                var siteInfoDataNode = siteInfoNode.selectSingleNode(".//data");
                if(null!=siteInfoDataNode){
                    siteInfoDataNode = siteInfoDataNode.cloneNode(true);

                    var rowNode = siteInfoDataNode.selectSingleNode("row");

                    //�Ż���ҳ��ڵ���Ҫƴ��supplement����
                    var type = siteInfoNode.getAttribute("type");
                    if("0"==type || "1"==type){
                        //��css,js����ƴ�ϳ�һ��xml�ĵ�
                        var name = rowNode.getCDATA("name")||"";
                        var js = rowNode.getCDATA("js")||"";
                        var jsCode = rowNode.getCDATA("jsCode")||"";
                        var css = rowNode.getCDATA("css")||"";
                        var cssCode = rowNode.getCDATA("cssCode")||"";
                        var rootName = ("0"==type?"portal":"page");

                        var str = [];
                        //str[str.length] = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
                        str[str.length] = "<" + rootName + ">";
                        str[str.length] = "<property>";
                        str[str.length] = "<name>" + name + "</name>";
                        str[str.length] = "<description>";
                        str[str.length] = "<![CDATA[]]>";
                        str[str.length] = "</description>";
                        str[str.length] = "</property>";
                        str[str.length] = "<script>";
                        str[str.length] = "<file>";
                        str[str.length] = "<![CDATA[" + js + "]]>";
                        str[str.length] = "</file>";
                        str[str.length] = "<code>";
                        str[str.length] = "<![CDATA[" + jsCode + "]]>";
                        str[str.length] = "</code>";
                        str[str.length] = "</"+"script>";
                        str[str.length] = "<style>";
                        str[str.length] = "<file>";
                        str[str.length] = "<![CDATA[" + css + "]]>";
                        str[str.length] = "</file>";
                        str[str.length] = "<code>";
                        str[str.length] = "<![CDATA[" + cssCode + "]]>";
                        str[str.length] = "</code>";
                        str[str.length] = "</style>";
                        str[str.length] = "</" + rootName + ">";

                        rowNode.setCDATA("supplement",str.join(""));
                        rowNode.removeCDATA("js");
                        rowNode.removeCDATA("jsCode");
                        rowNode.removeCDATA("css");
                        rowNode.removeCDATA("cssCode");

                    }else{
                        rowNode.removeCDATA("supplement");
                        rowNode.removeCDATA("js");
                        rowNode.removeCDATA("jsCode");
                        rowNode.removeCDATA("css");
                        rowNode.removeCDATA("cssCode");
                    }

                    flag = true;

                    var prefix = siteInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(siteInfoDataNode,prefix);

                    p.setContent("code", _TEMP_CODE);

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
                    appendTreeNode(parentID,treeNode);

                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.onsuccess = function(){
                if(true!=isNew){
                    //�������
                    detachReminder(cacheID);

                    //�������ڵ�����
                    var id = cacheID.trim(CACHE_TREE_NODE_DETAIL);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
        }		
    }
    /*
     *	����˵�����½��Ż�
     *	������string:treeType   ���ڵ�����(�˵������ֵ�)
     *	����ֵ��
     */
    function addNewSite(treeType){
        var treeName;
        var treeID = new Date().valueOf();
        switch(treeType){
            case "0":
              treeName = "�Ż�";
              break;
            case "1":
              treeName = "ҳ��";
              break;
            case "2":
              treeName = "����";
              break;
            case "3":
              treeName = "portletʵ��";
              break;
        }

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var parentID = treeNode.getId();
            var portalName = treeNode.getAttribute("code");
            var portalID = treeNode.getAttribute("portalId");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadTreeDetailData(treeID,true,parentID,treeType,portalID,portalName,true);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_ADD.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_TREE_NODE_DETAIL + treeID;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵����ɾ���Ż��ڵ�
     *	������	
     *	����ֵ��
     */
    function delSite(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();

            var p = new HttpRequestParams();
            p.url = URL_DEL_SITE;

            p.setContent("id",treeID);
            p.setContent("deleted","1");

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
     *	����˵������ȡ�Ż��ڵ�״̬
     *	������	
     *	����ֵ��
     */
    function getSiteState(){
        var treeNodeState = null;
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            treeNodeState = treeNode.getAttribute("disabled");
        }
        return treeNodeState;   
    }
    /*
     *	����˵����ͣ���Ż��ڵ�
     *	������	
     *	����ֵ��
     */
    function stopSite(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var type = treeNode.getAttribute("type");

            var p = new HttpRequestParams();
            p.url = URL_STOP_SITE;
            p.setContent("id",id);
            p.setContent("disabled","1");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //���õ�ǰ�ڵ�״̬
                var xmlNode = new XmlNode(treeNode.node);
                refreshTreeNodeState(xmlNode,"1");

                //һ������
                var childs = xmlNode.selectNodes(".//treeNode");
                for(var i=0,iLen=childs.length;i<iLen;i++){
                    refreshTreeNodeState(childs[i],"1");
                }

                treeObj.reload();

                //ˢ�¹�����
                loadToolBarData(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵���������Ż��ڵ�
     *	������	
     *	����ֵ��
     */
    function startSite(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var type = treeNode.getAttribute("type");

            var p = new HttpRequestParams();
            p.url = URL_START_SITE;
            p.setContent("id",id);
            p.setContent("disabled","0");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //���õ�ǰ�ڵ�״̬
                var xmlNode = new XmlNode(treeNode.node);
                refreshTreeNodeState(xmlNode,"0");

                //���ݵ�ǰ�ڵ����ͣ�ȷ�������ݷ�ʽ
                if("0"==type){//�Ż�һ������
                    var childs = xmlNode.selectNodes(".//treeNode");
                    for(var i=0,iLen=childs.length;i<iLen;i++){
                        refreshTreeNodeState(childs[i],"0");
                    }
                }else{//�����ڵ�����
                    var parentNode = xmlNode.getParent();
                    while("_rootId"!=parentNode.getAttribute("id")){
                        refreshTreeNodeState(parentNode,"0");
                        parentNode = parentNode.getParent();
                    }
                }

                treeObj.reload();

                //ˢ�¹�����
                loadToolBarData(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵�����ƶ��Ż��ڵ�
     *	������	
     *	����ֵ��
     */
    function moveSiteTo(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var name = treeNode.getName();
            var portalId = treeNode.getAttribute("portalId");

            
            var action = "pms/portal!getActivePortalStructures4Tree.action";
            var params = {
                id:id,
                action:"moveTo"
            };

            var site = window.showModalDialog("sitetree.htm",{params:params,title:"��\""+name+"\"�ƶ���",action:action},"dialogWidth:300px;dialogHeight:400px;");
            if(null!=site){
                var p = new HttpRequestParams();
                p.url = URL_MOVE_SITE;
                p.setContent("targetId",site.id);
                p.setContent("id",id);
                p.setContent("portalId",site.portalId);

                var request = new HttpRequest(p);
                request.onsuccess = function(){
                    //�ƶ����ڵ�
                    var curNode = treeObj.getTreeNodeById(id);
                    var xmlNode = new XmlNode(curNode.node);
                    curNode.setAttribute("portalId",site.portalId);
                    var parentNode = treeObj.getTreeNodeById(site.id);
                    parentNode.node.appendChild(curNode.node);
                    parentNode.node.setAttribute("_open","true");

                    //���Ŀ��ڵ�ͣ��,��ǰ�ڵ�ҲҪͣ��
                    if("1"==parentNode.getAttribute("disabled")){

                        //���õ�ǰ�ڵ�״̬
                        refreshTreeNodeState(xmlNode,"1");

                        //����
                        var childs = xmlNode.selectNodes(".//treeNode");
                        for(var i=0,iLen=childs.length;i<iLen;i++){
                            refreshTreeNodeState(childs[i],"1");
                        }
                    }

                    clearOperation(xmlNode);

                    treeObj.reload();
                }
                request.send();
            }
        }
    }
    /*
     *	����˵����ͬһ���ڵ����ƶ��Ż��ڵ�
     *	������	
     *	����ֵ��
     */
    function sortSiteTo(eventObj){
        var treeObj = $("tree");
        var movedTreeNode = eventObj.movedTreeNode;
        var toTreeNode = eventObj.toTreeNode;
        var moveState = eventObj.moveState;

        var p = new HttpRequestParams();
        p.url = URL_SORT_SITE;
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
     *	����˵�����������ڵ�type���ԣ�Ԥ�ȴ���xform���ݵ�
     *	������	XmlNode:xmlIsland   XmlNode����ʵ��
                string:treeType     ���ڵ�type����
     *	����ֵ��
     */
    function preProcessXml(xmlIsland,treeType){
        //�ڸ��ڵ��ϼ�type���ԣ�����saveSiteʱ�ж�
        xmlIsland.setAttribute("type",treeType);

        //�����showType���ԣ����뵱ǰtreeType��ƥ��Ľڵ�
        var showTypeNodes = xmlIsland.selectNodes(".//*[@showType]");
        for(var i=0,iLen=showTypeNodes.length;i<iLen;i++){
            var curNode = showTypeNodes[i];
            var showType = curNode.getAttribute("showType").split(",");
            var flag = true;
            for(var j=0,jLen=showType.length;j<jLen;j++){
                if(treeType==showType[j]){
                    flag = false;
                    break;
                }
            }
            if(true==flag){
                curNode.removeNode();			
            }
        }

        //�������ð�ť�ɼ���
        var rowNode = xmlIsland.selectSingleNode(".//row");
        var definerName = rowNode.getCDATA("definerName")||"";
        var decoratorName = rowNode.getCDATA("decoratorName")||"";

        var page1BtConfigDefinerNode = xmlIsland.selectSingleNode(".//*[@id='page1BtConfigDefiner']");
        var page1BtConfigDecoratorNode = xmlIsland.selectSingleNode(".//*[@id='page1BtConfigDecorator']");

        var parameters = rowNode.getCDATA("parameters")||"";
        if(""!=parameters){
            var xmlReader = new XmlReader(parameters);
            var xmlNode = new XmlNode(xmlReader.documentElement);
            var portletParams = xmlNode.selectSingleNode("portlet/@*");
            var layoutParams = xmlNode.selectSingleNode("layout/@*");
            var decoratorParams = xmlNode.selectSingleNode("decorator/@*");

            if(null!=page1BtConfigDefinerNode){
                switch(treeType){
                    case "0":
                    case "1":
                    case "2":
                        if(null==layoutParams){
                            page1BtConfigDefinerNode.setAttribute("disabled","true");                
                        }
                        break;
                    case "3":
                        if(null==portletParams){
                            page1BtConfigDefinerNode.setAttribute("disabled","true");
                        }
                        break;
                }
            }
            if(null!=page1BtConfigDecoratorNode && (""==decoratorName || null==decoratorParams)){
                page1BtConfigDecoratorNode.setAttribute("disabled","true");
            }
        }else{
            if(null!=page1BtConfigDefinerNode){
                page1BtConfigDefinerNode.setAttribute("disabled","true"); 
            }
            if(null!=page1BtConfigDecoratorNode){
                page1BtConfigDecoratorNode.setAttribute("disabled","true");
            }
        
        }


        var definerNode = xmlIsland.selectSingleNode(".//column[@name='definerName']");
        var decoratorNode = xmlIsland.selectSingleNode(".//column[@name='decoratorName']");
        var rowNode = xmlIsland.selectSingleNode(".//data/row");

        //����treeType����definerNode,decoratorNode�ڵ����ò�ͬ����
        var layoutCmd = definerNode.getAttribute("cmd");
        definerNode.setAttribute("cmd",layoutCmd.replace(/\${definerType}/i,treeType));
        switch(treeType){
            case "0":
            case "1":
            case "2":
                definerNode.setAttribute("caption","����");
                decoratorNode.setAttribute("caption","����");
                break;
            case "3":
                definerNode.setAttribute("caption","Portlet");
                decoratorNode.setAttribute("caption","����");
                break;
        }

        //�Ż���ҳ�����ͽڵ���ҪԤ����supplement����
        switch(treeType){
            case "0":
            case "1":
                //Ԥ����supplement���ֱ����õ�js,css,jsCode��cssCode��
                var supplement = rowNode.getCDATA("supplement");
                if(null==supplement){
                    supplement = "";
                }

                var xmlReader = new XmlReader(supplement);

                if(null!=xmlReader.documentElement){
                    var supplementNode = new XmlNode(xmlReader.documentElement);
                    var jsNode = supplementNode.selectSingleNode("./script/file/node()");
                    var cssNode = supplementNode.selectSingleNode("./style/file/node()");
                    var jsCodeNode = supplementNode.selectSingleNode("./script/code/node()");
                    var cssCodeNode = supplementNode.selectSingleNode("./style/code/node()");

                    if(null!=jsNode){
                        var js = jsNode.nodeValue;
                        rowNode.setCDATA("js",js);
                    }
                    if(null!=cssNode){
                        var css = cssNode.nodeValue;
                        rowNode.setCDATA("css",css);
                    }
                    if(null!=jsCodeNode){
                        var jsCode = jsCodeNode.nodeValue;
                        rowNode.setCDATA("jsCode",jsCode);
                    }
                    if(null!=cssCodeNode){
                        var cssCode = cssCodeNode.nodeValue;
                        rowNode.setCDATA("cssCode",cssCode);
                    }
                }
                rowNode.removeCDATA("supplement");

                break;
            case "2":
            case "3":
                break;
        }

    }
    /*
     *	����˵���������Ż��ڵ�
     *	������	
     *	����ֵ��
     */
    function copySite(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();

            var p = new HttpRequestParams();
            p.url = URL_COPY_SITE;

            p.setContent("id",id);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var siteNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
                var parentNode = treeNode.getParent();

                treeObj.insertTreeNodeXml(siteNode.toXml(),parentNode);
                
            }
            request.send();
        }
    }
    /*
     *	����˵���������Ż��ڵ㵽
     *	������	
     *	����ֵ��
     */
    function copySiteTo(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var name = treeNode.getName();
            var portalId = treeNode.getAttribute("portalId");

            var action = "pms/portal!getActivePortalStructures4Tree.action";
            var params = {
                id:id,
                action:"copyTo"
            };

            var site = window.showModalDialog("sitetree.htm",{params:params,title:"��\""+name+"\"���Ƶ�",action:action},"dialogWidth:300px;dialogHeight:400px;");
            if(null!=site){

                var p = new HttpRequestParams();
                p.url = URL_COPY_SITE_TO;

                p.setContent("targetId",site.id);
                p.setContent("id",id);
                p.setContent("portalId",site.portalId);

                var request = new HttpRequest(p);
                request.onresult = function(){
                    var siteNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
                    var parentNode = treeObj.getTreeNodeById(site.id);
                    treeObj.insertTreeNodeXml(siteNode.toXml(),parentNode);
                }
                request.send();
            }
        }
    }
    /*
     *	����˵������ȡ�ڵ�����
     *	������	
     *	����ֵ��string:siteType       �ڵ�����
     */
    function getSiteType(){
        var siteType = null;    
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            siteType = treeNode.getAttribute("type");
        }
        return siteType;
    }
    /*
     *	����˵������ȡ�ڵ�id
     *	������	
     *	����ֵ��string:id       �ڵ�id
     */
    function getSiteId(){
        var id = null;    
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            id = treeNode.getId();
        }
        return id;
    }
    /*
     *	����˵����Ԥ��
     *	������	
     *	����ֵ��
     */
    function preview(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodePortalID = treeNode.getAttribute("portalId");
            var url	= URL_VIEW_SITE + "?portalId=" + treeNodePortalID;
            var siteType = treeNode.getAttribute("type");
            if("0"!=siteType){
                var treeNodeID = treeNode.getId();
                url += "&id=" + treeNodeID;
            }
            window.open(url);
        }
    }
    /*
     *	����˵������ȡ����
     *	������	string:cachePolicyId      xform����
                string:cachePolicyName    xform����
     *	����ֵ��
     */
    function getCachePolicy(cachePolicyId,cachePolicyName){
        var page1FormObj = $("page1Form");
        page1FormObj.updateDataExternal(cachePolicyId,"12");
        page1FormObj.updateDataExternal(cachePolicyName,"���Ի������");    
    }
    /*
     *	����˵��������definerType����Ҫִ�еķ���
     *	������	string:definerType       �ڵ�����
                string:definerId         xform����
                string:definerName       xform����
                string:parametersName    xform����
     *	����ֵ��
     */
    function getDefiner(definerType,definerId,definerName,parametersName){
        switch(definerType){
            case "0":
            case "1":
            case "2":
                getLayout(definerId,definerName,parametersName);
                break;
            case "3":
                getPortlet(definerId,definerName,parametersName);
                break;
        }
    }
    /*
     *	����˵������ȡ������
     *	������	string:definerId         xform����
                string:definerName       xform����
                string:parametersName    xform����
     *	����ֵ��
     */
    function getLayout(definerId,definerName,parametersName){
        var page1FormObj = $("page1Form");

        var layout = window.showModalDialog("layouttree.htm",{title:"��ѡ�񲼾���"},"dialogWidth:300px;dialogHeight:400px;");
        if(null!=layout){
            page1FormObj.updateDataExternal(definerId,layout.id);
            page1FormObj.updateDataExternal(definerName,layout.name);

            //���ز�����������
            loadLayoutParameters(layout.id,parametersName);
        }
    }
    /*
     *	����˵������ȡ������
     *	������	string:decoratorId      xform����
                string:decoratorName    xform����
                string:parametersName    xform����
     *	����ֵ��
     */
    function getDecorator(decoratorId,decoratorName,parametersName){
        var page1FormObj = $("page1Form");

        var decorator = window.showModalDialog("decoratortree.htm",{title:"��ѡ��������"},"dialogWidth:300px;dialogHeight:400px;");
        if(null!=decorator){
            page1FormObj.updateDataExternal(decoratorId,decorator.id);
            page1FormObj.updateDataExternal(decoratorName,decorator.name);

            //����������������
            loadDecoratorParameters(decorator.id,parametersName);
        } 
    }
    /*
     *	����˵������ȡportlet
     *	������	string:definerId         xform����
                string:definerName       xform����
                string:parametersName    xform����
     *	����ֵ��
     */
    function getPortlet(definerId,definerName,parametersName){
        var page1FormObj = $("page1Form");

        var portlet = window.showModalDialog("portlettree.htm",{title:"��ѡ��Portlet"},"dialogWidth:300px;dialogHeight:400px;");
        if(null!=portlet){
            page1FormObj.updateDataExternal(definerId,portlet.id);
            page1FormObj.updateDataExternal(definerName,portlet.name);

            //����portlet������
            loadPortletParameters(portlet.id,parametersName);
        }
    }
    /*
     *	����˵������ȡjs
     *	������	string:name      xform����
     *	����ֵ��
     */
    function getJs(name){
        var page1FormObj = $("page1Form");
        var id = page1FormObj.portalID;
        var code = page1FormObj.code;
        
        var newFiles = window.showModalDialog("remotefiles.htm",{id:id,code:code,tempCode:_TEMP_CODE,type:"js",title:"��ѡ������ϴ��µ�js�ļ�"},"dialogWidth:400px;dialogHeight:400px;");
        if(null!=newFiles){
            page1FormObj.updateDataExternal(name,newFiles);
        }
    }
    /*
     *	����˵������ȡcss
     *	������	string:name      xform����
     *	����ֵ��
     */
    function getCss(name){
        var page1FormObj = $("page1Form");
        var id = page1FormObj.portalID;
        var code = page1FormObj.code;
        
        var newFiles = window.showModalDialog("remotefiles.htm",{id:id,code:code,tempCode:_TEMP_CODE,type:"css",title:"��ѡ������ϴ��µ�css�ļ�"},"dialogWidth:400px;dialogHeight:400px;");
        if(null!=newFiles){
            page1FormObj.updateDataExternal(name,newFiles);
        }
    }
    /*
     *	����˵������������������
     *	������	string:layoutID         ������id
                string:parametersName   xform����
     *	����ֵ��
     */
    function loadLayoutParameters(layoutID,parametersName){
        var page1FormObj = $("page1Form");
        var parameters = page1FormObj.getData(parametersName);

        var p = new HttpRequestParams();
        p.url = URL_GET_LAYOUT_PARAMETERS;
        p.setContent("layoutId",layoutID);

        var request = new HttpRequest(p);
        request.onresult = function(){
            var layoutParametersNode = this.getNodeValue(XML_LAYOUT_PARAMETERS_INFO);

            updateParameters(parametersName,layoutParametersNode);
            
            //�����������
            var page1BtConfigDefinerObj = $("page1BtConfigDefiner");
            page1BtConfigDefinerObj.disabled = 0==layoutParametersNode.attributes.length;
        }
        request.send();
    }
    /*
     *	����˵������������������
     *	������	string:decoratorID      ������id
                string:parametersName   xform����
     *	����ֵ��
     */
    function loadDecoratorParameters(decoratorID,parametersName){
        var page1FormObj = $("page1Form");
        var parameters = page1FormObj.getData(parametersName);

        var p = new HttpRequestParams();
        p.url = URL_GET_DECORATOR_PARAMETERS;
        p.setContent("decoratorId",decoratorID);

        var request = new HttpRequest(p);
        request.onresult = function(){
            var decoratorParametersNode = this.getNodeValue(XML_DECORATOR_PARAMETERS_INFO);

            updateParameters(parametersName,decoratorParametersNode);
            
            //�����������
            var page1BtConfigDecoratorObj = $("page1BtConfigDecorator");
            page1BtConfigDecoratorObj.disabled = 0==decoratorParametersNode.attributes.length;
        }
        request.send();
    }
    /*
     *	����˵����portlet��������
     *	������	string:portletID      ������id
                string:parametersName   xform����
     *	����ֵ��
     */
    function loadPortletParameters(portletID,parametersName){
        var page1FormObj = $("page1Form");
        var parameters = page1FormObj.getData(parametersName);

        var p = new HttpRequestParams();
        p.url = URL_GET_PORTLET_PARAMETERS;
        p.setContent("id", portletID);

        var request = new HttpRequest(p);
        request.onresult = function(){
            var portletParametersNode = this.getNodeValue(XML_PORTLET_PARAMETERS_INFO);

            updateParameters(parametersName,portletParametersNode);
            
            //�����������
            var page1BtConfigDefinerObj = $("page1BtConfigDefiner");
            page1BtConfigDefinerObj.disabled = 0==portletParametersNode.attributes.length;
        }
        request.send();
    }
    /*
     *	����˵������parameters�ַ�������Ϊxml����
     *	������	string:parameters       xml�ַ���
     *	����ֵ��XmlNode:xmlNode         XmlNodeʵ��
     */
    function parseParameters(parameters){
        //��parameters�ַ�������Ϊxml����
        var xmlReader = new XmlReader();
        xmlReader.loadXML(parameters);
        if(null==xmlReader.documentElement){
            xmlReader.loadXML("<params/>");
        }
        var xmlNode = new XmlNode(xmlReader.documentElement);
        return xmlNode;    
    }
    /*
     *	����˵�������²������������������ò����ڵ�
     *	������	string:parametersName   xform����
                XmlNode:newNode         XmlNodeʵ��
     *	����ֵ��
     */
    function updateParameters(parametersName,newNode){
        var page1FormObj = $("page1Form");
        var parameters = page1FormObj.getData(parametersName)||"";

        var xmlNode = parseParameters(parameters);
        var type = newNode.nodeName;
        var oldNode = xmlNode.selectSingleNode("./"+type);
        if(null!=oldNode){
            var attributes = oldNode.attributes;
            for(var i=0,iLen=attributes.length;i<iLen;i++){
               oldNode.removeAttribute(attributes[0].nodeName);
            }

            var attributes = newNode.attributes;
            for(var i=0,iLen=attributes.length;i<iLen;i++){
               oldNode.setAttribute(attributes[i].nodeName,attributes[i].nodeValue);
            }

            if(null!=oldNode.firstChild){
                var oldText = new XmlNode(oldNode.firstChild);
                oldText.removeNode();
            }
            if(null!=newNode.firstChild){
                var newText = new XmlNode(newNode.firstChild);
                oldNode.appendChild(newText);
            }
        }else{
            xmlNode.appendChild(newNode);
        }

        //����xform�е�parametersֵ
        page1FormObj.updateDataExternal(parametersName,xmlNode.toXml());
    }
    /*
     *	����˵�������Ĳ���������������portlet������
     *	������	string:paramsType       ����(����������������portlet)
                string:id               xform����
                string:name             xform����
                string:parametersName   xform����
     *	����ֵ��
     */
    function configParams(paramsType,id,name,parametersName){
        var page1FormObj = $("page1Form");
        var nameValue = page1FormObj.getData(name)||"";
        var idValue = page1FormObj.getData(id)||"";
        var parameters = page1FormObj.getData(parametersName)||"";

        var xmlNode = parseParameters(parameters);
        var oldParamsNode = xmlNode.selectSingleNode("./"+paramsType);
        var oldText = new XmlNode(oldParamsNode.firstChild);
        if(""!=nameValue && ""!=idValue){
            var newParams = window.showModalDialog("configparams.htm",{id:idValue,params:oldParamsNode,type:paramsType,title:"����\""+nameValue+"\"������"},"dialogWidth:250px;dialogHeight:250px;");
            if(null!=newParams){
                var rowReader = new XmlReader(newParams);
                var rowNode = new XmlNode(rowReader.documentElement);

                var newParamsReader = new XmlReader("<"+paramsType+"/>");
                var newParamsNode = new XmlNode(newParamsReader.documentElement);
                var newText = oldText.cloneNode(true);

                //��row�ڵ㸴�Ƶ��²����ڵ�
                var childs = rowNode.selectNodes("*");
                for(var i=0,iLen=childs.length;i<iLen;i++){
                    var name = childs[i].nodeName;
                    var value = childs[i].text;
                    newParamsNode.setAttribute(name,value);
                }
                newParamsNode.appendChild(newText);
                updateParameters(parametersName,newParamsNode);
            }
        }
    }
    /*
     *	����˵����ˢ�����ڵ�ͣ������״̬
     *	������	XmlNode:xmlNode         XmlNodeʵ��
                string:state            ͣ/����״̬
     *	����ֵ��
     */
    function refreshTreeNodeState(xmlNode,state){
        var type = xmlNode.getAttribute("type");
        var img = {
            "0":"portal",
            "1":"page",
            "2":"section",
            "3":"portlet_instance"
        }
        xmlNode.setAttribute("disabled",state);
        xmlNode.setAttribute("icon",ICON + img[type]+(state=="1"?"_2":"") + ".gif");       
    }
    /*
     *	����˵�����������
     *	������	
     *	����ֵ��
     */
    function themeManage(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var portalId = treeNode.getAttribute("portalId");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadThemeManageData(treeID, portalId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page2";
            inf.label = OPERATION_SETTING.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_THEME_MANAGE + treeID;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�������������ϸ��Ϣ��������
     *	������	string:treeID       ���ڵ�id
                string:portalId     portalId
     *	����ֵ��
     */
    function loadThemeManageData(treeID, portalId){
        var cacheID = CACHE_THEME_MANAGE + treeID;
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_THEME_MANAGE;
            p.setContent("id", treeID);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var themeManageNode = this.getNodeValue(XML_THEME_MANAGE);
                var themeManageNodeID = cacheID+"."+XML_THEME_MANAGE;

                Cache.XmlIslands.add(themeManageNodeID,themeManageNode);
                Cache.Variables.add(cacheID,[themeManageNodeID]);

                initThemeManagePages(cacheID,treeID, portalId);
            }
            request.send();
        }else{
            initThemeManagePages(cacheID,treeID, portalId);
        }
    }
    /*
     *	����˵��������������ҳ��������
     *	������	string:cacheID          ��������id
                string:treeID           ���ڵ�id
     *	����ֵ��
     */
    function initThemeManagePages(cacheID,treeID, portalId){
        var page2TreeObj = $("page2Tree");
        Public.initHTC(page2TreeObj,"isLoaded","oncomponentready",function(){
            loadThemeManageTreeData(cacheID, portalId);
            initThemeManageTreeMenu(treeID, portalId);
        });

        //��������
        var page2BtSearchObj = $("page2BtSearch");
        var page2KeywordObj = $("page2Keyword");
        attachSearchTree(page2TreeObj,page2BtSearchObj,page2KeywordObj);

        //���÷�ҳ��ť��ʾ״̬
        var page2BtPrevObj = $("page2BtPrev");
        var page2BtNextObj = $("page2BtNext");
        page2BtPrevObj.style.display = "none";
        page2BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page2BtSaveObj = $("page2BtSave");
        page2BtSaveObj.style.display = "none";
    }
    /*
     *	����˵�����������tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadThemeManageTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_THEME_MANAGE);
        if(null!=xmlIsland){
            var page2TreeObj = $("page2Tree");
            page2TreeObj.load(xmlIsland.node);
            page2TreeObj.research = true;

            page2TreeObj.onTreeNodeRightClick = function(eventObj){
                onPage2TreeNodeRightClick(eventObj);
            }
        }
    }
    /*
     *	����˵�����������tree��������
     *	������	string:siteID           �Ż��ڵ�id
     *	����ֵ��
     */
    function initThemeManageTreeMenu(siteID, portalId){
        var item1 = {
            label:"����",
            callback:function(){
                changeThemeName();
            },
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getThemeTreeId();}
        }
        var item2 = {
            label:"ɾ��",
            callback:function(){
                delTheme(portalId);
            },
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getThemeTreeId();}
        }
        var item3 = {
            label:"����",
            callback:function(){
                copyTheme(portalId);
            },
            icon:ICON + "copy.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getThemeTreeId();}
        }
        var item4 = {
            label:"Ԥ��",
            callback:function(){
                previewTheme(portalId);
            },
            icon:ICON + "preview.gif",
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getThemeTreeId();}
        }
        var item5 = {
            label:"��ΪĬ��",
            callback:function(){
                setDefaultTheme(portalId);
            },
            enable:function(){return true;},
            visible:function(){return "_rootId"!=getThemeTreeId() && "1"!=getThemeAttribute("isDefault");}
        }

        var menu1 = new Menu();
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu1.addItem(item3);
        menu1.addSeparator();
        menu1.addItem(item4);
        menu1.addItem(item5);

        var page2TreeObj = $("page2Tree");
        page2TreeObj.contextmenu = menu1;
    }
    /*
     *	����˵�����һ����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onPage2TreeNodeRightClick(eventObj){
        var page2TreeObj = $("page2Tree");
        if(null!=page2TreeObj.contextmenu){
            page2TreeObj.contextmenu.show(eventObj.clientX,eventObj.clientY);
        }
    }
    /*
     *	����˵������ȡ�������ڵ�id
     *	������	
     *	����ֵ��
     */
    function getThemeTreeId(){
        var id = null;
        var page2TreeObj = $("page2Tree");
        var treeNode = page2TreeObj.getActiveTreeNode();
        if(null!=treeNode){
            id = treeNode.getId();
        }
        return id;
    }
    /*
     *	����˵�����޸�������
     *	������	string:siteID           �Ż��ڵ�id
     *	����ֵ��
     */
    function changeThemeName(){
        var page2TreeObj = $("page2Tree");
        var treeNode = page2TreeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var newName = prompt("��������������",treeName,"��������\""+treeName+"\"Ϊ",null,50);
            newName = newName.replace(/[\s��]/g,"");
            while(""==newName){
                alert("����������һ���ַ������Ҳ���ʹ�ÿո�(����ȫ�ǿո�");
                newName = prompt("��������������",treeName,"��������\""+treeName+"\"Ϊ",null,50);
                newName = newName.replace(/[\s��]/g,"");            
            }

            if(null!=newName && treeName!=newName){
                var p = new HttpRequestParams();
                p.url = URL_RENAME_THEME;
                p.setContent("themeId",treeID);
                p.setContent("name", newName);

                var request = new HttpRequest(p);
                request.onsuccess = function(){
                    treeNode.setAttribute("name",newName);
                    page2TreeObj.reload();
                }
                request.send();
            }
        }
    }
    /*
     *	����˵����ɾ������
     *	������	string:portalId           portalId
     *	����ֵ��
     */
    function delTheme(portalId){
        var page2TreeObj = $("page2Tree");
        var treeNode = page2TreeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var p = new HttpRequestParams();
            p.url = URL_DEL_THEME;
            p.setContent("portalId",portalId);
            p.setContent("themeId",treeID);

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                page2TreeObj.removeTreeNode(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵������������
     *	������	string:portalId           portalId
     *	����ֵ��
     */
    function copyTheme(portalId){
        var page2TreeObj = $("page2Tree");
        var treeNode = page2TreeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var p = new HttpRequestParams();
            p.url = URL_COPY_THEME;
            p.setContent("portalId",portalId);
            p.setContent("themeId",treeID);
            p.setContent("name","����_" + treeName);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var themeNode = this.getNodeValue(XML_THEME_MANAGE).selectSingleNode("treeNode");
                var rootNode = page2TreeObj.getTreeNodeById("_rootId");

                page2TreeObj.insertTreeNodeXml(themeNode.toXml(),rootNode);
            }
            request.send();
        }
    }
    /*
     *	����˵����Ԥ������
     *	������	string:portalId           portalId
     *	����ֵ��
     */
    function previewTheme(portalId){
        var page2TreeObj = $("page2Tree");
        var treeNode = page2TreeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var url = URL_PREVIEW_THEME + "?themeId=" + treeID + "&portalId=" + portalId;

            window.open(url,"previewTheme","");
        }
    }
    /*
     *	����˵��������Ĭ������
     *	������	string:portalId           portalId
     *	����ֵ��
     */
    function setDefaultTheme(portalId){
        var page2TreeObj = $("page2Tree");
        var treeNode = page2TreeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var p = new HttpRequestParams();
            p.url = URL_SET_DEFAULT_THEME;
            p.setContent("portalId",portalId);
            p.setContent("themeId",treeID);

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //�����ǰ��Ĭ����������
                var rootNode = page2TreeObj.getTreeNodeById("_rootId");
                var defaultThemeNode = new XmlNode(rootNode.node).selectSingleNode(".//treeNode[@isDefault='1']");
                if(null!=defaultThemeNode){
                    var name = defaultThemeNode.getAttribute("name");
                    defaultThemeNode.setAttribute("icon",ICON + "theme.gif");
                    defaultThemeNode.setAttribute("isDefault","0");
                }

                //�޸ĵ�ǰ�ڵ����Ƽ�����
                treeNode.setAttribute("icon",ICON + "default_theme.gif");
                treeNode.setAttribute("isDefault","1");

                page2TreeObj.reload();                
            }
            request.send();
        }
    }
    /*
     *	����˵������ȡ��������
     *	������	string:attrName           ����������
     *	����ֵ��
     */
    function getThemeAttribute(attrName){
        var value = null;
        var page2TreeObj = $("page2Tree");
        var treeNode = page2TreeObj.getActiveTreeNode();
        if(null!=treeNode){
            value = treeNode.getAttribute(attrName);
        }
        return value;
    }
    /*
     *	����˵����ˢ�»���
     *	������	string:id               ������id
                string:portalId         portalId
     *	����ֵ��
     */
    function flushCache(id,portalId){
        var p = new HttpRequestParams();
        p.url = URL_FLUSH_CACHE;
        p.setContent("portalId",portalId);
        p.setContent("themeId",id);

        var request = new HttpRequest(p);
        request.onsuccess = function(){
        }
        request.send();
    }
    /*
     *	����˵�����������
     *	������	
     *	����ֵ��
     */
    function cacheManage(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var portalId = treeNode.getAttribute("portalId");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadCacheManageData(treeID, portalId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page3";
            inf.label = OPERATION_SETTING.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_CACHE_MANAGE + treeID;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�������������ϸ��Ϣ��������
     *	������	string:treeID       ���ڵ�id
                string:portalId     portalId
     *	����ֵ��
     */
    function loadCacheManageData(treeID, portalId){
        var cacheID = CACHE_CACHE_MANAGE + treeID;
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_CACHE_MANAGE;
            p.setContent("portalId", portalId);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var cacheManageNode = this.getNodeValue(XML_CACHE_MANAGE);
                var cacheManageNodeID = cacheID+"."+XML_CACHE_MANAGE;

                Cache.XmlIslands.add(cacheManageNodeID,cacheManageNode);
                Cache.Variables.add(cacheID,[cacheManageNodeID]);

                initCacheManagePages(cacheID,treeID, portalId);
            }
            request.send();
        }else{
            initCacheManagePages(cacheID,treeID, portalId);
        }
    }
    /*
     *	����˵��������������ҳ��������
     *	������	string:cacheID          ��������id
                string:treeID           ���ڵ�id
                string:portalId         portalId
     *	����ֵ��
     */
    function initCacheManagePages(cacheID,treeID, portalId){
        var page3CacheListObj = $("page3CacheList");
        createCacheList(page3CacheListObj,cacheID,treeID, portalId);

        //���÷�ҳ��ť��ʾ״̬
        var page3BtPrevObj = $("page3BtPrev");
        var page3BtNextObj = $("page3BtNext");
        page3BtPrevObj.style.display = "none";
        page3BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page3BtSaveObj = $("page3BtSave");
        page3BtSaveObj.style.display = "none";
    }
    /*
     *	����˵����������������б�
     *	������	Element:listObj         �б����
                string:cacheID          ��������id
                string:treeID           ���ڵ�id
                string:portalId         portalId
     *	����ֵ��
     */
    function createCacheList(listObj,cacheID,treeID, portalId){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_CACHE_MANAGE);
        if(null!=xmlIsland){
            var str = [];
            str[str.length] = "<table border=\"0\" cellspacing=\"\" cellpadding=\"3\">";
            str[str.length] = "<tr class=\"th\"><td width=\"200\">������</td><td>&nbsp;</td></tr>";

            var cacheItems = xmlIsland.selectNodes("cacheItem");
            for(var i=0,iLen=cacheItems.length;i<iLen;i++){
                var cacheItem = cacheItems[i];
                var name = cacheItem.getAttribute("name");
                var id = cacheItem.getAttribute("id");
                str[str.length] = "<tr><td class=\"t\">" + name + "</td><td class=\"t\"><input type=\"button\" class=\"btWeak\" value=\"ˢ��\" onclick=\"flushCache('" + id + "','" + portalId + "')\"/></td></tr>";
            }
            str[str.length] = "</table>";

            listObj.innerHTML = str.join("\r\n");
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
     *	����˵������Դ����
     *	������	
     *	����ֵ��
     */
    function resourceManage(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getAttribute("portalId");
            var name = treeNode.getName();
            var code = treeNode.getAttribute("code");

            var params = {
                type:"site",
                code:code,
                id:id
            };
        
            window.showModalDialog("resource.htm",{params:params,title:"\""+name+"\"�����Դ����"},"dialogWidth:400px;dialogHeight:400px;");
        }
    }

    /*
     *	����˵���������Ż�
     *	������	
     *	����ֵ��
     */
    function importSite(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeName = "�Ż�����";
            var treeID = treeNode.getAttribute("id");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadUploadDetailData(treeID);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_IMPORT.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_UPLOAD_DETAIL + treeID;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����ϴ�portlet��ϸ��Ϣ��������
     *	������	string:treeID     ���ڵ�id/����
     *	����ֵ��
     */
    function loadUploadDetailData(treeID){
        var cacheID = CACHE_UPLOAD_DETAIL + treeID;
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_UPLOAD_DETAIL;
            var request = new HttpRequest(p);
            request.onresult = function(){
                var siteInfoNode = this.getNodeValue(XML_SITE_INFO);
                var siteInfoNodeID = cacheID+"."+XML_SITE_INFO;

                Cache.XmlIslands.add(siteInfoNodeID,siteInfoNode);
                Cache.Variables.add(cacheID,[siteInfoNodeID]);

                initUploadPages(cacheID);
            }
            request.send();
        }else{
            initUploadPages(cacheID);
        }
    }
    /*var page1FormObj = $("page1Form");
     *	����˵����portlet���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initUploadPages(cacheID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadImportInfoFormData(cacheID);
        });

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page1BtNextObj = $("page1BtNext");
        page1BtPrevObj.style.display = "none";
        page1BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = false;
        page1BtSaveObj.onclick = function(){
            saveUpload(cacheID);
        }
    }

    /*
     *	����˵����Portlet����xform��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadImportInfoFormData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_SITE_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = "true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵���������ϴ�
     *	������ 
     *	����ֵ��
     */
    function saveUpload(){
        var page1FormObj = $("page1Form");
        var fileName = page1FormObj.getData("file");
        if (fileName==null || fileName==""){
            page1FormObj.showCustomErrorInfo("file","��ѡ�����ļ�");
        }else {
            var page1BtSaveObj = $("page1BtSave");
            page1BtSaveObj.disabled = true;
            
            page1FormObj.upload(URL_IMPORT_SITE,null,function(response){
                if("Success" == response.type){
                    alert(response.msg,response.description);

                    var ws = $("ws");
                    ws.closeActiveTab();
                }else if("Error" == response.type){
                    alert(response.msg,response.description);

                    page1BtSaveObj.disabled = false;
                }
            });

        }
    }

    /*
     *	����˵���������Ż�
     *	������	string:portalId         portalId
     *	����ֵ��
     */
    function exportSite(){
        var frameName = createExportFrame();
        var frameObj = window.frames[frameName];
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        var treeID = treeNode.getAttribute("portalId");
        frameObj.location.href = URL_EXPORT_SITE + "?portalId=" + treeID;
    }
    
    /*
     *	����˵��������������iframe
     *	������  
     *	����ֵ��
     */
    function createExportFrame(){
        var frameName = "exportFrame";
        var frameObj = $(frameName);
        if(null==frameObj){
            frameObj = document.createElement("<iframe name='"+frameName+"' id='"+frameName+"' src='about:blank' style='display:;width:100px;height:100px'></iframe>");
            document.body.appendChild(frameObj);
        }
        return frameName;
    }
    /*
     *	����˵�����鿴ҳ������
     *	������	
     *	����ֵ��
     */
    function showPageView(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var portalId = treeNode.getAttribute("portalId");
            var name = treeNode.getName();
            var code = treeNode.getAttribute("code");

            var params = {
                type:"site",
                code:code,
                portalId:portalId
            };
        
            window.showModalDialog("pageview.htm",{params:params,title:"�鿴\""+name+"\"ҳ������"},"dialogWidth:400px;dialogHeight:400px;resizable:yes");
        }
    }
    /*
     *	����˵���������ɫ
     *	������	
     *	����ֵ��
     */
    function setPortalPermission(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var name = treeNode.getName();
            var resourceType = "1";
            var type = "portal";
            var title = "����\"" + name + "\"��ɫ";
            var params = {
                roleId:id,
                resourceType:resourceType,
				applicationId:"pms",
                isRole2Resource:"0"
            };
            window.showModalDialog("setpermission.htm",{params:params,title:title,type:type},"dialogWidth:700px;dialogHeight:500px;resizable:yes");
        }
    }

	/********************************************************************************************************************
     ************************************************** ����Ϊ��̬������� *********************************************	
     ********************************************************************************************************************/
	URL_SYNC_PROGRESS = "data/progress.xml";
    URL_CANCEL_SYNC_PROGRESS = "data/_success.xml";
	URL_STATIC_ISSUE_PORATL = "data/_success.xml";
	URL_STATIC_ISSUE_PAGE = "data/_success.xml";
	URL_REMOTE_ISSUE = "data/_success.xml";

    URL_SYNC_PROGRESS = "publish!getProgress.action";
    URL_CANCEL_SYNC_PROGRESS = "publish!doConceal.action";
	URL_STATIC_ISSUE_PORATL = "pms/publish!staticIssuePortal.action";
	URL_STATIC_ISSUE_PAGE = "pms/publish!staticIssuePortalPage.action";
	URL_REMOTE_ISSUE = "publish!ftpUpload2RemoteServer.action";

    /*
     *	����˵������̬���������Ż�վ��
     *	������	string:id               ������id
                string:portalId         portalId
     *	����ֵ��
     */
    function staticIssue(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        var p = new HttpRequestParams();
        p.url = URL_STATIC_ISSUE_PORATL;
        var portalId = treeNode.getAttribute("portalId");
        p.setContent("id", portalId);
		p.setContent("type", 1);

        var request = new HttpRequest(p);

		request.onsuccess = function(){
		}

		request.onresult = function(){
			var thisObj = this;
			var data = this.getNodeValue("ProgressInfo");
			var progress = new Progress(URL_SYNC_PROGRESS,data,URL_CANCEL_SYNC_PROGRESS);
			progress.oncomplete = function(){
				// ����Զ���ϴ�
				// remoteIssue("0");
			}
			progress.start();
		}
        request.send();
    }

	/*
     *	����˵������̬�����Ż���ָ��ҳ��
     *	������	string:id               ������id
                string:portalId         portalId
     *	����ֵ��
     */
    function staticIssueOnePage(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        var p = new HttpRequestParams();
        p.url = URL_STATIC_ISSUE_PAGE;
        var pageUrl = prompt("������Ҫ������ҳ���ַ");
		if(pageUrl == null || "" == pageUrl){
			return alert("ҳ���ַ����Ϊ��");
		}
        p.setContent("pageUrl", pageUrl);

        var request = new HttpRequest(p);
		request.onresult = function(){
			var thisObj = this;
			var data = this.getNodeValue("ProgressInfo");
			var progress = new Progress(URL_SYNC_PROGRESS,data,URL_CANCEL_SYNC_PROGRESS);
			progress.oncomplete = function(){
				// ����Զ���ϴ�
				// remoteIssue("0");
			}
			progress.start();
		}
        request.send();
    }
   
	/*
     *	����˵����Զ�̷���
     *	������	string:id               ������id
                string:portalId         portalId
     *	����ֵ��
     */
	function remoteIssue(override){
        var p = new HttpRequestParams();
        p.url = URL_REMOTE_ISSUE;
		p.setContent("override", override);

        var request = new HttpRequest(p);

		request.onsuccess = function(){
		}
        request.send();
    }

    window.onload = init;

    //�ر�ҳ���Զ�ע��
    logoutOnClose();