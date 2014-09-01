/* 后台响应数据节点名称 */
XML_MAIN_TREE = "SourceTree";
XML_SOURCE_DETAIL = "DetailInfo";

/* XMLHTTP请求地址汇总 */
URL_SOURCE_TREE      = AUTH_PATH + "component/list";
URL_SOURCE_SORT      = AUTH_PATH + "component/sort/"; // {id}/{targetId}/{direction}
URL_STOP_NODE        = AUTH_PATH + "component/disable/"; // {id}/{state}
URL_SOURCE_DETAIL    = AUTH_PATH + "component/";  // {groupId}/{id}
URL_DELETE_NODE      = AUTH_PATH + "component/";  // {id}
URL_SOURCE_SAVE      = AUTH_PATH + "component";
URL_SOURCE_RENAME    = AUTH_PATH + "component/rename/";
URL_EXPORT_COMPONENT = AUTH_PATH + "component/export/"; // {id}
URL_PREVIEW_COMPONENT= AUTH_PATH + "component/preview/"; // {id}

if(IS_TEST) {
	URL_SOURCE_TREE      = "data/component_tree.xml?";
	URL_SOURCE_SORT      = "data/_success.xml?";
	URL_STOP_NODE        = "data/_success.xml?";
	URL_SOURCE_DETAIL    = "data/component_detail.xml?";
	URL_DELETE_NODE      = "data/_success.xml?";
	URL_SOURCE_SAVE      = "data/_success.xml?";
	URL_SOURCE_RENAME    = "data/_success.xml?";
	URL_EXPORT_COMPONENT = "data/_success.xml?";
	URL_PREVIEW_COMPONENT= "data/component-preview.html?"; // "/auth/component/preview/" + id;
}

function init() {
    initPaletteResize();
    initMenus();
    initWorkSpace(false);
    initEvents();

    loadInitData();
}

function loadInitData() {
	$.ajax({
		url : URL_SOURCE_TREE,
		onresult : function() { 
			var tree = $.T("tree", this.getNodeValue(XML_MAIN_TREE));
			tree.onTreeNodeDoubleClick = function(ev) {
				if( !isGroup() ) {
					 editComponentInfo();            
				}
			}
			tree.onTreeNodeRightClick = function(ev) {
				onTreeNodeRightClick(ev);
			}
			tree.onTreeNodeMoved = function(ev) {
				sortTreeNode(URL_SOURCE_SORT, ev);
			}
		}
	});
}

function initMenus() {
	ICON = "images/";
    var item1 = {
        label:"新建组件",
        callback:addNewComponent,
        visible:function() {return isGroup();}
    }
    var item2 = {
        label:"删除",
        callback: function() { delTreeNode() },
        icon:ICON + "icon_del.gif"
    }
    var item3 = {
        label:"编辑",
        callback:editTreeNode,
        icon:ICON + "icon_edit.gif"
    }
    var item4 = {
        label:"启用",
        callback: function() { stopOrStartTreeNode("0"); },
        icon:ICON + "icon_start.gif",
        visible:function() {return !isGroup() && isTreeNodeDisabled();}
    }
    var item5 = {
        label:"停用",
        callback: function() { stopOrStartTreeNode("1"); },
        icon:ICON + "icon_stop.gif",
        visible:function() {return !isGroup() && !isTreeNodeDisabled();}
    }
    var item6 = {
        label:"新建分组",
        callback:function() {
            addNewGroup();
        },
        visible:function() {return isGroup();}
    }
    var item7 = {
        label:"导出",
        callback:exportComponent,
        icon:ICON + "export.gif",
        visible:function() {return !isGroup();}
    }
    var item8 = {
        label:"导入",
        callback:importComponent,
        icon:ICON + "import.gif",
        visible:function() {return isGroup();}
    }
    var item9 = {
        label:"资源管理",
        callback:function() {resourceManage();},
        visible:function() {return !isGroup();}
    }
	var item10 = {
        label:"预览",
        callback:function() {previewElement();},
        icon:ICON + "preview.gif",
        visible:function() {return !isGroup();}
    }

    var menu1 = new $.Menu();
	menu1.addItem(item6);
	menu1.addItem(item1);
	menu1.addItem(item3);
    menu1.addItem(item2);
    menu1.addItem(item4);
    menu1.addItem(item5);
    menu1.addSeparator();
   	menu1.addItem(item7);
    menu1.addItem(item8);
    menu1.addItem(item9);
    menu1.addItem(item10);
   
    $1("tree").contextmenu = menu1;
}

