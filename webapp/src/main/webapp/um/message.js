    /*
     *	��̨��Ӧ���ݽڵ�����
     */
    XML_MAIN_TREE = "MessageTree";
    XML_MESSAGE_LIST = "MessageList";
    XML_GRID_SEARCH = "GridSearch";
    XML_SEARCH_MESSAGE = "SearchUserList";
    XML_OPERATION = "Operation";
    XML_PAGE_LIST = "PageList";

    XML_MESSAGE_INFO = "MessageInfo";
    XML_REPLY_INFO = "MessageInfo";
    XML_FORWARD_INFO = "MessageInfo";

    XML_GROUP_INFO = "GroupInfo";
    /*
     *	Ĭ��Ψһ�����ǰ׺
     */
    CACHE_GRID_ROW_DETAIL = "row__id";
    CACHE_VIEW_GRID_ROW_DETAIL = "viewRow__id";
    CACHE_TREE_NODE_DETAIL = "treeNode__id";
    CACHE_VIEW_TREE_NODE_DETAIL = "viewTreeNode__id";
    CACHE_TREE_NODE_GRID = "treeNodeGrid__id";
    CACHE_MAIN_TREE = "tree__id";
    CACHE_TOOLBAR = "toolbar__id";
    CACHE_SEARCH_MESSAGE = "searchMessage__id";
    CACHE_REPLY_DETAIL = "reply__id";
    CACHE_FORWARD_DETAIL = "forward__id";
    /*
     *	����
     */
    OPERATION_ADD = "�½�$label";
    OPERATION_VIEW = "�鿴\"$label\"";
    OPERATION_DEL = "ɾ��\"$label\"";
    OPERATION_EDIT = "�༭\"$label\"";
    OPERATION_REPLY = "�ظ�\"$label\"";
    OPERATION_FORWARD = "ת��\"$label\"";
    /*
     *	XMLHTTP�����ַ����
     */
    URL_INIT = "data/message_init.xml";
    URL_MESSAGE_LIST = "data/message_list.xml";
    URL_MESSAGE_DETAIL = "data/message.xml";
    URL_GROUP_DETAIL = "data/group1.xml";
    URL_MESSAGE_SEARCH = "data/gridsearch.xml";
    URL_SAVE_MESSAGE = "data/_success.xml";
    URL_SAVE_GROUP = "data/_success.xml";
    URL_SORT_MESSAGE = "data/_success.xml";
    URL_SORT_MESSAGE_CROSS_PAGE = "data/_success.xml";
    URL_DEL_MESSAGE = "data/_success.xml";
    URL_SEARCH_MESSAGE = "data/message_list.xml";
    URL_GET_OPERATION = "data/operation.xml";
    URL_GET_MESSAGE_OPERATION = "data/operation.xml";
    URL_REPLY_DETAIL = "data/message_reply.xml";
    URL_SAVE_REPLY = "data/_success.xml";
    URL_FORWARD_DETAIL = "data/message_forward.xml";
    URL_SAVE_FORWARD = "data/_success.xml";

    
    URL_INIT = "data/message_init.xml";
    URL_MESSAGE_LIST = "ums/message!getMessageList.action";
    URL_MESSAGE_DETAIL = "ums/message!getMessageInfo.action";
    URL_GROUP_DETAIL = "data/group1.xml";
    URL_MESSAGE_SEARCH = "data/gridsearch.xml";
    URL_SAVE_MESSAGE = "ums/message!saveMessage.action";
    URL_SAVE_GROUP = "data/_success.xml";
    URL_SORT_MESSAGE = "data/_success.xml";
    URL_SORT_MESSAGE_CROSS_PAGE = "data/_success.xml";
    URL_DEL_MESSAGE = "ums/message!deleteMessage.action";
    URL_SEARCH_MESSAGE = "data/message_list.xml";
    URL_GET_OPERATION = "data/operation.xml";
    URL_GET_MESSAGE_OPERATION = "data/operation.xml";
    URL_REPLY_DETAIL = "data/message_reply.xml";
    URL_SAVE_REPLY = "data/_success.xml";
    URL_FORWARD_DETAIL = "data/message_forward.xml";
    URL_SAVE_FORWARD = "data/_success.xml";

 
    /*
     *	��ʱ
     */
    TIMEOUT_TAB_CHANGE = 200;
    TIMEOUT_GRID_SEARCH = 200;
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
        initListContainerResize();
       // initUserInfo();
        initToolBar();
        initNaviBar();
        initMenus();
        initBlocks();
        initWorkSpace();
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

            //��Ϣ��
            str[str.length] = "    <button id=\"b1\" code=\"1\" icon=\"" + ICON + "new_message.gif\" label=\"д����Ϣ\" cmd=\"addNewMessage()\" enable=\"'1'==getTreeId()\"/>";
            str[str.length] = "    <button id=\"b2\" code=\"6\" icon=\"" + ICON + "view_list.gif\" label=\"�����Ϣ\" cmd=\"showMessageList()\" enable=\"'1'!=getTreeId()\"/>";
            str[str.length] = "    <button id=\"b3\" code=\"10\" icon=\"" + ICON + "search.gif\" label=\"������Ϣ\" cmd=\"searchMessage()\" enable=\"'1'!=getTreeId()\"/>";

            //��Ϣ
            str[str.length] = "    <button id=\"c1\" code=\"m3\" icon=\"" + ICON + "view.gif\" label=\"�鿴\" cmd=\"editMessageInfo(false)\" enable=\"'2'==getMessageBoxId() || '4'==getMessageBoxId()\"/>";
            str[str.length] = "    <button id=\"c2\" code=\"m2\" icon=\"" + ICON + "edit.gif\" label=\"�༭\" cmd=\"editMessageInfo()\" enable=\"'3'==getMessageBoxId()\"/>";
            str[str.length] = "    <button id=\"c3\" code=\"m1\" icon=\"" + ICON + "del.gif\" label=\"ɾ��\" cmd=\"delMessage()\" enable=\"true\"/>";
            str[str.length] = "    <button id=\"c4\" code=\"m4\" icon=\"" + ICON + "reply.gif\" label=\"�ظ�\" cmd=\"replyMessage()\" enable=\"'2'==getMessageBoxId()\"/>";
            str[str.length] = "    <button id=\"c5\" code=\"m5\" icon=\"" + ICON + "forward.gif\" label=\"ת��\" cmd=\"forwardMessage()\" enable=\"'2'==getMessageBoxId()\"/>";
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
        initGridMenu();
    }
    /*
     *	����˵�������˵���ʼ��
     *	������	
     *	����ֵ��
     */
    function initTreeMenu(){
        var item1 = {
            label:"д����Ϣ",
            callback:addNewMessage,
            enable:function(){return true;},
            visible:function(){return "1"==getTreeId() && true==getOperation("1");}
        }
        var item2 = {
            label:"�����Ϣ",
            callback:showMessageList,
            icon:ICON + "view_list.gif",
            enable:function(){return true;},
            visible:function(){return "1"!=getTreeId() &&  true==getOperation("6");}
        }
        var item3 = {
            label:"������Ϣ...",
            callback:searchMessage,
            icon:ICON + "search.gif",
            enable:function(){return true;},
            visible:function(){return "1"!=getTreeId() &&  true==getOperation("10");}
        }





        var treeObj = $("tree");

        var menu1 = new Menu();
        menu1.addItem(item1);
        menu1.addSeparator();
        menu1.addItem(item2);
        menu1.addItem(item3);

        //menu1.attachTo(treeObj,"contextmenu");
        treeObj.contextmenu = menu1;
    }
    /*
     *	����˵����Grid�˵���ʼ��
     *	������	
     *	����ֵ��
     */
    function initGridMenu(){
        var gridObj = $("grid");
        var item1 = {
            label:"�鿴",
            callback:function(){
                editMessageInfo(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return ("2"==getMessageBoxId() || "4"==getMessageBoxId()) && true==getMessageOperation("m3");}
        }
        var item2 = {
            label:"�༭",
            callback:editMessageInfo,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return "3"==getMessageBoxId() && true==getMessageOperation("m2");}
        }
        var item3 = {
            label:"ɾ��",
            callback:delMessage,
            icon:ICON + "del.gif",
            enable:function(){return gridObj.canDelete();},
            visible:function(){return true==getMessageOperation("m1");}
        }
        var item4 = {
            label:"�ظ�",
            callback:replyMessage,
            icon:ICON + "reply.gif",
            enable:function(){return true;},
            visible:function(){return "2"==getMessageBoxId() && true==getMessageOperation("m4");}
        }
        var item5 = {
            label:"ת��",
            callback:forwardMessage,
            icon:ICON + "forward.gif",
            enable:function(){return true;},
            visible:function(){return "2"==getMessageBoxId() && true==getMessageOperation("m5");}
        }

        var menu1 = new Menu();
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu1.addItem(item3);
        menu1.addSeparator();
        menu1.addItem(item4);
        menu1.addItem(item5);
        //menu1.attachTo(gridObj,"contextmenu");
        gridObj.contextmenu = menu1;
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
     *	����˵����grid��ʼ��
     *	������	string:id                   grid����������ڵ�id
     *	����ֵ��
     */
    function initGrid(id){
        var gridObj = $("grid");
        Public.initHTC(gridObj,"isLoaded","onload",function(){
            loadGridEvents();
            loadGridData(id,"1");//Ĭ�ϵ�1ҳ
        });
    }
    /*
     *	����˵����grid���¼�
     *	������	
     *	����ֵ��
     */
    function loadGridEvents(){
        var gridObj = $("grid");

        gridObj.onclickrow = function(){
            onClickRow(event);
        }
        gridObj.ondblclickrow = function(){
            onDblClickRow(event);
        }
        gridObj.onrightclickrow = function(){
            onRightClickRow(event);
        }
        gridObj.oninactiverow = function() {
            onInactiveRow(event);
        }
        gridObj.onsortrow = function() {
            onSortRow(event);
        }
    
    }
    /*
     *	����˵����grid��������
     *	������	string:treeID               grid����������ڵ�id
                string:page                 ҳ��
                string:sortName             �����ֶ�
                string:direction            ������
     *	����ֵ��
     */
    function loadGridData(treeID,page,sortName,direction){
        var cacheID = CACHE_TREE_NODE_GRID + treeID;
        var treeGrid = Cache.Variables.get(cacheID);
//        if(null==treeGrid){
            var p = new HttpRequestParams();
            p.url = URL_MESSAGE_LIST;
            p.setContent("boxId", treeID);
            p.setContent("page", page);
            if(null!=sortName && null!=direction){
                p.setContent("field", sortName);
                p.setContent("orderType", direction);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var msgListNode = this.getNodeValue(XML_MESSAGE_LIST);
                var msgListNodeID = cacheID+"."+XML_MESSAGE_LIST;

                var pageListNode = this.getNodeValue(XML_PAGE_LIST);
                var pageListNodeID = cacheID+"."+XML_PAGE_LIST;

                //����Ϣgrid���ݸ��ڵ�����boxId������
                msgListNode.setAttribute("boxId",treeID);

                //����ǰ�����м���_direction����
                if(null!=sortName && null!=direction){
                    var column = msgListNode.selectSingleNode("//column[@name='" + sortName + "']");
                    if(null!=column){
                        column.setAttribute("_direction",direction);
                    }
                }

                Cache.XmlIslands.add(msgListNodeID,msgListNode);
                Cache.XmlIslands.add(pageListNodeID,pageListNode);
                Cache.Variables.add(cacheID,[msgListNodeID,pageListNodeID]);

                loadGridDataFromCache(cacheID);
            }
            request.send();
//        }else{        
//            loadGridDataFromCache(cacheID);
//        }
    }
    /*
     *	����˵����grid�ӻ����������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadGridDataFromCache(cacheID){
        //���´���grid������
        createGridToolBar(cacheID);

        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_MESSAGE_LIST);
        if(null!=xmlIsland){
            var gridObj = $("grid");
            gridObj.load(xmlIsland.node,null,"node");

            Focus.focus("gridTitle");
        }
    }
    /*
     *	����˵��������grid������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function createGridToolBar(cacheID){
        var toolbarObj = $("gridToolBar");

        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_PAGE_LIST);
        if(null==xmlIsland){
            toolbarObj.innerHTML = "";
        }else{
            initGridToolBar(toolbarObj,xmlIsland,function(page){
                var gridBtRefreshObj = $("gridBtRefresh");
                var gridObj = $("grid");

                if(true==gridObj.hasData_Xml()){
                    var tempXmlIsland = new XmlNode(gridObj.getXmlDocument());
                    var tempBoxId = tempXmlIsland.getAttribute("boxId");
                    var sortName = tempXmlIsland.getAttribute("sortName");
                    var direction = tempXmlIsland.getAttribute("direction");
                    if("search"!=tempBoxId){
                        //���������Ϣgrid����
                        delCacheData(CACHE_TREE_NODE_GRID + tempBoxId);

                        loadGridData(tempBoxId,page,sortName,direction);

                        //ˢ�¹�����
                        onInactiveRow();
                    }else{
                        loadSearchGridData(cacheID,page,sortName,direction,tempBoxId);
                    }
                }            
            });
        }
    }
    /*
     *	����˵������ʾ��Ϣ״̬��Ϣ
     *	������	number:rowIndex     grid�����к�
     *	����ֵ��
     */
    function showMessageStatus(rowIndex){
        if(null==rowIndex){
            var rowName = "-";
            var rowID = "-";

            var senderId = "-"
            var sender = "-"
            var sendTime = "-"
            var receiverId = "-"
            var receiver = "-"
        }else{
            var gridObj = $("grid");
            var rowNode = gridObj.getRowNode_Xml(rowIndex);
            var rowID = rowNode.getAttribute("id");

            var senderId = rowNode.getAttribute("senderId");
            var sender = rowNode.getAttribute("sender");
            var sendTime = rowNode.getAttribute("sendTime");
            var receiverId = rowNode.getAttribute("receiverId");
            var receiver = rowNode.getAttribute("receiver");
        }

        var block = Blocks.getBlock("statusContainer");
        if(null!=block){
            block.open();
            block.writeln("ID",rowID);
            block.writeln("������",sender);
            block.writeln("����ʱ��",sendTime);
            block.writeln("�ռ���",receiver);
            block.close();
        }
    }
    /*
     *	����˵������ʾ��Ϣ��ϸ��Ϣ
     *	������	boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editMessageInfo(editable){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var title = gridObj.getNamedNodeValue_Xml(rowIndex,"title");
        var id = rowNode.getAttribute("id");
        var boxId = gridObj.getXmlDocument().getAttribute("boxId");

        var phases = null;

        var callback = {};
        callback.onTabClose = function(eventObj){
            delCacheData(eventObj.tab.SID);
        };
        callback.onTabChange = function(){
            setTimeout(function(){
                loadMessageDetailData(id,editable,false);
            },TIMEOUT_TAB_CHANGE);
        };

        var inf = {};
        if(false==editable){
            inf.label = OPERATION_VIEW.replace(/\$label/i,title);
            inf.SID = CACHE_VIEW_GRID_ROW_DETAIL + id;
        }else{
            inf.label = OPERATION_EDIT.replace(/\$label/i,title);
            inf.SID = CACHE_GRID_ROW_DETAIL + id;
        }
        inf.defaultPage = "page1";
        inf.phases = phases;
        inf.callback = callback;
        var tab = ws.open(inf);
        
    }
    /*
     *	����˵������Ϣ��ϸ��Ϣ��������
     *	������	string:userID               ��Ϣid
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ��½�(Ĭ��true)
     *	����ֵ��
     */
    function loadMessageDetailData(id,editable,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_GRID_ROW_DETAIL + id;
        }else{
            var cacheID = CACHE_GRID_ROW_DETAIL + id;
        }
        var msgDetail = Cache.Variables.get(cacheID);
        if(null==msgDetail){
            var p = new HttpRequestParams();
            p.url = URL_MESSAGE_DETAIL;
            //���������
            if(true==isNew){
                p.setContent("isNew", "true");
            }else{
                p.setContent("id", id);
				p.setContent("boxId", getTreeId());
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var msgInfoNode = this.getNodeValue(XML_MESSAGE_INFO);

                var msgInfoNodeID = cacheID+"."+XML_MESSAGE_INFO;

                Cache.XmlIslands.add(msgInfoNodeID,msgInfoNode);

                Cache.Variables.add(cacheID,[msgInfoNodeID]);

                initMessagePages(cacheID,editable,isNew);
            }
            request.send();
        }else{
            initMessagePages(cacheID,editable,isNew);
        }
    }
    /*
     *	����˵������Ϣ���ҳ��������
     *	������	string:cacheID          ��������id
                boolean:editable        �Ƿ�ɱ༭
                boolean:isNew           �Ƿ��½�
     *	����ֵ��
     */
    function initMessagePages(cacheID,editable,isNew){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadMessageInfoFormData(cacheID,editable);
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        var page1BtSaveAndSendObj = $("page1BtSaveAndSend");
        var page1BtSendObj = $("page1BtSend");
        page1BtSaveObj.style.display = editable==false?"none":"";
        page1BtSaveAndSendObj.style.display = editable==false?"none":"";
        page1BtSendObj.style.display = editable==false?"none":"";
        page1BtSaveObj.onclick = function(){
            saveMessage(cacheID,"save",isNew);
        }
        page1BtSaveAndSendObj.onclick = function(){
            saveMessage(cacheID,"saveAndSend",isNew);
        }
        page1BtSendObj.onclick = function(){
            saveMessage(cacheID,"send",isNew);
        }
    }
    /*
     *	����˵������Ϣ��Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadMessageInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_MESSAGE_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
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
     *	����˵�������ڵ�������ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentID             ���ڵ�id
                boolean:isNew               �Ƿ�����
                string:disabled             ��״̬(1ͣ��/0����)
     *	����ֵ��
     */
    function loadGroupDetailData(treeID,editable,parentID,groupType,applicationId,isNew,disabled){
        if(false==editable){
            var cacheID = CACHE_VIEW_TREE_NODE_DETAIL + treeID;
        }else{
            var cacheID = CACHE_TREE_NODE_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_GROUP_DETAIL;
            p.setContent("groupType", groupType);
            p.setContent("applicationId", applicationId);
            if(true==isNew){
                p.setContent("toGroupId", parentID);                
                p.setContent("groupId", -10);              
                p.setContent("disabled", disabled);
            }else{
                p.setContent("groupId", treeID);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var groupInfoNode = this.getNodeValue(XML_GROUP_INFO);
                var group2UserTreeNode = this.getNodeValue(XML_GROUP_TO_MESSAGE_TREE);
                var group2UserTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE).cloneNode(false);
                var group2UserGridNode = this.getNodeValue(XML_GROUP_TO_MESSAGE_EXIST_TREE);
                var group2RoleTreeNode = this.getNodeValue(XML_GROUP_TO_ROLE_TREE);
                var group2RoleGridNode = this.getNodeValue(XML_GROUP_TO_ROLE_EXIST_TREE);

                //ֻ��������������Ϣ��
                var mainTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE);
                var GroupType1Node = mainTreeNode.selectSingleNode("./treeNode[@groupType='1']");
                if(null!=GroupType1Node){
                    GroupType1Node = GroupType1Node.cloneNode(true);
                    group2UserTreeNode.appendChild(GroupType1Node);
                }
                var GroupType2Node = mainTreeNode.selectSingleNode("./treeNode[@groupType='2']");
                if(null!=GroupType2Node){
                    GroupType2Node = GroupType2Node.cloneNode(true);
                    group2UserTreeNode.appendChild(GroupType2Node);
                }

                var groupInfoNodeID = cacheID+"."+XML_GROUP_INFO;
                var group2UserTreeNodeID = cacheID+"."+XML_GROUP_TO_MESSAGE_TREE;
                var group2UserGridNodeID = cacheID+"."+XML_GROUP_TO_MESSAGE_EXIST_TREE;
                var group2RoleTreeNodeID = cacheID+"."+XML_GROUP_TO_ROLE_TREE;
                var group2RoleGridNodeID = cacheID+"."+XML_GROUP_TO_ROLE_EXIST_TREE;

                Cache.XmlIslands.add(groupInfoNodeID,groupInfoNode);
                Cache.XmlIslands.add(group2UserTreeNodeID,group2UserTreeNode);
                Cache.XmlIslands.add(group2UserGridNodeID,group2UserGridNode);
                Cache.XmlIslands.add(group2RoleTreeNodeID,group2RoleTreeNode);
                Cache.XmlIslands.add(group2RoleGridNodeID,group2RoleGridNode);

                Cache.Variables.add(cacheID,[groupInfoNodeID,group2UserTreeNodeID,group2UserGridNodeID,group2RoleTreeNodeID,group2RoleGridNodeID]);

                initGroupPages(cacheID,editable,isNew,parentID,groupType);
            }
            request.send();
        }else{
            initGroupPages(cacheID,editable,isNew,parentID,groupType);
        }
    }
    /*
     *	����˵������Ϣ�����ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
                string:parentID             ���ڵ�id
                string:groupType            ������
     *	����ֵ��
     */
    function initGroupPages(cacheID,editable,isNew,parentID,groupType){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadGroupInfoFormData(cacheID,editable,groupType);
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
            saveGroup(cacheID,isNew,parentID,groupType);
        }
    }
    /*
     *	����˵������Ϣ����Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:groupType            ������
     *	����ֵ��
     */
    function loadGroupInfoFormData(cacheID,editable,groupType){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            page1FormObj.ondatachange = function(){
                //2007-3-1 �뿪����
                attachReminder(cacheID);
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
        var gridTitleObj = $("gridTitle");

        Focus.register(treeTitleObj.firstChild);
        Focus.register(statusTitleObj.firstChild);
        Focus.register(gridTitleObj);
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
        var gridTitleObj = $("gridTitle");
        
        Event.attachEvent(treeBtRefreshObj,"click",onClickTreeBtRefresh);
        Event.attachEvent(treeTitleBtObj,"click",onClickTreeTitleBt);
        Event.attachEvent(statusTitleBtObj,"click",onClickStatusTitleBt);
        Event.attachEvent(paletteBtObj,"click",onClickPaletteBt);

        Event.attachEvent(treeTitleObj,"click",onClickTreeTitle);
        Event.attachEvent(statusTitleObj,"click",onClickStatusTitle);
        Event.attachEvent(gridTitleObj,"click",onClickGridTitle);
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
        var id = getTreeId();
        getTreeOperation(treeNode,function(_operation){
                var canShowMsgList = checkOperation("6",_operation);
                var canAddNew = checkOperation("1",_operation);

                if("1"==id && true==canAddNew){
                    addNewMessage();
                }else if("1"!=id && true==canShowMsgList){
                    showMessageList();
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
     *	����˵�����϶����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeMoved(eventObj){
        sortGroupTo(eventObj);
    }
    /*
     *	����˵��������grid��
     *	������	event:eventObj     �¼�����
     *	����ֵ��
     */
    function onClickRow(eventObj){    
        Focus.focus("gridTitle");

        var rowIndex = eventObj.result.rowIndex_Xml;
        showMessageStatus(rowIndex);

        //��ֹ��Ϊ���빤�������ݶ����²���Ӧ˫���¼�
        clearTimeout(window._toolbarTimeout);
        window._toolbarTimeout = setTimeout(function(){
            loadMessageToolBarData(rowIndex);
        },0);
    }
    /*
     *	����˵����˫��grid��
     *	������	event:eventObj     �¼�����
     *	����ֵ��
     */
    function onDblClickRow(eventObj){
        var rowIndex = eventObj.result.rowIndex_Xml;
        var boxId = getMessageBoxId();
        getGridOperation(rowIndex,function(_operation){
            //���༭Ȩ��
            var edit = checkOperation("m2",_operation);
            var view = checkOperation("m3",_operation);

            if(true==edit && "3"==boxId){
                editMessageInfo(true);
            }else if(true==view && ("2"==boxId || "4"==boxId)){
                editMessageInfo(false);
            }
        });
    }
    /*
     *	����˵�����һ�grid��
     *	������	event:eventObj     �¼�����
     *	����ֵ��
     */
    function onRightClickRow(eventObj){
        var gridObj = $("grid");
        var rowIndex = eventObj.result.rowIndex_Xml;
        var x = event.clientX;
        var y = event.clientY;

        getGridOperation(rowIndex,function(_operation){
            gridObj.contextmenu.show(x,y);
            loadToolBar(_operation);
        });
    }
    /*
     *	����˵��������grid�հ״�
     *	������	event:eventObj     �¼�����
     *	����ֵ��
     */
    function onInactiveRow(eventObj){
        var treeTitleObj = $("treeTitle");
        Focus.focus(treeTitleObj.firstChild.id);

        showTreeNodeStatus({id:"ID",name:"����",creatorName:"������",createTime:"����ʱ��",updatorName:"�޸���",updateTime:"�޸�ʱ��"});

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        //��ֹ��Ϊ���빤�������ݶ����²���Ӧ˫���¼�
        clearTimeout(window._toolbarTimeout);
        window._toolbarTimeout = setTimeout(function(){
            loadToolBarData(treeNode);
        },0);
    }
    /*
     *	����˵��������grid��ͷ����
     *	������	event:eventObj     �¼�����
     *	����ֵ��
     */
    function onSortRow(eventObj){
        var name = eventObj.result.name;
        var direction = eventObj.result.direction;

        eventObj.returnValue = false;

        var gridObj = $("grid");
        var xmlIsland = new XmlNode(gridObj.getXmlDocument());
        xmlIsland.setAttribute("sortName",name);
        xmlIsland.setAttribute("direction",direction);

        var toolbarObj = $("gridToolBar");
        var curPage = toolbarObj.getCurrentPage();
        toolbarObj.gotoPage(curPage);
    }
    /*
     *	����˵����������Ϣ��
     *	������	string:cacheID      ��������ID
                boolean:isNew       �Ƿ�����
                string:parentID     ���ڵ�id
                string:groupType    ������
     *	����ֵ��
     */
    function saveGroup(cacheID,isNew,parentID,groupType){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_GROUP;

        //�Ƿ��ύ
        var flag = false;
        
        var groupCache = Cache.Variables.get(cacheID);
        if(null!=groupCache){       

            //��Ϣ�������Ϣ
            var groupInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_INFO);
            if(null!=groupInfoNode){
                var groupInfoDataNode = groupInfoNode.selectSingleNode(".//data");
                if(null!=groupInfoDataNode){
                    flag = true;

                    var prefix = groupInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(groupInfoDataNode,prefix);
                }
            }

            //��Ϣ�����Ϣ
            if("2"==groupType){
                var group2UserNode = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_MESSAGE_EXIST_TREE);
                if(null!=group2UserNode){
                    var group2UserDataIDs = getTreeNodeIds(group2UserNode,"./treeNode//treeNode");
                    if(0<group2UserDataIDs.length){
                        flag = true;
                        p.setContent(XML_GROUP_TO_MESSAGE_EXIST_TREE,group2UserDataIDs.join(","));
                    }
                }
            }

            //��Ϣ��Խ�ɫ
            var group2RoleNode = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_ROLE_EXIST_TREE);
            if(null!=group2RoleNode){
                var group2RoleDataIDs = getTreeNodeIds(group2RoleNode,"./treeNode//treeNode");
                if(0<group2RoleDataIDs.length){
                    flag = true;
                    p.setContent(XML_GROUP_TO_ROLE_EXIST_TREE,group2RoleDataIDs.join(","));
                }
            }
        }

        if(true==flag){
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            var page1BtSaveObj = $("page1BtSave");
            var page4BtSaveObj = $("page4BtSave");
            var page3BtSaveObj = $("page3BtSave");
            syncButton([page1BtSaveObj,page4BtSaveObj,page3BtSaveObj],request);

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

                    var id = cacheID.trim(CACHE_TREE_NODE_DETAIL);

                    //������Ϣ�飬����������Ϣ
                    if("2"==groupType){
                        var treeObj = $("tree");
                        var disabled = treeObj.getTreeNodeById(id).getAttribute("disabled");
                        var img = "user_group";
                        if("1"==disabled){
                            img += "_2";
                        }
                        img += ".gif";
                        modifyTreeNode(id,"icon",ICON + img, false);
                    }

                    //�������ڵ�����
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
        }
    }
    /*
     *	����˵����������Ϣ
     *	������	string:cacheID          ��������ID
                string:mode             ģʽ(save������/saveAndSend���沢����/send������)
                boolean:isNew           �Ƿ��½�
     *	����ֵ��
     */
    function saveMessage(cacheID,mode,isNew){
        //У��page1Form,page8Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_MESSAGE;
        p.setContent("mode",mode);

        //�Ƿ��ύ
        var flag = false;
        
        var userCache = Cache.Variables.get(cacheID);
        if(null!=userCache){

            //��Ϣ������Ϣ
            var userInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_MESSAGE_INFO);
            if(null!=userInfoNode){
                var userInfoDataNode = userInfoNode.selectSingleNode(".//data");
                if(null!=userInfoDataNode){
                    flag = true;

                    var prefix = userInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(userInfoDataNode,prefix);
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

                //���������Ϣgrid����
                delCacheData(CACHE_TREE_NODE_GRID + "3");//�ݸ���
                delCacheData(CACHE_TREE_NODE_GRID + "4");//������

                //�����ǰgrid��ʾΪ����Ϣ�����飬��ˢ��grid
                var gridObj = $("grid");
                if(true==gridObj.hasData_Xml()){
                    var tempXmlIsland = new XmlNode(gridObj.getXmlDocument());
                    var tempBoxId = tempXmlIsland.getAttribute("boxId");
                    var cond1 = "3"==tempBoxId && ("save"==mode || "sendAndSave"==mode);
                    var cond2 = "4"==tempBoxId && ("send"==mode || "sendAndSave"==mode);
                    if(true==cond1 || true==cond2){
                        loadGridData(tempBoxId,"1");//Ĭ�ϵ�1ҳ

                        //ˢ�¹�����
                        onInactiveRow();
                    }
                }

                if(true == isNew){
                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.send();
        }
    }
    /*
     *	����˵������ʾ��Ϣ�б�
     *	������	                
     *	����ֵ��
     */
    function showMessageList(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            initGrid(id);
        }
    }
    /*
     *	����˵�����½���Ϣ
     *	������	
     *	����ֵ��
     */
    function addNewMessage(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var name = "��Ϣ";
            var id = new Date().valueOf();

            var phases = null;

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadMessageDetailData(id,true,true);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_ADD.replace(/\$label/i,name);
            inf.phases = phases;
            inf.callback = callback;
            inf.SID = CACHE_GRID_ROW_DETAIL + id;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����༭���ڵ�
     *	������	boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editTreeNode(editable){
        var resourceTypeId = getResourceTypeId();
        switch(resourceTypeId){
            case "5":
                editApplication(editable);
                break;
            default:
                editGroupInfo(editable);
                break;
        }
    }
    /*
     *	����˵�����༭����Ϣ
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editGroupInfo(editable){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var treeType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");

            switch(treeType){
                case "1"://����Ϣ��
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page3",label:"��ɫ"};

                    var callback = {};
                    callback.onTabClose = function(eventObj){
                        delCacheData(eventObj.tab.SID);
                    };
                    callback.onTabChange = function(){
                        setTimeout(function(){
                            loadGroupDetailData(treeID,editable,null,treeType,applicationId);
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
                    inf.phases = phases;
                    inf.callback = callback;
                    var tab = ws.open(inf);
                    break;
                case "2"://������Ϣ��
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page4",label:"��Ϣ"};
                    phases[2] = {page:"page3",label:"��ɫ"};

                    var callback = {};
                    callback.onTabClose = function(eventObj){
                        delCacheData(eventObj.tab.SID);
                    };
                    callback.onTabChange = function(){
                        setTimeout(function(){
                            loadGroupDetailData(treeID,editable,null,treeType,applicationId);
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
                    inf.phases = phases;
                    inf.callback = callback;
                    var tab = ws.open(inf);
                    break;
                case "3"://����Ӧ���µ���Ϣ��
                default://Ӧ��
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page4",label:"��Ϣ"};
                    phases = null;//��ʱ������
                    
                    var callback = {};
                    callback.onTabClose = function(eventObj){
                        delCacheData(eventObj.tab.SID);
                    };
                    callback.onTabChange = function(){
                        setTimeout(function(){
                            loadOtherGroupDetailData(treeID,editable,treeID,treeType,applicationId);
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
                    inf.phases = phases;
                    inf.callback = callback;
                    var tab = ws.open(inf);
                    break;
            }
        }
    }
    /*
     *	����˵������ȡ�ڵ�ID
     *	������	
     *	����ֵ��
     */
    function getTreeId(){
        return getTreeAttribute("id");   
    }
    /*
     *	����˵����ɾ����Ϣ
     *	������	
     *	����ֵ��
     */
    function delMessage(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var rowID = rowNode.getAttribute("id");

        var p = new HttpRequestParams();
        p.url = URL_DEL_MESSAGE;
        p.setContent("id",rowID);

        var request = new HttpRequest(p);
        request.onsuccess = function(){
            //��grid��ɾ��
            gridObj.delRow_Xml(rowIndex,true,true);

            //ˢ�¹�����
            onInactiveRow();
        }
        request.send();
    }
    /*
     *	����˵����������Ϣ
     *	������	
     *	����ֵ��
     */
    function searchMessage(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var cacheID = CACHE_SEARCH_MESSAGE + treeID;

            var condition = window.showModalDialog("searchmsg.htm",{boxId:treeID,title:"����\""+treeName+"\"�µ���Ϣ"},"dialogWidth:250px;dialogHeight:250px;");
            if(null!=condition){
                Cache.Variables.add("condition",condition);
                loadSearchGridData(cacheID,1,null,null,treeID);
            }
        }
    }
    /*
     *	����˵��������������ȡ�������
     *	������	string:cacheID      ��������id
                string:page         ҳ��
                string:sortName     �����ֶ�
                string:direction    ������
     *	����ֵ��
     */
    function loadSearchGridData(cacheID,page,sortName,direction,boxId){
        var condition = Cache.Variables.get("condition");
        if(null!=condition){
            var p = new HttpRequestParams();
            p.url = URL_SEARCH_MESSAGE;

            var xmlReader = new XmlReader(condition.dataXml);
            var dataNode = new XmlNode(xmlReader.documentElement);
            p.setXFormContent(dataNode,condition.prefix);
            p.setContent("page",page);
            if(null!=sortName && null!=direction){
                p.setContent("field", sortName);
                p.setContent("orderType", direction);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var sourceListNode = this.getNodeValue(XML_MESSAGE_LIST);
                var sourceListNodeID = cacheID+"."+XML_MESSAGE_LIST;

                var pageListNode = this.getNodeValue(XML_PAGE_LIST);
                var pageListNodeID = cacheID+"."+XML_PAGE_LIST;

                //����Ϣgrid���ݸ��ڵ�����boxId������
                sourceListNode.setAttribute("boxId",boxId);

                //����ǰ�����м���_direction����
                if(null!=sortName && null!=direction){
                    var column = sourceListNode.selectSingleNode("//column[@name='" + sortName + "']");
                    if(null!=column){
                        column.setAttribute("_direction",direction);
                    }
                }

                Cache.XmlIslands.add(sourceListNodeID,sourceListNode);
                Cache.XmlIslands.add(pageListNodeID,pageListNode);
                Cache.Variables.add(cacheID,[sourceListNodeID,pageListNodeID]);

                
                initSearchGrid(cacheID);
            }
            request.send();
        }
    }
    /*
     *	����˵������ʼ��������Ϣgrid
     *	������	string:cacheID      ��������id
     *	����ֵ��
     */
    function initSearchGrid(cacheID){
        var gridObj = $("grid");
        Public.initHTC(gridObj,"isLoaded","onload",function(){
            loadGridDataFromCache(cacheID);
            loadGridEvents();

            //ˢ�¹�����
            onInactiveRow();
        });    
    }
    /*
     *	����˵���������Ϣ�б��Ҽ��˵����Ƿ�ɼ�
     *	������	string:code     ������
     *	����ֵ��
     */
    function getMessageOperation(code){
        var flag = false;
        var gridObj = $("grid");
        var curRowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        if(null!=curRowIndex){
            var curRowNode = gridObj.getRowNode_Xml(curRowIndex);
            var _operation = curRowNode.getAttribute("_operation");

            var reg = new RegExp("(^"+code+",)|(^"+code+"$)|(,"+code+",)|(,"+code+"$)","gi");
            if(true==reg.test(_operation)){
                flag = true;
            }
        }
        return flag;
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
     *	����˵����������Ϣ������
     *	������	
     *	����ֵ��
     */
    function loadMessageToolBarData(rowIndex){
        if(null==rowIndex){
            loadToolBar("p1,p2");
            return;
        }

        var gridObj = $("grid");
        var applicationID = gridObj.getXmlDocument().getAttribute("applicationId");
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var id = rowNode.getAttribute("id");
        var groupId = rowNode.getAttribute("groupId");
        var _operation = rowNode.getAttribute("_operation");

        if(null==_operation || ""==_operation){//����ڵ��ϻ�û��_operation���ԣ�������Ӻ�̨��ȡ��Ϣ
            var p = new HttpRequestParams();
            p.url = URL_GET_MESSAGE_OPERATION;
            p.setContent("resourceId",id);
            p.setContent("groupId",groupId);
            p.setContent("applicationId",applicationID);
            p.setContent("groupType",groupType);

            var request = new HttpRequest(p);
            request.onresult = function(){
                _operation = this.getNodeValue(XML_OPERATION);
                rowNode.setAttribute("_operation",_operation);

                loadToolBar(_operation);
            }
            request.send();
            
        }else{
            loadToolBar(_operation);
        }
    
    }
    /*
     *	����˵������ȡgrid����Ȩ��
     *	������	number:rowIndex         grid�к�
                function:callback       �ص�����
     *	����ֵ��
     */
    function getGridOperation(rowIndex,callback){
        var gridObj = $("grid");
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var id = rowNode.getAttribute("id");
        var _operation = rowNode.getAttribute("_operation");
        var applicationID = gridObj.getXmlDocument().getAttribute("applicationId");
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        var groupId = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"==groupId){
            groupId = rowNode.getAttribute("groupId");
        }

        if(null==_operation || ""==_operation){//����ڵ��ϻ�û��_operation���ԣ�������Ӻ�̨��ȡ��Ϣ
            var p = new HttpRequestParams();
            p.url = URL_GET_MESSAGE_OPERATION;
            p.setContent("resourceId",id);
            p.setContent("groupId",groupId);
            p.setContent("applicationId",applicationID);
            p.setContent("groupType",groupType);

            var request = new HttpRequest(p);
            request.onresult = function(){
                _operation = this.getNodeValue(XML_OPERATION);
                rowNode.setAttribute("_operation",_operation);

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
     *	����˵������ȡ������Ȩ��
     *	������	treeNode:treeNode       treeNodeʵ��
                function:callback       �ص�����
     *	����ֵ��
     */
    function getTreeOperation(treeNode,callback){
        var id = treeNode.getId();
        var _operation = treeNode.getAttribute("_operation");
        var applicationId = treeNode.getAttribute("applicationId");
        var groupType = treeNode.getAttribute("groupType");
        var resourceTypeId = treeNode.getAttribute("resourceTypeId");

        if(null==_operation || ""==_operation){//����ڵ��ϻ�û��_operation���ԣ�������Ӻ�̨��ȡ��Ϣ
            var p = new HttpRequestParams();
            p.url = URL_GET_OPERATION;
            p.setContent("resourceId",id);
            p.setContent("applicationId",applicationId);
            p.setContent("groupType",groupType);
            // ���������Ϣ����ڵ�
            if("-4" == id || "5"==resourceTypeId){
                p.setContent("resourceTypeId","5");
            }

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
     *	����˵�����ָ�Ĭ������
     *	������	
     *	����ֵ��
     */
    function restoreDefaultSort(){
        var gridObj = $("grid");
        var xmlIsland = new XmlNode(gridObj.getXmlDocument());
        xmlIsland.removeAttribute("sortName");
        xmlIsland.removeAttribute("direction");

        var toolbarObj = $("gridToolBar");
        var curPage = toolbarObj.getCurrentPage();
        toolbarObj.gotoPage(curPage);
    }
    /*
     *	����˵�����Ƿ�����ָ�Ĭ������
     *	������	
     *	����ֵ��
     */
    function canRestoreDefaultSort(){
        var flag = false;
        var gridObj = $("grid");
        var xmlIsland = new XmlNode(gridObj.getXmlDocument());
        var sortColumn = xmlIsland.selectSingleNode(".//column[@_direction]");

        if(null!=sortColumn){
            flag = true;
        }
        return flag;
    }
    /*
     *	����˵������ȡ��ǰ�ʼ������ĸ��ļ���
     *	������
     *	����ֵ��
     */
    function getMessageBoxId(){
        var gridObj = $("grid");
        var boxId = gridObj.getXmlDocument().getAttribute("boxId");
        return boxId;
    }
    /*
     *	����˵�����ظ���Ϣ
     *	������
     *	����ֵ��
     */
    function replyMessage(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var title = gridObj.getNamedNodeValue_Xml(rowIndex,"title");
        var id = rowNode.getAttribute("id");
        var boxId = gridObj.getXmlDocument().getAttribute("boxId");

        var phases = null;

        var callback = {};
        callback.onTabClose = function(eventObj){
            delCacheData(eventObj.tab.SID);
        };
        callback.onTabChange = function(){
            setTimeout(function(){
                loadReplyDetailData(id);
            },TIMEOUT_TAB_CHANGE);
        };

        var inf = {};
        inf.label = OPERATION_REPLY.replace(/\$label/i,title);
        inf.SID = CACHE_REPLY_DETAIL + id;
        inf.defaultPage = "page1";
        inf.phases = phases;
        inf.callback = callback;
        var tab = ws.open(inf);
    }
    /*
     *	����˵������Ϣ��ϸ��Ϣ��������
     *	������	string:id               ��Ϣid
     *	����ֵ��
     */
    function loadReplyDetailData(id){
        var cacheID = CACHE_REPLY_DETAIL + id;
        var msgDetail = Cache.Variables.get(cacheID);
        if(null==msgDetail){
            var p = new HttpRequestParams();
            p.url = URL_MESSAGE_DETAIL;

            p.setContent("id", id);
			p.setContent("type", "reply");

            var request = new HttpRequest(p);
            request.onresult = function(){
                var replyInfoNode = this.getNodeValue(XML_REPLY_INFO);
                var replyInfoNodeID = cacheID+"."+XML_REPLY_INFO;

                Cache.XmlIslands.add(replyInfoNodeID,replyInfoNode);
                Cache.Variables.add(cacheID,[replyInfoNodeID]);

                initReplyPages(cacheID);
            }
            request.send();
        }else{
            initReplyPages(cacheID);
        }
    }
    /*
     *	����˵�����ظ����ҳ��������
     *	������	string:cacheID          ��������id
     *	����ֵ��
     */
    function initReplyPages(cacheID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadReplyInfoFormData(cacheID);
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        var page1BtSaveAndSendObj = $("page1BtSaveAndSend");
        var page1BtSendObj = $("page1BtSend");
        page1BtSaveObj.style.display = "";
        page1BtSaveAndSendObj.style.display = "";
        page1BtSendObj.style.display = "";
        page1BtSaveObj.onclick = function(){
            saveReply(cacheID,"save");
        }
        page1BtSaveAndSendObj.onclick = function(){
            saveReply(cacheID,"saveAndSend");
        }
        page1BtSendObj.onclick = function(){
            saveReply(cacheID,"send");
        }
    }
    /*
     *	����˵�����ظ���Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadReplyInfoFormData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_REPLY_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = "true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵����������Ϣ
     *	������	string:cacheID          ��������ID
                string:mode             ģʽ(save������/saveAndSend���沢����/send������)
     *	����ֵ��
     */
    function saveReply(cacheID,mode){
        //У��page1Form,page8Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_REPLY;
        p.setContent("mode",mode);

        //�Ƿ��ύ
        var flag = false;
        
        var userCache = Cache.Variables.get(cacheID);
        if(null!=userCache){

            //��Ϣ������Ϣ
            var userInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_REPLY_INFO);
            if(null!=userInfoNode){
                var userInfoDataNode = userInfoNode.selectSingleNode(".//data");
                if(null!=userInfoDataNode){
                    flag = true;

                    var prefix = userInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(userInfoDataNode,prefix);
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

                //���������Ϣgrid����
                delCacheData(CACHE_TREE_NODE_GRID + "3");//�ݸ���
                delCacheData(CACHE_TREE_NODE_GRID + "4");//������

                //�����ǰgrid��ʾΪ����Ϣ�����飬��ˢ��grid
                var gridObj = $("grid");
                if(true==gridObj.hasData_Xml()){
                    var tempXmlIsland = new XmlNode(gridObj.getXmlDocument());
                    var tempBoxId = tempXmlIsland.getAttribute("boxId");
                    var cond1 = "3"==tempBoxId && ("save"==mode || "sendAndSave"==mode);
                    var cond2 = "4"==tempBoxId && ("send"==mode || "sendAndSave"==mode);
                    if(true==cond1 || true==cond2){
                        loadGridData(tempBoxId,"1");//Ĭ�ϵ�1ҳ

                        //ˢ�¹�����
                        onInactiveRow();
                    }
                }

                var ws = $("ws");
                ws.closeActiveTab();
            }
            request.send();
        }
    }
    /*
     *	����˵����ת����Ϣ
     *	������
     *	����ֵ��
     */
    function forwardMessage(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var title = gridObj.getNamedNodeValue_Xml(rowIndex,"title");
        var id = rowNode.getAttribute("id");
        var boxId = gridObj.getXmlDocument().getAttribute("boxId");

        var phases = null;

        var callback = {};
        callback.onTabClose = function(eventObj){
            delCacheData(eventObj.tab.SID);
        };
        callback.onTabChange = function(){
            setTimeout(function(){
                loadForwardDetailData(id);
            },TIMEOUT_TAB_CHANGE);
        };

        var inf = {};
        inf.label = OPERATION_FORWARD.replace(/\$label/i,title);
        inf.SID = CACHE_FORWARD_DETAIL + id;
        inf.defaultPage = "page1";
        inf.phases = phases;
        inf.callback = callback;
        var tab = ws.open(inf);
    }
    /*
     *	����˵����ת����ϸ��Ϣ��������
     *	������	string:id               ��Ϣid
     *	����ֵ��
     */
    function loadForwardDetailData(id){
        var cacheID = CACHE_FORWARD_DETAIL + id;
        var msgDetail = Cache.Variables.get(cacheID);
        if(null==msgDetail){
            var p = new HttpRequestParams();
            p.url = URL_MESSAGE_DETAIL;

            p.setContent("id", id);
			p.setContent("type", "forward");

            var request = new HttpRequest(p);
            request.onresult = function(){
                var fwInfoNode = this.getNodeValue(XML_FORWARD_INFO);
                var fwInfoNodeID = cacheID+"."+XML_FORWARD_INFO;

                Cache.XmlIslands.add(fwInfoNodeID,fwInfoNode);
                Cache.Variables.add(cacheID,[fwInfoNodeID]);

                initForwardPages(cacheID);
            }
            request.send();
        }else{
            initForwardPages(cacheID);
        }
    }
    /*
     *	����˵����ת�����ҳ��������
     *	������	string:cacheID          ��������id
     *	����ֵ��
     */
    function initForwardPages(cacheID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadForwardInfoFormData(cacheID);
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        var page1BtSaveAndSendObj = $("page1BtSaveAndSend");
        var page1BtSendObj = $("page1BtSend");
        page1BtSaveObj.style.display = "";
        page1BtSaveAndSendObj.style.display = "";
        page1BtSendObj.style.display = "";
        page1BtSaveObj.onclick = function(){
            saveForward(cacheID,"save");
        }
        page1BtSaveAndSendObj.onclick = function(){
            saveForward(cacheID,"saveAndSend");
        }
        page1BtSendObj.onclick = function(){
            saveForward(cacheID,"send");
        }
    }
    /*
     *	����˵����ת����Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadForwardInfoFormData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_FORWARD_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = "true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵����������Ϣ
     *	������	string:cacheID          ��������ID
                string:mode             ģʽ(save������/saveAndSend���沢����/send������)
     *	����ֵ��
     */
    function saveForward(cacheID,mode){
        //У��page1Form,page8Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_FORWARD;
        p.setContent("mode",mode);

        //�Ƿ��ύ
        var flag = false;
        
        var userCache = Cache.Variables.get(cacheID);
        if(null!=userCache){

            //��Ϣ������Ϣ
            var userInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_FORWARD_INFO);
            if(null!=userInfoNode){
                var userInfoDataNode = userInfoNode.selectSingleNode(".//data");
                if(null!=userInfoDataNode){
                    flag = true;

                    var prefix = userInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(userInfoDataNode,prefix);
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

                //���������Ϣgrid����
                delCacheData(CACHE_TREE_NODE_GRID + "3");//�ݸ���
                delCacheData(CACHE_TREE_NODE_GRID + "4");//������

                //�����ǰgrid��ʾΪ����Ϣ�����飬��ˢ��grid
                var gridObj = $("grid");
                if(true==gridObj.hasData_Xml()){
                    var tempXmlIsland = new XmlNode(gridObj.getXmlDocument());
                    var tempBoxId = tempXmlIsland.getAttribute("boxId");
                    var cond1 = "3"==tempBoxId && ("save"==mode || "sendAndSave"==mode);
                    var cond2 = "4"==tempBoxId && ("send"==mode || "sendAndSave"==mode);
                    if(true==cond1 || true==cond2){
                        loadGridData(tempBoxId,"1");//Ĭ�ϵ�1ҳ

                        //ˢ�¹�����
                        onInactiveRow();
                    }
                }

                var ws = $("ws");
                ws.closeActiveTab();
            }
            request.send();
        }
    }
    /*
     *	����˵����ѡ���û�
     *	������
     *	����ֵ��
     */
    function chooseUser(){
        var returnVal = window.showModalDialog("chooseuser.htm", {title:"��ѡ���û�..."},"dialogWidth:700px;dialogHeight:500px;");
        if(null != returnVal){
            var receiver = [];
            var receiverId = [];

            for(var i=0,iLen=returnVal.length;i<iLen;i++){
                var userName = returnVal[i].userName;
                var userId = returnVal[i].userId;

                receiver[receiver.length] = userName;
                receiverId[receiverId.length] = userId;
            }

            var page1FormObj = $("page1Form");
            page1FormObj.updateDataExternal("receiver",receiver.join(","));
            page1FormObj.updateDataExternal("receiverIds",receiverId.join(","));
        }
    }



    window.onload = init;

	//�ر�ҳ���Զ�ע��
    logoutOnClose();