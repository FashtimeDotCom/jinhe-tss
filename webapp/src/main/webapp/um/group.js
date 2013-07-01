    /*
     *	��̨��Ӧ���ݽڵ�����
     */
    XML_MAIN_TREE = "GroupTree";
    XML_USER_LIST = "SourceList";
    XML_GRID_SEARCH = "GridSearch";
    XML_SEARCH_USER = "SearchUserList";
    XML_OPERATION = "Operation";
    XML_PAGE_LIST = "PageList";

    XML_USER_INFO = "UserInfo";
    XML_AUTHENTICATE_INFO = "AuthenticateInfo";
    XML_USER_TO_GROUP_TREE = "User2GroupTree";
    XML_USER_TO_GROUP_EXIST_TREE = "User2GroupExistTree";
    XML_USER_TO_ROLE_TREE = "User2RoleTree";
    XML_USER_TO_ROLE_EXIST_TREE = "User2RoleExistTree";

    XML_GROUP_INFO = "GroupInfo";
    XML_GROUP_TO_USER_TREE = "Group2UserTree";
    XML_GROUP_TO_USER_LIST_TREE = "Group2UserListTree";
    XML_GROUP_TO_USER_EXIST_TREE = "Group2UserExistTree";
    XML_GROUP_TO_ROLE_TREE = "Group2RoleTree";
    XML_GROUP_TO_ROLE_EXIST_TREE = "Group2RoleExistTree";

    XML_AUTO_MAPPING = "AutoMapping";
    XML_MANUAL_MAPPING = "ManualMapping";
    XML_SEARCH_MANUAL_MAPPING = "SearchManualMapping";

    XML_GENERAL_SEARCH_MAPPING = "GeneralSearchMappingGrid";
    XML_GENERAL_SEARCH_SYNC = "GeneralSearchSyncGrid";
    XML_GENERAL_SEARCH_PERMISSION = "GeneralSearchPermissionInfo";
    XML_GENERAL_SEARCH_PERMISSION_LIST = "GeneralSearchPermissionList";
    XML_GENERAL_SEARCH_REASSIGN = "GeneralSearchUserStrategyInfoGrid";
    XML_GENERAL_SEARCH_ROLE = "GeneralSearchRoleGrid";

    XML_RESOURCE_TYPE = "ResourceType";
    XML_APPLICATION_DETAIL = "AppDetail";

    XML_SECURITY_LEVEL = "SecurityLevel";
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
    CACHE_AUTO_MAPPING = "autoMapping__id";
    CACHE_MANUAL_MAPPING = "manualMapping__id";
    CACHE_GROUP_TO_USER_GRID = "group2User__id";
    CACHE_SEARCH_USER = "searchUser__id";
    CACHE_GENERAL_SEARCH_MAPPING = "generalSearchMapping__id";
    CACHE_GENERAL_SEARCH_SYNC = "generalSearchSync__id";
    CACHE_GENERAL_SEARCH_PERMISSION = "generalSearchPermission__id";
    CACHE_GENERAL_SEARCH_PERMISSION_LIST = "generalSearchPermissionList__id";
    CACHE_GENERAL_SEARCH_REASSIGN = "generalSearchReassign__id";
    CACHE_GENERAL_SEARCH_ROLE = "generalSearchRole__id";
    CACHE_APPLICATION_DETAIL = "app__id";
    CACHE_VIEW_APPLICATION_DETAIL = "viewApp__id";
    /*
     *	����
     */
    OPERATION_ADD = "�½�$label";
    OPERATION_VIEW = "�鿴\"$label\"";
    OPERATION_DEL = "ɾ��\"$label\"";
    OPERATION_EDIT = "�༭\"$label\"";
    OPERATION_AUTO_MAPPING = "ģ����Ӧ\"$label\"";
    OPERATION_MANUAL_MAPPING = "�ֹ���Ӧ\"$label\"";
    OPERATION_SEARCH = "��ѯ\"$label\"";
    /*
     *	XMLHTTP�����ַ����
     */
    URL_INIT = "data/group_init.xml";
    URL_USER_LIST = "data/grid.xml";
    URL_USER_DETAIL = "data/user1.xml";
    URL_GROUP_DETAIL = "data/group1.xml";
    URL_USER_SEARCH = "data/gridsearch.xml";
    URL_SAVE_USER = "data/_success.xml";
    URL_SAVE_GROUP = "data/_success.xml";
    URL_GROUP_TO_USER_SEARCH = "data/usersearch.xml";
    URL_DEL_GROUP = "data/_success.xml";
    URL_MOVE_USER = "data/_success.xml";
    URL_MOVE_GROUP = "data/_success.xml";
    URL_START_GROUP = "data/_success.xml";
    URL_STOP_GROUP = "data/_success.xml";
    URL_SORT_GROUP = "data/_success.xml";
    URL_STOP_USER = "data/_success.xml";
    URL_START_USER = "data/_success.xml";
    URL_SORT_USER = "data/_success.xml";
    URL_SORT_USER_CROSS_PAGE = "data/_success.xml";
    URL_SYNC_GROUP = "data/progress.xml";
    URL_SYNC_PROGRESS = "data/progress.xml";
    URL_CANCEL_SYNC_PROGRESS = "data/_success.xml";
    URL_COPY_GROUP = "data/_success.xml";
    URL_AUTO_MAPPING = "data/automapping1.xml";
    URL_SAVE_AUTO_MAPPING = "data/_success.xml";
    URL_MANUAL_MAPPING = "data/manualmapping1.xml";
    URL_SAVE_MANUAL_MAPPING = "data/_success.xml";
    URL_SEARCH_MANUAL_MAPPING = "data/searchmanualmapping1.xml";
    URL_GROUP_TO_USER_LIST = "data/userlist.xml";
    URL_DEL_USER = "data/_success.xml";
    URL_SEARCH_USER = "data/grid.xml";
    URL_RESET_PASSWORD = "data/_success.xml";
    URL_GET_OPERATION = "data/operation.xml";
    URL_GET_USER_OPERATION = "data/operation.xml";
    URL_SET_AUTHENTICATE_METHOD = "data/_success.xml";
    URL_GENERAL_SEARCH_MAPPING = "data/group_general_search.xml";
    URL_GENERAL_SEARCH_SYNC = "data/group_general_search.xml";
    URL_GENERAL_SEARCH_PERMISSION = "data/group_general_search.xml";
    URL_GENERAL_SEARCH_GET_RESOURCETYPES = "data/resourcetype.xml";
    URL_GENERAL_SEARCH_PERMISSION_LIST = "data/group_general_search.xml";
    URL_GENERAL_SEARCH_REASSIGN = "data/group_general_search.xml";
    URL_GENERAL_SEARCH_ROLE = "data/group_general_search.xml";
    URL_AUTHENTICATE_GROUP = "data/_success.xml";
    URL_APPLICATION_DETAIL = "data/application.xml";
    URL_SAVE_APPLICATION = "data/_success.xml";
    URL_DEL_APPLICATION = "data/_success.xml";
    URL_SORT_APPLICATION = "data/_success.xml";
    URL_SYNC_USER = "data/_success.xml";
	URL_IMPORT_GROUP = "data/progress.xml";
    URL_IMPORT_PROGRESS = "data/progress.xml";
    URL_CANCEL_IMPORT_PROGRESS = "data/_success.xml";
    URL_CHECK_PASSWORD = "data/password_check.xml";
    URL_CHECK_GROUP_PASSWORD = "data/password_check.xml";
    URL_SET_GROUP_PASSWORD_TACTIC = "data/_success.xml";
    URL_SET_USER_PASSWORD_TACTIC = "data/_success.xml";

    URL_INIT = "ums/group!getAllGroup2Tree.action";
    URL_USER_LIST = "ums/user!getUsersByGroupId.action";
    URL_USER_DETAIL = "ums/user!getUserInfoAndRelation.action";
    URL_GROUP_DETAIL = "ums/group!getGroupInfoAndRelation.action";
    URL_USER_SEARCH = "data/gridsearch.xml";
    URL_SAVE_USER = "ums/user!saveUser.action";
    URL_SAVE_GROUP = "ums/group!editGroup.action";
    URL_GROUP_TO_USER_SEARCH = "data/usersearch.xml";
    URL_DEL_GROUP = "ums/group!deleteGroup.action";
    URL_MOVE_USER = "ums/user!moveUser.action";
    URL_MOVE_GROUP = "ums/group!moveGroup.action";
    URL_START_GROUP = "ums/group!startOrStopGroup.action";
    URL_STOP_GROUP = "ums/group!startOrStopGroup.action";
    URL_SORT_GROUP = "ums/group!sortGroup.action";
    URL_STOP_USER = "ums/user!startOrStopUser.action";
    URL_START_USER = "ums/user!startOrStopUser.action";
    URL_SORT_USER = "ums/user!sortUser.action";
    URL_SORT_USER_CROSS_PAGE = "ums/user!sortUserCrossPage.action";
    URL_SYNC_GROUP = "ums/syncdata!syncData.action";
    URL_SYNC_PROGRESS = "ums/syncdata!getProgress.action";
    URL_CANCEL_SYNC_PROGRESS = "ums/syncdata!doConceal.action";
    URL_COPY_GROUP = "ums/group!copyGroup.action";
    URL_AUTO_MAPPING = "ums/user!getAutoMappingInfo.action";
    URL_SAVE_AUTO_MAPPING = "ums/user!editAutoMappingInfo.action";
    URL_MANUAL_MAPPING = "ums/user!getManualMappingInfo.action";
    URL_SAVE_MANUAL_MAPPING = "ums/user!editManualMappingInfo.action";
    URL_SEARCH_MANUAL_MAPPING = "ums/user!searchMappingUser.action";
    URL_GROUP_TO_USER_LIST = "ums/user!getSelectedUsersByGroupId.action";
    URL_DEL_USER = "ums/user!deleteUser.action";
    URL_SEARCH_USER = "ums/user!searchUser.action";
    URL_RESET_PASSWORD = "ums/user!initPassword.action";
    URL_GET_OPERATION = "ums/group!getOperation.action";
    URL_GET_USER_OPERATION = "ums/user!getOperation.action";
    URL_SET_AUTHENTICATE_METHOD = "ums/user!uniteAuthenticateMethod.action";
    URL_GENERAL_SEARCH_MAPPING = "ums/generalSearch!searchMapping.action";
    URL_GENERAL_SEARCH_SYNC = "ums/generalSearch!searchUsersByGroup.action";
    URL_GENERAL_SEARCH_PERMISSION = "ums/generalSearch!getAllApplications.action";
    URL_GENERAL_SEARCH_GET_RESOURCETYPES = "ums/generalSearch!getResourceTypes.action";
    URL_GENERAL_SEARCH_PERMISSION_LIST = "ums/generalSearch!searchPermission.action";
    URL_GENERAL_SEARCH_REASSIGN = "ums/generalSearch!searchUserStrategyInfo.action";
    URL_GENERAL_SEARCH_ROLE = "ums/generalSearch!searchRolesInfo.action";
    URL_AUTHENTICATE_GROUP = "data/_success.xml";
    URL_APPLICATION_DETAIL = "ums/appResource!getApplicationInfo.action";
    URL_SAVE_APPLICATION = "ums/appResource!editApplication.action";
    URL_DEL_APPLICATION = "ums/appResource!deleteApplication.action";
    URL_SORT_APPLICATION = "ums/appResource!sortApplication.action";
    URL_SYNC_USER = "ums/syncdata!syncUser.action";
    URL_IMPORT_GROUP = "ums/group!importGroup.action";
	URL_IMPORT_USER = "ums/user!importUser.action";
    URL_IMPORT_PROGRESS = "ums/group!getProgress.action";
    URL_CANCEL_IMPORT_PROGRESS = "ums/group!doConceal.action";
    URL_CHECK_PASSWORD = "ums/passwordrule!getStrengthLevel.action";
    URL_CHECK_GROUP_PASSWORD = "ums/passwordrule!getGroupStrengthLevel.action";
    URL_SET_GROUP_PASSWORD_TACTIC = "ums/group!setPasswordRule.action";
    URL_SET_USER_PASSWORD_TACTIC = "ums/user!setPasswordRule.action";
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
        initToolBar();
        initNaviBar("ums.1");
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

            //�û���
            str[str.length] = "    <button id=\"b1\" code=\"7\" icon=\"" + ICON + "start.gif\" label=\"����\" cmd=\"startGroup()\" enable=\"'1'==getGroupState() &amp;&amp; true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b2\" code=\"7t\" icon=\"" + ICON + "stop.gif\" label=\"ͣ��\" cmd=\"stopGroup()\" enable=\"'0'==getGroupState() &amp;&amp; true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b3\" code=\"5\" icon=\"" + ICON + "view.gif\" label=\"�鿴\" cmd=\"editTreeNode(false)\" enable=\"true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b4\" code=\"4\" icon=\"" + ICON + "edit.gif\" label=\"�༭\" cmd=\"editTreeNode()\" enable=\"true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b5\" code=\"3\" icon=\"" + ICON + "del.gif\" label=\"ɾ��\" cmd=\"delTreeNode()\" enable=\"true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b6\" code=\"13\" icon=\"" + ICON + "copy.gif\" label=\"����\" cmd=\"copyGroup()\" enable=\"true!=isRootNode() &amp;&amp; '5'!=getResourceTypeId()\"/>";
            str[str.length] = "    <button id=\"b7\" code=\"5\" icon=\"" + ICON + "copy_to.gif\" label=\"���Ƶ�...\" cmd=\"copyGroupTo()\" enable=\"true!=isRootNode() &amp;&amp; '5'!=getResourceTypeId()\"/>";
            str[str.length] = "    <button id=\"b8\" code=\"3\" icon=\"" + ICON + "move.gif\" label=\"�ƶ���...\" cmd=\"moveGroupTo()\" enable=\"true!=isRootNode() &amp;&amp; '5'!=getResourceTypeId()\"/>";
            str[str.length] = "    <button id=\"b20\" code=\"1\" icon=\"" + ICON + "import_user.gif\" label=\"�û����뵽...\" cmd=\"importGroupTo()\" enable=\"true!=isRootNode() &amp;&amp; '5'!=getResourceTypeId() &amp;&amp; '3'==getGroupType()\"/>";
            str[str.length] = "    <button id=\"b9\" code=\"1\" icon=\"" + ICON + "new_user.gif\" label=\"�½��û�\" cmd=\"addNewUser()\" enable=\"true!=isRootNode() &amp;&amp; '5'!=getResourceTypeId()\"/>";
            str[str.length] = "    <button id=\"b10\" code=\"2\" icon=\"" + ICON + "new_user_group.gif\" label=\"�½��û���\" cmd=\"addNewGroup()\" enable=\"true!=isSelfRegisterNode() &amp;&amp; true!=isOtherGroup()\"/>";
            str[str.length] = "    <button id=\"b11\" code=\"2\" icon=\"" + ICON + "new_app.gif\" label=\"�½�Ӧ��\" cmd=\"addApplication()\" enable=\"'-4'==getTreeId()\"/>";
            str[str.length] = "    <button id=\"b12\" code=\"6\" icon=\"" + ICON + "view_list.gif\" label=\"����û�\" cmd=\"showUserList()\" enable=\"null==getAppType() &amp;&amp; '5'!=getResourceTypeId() &amp;&amp; (true!=isRootNode() || '-8'==getTreeId() || '-9'==getTreeId())\"/>";
            str[str.length] = "    <button id=\"b13\" code=\"10\" icon=\"" + ICON + "search.gif\" label=\"�����û�\" cmd=\"searchUser()\" enable=\"'5'!=getResourceTypeId()\"/>";
            str[str.length] = "    <button id=\"b14\" code=\"11\" icon=\"" + ICON + "init_password.gif\" label=\"��ʼ������\" cmd=\"resetPassword()\" enable=\"null==getAppType() &amp;&amp; true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b15\" code=\"15\" icon=\"" + ICON + "sync.gif\" label=\"��ȫͬ��\" cmd=\"syncGroup('1')\" enable=\"null==getAppType() &amp;&amp; true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b16\" code=\"16\" icon=\"" + ICON + "auto_mapping.gif\" label=\"ģ����Ӧ\" cmd=\"autoMappingGroup()\" enable=\"null==getAppType() &amp;&amp; true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b17\" code=\"12\" icon=\"" + ICON + "authenticate.gif\" label=\"������֤��ʽ\" cmd=\"setAuthenticateMethod()\" enable=\"null==getAppType() &amp;&amp; true!=isRootNode()\"/>";
            str[str.length] = "    <button id=\"b18\" code=\"ug17\" icon=\"" + ICON + "authenticate.gif\" label=\"��֤\" cmd=\"authenticateGroup()\" enable=\"true!=isRootNode()\"/>";

            //�û�
            str[str.length] = "    <button id=\"c1\" code=\"u4\" icon=\"" + ICON + "start.gif\" label=\"����\" cmd=\"startUser()\" enable=\"'1'==getUserState()\"/>";
            str[str.length] = "    <button id=\"c2\" code=\"u5\" icon=\"" + ICON + "stop.gif\" label=\"ͣ��\" cmd=\"stopUser()\" enable=\"'0'==getUserState()\"/>";
            str[str.length] = "    <button id=\"c3\" code=\"u3\" icon=\"" + ICON + "view.gif\" label=\"�鿴\" cmd=\"editUserInfo(false)\" enable=\"true\"/>";
            str[str.length] = "    <button id=\"c4\" code=\"u2\" icon=\"" + ICON + "edit.gif\" label=\"�༭\" cmd=\"editUserInfo()\" enable=\"true\"/>";
            str[str.length] = "    <button id=\"c5\" code=\"u1\" icon=\"" + ICON + "del.gif\" label=\"ɾ��\" cmd=\"delUser()\" enable=\"true\"/>";
            str[str.length] = "    <button id=\"c6\" code=\"u1\" icon=\"" + ICON + "move.gif\" label=\"�ƶ���...\" cmd=\"moveUserTo()\" enable=\"true\"/>";
            str[str.length] = "    <button id=\"c7\" code=\"u5\" icon=\"" + ICON + "down.gif\" label=\"����\" cmd=\"moveUserDown()\" enable=\"true==canMoveUserDown()\"/>";
            str[str.length] = "    <button id=\"c8\" code=\"u5\" icon=\"" + ICON + "up.gif\" label=\"����\" cmd=\"moveUserUp()\" enable=\"true==canMoveUserUp()\"/>";
            str[str.length] = "    <button id=\"c9\" code=\"u6\" icon=\"" + ICON + "manual_mapping.gif\" label=\"�û���Ӧ\" cmd=\"manualMappingUser()\" enable=\"true==isOtherUser()\"/>";
            str[str.length] = "    <button id=\"c10\" code=\"u15\" icon=\"" + ICON + "sync.gif\" label=\"�û�ͬ��\" cmd=\"syncUser()\" enable=\"true==isOtherUser()\"/>";
            str[str.length] = "    <button id=\"c11\" code=\"u3\" icon=\"" + ICON + "import_user.gif\" label=\"�û����뵽\" cmd=\"importUserTo()\" enable=\"true==isOtherUser()\"/>";
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
            label:"ͣ��",
            callback:stopGroup,
            icon:ICON + "stop.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && true==getOperation("7t") && "0"==getGroupState();}
        }
        var item2 = {
            label:"����",
            callback:startGroup,
            icon:ICON + "start.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && true==getOperation("7") && "1"==getGroupState();}
        }
        var item3 = {
            label:"�༭",
            callback:editTreeNode,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "3"!=getGroupType() && true==getOperation("4");}
        }
        var item4 = {
            label:"ɾ��",
            callback:delTreeNode,
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "3"!=getGroupType() && true==getOperation("3");}
        }
        var item5 = {
            label:"����",
            callback:copyGroup,
            icon:ICON + "copy.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && "3"!=getGroupType() && true==getOperation("13");}
        }
        var item6 = {
            label:"���Ƶ�...",
            callback:copyGroupTo,
            icon:ICON + "copy_to.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && "3"!=getGroupType() && true==getOperation("5");}
        }
        var item7 = {
            label:"�ƶ���...",
            callback:moveGroupTo,
            icon:ICON + "move.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && "3"!=getGroupType() && true==getOperation("3");}
        }
        var item8 = {
            label:"�½��û���",
            callback:addNewGroup,
            enable:function(){return true;},
            visible:function(){return true!=isSelfRegisterNode() && "3"!=getGroupType() && true!=isOtherGroup() && true==getOperation("2");}
        }
        var item9 = {
            label:"�½��û�",
            callback:addNewUser,
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && "3"!=getGroupType() && true==getOperation("1");}
        }
        var item10 = {
            label:"����û�",
            callback:showUserList,
            icon:ICON + "view_list.gif",
            enable:function(){return true;},
            visible:function(){return null==getAppType() && "5"!=getResourceTypeId() && true==getOperation("6")&& (true!=isRootNode() || '-8'==getTreeId() || '-9'==getTreeId())}
        }
        var item11 = {
            label:"�����û�...",
            callback:searchUser,
            icon:ICON + "search.gif",
            enable:function(){return true;},
            visible:function(){return "5"!=getResourceTypeId() && true==getOperation("10");}
        }


        var item12 = {
            label:"�߼�����",
            callback:null,
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId();}
        }

        //�߼�����
        var subitem12_1 = {
            label:"��ʼ������...",
            callback:resetPassword,
            icon:ICON + "init_password.gif",
            enable:function(){return true;},
            visible:function(){return null==getAppType() && true!=isRootNode() && true==getOperation("11");}
        }
        var subitem12_2 = {
            label:"�����������...",
            callback:function(){
                setPasswordTactic("group");
            },
            enable:function(){return true;},
            visible:function(){return null==getAppType() && true!=isRootNode() && true==getOperation("11");}
        }
        var subitem12_3 = {
            label:"������֤��ʽ...",
            callback:setAuthenticateMethod,
            enable:function(){return true;},
            visible:function(){return true==getOperation("12");}
        }


        var subitem12_4 = {
            label:"�ۺϲ�ѯ",
            callback:null,
            icon:ICON + "search.gif",
            enable:function(){return true;},
            visible:function(){return true==getOperation("ug16");}
        }

        //�ۺϲ�ѯ
        var subitem12_4_1 = {
            label:"�û���Ӧ",
            callback:generalSearchMapping,
            enable:function(){return true;},
            visible:function(){return "3"==getGroupType();}
        }
        var subitem12_4_2 = {
            label:"�û�ͬ��",
            callback:generalSearchSync,
            enable:function(){return true;},
            visible:function(){return true;}
        }
        var subitem12_4_3 = {
            label:"�û�Ȩ��",
            callback:generalSearchPermission,
            enable:function(){return true;},
            visible:function(){return true;}
        }
        var subitem12_4_4 = {
            label:"�û�ת��",
            callback:generalSearchReassign,
            enable:function(){return true;},
            visible:function(){return true;}
        }
        var subitem12_4_5 = {
            label:"�û���ɫ",
            callback:generalSearchRole,
            enable:function(){return true;},
            visible:function(){return true;}
        }

        var submenu12_4 = new Menu();