function getComponentType(type) {
    type = type || getTreeAttribute("type");
	switch(type) {
		case "1": return "layout";
		case "2": return "decorator";
		case "3": return "portlet";
		default : return null;
	}
}

function isGroup() {
	return getTreeAttribute("isGroup") == "true";
}

function getGroupId() {
    return getTreeAttribute("parentId");
}

function editTreeNode() {
	if( isGroup() ) {
		renameGroup();
	} else {
		editComponentInfo();
	}
}

function addNewComponent() {
    var treeName = "组件";
    var treeID = DEFAULT_NEW_ID;

    var tree = $.T("tree");
    var treeNode = tree.getActiveTreeNode();
	var parentID = treeNode.id;

	var callback = {};
	callback.onTabChange = function() {
		setTimeout(function() {
			loadTreeDetailData(treeID, parentID);
		}, TIMEOUT_TAB_CHANGE);
	};

	var inf = {};
	inf.defaultPage = "page1";
	inf.label = OPERATION_ADD.replace(/\$label/i, treeName);
	inf.callback = callback;
	inf.SID = CACHE_TREE_NODE + treeID;
	ws.open(inf);
}

function editComponentInfo() {
    var tree = $.T("tree");
    var treeNode = tree.getActiveTreeNode();
	var treeID = treeNode.id;
	var treeName = treeNode.name;

	var callback = {};
	callback.onTabChange = function() {
		setTimeout(function() {
			loadTreeDetailData(treeID, getGroupId());
		}, TIMEOUT_TAB_CHANGE);
	};

	var inf = {};
	inf.label = OPERATION_EDIT.replace(/\$label/i, treeName);
	inf.SID = CACHE_TREE_NODE + treeID;
	inf.defaultPage = "page1";
	inf.callback = callback;
	ws.open(inf);
}

function loadTreeDetailData(treeID, parentID) {
	if(treeID == null) return;
	
	$.ajax({
		url: URL_SOURCE_DETAIL +　parentID + "/" + treeID,
		onresult: function() {
			var componentInfoNode = this.getNodeValue(XML_SOURCE_DETAIL);
			preProcessXml(componentInfoNode);
			$.cache.XmlDatas[treeID] = componentInfoNode;

			var page1Form = $.F("page1Form", componentInfoNode);
			attachReminder(treeID, page1Form);

			// 设置保存按钮操作
			$1("page1BtSave").onclick = function() {
				saveComponent(treeID, parentID);
			}
		}
	});
}

/* 预解析definition，分别设置到script,style,html,events和parameters上 */
function preProcessXml(dataNode) {
    var rowNode = dataNode.querySelector("data>row");
    var definition = $.XML.getCDATA(rowNode, "definition") || "";

    var definitionNode = $.XML.toNode(definition);
    var scriptNode = definitionNode.querySelector("script");
    var styleNode  = definitionNode.querySelector("style");
    var htmlNode   = definitionNode.querySelector("html");
    var eventsNode = definitionNode.querySelectorAll("events *");
    var parametersNode = definitionNode.querySelectorAll("parameters *");

    if(scriptNode) {
        $.XML.setCDATA(rowNode, "script", $.XML.getText(scriptNode));
    }
    if(styleNode) {
        $.XML.setCDATA(rowNode, "style", $.XML.getText(styleNode));
    }
    if(htmlNode) {
        $.XML.setCDATA(rowNode, "html", $.XML.getText(htmlNode));
    }
    if(eventsNode) {
        var events = [];
        for(var i=0; i < eventsNode.length; i++) {
            var curNode = eventsNode[i];
            events[i] = curNode.getAttribute("event") + "=" + curNode.getAttribute("onevent");
        }
        $.XML.setCDATA(rowNode, "events", events.join("\r\n"));
    }
    if(parametersNode) {
        var parameters = [];
        for(var i=0;i < parametersNode.length; i++) {
            var curNode = parametersNode[i];
            parameters[i] = curNode.getAttribute("name") + "=" + curNode.getAttribute("defaultValue");
        }
        $.XML.setCDATA(rowNode, "parameters", parameters.join("\r\n"));
    }
}
 
