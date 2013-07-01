    /*
     *	��̨��Ӧ���ݽڵ�����
     */
    XML_DEFAULT_TOOLBAR = "DefaultToolBar";
    XML_TOOLBAR = "ToolBar";
    XML_MAIN_TREE = "AppSource";
    XML_APPLICATION_DETAIL = "AppDetail";
    XML_SOURCE_TREE = "SourceTree";
    XML_SOURCE_TYPE_INFO = "TypeInfo";
    XML_PERMISSION_OPTION_INFO = "PermissionOption";
    XML_GENERAL_SEARCH_USER = "GeneralSearchUserInfo";
    XML_GENERAL_SEARCH_USER_LIST = "GeneralSearchUserList";
    XML_IMPORT_APPLICATION = "ImportApplication";
    XML_OPERATION = "Operation";
    XML_ASSIGN_DETAIL = "AssignDetail";
    XML_SOURCE_TO_ROLE_TREE = "Source2RoleTree";
    XML_SOURCE_TO_ROLE_EXIST_TREE = "Source2RoleExistTree";
    /*
     *	Ĭ��Ψһ�����ǰ׺
     */
    CACHE_GRID_ROW_DETAIL = "row__id";
    CACHE_TREE_NODE_DETAIL = "treeNode__id";
    CACHE_TREE_NODE_SOURCE_TREE = "sourceTree__id";
    CACHE_MAIN_TREE = "tree__id";
    CACHE_TOOLBAR = "toolbar__id";
    CACHE_APPLICATION_DETAIL = "app__id";
    CACHE_VIEW_APPLICATION_DETAIL = "viewApp__id";
    CACHE_SOURCE_TYPE = "sourceType__id";
    CACHE_VIEW_SOURCE_TYPE = "viewSourceType__id";
    CACHE_PERMISSION_OPTION = "permissionOption__id";
    CACHE_VIEW_PERMISSION_OPTION = "viewPermissionOption__id";
    CACHE_GENERAL_SEARCH_USER = "generalSearchUser__id";
    CACHE_IMPORT_APPLICATION = "import__id";
    CACHE_ASSIGN_DETAIL = "assign__id";
    /*
     *	����
     */
    OPERATION_ADD = "����\"$label\"";
    OPERATION_VIEW = "�鿴\"$label\"";
    OPERATION_DEL = "ɾ��\"$label\"";
    OPERATION_EDIT = "�༭\"$label\"";
    OPERATION_SEARCH = "��ѯ\"$label\"";
    OPERATION_IMPORT = "����\"$label\"";
    OPERATION_ASSIGN = "�����ɫ\"$label\"";
    /*
     *	XMLHTTP�����ַ����
     */
    URL_INIT = "data/source_init.xml";
    URL_APPLICATION_DETAIL = "data/application.xml";
    URL_SAVE_APPLICATION = "data/_success.xml";
    URL_SAVE_TYPE = "data/_success.xml";
    URL_SOURCE_TYPE = "data/type.xml";
    URL_DEL_APPLICATION = "data/_success.xml";
    URL_DEL_TYPE = "data/_success.xml";
    URL_PERMISSION_OPTION = "data/permissionoption.xml";
    URL_SAVE_PERMISSION = "data/_success.xml";
    URL_DEL_PERMISSION = "data/_success.xml";
    URL_GENERAL_SEARCH_USER = "data/source_general_search.xml";
    URL_GENERAL_SEARCH_USER_LIST = "data/source_general_search.xml";
    URL_IMPORT_APPLICATION = "data/importapplication.xml";
    URL_IMPORT_ACTION = "data/_success.xml";
    URL_ASSIGN_DETAIL = "data/source2role.xml";

    URL_INIT = "ums/appResource!getAllApplication2Tree.action";
    URL_APPLICATION_DETAIL = "ums/appResource!getApplicationInfo.action";
    URL_SAVE_APPLICATION = "ums/appResource!editApplication.action";
    URL_SAVE_TYPE = "ums/appResource!editResourceType.action";
    URL_SOURCE_TYPE = "ums/appResource!getResourceTypeInfo.action";
    URL_DEL_APPLICATION = "ums/appResource!deleteApplication.action";
    URL_DEL_TYPE = "ums/appResource!deleteResourceType.action";
    URL_PERMISSION_OPTION = "ums/appResource!getOperationInfo.action";
    URL_SAVE_PERMISSION = "ums/appResource!editOperation.action";
    URL_DEL_PERMISSION = "ums/appResource!deleteOperation.action";
    URL_GENERAL_SEARCH_USER = "data/source_general_search.xml";
    URL_GENERAL_SEARCH_USER_LIST = "data/source_general_search.xml";
    URL_IMPORT_APPLICATION = "ums/resourceRegister!getImportTemplate.action";
    URL_IMPORT_ACTION = "ums/resourceRegister!applicationRegisterByXML.action";
    URL_ASSIGN_DETAIL = "data/source2role.xml";

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
     *	ҳ���ʼ��
     *	������	
     *	����ֵ��
     */
    function init(){
        initPaletteResize();
        initListContainerResize();
        initToolBar();
        initNaviBar("ums.2");
        initMenus();
        initBlocks();
        initWorkSpace();
        initEvents();
        initFocus();

        loadInitData();
    }
    /*
     *	ҳ���ʼ����������(��������������)
     */
    function loadInitData(){
        var p = new HttpRequestParams();
        p.url = URL_INIT;

        var request = new HttpRequest(p);
        request.onresult = function(){
            var mainTreeNode = this.getNodeValue(XML_MAIN_TREE);
            var mainTreeNodeID = CACHE_MAIN_TREE;

            Cache.XmlIslands.add(mainTreeNodeID, mainTreeNode);

            initTree(mainTreeNodeID);
        }
        request.send();
    }
 
    function initMenus(){
        var item1 = {
            label:"�༭",
            callback:editTreeNode,
            icon:ICON + "edit.gif",
            enable:function(){return true;},
            visible:function(){return checkTreeNodeEditable();}
        }
        var item2 = {
            label:"ɾ��",
            callback:delTreeNode,
            icon:ICON + "del.gif",
            enable:function(){return true;},
            visible:function(){return checkTreeNodeCanDelete();}
        }

        var item7 = {
            label:"����",
            callback:importApplication,
            icon:ICON + "import.gif",
            enable:function(){return true;},
            visible:function(){return "1"==getNodeType() && ("-1"==getTreeId() || "-2"==getTreeId());}
        }
        var item8 = {
            label:"�鿴",
            callback:function(){
                editTreeNode(false);
            },
            icon:ICON + "view.gif",
            enable:function(){return true;},
            visible:function(){return "-1" != getTreeId() && "-2" != getTreeId();}
        }

        var treeObj = $("tree");

        var menu1 = new Menu();
        menu1.addItem(item8);
        menu1.addItem(item1);
        menu1.addItem(item2);
        menu1.addItem(item7);
        menu1.addSeparator();
 
        treeObj.contextmenu = menu1;
    }
    /*
     *	�����ʼ��
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
     *	��Դ����ʼ��
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
     *	��Դ����������
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
     *	�۽���ʼ��
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
     *	�¼��󶨳�ʼ��
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
     *	������ڵ�
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
     *	˫�����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeDoubleClick(eventObj){
        var treeNode = eventObj.treeNode;
        var appType = getNodeType();
		var editable = checkTreeNodeEditable();
        var id = getTreeId();
 
		switch(appType){
			case "1":
				if(true==editable){
					if(true==canEdit){
						editApplication();
					}else if(true==canView){
						editApplication(false);                            
					}
				}
				break;
			case "3":
				if(true==editable){
					if(true==canEdit){
						editPermission();
					}else if(true==canView){
						editPermission(false);                            
					}
				}
				break;
		}

    }
    /*
     *	�һ����ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onTreeNodeRightClick(eventObj){
        var treeObj = $("tree");
        var treeNode = eventObj.treeNode;

        showTreeNodeStatus({id:"ID",name:"����",creatorName:"������",createTime:"����ʱ��",updatorName:"�޸���",updateTime:"�޸�ʱ��"});

        var x = eventObj.clientX;
        var y = eventObj.clientY;
            if(null!=treeObj.contextmenu){
                treeObj.contextmenu.show(x,y);                
            }
    }
 
    /*
     *	������Դ���ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onSourceTreeNodeActived(eventObj){
        var sourceTreeObj = $("sourceTree");
        var treeNode = sourceTreeObj.getActiveTreeNode();
        var treeNodeID = treeNode.getId();
        
        var name = eventObj.treeNode.getName();
        var id = eventObj.treeNode.getId();
        var remarks = eventObj.treeNode.getAttribute("remarks");

        var block = Blocks.getBlock("statusContainer");
        if(null!=block){
            block.open();
            block.writeln("����",name);
            block.writeln("���",id);
            block.writeln("˵��",remarks);
            block.close();
        }

        Focus.focus("gridTitle");
    }
    /*
     *	�һ���Դ���ڵ�
     *	������	Object:eventObj     ģ���¼�����
     *	����ֵ��
     */
    function onSourceTreeNodeRightClick(eventObj){
        var sourceTreeObj = $("sourceTree");
        if(null!=sourceTreeObj.contextmenu){
            sourceTreeObj.contextmenu.show(eventObj.clientX,eventObj.clientY);
        }
    }
 
 
 
    /*
     *	ɾ��Ӧ��
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
     *	�༭Ӧ����Ϣ
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
     *	Ӧ����Ϣ��������
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
     *	Ӧ�����ҳ��������
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

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = function(){
            saveApp(cacheID,isNew,parentID);
        }
    }
    /*
     *	Ӧ����Ϣxform��������
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
     *	����Ӧ����Ϣ
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
                    var id = cacheID.trim(CACHE_APPLICATION_DETAIL);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
        }
    }
  
    /*
     *	ɾ������
     *	������	
     *	����ֵ��
     */
    function delType(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            
            var p = new HttpRequestParams();
            p.url = URL_DEL_TYPE;
            p.setContent("typeId",treeID);

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
     *	�༭��Դ����
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editType(editable){
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
                    loadTypeData(treeID,editable);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeName);
                inf.SID = CACHE_VIEW_SOURCE_TYPE + treeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeName);
                inf.SID = CACHE_SOURCE_TYPE + treeID;
            }
            inf.defaultPage = "page1";
            inf.phases = null;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
    }
    /*
     *	��Դ���ͼ�������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentID             ���ڵ�id
                string:applicationID        Ӧ��id
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadTypeData(treeID,editable,parentID,applicationID,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_SOURCE_TYPE + treeID;
        }else{
            var cacheID = CACHE_SOURCE_TYPE + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_SOURCE_TYPE;
            //������
            if(true==isNew){
                p.setContent("typeId", "-10");
                p.setContent("applicationId", applicationID);
            }else{
                p.setContent("typeId", treeID);            
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var typeInfoNode = this.getNodeValue(XML_SOURCE_TYPE_INFO);

                var typeInfoNodeID = cacheID+"."+XML_SOURCE_TYPE_INFO;

                Cache.XmlIslands.add(typeInfoNodeID,typeInfoNode);

                Cache.Variables.add(cacheID,[typeInfoNodeID]);

                initTypePages(cacheID,editable,isNew,parentID);
            }
            request.send();
        }else{
            initTypePages(cacheID,editable,isNew,parentID);
        }
    }
    /*
     *	Ӧ�����ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
                string:parentID             ���ڵ�id
     *	����ֵ��
     */
    function initTypePages(cacheID,editable,isNew,parentID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadTypeInfoFormData(cacheID,editable);
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = function(){
            saveType(cacheID,isNew,parentID);
        }
    }
    /*
     *	��Դ����xform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadTypeInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_SOURCE_TYPE_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	������Դ����
     *	������	string:cacheID          ��������id
                boolean:isNew           �Ƿ�����
                string:parentID         ���ڵ�id
     *	����ֵ��
     */
    function saveType(cacheID,isNew,parentID){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_TYPE;

        //�Ƿ��ύ
        var flag = false;

        //��Դ���ͻ�����Ϣ
        var typeInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_SOURCE_TYPE_INFO);
        if(null!=typeInfoNode){
            var typeInfoDataNode = typeInfoNode.selectSingleNode(".//data");
            if(null!=typeInfoDataNode){
                flag = true;

                var prefix = typeInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                p.setXFormContent(typeInfoDataNode,prefix);
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
                    var id = cacheID.trim(CACHE_SOURCE_TYPE);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
        }        
    }
    /*
     *	��ȡ���ڵ�����(appType)
     *	������	
     *	����ֵ��
     */
    function getNodeType(){
        return getTreeAttribute("nodeType");
    }
    /*
     *	��ȡ�ڵ�ID
     *	������	
     *	����ֵ��
     */
    function getTreeId(){
        return getTreeAttribute("id");
    }
    /*
     *	��ȡ���ڵ�Ӧ��ϵͳID(applicationId)
     *	������	
     *	����ֵ��
     */
    function getApplicationId(){
        return getTreeAttribute("applicationId");
    }
    /*
     *	������ڵ��Ƿ�ɱ༭
     *	������	
     *	����ֵ��
     */
    function checkTreeNodeEditable(){
        var flag = false;
        var appType = getNodeType();
        switch(appType){
            case "1":
                if("-1"!=getTreeId() && "-2"!=getTreeId() && "tss"!=getApplicationId()){
                    flag = true;
                }
                break;
            case "2":
//                if("tss"!=getApplicationId()){
//                    flag = true;
//                }
                break;
            case "3":
//                if("tss"!=getApplicationId()){
//                    flag = true;
//                }
                break;
        }
        return flag;   
    }
	
    /*
     *	������ڵ��Ƿ��ɾ��
     *	������	
     *	����ֵ��
     */
    function checkTreeNodeCanDelete(){
        var flag = false;
        var appType = getNodeType();
        switch(appType){
            case "1":
                if("-1"!=getTreeId() && "-2"!=getTreeId() && "tss"!=getApplicationId()){
                    flag = true;
                }
                break;
            case "2":
//                if("tss"!=getApplicationId()){
//                    flag = true;
//                }
                break;
            case "3":
//                if("tss"!=getApplicationId()){
//                    flag = true;
//                }
                break;
        }
        return flag;
    }
    /*
     *	�༭���ڵ�
     *	������	boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editTreeNode(editable){
        var appType = getNodeType();
        switch(appType){
            case "1":
                editApplication(editable);
                break;
            case "2":
                editType(editable);
                break;
            case "3":
                editPermission(editable);
                break;
        }
    }
    /*
     *	ɾ�����ڵ�
     *	������	
     *	����ֵ��
     */
    function delTreeNode(){
        if(true!=confirm("��ȷ��Ҫɾ����")){
            return;
        }
        var appType = getNodeType();
        switch(appType){
            case "1":
                delApplication();
                break;
            case "2":
                delType();
                break;
            case "3":
                if(confirm("ɾ���������ɻָ���Ҫ������")){
                    delPermission();
                }
                break;
        }
    }

    /*
     *	ɾ��Ȩ��ѡ��
     *	������	
     *	����ֵ��
     */
    function delPermission(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            
            var p = new HttpRequestParams();
            p.url = URL_DEL_PERMISSION;
            p.setContent("operationId",treeID);

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
     *	�༭Ȩ��ѡ��
     *	������  boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function editPermission(editable){
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
                    loadPermissionData(treeID,editable);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            if(false==editable){
                inf.label = OPERATION_VIEW.replace(/\$label/i,treeName);
                inf.SID = CACHE_VIEW_PERMISSION_OPTION + treeID;
            }else{
                inf.label = OPERATION_EDIT.replace(/\$label/i,treeName);
                inf.SID = CACHE_PERMISSION_OPTION + treeID;
            }
            inf.defaultPage = "page1";
            inf.phases = null;
            inf.callback = callback;
            var tab = ws.open(inf);
        }
    }
    /*
     *	Ȩ��ѡ���������
     *	������	string:treeID               ���ڵ�id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                string:parentID             ���ڵ�id
                string:applicationID        Ӧ��id
                string:resourceTypeID       ��Դ����id
                boolean:isNew               �Ƿ�����
     *	����ֵ��
     */
    function loadPermissionData(treeID,editable,parentID,applicationID,resourceTypeID,isNew){
        if(false==editable){
            var cacheID = CACHE_VIEW_PERMISSION_OPTION + treeID;
        }else{
            var cacheID = CACHE_PERMISSION_OPTION + treeID;
        }
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_PERMISSION_OPTION;
            //������
            if(true==isNew){
                p.setContent("operationId", "-10");
                p.setContent("applicationId", applicationID);
                p.setContent("resourceTypeId", resourceTypeID);
            }else{
                p.setContent("operationId", treeID);            
            }

            var request = new HttpRequest(p);
            request.onresult = function(){
                var permissionOptionInfoNode = this.getNodeValue(XML_PERMISSION_OPTION_INFO);

                var permissionOptionInfoNodeID = cacheID+"."+XML_PERMISSION_OPTION_INFO;

                Cache.XmlIslands.add(permissionOptionInfoNodeID,permissionOptionInfoNode);

                Cache.Variables.add(cacheID,[permissionOptionInfoNodeID]);

                initPermissionPages(cacheID,editable,isNew,parentID);
            }
            request.send();
        }else{
            initPermissionPages(cacheID,editable,isNew,parentID);
        }
    }
    /*
     *	Ȩ��ѡ�����ҳ��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
                boolean:isNew               �Ƿ�����
                string:parentID             ���ڵ�id
     *	����ֵ��
     */
    function initPermissionPages(cacheID,editable,isNew,parentID){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadPermissionInfoFormData(cacheID,editable);
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = editable==false?true:false;
        page1BtSaveObj.onclick = function(){
            savePermission(cacheID,isNew,parentID);
        }
    }
    /*
     *	Ȩ��ѡ��xform��������
     *	������	string:cacheID              ��������id
                boolean:editable            �Ƿ�ɱ༭(Ĭ��true)
     *	����ֵ��
     */
    function loadPermissionInfoFormData(cacheID,editable){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_PERMISSION_OPTION_INFO);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = editable==false?"false":"true";
            page1FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    /*
     *	����Ȩ��ѡ��
     *	������	string:cacheID          ��������id
                boolean:isNew           �Ƿ�����
                string:parentID         ���ڵ�id
     *	����ֵ��
     */
    function savePermission(cacheID,isNew,parentID){
        //У��page1Form������Ч��
        var page1FormObj = $("page1Form");
        if(false==page1FormObj.checkForm()){
            switchToPhase(ws,"page1");
            return;
        }

        var p = new HttpRequestParams();
        p.url = URL_SAVE_PERMISSION;

        //�Ƿ��ύ
        var flag = false;

        //Ȩ��ѡ�������Ϣ
        var permissionOptionInfoNode = Cache.XmlIslands.get(cacheID+"."+XML_PERMISSION_OPTION_INFO);
        if(null!=permissionOptionInfoNode){
            var permissionOptionInfoDataNode = permissionOptionInfoNode.selectSingleNode(".//data");
            if(null!=permissionOptionInfoDataNode){
                flag = true;

                var prefix = permissionOptionInfoNode.selectSingleNode("./declare").getAttribute("prefix");
                p.setXFormContent(permissionOptionInfoDataNode,prefix);
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
                    var id = cacheID.trim(CACHE_PERMISSION_OPTION);
                    var name = page1FormObj.getData("name");
                    modifyTreeNode(id,"name",name,true);
                }
            }
            request.send();
        }        
    }
    /*
     *	�ۺϲ�ѯ(Ȩ������û���ѯ)
     *	������	
     *	����ֵ��
     */
    function generalSearchUser(){
        var sourceTreeObj = $("sourceTree");
        var treeNode = sourceTreeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeId = treeNode.getId();
            var treeName = treeNode.getName();
            
            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadGeneralSearchUserData(treeId);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page2";
            inf.label = OPERATION_SEARCH.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_GENERAL_SEARCH_USER + treeId;

            var tab = ws.open(inf);
        }
    }
    /*
     *	�ۺϲ�ѯ��������
     *	������	string:treeId          ��Դid
     *	����ֵ��
     */
    function loadGeneralSearchUserData(treeId){
        var cacheID = CACHE_GENERAL_SEARCH_USER + treeId;
        var cacheData = Cache.Variables.get(cacheID);
        if(null==cacheData){
            var p = new HttpRequestParams();
            p.url = URL_GENERAL_SEARCH_USER;

            p.setContent("treeId", treeId);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var generalSearchInfoNode = this.getNodeValue(XML_GENERAL_SEARCH_USER);

                var generalSearchInfoNodeID = cacheID+"."+XML_GENERAL_SEARCH_USER;

                Cache.XmlIslands.add(generalSearchInfoNodeID,generalSearchInfoNode);

                Cache.Variables.add(cacheID,[generalSearchInfoNodeID]);

                initGeneralSearchUserPages(cacheID);
            }
            request.send();
        }else{
            initGeneralSearchUserPages(cacheID);
        }
    }
    /*
     *	�ۺϲ�ѯ���ҳ��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function initGeneralSearchUserPages(cacheID){
        var page2FormObj = $("page2Form");
        Public.initHTC(page2FormObj,"isLoaded","oncomponentready",function(){
            loadGeneralSearchUserFormData(cacheID);

            var page2BtSearch = $("page2BtSearch");
            page2BtSearch.onclick = function(){
                searchUser(cacheID);
            }
        });

        loadUserListData(cacheID);
    }
    /*
     *	xform��������
     *	������	string:cacheID   grid����������ڵ�id
     *	����ֵ��
     */
    function loadGeneralSearchUserFormData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_USER);
        if(null!=xmlIsland){
            var page2FormObj = $("page2Form");
            page2FormObj.load(xmlIsland.node,null,"node");

            //2007-3-1 �뿪����
            attachReminder(cacheID,page2FormObj);
        }
    }
    /*
     *	�����û���Ȩ��Ϣ
     *	������	
     *	����ֵ��
     */
    function searchUser(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_USER);
        if(null!=xmlIsland){
            var p = new HttpRequestParams();
            p.url = URL_GENERAL_SEARCH_USER_LIST;

            var dataNode = xmlIsland.selectSingleNode("./data");            
            var prefix = xmlIsland.selectSingleNode("./declare").getAttribute("prefix");
            p.setXFormContent(dataNode,prefix);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var userListNode = this.getNodeValue(XML_GENERAL_SEARCH_USER_LIST);

                var userListNodeID = cacheID+"."+XML_GENERAL_SEARCH_USER_LIST;

                Cache.XmlIslands.add(userListNodeID,userListNode);

                Cache.Variables.add(cacheID,[userListNodeID]);

                loadUserListData(cacheID);
            }
            request.send();
        }
    }
    /*
     *	�����û��б�����
     *	������	
     *	����ֵ��
     */
    function loadUserListData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_GENERAL_SEARCH_USER_LIST);
        if(null!=xmlIsland){
            createUserList(xmlIsland);
        }else{
            clearUserList();
        }
    }
    /*
     *	�����û��б�����
     *	������	XmlNode:xmlIsland       XmlNodeʵ��
     *	����ֵ��
     */
    function createUserList(xmlIsland){
        var page2Box = $("page2Box");
        var str = getPermissionListStr(xmlIsland);
        page2Box.innerHTML = str;
    }
    /*
     *	�����б�html
     *	������	XmlNode:xmlIsland       XmlNodeʵ��
     *	����ֵ��
     */
    function getPermissionListStr(xmlIsland){

        var str = [];
        var appNodes = xmlIsland.selectNodes("./treeNode");

        //����Ӧ��
        for(var i=0,iLen=appNodes.length;i<iLen;i++){
            var name = appNodes[i].getAttribute("name");
            str[str.length] = "<table class=\"hFull\" border=\"1\" cellspacing=\"0\" cellpadding=\"5\">";
            str[str.length] = "<tr><td colspan=\"4\" style=\"text-decoration:underline;font-weight:bold;\">" + name + "</td></tr>";


            //����Ȩ��ѡ�������ɱ�����
            var optionNodes = appNodes[i].selectNodes("./treeNode/treeNode/treeNode");
            for(var j=0,jLen=optionNodes.length;j<jLen;j++){
                var optionNode = optionNodes[j];
                var sourceNode = optionNode.getParent();
                var typeNode = sourceNode.getParent();


                var name = optionNode.getAttribute("name");
                str[str.length] = "<tr>";

                if(optionNode.equals(typeNode.getFirstChild().getFirstChild())){
                    var rowspan = typeNode.selectNodes("./treeNode/treeNode").length;
                    str[str.length] = "<td rowspan=\"" + rowspan + "\">" + typeNode.getAttribute("name") + "</td>";                
                }
                if(optionNode.equals(sourceNode.getFirstChild())){
                    var rowspan = sourceNode.selectNodes("./treeNode").length;
                    str[str.length] = "<td rowspan=\"" + rowspan + "\">" + sourceNode.getAttribute("name") + "</td>";
                }
                str[str.length] = "<td>" + name + "</td>";




                //�����û�
                var userStr = [];
                var userNodes = optionNode.selectNodes("./treeNode");
                for(var k=0,kLen=userNodes.length;k<kLen;k++){
                    userStr[userStr.length] = userNodes[k].getAttribute("name");
                }
                str[str.length] = "<td>" + userStr.join(",") + "</td>";



                str[str.length] = "</tr>";
            }


            str[str.length] = "</table>";
        }

        return str.join("");
    }
    /*
     *	����û��б�����
     *	������	
     *	����ֵ��
     */
    function clearUserList(){
        var page2Box = $("page2Box");
        page2Box.innerHTML = "";
    }
    /*
     *	����
     *	������	
     *	����ֵ��
     */
    function importApplication(){

        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var treeID = treeNode.getId();
            var treeName = treeNode.getName();
            var applicationType = treeNode.getAttribute("applicationType");

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadImportDetailData(treeID,applicationType);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page1";
            inf.label = OPERATION_IMPORT.replace(/\$label/i,treeName);
            inf.phases = null;
            inf.callback = callback;
            inf.SID = CACHE_IMPORT_APPLICATION + treeID;
            var tab = ws.open(inf);
        }
    }
    
     /*
     *	������ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                string:applicationType      Ӧ������
     *	����ֵ��
     */
    function loadImportDetailData(treeID,applicationType){
        var cacheID = CACHE_IMPORT_APPLICATION + treeID;
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail){
            var p = new HttpRequestParams();
            p.url = URL_IMPORT_APPLICATION;
            p.setContent("id",treeID);
            p.setContent("applicationType",applicationType);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var importInfoNode = this.getNodeValue(XML_IMPORT_APPLICATION);

                importInfoNode.setAttribute("action",URL_IMPORT_ACTION);//action��ַ
                var frameName = createUploadFrame();
                importInfoNode.setAttribute("target",frameName);//�ύiframe��
                importInfoNode.setAttribute("enctype","multipart/form-data");
                importInfoNode.setAttribute("method","POST");

                var importInfoNodeID = cacheID+"."+XML_IMPORT_APPLICATION;

                Cache.XmlIslands.add(importInfoNodeID,importInfoNode);
                Cache.Variables.add(cacheID,[importInfoNodeID]);

                initImportPages(cacheID,applicationType);
            }
            request.send();
        }else{
            initImportPages(cacheID);
        }
    }

    /*
     *	�������ҳ��������
     *	������	string:cacheID     ��������id
                string:treeID      ���ڵ�id
				string:applicationType Ӧ��ϵͳ����(1.ƽ̨ 2.����)
     *	����ֵ��
     */
    function initImportPages(cacheID,applicationType){
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function(){
            loadImportData(cacheID,applicationType);

            //file���ܸ�ֵ������ֻ�����xform����ʾ��ֵ
            page1FormObj.updateDataExternal("filePath","");
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = false;
        page1BtSaveObj.onclick = function(){
            saveImport();
        }
    }

    /*
     *	����xform��������
     *	������	string:cacheID     ��������id
				string:applicationType Ӧ��ϵͳ����(1.ƽ̨ 2.����)
     *	����ֵ��
     */
    function loadImportData(cacheID,applicationType){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_IMPORT_APPLICATION);
        if(null!=xmlIsland){
            var page1FormObj = $("page1Form");
            page1FormObj.editable = "true";
            page1FormObj.load(xmlIsland.node,null,"node");
            page1FormObj.updateDataExternal("applicationType",applicationType,false);

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
    
    /*
     *	�����ϴ�
     *	������ 
     *	����ֵ��
     */
    function saveImport(){
        var page1FormObj = $("page1Form");	
        var fileName = page1FormObj.getData("filePath");
        if (fileName==null || fileName==""){
            return alert("��ѡ�����ļ�!");
        }
        else {
            var fileLength = fileName.length;
            if(fileName.substring(fileLength-4,fileLength)!=".zip" && fileName.substring(fileLength-4,fileLength)!=".xml"){
                return alert("��ѡ��.xml��.zip�ļ�����!");
            }
            else{
                return page1FormObj.submit();
            }
        }
    }
     /*
     *	�����ϴ��ύ��iframe
     *	������  
     *	����ֵ��
     */
    function createUploadFrame(){
        var frameName = "uploadFrame";
        var frameObj = $(frameName);
        if(null==frameObj){
            frameObj = document.createElement("<iframe name='"+frameName+"' id='"+frameName+"' src='about:blank' style='display:none'></iframe>");
            document.body.appendChild(frameObj);
        }

        return frameName;
    }

    /*
     *	��ȡ�ϴ��ļ�·��
     *	������  
     *	����ֵ��
     */
    function getFilePath(path){
        var page1FormObj = $("page1Form");
        page1FormObj.updateDataExternal("filePath",path);
    }
 
    /*
     *	��Դ��Ȩ����ɫ
     *	������	
     *	����ֵ��
     */
    function assignToRole(){
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
        if(null!=treeNode){
            var id = treeNode.getId();
            var name = treeNode.getName();

            var phases = null;

            var callback = {};
            callback.onTabClose = function(eventObj){
                delCacheData(eventObj.tab.SID);
            };
            callback.onTabChange = function(){
                setTimeout(function(){
                    loadAssignDetailData(id);
                },TIMEOUT_TAB_CHANGE);
            };

            var inf = {};
            inf.defaultPage = "page3";
            inf.label = OPERATION_ASSIGN.replace(/\$label/i,name);
            inf.phases = phases;
            inf.callback = callback;
            inf.SID = CACHE_ASSIGN_DETAIL + id;
            var tab = ws.open(inf);
        }
    }
    /*
     *	��ɫ��ϸ��Ϣ��������
     *	������	string:id                   ��Դid
     *	����ֵ��
     */
    function loadAssignDetailData(id){
        var cacheID = CACHE_ASSIGN_DETAIL + id;

        var cacheData = Cache.Variables.get(cacheID);
        if(null==cacheData){
            var p = new HttpRequestParams();
            p.url = URL_ASSIGN_DETAIL;

            p.setContent("sourceId", id);

            var request = new HttpRequest(p);
            request.onresult = function(){
                var source2RoleTreeNode = this.getNodeValue(XML_SOURCE_TO_ROLE_TREE);
                var source2RoleGridNode = this.getNodeValue(XML_SOURCE_TO_ROLE_EXIST_TREE);

                var source2RoleTreeNodeID = cacheID+"."+XML_SOURCE_TO_ROLE_TREE;
                var source2RoleGridNodeID = cacheID+"."+XML_SOURCE_TO_ROLE_EXIST_TREE;

                Cache.XmlIslands.add(source2RoleTreeNodeID,source2RoleTreeNode);
                Cache.XmlIslands.add(source2RoleGridNodeID,source2RoleGridNode);

                Cache.Variables.add(cacheID,[source2RoleTreeNodeID,source2RoleGridNodeID]);

                initAssignPages(cacheID,id);
            }
            request.send();
        }else{
            initAssignPages(cacheID,id);
        }
    }
    /*
     *	��ɫ���ҳ��������
     *	������	string:cacheID              ��������id
                string:id                   ��Դid
     *	����ֵ��
     */
    function initAssignPages(cacheID,id){
        var page3TreeObj = $("page3Tree");
        Public.initHTC(page3TreeObj,"isLoaded","oncomponentready",function(){
            loadSource2RoleTreeData(cacheID);
        });

        var page3Tree2Obj = $("page3Tree2");
        Public.initHTC(page3Tree2Obj,"isLoaded","oncomponentready",function(){
            loadSource2RoleExistTreeData(cacheID);
        });


        //���ñ��水ť����
        var page3BtSaveObj = $("page3BtSave");
        page3BtSaveObj.onclick = function(){
            saveAssign(cacheID,id);
        }

        //��������
        var page3BtSearchObj = $("page3BtSearch");
        var page3KeywordObj = $("page3Keyword");
        attachSearchTree(page3TreeObj,page3BtSearchObj,page3KeywordObj);

        //������Ӱ�ť����
        var page3BtAddObj = $("page3BtAdd");
        page3BtAddObj.onclick = function(){
            addTreeNode(page3TreeObj,page3Tree2Obj,function(treeNode){
                var result = {
                    "error":false,
                    "message":"",
                    "stop":true
                };
                return result;
            });
        }

        //����ɾ����ť����
        var page3BtDelObj = $("page3BtDel");
        page3BtDelObj.onclick = function(){
            removeTreeNode(page3Tree2Obj);
        }
    }
    /*
     *	�û���Խ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadSource2RoleTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_SOURCE_TO_ROLE_TREE);
        if(null!=xmlIsland){
            var page3TreeObj = $("page3Tree");
            page3TreeObj.load(xmlIsland.node);
            page3TreeObj.research = true;
        }
    }
    /*
     *	�û���Խ�ɫtree��������
     *	������	string:cacheID     ��������id
     *	����ֵ��
     */
    function loadSource2RoleExistTreeData(cacheID){
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_SOURCE_TO_ROLE_EXIST_TREE);
        if(null!=xmlIsland){
            var page3Tree2Obj = $("page3Tree2");
            page3Tree2Obj.load(xmlIsland.node);
        }
    }
 
 

    window.onload = init;

	//�ر�ҳ���Զ�ע��
    logoutOnClose();