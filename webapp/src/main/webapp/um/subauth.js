    /*
     *	��̨��Ӧ���ݽڵ�����
     */
    XML_DEFAULT_TOOLBAR = "DefaultToolBar";
    XML_TOOLBAR = "ToolBar";
    XML_MAIN_TREE = "RuleTree";
    XML_RULE_INFO = "RuleInfo";
    XML_RULE_TO_ROLE_TREE = "Rule2RoleTree";
    XML_RULE_TO_ROLE_EXIST_TREE = "Rule2RoleExistTree";
    XML_RULE_TO_GROUP_TREE = "Rule2GroupTree";
    XML_RULE_TO_GROUP_EXIST_TREE = "Rule2GroupExistTree";
    XML_RULE_TO_USER_TREE = "Rule2UserTree";
    XML_RULE_TO_USER_EXIST_TREE = "Rule2UserExistTree";
    XML_SEARCH_PERMISSION = "SearchPermission";
    XML_RESOURCE_TYPE = "ResourceType";

    XML_GROUP_TO_USER_LIST_TREE = "Group2UserListTree";
    XML_RULE_TO_GROUP_IDS = "rule2GroupIds";
    XML_RULE_TO_USER_IDS = "rule2UserIds";
    XML_RULE_TO_ROLE_IDS = "rule2RoleIds";
    XML_OPERATION = "Operation";

    /*
     *	Ĭ��Ψһ�����ǰ׺
     */
    CACHE_GRID_ROW_DETAIL = "row__id";
    CACHE_TREE_NODE_DETAIL = "treeNode__id";
    CACHE_TREE_NODE_GRID = "treeNodeGrid__id";
    CACHE_RULE_PERMISSION = "rulePermission__id";
    CACHE_MAIN_TREE = "tree__id";
    CACHE_TOOLBAR = "toolbar__id";
    CACHE_RULE_DETAIL = "rule__id";
    CACHE_VIEW_RULE_DETAIL = "viewRule__id";
    CACHE_RULE_TO_USER_GRID = "rule2User__id";
    CACHE_SEARCH_PERMISSION = "searchPermission__id";
    /*
     *	����
     */
    OPERATION_ADD = "����\"$label\"";
    OPERATION_VIEW = "�鿴\"$label\"";
    OPERATION_DEL = "ɾ��\"$label\"";
    OPERATION_EDIT = "�༭\"$label\"";
    OPERATION_PERMISSION = "����\"$label\"Ȩ��";
    /*
     *	XMLHTTP�����ַ����
     */
    URL_INIT = "data/reassign_init.xml";
    URL_RULE_DETAIL = "data/rule1.xml";
    URL_SAVE_RULE = "data/_success.xml";
    URL_STOP_RULE = "data/_success.xml";
    URL_START_RULE = "data/_success.xml";
    URL_DEL_RULE = "data/_success.xml";
    URL_GROUP_TO_USER_LIST = "data/rule2userlist.xml";
    URL_GET_OPERATION = "data/operation.xml";

    URL_INIT = "ums/rule!getSubAuthorizeStrategys2Tree.action";
    URL_RULE_DETAIL = "ums/rule!getSubAuthorizeStrategyInfo.action";
    URL_SAVE_RULE = "ums/rule!saveSubAuthorizeStrategy.action";
    URL_STOP_RULE = "ums/rule!disable.action";
    URL_START_RULE = "ums/rule!disable.action";
    URL_DEL_RULE = "ums/rule!delete.action";
    URL_GROUP_TO_USER_LIST = "ums/role!getUsersByGroupId.action";
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
        initNaviBar("ums.4");
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
            str[str.length] = "    <button id=\"b1\" code=\"ur1\" icon=\"" + ICON + "start.gif\" label=\"����\" cmd=\"startRule()\" enable=\"'-1'!=getTreeNodeId() &amp;&amp; '1'==getRuleState()\"/>";
            str[str.length] = "    <button id=\"b2\" code=\"ur1\" icon=\"" + ICON + "stop.gif\" label=\"ͣ��\" cmd=\"stopRule()\" enable=\"'-1'!=getTreeNodeId() &amp;&amp; '0'==getRuleState()\"/>";
            str[str.length] = "    <button id=\"b3\" code=\"ur4\" icon=\"" + ICON + "view.gif\" label=\"�鿴\" cmd=\"editRuleInfo(false)\" enable=\"'-1'!=getTreeNodeId()\"/>";
            str[str.length] = "    <button id=\"b4\" code=\"ur4\" icon=\"" + ICON + "edit.gif\" label=\"�༭\" cmd=\"editRuleInfo()\" enable=\"'-1'!=getTreeNodeId()\"/>";
            str[str.length] = "    <button id=\"b5\" code=\"ur3\" icon=\"" + ICON + "del.gif\" label=\"ɾ��\" cmd=\"delRule()\" enable=\"'-1'!=getTreeNodeId()\"/>";
            str[str.length] = "    <button id=\"b6\" code=\"ur2\" icon=\"" + ICON + "new_rule.gif\" label=\"�½�ת�ڲ���\" cmd=\"addNewRule()\" enable=\"'-1'==getTreeNodeId()\"/>";
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
            label:"ͣ��",
            callback:stopRule,
            icon:ICON + "stop.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && "0"==getRuleState() && true==getOperation("ur1");}
        }
        var item2 = {
            label:"����",
            callback:startRule,
            icon:ICON + "start.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && "1"==getRuleState() && true==getOperation("ur1");}
        }
        var item3 = {
            label:"�½�ת�ڲ���",
            callback:addNewRule,
            enable:function(){return true;},
            visible:function(){return "-1"==getTreeNodeId() && true==getOperation("ur2");}
        }
        var item4 = {
            label:"ɾ��",
            callback:delRule,
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && true==getOperation("ur3");}
        }
        var item5 = {
            label:"�༭",
            callback:editRuleInfo,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && true==getOperation("ur4");}
        }
        var item6 = {
            label:"�鿴",
            callback:function(){
                editRuleInfo(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return "-1"!=getTreeNodeId() && true==getOperation("ur4");}
        }

        var treeObj = $("tree");

        var menu1 = new Menu();
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu1.addSeparator();
        menu1.addItem(item6);
        menu1.addItem(item5);
        menu1.addItem(item4);
        menu1.addSeparator();
        menu1.addItem(item3);

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
    function editRuleInfo(editable){

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
            phases[1] = {page:"page3",label:"��ɫ"};
            phases[2] = {page:"page4",label:"�û�"};
            phases[3] = {page:"page2",label:"�û���"};

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadRuleDetailData(treeNodeID,editable);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeNodeName);
                inf.SID = CACHE_VIEW_RULE_DETAIL + treeNodeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeNodeName);
                inf.SID = CACHE_RULE_DETAIL + treeNodeID;
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
    function loadRuleDetailData(treeID,editable,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_RULE_DETAIL + treeID;
        }else{
            var cacheID = CACHE_RULE_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_RULE_DETAIL;
            //���������
            if(true==isNew){
                p.setContent("isNew", "1");
            }else{
                p.setContent("strategyId", treeID);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var ruleInfoNode = this.getNodeValue(XML_RULE_INFO);
                var rule2RoleTreeNode = this.getNodeValue(XML_RULE_TO_ROLE_TREE);
                var rule2RoleExistTreeNode = this.getNodeValue(XML_RULE_TO_ROLE_EXIST_TREE);
                var rule2UserTreeNode = this.getNodeValue(XML_RULE_TO_GROUP_TREE);
                var rule2UserExistTreeNode = this.getNodeValue(XML_RULE_TO_USER_EXIST_TREE);
                var rule2GroupTreeNode = this.getNodeValue(XML_RULE_TO_GROUP_TREE);
                var rule2GroupExistTreeNode = this.getNodeValue(XML_RULE_TO_GROUP_EXIST_TREE);

                var GroupType1Node = rule2GroupTreeNode.selectSingleNode("//treeNode[@groupType='1']");
                if(null!=GroupType1Node){
                    GroupType1Node.setAttribute("canselected","0");
                }
                var GroupType2Node = rule2GroupTreeNode.selectSingleNode("//treeNode[@groupType='2']");
                if(null!=GroupType2Node){
                    GroupType2Node.setAttribute("canselected","0");
                }

                var ruleInfoNodeID = cacheID+"."+XML_RULE_INFO;
                var rule2RoleTreeNodeID = cacheID+"."+XML_RULE_TO_ROLE_TREE;
                var rule2RoleExistTreeNodeID = cacheID+"."+XML_RULE_TO_ROLE_EXIST_TREE;
                var rule2UserTreeNodeID = cacheID+"."+XML_RULE_TO_USER_TREE;
                var rule2UserExistTreeNodeID = cacheID+"."+XML_RULE_TO_USER_EXIST_TREE;
                var rule2GroupTreeNodeID = cacheID+"."+XML_RULE_TO_GROUP_TREE;
                var rule2GroupExistTreeNodeID = cacheID+"."+XML_RULE_TO_GROUP_EXIST_TREE;

                Cache.XmlIslands.add(ruleInfoNodeID,ruleInfoNode);
                Cache.XmlIslands.add(rule2RoleTreeNodeID,rule2RoleTreeNode);
                Cache.XmlIslands.add(rule2RoleExistTreeNodeID,rule2RoleExistTreeNode);
                Cache.XmlIslands.add(rule2UserTreeNodeID,rule2UserTreeNode);
                Cache.XmlIslands.add(rule2UserExistTreeNodeID,rule2UserExistTreeNode);
                Cache.XmlIslands.add(rule2GroupTreeNodeID,rule2GroupTreeNode);
                Cache.XmlIslands.add(rule2GroupExistTreeNodeID,rule2GroupExistTreeNode);

                Cache.Variables.add(cacheID,[ruleInfoNodeID,rule2RoleTreeNodeID,rule2RoleExistTreeNodeID,rule2UserTreeNodeID,rule2UserExistTreeNodeID,rule2GroupTreeNodeID,rule2GroupExistTreeNodeID]);

                initRulePages(cacheID,editable,isNew);
            }
            request.send();
        }else{
            initRulePages(cacheID,editable,isNew);
        }
    }
    /*
     *	����˵�����û������xform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function initRulePages(cacheID,editable,isNew){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadRuleInfoFormData(cacheID,editable);
        });

        var page3TreeObj = $("page3Tree");
        Public.initHTC(page3TreeObj,"isLoaded","oncomponentready",function(){
            loadRule2RoleTreeData(cacheID);
        });

        var page3Tree2Obj = $("page3Tree2");
        Public.initHTC(page3Tree2Obj,"isLoaded","oncomponentready",function(){
            loadRule2RoleExistTreeData(cacheID);
        });

        var page2TreeObj = $("page2Tree");
        Public.initHTC(page2TreeObj,"isLoaded","oncomponentready",function(){
            loadRule2GroupTreeData(cacheID);
        });

        var page2Tree2Obj = $("page2Tree2");
        Public.initHTC(page2Tree2Obj,"isLoaded","oncomponentready",function(){
            loadRule2GroupExistTreeData(cacheID);
        });

        var page4TreeObj = $("page4Tree");
        Public.initHTC(page4TreeObj,"isLoaded","oncomponentready",function(){
            loadRule2UserTreeData(cacheID);
        });

        var page4Tree2Obj = $("page4Tree2");
        Public.initHTC(page4Tree2Obj,"isLoaded","oncomponentready",function(){
            clearTreeData(page4Tree2Obj);
        });

        var page4Tree3Obj = $("page4Tree3");
        Public.initHTC(page4Tree3Obj,"isLoaded","oncomponentready",function(){
            loadRule2UserExistTreeData(cacheID);
        });

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page2BtPrevObj = $("page2BtPrev");
        var page4BtPrevObj = $("page4BtPrev");
        var page1BtNextObj = $("page1BtNext");
        var page2BtNextObj = $("page2BtNext");
        var page4BtNextObj = $("page4BtNext");
        page1BtPrevObj.style.display = "none";
        page4BtPrevObj.style.display = "";
        page2BtPrevObj.style.display = "";
        page1BtNextObj.style.display = "";
        page4BtNextObj.style.display = "";
        page2BtNextObj.style.display = "none";

        //��������
        var page2BtSearchObj = $("page2BtSearch");
        var page2KeywordObj = $("page2Keyword");
        attachSearchTree(page2TreeObj,page2BtSearchObj,page2KeywordObj);

        //��������
        var page4BtSearchObj = $("page4BtSearch");
        var page4KeywordObj = $("page4Keyword");
        attachSearchTree(page4TreeObj,page4BtSearchObj,page4KeywordObj);

        //��������
        var page4BtSearch2Obj = $("page4BtSearch2");
        var page4Keyword2Obj = $("page4Keyword2");
        attachSearchTree(page4Tree2Obj,page4BtSearch2Obj,page4Keyword2Obj);

        //��������
        var page3BtSearchObj = $("page3BtSearch");
        var page3KeywordObj = $("page3Keyword");
        attachSearchTree(page3TreeObj,page3BtSearchObj,page3KeywordObj);

        //������Ӱ�ť����
        var page3BtAddObj = $("page3BtAdd");
        page3BtAddObj.disabled = editable==false?true:false;
        page3BtAddObj.onclick = function(){
            addPage3TreeNode();
        }

        //����ɾ����ť����
        var page3BtDelObj = $("page3BtDel");
        page3BtDelObj.disabled = editable==false?true:false;
        page3BtDelObj.onclick = function(){
            delPage3TreeNode();
        }

        //������Ӱ�ť����
        var page2BtAddObj = $("page2BtAdd");
        page2BtAddObj.disabled = editable==false?true:false;
        page2BtAddObj.onclick = function(){
            addPage2TreeNode();
        }

        //����ɾ����ť����
        var page2BtDelObj = $("page2BtDel");
        page2BtDelObj.disabled = editable==false?true:false;
        page2BtDelObj.onclick = function(){
            delPage2TreeNode();
        }

        //������Ӱ�ť����
        var page4BtAddObj = $("page4BtAdd");
        page4BtAddObj.disabled = editable==false?true:false;
        page4BtAddObj.onclick = function(){
             addPage4TreeNode();
        }

        //����ɾ����ť����
        var page4BtDelObj = $("page4BtDel");
        page4BtDelObj.disabled = editable==false?true:false;
        page4BtDelObj.onclick = function(){
             delPage4TreeNode();
        }

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        var page2BtSaveObj = $("page2BtSave");
        var page3BtSaveObj = $("page3BtSave");
        var page4BtSaveObj = $("page4BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page2BtSaveObj.disabled = editable==false?true:false;
        page3BtSaveObj.disabled = editable==false?true:false;
        page4BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = page2BtSaveObj.onclick = page3BtSaveObj.onclick = page4BtSaveObj.onclick = function(){
            saveRule(cacheID,isNew);
        }
    }
    /*
     *	����˵����������Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadRuleInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_RULE_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵����ת�ڽ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadRule2RoleTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_ROLE_TREE);
        if(null!=xmlIsland){
            var page3TreeObj = $("page3Tree");
            page3TreeObj.load(xmlIsland.node);
            page3TreeObj.research = true;
        }
    }
    /*
     *	����˵����ת�ڽ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadRule2RoleExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_ROLE_EXIST_TREE);
        if(null!=xmlIsland){
            var page3Tree2Obj = $("page3Tree2");
            page3Tree2Obj.load(xmlIsland.node);
        }
    }
    /*
     *	����˵����ת�ڸ��û���tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadRule2GroupTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_GROUP_TREE);
        if(null!=xmlIsland){
            var page2TreeObj = $("page2Tree");
            page2TreeObj.load(xmlIsland.node);
            page2TreeObj.research = true;
        }
    }
    /*
     *	����˵����ת�ڸ��û���tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadRule2GroupExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_GROUP_EXIST_TREE);
        if(null!=xmlIsland){
            var page2Tree2Obj = $("page2Tree2");
            page2Tree2Obj.load(xmlIsland.node);
        }
    }
    /*
     *	����˵����ת�ڸ��û�tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadRule2UserTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_USER_TREE);
        if(null!=xmlIsland){
            var page4TreeObj = $("page4Tree");
            page4TreeObj.load(xmlIsland.node);
            page4TreeObj.research = true;

            page4TreeObj.onTreeNodeDoubleClick = function(eventObj){
                onPage4TreeNodeDoubleClick(eventObj);
            }
        }
    }
    /*
     *	����˵����ת�ڸ��û�tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadRule2UserExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_USER_EXIST_TREE);
        if(null!=xmlIsland){
            var page4Tree3Obj = $("page4Tree3");
            page4Tree3Obj.load(xmlIsland.node);
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
                editRuleInfo(canEdit);
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
     *	����˵�������ҳ4�û������ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onPage4TreeNodeDoubleClick(eventObj){
        var treeObj = $("page4Tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            initPage4Tree2(id);
        }
    }
    /*
     *	����˵����page4Tree2��ʼ��
     *	������	string:id   ������ڵ�id
     *	����ֵ��
     */
    function initPage4Tree2(id){
        var page4Tree2Obj = $("page4Tree2");
        Public.initHTC(page4Tree2Obj,"isLoaded","onload",function(){
            loadPage4Tree2Data(id);
        });
    }
    /*
     *	����˵����tree��������
     *	������	string:treeID   ������ڵ�id
     *	����ֵ��
     */
    function loadPage4Tree2Data(treeID){
        var cacheID = CACHE_RULE_TO_USER_GRID + treeID;
        var treeGrid = Cache.Variables.get(cacheID);
//        if(null==treeGrid){
            var p = new HttpRequestParams();
            p.url = URL_GROUP_TO_USER_LIST;
			p.setContent("groupId", treeID);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var sourceListNode = this.getNodeValue(XML_GROUP_TO_USER_LIST_TREE);

                var sourceListNodeID = cacheID+"."+XML_GROUP_TO_USER_LIST_TREE;

                Cache.XmlIslands.add(sourceListNodeID,sourceListNode);
                Cache.Variables.add(cacheID,sourceListNodeID);

                loadPage4Tree2DataFromCache(cacheID);
            }
            request.send();