function saveComponent(treeID, parentID) {
    var page1Form = $.F("page1Form");
    if( !page1Form.checkForm()) {
        return;
    }

    var request = new $.HttpRequest();
    request.url = URL_SOURCE_SAVE;

	//修饰基本信息
	var componentInfoNode = $.cache.XmlDatas[treeID];
	var dataNode = componentInfoNode.querySelector("data");
	dataNode = dataNode.cloneNode(true);

	var rowNode = dataNode.querySelector("row");

	// 拼接definition属性
	var name        = $.XML.getCDATA(rowNode, "name") || "";
	var version     = $.XML.getCDATA(rowNode, "version") || "";
	var script      = $.XML.getCDATA(rowNode, "script") || "";
	var style       = $.XML.getCDATA(rowNode, "style") || "";
	var html        = $.XML.getCDATA(rowNode, "html") || "";
	var events      = $.XML.getCDATA(rowNode, "events") || "";
	var parameters  = $.XML.getCDATA(rowNode, "parameters") || "";
	var description = $.XML.getCDATA(rowNode, "description") || "";
	var type        = $.XML.getCDATA(rowNode, "type") || "";
	var rootName    = getComponentType(type);

	var str = [];
	str[str.length] = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	str[str.length] = "<" + rootName + ">";
	str[str.length] = "<property>";
	str[str.length] = "<name>" + name + "</name>";
	str[str.length] = "<version>" + version + "</version>";
	str[str.length] = "<description>";
	str[str.length] = "<![CDATA[" + description + "]]>";
	str[str.length] = "</description>";
	str[str.length] = "</property>";
	str[str.length] = "<script>";
	str[str.length] = "<![CDATA[" + script + "]]>";
	str[str.length] = "</"+"script>";
	str[str.length] = "<style>";
	str[str.length] = "<![CDATA[" + style + "]]>";
	str[str.length] = "</style>";
	str[str.length] = "<html>";
	str[str.length] = "<![CDATA[" + html + "]]>";
	str[str.length] = "</html>";

	str[str.length] = "<events>";
	events = events.split("\n");
	for(var i =0; i < events.length; i++) {
		var curEvent = events[i].replace(/(^\s*)|(\s*$)/g, ""); // 去掉每行前后多余空格
		if(curEvent == "") {
			continue;
		}
		var curEventName  = curEvent.substring(0, curEvent.indexOf("="));
		var curEventValue = curEvent.substring(curEvent.indexOf("=") + 1);
		str[str.length] = "<attach event=\"" + curEventName + "\" onevent=\"" + curEventValue + "\"/>";
	}
	str[str.length] = "</events>";

	str[str.length] = "<parameters>";
	parameters = parameters.split("\n");
	for(var i =0; i < parameters.length; i++) {
		var curParam = parameters[i].replace(/(^\s*)|(\s*$)/g, ""); // 去掉每行前后多余空格
		if(curParam == "") {
			continue;
		}
		var curParamName  = curParam.substring(0, curParam.indexOf("="));
		var curParamValue = curParam.substring(curParam.indexOf("=") + 1);
		str[str.length] = "<param name=\"" + curParamName + "\" defaultValue=\"" + curParamValue + "\"/>";
	}
	str[str.length] = "</parameters>";
	str[str.length] = "</" + rootName + ">";

	$.XML.setCDATA(rowNode, "definition", str.join(""));
	$.XML.removeCDATA(rowNode, "script");
	$.XML.removeCDATA(rowNode, "style");
	$.XML.removeCDATA(rowNode, "html");
	$.XML.removeCDATA(rowNode, "events");
	$.XML.removeCDATA(rowNode, "parameters");

	request.setFormContent(dataNode);
    
	//同步按钮状态
    syncButton([ $1("page1BtSave") ], request);

    request.onresult = function() {
		detachReminder(treeID); // 解除提醒

		var xmlNode = this.getNodeValue(XML_MAIN_TREE).querySelector("treeNode");
		appendTreeNode(parentID, xmlNode);

		ws.closeActiveTab();
    }
    request.onsuccess = function() {
		detachReminder(treeID); // 解除提醒

		//更新树节点名称
		var name = page1Form.getData("name");
		modifyTreeNode(treeID, "name", name);

		ws.closeActiveTab();
    }
    request.send();
}