//        submenu12_4.addItem(subitem12_4_1);
//        submenu12_4.addItem(subitem12_4_2);
        submenu12_4.addItem(subitem12_4_3);
        submenu12_4.addItem(subitem12_4_4);
        submenu12_4.addItem(subitem12_4_5);
        subitem12_4.submenu = submenu12_4;


        var submenu12 = new Menu();
        submenu12.addItem(subitem12_1);
        submenu12.addItem(subitem12_2);
        submenu12.addItem(subitem12_3);
        submenu12.addSeparator();
        submenu12.addItem(subitem12_4);
        item12.submenu = submenu12;





        var item18 = {
            label:"�û�ͬ��",
            callback:null,
            icon:ICON + "sync.gif",
            enable:function(){return true;},
            visible:function(){return true==getOperation("15");}
        }
        //ͬ��
        var submenu18_1 = {
            label:"��ȫͬ��",
            callback:function(){syncGroup("1")},
            enable:function(){return true;},
            visible:function(){return true;}
        }
        var submenu18_2 = {
            label:"����ͬ��",
            callback:function(){syncGroup("2")},
            enable:function(){return true;},
            visible:function(){return true;}
        }
        var submenu18 = new Menu();
        submenu18.addItem(submenu18_1);
        submenu18.addItem(submenu18_2);
        item18.submenu = submenu18;


        var item19 = {
            label:"ģ����Ӧ",
            callback:autoMappingGroup,
            enable:function(){return true;},
            visible:function(){return true==getOperation("16");}
        }

        var item13 = {
            label:"�鿴",
            callback:function(){
                editTreeNode(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "3"!=getGroupType() && true==getOperation("5");}
        }
        var item14 = {
            label:"�����ɫ",
            callback:setGroupPermission,
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && true==getOperation("_1");}
        }
        var item15 = {
            label:"�½�Ӧ��",
            callback:addApplication,
            enable:function(){return true;},
            visible:function(){return "-4"==getTreeId() && true==getOperation("2");}
        }
        var item16 = {
            label:"�û����뵽...",
            callback:importGroupTo,
            icon:ICON + "import_user.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && "3"==getGroupType();}
        }


        var item17 = {
            label:"ά��...",
            callback:null,
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "3"==getGroupType();}
        }
        var subitem17_1 = {
            label:"�鿴",
            callback:function(){
                editTreeNode(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && true==getOperation("5");}
        }
        var subitem17_2 = {
            label:"�༭",
            callback:editTreeNode,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && true==getOperation("4");}
        }
        var subitem17_3 = {
            label:"ɾ��",
            callback:delTreeNode,
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && true==getOperation("3");}
        }
        var subitem17_4 = {
            label:"����",
            callback:copyGroup,
            icon:ICON + "copy.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && true==getOperation("13");}
        }
        var subitem17_5 = {
            label:"���Ƶ�...",
            callback:copyGroupTo,
            icon:ICON + "copy_to.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId();}
        }
        var subitem17_6 = {
            label:"�ƶ���...",
            callback:moveGroupTo,
            icon:ICON + "move.gif",
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && true==getOperation("3");}
        }
        var subitem17_7 = {
            label:"�½��û���",
            callback:addNewGroup,
            enable:function(){return true;},
            visible:function(){return true!=isSelfRegisterNode() && true==getOperation("2") && true!=isOtherGroup();}
        }
        var subitem17_8 = {
            label:"�½��û�",
            callback:addNewUser,
            enable:function(){return true;},
            visible:function(){return true!=isRootNode() && "5"!=getResourceTypeId() && true==getOperation("1");}
        }
        var submenu17 = new Menu();
        submenu17.addItem(subitem17_1);
        submenu17.addItem(subitem17_2);
        submenu17.addItem(subitem17_3);
        submenu17.addItem(subitem17_4);
        submenu17.addItem(subitem17_5);
        submenu17.addItem(subitem17_6);
        submenu17.addSeparator();
        submenu17.addItem(subitem17_7);
        submenu17.addItem(subitem17_8);
        item17.submenu = submenu17;





        var menu1 = new Menu();
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu1.addSeparator();
        menu1.addItem(item14);
        menu1.addSeparator();

        menu1.addItem(item16);
        menu1.addItem(item18);
        menu1.addItem(item19);


        menu1.addSeparator();
        menu1.addItem(item17);
        menu1.addSeparator();
        menu1.addItem(item13);
        menu1.addItem(item3);
        menu1.addItem(item4);
        menu1.addItem(item5);
        menu1.addItem(item6);
        menu1.addItem(item7);
        menu1.addSeparator();
        menu1.addItem(item8);
        menu1.addItem(item9);
        menu1.addItem(item15);
        menu1.addSeparator();
        menu1.addItem(item10);
        menu1.addItem(item11);
        menu1.addSeparator();
        menu1.addItem(item12);

        var treeObj = $("tree");
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
            label:"ͣ��",
            callback:stopUser,
            icon:ICON + "stop.gif",
            enable:function(){return true;},
            visible:function(){return true==getUserOperation("u5") && "0"==getUserState();}
        }
        var item2 = {
            label:"����",
            callback:startUser,
            icon:ICON + "start.gif",
            enable:function(){return true;},
            visible:function(){return true==getUserOperation("u4") && "1"==getUserState();}
        }
        var item3 = {
            label:"�༭",
            callback:editUserInfo,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return true==getUserOperation("u2");}
        }
        var item4 = {
            label:"ɾ��",
            callback:delUser,
            icon:ICON + "del.gif",
            enable:function(){return gridObj.canDelete();},
            visible:function(){return true==getUserOperation("u1");}
        }
        var item5 = {
            label:"�ƶ���...",
            callback:moveUserTo,
            icon:ICON + "move.gif",
            enable:function(){return true;},
            visible:function(){return true==getUserOperation("u1");}
        }
        var item6 = {
            label:"����",
            callback:moveUserDown,
            icon:ICON + "down.gif",
            enable:function(){return true;},
            visible:function(){return true==canMoveUserDown() && true==getUserOperation("u5");}
        }
        var item7 = {
            label:"����",
            callback:moveUserUp,
            icon:ICON + "up.gif",
            enable:function(){return true;},
            visible:function(){return true==canMoveUserUp() && true==getUserOperation("u5");}
        }
        var item8 = {
            label:"������...",
            callback:function(){gridObj.hideCols();},
            icon:ICON + "hide_col.gif",
            enable:function(){return true;},
            visible:function(){return true;}
        }
        var item9 = {
            label:"�鿴",
            callback:function(){
                editUserInfo(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return true==getUserOperation("u3");}
        }
        var item10 = {
            label:"�����ɫ",
            callback:setUserPermission,
            enable:function(){return true;},
            visible:function(){return "3"!=getUserGroupType();}
        }
        var item11 = {
            label:"����...",
            callback:function(){gridObj.search();},
            enable:function(){return true;},
            visible:function(){return true;}
        }
        var item12 = {
            label:"�ָ�Ĭ��˳��",
            callback:restoreDefaultSort,
            enable:function(){return true;},
            visible:function(){return true==canRestoreDefaultSort();}
        }
        var item13 = {
            label:"�û���Ӧ",
            callback:manualMappingUser,
            enable:function(){return true;},
            visible:function(){return true==isOtherUser() && true==getUserOperation("u6");}
        }
        var item14 = {
            label:"�û�ͬ��",
            callback:syncUser,
            enable:function(){return true;},
            visible:function(){return true==isOtherUser() && true==getUserOperation("u7");}
        }
        var item15 = {
            label:"�����������...",
            callback:function(){
                setPasswordTactic("user");
            },
            enable:function(){return true;},
            visible:function(){return "3"!=getUserGroupType();}
        }
        var item16 = {
            label:"�û����뵽...",
            callback:importUserTo,
            enable:function(){return true;},
            visible:function(){return "3"==getUserGroupType();}
        }

        var menu1 = new Menu();
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu1.addSeparator();
        menu1.addItem(item10);
        menu1.addItem(item15);
        menu1.addSeparator();
        menu1.addItem(item13);
        menu1.addItem(item14);
        menu1.addItem(item16);
        menu1.addSeparator();
        menu1.addItem(item9);
        menu1.addItem(item3);
        menu1.addItem(item4);
        menu1.addSeparator();
        menu1.addItem(item5);
        menu1.addItem(item6);
        menu1.addItem(item7);
        menu1.addSeparator();
        menu1.addItem(item12);
        menu1.addItem(item8);
        menu1.addItem(item11);
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
                string:applicationId        Ӧ��id
                string:groupType            ������
     *	����ֵ��
     */
    function initGrid(id,applicationId,groupType){
        var gridObj = $("grid");
        Public.initHTC(gridObj,"isLoaded","onload",function(){
            loadGridEvents();
            loadGridData(id,applicationId,groupType,"1");//Ĭ�ϵ�1ҳ
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
                string:applicationId        Ӧ��id
                string:groupType            ������
                string:page                 ҳ��
                string:sortName             �����ֶ�
                string:direction            ������
     *	����ֵ��
     */
    function loadGridData(treeID,applicationId,groupType,page,sortName,direction){
        var cacheID = CACHE_TREE_NODE_GRID + treeID;
        var treeGrid = Cache.Variables.get(cacheID);
//        if(null==treeGrid){
            var p = new HttpRequestParams();
            p.url = URL_USER_LIST;
            p.setContent("groupId", treeID);
            p.setContent("applicationId", applicationId);
            p.setContent("groupType", groupType);
            p.setContent("page", page);
            if(null!=sortName && null!=direction){
                p.setContent("field", sortName);
                p.setContent("orderType", direction);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var sourceListNode = this.getNodeValue(XML_USER_LIST);
                var sourceListNodeID = cacheID+"."+XML_USER_LIST;

                var pageListNode = this.getNodeValue(XML_PAGE_LIST);
                var pageListNodeID = cacheID+"."+XML_PAGE_LIST;

                //���û�grid���ݸ��ڵ�����groupType,applicationId������
                sourceListNode.setAttribute("groupType",groupType);
                sourceListNode.setAttribute("groupId",treeID);
                sourceListNode.setAttribute("applicationId",applicationId);

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

        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_USER_LIST);
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
                    var tempGroupId = tempXmlIsland.getAttribute("groupId");
                    var sortName = tempXmlIsland.getAttribute("sortName");
                    var direction = tempXmlIsland.getAttribute("direction");
                    if("search"!=tempGroupId){
                        //��������û�grid����
                        delCacheData(CACHE_TREE_NODE_GRID + tempGroupId);

                        var tempApplicationId = tempXmlIsland.getAttribute("applicationId");
                        var tempGroupType = tempXmlIsland.getAttribute("groupType");

                        loadGridData(tempGroupId,tempApplicationId,tempGroupType,page,sortName,direction);

                        //ˢ�¹�����
                        onInactiveRow();
                    }else{
                        loadSearchGridData(cacheID,page,sortName,direction);
                    }
                }            
            });
        }
    }
    /*
     *	����˵������ʾ�û�״̬��Ϣ
     *	������	number:rowIndex     grid�����к�
     *	����ֵ��
     */
    function showUserStatus(rowIndex){
        if(null==rowIndex){
            var rowName = "-";
            var rowID = "-";
            var rowPermission = "-";
        }else{
            var gridObj = $("grid");
            var rowNode = gridObj.getRowNode_Xml(rowIndex);
            var rowName = gridObj.getNamedNodeValue_Xml(rowIndex,"loginName");
            var rowID = rowNode.getAttribute("id");

            var creatorId = rowNode.getAttribute("creatorId");
            var creatorName = rowNode.getAttribute("creatorName");
            var createTime = rowNode.getAttribute("createTime");
            var updatorId = rowNode.getAttribute("updatorId");
            var updatorName = rowNode.getAttribute("updatorName");
            var updateTime = rowNode.getAttribute("updateTime");
        }

        var block = Blocks.getBlock("statusContainer");
        if(null!=block){
            block.open();
            block.writeln("ID",rowID);
            block.writeln("����",rowName);
            block.writeln("������",creatorName);
            block.writeln("����ʱ��",createTime);
            block.writeln("�޸���",updatorName);
            block.writeln("�޸�ʱ��",updateTime);
            block.close();
        }
    }
    /*
     *	����˵������ʾ�û���ϸ��Ϣ
     *	������	boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editUserInfo(editable){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var rowName = gridObj.getNamedNodeValue_Xml(rowIndex,"userName");
        var rowID = rowNode.getAttribute("id");
        var groupID = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"==groupID){
            groupID = rowNode.getAttribute("groupId");
        }

        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        if("3"==groupType){//����Ӧ���û�����û�

            var phases = [];
            phases[0] = {page:"page1",label:"������Ϣ"};
            phases[1] = {page:"page8",label:"��֤��Ϣ"};

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadOtherUserDetailData(rowID,editable,groupID);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,rowName);
                inf.SID = CACHE_VIEW_GRID_ROW_DETAIL + rowID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,rowName);
                inf.SID = CACHE_GRID_ROW_DETAIL + rowID;
            }
            inf.defaultPage = "page1";
            inf.phases = phases;
            inf.callback = callback;
            var tab = ws.open(inf);
        }else{//�������û�����û�

            var phases = [];
            phases[0] = {page:"page1",label:"������Ϣ"};
            phases[1] = {page:"page8",label:"��֤��Ϣ"};
            phases[2] = {page:"page2",label:"�û���"};
            phases[3] = {page:"page3",label:"��ɫ"};

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadUserDetailData(rowID,editable,groupID);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,rowName);
                inf.SID = CACHE_VIEW_GRID_ROW_DETAIL + rowID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,rowName);
                inf.SID = CACHE_GRID_ROW_DETAIL + rowID;
            }
            inf.defaultPage = "page1";
            inf.phases = phases;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
        
    }
    /*
     *	����˵��������Ӧ���û���ϸ��Ϣ��������
     *	������	string:userID               �û�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:groupId              ��id
                string:applicationId        Ӧ��id
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadOtherUserDetailData(userID,editable,groupId,applicationId,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_GRID_ROW_DETAIL + userID;
        }else{
            var cacheID = CACHE_GRID_ROW_DETAIL + userID;
        }
        var userDetail = Cache.Variables.get(cacheID);
        if(null==userDetail){
            var p = new HttpRequestParams();
            p.url = URL_USER_DETAIL;
            //���������
            if(true==isNew){
                p.setContent("userId", "-10");
                p.setContent("groupId", groupId);
                p.setContent("applicationId", applicationId);
            }else{
                p.setContent("userId", userID);
                p.setContent("groupId", groupId);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var userInfoNode = this.getNodeValue(XML_USER_INFO);
                var authenticateInfoNode = this.getNodeValue(XML_AUTHENTICATE_INFO);
                var user2GroupTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE).cloneNode(false);
                var user2GroupExistTreeNode = this.getNodeValue(XML_USER_TO_GROUP_EXIST_TREE);

                //ֻȡͬһӦ��ϵͳ
                var mainTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE);
                var applicationNode = mainTreeNode.selectSingleNode(".//treeNode[@applicationId='"+applicationId+"']");
                if(null!=applicationNode){
                    applicationNode = applicationNode.cloneNode(true);
                    user2GroupTreeNode.appendChild(applicationNode);
                }

                var userInfoNodeID = cacheID+"."+XML_USER_INFO;
                var authenticateInfoNodeID = cacheID+"."+XML_AUTHENTICATE_INFO;
                var user2GroupTreeNodeID = cacheID+"."+XML_USER_TO_GROUP_TREE;
                var user2GroupExistTreeNodeID = cacheID+"."+XML_USER_TO_GROUP_EXIST_TREE;

                Cache.XmlIslands.add(userInfoNodeID,userInfoNode);
                Cache.XmlIslands.add(authenticateInfoNodeID,authenticateInfoNode);
                Cache.XmlIslands.add(user2GroupTreeNodeID,user2GroupTreeNode);
                Cache.XmlIslands.add(user2GroupExistTreeNodeID,user2GroupExistTreeNode);

                Cache.Variables.add(cacheID,[userInfoNodeID,authenticateInfoNodeID,user2GroupTreeNodeID,user2GroupExistTreeNodeID]);

                initOtherUserPages(cacheID,editable,isNew,groupId);
            }
            request.send();
        }else{
            initOtherUserPages(cacheID,editable,isNew,groupId);
        }
    }
    /*
     *	����˵��������Ӧ���û����ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
                string:groupId              ��id
     *	����ֵ��
     */
    function initOtherUserPages(cacheID,editable,isNew,groupId){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadUserInfoFormData(cacheID,editable);
        });

        var page8FormObj = $("page8Form");
        Public.initHTC(page8FormObj,"isLoaded","oncomponentready",function(){
            loadAuthenticateInfoFormData(cacheID,editable);
        });