//        }else{        
//            loadPage4Tree2DataFromCache(cacheID);
//        }
    }
    /*
     *	����˵����tree�ӻ����������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadPage4Tree2DataFromCache(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_USER_LIST_TREE);
        if(null!=xmlIsland){
            var page4Tree2Obj = $("page4Tree2");
            page4Tree2Obj.load(xmlIsland.node);
            page4Tree2Obj.research = true;
        }
    }
    /*
     *	����˵�����������
     *	������	string:cacheID      ��������ID
     *	����ֵ��
     */
    function saveRule(cacheID,isNew){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_RULE;
        
        var groupCache = Cache.Variables.get(cacheID);
        if(null!=groupCache){
        
            //���Ի�����Ϣ
            var ruleInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_RULE_INFO);
            if(null!=ruleInfoNode){
                var ruleInfoDataNode = ruleInfoNode.selectSingleNode(".//data");
                if(null!=ruleInfoDataNode){
                    flag = true;
                    
                    var prefix = ruleInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(ruleInfoDataNode,prefix);
                }
            }


            //ת�ڽ�ɫ
            var rule2RoleNode = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_ROLE_EXIST_TREE);
            if(null!=rule2RoleNode){
                var rule2RoleDataIDs = getTreeNodeIds(rule2RoleNode,"./treeNode//treeNode");
                if(0<rule2RoleDataIDs.length){
                    flag = true;
                    p.setContent(XML_RULE_TO_ROLE_IDS,rule2RoleDataIDs.join(","));
                }
            }


            //ת�ڸ��û�
            var rule2UserNode = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_USER_EXIST_TREE);
            if(null!=rule2UserNode){
                var rule2UserDataIDs = getTreeNodeIds(rule2UserNode,"./treeNode//treeNode");
                if(0<rule2UserDataIDs.length){
                    flag = true;
                    p.setContent(XML_RULE_TO_USER_IDS,rule2UserDataIDs.join(","));
                }
            }


            //ת�ڸ��û���
            var rule2GroupNode = Cache.XmlIslands.get(cacheID+"."+XML_RULE_TO_GROUP_EXIST_TREE);
            if(null!=rule2GroupNode){
                var rule2GroupDataIDs = getTreeNodeIds(rule2GroupNode,"./treeNode//treeNode");
                if(0<rule2GroupDataIDs.length){
                    flag = true;
                    p.setContent(XML_RULE_TO_GROUP_IDS,rule2GroupDataIDs.join(","));
                }
            }
        
        
        }

        if(true==flag){
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            var page1BtSaveObj = $("page1BtSave");
            var page2BtSaveObj = $("page2BtSave");
            var page3BtSaveObj = $("page3BtSave");
            var page4BtSaveObj = $("page4BtSave");
            syncButton([page1BtSaveObj,page2BtSaveObj,page3BtSaveObj,page4BtSaveObj],request);

            request.onsuccess = function(){
                //�������
                detachReminder(cacheID);

                loadInitData();

                if(true==isNew){
                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
			/*
            request.onresult = function(){
                if(true==isNew){
                    var treeNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
                    appendTreeNode("_rootId",treeNode);

                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.onsuccess = function(){
                if(true!=isNew){
                    //�������ڵ�����
                    var id = cacheID.trim(CACHE_RULE_DETAIL);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
			*/
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
     *	����˵������ȡ����״̬
     *	������	
     *	����ֵ��
     */
    function getRuleState(){
        return getTreeAttribute("disabled");
    }
    /*
     *	����˵����ͣ�ò���
     *	������	
     *	����ֵ��
     */
    function stopRule(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();

            var p = new HttpRequestParams();
            p.url = URL_STOP_RULE;
            p.setContent("strategyId",treeNodeID);
            p.setContent("disabled","1");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //����ͣ��״̬
                refreshTreeNodeState(treeNode,"1");
                treeObj.reload();

                //ˢ�¹�����
                loadToolBarData(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵�������ò���
     *	������	
     *	����ֵ��
     */
    function startRule(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();

            var p = new HttpRequestParams();
            p.url = URL_START_RULE;
            p.setContent("strategyId",treeNodeID);
            p.setContent("disabled","0");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //����ͣ��״̬
                refreshTreeNodeState(treeNode,"0");
                treeObj.reload();

                //ˢ�¹�����
                loadToolBarData(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵�����½�����
     *	������	
     *	����ֵ��
     */
    function addNewRule(){
        var userName = "����";
        var userID = new Date().valueOf();

        var phases = [];
        phases[0] = {page:"page1",label:"������Ϣ"};
        phases[1] = {page:"page3",label:"��ɫ"};
        phases[2] = {page:"page4",label:"�û�"};
        phases[3] = {page:"page2",label:"�û���"};

        var callback = {};
        callback.onTabClose = function(eventObj){
            delCacheData(eventObj.tab.SID);
        };
        callback.onTabChange = function(){
            setTimeout(function(){
                loadRuleDetailData(userID,true,true);
            },TIMEOUT_TAB_CHANGE);
        };

        var inf = {};
        inf.defaultPage = "page1";
        inf.label = OPERATION_ADD.replace(/\$label/i,userName);
        inf.phases = phases;
        inf.callback = callback;
        inf.SID = CACHE_RULE_DETAIL + userID;
        var tab = ws.open(inf);
    }
    /*
     *	����˵����ɾ������
     *	������	
     *	����ֵ��
     */
    function delRule(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();

            var p = new HttpRequestParams();
            p.url = URL_DEL_RULE;
            p.setContent("strategyId",treeNodeID);

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
     *	����˵����ɾ��page3��tree�ڵ�
     *	������	
     *	����ֵ��
     */
    function delPage3TreeNode(){
        removeTreeNode($("page3Tree2"));
    }
    /*
     *	����˵�������page3��tree�ڵ�
     *	������	
     *	����ֵ��
     */
    function addPage3TreeNode(){
        var page3Tree2Obj = $("page3Tree2");
        var page3TreeObj = $("page3Tree");
        var selectedNodes = page3TreeObj.getSelectedTreeNode();

        var reload = false;
        for(var i=0,iLen=selectedNodes.length;i<iLen;i++){
            var curNode = selectedNodes[i];
            curNode.setSelectedState(0,true,true);

            var groupName = curNode.getName();
            var id = curNode.getId();

            var sameAttributeTreeNode = hasSameAttributeTreeNode(page3Tree2Obj,"id",id);
            if(false==sameAttributeTreeNode){
                //������һ����Ӳ�ˢ��grid
                reload = true;

                var treeNode = page3Tree2Obj.getTreeNodeById("_rootId");
                if(null!=treeNode){
                    //�ų��ӽڵ�
                    var cloneNode = new XmlNode(curNode.node).cloneNode(false);
                    page3Tree2Obj.insertTreeNodeXml(cloneNode.toXml(),treeNode);
                }
            }
        }
        if(true==reload){
            page3Tree2Obj.reload();
        }
        page3TreeObj.reload();
    }
    /*
     *	����˵����ɾ��page2��tree�ڵ�
     *	������	
     *	����ֵ��
     */
    function delPage2TreeNode(){
        removeTreeNode($("page2Tree2"));
    }
    /*
     *	����˵�������page2��tree�ڵ�
     *	������	
     *	����ֵ��
     */
    function addPage2TreeNode(){
        var page2Tree2Obj = $("page2Tree2");
        var page2TreeObj = $("page2Tree");
        var selectedNodes = page2TreeObj.getSelectedTreeNode();

        var reload = false;
        for(var i=0,iLen=selectedNodes.length;i<iLen;i++){
            var curNode = selectedNodes[i];
            curNode.setSelectedState(0,true,true);

            var groupName = curNode.getName();
            var id = curNode.getId();

            var sameAttributeTreeNode = hasSameAttributeTreeNode(page2Tree2Obj,"id",id);
            if(false==sameAttributeTreeNode){
                //������һ����Ӳ�ˢ��grid
                reload = true;

                var treeNode = page2Tree2Obj.getTreeNodeById("_rootId");
                if(null!=treeNode){
                    //�ų��ӽڵ�
                    var cloneNode = new XmlNode(curNode.node).cloneNode(false);
                    page2Tree2Obj.insertTreeNodeXml(cloneNode.toXml(),treeNode);
                }
            }
        }
        if(true==reload){
            page2Tree2Obj.reload();
        }
        page2TreeObj.reload();
    }
    /*
     *	����˵����ɾ��page4��tree�ڵ�
     *	������	
     *	����ֵ��
     */
    function delPage4TreeNode(){
        removeTreeNode($("page4Tree3"));
    }
    /*
     *	����˵�������page4��tree�ڵ�
     *	������	
     *	����ֵ��
     */
    function addPage4TreeNode(){
        var page4Tree2Obj = $("page4Tree2");
        var page4Tree3Obj = $("page4Tree3");
        var selectedNodes = page4Tree2Obj.getSelectedTreeNode();

        var reload = false;
        for(var i=0,iLen=selectedNodes.length;i<iLen;i++){
            var curNode = selectedNodes[i];
            curNode.setSelectedState(0,true,true);

            var groupName = curNode.getName();
            var id = curNode.getId();

            var sameAttributeTreeNode = hasSameAttributeTreeNode(page4Tree3Obj,"id",id);
            if("_rootId"!=id && false==sameAttributeTreeNode){
                //������һ����Ӳ�ˢ��grid
                reload = true;

                var treeNode = page4Tree3Obj.getTreeNodeById("_rootId");
                if(null!=treeNode){
                    //�ų��ӽڵ�
                    var cloneNode = new XmlNode(curNode.node).cloneNode(false);
                    page4Tree3Obj.insertTreeNodeXml(cloneNode.toXml(),treeNode);
                }
            }
        }
        if(true==reload){
            page4Tree3Obj.reload();
        }
        page4Tree2Obj.reload();
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
     *	����˵����ˢ�����ڵ�ͣ������״̬
     *	������	treeNode:treeNode       treeNodeʵ��
                string:state            ͣ/����״̬
     *	����ֵ��
     */
    function refreshTreeNodeState(treeNode,state){
        treeNode.setAttribute("disabled",state);
        treeNode.setAttribute("icon",ICON + "rule"+(state=="0"?"":"_2")+".gif");       
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