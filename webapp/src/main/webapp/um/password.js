    /*
     *	��̨��Ӧ���ݽڵ�����
     */
    XML_DEFAULT_TOOLBAR = "DefaultToolBar";
    XML_TOOLBAR = "ToolBar";
    XML_MAIN_TREE = "RuleTree";
    XML_PASSWORD_INFO = "PasswordInfo";
    XML_OPERATION = "Operation";

    /*
     *	Ĭ��Ψһ�����ǰ׺
     */
    CACHE_GRID_ROW_DETAIL = "row__id";
    CACHE_TREE_NODE_DETAIL = "treeNode__id";
    CACHE_TREE_NODE_GRID = "treeNodeGrid__id";
    CACHE_PASSWORD_PERMISSION = "rulePermission__id";
    CACHE_MAIN_TREE = "tree__id";
    CACHE_TOOLBAR = "toolbar__id";
    CACHE_PASSWORD_DETAIL = "rule__id";
    CACHE_VIEW_PASSWORD_DETAIL = "viewRule__id";
    CACHE_PASSWORD_TO_USER_GRID = "rule2User__id";
    CACHE_SEARCH_PERMISSION = "searchPermission__id";
    /*
     *	����
     */
    OPERATION_ADD = "����\"$label\"";
    OPERATION_VIEW = "�鿴\"$label\"";
    OPERATION_DEL = "ɾ��\"$label\"";
    OPERATION_EDIT = "�༭\"$label\"";
    /*
     *	XMLHTTP�����ַ����
     */
    URL_INIT = "data/password_init.xml";
    URL_PASSWORD_DETAIL = "data/password.xml";
    URL_SAVE_PERMISSION = "data/_success.xml";
    URL_SAVE_PASSWORD = "data/_success.xml";
    URL_STOP_PASSWORD = "data/_success.xml";
    URL_START_PASSWORD = "data/_success.xml";
    URL_DEL_PASSWORD = "data/_success.xml";
    URL_GROUP_TO_USER_LIST = "data/rule2userlist.xml";
    URL_GET_OPERATION = "data/operation.xml";

    URL_INIT = "ums/passwordrule!getAllRules.action";
    URL_PASSWORD_DETAIL = "ums/passwordrule!getRuleInfo.action";
    URL_SAVE_PASSWORD = "ums/passwordrule!saveRule.action";
    URL_STOP_PASSWORD = "ums/rule!disable.action";
    URL_START_PASSWORD = "ums/rule!disable.action";
    URL_DEL_PASSWORD = "ums/passwordrule!deleteRule.action";
    URL_GROUP_TO_USER_LIST = "ums/role!getUserByGroupId.action";
    URL_GET_OPERATION = "data/operation.xml";

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
        initToolBar();
        initNaviBar("ums.5");
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

            var ruleTreeNode = this.getNodeValue(XML_MAIN_TREE);
            var ruleTreeNodeID = CACHE_MAIN_TREE;

            Cache.XmlIslands.add(ruleTreeNodeID,ruleTreeNode);

            loadToolBar(_operation);
            initTree(ruleTreeNodeID);
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

            //Ӧ����Դ
            str[str.length] = "    <button id=\"b1\" code=\"1\" icon=\"" + ICON + "view.gif\" label=\"�鿴\" cmd=\"editPasswordInfo(false)\" enable=\"'-1'!=getTreeNodeId()\"/>";
            str[str.length] = "    <button id=\"b2\" code=\"2\" icon=\"" + ICON + "edit.gif\" label=\"�༭\" cmd=\"editPasswordInfo()\" enable=\"'-1'!=getTreeNodeId()\"/>";
            str[str.length] = "    <button id=\"b3\" code=\"3\" icon=\"" + ICON + "del.gif\" label=\"ɾ��\" cmd=\"delPassword()\" enable=\"'-1'!=getTreeNodeId() &amp;&amp; '1'!=getTreeNodeId()\"/>";
            str[str.length] = "    <button id=\"b4\" code=\"4\" icon=\"" + ICON + "new_pwd.gif\" label=\"�½��������\" cmd=\"addNewPassword()\" enable=\"'-1'==getTreeNodeId()\"/>";
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
            label:"�½��������",
            callback:addNewPassword,
            enable:function(){return true;},
            visible:function(){return "-1"==getTreeNodeId() && true==getOperation("ur2");}
        }
        var item2 = {
            label:"ɾ��",
            callback:delPassword,
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && "1"!=getTreeNodeId() && true==getOperation("ur3");}
        }
        var item3 = {
            label:"�༭",
            callback:editPasswordInfo,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && true==getOperation("ur4");}
        }
        var item4 = {
            label:"�鿴",
            callback:function(){
                editPasswordInfo(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && true==getOperation("ur4");}
        }

        var treeObj = $("tree");

        var menu1 = new Menu();
        menu1.addItem(item4);
        menu1.addItem(item3);
        menu1.addItem(item2);
        menu1.addSeparator();
        menu1.addItem(item1);

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
     *	����˵������Դ����ʼ��
     *	������	
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
        }    
    }
    /*
     *	����˵�����༭������Ϣ
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editPasswordInfo(editable){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();
            if(isNaN(treeNodeID)){// ���ڵ㲻�ܱ༭
                return;
            }
            var treeNodeName = treeNode.getName();

            var phases = [];
            phases[0] = {page:"page1",label:"������Ϣ"};

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadPasswordDetailData(treeNodeID,editable);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeNodeName);
                inf.SID = CACHE_VIEW_PASSWORD_DETAIL + treeNodeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeNodeName);
                inf.SID = CACHE_PASSWORD_DETAIL + treeNodeID;
            }
            inf.defaultPage = "page1";
            inf.phases = phases;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�������ڵ�������ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadPasswordDetailData(treeID,editable,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_PASSWORD_DETAIL + treeID;
        }else{
            var cacheID = CACHE_PASSWORD_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_PASSWORD_DETAIL;
            //���������
            if(true==isNew){
                p.setContent("isNew", "1");
            }else{
                p.setContent("id", treeID);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var ruleInfoNode = this.getNodeValue(XML_PASSWORD_INFO);

                var ruleInfoNodeID = cacheID+"."+XML_PASSWORD_INFO;

                Cache.XmlIslands.add(ruleInfoNodeID,ruleInfoNode);

                Cache.Variables.add(cacheID,[ruleInfoNodeID]);

                initPasswordPages(cacheID,editable,isNew);
            }
            request.send();
        }else{
            initPasswordPages(cacheID,editable,isNew);
        }
    }
    /*
     *	����˵�����û������xform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function initPasswordPages(cacheID,editable,isNew){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadPasswordInfoFormData(cacheID,editable);
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
            savePassword(cacheID,isNew);
        }
    }
    /*
     *	����˵����������Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadPasswordInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_PASSWORD_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
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

        showTreeNodeStatus({id:"ID",name:"����",creatorName:"������",createTime:"����ʱ��",updatorName:"�޸���",updateTime:"�޸�ʱ��"});

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
        getTreeOperation(treeNode,function(_operation){
            var canAddNewRule = checkOperation("ur2",_operation);
            var canEdit = checkOperation("ur4",_operation);
            if("-1"!=id){
                editPasswordInfo(canEdit);
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

        showTreeNodeStatus({id:"ID",name:"����",creatorName:"������",createTime:"����ʱ��",updatorName:"�޸���",updateTime:"�޸�ʱ��"});

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
     *	����˵�����������
     *	������	string:cacheID      ��������ID
     *	����ֵ��
     */
    function savePassword(cacheID,isNew){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_PASSWORD;
      
        var groupCache = Cache.Variables.get(cacheID);
        if(null!=groupCache){
        
            //���Ի�����Ϣ
            var ruleInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_PASSWORD_INFO);
            if(null!=ruleInfoNode){
                var ruleInfoDataNode = ruleInfoNode.selectSingleNode(".//data");
                if(null!=ruleInfoDataNode){
                    flag = true;
                    
                    var prefix = ruleInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(ruleInfoDataNode,prefix);
                }
            }        
        }

        if(true==flag){
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            var page1BtSaveObj = $("page1BtSave");
            syncButton([page1BtSaveObj],request);

            request.onsuccess = function(){
                //�������
                detachReminder(cacheID);

                loadInitData();

                if(true==isNew){
                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.send();
        }
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
     *	����˵�����½�����
     *	������	
     *	����ֵ��
     */
    function addNewPassword(){
        var userName = "����";
        var userID = new Date().valueOf();

        var phases = [];
        phases[0] = {page:"page1",label:"������Ϣ"};

        var callback = {};
        callback.onTabClose = function(eventObj){
            delCacheData(eventObj.tab.SID);
        };
        callback.onTabChange = function(){
            setTimeout(function(){
                loadPasswordDetailData(userID,true,true);
            },TIMEOUT_TAB_CHANGE);
        };

        var inf = {};
        inf.defaultPage = "page1";
        inf.label = OPERATION_ADD.replace(/\$label/i,userName);
        inf.phases = phases;
        inf.callback = callback;
        inf.SID = CACHE_PASSWORD_DETAIL + userID;
        var tab = ws.open(inf);
    }
    /*
     *	����˵����ɾ������
     *	������	
     *	����ֵ��
     */
    function delPassword(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();

            var p = new HttpRequestParams();
            p.url = URL_DEL_PASSWORD;
            p.setContent("id",treeNodeID);

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
     *	����˵������ȡ�ڵ�id
     *	������  
     *	����ֵ��string:id   ���ڵ�id
     */
    function getTreeNodeId(){
        var id = getTreeAttribute("id");
        if(isNaN(id)){
            id = "-1";
        }
        return id;
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

    window.onload = init;

	//�ر�ҳ���Զ�ע��
    logoutOnClose();