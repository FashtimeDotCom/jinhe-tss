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
    URL_INIT = "ums/appResource!getAllApplication2Tree.action";
    URL_APPLICATION_DETAIL = "ums/appResource!getApplicationInfo.action";
    URL_SAVE_APPLICATION = "ums/appResource!editApplication.action";
    URL_RESOURCE_TYPE = "ums/appResource!getResourceTypeInfo.action";
    URL_IMPORT_TEMPLATE = "ums/resourceRegister!getImportTemplate.action";
    URL_IMPORT = "ums/resourceRegister!applicationRegisterByXML.action";
	
	if(IS_TEST) {
		URL_INIT = "data/source_init.xml";
		URL_APPLICATION_DETAIL = "data/application.xml";
		URL_SAVE_APPLICATION = "data/_success.xml";
		URL_RESOURCE_TYPE = "data/type.xml";
		URL_IMPORT_TEMPLATE = "data/importapplication.xml";
		URL_IMPORT = "data/_success.xml";
	}
 
    ICON = "../framework/images/";
 
    function init() {
        initPaletteResize();
        initListContainerResize();
        initNaviBar("um.2");
        initMenus();
        initBlocks();
        initWorkSpace();
        initEvents();
        initFocus();

        loadInitData();
    }
  
    function initMenus() {
	    var item1 = {
            label:"�鿴",
            callback:function() {
                editTreeNode(false);
            },
            icon:ICON + "view.gif",
            enable:function() {return true;},
            visible:function() {return "-1" != getTreeNodeId() && "-2" != getTreeNodeId();}
        }
        var item2 = {
            label:"�༭",
            callback:editTreeNode,
            icon:ICON + "edit.gif",
            enable:function() {return true;},
            visible:function() {return checkTreeNodeEditable();}
        }
		var item3 = {
            label:"�½�Ӧ��",
            callback:createOtherApplication,
            enable:function() {return true;},
            visible:function() {return "-2" == getTreeNodeId();}
        }
        var item4 = {
            label:"����",
            callback:importApplication,
            icon:ICON + "import.gif",
            enable:function() {return true;},
            visible:function() {return "1"==getNodeType() && ("-1"==getTreeNodeId() || "-2"==getTreeNodeId());}
        }

        var treeObj = $$("tree");

        var menu1 = new Menu();
        menu1.addItem(item1);
        menu1.addItem(item2);
		menu1.addItem(item3)
        menu1.addItem(item4);
 
        treeObj.contextmenu = menu1;
    }
 
    function initBlocks() {
        var paletteObj = $("palette");
        Blocks.create(paletteObj);

        var treeContainerObj = $("treeContainer");
        Blocks.create(treeContainerObj, treeContainerObj.parentNode);   
    }

	function loadInitData() {
        var p = new HttpRequestParams();
        p.url = URL_INIT;

        var request = new HttpRequest(p);
        request.onresult = function() {
            var mainTreeNode = this.getNodeValue(XML_MAIN_TREE);

            Cache.XmlIslands.add(CACHE_MAIN_TREE, mainTreeNode);

            initTree(mainTreeNodeID);

			var tree = $T("tree", mainTreeNode);
			var treeElement = $$("tree");

			treeElement.onTreeNodeActived = function(eventObj) {
                onTreeNodeActived(eventObj);
            }
            treeElement.onTreeNodeDoubleClick = function(eventObj) {
                onTreeNodeDoubleClick(eventObj);
            }
            treeElement.onTreeNodeRightClick = function(eventObj) {
                onTreeNodeRightClick(eventObj);
            }
        }
        request.send();
    }
 
    function initFocus() {
        Focus.register($$("treeTitle").firstChild);
        Focus.register($$("gridTitle"));
    }
 
    function initEvents() {
		Event.attachEvent($$("treeBtRefresh"), "click", onClickTreeBtRefresh);
		Event.attachEvent($$("treeTitle"), "click", onClickTreeTitle);
		Event.attachEvent($$("gridTitle"), "click", onClickGridTitle);
    }

    function onTreeNodeActived(eventObj) {
        Focus.focus($$("treeTitle").firstChild.id);
 
    }
 
    function onTreeNodeDoubleClick(eventObj) {
        var nodeType = getNodeType();
		var editable = checkTreeNodeEditable();
 
		switch(nodeType) {
			case "1":
				editApplication(editable);          
				break;
			case "2":
				viewResourceType();
				break;
		}
    }

    function onTreeNodeRightClick(eventObj) {
        var treeObj = $$("tree");
		
        var x = eventObj.clientX;
        var y = eventObj.clientY;
		if( treeObj.contextmenu ) {
			treeObj.contextmenu.show(x, y);                
		}
    }
	
	function createOtherApplication() {
		editApplication(true, true);
	}
 
    function editApplication(editable, isNew) {
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();
		var treeID = treeNode.getId();
		var treeName = treeNode.getName();
		var parentId = treeNode.getParent().getId();

		var callback = {};
		callback.onTabClose = function(eventObj) {
			delCacheData(eventObj.tab.SID);
		};
		callback.onTabChange = function() {
			setTimeout(function() {
				loadAppDetailData(treeID, editable, isNew ? parentId : null);
			}, TIMEOUT_TAB_CHANGE);
		};

		var inf = {};
		if( editable ) {
			inf.label = OPERATION_EDIT.replace(/\$label/i, treeName);
			inf.SID = CACHE_APPLICATION_DETAIL + treeID;
		} else {
			inf.label = OPERATION_VIEW.replace(/\$label/i, treeName);
			inf.SID = CACHE_VIEW_APPLICATION_DETAIL + treeID;
		}
		inf.defaultPage = "page1";
		inf.phases = null;
		inf.callback = callback;
		var tab = ws.open(inf);
    }
 
    function loadAppDetailData(cacheID, editable, parentID) {
		var p = new HttpRequestParams();
		p.url = URL_APPLICATION_DETAIL;
		p.setContent("appId", cacheID);            

		var request = new HttpRequest(p);
		request.onresult = function() {
			var appInfoNode = this.getNodeValue(XML_APPLICATION_DETAIL);
			Cache.XmlIslands.add(cacheID, appInfoNode);

			var xform = $X("page1Form", appInfoNode);
			xform.editable = editable == false ? "false" : "true";
			
			// ���ñ��水ť����
			var page1BtSaveObj = $("page1BtSave");
			page1BtSaveObj.disabled = editable==false?true:false;
			page1BtSaveObj.onclick = function() {
				saveApp(cacheID, parentID);
			}
		}
		request.send();           
    }
 
    function saveApp(cacheID, parentID) {
        var p = new HttpRequestParams();
        p.url = URL_SAVE_APPLICATION;

        // �Ƿ��ύ
        var flag = false;

        // Ӧ�û�����Ϣ
        var appInfoNode = Cache.XmlIslands.get(cacheID);
        if( appInfoNode ) {
            var appInfoDataNode = appInfoNode.selectSingleNode(".//data");
            if( appInfoDataNode ) {
                flag = true;
                p.setXFormContent(appInfoDataNode);
            }
        }

        if( flag ) {
            var request = new HttpRequest(p);
            //ͬ����ť״̬
            syncButton([$$("page1BtSave")], request);

            request.onresult = function() {
                if( parentID ) { // ����
                    var treeNode = this.getNodeValue(XML_MAIN_TREE).selectSingleNode("treeNode");
                    appendTreeNode(parentID, treeNode);

                    ws.closeActiveTab();
                }
            }
            request.onsuccess = function() {
                if( !parentID ) { // �޸ģ��������ڵ�����                   
                    var name = $X("page1Form").getData("name");
                    modifyTreeNode(cacheID, "name", name, true);
                }
            }
            request.send();
        }
    }
 
    function viewResourceType() {
        var treeNode = $("tree").getActiveTreeNode();
		var treeID = treeNode.getId();
		var treeName = treeNode.getName();

		var callback = {};
		callback.onTabClose = function(eventObj) {
			delCacheData(eventObj.tab.SID);
		};
		callback.onTabChange = function() {
			setTimeout(function() {
				loadTypeData(treeID);
			}, TIMEOUT_TAB_CHANGE);
		};

		var inf = {};
		inf.label = OPERATION_VIEW.replace(/\$label/i,treeName);
		inf.SID = CACHE_VIEW_SOURCE_TYPE + treeID;
		inf.defaultPage = "page1";
		inf.phases = null;
		inf.callback = callback;
		var tab = ws.open(inf);
    }
 
    function loadTypeData(treeID) { 
		var p = new HttpRequestParams();
		p.url = URL_RESOURCE_TYPE;
		p.setContent("typeId", cacheID);            

		var request = new HttpRequest(p);
		request.onresult = function() {
			var typeInfoNode = this.getNodeValue(XML_SOURCE_TYPE_INFO);

			var xform = $X("page1Form", typeInfoNode);
			xform.editable = "false";
			
			// ���ñ��水ť����
			$("page1BtSave").disabled = true;
		}
		request.send();
    }
 
    function getNodeType() {
        return getTreeAttribute("nodeType");
    }
 
    function getApplicationId() {
        return getTreeAttribute("applicationId");
    }
	
    /*
     *	������ڵ��Ƿ�ɱ༭
     */
    function checkTreeNodeEditable() {
        var flag = false;
        switch(getNodeType()) {
            case "1":
                if("-1" != getTreeNodeId() && "-2" != getTreeNodeId() && "tss" != getApplicationId()) {
                    flag = true;
                }
                break;
            case "2":
            case "3":
				flag = false;
                break;
        }
        return flag;   
    }
 
    /*
     *	�༭���ڵ�
     */
    function editTreeNode(editable) {
        switch(getNodeType()) {
            case "1":
                editApplication(editable);
                break;
            case "2":
                viewResourceType(editable);
                break;
        }
    }
 
    function importApplication() {
        var treeObj = $("tree");
        var treeNode = treeObj.getActiveTreeNode();

		var treeID = treeNode.getId();
		var treeName = treeNode.getName();
		var applicationType = treeNode.getAttribute("applicationType");

		var callback = {};
		callback.onTabClose = function(eventObj) {
			delCacheData(eventObj.tab.SID);
		};
		callback.onTabChange = function() {
			setTimeout(function() {
				loadImportDetailData(treeID, applicationType);
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
    
     /*
     *	������ϸ��Ϣ��������
     *	������	string:treeID               ���ڵ�id
                string:applicationType      Ӧ������
     *	����ֵ��
     */
    function loadImportDetailData(treeID, applicationType) {
        var cacheID = CACHE_IMPORT_APPLICATION + treeID;
        var treeDetail = Cache.Variables.get(cacheID);
        if(null==treeDetail) {
            var p = new HttpRequestParams();
            p.url = URL_IMPORT_TEMPLATE;
            p.setContent("id", treeID);
            p.setContent("applicationType",applicationType);

            var request = new HttpRequest(p);
            request.onresult = function() {
                var importInfoNode = this.getNodeValue(XML_IMPORT_APPLICATION);

                importInfoNode.setAttribute("action",URL_IMPORT);//action��ַ
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
    function initImportPages(cacheID,applicationType) {
        var page1FormObj = $("page1Form");
        Public.initHTC(page1FormObj,"isLoaded","oncomponentready",function() {
            loadImportData(cacheID,applicationType);

            //file���ܸ�ֵ������ֻ�����xform����ʾ��ֵ
            page1FormObj.updateDataExternal("filePath", "");
        });

        //���ñ��水ť����
        var page1BtSaveObj = $("page1BtSave");
        page1BtSaveObj.disabled = false;
        page1BtSaveObj.onclick = function() {
            saveImport();
        }
    }

    /*
     *	����xform��������
     *	������	string:cacheID     ��������id
				string:applicationType Ӧ��ϵͳ����(1.ƽ̨ 2.����)
     *	����ֵ��
     */
    function loadImportData(cacheID,applicationType) {
        var xmlIsland = Cache.XmlIslands.get(cacheID+"."+XML_IMPORT_APPLICATION);
        if(null!=xmlIsland) {
            var page1FormObj = $("page1Form");
            page1FormObj.editable = "true";
            page1FormObj.load(xmlIsland.node,null,"node");
            page1FormObj.updateDataExternal("applicationType",applicationType,false);

            //2007-3-1 �뿪����
            attachReminder(cacheID,page1FormObj);
        }
    }
 
    function saveImport() {
        var page1FormObj = $("page1Form");	
        var fileName = page1FormObj.getData("filePath");
        if (fileName==null || fileName=="") {
            return alert("��ѡ�����ļ�!");
        }
        else {
            var fileLength = fileName.length;
            if(fileName.substring(fileLength-4,fileLength)!=".zip" && fileName.substring(fileLength-4,fileLength)!=".xml") {
                return alert("��ѡ��.xml��.zip�ļ�����!");
            }
            else{
                return page1FormObj.submit();
            }
        }
    }
 
    function createUploadFrame() {
        var frameName = "uploadFrame";
        var frameObj = $(frameName);
        if(null==frameObj) {
            frameObj = document.createElement("<iframe name='"+frameName+"' id='"+frameName+"' src='about:blank' style='display:none'></iframe>");
            document.body.appendChild(frameObj);
        }

        return frameName;
    }
 
    function getFilePath(path) {
        var page1FormObj = $("page1Form");
        page1FormObj.updateDataExternal("filePath",path);
    }
	

    window.onload = init;

	//�ر�ҳ���Զ�ע��
    logoutOnClose();