//        var page2TreeObj = $("page2Tree");
//        Public.initHTC(page2TreeObj,"isLoaded","oncomponentready",function(){
//            loadUser2GroupTreeData(cacheID);
//        });
//
//        var page2Tree2Obj = $("page2Tree2");
//        Public.initHTC(page2Tree2Obj,"isLoaded","oncomponentready",function(){
//            loadUser2GroupExistTreeData(cacheID);
//
//            //��ǵ�ǰpage2Tree2������Ӧ�õ�
//            page2Tree2Obj.groupType = "3";
//        });
//
//        //������Ӱ�ť����
//        var page2BtAddObj = $("page2BtAdd");
//        page2BtAddObj.onclick = function(){
//            addTreeNode(page2TreeObj,page2Tree2Obj,function(treeNode){
//                var result = {
//                    "error":false,
//                    "message":"",
//                    "stop":true
//                };
//                var rootNode = page2Tree2Obj.getTreeNodeById("_rootId");
//                if(null!=rootNode.node.selectSingleNode("treeNode")){
//                    result.error = true;
//                    result.message = "����Ӧ��һ���û���Ӧ�û���ֻ����һ��";
//                    result.stop = true;
//                }
//                return result;
//            });
//        }
//
//        //����ɾ����ť����
//        var page2BtDelObj = $("page2BtDel");
//        page2BtDelObj.onclick = function(){
//            removeTreeNode(page2Tree2Obj);
//        }
//
//        //��������
//        var page2BtSearchObj = $("page2BtSearch");
//        var page2KeywordObj = $("page2Keyword");
//        attachSearchTree(page2TreeObj,page2BtSearchObj,page2KeywordObj);

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page8BtPrevObj = $("page8BtPrev");
//        var page2BtPrevObj = $("page2BtPrev");
        var page1BtNextObj = $("page1BtNext");
        var page8BtNextObj = $("page8BtNext");
//        var page2BtNextObj = $("page2BtNext");
        page1BtPrevObj.style.display = "none";
        page8BtPrevObj.style.display = "";
//        page2BtPrevObj.style.display = "";
        page1BtNextObj.style.display = "";
        page8BtNextObj.style.display = "none";