function renameGroup() {
	var tree = $.T("tree");
    var treeNode = tree.getActiveTreeNode();
    var id = treeNode.id;

    var groupName = prompt("请输入组名称", treeNode.name);
	if(groupName == null || groupName.trim() == "") {
		return alert("组名不能为空。");
	}

	$.ajax({
		url: URL_SOURCE_RENAME + id + "/" + groupName,
		onsuccess : function() { 
			modifyTreeNode(id, "name", groupName);
		}
	});
}

function addNewGroup() {
    var tree = $.T("tree");
    var treeNode = tree.getActiveTreeNode();
    var parentID = treeNode.id;
	var type =  treeNode.getAttribute("type");

    var groupName = prompt("请输入组名称", "");
	if(groupName == null || groupName.trim() == "") {
		return alert("组名不能为空。");
	}

	$.ajax({
		url : URL_SOURCE_SAVE,
		params: {"name":groupName, "parentId":parentID, "type": type, "isGroup": "true"},
		onresult : function() { 
			var treeNode = this.getNodeValue(XML_MAIN_TREE).querySelector("treeNode");
			appendTreeNode(parentID, treeNode);
		}
	});
}

/* 预览组件  */
function previewElement() {
	var url	= URL_PREVIEW_COMPONENT + getTreeNodeId();
	window.open(url);
}

/*
 *	更改布局器、组件、portlet的参数配置文件
 *	参数：	int:type       类型(1:布局器、2:组件、3:portlet)
 */
function editParamsTemplate(type) {
    var page1Form = $.F("page1Form");
    var id         = page1Form.getData("id") ;
	var name       = page1Form.getData("name") || "";
    var parameters = page1Form.getData("parameters") || "";

    if(id) {
        window.showModalDialog("component-params.html", {id:id,params:parameters,title:"配置组件【" + name + "】的参数模板"},"dialogWidth:700px;dialogHeight:480px;");
    } else {
		alert("请先保存组件后再配置其参数模板");
	}
}

function importComponent() {
	function checkFileWrong(subfix) {
		return subfix != ".xml" && subfix != ".zip";
	}

	var url = URL_UPLOAD_FILE + "?groupId=" + getTreeNodeId();
	url += "&afterUploadClass=com.jinhe.tss.portal.helper.CreateComponent";
	var importDiv = createImportDiv("只支持XML和zip文件格式导入", checkFileWrong, url);
	Element.show(importDiv);
}	

function exportComponent() {
    var frameName = createExportFrame();
    var frameObj = window.frames[frameName];
    frameObj.location.href = URL_EXPORT_COMPONENT + getTreeNodeId();
}

/* 组件资源管理 */
function resourceManage() {
    var tree = $.T("tree");
    var treeNode = tree.getActiveTreeNode();
	var name = treeNode.name;
	var code = treeNode.getAttribute("code");

	var params = {
		code:code,
		type:getComponentType()
	};

	window.showModalDialog("filemanager.html", {params:params, title:"\"" + name + "\"相关资源管理"},"dialogWidth:500px;dialogHeight:500px;");
}
 

window.onload = init;