//        page2BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        var page8BtSaveObj = $("page8BtSave");
//        var page2BtSaveObj = $("page2BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page8BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = page8BtSaveObj.onclick = function(){
            saveOtherUser(cacheID,isNew,groupId);
        }
    }
    /*
     *	����˵�����û���ϸ��Ϣ��������
     *	������	string:userID               �û�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:groupId              �û���id
                string:applicationId        Ӧ��id
                boolean:isNew               �Ƿ�����
                string:disabled             ��״̬(1ͣ��/0����)
     *	����ֵ��
     */
    function loadUserDetailData(userID,editable,groupId,applicationId,isNew,disabled){
        if(false==editable){
            var cacheID = CACHE_VIEW_GRID_ROW_DETAIL + userID;
        }else{
            var cacheID = CACHE_GRID_ROW_DETAIL + userID;
        }
        var userDetail = Cache.Variables.get(cacheID);
        if(null==userDetail){
            var p = new HttpRequestParams();
            p.url = URL_USER_DETAIL;
            //���������
            if(true==isNew){
                p.setContent("userId", "-10");
                p.setContent("groupId", groupId);
                p.setContent("applicationId", applicationId);
                p.setContent("disabled", disabled);
            }else{
                p.setContent("userId", userID);
                p.setContent("groupId", groupId);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var userInfoNode = this.getNodeValue(XML_USER_INFO);
                var authenticateInfoNode = this.getNodeValue(XML_AUTHENTICATE_INFO);
                var user2GroupExistTreeNode = this.getNodeValue(XML_USER_TO_GROUP_EXIST_TREE);
                var user2GroupTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE).cloneNode(false);
                var user2RoleTreeNode = this.getNodeValue(XML_USER_TO_ROLE_TREE);
                var user2RoleGridNode = this.getNodeValue(XML_USER_TO_ROLE_EXIST_TREE);

                //ֻ�������������û���
                var mainTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE);
                var GroupType1Node = mainTreeNode.selectSingleNode("./treeNode[@groupType='1']");
                if(null!=GroupType1Node){
                    GroupType1Node = GroupType1Node.cloneNode(true);
                    GroupType1Node.setAttribute("canselected","0");
                    user2GroupTreeNode.appendChild(GroupType1Node);
                }
                var GroupType2Node = mainTreeNode.selectSingleNode("./treeNode[@groupType='2']");
                if(null!=GroupType2Node){
                    GroupType2Node = GroupType2Node.cloneNode(true);
                    GroupType2Node.setAttribute("canselected","0");
                    user2GroupTreeNode.appendChild(GroupType2Node);
                }

                var userInfoNodeID = cacheID+"."+XML_USER_INFO;
                var authenticateInfoNodeID = cacheID+"."+XML_AUTHENTICATE_INFO;
                var user2GroupExistTreeNodeID = cacheID+"."+XML_USER_TO_GROUP_EXIST_TREE;
                var user2GroupTreeNodeID = cacheID+"."+XML_USER_TO_GROUP_TREE;
                var user2RoleTreeNodeID = cacheID+"."+XML_USER_TO_ROLE_TREE;
                var user2RoleGridNodeID = cacheID+"."+XML_USER_TO_ROLE_EXIST_TREE;

                Cache.XmlIslands.add(userInfoNodeID,userInfoNode);
                Cache.XmlIslands.add(authenticateInfoNodeID,authenticateInfoNode);
                Cache.XmlIslands.add(user2GroupExistTreeNodeID,user2GroupExistTreeNode);
                Cache.XmlIslands.add(user2GroupTreeNodeID,user2GroupTreeNode);
                Cache.XmlIslands.add(user2RoleTreeNodeID,user2RoleTreeNode);
                Cache.XmlIslands.add(user2RoleGridNodeID,user2RoleGridNode);

                Cache.Variables.add(cacheID,[userInfoNodeID,authenticateInfoNodeID,user2GroupExistTreeNodeID,user2GroupTreeNodeID,user2RoleTreeNodeID,user2RoleGridNodeID]);

                initUserPages(cacheID,editable,isNew,groupId);
            }
            request.send();
        }else{
            initUserPages(cacheID,editable,isNew,groupId);
        }
    }
    /*
     *	����˵�����û����ҳ��������
     *	������	string:cacheID          ��������id
                boolean:isNew           �Ƿ�����
                string:groupId          �û���id
     *	����ֵ��
     */
    function initUserPages(cacheID,editable,isNew,groupId){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadUserInfoFormData(cacheID,editable);
        });

        var page8FormObj = $("page8Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadAuthenticateInfoFormData(cacheID,editable);
        });

        var page2TreeObj = $("page2Tree");
        Public.initHTC(page2TreeObj,"isLoaded","oncomponentready",function(){
            loadUser2GroupTreeData(cacheID);
        });

        var page2Tree2Obj = $("page2Tree2");
        Public.initHTC(page2Tree2Obj,"isLoaded","oncomponentready",function(){
            loadUser2GroupExistTreeData(cacheID);

            //��ǵ�ǰpage2Tree2����(����)�û���
            page2Tree2Obj.groupType = "1";
        });

        var page3TreeObj = $("page3Tree");
        Public.initHTC(page3TreeObj,"isLoaded","oncomponentready",function(){
            loadUser2RoleTreeData(cacheID);
        });

        var page3Tree2Obj = $("page3Tree2");
        Public.initHTC(page3Tree2Obj,"isLoaded","oncomponentready",function(){
            loadUser2RoleExistTreeData(cacheID);
        });

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page8BtPrevObj = $("page8BtPrev");
        var page2BtPrevObj = $("page2BtPrev");
        var page3BtPrevObj = $("page3BtPrev");
        var page1BtNextObj = $("page1BtNext");
        var page8BtNextObj = $("page8BtNext");
        var page2BtNextObj = $("page2BtNext");
        var page3BtNextObj = $("page3BtNext");
        page1BtPrevObj.style.display = "none";
        page8BtPrevObj.style.display = "";
        page2BtPrevObj.style.display = "";
        page3BtPrevObj.style.display = "";
        page1BtNextObj.style.display = "";
        page8BtNextObj.style.display = "";
        page2BtNextObj.style.display = "";
        page3BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        var page8BtSaveObj = $("page8BtSave");
        var page2BtSaveObj = $("page2BtSave");
        var page3BtSaveObj = $("page3BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page8BtSaveObj.disabled = editable==false?true:false;
        page2BtSaveObj.disabled = editable==false?true:false;
        page3BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = page8BtSaveObj.onclick = page2BtSaveObj.onclick = page3BtSaveObj.onclick = function(){
            saveUser(cacheID,isNew,groupId);
        }

        //��������
        var page2BtSearchObj = $("page2BtSearch");
        var page2KeywordObj = $("page2Keyword");
        attachSearchTree(page2TreeObj,page2BtSearchObj,page2KeywordObj);

        //��������
        var page3BtSearchObj = $("page3BtSearch");
        var page3KeywordObj = $("page3Keyword");
        attachSearchTree(page3TreeObj,page3BtSearchObj,page3KeywordObj);

        //������Ӱ�ť����
        var page2BtAddObj = $("page2BtAdd");
        page2BtAddObj.disabled = editable==false?true:false;
        page2BtAddObj.onclick = function(){
            addTreeNode(page2TreeObj,page2Tree2Obj,function(treeNode){
                var result = {
                    "error":false,
                    "message":"",
                    "stop":true
                };
                var groupType = treeNode.getAttribute("groupType");
                if("1"==groupType && true==hasSameAttributeTreeNode(page2Tree2Obj,"groupType",groupType)){
                    result.error = true;
                    result.message = "һ���û���Ӧ���û���ֻ����һ��";
                    result.stop = true;
                }
                return result;
            });
        }

        //������Ӱ�ť����
        var page3BtAddObj = $("page3BtAdd");
        page3BtAddObj.disabled = editable==false?true:false;
        page3BtAddObj.onclick = function(){
            addTreeNode(page3TreeObj,page3Tree2Obj,function(treeNode){
                var result = {
                    "error":false,
                    "message":"",
                    "stop":true
                };
                if("1"==treeNode.getAttribute("isGroup")){
                    result.error = true;
                    result.message = null;
                    result.stop = false;
                }
                return result;
            });
        }

        //����ɾ����ť����
        var page2BtDelObj = $("page2BtDel");
        page2BtDelObj.disabled = editable==false?true:false;
        page2BtDelObj.onclick = function(){
            removeTreeNode(page2Tree2Obj);
        }

        //����ɾ����ť����
        var page3BtDelObj = $("page3BtDel");
        page3BtDelObj.disabled = editable==false?true:false;
        page3BtDelObj.onclick = function(){
             removeTreeNode(page3Tree2Obj);
        }
    }
    /*
     *	����˵�����û���Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadUserInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_USER_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            page1FormObj.ondatachange = function(){
                //2007-3-1 �뿪����
                attachReminder(cacheID);

                var name = event.result.name;
                var newValue = event.result.newValue;
                if("password" == name){
                    var password = newValue;
                    var id = page1FormObj.getData("id");
                    var loginName = page1FormObj.getData("loginName");
                    checkPasswordAvailable(page1FormObj,URL_CHECK_PASSWORD,password,id,loginName);
                }
            }
        }
    }
    /*
     *	����˵������֤��Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadAuthenticateInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_AUTHENTICATE_INFO);
        if(null!=xmlIsland){
            var page8FormObj = $("page8Form");
            page8FormObj.editable = editable==false?"false":"true";
            page8FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page8FormObj);
        }
    }
    /*
     *	����˵�����û����û���tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadUser2GroupTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_USER_TO_GROUP_TREE);
        if(null!=xmlIsland){
            var page2TreeObj = $("page2Tree");
            page2TreeObj.load(xmlIsland.node);
            page2TreeObj.research = true;
        }
    }
    /*
     *	����˵�����û����û���tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadUser2GroupExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_USER_TO_GROUP_EXIST_TREE);
        if(null!=xmlIsland){
            var page2Tree2Obj = $("page2Tree2");
            page2Tree2Obj.load(xmlIsland.node);
        }
    }
    /*
     *	����˵�����û��Խ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadUser2RoleTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_USER_TO_ROLE_TREE);
        if(null!=xmlIsland){
            var page3TreeObj = $("page3Tree");
            page3TreeObj.load(xmlIsland.node);
            page3TreeObj.research = true;
        }
    }
    /*
     *	����˵�����û��Խ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadUser2RoleExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_USER_TO_ROLE_EXIST_TREE);
        if(null!=xmlIsland){
            var page3Tree2Obj = $("page3Tree2");
            page3Tree2Obj.load(xmlIsland.node);
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
     *	����˵��������Ӧ���û�����ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentID             ���ڵ�id������ʱ��Ҫ
                boolean:isNew               �Ƿ�����
                string:disabled           ��״̬(1ͣ��/0����)
     *	����ֵ��
     */
    function loadOtherGroupDetailData(treeID,editable,parentID,groupType,applicationId,isNew,disabled){
        if(false==editable){
            var cacheID = CACHE_VIEW_TREE_NODE_DETAIL + treeID;
        }else{
            var cacheID = CACHE_TREE_NODE_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_GROUP_DETAIL;
            if(true==isNew){
                if(null==groupType){
					p.setContent("toGroupId","-4");
                    p.setContent("groupType", "3");
				}else{
					p.setContent("toGroupId",parentID);
				    p.setContent("groupType", groupType);
				}
                p.setContent("groupId", "-10");
                p.setContent("applicationId", applicationId);
                p.setContent("disabled", disabled);
            }else{
                p.setContent("groupId", treeID);
                p.setContent("groupType", groupType);
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var groupInfoNode = this.getNodeValue(XML_GROUP_INFO);
                var group2UserTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE).cloneNode(false);
                var group2UserGridNode = this.getNodeValue(XML_GROUP_TO_USER_EXIST_TREE);

                //ֻ����ͬһӦ��ϵͳ��
                if("-4"==parentID){//����Ӧ����ڵ����½��û���ʱ�Ȳ�������
                
                }else{
                    var mainTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE);
                    var applicationNode = mainTreeNode.selectSingleNode(".//treeNode[@applicationId='"+applicationId+"']").cloneNode(true);
                    group2UserTreeNode.appendChild(applicationNode);
                }

                var groupInfoNodeID = cacheID+"."+XML_GROUP_INFO;
                var group2UserTreeNodeID = cacheID+"."+XML_GROUP_TO_USER_TREE;
                var group2UserGridNodeID = cacheID+"."+XML_GROUP_TO_USER_EXIST_TREE;

                Cache.XmlIslands.add(groupInfoNodeID,groupInfoNode);
                Cache.XmlIslands.add(group2UserTreeNodeID,group2UserTreeNode);
                Cache.XmlIslands.add(group2UserGridNodeID,group2UserGridNode);

                Cache.Variables.add(cacheID,[groupInfoNodeID,group2UserTreeNodeID,group2UserGridNodeID]);

                initOtherGroupPages(cacheID,editable,isNew,parentID);
            }
            request.send();
        }else{
            initOtherGroupPages(cacheID,editable,isNew,parentID);
        }
    }
    /*
     *	����˵�����û������ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
                string:parentID             ���ڵ�id������ʱ��Ҫ
     *	����ֵ��
     */
    function initOtherGroupPages(cacheID,editable,isNew,parentID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadGroupInfoFormData(cacheID,editable);
        });

        var page4TreeObj = $("page4Tree");
        Public.initHTC(page4TreeObj,"isLoaded","oncomponentready",function(){
            loadGroup2UserTreeData(cacheID);
        });

        var page4Tree2Obj = $("page4Tree2");
        Public.initHTC(page4Tree2Obj,"isLoaded","oncomponentready",function(){
            clearTreeData(page4Tree2Obj);
        });

        var page4Tree3Obj = $("page4Tree3");
        Public.initHTC(page4Tree3Obj,"isLoaded","oncomponentready",function(){
            loadGroup2UserExistTreeData(cacheID);
        });

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page4BtPrevObj = $("page4BtPrev");
        var page1BtNextObj = $("page1BtNext");
        var page4BtNextObj = $("page4BtNext");
        page1BtPrevObj.style.display = "none";
        page4BtPrevObj.style.display = "none";
        page1BtNextObj.style.display = "none";
        page4BtNextObj.style.display = "none";

        //��������
        var page4BtSearchObj = $("page4BtSearch");
        var page4KeywordObj = $("page4Keyword");
        attachSearchTree(page4TreeObj,page4BtSearchObj,page4KeywordObj);

        //��������
        var page4BtSearch2Obj = $("page4BtSearch2");
        var page4Keyword2Obj = $("page4Keyword2");
        attachSearchTree(page4Tree2Obj,page4BtSearch2Obj,page4Keyword2Obj);

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = function(){
            saveOtherGroup(cacheID,isNew,parentID);
        }

        //������Ӱ�ť����
        var page4BtAddObj = $("page4BtAdd");
        page4BtAddObj.disabled = editable==false?true:false;
        page4BtAddObj.onclick = function(){
            addTreeNode(page4Tree2Obj,page4Tree3Obj);
        }

        //����ɾ����ť����
        var page4BtDelObj = $("page4BtDel");
        page4BtDelObj.disabled = editable==false?true:false;
        page4BtDelObj.onclick = function(){
             removeTreeNode(page4Tree3Obj);
        }
    }
    /*
     *	����˵�������ڵ�������ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentID             ���ڵ�id
                boolean:isNew               �Ƿ�����
                string:disabled           ��״̬(1ͣ��/0����)
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
                var group2UserTreeNode = this.getNodeValue(XML_GROUP_TO_USER_TREE);
                var group2UserTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE).cloneNode(false);
                var group2UserGridNode = this.getNodeValue(XML_GROUP_TO_USER_EXIST_TREE);
                var group2RoleTreeNode = this.getNodeValue(XML_GROUP_TO_ROLE_TREE);
                var group2RoleGridNode = this.getNodeValue(XML_GROUP_TO_ROLE_EXIST_TREE);

                //ֻ�������������û���
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
                var group2UserTreeNodeID = cacheID+"."+XML_GROUP_TO_USER_TREE;
                var group2UserGridNodeID = cacheID+"."+XML_GROUP_TO_USER_EXIST_TREE;
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
     *	����˵�����û������ҳ��������
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

        if("2"==groupType){
            var page4TreeObj = $("page4Tree");
            Public.initHTC(page4TreeObj,"isLoaded","oncomponentready",function(){
                loadGroup2UserTreeData(cacheID);
            });

            var page4Tree2Obj = $("page4Tree2");
            Public.initHTC(page4Tree2Obj,"isLoaded","oncomponentready",function(){
                clearTreeData(page4Tree2Obj);
            });

            var page4Tree3Obj = $("page4Tree3");
            Public.initHTC(page4Tree3Obj,"isLoaded","oncomponentready",function(){
                loadGroup2UserExistTreeData(cacheID);
            });
        }

        var page3TreeObj = $("page3Tree");
        Public.initHTC(page3TreeObj,"isLoaded","oncomponentready",function(){
            loadGroup2RoleTreeData(cacheID);
        });

        var page3Tree2Obj = $("page3Tree2");
        Public.initHTC(page3Tree2Obj,"isLoaded","oncomponentready",function(){
            loadGroup2RoleExistTreeData(cacheID);
        });

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page4BtPrevObj = $("page4BtPrev");
        var page3BtPrevObj = $("page3BtPrev");
        var page1BtNextObj = $("page1BtNext");
        var page4BtNextObj = $("page4BtNext");
        var page3BtNextObj = $("page3BtNext");
        page1BtPrevObj.style.display = "none";
        page4BtPrevObj.style.display = "";
        page3BtPrevObj.style.display = "";
        page1BtNextObj.style.display = "";
        page4BtNextObj.style.display = "";
        page3BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        var page4BtSaveObj = $("page4BtSave");
        var page3BtSaveObj = $("page3BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page4BtSaveObj.disabled = editable==false?true:false;
        page3BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = page4BtSaveObj.onclick = page3BtSaveObj.onclick = function(){
            saveGroup(cacheID,isNew,parentID,groupType);
        }

        if("2"==groupType){
            //��������
            var page4BtSearchObj = $("page4BtSearch");
            var page4KeywordObj = $("page4Keyword");
            attachSearchTree(page4TreeObj,page4BtSearchObj,page4KeywordObj);

            //��������
            var page4BtSearch2Obj = $("page4BtSearch2");
            var page4Keyword2Obj = $("page4Keyword2");
            attachSearchTree(page4Tree2Obj,page4BtSearch2Obj,page4Keyword2Obj);
        }

        //��������
        var page3BtSearchObj = $("page3BtSearch");
        var page3KeywordObj = $("page3Keyword");
        attachSearchTree(page3TreeObj,page3BtSearchObj,page3KeywordObj);

        //������Ӱ�ť����
        var page3BtAddObj = $("page3BtAdd");
        page3BtAddObj.disabled = editable==false?true:false;
        page3BtAddObj.onclick = function(){
            addTreeNode(page3TreeObj,page3Tree2Obj,function(treeNode){
                var result = {
                    "error":false,
                    "message":"",
                    "stop":true
                };
                if("1"==treeNode.getAttribute("isGroup")){
                    result.error = true;
                    result.message = null;
                    result.stop = false;
                }
                return result;
            });
        }

        //������Ӱ�ť����
        var page4BtAddObj = $("page4BtAdd");
        page4BtAddObj.disabled = editable==false?true:false;
        page4BtAddObj.onclick = function(){
            addTreeNode(page4Tree2Obj,page4Tree3Obj);
        }

        //����ɾ����ť����
        var page3BtDelObj = $("page3BtDel");
        page3BtDelObj.disabled = editable==false?true:false;
        page3BtDelObj.onclick = function(){
             removeTreeNode(page3Tree2Obj);
        }

        //����ɾ����ť����
        var page4BtDelObj = $("page4BtDel");
        page4BtDelObj.disabled = editable==false?true:false;
        page4BtDelObj.onclick = function(){
             removeTreeNode(page4Tree3Obj);
        }
    }
    /*
     *	����˵�����û�����Ϣxform��������
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
     *	����˵�����û�����û�tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadGroup2UserTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_USER_TREE);
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
     *	����˵�����û�����û�tree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadGroup2UserExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_USER_EXIST_TREE);
        if(null!=xmlIsland){
            var page4Tree3Obj = $("page4Tree3");
            page4Tree3Obj.load(xmlIsland.node);
        }
    }
    /*
     *	����˵�����û���Խ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadGroup2RoleTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_ROLE_TREE);
        if(null!=xmlIsland){
            var page3TreeObj = $("page3Tree");
            page3TreeObj.load(xmlIsland.node);
            page3TreeObj.research = true;
        }
    }
    /*
     *	����˵�����û���Խ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadGroup2RoleExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_ROLE_EXIST_TREE);
        if(null!=xmlIsland){
            var page3Tree2Obj = $("page3Tree2");
            page3Tree2Obj.load(xmlIsland.node);
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
        var appType = getAppType();
        var isRoot = isRootNode();
        getTreeOperation(treeNode,function(_operation){
            if(null==appType && true!=isRoot){
                var canShowUserList = checkOperation("6",_operation);
                var canView = checkOperation("5",_operation);
                var canEdit = checkOperation("4",_operation);

                if(true==canShowUserList){
                    showUserList();
                }else{
                    if(true==canEdit){
                        editTreeNode();                    
                    }else if(true==canView){
                        editTreeNode(false);
                    }                
                }
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
     *	����˵�������ҳ4�û������ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onPage4TreeNodeDoubleClick(eventObj){
        var treeObj = $("page4Tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var applicationId = treeNode.getAttribute("applicationId");
            initPage4Tree2(id,applicationId);
        }
    }
    /*
     *	����˵��������grid��
     *	������	event:eventObj     �¼�����
     *	����ֵ��
     */
    function onClickRow(eventObj){    
        Focus.focus("gridTitle");

        var rowIndex = eventObj.result.rowIndex_Xml;
        showUserStatus(rowIndex);

        //��ֹ��Ϊ���빤�������ݶ����²���Ӧ˫���¼�
        clearTimeout(window._toolbarTimeout);
        window._toolbarTimeout = setTimeout(function(){
            loadUserToolBarData(rowIndex);
        },0);
    }
    /*
     *	����˵����˫��grid��
     *	������	event:eventObj     �¼�����
     *	����ֵ��
     */
    function onDblClickRow(eventObj){
        var rowIndex = eventObj.result.rowIndex_Xml;
        getGridOperation(rowIndex,function(_operation){
            //���༭Ȩ��
            var edit = checkOperation("u2",_operation);
            var view = checkOperation("u3",_operation);

            if(true==edit){
                editUserInfo(true);
            }else if(true==view){
                editUserInfo(false);
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
     *	����˵������������Ӧ���û���
     *	������	string:cacheID      ��������ID
                boolean:isNew       �Ƿ�����
                string:parentID   ���ڵ�id������ʱ��Ҫ
     *	����ֵ��
     */
    function saveOtherGroup(cacheID,isNew,parentID){
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

            //�û��������Ϣ
            var groupInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_INFO);
            if(null!=groupInfoNode){
                var groupInfoDataNode = groupInfoNode.selectSingleNode(".//data");
                if(null!=groupInfoDataNode){
                    flag = true;

                    var prefix = groupInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(groupInfoDataNode,prefix);
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
     *	����˵���������û���
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

            //�û��������Ϣ
            var groupInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_INFO);
            if(null!=groupInfoNode){
                var groupInfoDataNode = groupInfoNode.selectSingleNode(".//data");
                if(null!=groupInfoDataNode){
                    flag = true;

                    var prefix = groupInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(groupInfoDataNode,prefix);
                }
            }

            //�û�����û�
            if("2"==groupType){
                var group2UserNode = Cache.XmlIslands.get(cacheID+"."+XML_GROUP_TO_USER_EXIST_TREE);
                if(null!=group2UserNode){
                    var group2UserDataIDs = getTreeNodeIds(group2UserNode,"./treeNode//treeNode");
                    if(0<group2UserDataIDs.length){
                        flag = true;
                        p.setContent(XML_GROUP_TO_USER_EXIST_TREE,group2UserDataIDs.join(","));
                    }
                }
            }

            //�û���Խ�ɫ
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

                    //�����û��飬����������Ϣ
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
     *	����˵���������û�
     *	������	string:cacheID          ��������ID
                boolean:isNew           �Ƿ�����
                string:groupId          �û���id
     *	����ֵ��
     */
    function saveUser(cacheID,isNew,groupId){
        //У��page1Form,page8Form������Ч��
        var page1FormObj = $("page1Form");
        var page8FormObj = $("page8Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }
        if(false==page8FormObj.checkForm()){
            switchToPhase(ws,"page8");
            return;
        }
        if("0" == page1FormObj.securityLevel){
            switchToPhase(ws,"page1");
            showPasswordSecurityLevel(page1FormObj);
            return;
        }

        //У���û�����page2Tree2������Ч��
        var page2Tree2Obj = $("page2Tree2");
        var user2GroupNode = new XmlNode(page2Tree2Obj.getTreeNodeById("_rootId").node);
        var groupType1TreeNode = user2GroupNode.selectSingleNode(".//treeNode[@groupType='1']");
        if(null==groupType1TreeNode){
            switchToPhase(ws,"page2");
            var balloon = Balloons.create("����Ҫ��һ�����û���");
            balloon.dockTo(page2Tree2Obj);
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_USER;

        //�Ƿ��ύ
        var flag = false;
        
        var userCache = Cache.Variables.get(cacheID);
        if(null!=userCache){

            //�û�������Ϣ
            var userInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_USER_INFO);
            if(null!=userInfoNode){
                var userInfoDataNode = userInfoNode.selectSingleNode(".//data");
                if(null!=userInfoDataNode){
                    flag = true;

                    var prefix = userInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(userInfoDataNode,prefix);
                }
            }

            //��֤������Ϣ
            var authenticateInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_AUTHENTICATE_INFO);
            if(null!=authenticateInfoNode){
                var authenticateInfoDataNode = authenticateInfoNode.selectSingleNode(".//data");
                if(null!=userInfoDataNode){
                    flag = true;

                    var prefix = authenticateInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(authenticateInfoDataNode,prefix);
                }
            }

            //�û����û���
            var user2GroupNode = Cache.XmlIslands.get(cacheID+"."+XML_USER_TO_GROUP_EXIST_TREE);
            if(null!=user2GroupNode){
                var user2GroupDataIDs = getTreeNodeIds(user2GroupNode,"./treeNode//treeNode");
                if(0<user2GroupDataIDs.length){
                    flag = true;
                    p.setContent(XML_USER_TO_GROUP_EXIST_TREE,user2GroupDataIDs.join(","));

					//���û���id
					var mainGroupId = groupType1TreeNode.getAttribute("id");
                    p.setContent("mainGroupId",mainGroupId);
                }
            }

            //�û��Խ�ɫ
            var user2RoleNode = Cache.XmlIslands.get(cacheID+"."+XML_USER_TO_ROLE_EXIST_TREE);
            if(null!=user2RoleNode){
                var user2RoleDataIDs = getTreeNodeIds(user2RoleNode,"./treeNode//treeNode");
                if(0<user2RoleDataIDs.length){
                    flag = true;
                    p.setContent(XML_USER_TO_ROLE_EXIST_TREE,user2RoleDataIDs.join(","));
                }
            }
        }

        if(true==flag){
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            var page1BtSaveObj = $("page1BtSave");
            var page2BtSaveObj = $("page2BtSave");
            var page3BtSaveObj = $("page3BtSave");
            var page8BtSaveObj = $("page8BtSave");
            syncButton([page1BtSaveObj,page2BtSaveObj,page3BtSaveObj,page8BtSaveObj],request);

            request.onsuccess = function(){
                //�������
                detachReminder(cacheID);

                //��������û�grid����
                delCacheData(CACHE_TREE_NODE_GRID + groupId);

                //�����ǰgrid��ʾΪ���û������飬��ˢ��grid
                var gridObj = $("grid");
                if(true==gridObj.hasData_Xml()){
                    var tempXmlIsland = new XmlNode(gridObj.getXmlDocument());
                    var tempGroupId = tempXmlIsland.getAttribute("groupId");
                    if(tempGroupId==groupId){
                        var tempApplicationId = tempXmlIsland.getAttribute("applicationId");
                        var tempGroupType = tempXmlIsland.getAttribute("groupType");

                        loadGridData(tempGroupId,tempApplicationId,tempGroupType,"1");//Ĭ�ϵ�1ҳ

                        //ˢ�¹�����
                        onInactiveRow();
                    }
                }

                if(true==isNew){
                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.send();;
        }
    }
    /*
     *	����˵������������Ӧ���û�
     *	������	string:cacheID          ��������ID
                boolean:isNew           �Ƿ�����
                string:groupId          ��id
     *	����ֵ��
     */
    function saveOtherUser(cacheID,isNew,groupId){
        //У��page1Form,page8Form������Ч��
        var page1FormObj = $("page1Form");
        var page8FormObj = $("page8Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }
        if(false==page8FormObj.checkForm()){
            switchToPhase(ws,"page8");
            return;
        }
        if("0" == page1FormObj.securityLevel){
            switchToPhase(ws,"page1");
            showPasswordSecurityLevel(page1FormObj);
            return;            
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_USER;

        //�Ƿ��ύ
        var flag = false;
        
        var userCache = Cache.Variables.get(cacheID);
        if(null!=userCache){       

            //�û�������Ϣ
            var userInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_USER_INFO);
            if(null!=userInfoNode){
                var userInfoDataNode = userInfoNode.selectSingleNode(".//data");
                if(null!=userInfoDataNode){
                    flag = true;

                    var prefix = userInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(userInfoDataNode,prefix);
                }
            }

            //��֤������Ϣ
            var authenticateInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_AUTHENTICATE_INFO);
            if(null!=authenticateInfoNode){
                var authenticateInfoDataNode = authenticateInfoNode.selectSingleNode(".//data");
                if(null!=userInfoDataNode){
                    flag = true;

                    var prefix = authenticateInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(authenticateInfoDataNode,prefix);
                }
            }

            //�û����û���
            var user2GroupNode = Cache.XmlIslands.get(cacheID+"."+XML_USER_TO_GROUP_EXIST_TREE);
            if(null!=user2GroupNode){
                var user2GroupDataIDs = getTreeNodeIds(user2GroupNode,"./treeNode//treeNode");
                if(0<user2GroupDataIDs.length){
                    flag = true;
                    p.setContent(XML_USER_TO_GROUP_EXIST_TREE,user2GroupDataIDs.join(","));
                    //���û���id
                    var groupType1TreeNode = user2GroupNode.selectSingleNode("./treeNode//treeNode");
                    if(null!=groupType1TreeNode){
                        var mainGroupId = groupType1TreeNode.getAttribute("id");
                        p.setContent("mainGroupId",mainGroupId);
                    }
                }
            }
        }

        if(true==flag){
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            var page1BtSaveObj = $("page1BtSave");
            var page8BtSaveObj = $("page8BtSave");
            syncButton([page1BtSaveObj,page8BtSaveObj],request);

            request.onsuccess = function(){
                //�������
                detachReminder(cacheID);

                //��������û�grid����
                delCacheData(CACHE_TREE_NODE_GRID + groupId);

                //�����ǰgrid��ʾΪ���û������飬��ˢ��grid
                var gridObj = $("grid");
                if(true==gridObj.hasData_Xml()){
                    var tempXmlIsland = new XmlNode(gridObj.getXmlDocument());
                    var tempGroupId = tempXmlIsland.getAttribute("groupId");
                    if(tempGroupId==groupId){
                        var tempApplicationId = tempXmlIsland.getAttribute("applicationId");
                        var tempGroupType = tempXmlIsland.getAttribute("groupType");

                        loadGridData(tempGroupId,tempApplicationId,tempGroupType,"1");//Ĭ�ϵ�1ҳ

                        //ˢ�¹�����
                        onInactiveRow();
                    }
                }

                if(true==isNew){
                    var ws = $("ws");
                    ws.closeActiveTab();
                }
            }
            request.send();
        }
    }
    /*
     *	����˵������ʾ�û��б�
     *	������	                
     *	����ֵ��
     */
    function showUserList(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var applicationId = treeNode.getAttribute("applicationId");
            var groupType = treeNode.getAttribute("groupType");
            initGrid(id,applicationId,groupType);
        }
    }
    /*
     *	����˵�����½��û�
     *	������	
     *	����ֵ��
     */
    function addNewUser(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var treeType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");
            var disabled = treeNode.getAttribute("disabled");

            var userName = "�û�";
            var userID = new Date().valueOf();

            if("1"==treeType || "2"==treeType){//���û���͸����û���

                var phases = [];
                phases[0] = {page:"page1",label:"������Ϣ"};
                phases[1] = {page:"page8",label:"��֤��Ϣ"};
                phases[2] = {page:"page2",label:"�û���"};
                phases[3] = {page:"page3",label:"��ɫ"};

                var callback = {};
                callback.onTabClose = function(eventObj){
                    delCacheData(eventObj.tab.SID);
                };
                callback.onTabChange = function(){
                    setTimeout(function(){
                        loadUserDetailData(userID,true,treeID,applicationId,true,disabled);
                    },TIMEOUT_TAB_CHANGE);
                };

                var inf = {};
                inf.defaultPage = "page1";
                inf.label = OPERATION_ADD.replace(/\$label/i,userName);
                inf.phases = phases;
                inf.callback = callback;
                inf.SID = CACHE_GRID_ROW_DETAIL + userID;
                var tab = ws.open(inf);

            }else{//����Ӧ��

                var phases = [];
                phases[0] = {page:"page1",label:"������Ϣ"};
                phases[1] = {page:"page8",label:"��֤��Ϣ"};
//                phases[2] = {page:"page2",label:"�û���"};

                var callback = {};
                callback.onTabClose = function(eventObj){
                    delCacheData(eventObj.tab.SID);
                };
                callback.onTabChange = function(){
                    setTimeout(function(){
                        loadOtherUserDetailData(userID,true,treeID,applicationId,true);
                    },TIMEOUT_TAB_CHANGE);
                };

                var inf = {};
                inf.defaultPage = "page1";
                inf.label = OPERATION_ADD.replace(/\$label/i,userName);
                inf.phases = phases;
                inf.callback = callback;
                inf.SID = CACHE_GRID_ROW_DETAIL + userID;
                var tab = ws.open(inf);

            }
        }
    }
    /*
     *	����˵�����½��û���
     *	������	
     *	����ֵ��
     */
    function addNewGroup(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var treeType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");
            var disabled = treeNode.getAttribute("disabled");

            var groupName = "�û���";
            var groupID = new Date().valueOf();

            switch(treeType){
                case "1"://���û���
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page3",label:"��ɫ"};

                    var callback = {};
                    callback.onTabClose = function(eventObj){
                        delCacheData(eventObj.tab.SID);
                    };
                    callback.onTabChange = function(){
                        setTimeout(function(){
                            loadGroupDetailData(groupID,true,treeID,treeType,applicationId,true,disabled);
                        },TIMEOUT_TAB_CHANGE);
                    };

                    var inf = {};
                    inf.defaultPage = "page1";
                    inf.label = OPERATION_ADD.replace(/\$label/i,groupName);
                    inf.phases = phases;
                    inf.callback = callback;
                    inf.SID = CACHE_TREE_NODE_DETAIL + groupID;
                    var tab = ws.open(inf);
                    break;
                case "2"://�����û���
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page4",label:"�û�"};
                    phases[2] = {page:"page3",label:"��ɫ"};

                    var callback = {};
                    callback.onTabClose = function(eventObj){
                        delCacheData(eventObj.tab.SID);
                    };
                    callback.onTabChange = function(){
                        setTimeout(function(){
                            loadGroupDetailData(groupID,true,treeID,treeType,applicationId,true,disabled);
                        },TIMEOUT_TAB_CHANGE);
                    };

                    var inf = {};
                    inf.defaultPage = "page1";
                    inf.label = OPERATION_ADD.replace(/\$label/i,groupName);
                    inf.phases = phases;
                    inf.callback = callback;
                    inf.SID = CACHE_TREE_NODE_DETAIL + groupID;
                    var tab = ws.open(inf);
                    break;
                case "3"://����Ӧ���µ��û���
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page4",label:"�û�"};
                    phases = null;//��ʱ������

                    var callback = {};
                    callback.onTabClose = function(eventObj){
                        delCacheData(eventObj.tab.SID);
                    };
                    callback.onTabChange = function(){
                        setTimeout(function(){
                            loadOtherGroupDetailData(groupID,true,treeID,treeType,applicationId,true,disabled);
                        },TIMEOUT_TAB_CHANGE);
                    };

                    var inf = {};
                    inf.defaultPage = "page1";
                    inf.label = OPERATION_ADD.replace(/\$label/i,groupName);
                    inf.phases = phases;
                    inf.callback = callback;
                    inf.SID = CACHE_TREE_NODE_DETAIL + groupID;
                    var tab = ws.open(inf);
                    break;
                default://Ӧ�ýڵ�
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page4",label:"�û�"};
                    phases = null;//��ʱ������

                    var callback = {};
                    callback.onTabClose = function(eventObj){
                        delCacheData(eventObj.tab.SID);
                    };
                    callback.onTabChange = function(){
                        setTimeout(function(){
                            loadOtherGroupDetailData(groupID,true,treeID,treeType,applicationId,true);
                        },TIMEOUT_TAB_CHANGE);
                    };

                    var inf = {};
                    inf.defaultPage = "page1";
                    inf.label = OPERATION_ADD.replace(/\$label/i,groupName);
                    inf.phases = phases;
                    inf.callback = callback;
                    inf.SID = CACHE_TREE_NODE_DETAIL + groupID;
                    var tab = ws.open(inf);
                    break;
            }
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
                case "1"://���û���
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
                case "2"://�����û���
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page4",label:"�û�"};
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
                case "3"://����Ӧ���µ��û���
                default://Ӧ��
                    var phases = [];
                    phases[0] = {page:"page1",label:"������Ϣ"};
                    phases[1] = {page:"page4",label:"�û�"};
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
     *	����˵����ɾ�����ڵ�
     *	������	
     *	����ֵ��
     */
    function delTreeNode(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }
        var resourceTypeId = getResourceTypeId();
        switch(resourceTypeId){
            case "5":
                delApplication();
                break;
            default:
                delGroup();
                break;
        }
    }
    /*
     *	����˵����ɾ���û���
     *	������	
     *	����ֵ��
     */
    function delGroup(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");
            
            var p = new HttpRequestParams();
            p.url = URL_DEL_GROUP;
            p.setContent("groupId",treeID);
            p.setContent("groupType",treeType);
            p.setContent("applicationId", applicationId);

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
     *	����˵�����ƶ��û�
     *	������	
     *	����ֵ��
     */
    function moveUserTo(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var userID = rowNode.getAttribute("id");
        var userName = rowNode.getAttribute("userName");
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        var applicationID = gridObj.getXmlDocument().getAttribute("applicationId");
        var groupID = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"==groupID){
			if(null!=rowIndex){
				var curRowNode = gridObj.getRowNode_Xml(rowIndex);
				groupID = curRowNode.getAttribute("groupId");
			}
        }

        //�����������ݴӺ�̨��ȡ
        var xmlIsland = null;

        var group = getGroup(groupID,xmlIsland,"�ƶ�\""+userName+"\"��",groupType,applicationID,"2");
        if(null!=group){
            var p = new HttpRequestParams();
            p.url = URL_MOVE_USER;
            p.setContent("toGroupId",group.id);
            p.setContent("userId",userID);
            p.setContent("groupId",groupID);

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //��grid��ɾ��
                gridObj.delRow_Xml(rowIndex);

                //ˢ�¹�����
                onInactiveRow();
            }
            request.send();
        }
    }
    /*
     *	����˵�����ƶ��û���
     *	������	
     *	����ֵ��
     */
    function moveGroupTo(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();
            var treeNodeName = treeNode.getName();
            var groupType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");

            var group = getGroup(treeNodeID,null,"�ƶ�\""+treeNodeName+"\"��",groupType,applicationId,"5");
            if(null!=group){
                var p = new HttpRequestParams();
                p.url = URL_MOVE_GROUP;
                p.setContent("toGroupId",group.id);
                p.setContent("groupId",treeNodeID);
                p.setContent("direction",2);//2��ʾ�����ƶ�

                var request = new HttpRequest(p);
                request.onsuccess = function(){
                    //�ƶ����ڵ�
                    var curNode = treeObj.getTreeNodeById(treeNodeID);
                    var xmlNode = new XmlNode(curNode.node);
                    if(""!=group.appId){// ��Ӧ��ϵͳ�ƶ�
                        var parentNode = treeObj.getTreeNodeById(group.appId);
                    }else{
                        var parentNode = treeObj.getTreeNodeById(group.id);
                    }
                    //���ڵ�ͣ��������
                    var parentNodeState = parentNode.getAttribute("disabled");
                    if("1"==parentNodeState){
                        //����ͣ��״̬
                        refreshGroupStates(xmlNode,"1");
                    }
                    parentNode.node.appendChild(curNode.node);
                    parentNode.node.setAttribute("_open","true");

                    clearOperation(xmlNode);

                    treeObj.reload();
                }
                request.send();
            }
        }
    }
    /*
     *	����˵����ͬһ���ڵ����ƶ��û���
     *	������	
     *	����ֵ��
     */
    function sortGroupTo(eventObj){
        var treeObj = $("tree");
        var movedTreeNode = eventObj.movedTreeNode;
        var toTreeNode = eventObj.toTreeNode;
        var moveState = eventObj.moveState;

        var moveId = movedTreeNode.getId();
        var appType = movedTreeNode.getAttribute("appType");
        var toId = toTreeNode.getId();

        if(null!=movedTreeNode){
            if("-2"==moveId || "-3"==moveId || "-4"==moveId){
                alert("�����ƶ��˽ڵ�!");
                return;
            }
        }

        var p = new HttpRequestParams();
        if(null==appType){//�û���
            p.url = URL_SORT_GROUP;
            p.setContent("toGroupId",toId);
            p.setContent("groupId",moveId);
            p.setContent("direction",moveState);//-1Ŀ���Ϸ�,1Ŀ���·�
        }else{//Ӧ��
            p.url = URL_SORT_APPLICATION;
            p.setContent("toAppId",toId);
            p.setContent("appId",moveId);
            p.setContent("direction",moveState);//-1Ŀ���Ϸ�,1Ŀ���·�
        }

        var request = new HttpRequest(p);
        request.onsuccess = function(){
            //alert("�ƶ��û���ɹ�");

            //�ƶ����ڵ�
            treeObj.moveTreeNode(movedTreeNode, toTreeNode, moveState);
        }
        request.send();
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
     *	����˵������ȡ�û���״̬
     *	������	
     *	����ֵ��
     */
    function getGroupState(){
        return getTreeAttribute("disabled");
    }
    /*
     *	����˵������ȡ�û�������
     *	������	
     *	����ֵ��
     */
    function getGroupType(){
        return getTreeAttribute("groupType");
    }
    /*
     *	����˵������ȡӦ������
     *	������	
     *	����ֵ��
     */
    function getAppType(){
        return getTreeAttribute("appType");
    }
    /*
     *	����˵������ȡ��Դ����
     *	������	
     *	����ֵ��
     */
    function getResourceTypeId(){
        return getTreeAttribute("resourceTypeId");
    }
    /*
     *	����˵����ͣ���û���
     *	������	
     *	����ֵ��
     */
    function stopGroup(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");

            var p = new HttpRequestParams();
            p.url = URL_STOP_GROUP;
            p.setContent("groupId",treeID);
            p.setContent("groupType",treeType);
            p.setContent("applicationId",applicationId);
            p.setContent("disabled","1");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //����ͣ��״̬
                var xmlNode = new XmlNode(treeNode.node);
                refreshGroupStates(xmlNode,"1");

                //ˢ�¹�����
                loadToolBarData(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵���������û���
     *	������	
     *	����ֵ��
     */
    function startGroup(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");

            var p = new HttpRequestParams();
            p.url = URL_START_GROUP;
            p.setContent("groupId",treeID);
            p.setContent("groupType",treeType);
            p.setContent("applicationId",applicationId);
            p.setContent("disabled","0");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //��������״̬
                var xmlNode = new XmlNode(treeNode.node);
                refreshGroupStates(xmlNode,"0");

                //ˢ�¹�����
                loadToolBarData(treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵����ˢ�¸�������û���ͣ������״̬
     *	������	XmlNode:curNode         XmlNodeʵ��
                string:state            ͣ/����״̬
     *	����ֵ��
     */
    function refreshGroupStates(curNode,state){
        var curNodeID = curNode.getAttribute("id");
        refreshGroupState(curNode,state);

        //����ڵ���/ͣ��ȫ�����ݣ�����ڵ��������ݣ�ͣ������
        if("1"==state){    //true==isTopLevelNode(curNode)  UMSû������ 2007-4-3 modified by wuzy
            var childNodes = curNode.selectNodes(".//treeNode");
            for(var i=0,iLen=childNodes.length;i<iLen;i++){                
                refreshGroupState(childNodes[i],state);
            }
        }else if("0"==state){
            while(null!=curNode && false==isRootNode(curNodeID) && null==curNode.getAttribute("appType")){
                refreshGroupState(curNode,state);

                curNode = curNode.getParent();
                if(null!=curNode){
                    curNodeID = curNode.getAttribute("id");
                }
            }
        }

        var treeObj = $("tree");
        treeObj.reload();    
    }
    /*
     *	����˵�����Ƿ���ڵ�
     *	������	    string:id           ���ڵ�id(��δ�ṩ���Զ�ȡ����ǰ�ڵ�)
     *	����ֵ��    boolean:flag        �Ƿ���ڵ�
     */
    function isRootNode(id){
        if(null==id){
            var treeObj = $("tree");
            var treeNode = treeObj.getActiveTreeNode();
            if(null!=treeNode){
                id = treeNode.getId();
            }            
        }
        var flag = ("-1"==id || "-2"==id || "-3"==id || "-4"==id || "-7"==id || "-8"==id || "-9"==id);   // ��ע���û��� �� δע���û���
        return flag;
    }
    /*
     *	����˵�����Ƿ���������
     *	������	    string:id           ���ڵ�id(��δ�ṩ���Զ�ȡ����ǰ�ڵ�)
     *	����ֵ��    boolean:flag        �Ƿ���������
     */
    function isOtherGroup(id){
        if(null==id){
            var treeObj = $("tree");
            var treeNode = treeObj.getActiveTreeNode();
            if(null!=treeNode){
                id = treeNode.getId();
            }            
        }
        var flag = ("-4"==id);
        return flag;
    }
    /*
     *	����˵�����Ƿ���ע���û���ڵ�
     *	������	    string:id           ���ڵ�id(��δ�ṩ���Զ�ȡ����ǰ�ڵ�)
     *	����ֵ��    boolean:flag        �Ƿ���ڵ�
     */
    function isSelfRegisterNode(id){
        if(null==id){
            var treeObj = $("tree");
            var treeNode = treeObj.getActiveTreeNode();
            if(null!=treeNode){
                id = treeNode.getId();
            }            
        }
        var flag = ("-7"==id || "-8"==id || "-9"==id);
        return flag;
    }
    /*
     *	����˵�����Ƿ񶥲�ڵ�(ע���Ǹ��ڵ�)
     *	������	XmlNode:xmlNode       XmlNodeʵ��
     *	����ֵ��
     */
    function isTopLevelNode(xmlNode){
        var parentNode = xmlNode.getParent();
        var parentNodeID = parentNode.getAttribute("id");

        return isRootNode(parentNodeID);
    }
    /*
     *	����˵����ˢ���û���ͣ������״̬
     *	������	XmlNode:xmlNode         XmlNodeʵ��
                string:state            ͣ/����״̬
     *	����ֵ��
     */
    function refreshGroupState(xmlNode,state){
        xmlNode.setAttribute("disabled",state);
        xmlNode.setAttribute("icon",ICON + "user_group" + (state=="0"?"":"_2") + ".gif");

        //����û��б���
        var treeID = xmlNode.getAttribute("id");
        delCacheData(CACHE_TREE_NODE_GRID + treeID);
    }
    /*
     *	����˵������ȡ�û�״̬
     *	������	
     *	����ֵ��
     */
    function getUserState(){
        var userState = null;
        var gridObj = $("grid");
        var curRowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        if(null!=curRowIndex){
            var curRowNode = gridObj.getRowNode_Xml(curRowIndex);
            userState = curRowNode.getAttribute("disabled");
        }
        return userState;   
    }
    /*
     *	����˵����ͣ���û�
     *	������	
     *	����ֵ��
     */
    function stopUser(){

        var gridObj = $("grid");
        var curRowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        if(null!=curRowIndex){
            var curRowNode = gridObj.getRowNode_Xml(curRowIndex);
            var curRowID = curRowNode.getAttribute("id");

            var p = new HttpRequestParams();
            p.url = URL_STOP_USER;
            p.setContent("userId",curRowID);
            p.setContent("accountState","1");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //�ɹ�������״̬
                gridObj.modifyNamedNode_Xml(curRowIndex,"disabled","1");
                gridObj.modifyNamedNode_Xml(curRowIndex,"icon",ICON + "user_2.gif");

                //ˢ�¹�����
                loadUserToolBarData(curRowIndex);
            }
            request.send();
        }
    }
    /*
     *	����˵���������û�
     *	������	
     *	����ֵ��
     */
    function startUser(){

        var gridObj = $("grid");
        var curRowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        if(null!=curRowIndex){
            var curRowNode = gridObj.getRowNode_Xml(curRowIndex);
            var curRowID = curRowNode.getAttribute("id");
            var groupID = gridObj.getXmlDocument().getAttribute("groupId");
            if("search"==groupID){
                groupID = curRowNode.getAttribute("groupId");
            }

            var p = new HttpRequestParams();
            p.url = URL_START_USER;
            p.setContent("userId",curRowID);
            p.setContent("groupId",groupID);
            p.setContent("accountState","0");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                //�ɹ�������״̬
                gridObj.modifyNamedNode_Xml(curRowIndex,"disabled","0");
                gridObj.modifyNamedNode_Xml(curRowIndex,"icon",ICON + "user.gif");

                //������
                var treeObj = $("tree");
                var treeNode = treeObj.getTreeNodeById(groupID);
                if(null!=treeNode){
                    var xmlNode = new XmlNode(treeNode.node);
                    refreshGroupStates(xmlNode,"0");
                }

                //ˢ�¹�����
                loadUserToolBarData(curRowIndex);
            }
            request.send();
        }
    }
    /*
     *	����˵����ͬ���û���
     *	������	string:mode     ͬ����ʽ(1��ȫͬ��/2����ͬ��)
     *	����ֵ��
     */
    function syncGroup(mode){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();

            var p = new HttpRequestParams();
            p.url = URL_SYNC_GROUP;

            var applicationId = treeNode.getAttribute("applicationId");
            var dbGroupId = treeNode.getAttribute("dbGroupId");
            p.setContent("applicationId",applicationId);
            p.setContent("groupId",treeNodeID);
            p.setContent("dbGroupId",dbGroupId);
            p.setContent("mode",mode);

            var request = new HttpRequest(p);
//            request.onsuccess = function(){
//                loadInitData();
//            }
            request.onresult = function(){
                var data = this.getNodeValue("ProgressInfo");
                var progress = new Progress(URL_SYNC_PROGRESS,data,URL_CANCEL_SYNC_PROGRESS);
                progress.oncomplete = function(){
                    loadInitData();
                }
                progress.start();
            }
            request.send();
        }    
    }
    /*
     *	����˵����ģ����Ӧ�û���
     *	������	
     *	����ֵ��
     */
    function autoMappingGroup(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeNodeID = treeNode.getId();
            var treeNodeName = treeNode.getName();

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadAutoMappingData(treeNodeID);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_AUTO_MAPPING.replace(/\$label/i,treeNodeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_AUTO_MAPPING + treeNodeID;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵����ģ����Ӧ��Ϣ��������
     *	������	string:treeID     �û�id
     *	����ֵ��
     */
    function loadAutoMappingData(treeID){
        var cacheID = CACHE_AUTO_MAPPING + treeID;
        var autoMappingDetail = Cache.Variables.get(cacheID);
        if(null==autoMappingDetail){
            var p = new HttpRequestParams();
            p.url = URL_AUTO_MAPPING;
            p.setContent("groupId", treeID);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var autoMappingInfoNode = this.getNodeValue(XML_AUTO_MAPPING);

                var autoMappingInfoNodeID = cacheID+"."+XML_AUTO_MAPPING;

                Cache.XmlIslands.add(autoMappingInfoNodeID,autoMappingInfoNode);

                Cache.Variables.add(cacheID,[autoMappingInfoNodeID]);

                initAutoMappingPages(cacheID);
            }
            request.send();
        }else{
            initAutoMappingPages(cacheID);
        }
    }
    /*
     *	����˵����ģ����Ӧ���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initAutoMappingPages(cacheID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadAutoMappingInfoFormData(cacheID);
        });

        //���÷�ҳ��ť��ʾ״̬
        var page1BtPrevObj = $("page1BtPrev");
        var page1BtNextObj = $("page1BtNext");
        page1BtPrevObj.style.display = "none";
        page1BtNextObj.style.display = "none";

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.onclick = function(){
            saveAutoMapping(cacheID);
        }
    }
    /*
     *	����˵����ģ����Ӧxform��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadAutoMappingInfoFormData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_AUTO_MAPPING);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵��������ģ����Ӧ
     *	������	string:cacheID      ��������ID
     *	����ֵ��
     */
    function saveAutoMapping(cacheID){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_AUTO_MAPPING;

        //�Ƿ��ύ
        var flag = false;
        
        var groupCache = Cache.Variables.get(cacheID);
        if(null!=groupCache){       

            //ģ����Ӧ������Ϣ
            var autoMappingInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_AUTO_MAPPING);
            if(null!=autoMappingInfoNode){
                var autoMappingInfoDataNode = autoMappingInfoNode.selectSingleNode(".//data");
                if(null!=autoMappingInfoDataNode){
                    flag = true;

                    var prefix = autoMappingInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                    p.setXFormContent(autoMappingInfoDataNode,prefix);
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
            }
            request.send();
        }
    }
    /*
     *	����˵����page4Tree2��ʼ��
     *	������	string:id					������ڵ�id
                string:applicationId        Ӧ��id
                string:groupType            ������
     *	����ֵ��
     */
    function initPage4Tree2(id,applicationId,groupType){
        var page4Tree2Obj = $("page4Tree2");
        Public.initHTC(page4Tree2Obj,"isLoaded","oncomponentready",function(){
            loadPage4Tree2Data(id,applicationId);
        });
    }
    /*
     *	����˵����grid��������
     *	������	string:treeID				������ڵ�id
                string:applicationId        Ӧ��id
                string:groupType            ������
     *	����ֵ��
     */
    function loadPage4Tree2Data(treeID,applicationId){
        var cacheID = CACHE_GROUP_TO_USER_GRID + treeID;
        var treeGrid = Cache.Variables.get(cacheID);

		var p = new HttpRequestParams();
		p.url = URL_GROUP_TO_USER_LIST;
		p.setContent("groupId", treeID);
		p.setContent("applicationId", applicationId)

		var request = new HttpRequest(p);
		request.onresult = function(){
			var sourceListNode = this.getNodeValue(XML_GROUP_TO_USER_LIST_TREE);
			var sourceListNodeID = cacheID+"."+XML_GROUP_TO_USER_LIST_TREE;

			Cache.XmlIslands.add(sourceListNodeID,sourceListNode);
			Cache.Variables.add(cacheID,[sourceListNodeID]);

			loadPage4Tree2DataFromCache(cacheID);
		}
		request.send();
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
     *	����˵����ɾ���û�
     *	������	
     *	����ֵ��
     */
    function delUser(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var rowID = rowNode.getAttribute("id");
        var groupID = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"==groupID){
            groupID = rowNode.getAttribute("groupId");
        }
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");

        var p = new HttpRequestParams();
        p.url = URL_DEL_USER;
        p.setContent("userId",rowID);
        p.setContent("groupId",groupID);
        p.setContent("groupType",groupType);

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
     *	����˵�����û�����һ��
     *	������	
     *	����ֵ��
     */
    function moveUserDown(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowID = gridObj.getRowNode_Xml(rowIndex).getAttribute("id");
        var groupID = gridObj.getXmlDocument().getAttribute("groupId");

        var visibleIndex = gridObj.getVisibleIndexFromRowIndex(rowIndex);
        var visibleNextIndex = visibleIndex + 1;
        var len = gridObj.getVisibleRowsLength();
        
        var toolbarObj = $("gridToolBar");
        var totalpages = toolbarObj.getTotalPages();
        var curPage = toolbarObj.getCurrentPage();

        var p = new HttpRequestParams();
        if(len-1>visibleIndex){
            var nextRowIndex = gridObj.getRowIndexFromVisibleIndex(visibleNextIndex);
            var nextRowID = gridObj.getRowNode_Xml(nextRowIndex).getAttribute("id");

            p.url = URL_SORT_USER;
            p.setContent("userId",rowID);
            p.setContent("groupId",groupID);
            p.setContent("toUserId",nextRowID);
            p.setContent("direction","1");
        }else{//��ǰҳ���һ������ʱ
            var nextRowIndex = null;

            p.url = URL_SORT_USER_CROSS_PAGE;
            p.setContent("userId",rowID);
            p.setContent("groupId",groupID);
            p.setContent("page", curPage);
            p.setContent("direction", "1");
        }

        var request = new HttpRequest(p);
        request.onsuccess = function(){
            if(null!=nextRowIndex){
                gridObj.moveRow_Xml([rowIndex],nextRowIndex);
                loadUserToolBarData(nextRowIndex);
            }else{//��ǰҳ���һ������ʱ
                toolbarObj.gotoPage(curPage);
            }
        }
        request.send();
    }
    /*
     *	����˵�����û�����һ��
     *	������	
     *	����ֵ��
     */
    function moveUserUp(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowID = gridObj.getRowNode_Xml(rowIndex).getAttribute("id");
        var groupID = gridObj.getXmlDocument().getAttribute("groupId");

        var visibleIndex = gridObj.getVisibleIndexFromRowIndex(rowIndex);
        var visibleNextIndex = visibleIndex - 1;

        var toolbarObj = $("gridToolBar");
        var curPage = toolbarObj.getCurrentPage();

        var p = new HttpRequestParams();
        if(0<visibleIndex){
            var nextRowIndex = gridObj.getRowIndexFromVisibleIndex(visibleNextIndex);
            var nextRowID = gridObj.getRowNode_Xml(nextRowIndex).getAttribute("id");

            p.url = URL_SORT_USER;
            p.setContent("userId",rowID);
            p.setContent("groupId",groupID);
            p.setContent("toUserId",nextRowID);
            p.setContent("direction","-1");
        }else{//��ǰҳ��һ������ʱ
            var nextRowIndex = null;

            p.url = URL_SORT_USER_CROSS_PAGE;
            p.setContent("userId",rowID);
            p.setContent("groupId",groupID);
            p.setContent("page", curPage);
            p.setContent("direction", "-1");
        }

        var request = new HttpRequest(p);
        request.onsuccess = function(){
            if(null!=nextRowIndex){
                gridObj.moveRow_Xml([rowIndex],nextRowIndex);
                loadUserToolBarData(nextRowIndex);
            }else{//��ǰҳ��һ������ʱ
                toolbarObj.gotoPage(curPage);
            }
        }
        request.send();
    }
    /*
     *	����˵�����Ƿ������(ͬһ�û������ƶ�)�û�
     *	������	
     *	����ֵ��
     */
    function canMoveUserDown(){
        var flag = false;
        var gridObj = $("grid");
        var groupId = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"!=groupId){
            var sortType = gridObj.getCurrentSortType();
            if("default"==sortType){
                var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
                var visibleIndex = gridObj.getVisibleIndexFromRowIndex(rowIndex);
                var len = gridObj.getVisibleRowsLength();
                if(len-1>visibleIndex){
                    flag = true;
                }else{
                    var toolbarObj = $("gridToolBar");
                    var totalpages = toolbarObj.getTotalPages();
                    var curPage = toolbarObj.getCurrentPage();
                    if(curPage<totalpages){
                        flag = true;
                    }
                }
            }
        }
        return flag;
    }
    /*
     *	����˵�����Ƿ������(ͬһ�û������ƶ�)�û�
     *	������	
     *	����ֵ��
     */
    function canMoveUserUp(){
        var flag = false;
        var gridObj = $("grid");
        var groupId = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"!=groupId){
            var sortType = gridObj.getCurrentSortType();
            if("default"==sortType){
                var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
                var visibleIndex = gridObj.getVisibleIndexFromRowIndex(rowIndex);
                if(0<visibleIndex){
                    flag = true;
                }else{
                    var toolbarObj = $("gridToolBar");
                    var curPage = toolbarObj.getCurrentPage();
                    if(curPage>1){
                        flag = true;
                    }
                }
            }
        }
        return flag;
    }
    /*
     *	����˵���������û�
     *	������	
     *	����ֵ��
     */
    function searchUser(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var groupType = treeNode.getAttribute("groupType");
            var applicationID = treeNode.getAttribute("applicationId");
            var cacheID = CACHE_SEARCH_USER + treeID;

            var condition = window.showModalDialog("searchuser.htm",{groupId:treeID,groupType:groupType,applicationId:applicationID,title:"����\""+treeName+"\"�µ��û�"},"dialogWidth:250px;dialogHeight:250px;");
            if(null!=condition){
                Cache.Variables.add("condition",condition);
                loadSearchGridData(cacheID,1);
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
    function loadSearchGridData(cacheID,page,sortName,direction){
        var condition = Cache.Variables.get("condition");
        if(null!=condition){
            var p = new HttpRequestParams();
            p.url = URL_SEARCH_USER;

            var xmlReader = new XmlReader(condition.dataXml);
            var dataNode = new XmlNode(xmlReader.documentElement);
            p.setXFormContent(dataNode,condition.prefix);
            p.setContent("page",page);
            if(null!=sortName && null!=direction){
                p.setContent("field", sortName);
                p.setContent("orderType", direction);
            }

            var row = dataNode.selectSingleNode("row");
            var groupType = row.getCDATA("groupType");
            var applicationID = row.getCDATA("applicationId");

			p.setContent("applicationId", applicationID);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var sourceListNode = this.getNodeValue(XML_USER_LIST);
                var sourceListNodeID = cacheID+"."+XML_USER_LIST;

                var pageListNode = this.getNodeValue(XML_PAGE_LIST);
                var pageListNodeID = cacheID+"."+XML_PAGE_LIST;

                //���û�grid���ݸ��ڵ�����groupType,applicationId������
                sourceListNode.setAttribute("groupType",groupType);
                sourceListNode.setAttribute("groupId","search");//�����û�����Ƚ����⣬����������ֵ��������
                sourceListNode.setAttribute("applicationId",applicationID);

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
            request.send();;
        }
    }
    /*
     *	����˵������ʼ�������û�grid
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
     *	����˵��������page4Tree������
     *	������	string:cacheID            ��������id
                string:applicationId      Ӧ��id
     *	����ֵ��
     */
    function updatePage4TreeData(cacheID,applicationId){
        var group2UserTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE).cloneNode(false);
        var group2UserTreeNodeID = cacheID+"."+XML_GROUP_TO_USER_TREE;
        Cache.XmlIslands.add(group2UserTreeNodeID,group2UserTreeNode);

        //ֻ����ͬһӦ��ϵͳ��
        var mainTreeNode = Cache.XmlIslands.get(CACHE_MAIN_TREE);
        var applicationNode = mainTreeNode.selectSingleNode(".//treeNode[@applicationId='"+applicationId+"']");
        if(null!=applicationNode){
            applicationNode = applicationNode.cloneNode(true);
            group2UserTreeNode.appendChild(applicationNode);
        }

        //����������
        var page4TreeObj = $("page4Tree");
        Public.initHTC(page4TreeObj,"isLoaded","oncomponentready",function(){
            loadGroup2UserTreeData(cacheID);
        });

        //�л�Ӧ�ú����page4Tree2����
        var page4Tree2Obj = $("page4Tree2");
        Public.initHTC(page4Tree2Obj,"isLoaded","oncomponentready",function(){
            clearTreeData(page4Tree2Obj);
        });

        //�л�Ӧ�ú����page4Tree3����
        var page4Tree3Obj = $("page4Tree3");
        Public.initHTC(page4Tree3Obj,"isLoaded","oncomponentready",function(){
            clearTreeData(page4Tree3Obj);
        });
    }
    /*
     *	����˵����ģ����Ӧѡ���Ӧ��
     *	������	string:groupId          ��id��
                string:groupName        ������
     *	����ֵ��
     */
    function chooseAutoMappingGroup(groupId,groupName){

        //�����������ݴӺ�̨��ȡ
        var xmlIsland = null;

        var group = getGroup(null,xmlIsland,"ѡ��ģ����Ӧ��","1",null,"3");
        if(null!=group){
            var page1FormObj = $("page1Form");
            page1FormObj.updateDataExternal(groupId,group.id);
            page1FormObj.updateDataExternal(groupName,group.name);
        }
    }
    /*
     *	����˵��������ģ̬����ѡ���û���
     *	������	string:id               ��/�û�id
                XmlNode:xmlIsland       ����и�ֵ�������ݲ��Ӻ�̨ȡ
                string:title            �������ڱ���
                string:groupType        �û�������
                string:applicationId    �û�������Ӧ��
                string:type             1:�����/2:����û�/3:�鿴��
     *	����ֵ��
     */
    function getGroup(id,xmlIsland,title,groupType,applicationId,type){
        var group = window.showModalDialog("grouptree.htm",{id:id,xmlIsland:xmlIsland,title:title,groupType:groupType,applicationId:applicationId,type:type},"dialogWidth:300px;dialogHeight:400px;");
        return group;
    }
    /*
     *	����˵������ʼ������
     *	������	
     *	����ֵ��
     */
    function resetPassword(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var pwd = "";
            var first = true;
            while(""==pwd){
                if(true!=first){
                    alert("���벻��Ϊ��");
                }
                pwd = prompt("������������","","��ʼ��\""+treeName+"\"������",true);
                first = false;
            }
            if(null!=pwd){
                var p = new HttpRequestParams();
                p.url = URL_CHECK_GROUP_PASSWORD;
                p.setContent("password",pwd);
                p.setContent("id",treeID);

                var request = new HttpRequest(p);
                request.onresult = function(error){
                    var securityLevel = this.getNodeValue(XML_SECURITY_LEVEL);
                    var errorInfo = {
                        0:"����������밲ȫ�ȼ�Ϊ\"������\"������ȫ",
                        1:"����������밲ȫ�ȼ�Ϊ\"��\"��ֻ�ܱ��ϻ�����ȫ",
                        2:"����������밲ȫ�ȼ�Ϊ\"��\"���ϰ�ȫ",
                        3:"����������밲ȫ�ȼ�Ϊ\"��\"���ܰ�ȫ"
                    };

                    var flag = false;
                    if("0" == securityLevel){
                        alert(errorInfo[securityLevel] + ",����������������");
                        
                        //���´򿪶Ի���
                        setTimeout(resetPassword,10);
                    }else if("1" == securityLevel){
                        flag = confirm(errorInfo[securityLevel] + "����ȻҪʹ����");
                    }else{
                        flag = true;
                    }

                    if(true == flag){
                        saveResetPassword(treeID,pwd);
                    }
                }
                request.send();
            }
        }
    }
    /*
     *	����˵���������ʼ������
     *	������	string:groupId          ��id
                string:password         ����
     *	����ֵ��
     */
    function saveResetPassword(groupId,password){
        var p = new HttpRequestParams();
        p.url = URL_RESET_PASSWORD;
        p.setContent("groupId",groupId);
        p.setContent("password",password);

        var request = new HttpRequest(p);
        request.onsuccess = function(){
        }
        request.send();
    }
    /*
     *	����˵�����ֹ���Ӧѡ���Ӧ��
     *	������	string:groupId          ��id
                string:groupName        ����
                string:groupType        ������
     *	����ֵ��
     */
    function chooseManualMappingGroup(groupId,groupName,groupType){
        //�����������ݴӺ�̨��ȡ
        var xmlIsland = null;

        var group = getGroup(null,xmlIsland,"ѡ���ֹ���Ӧ��","1",null,"3");
        if(null!=group){
            var page5FormObj = $("page5Form");
            page5FormObj.updateDataExternal(groupId,group.id);
            page5FormObj.updateDataExternal(groupName,group.name);
            page5FormObj.updateDataExternal(groupType,group.type);
        }

    }
    /*
     *	����˵����ģ����Ӧѡ���Ӧ��
     *	������	string:groupId          ��id��
                string:groupName        ������
     *	����ֵ��
     */
    function chooseAutoMappingGroup(groupId,groupName){

        //�����������ݴӺ�̨��ȡ
        var xmlIsland = null;

        var group = getGroup(null,xmlIsland,"ѡ��ģ����Ӧ��","1",null,"3");
        if(null!=group){
            var page1FormObj = $("page1Form");
            page1FormObj.updateDataExternal(groupId,group.id);
            page1FormObj.updateDataExternal(groupName,group.name);
        }
    }
    /*
     *	����˵��������û��б��Ҽ��˵����Ƿ�ɼ�
     *	������	string:code     ������
     *	����ֵ��
     */
    function getUserOperation(code){
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
     *	����˵����������֤��ʽ
     *	������	
     *	����ֵ��
     */
    function setAuthenticateMethod(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();

            var authenticate = window.showModalDialog("authenticatemethod.htm",{title:"����\""+treeName+"\"����֤��ʽ"},"dialogWidth:250px;dialogHeight:250px;");
            if(null!=authenticate){
                var p = new HttpRequestParams();
                p.url = URL_SET_AUTHENTICATE_METHOD;
                p.setContent("groupId",treeID);
                p.setContent("authenticateMethod",authenticate.authenticateMethod);
                //p.setContent("authenticateAppId",authenticate.authenticateAppId);

                var request = new HttpRequest(p);
                request.onresult = function(){
                    
                }
                request.send();
            }
        }
        
    }
    /*
     *	����˵���������û�������
     *	������	
     *	����ֵ��
     */
    function loadUserToolBarData(rowIndex){
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
            p.url = URL_GET_USER_OPERATION;
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
     *	����˵�����ۺϲ�ѯ(�û���Ӧ��ѯ)
     *	������	
     *	����ֵ��
     */
    function generalSearchMapping(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupId = treeNode.getId();
            var groupName = treeNode.getName();
            
            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadGeneralSearchMappingData(groupId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page6";
            inf.label = "�û���Ӧ" + OPERATION_SEARCH.replace(/\$label/i,groupName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_GENERAL_SEARCH_MAPPING + groupId;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ��������
     *	������	string:groupId          ��id
     *	����ֵ��
     */
    function loadGeneralSearchMappingData(groupId){
        var cacheID = CACHE_GENERAL_SEARCH_MAPPING + groupId;
        var cacheData = Cache.Variables.get(cacheID);
        if(null==cacheData){
            var p = new HttpRequestParams();
            p.url = URL_GENERAL_SEARCH_MAPPING;

            p.setContent("groupId", groupId);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var generalSearchGridNode = this.getNodeValue(XML_GENERAL_SEARCH_MAPPING);

                var generalSearchGridNodeID = cacheID+"."+XML_GENERAL_SEARCH_MAPPING;

                Cache.XmlIslands.add(generalSearchGridNodeID,generalSearchGridNode);

                Cache.Variables.add(cacheID,[generalSearchGridNodeID]);

                initGeneralSearchMappingPages(cacheID);
            }
            request.send();
        }else{
            initGeneralSearchMappingPages(cacheID);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initGeneralSearchMappingPages(cacheID){
        var page6GridObj = $("page6Grid");
        Public.initHTC(page6GridObj,"isLoaded","onload",function(){
            loadGeneralSearchMappingGridData(cacheID);
        });
    }
    /*
     *	����˵����grid��������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadGeneralSearchMappingGridData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_MAPPING);
        if(null!=xmlIsland){
            var page6GridObj = $("page6Grid");
            page6GridObj.load(xmlIsland.node,null,"node");
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ(�û�ͬ����ѯ)
     *	������	
     *	����ֵ��
     */
    function generalSearchSync(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupId = treeNode.getId();
            var groupName = treeNode.getName();
            
            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadGeneralSearchSyncData(groupId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page6";
            inf.label = "�û�ͬ��" + OPERATION_SEARCH.replace(/\$label/i,groupName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_GENERAL_SEARCH_SYNC + groupId;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ��������
     *	������	string:groupId          ��id
     *	����ֵ��
     */
    function loadGeneralSearchSyncData(groupId){
        var cacheID = CACHE_GENERAL_SEARCH_SYNC + groupId;
        var cacheData = Cache.Variables.get(cacheID);
        if(null==cacheData){
            var p = new HttpRequestParams();
            p.url = URL_GENERAL_SEARCH_SYNC;

            p.setContent("groupId", groupId);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var generalSearchGridNode = this.getNodeValue(XML_GENERAL_SEARCH_SYNC);

                var generalSearchGridNodeID = cacheID+"."+XML_GENERAL_SEARCH_SYNC;

                Cache.XmlIslands.add(generalSearchGridNodeID,generalSearchGridNode);

                Cache.Variables.add(cacheID,[generalSearchGridNodeID]);

                initGeneralSearchSyncPages(cacheID);
            }
            request.send();
        }else{
            initGeneralSearchSyncPages(cacheID);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initGeneralSearchSyncPages(cacheID){
        var page6GridObj = $("page6Grid");
        Public.initHTC(page6GridObj,"isLoaded","onload",function(){
            loadGeneralSearchSyncGridData(cacheID);
        });
    }
    /*
     *	����˵����grid��������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadGeneralSearchSyncGridData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_SYNC);
        if(null!=xmlIsland){
            var page6GridObj = $("page6Grid");
            page6GridObj.load(xmlIsland.node,null,"node");
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ(�û���Ȩ��ѯ)
     *	������	
     *	����ֵ��
     */
    function generalSearchPermission(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupId = treeNode.getId();
            var groupName = treeNode.getName();
            
            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadGeneralSearchPermissionData(groupId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page7";
            inf.label = "�û�Ȩ��" + OPERATION_SEARCH.replace(/\$label/i,groupName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_GENERAL_SEARCH_PERMISSION + groupId;
            var tab = ws.open(inf);
        }    
    }
    /*
     *	����˵�����ۺϲ�ѯ��������
     *	������	string:groupId          ��id
     *	����ֵ��
     */
    function loadGeneralSearchPermissionData(groupId){
        var cacheID = CACHE_GENERAL_SEARCH_PERMISSION + groupId;
        var cacheData = Cache.Variables.get(cacheID);
        if(null==cacheData){
            var p = new HttpRequestParams();
            p.url = URL_GENERAL_SEARCH_PERMISSION;

            p.setContent("groupId", groupId);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var generalSearchInfoNode = this.getNodeValue(XML_GENERAL_SEARCH_PERMISSION);

                var generalSearchInfoNodeID = cacheID+"."+XML_GENERAL_SEARCH_PERMISSION;

                Cache.XmlIslands.add(generalSearchInfoNodeID,generalSearchInfoNode);

                Cache.Variables.add(cacheID,[generalSearchInfoNodeID]);

                initGeneralSearchPermissionPages(cacheID);
            }
            request.send();
        }else{
            initGeneralSearchPermissionPages(cacheID);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initGeneralSearchPermissionPages(cacheID){
        var page7FormObj = $("page7Form");
        Public.initHTC(page7FormObj,"isLoaded","oncomponentready",function(){
            loadGeneralSearchPermissionFormData(cacheID);            
        });
        loadPermissionListData(cacheID);
    }
    /*
     *	����˵����������Դ���������˵�
     *	������	string:cacheID              ��������id
                string:applicationID        Ӧ��id
     *	����ֵ��
     */
    function updateResourceTypeColumn(cacheID,applicationID){
        var p = new HttpRequestParams();
        p.url = URL_GENERAL_SEARCH_GET_RESOURCETYPES;
        p.setContent("applicationId",applicationID);

        var request = new HttpRequest(p);
        request.onresult = function(){
            var resourceTypeNode = this.getNodeValue(XML_RESOURCE_TYPE);
            var name = resourceTypeNode.getAttribute("name");
            
            var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_PERMISSION);
            if(null!=xmlIsland){
                var oldColumn = xmlIsland.selectSingleNode(".//column[@name='"+name+"']");
                var attributes = resourceTypeNode.attributes;
                for(var i=0,iLen=attributes.length;i<iLen;i++){
                    oldColumn.setAttribute(attributes[i].nodeName,attributes[i].nodeValue);
                }
                loadGeneralSearchPermissionFormData(cacheID);
            }
        }
        request.send();
    }
    /*
     *	����˵����xform��������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadGeneralSearchPermissionFormData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_PERMISSION);
        if(null!=xmlIsland){
            var page7FormObj = $("page7Form");
            page7FormObj.load(xmlIsland.node,null,"node");

            page7FormObj.ondatachange = function(){
                //2007-3-1 �뿪����
                //attachReminder(cacheID);

                var name = event.result.name;
                var value = event.result.newValue;
                if("applicationId"==name){
                    updateResourceTypeColumn(cacheID,value);
                }
            }
            var page7BtSearch = $("page7BtSearch");
            page7BtSearch.onclick = function(){
                searchPermission(cacheID);
            }
        }
    }
    /*
     *	����˵���������û���Ȩ��Ϣ
     *	������	
     *	����ֵ��
     */
    function searchPermission(cacheID){
        var p = new HttpRequestParams();
        p.url = URL_GENERAL_SEARCH_PERMISSION_LIST;

        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_PERMISSION);
        if(null!=xmlIsland){
            var dataNode = xmlIsland.selectSingleNode("./data");
            if(null!=dataNode){
                var prefix = xmlIsland.selectSingleNode("./declare").getAttribute("prefix");
                p.setXFormContent(dataNode,prefix);
            }
        }

        var request = new HttpRequest(p);
        request.onresult = function(){
            var permissionListNode = this.getNodeValue(XML_GENERAL_SEARCH_PERMISSION_LIST);
            var permissionListNodeID = cacheID+"."+XML_GENERAL_SEARCH_PERMISSION_LIST;

            Cache.XmlIslands.add(permissionListNodeID,permissionListNode);
            Cache.Variables.add(cacheID,[permissionListNodeID]);

            loadPermissionListData(cacheID);
        }
        request.send();
    }
    /*
     *	����˵����������Ȩ�б�����
     *	������	
     *	����ֵ��
     */
    function loadPermissionListData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_PERMISSION_LIST);
        if(null!=xmlIsland){
            createPermissionList(xmlIsland);
        }else{
            clearPermissionList();
        }
    }
    /*
     *	����˵����������Ȩ�б�����
     *	������	XmlNode:xmlIsland       XmlNodeʵ��
     *	����ֵ��
     */
    function createPermissionList(xmlIsland){
        var page7Box = $("page7Box");
        var str = getPermissionListStr(xmlIsland);
        page7Box.innerHTML = str;
    }
    /*
     *	����˵���������б�html
     *	������	XmlNode:xmlIsland       XmlNodeʵ��
     *	����ֵ��
     */
    function getPermissionListStr(xmlIsland){

        var str = [];
        var userNodes = xmlIsland.selectNodes("./treeNode");

        //�����û�
        for(var i=0,iLen=userNodes.length;i<iLen;i++){
            var name = userNodes[i].getAttribute("name");
            str[str.length] = "<table class=\"hFull\" border=\"1\" cellspacing=\"0\" cellpadding=\"5\">";
            str[str.length] = "<tr><td colspan=\"4\" style=\"text-decoration:underline;font-weight:bold;\">" + name + "</td></tr>";


            //������Դ���������ɱ�����
            var sourceNodes = userNodes[i].selectNodes("./treeNode/treeNode/treeNode");
            for(var j=0,jLen=sourceNodes.length;j<jLen;j++){
                var sourceNode = sourceNodes[j];
                var typeNode = sourceNode.getParent();
                var appNode = typeNode.getParent();


                var name = sourceNode.getAttribute("name");
                str[str.length] = "<tr>";

                if(sourceNode.equals(appNode.getFirstChild().getFirstChild())){
                    var rowspan = appNode.selectNodes("./treeNode/treeNode").length;
                    str[str.length] = "<td rowspan=\"" + rowspan + "\" width=\"10%\">" + appNode.getAttribute("name") + "</td>";                
                }
                if(sourceNode.equals(typeNode.getFirstChild())){
                    var rowspan = typeNode.selectNodes("./treeNode").length;
                    str[str.length] = "<td rowspan=\"" + rowspan + "\" width=\"10%\">" + typeNode.getAttribute("name") + "</td>";
                }
                str[str.length] = "<td width=\"30%\">" + name + "</td>";




                //����Ȩ��ѡ��
                var optionStr = [];
                var optionNodes = sourceNode.selectNodes("./treeNode");
                for(var k=0,kLen=optionNodes.length;k<kLen;k++){
                    optionStr[optionStr.length] = optionNodes[k].getAttribute("name");
                }
                str[str.length] = "<td width=\"50%\">" + optionStr.join(",") + "</td>";



                str[str.length] = "</tr>";
            }


            str[str.length] = "</table>";
        }

        return str.join("");
    }
    /*
     *	����˵���������Ȩ�б�����
     *	������	
     *	����ֵ��
     */
    function clearPermissionList(){
        var page7Box = $("page7Box");
        page7Box.innerHTML = "";
    }
    /*
     *	����˵���������û���
     *	������	
     *	����ֵ��
     */
    function copyGroup(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupID = treeNode.getId();
            var groupName = treeNode.getName();

            var parentGroup = treeNode.getParent();
            var parentGroupID = parentGroup.getId();
            var parentGroupType = parentGroup.getAttribute("groupType");
            var applicationId = parentGroup.getAttribute("applicationId");

            var p = new HttpRequestParams();
            p.url = URL_COPY_GROUP;
            if(null==parentGroupType){
                p.setContent("applicationId",applicationId);            
            }else{
                p.setContent("toGroupId",parentGroupID);
            }
            p.setContent("groupId",groupID);
            p.setContent("isCascadeUser","false");

            var request = new HttpRequest(p);
            request.onresult = function(){
                var treeNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
                appendTreeNode(parentGroupID,treeNode);
            }
            request.send();
        }
    }
    /*
     *	����˵�������鸴�Ƶ�
     *	������	
     *	����ֵ��
     */
    function copyGroupTo(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupID = treeNode.getId();
            var groupName = treeNode.getName();
            var groupType = treeNode.getAttribute("groupType");
            var isCascadeUser = "false";
//            if("3"==groupType){
//                isCascadeUser = true;
//                groupType = "1";
//            }

            //�����������ݴӺ�̨��ȡ
            var xmlIsland = null;

            var group = getGroup(groupID,xmlIsland,"����\""+groupName+"\"��",groupType,"tss","1");
            if(null!=group){

                var p = new HttpRequestParams();
                p.url = URL_COPY_GROUP;
                p.setContent("toGroupId",group.id);
                p.setContent("groupId",groupID);
				p.setContent("appId", group.appId);
                p.setContent("isCascadeUser",isCascadeUser);

                var request = new HttpRequest(p);
                request.onresult = function(){
                    var treeNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");

                    if(""==group.appId){
                        appendTreeNode(group.id,treeNode);
                    }else{
                        appendTreeNode(group.appId,treeNode);
                    }
                }
                request.send();
            }
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ(�û�ת�ڲ�ѯ)
     *	������	
     *	����ֵ��
     */
    function generalSearchReassign(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupId = treeNode.getId();
            var groupName = treeNode.getName();
            
            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadGeneralSearchRessignData(groupId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page6";
            inf.label = "�û�ת��" + OPERATION_SEARCH.replace(/\$label/i,groupName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_GENERAL_SEARCH_REASSIGN + groupId;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ��������
     *	������	string:groupId          ��id
     *	����ֵ��
     */
    function loadGeneralSearchRessignData(groupId){
        var cacheID = CACHE_GENERAL_SEARCH_REASSIGN + groupId;
        var cacheData = Cache.Variables.get(cacheID);
        if(null==cacheData){
            var p = new HttpRequestParams();
            p.url = URL_GENERAL_SEARCH_REASSIGN;

            p.setContent("groupId", groupId);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var generalSearchGridNode = this.getNodeValue(XML_GENERAL_SEARCH_REASSIGN);

                var generalSearchGridNodeID = cacheID+"."+XML_GENERAL_SEARCH_REASSIGN;

                Cache.XmlIslands.add(generalSearchGridNodeID,generalSearchGridNode);

                Cache.Variables.add(cacheID,[generalSearchGridNodeID]);

                initGeneralSearchReassignPages(cacheID);
            }
            request.send();
        }else{
            initGeneralSearchReassignPages(cacheID);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initGeneralSearchReassignPages(cacheID){
        var page6GridObj = $("page6Grid");
        Public.initHTC(page6GridObj,"isLoaded","onload",function(){
            loadGeneralSearchReassignGridData(cacheID);
        });
    }
    /*
     *	����˵����grid��������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadGeneralSearchReassignGridData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_REASSIGN);
        if(null!=xmlIsland){
            var page6GridObj = $("page6Grid");
            page6GridObj.load(xmlIsland.node,null,"node");
        }
    }
    /*
     *	����˵������֤�û���
     *	������	
     *	����ֵ��
     */
    function authenticateGroup(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeType = treeNode.getAttribute("groupType");
            var applicationId = treeNode.getAttribute("applicationId");

            var p = new HttpRequestParams();
            p.url = URL_AUTHENTICATE_GROUP;
            p.setContent("groupId",treeID);
            p.setContent("groupType",treeType);
            p.setContent("applicationId",applicationId);
            p.setContent("disabled","0");

            var request = new HttpRequest(p);
            request.onsuccess = function(){
            }
            request.send();
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
            p.url = URL_GET_USER_OPERATION;
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
            // ��������û�����ڵ�
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
     *	����˵�����ۺϲ�ѯ(�û���ɫ��ѯ)
     *	������	
     *	����ֵ��
     */
    function generalSearchRole(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupId = treeNode.getId();
            var groupName = treeNode.getName();
            
            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadGeneralSearchRoleData(groupId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page6";
            inf.label = "�û���ɫ" + OPERATION_SEARCH.replace(/\$label/i,groupName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_GENERAL_SEARCH_ROLE + groupId;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ��������
     *	������	string:groupId          ��id
     *	����ֵ��
     */
    function loadGeneralSearchRoleData(groupId){
        var cacheID = CACHE_GENERAL_SEARCH_ROLE + groupId;
        var cacheData = Cache.Variables.get(cacheID);
        if(null==cacheData){
            var p = new HttpRequestParams();
            p.url = URL_GENERAL_SEARCH_ROLE;

            p.setContent("groupId", groupId);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var generalSearchGridNode = this.getNodeValue(XML_GENERAL_SEARCH_ROLE);

                var generalSearchGridNodeID = cacheID+"."+XML_GENERAL_SEARCH_ROLE;

                Cache.XmlIslands.add(generalSearchGridNodeID,generalSearchGridNode);

                Cache.Variables.add(cacheID,[generalSearchGridNodeID]);

                initGeneralSearchRolePages(cacheID);
            }
            request.send();
        }else{
            initGeneralSearchRolePages(cacheID);
        }
    }
    /*
     *	����˵�����ۺϲ�ѯ���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initGeneralSearchRolePages(cacheID){
        var page6GridObj = $("page6Grid");
        Public.initHTC(page6GridObj,"isLoaded","onload",function(){
            loadGeneralSearchRoleGridData(cacheID);
        });
    }
    /*
     *	����˵����grid��������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadGeneralSearchRoleGridData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_ROLE);
        if(null!=xmlIsland){
            var page6GridObj = $("page6Grid");
            page6GridObj.load(xmlIsland.node,null,"node");
        }
    }
    /*
     *	����˵���������ɫ
     *	������	
     *	����ֵ��
     */
    function setGroupPermission(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var name = treeNode.getName();
            var resourceType = "2";
            var groupType = treeNode.getAttribute("groupType");
            var appType = treeNode.getAttribute("appType");
            var type = "group";
            if(null == groupType){
                if(null != appType){
                    resourceType = "5";
                    type = "app";
                }
            }else{
                if("1" == groupType){// ���û���
                    resourceType = "2";
                }else if("2" == groupType){// �����û���
                    resourceType = "3";
                }else if("3" == groupType){// �����û���
                    resourceType = "4";
                }
            }
            var title = "����\"" + name + "\"��ɫ";
            var params = {
                roleId:id,
                resourceType:resourceType,
                applicationId:"tss",
                isRole2Resource:"0"
            };
            window.showModalDialog("setpermission.htm",{params:params,title:title,type:type},"dialogWidth:700px;dialogHeight:500px;resizable:yes");
        }
    }
    /*
     *	����˵���������ɫ
     *	������	
     *	����ֵ��
     */
    function setUserPermission(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);

        var id = rowNode.getAttribute("id");
        var name = rowNode.getAttribute("userName");

        var title = "����\"" + name + "\"��ɫ";
        var params = {
            roleId:id,
            resourceType:"1",
            applicationId:"tss",
            isRole2Resource:"0"
        };

        window.showModalDialog("setpermission.htm",{params:params,title:title,type:"user"},"dialogWidth:700px;dialogHeight:500px;resizable:yes");
    }
    /*
     *	����˵��������Ӧ����Ϣ
     *	������	                
     *	����ֵ��
     */
    function addApplication(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var applicationType = treeNode.getAttribute("applicationType")||"-2";

            var appName = "Ӧ��";
            var appID = new Date().valueOf();

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadAppDetailData(appID,true,treeID,applicationType,true);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_ADD.replace(/\$label/i,appName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_APPLICATION_DETAIL + appID;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵����ɾ��Ӧ��
     *	������	
     *	����ֵ��
     */
    function delApplication(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            
            var p = new HttpRequestParams();
            p.url = URL_DEL_APPLICATION;
            p.setContent("appId",treeID);

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
     *	����˵�����༭Ӧ����Ϣ
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editApplication(editable){
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
                    loadAppDetailData(treeID,editable);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeName);
                inf.SID = CACHE_VIEW_APPLICATION_DETAIL + treeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeName);
                inf.SID = CACHE_APPLICATION_DETAIL + treeID;
            }
            inf.defaultPage = "page1";
            inf.phases = null;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
    }
    /*
     *	����˵����Ӧ����Ϣ��������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentID             ���ڵ�id
                string:applicationType      Ӧ������
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadAppDetailData(treeID,editable,parentID,applicationType,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_APPLICATION_DETAIL + treeID;
        }else{
            var cacheID = CACHE_APPLICATION_DETAIL + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_APPLICATION_DETAIL;
            //������
            if(true==isNew){
                p.setContent("appId","-10");
                p.setContent("applicationType",applicationType);
            }else{
                p.setContent("appId", treeID);            
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var appInfoNode = this.getNodeValue(XML_APPLICATION_DETAIL);

                var appInfoNodeID = cacheID+"."+XML_APPLICATION_DETAIL;

                Cache.XmlIslands.add(appInfoNodeID,appInfoNode);

                Cache.Variables.add(cacheID,[appInfoNodeID]);

                initAppPages(cacheID,editable,isNew,parentID);
            }
            request.send();
        }else{
            initAppPages(cacheID,editable,isNew,parentID);
        }
    }
    /*
     *	����˵����Ӧ�����ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
                string:parentID             ���ڵ�id
     *	����ֵ��
     */
    function initAppPages(cacheID,editable,isNew,parentID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadAppInfoFormData(cacheID,editable);
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
            saveApp(cacheID,isNew,parentID);
        }
    }
    /*
     *	����˵����Ӧ����Ϣxform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadAppInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_APPLICATION_DETAIL);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����˵��������Ӧ����Ϣ
     *	������	string:cacheID              ��������id
                boolean:isNew               �Ƿ�����
                string:parentID             ���ڵ�id
     *	����ֵ��
     */
    function saveApp(cacheID,isNew,parentID){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_APPLICATION;

        //�Ƿ��ύ
        var flag = false;

        //Ӧ�û�����Ϣ
        var appInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_APPLICATION_DETAIL);
        if(null!=appInfoNode){
            var appInfoDataNode = appInfoNode.selectSingleNode(".//data");
            if(null!=appInfoDataNode){
                flag = true;

                var prefix = appInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                p.setXFormContent(appInfoDataNode,prefix);
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

                    var treeNode = this.getNodeValue("AppSource").selectSingleNode("treeNode");
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
                    var id = cacheID.trim(CACHE_APPLICATION_DETAIL);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
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
     *	����˵�������鵼�뵽
     *	������	
     *	����ֵ��
     */
    function importGroupTo(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var groupID = treeNode.getId();
            var groupName = treeNode.getName();
            var groupType = treeNode.getAttribute("groupType");

            //�����������ݴӺ�̨��ȡ
            var xmlIsland = null;

            var group = getGroup(groupID,xmlIsland,"����\""+groupName+"\"��",groupType,"tss","4");
            if(null!=group){

                var p = new HttpRequestParams();
                p.url = URL_IMPORT_GROUP;
                p.setContent("toGroupId",group.id);
                p.setContent("groupId",groupID);
				p.setContent("isCascadeUser",true);

                var request = new HttpRequest(p);
                request.onresult = function(){
//                    var treeNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
//                    appendTreeNode(group.id,treeNode);

					var data = this.getNodeValue("ProgressInfo");
					var progress = new Progress(URL_IMPORT_PROGRESS,data,URL_CANCEL_IMPORT_PROGRESS);
					progress.oncomplete = function(){
						loadInitData();
					}
					progress.start();
                }
                request.send();
            }
        }
    }    /*
     *	����˵�������û����뵽
     *	������	
     *	����ֵ��
     */
    function importUserTo(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var userID = rowNode.getAttribute("id");
        var userName = rowNode.getAttribute("userName");
        var loginName = rowNode.getAttribute("loginName");
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        var groupID = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"==groupID){
			if(null!=rowIndex){
				var curRowNode = gridObj.getRowNode_Xml(rowIndex);
				groupID = curRowNode.getAttribute("groupId");
			}
        }

		var xmlIsland = null;

		var group = getGroup(groupID,xmlIsland,"����\""+userName+"\"��",groupType,"tss","4");
		if(null!=group){

			var p = new HttpRequestParams();
			p.url = URL_IMPORT_USER;
			p.setContent("groupId", groupID);
			p.setContent("toGroupId",group.id);
			p.setContent("userId",userID);

			var request = new HttpRequest(p);
			request.onsuccess = function(){
				gridObj.modifyNamedNode_Xml(rowIndex,"appUserName",userName);
				gridObj.modifyNamedNode_Xml(rowIndex,"appGroupName",group.name);
				gridObj.modifyNamedNode_Xml(rowIndex,"appLoginName",loginName);
			}
			request.send();
		}

    }
    /*
     *	����˵�����Ƿ�����Ӧ�����û�
     *	������	
     *	����ֵ��
     */
    function isOtherUser(){
        var flag = false;
        var gridObj = $("grid");
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        if("3" == groupType){
            flag = true;
        }
        return flag;
    }
    /*
     *	����˵�����ֹ���Ӧ�û�
     *	������	
     *	����ֵ��
     */
    function manualMappingUser(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var rowName = gridObj.getNamedNodeValue_Xml(rowIndex,"userName");
        var rowId = rowNode.getAttribute("id");
        var groupId = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"==groupId){
            groupId = rowNode.getAttribute("groupId");
        }
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        var applicationId = gridObj.getXmlDocument().getAttribute("applicationId");

        var params = {
            id:rowId,
            groupId:groupId,
            groupType:groupType,
            applicationId:applicationId
        }

        var returnVal = window.showModalDialog("mappinguser.htm",{params:params,title:"\""+rowName+"\"�û���Ӧ��..."},"dialogWidth:700px;dialogHeight:500px;");
        if(null != returnVal){
            var userName = returnVal.userName;
            var userId = returnVal.userId;
            var groupName = returnVal.groupName;
			var loginName = returnVal.loginName;

            gridObj.modifyNamedNode_Xml(rowIndex,"appUserName",userName);
            gridObj.modifyNamedNode_Xml(rowIndex,"appUserId",userId);
            gridObj.modifyNamedNode_Xml(rowIndex,"appGroupName",groupName);
            gridObj.modifyNamedNode_Xml(rowIndex,"appLoginName",loginName);
        }
    }
    /*
     *	����˵����ͬ�������û�
     *	������	
     *	����ֵ��
     */
    function syncUser(){
        var gridObj = $("grid");
        var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
        var rowNode = gridObj.getRowNode_Xml(rowIndex);
        var rowName = gridObj.getNamedNodeValue_Xml(rowIndex,"userName");
        var rowId = rowNode.getAttribute("id");
        var groupId = gridObj.getXmlDocument().getAttribute("groupId");
        if("search"==groupId){
            groupId = rowNode.getAttribute("groupId");
        }
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        var applicationId = gridObj.getXmlDocument().getAttribute("applicationId");

        var p = new HttpRequestParams();
        p.url = URL_SYNC_USER;

        p.setContent("applicationId",applicationId);
        p.setContent("groupId",groupId);
        p.setContent("groupType",groupType);
        p.setContent("userId",rowId);

        var request = new HttpRequest(p);
        request.onsuccess = function(){
            //ͬ���ɹ�
        }
        request.send();

    }
    /*
     *	����˵���������������
     *	������	string:type             ����(group:�û���/user:�û�)
     *	����ֵ��
     */
    function setPasswordTactic(type){
        var params = {};
        params.type = type;

        //�����������û��黹���û�����ȡ�����ò�ͬ����
        if("group" == type){
            var treeObj = $("tree");
            var treeNode = treeObj.getActiveTreeNode();
            if(null!=treeNode){
                var id = treeNode.getId();
                var name = treeNode.getName();

                params.groupId = id;
            }
        
        }else if("user" == type){
            var gridObj = $("grid");
            var rowIndex = gridObj.getCurrentRowIndex_Xml()[0];
            var rowNode = gridObj.getRowNode_Xml(rowIndex);

            var id = rowNode.getAttribute("id");
            var name = rowNode.getAttribute("userName");
            var groupId = gridObj.getXmlDocument().getAttribute("groupId");
            if("search"==groupId){
                groupId = rowNode.getAttribute("groupId");
            }
            var groupType = gridObj.getXmlDocument().getAttribute("groupType");
            var applicationId = gridObj.getXmlDocument().getAttribute("applicationId");

            params.id = id;
            params.groupId = groupId;
            params.groupType = groupType;
            params.applicationId = applicationId;        
        }

        var tactic = window.showModalDialog("passwordtactic.htm",{params:params,title:"����\""+name+"\"���������"},"dialogWidth:250px;dialogHeight:250px;");
        if(null != tactic){
            var p = new HttpRequestParams();
            p.setContent("ruleId",tactic.id);

            if("group" == type){
				p.url = URL_SET_GROUP_PASSWORD_TACTIC;
                p.setContent("groupId",id);
            }else if("user" == type){
				p.url = URL_SET_USER_PASSWORD_TACTIC;
                p.setContent("userId",id);          
            }

            var request = new HttpRequest(p);
            request.onsuccess = function(){
                
            }
            request.send();
        }
    }
    /*
     *	����˵������ȡ�û������û�������
     *	������	
     *	����ֵ��
     */
    function getUserGroupType(){
        var gridObj = $("grid");
        var groupType = gridObj.getXmlDocument().getAttribute("groupType");
        return groupType;
    }



    window.onload = init;

	//�ر�ҳ���Զ�ע��
    logoutOnClose();