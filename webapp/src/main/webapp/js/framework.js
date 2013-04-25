/* 
 * ��ǰӦ���� 
 */
APP_CODE = "TSS";
CONTEXTPATH = "tss/";
APPLICATION = "tss";

// URL_CORE = "/" + APPLICATION + "/common/";  // ������İ����·��
URL_CORE = "common/";  // ������İ����·��


/*
 *	��ֹ����Ҽ� 
 */
document.oncontextmenu = function(eventObj) {
	eventObj = eventObj || window.event;
	var srcElement = Event.getSrcElement(eventObj);
	var tagName = srcElement.tagName.toLowerCase();
	if("input" != tagName && "textarea" != tagName) {
		event.returnValue = false;            
	}
}

/*
 *	����˵�����û���Ϣ��ʼ��
 */
function initUserInfo() {
	var p = new HttpRequestParams();
	p.url = "um/user!getOperatorInfo.action";
	p.setHeader("appCode", APP_CODE);
	p.setHeader("anonymous", "true");

	var request = new HttpRequest(p);
	request.onresult = function() {
		var userName = this.getNodeValue("name");
		$("userInfo").innerText = userName;
	}
	request.send();
}

URL_LOGOUT = "../logout.in";

function logout() {
	var p = new HttpRequestParams();
	p.url = URL_CORE + URL_LOGOUT;

	var request = new HttpRequests(p);
	request.onsuccess = function() {
		Cookie.del("token", "/" + CONTEXTPATH);
		location.href = URL_CORE + "../login.htm";
	}
	request.send();
}

// �ر�ҳ��ʱ���Զ�ע��
function logoutOnClose() {
	window.attachEvent("onuload", function() {
		if(10*1000 < window < screenTop || 10*1000 < window.screenLeft) {
			logout();
		}
	});
}

/*
 *	����˵�����������ǿ��
 *	������	object:formObj                  xform����
			string:url                      �����ַ
			string:password                 ����
			string:loginName                ��¼��
 */
function checkPasswordSecurityLevel(formObj, url, password, loginName) {
	var p = new HttpRequestParams();
	p.url = url;
	p.setHeader("appCode", APP_CODE);
	p.setContent("password", password);
	p.setContent("loginName", loginName);

	var request = new HttpRequest(p);
	request.onresult = function(error) {
		var securityLevel = this.getNodeValue(XML_SECURITY_LEVEL);
		formObj.securityLevel = securityLevel;

		showPasswordSecurityLevel(formObj);
	}
	request.onsuccess = function() {
		formObj.securityLevel = null;
	}
	request.send();
}

/*
 *	����˵������ʾ����ǿ����ʾ��Ϣ
 *	������	object:formObj                  xform����
 *	����ֵ��
 */
function showPasswordSecurityLevel(formObj) {
	var errorInfo = {
		0: "����������밲ȫ�ȼ�Ϊ\"������\"������ȫ",
		1: "����������밲ȫ�ȼ�Ϊ\"��\"��ֻ�ܱ��ϻ�����ȫ",
		2: "����������밲ȫ�ȼ�Ϊ\"��\"���ϰ�ȫ",
		3: "����������밲ȫ�ȼ�Ϊ\"��\"���ܰ�ȫ"
	};
	formObj.showCustomErrorInfo("password", errorInfo[formObj.securityLevel]);
}

/*
 *	����˵����ɾ������(����)
 *	������	string:cacheID      ��������id
			boolean:flag        �Ƿ����������XML����
 */
function delCacheData(cacheID, flag) {
	var cacheData = Cache.Variables.get(cacheID);
	Cache.Variables.del(cacheID);

	if( flag ) {
		for(var i=0; cacheData && i < cacheData.length; i++) {
			Cache.XmlIslands.del(cacheData[i]);
		}
	}
}


/*
 *	����˵��������tabҳ������
 */
function hideWorkSpace() {
	var ws = $("ws");
	var tr = ws.parentNode.parentNode;
	tr.style.display = "none";
	tr.previousSibling.style.display = "none";    
}

/*
 *	����˵������ʾtabҳ������
 */
function showWorkSpace() {
	var ws = $("ws");
	var tr = ws.parentNode.parentNode;
	tr.style.display = "";
	tr.previousSibling.style.display = "";
}


/*
 *	����˵����������������϶�Ч��
 */
function initPaletteResize() {
	var palette = $("palette");
	Element.attachColResize(palette, -1);
}

/*
 *	����˵������������϶�Ч��
 */
function initListContainerResize() {
	var listContainer = $("listContainer");
	Element.attachRowResize(listContainer, 8);
}


/*
 *	����˵������������ʼ��
 */
function initToolBar() {
	var tbObj = $("toolbar");
	ToolBars.create(tbObj);
}


/*
 *	����˵���������ˢ�°�ť
 */
function onClickTreeBtRefresh() {
	loadInitData();
}

/*
 *	����˵������������ⰴť
 */
function onClickTreeTitleBt() {
	var treeTitleObj = $("treeTitle");
	var statusTitleObj = $("statusTitle");

	var block = Blocks.getBlock("treeContainer");
	if( block ) {
		block.switchTo();
	}
	if( block.visible ) {
		treeTitleObj.firstChild.className = "opened";
		statusTitleObj.firstChild.className = "opened";

		var block = Blocks.getBlock("statusContainer");
		if( block ) {
			block.show();
		}
	} else {
		treeTitleObj.firstChild.className = "closed";
		statusTitleObj.firstChild.className = "opened";

		var block = Blocks.getBlock("statusContainer");
		if( block ) {
			block.show(false);
		}
	}
}

/*
 *	����˵�������״̬�����ⰴť
 */
function onClickStatusTitleBt() {
	var treeTitleObj = $("treeTitle");
	var statusTitleObj = $("statusTitle");

	var block = Blocks.getBlock("statusContainer");
	if( block ) {
		block.switchTo();
	}

	if(block.visible) {
		statusTitleObj.firstChild.className = "opened";        
	}
	else {
		statusTitleObj.firstChild.className = "closed";

		var block = Blocks.getBlock("treeContainer");
		if( block && true != block.visible ) {
			treeTitleObj.firstChild.className = "opened";

			var block = Blocks.getBlock("treeContainer");
			if( block ) {
				block.show();
			}
		}
	}
}

/*
 *	����˵��������������ư�ť
 */
function onClickPaletteBt() {
	var block = Blocks.getBlock("palette");
	if( block ) {
		block.switchTo();
	}
	
	$("paletteBt").className = block.visible ? "icon" : "iconClosed";
}

/*
 *	����˵�������������
 */
function onClickTreeTitle() {
	Focus.focus($("treeTitle").firstChild.id);
}

/*
 *	����˵�������״̬������
 */
function onClickStatusTitle() {
	Focus.focus($("statusTitle").firstChild.id);
}

/*
 *	����˵�������grid����
 *	������	
 *	����ֵ��
 */
function onClickGridTitle() {
	Focus.focus("gridTitle");
}


/*
 *	����˵��������Ҽ��˵����Ƿ�ɼ�
 *	������	string:code     ������
 */
function getOperation(code) {
	var flag = false;
	var treeObj = $("tree");
	var treeNode = treeObj.getActiveTreeNode();
	if( treeNode ) {
		var _operation = treeNode.getAttribute("_operation");
		flag = checkOperation(code, _operation);
	}
	return flag;
}

/*
 *	����˵����������Ȩ��
 *	������	string:code             ������
			string:_operation       Ȩ��
 *	����ֵ��
 */
function checkOperation(code, _operation) {
	var flag = false;
	if( "string" == typeof(code) && "string" == typeof(_operation) ) {
		var reg = new RegExp("(^" + code + ",)|(^" + code + "$)|(," + code + ",)|(," + code + "$)", "gi");
		flag = reg.test(_operation);
	}
	return flag;
}


/*
 *	����˵������ȡ���ڵ�����
 *	������	string:name         ������
 *	����ֵ��string:value        ����ֵ
 */
function getTreeAttribute(name) {
	var treeObj = $("tree");
	var treeNode = treeObj.getActiveTreeNode();
	if( treeNode ) {
		return treeNode.getAttribute(name);
	}
	return null;   
}

/*
 *	����˵�����޸����ڵ�����
 *	������  string:id               ���ڵ�id
			string:attrName         ������
			string:attrValue        ����ֵ
			string:refresh          �Ƿ�ˢ����
 *	����ֵ��
 */
function modifyTreeNode(id, attrName, attrValue, refresh) {
	var treeObj = $("tree");
	var treeNode = treeObj.getTreeNodeById(id);
	if( treeNode ) {
		treeNode.setAttribute(attrName, attrValue);
	}
	if( refresh ) {
		treeObj.reload();
	}
}

/*
 *	����˵��������ӽڵ�
 *	������	string:id           ���ڵ�id
			XmlNode:xmlNode     XmlNodeʵ��
 *	����ֵ��
 */
function appendTreeNode(id, xmlNode) {
	var treeObj = $("tree");
	var treeNode = treeObj.getTreeNodeById(id);
	if( treeNode && xmlNode ) {
		treeObj.insertTreeNodeXml(xmlNode.toXml(), treeNode);
	}
}

/*
 *	����˵������ȡ��ȫ���ڵ�id����
 *	������	XmlNode:xmlNode         XmlNodeʵ��
			string:xpath            ѡȡ�ڵ�xpath
 *	����ֵ��Array:Ids               �ڵ�id����
 */
function getTreeNodeIds(xmlNode, xpath) {
	  var idArray = [];
	  var treeNodes = xmlNode.selectNodes(xpath);
	  for(var i=0; i < treeNodes.length; i++) {
		  var curNode = treeNodes[i];
		  var id = curNode.getAttribute("id");
		  if( id ) {
			  idArray.push(id);
		  }
	  }
	  return idArray;
}

/*
 *	����˵�������ڵ㶨λ
 *	������	Element:treeObj         tree�ؼ�
			Element:keywordObj      �ؼ��������
 *	����ֵ��
 */
function searchTree(treeObj, keywordObj) {	
	var tempAlert = window.alert;  // �������ؼ�����������Ϣ��ʾ����
	
	window.alert = function(str) {
		var balloon = Balloons.create(str);
		balloon.dockTo(keywordObj);
	}

	if( treeObj.research ) {
		var keyword = treeObj.keyword;
		treeObj.searchNode(keyword, "name", "hazy", "down");
		treeObj.research = false;
	}
	else{
		treeObj.searchNext("down", true);
	}

	// ��ԭ��Ϣ��ʾ����
	window.alert = tempAlert;
}

/*
 *	����˵�������ڵ㶨λ
 *	������	Element:treeObj         tree�ؼ�
			Element:btObj           ������ť
			Element:keywordObj      �ؼ��������
 *	����ֵ��
 */
function attachSearchTree(treeObj, btObj, keywordObj) {
	// ����������ť����
	btObj.onclick = function() {
		searchTree(treeObj, keywordObj);
	}

	// ���������ؼ��ֲ���
	keywordObj.value = "";
	keywordObj.onchange = function() {
		treeObj.research = true;
		treeObj.keyword = this.value;
	}

	keywordObj.onchange();    
}

/*
 *	����˵�������tree����
 *	������	Element:treeObj         tree�ؼ�����
 *	����ֵ��
 */
function clearTreeData(treeObj) {
	var xmlReader = new XmlReader("<actionSet/>");
	var emptyNode = new XmlNode(xmlReader.documentElement);
	treeObj.load(emptyNode.node);
	treeObj.research = true;
}    

/*
 *	����˵����ɾ����ѡ�нڵ�
 *	������	Element:treeObj         tree�ؼ�����
			Array:exceptIds         �����id
 *	����ֵ��
 */
function removeTreeNode(treeObj, exceptIds) {
	
	exceptIds = exceptIds || ["_rootId"];

	var selectedNodes = treeObj.getSelectedTreeNode();
	for(var i=0; i < selectedNodes.length; i++) {
		var curNode = selectedNodes[i];
		var id = curNode.getId();

		var flag = true;
		for(var j=0; j < exceptIds.length; j++) {
			if(id == exceptIds[j]) {
				flag = false;
				break;
			}
		}

		if(flag) {
			treeObj.removeTreeNode(curNode);
		}
	}
}

/*
 *	����˵��������ѡ�нڵ���ӵ���һ����(ע�������ظ�id�ڵ㣬���ҽ����ֻ��һ��ṹ)
 *	������	Element:fromTreeObj         ���ؼ�
			Element:toTreeObj           ���ؼ�
			Function:checkFunction      ��ⵥ���ڵ��Ƿ��������
 *	����ֵ��
 */
function addTreeNode(fromTreeObj, toTreeObj, checkFunction) {	
	var reload = false;
	var selectedNodes = fromTreeObj.getSelectedTreeNode(false);	
	for(var i=0; i < selectedNodes.length; i++) {
		var curNode = selectedNodes[i];

		if("0" == curNode.getAttribute("canselected")) {
			continue;  // ���˲���ѡ��Ľڵ�
		}

		curNode.setSelectedState(0, true, true);

		if( checkFunction ) {
			var result = checkFunction(curNode);
			if( result && result.error ) {
				// ��ʾ������Ϣ
				if( result.message ) {
					var balloon = Balloons.create(result.message);
					balloon.dockTo(toTreeObj);
				}

				if( result.stop ) {
					return;
				}
				continue;
			}
		}

		var groupName = curNode.getName();
		var id = curNode.getId();

		var sameAttributeTreeNode = hasSameAttributeTreeNode(toTreeObj, "id", id);
		if("_rootId" != id && false == sameAttributeTreeNode) {
			// ������һ����Ӳ�ˢ��Tree
			reload = true;

			// �ų��ӽڵ�
			var treeNode = toTreeObj.getTreeNodeById("_rootId");
			if( treeNode ) {
				var cloneNode = new XmlNode(curNode.node).cloneNode(false);
				toTreeObj.insertTreeNodeXml(cloneNode.toXml(),treeNode);
			}
		}
	}

	if( reload ) {
		toTreeObj.reload();
	}
	fromTreeObj.reload();
}

/*
 *	����˵��������Ƿ�����ͬ���Խڵ�
 *	������	Element:treeObj         tree�ؼ�����
			string:attrName         ������
			string:attrValue        ����ֵ
 *	����ֵ��
 */
function hasSameAttributeTreeNode(treeObj, attrName, attrValue) {
	var flag = new Boolean(false);
	var xmlIsland = treeObj.getTreeNodeById("_rootId").node;
	var treeNode = xmlIsland.selectSingleNode(".//treeNode[@" + attrName + "='" + attrValue + "']");
	if( treeNode ) {
		flag = new Boolean(true);
		flag.treeNode = treeNode;
	}
	return flag;
}

/*
 *	����˵������ʾ��ǰ���ڵ���Ϣ
 */
function showTreeNodeStatus(params) {
	var treeObj = $("tree");
	var treeNode = treeObj.getActiveTreeNode();
	if( treeNode ) {
		var id = treeNode.getId();
		var block = Blocks.getBlock("statusContainer");
		if( block && "_rootId" != id ) {
			block.open();

			for(var item in params) {
				var name = params[item];
				var val = treeNode.getAttribute(item);
				block.writeln(name, val);                
			}

			block.close();
		}
		if( "_rootId" == id ) {
		   block.hide();
		}
	}
}


/*
 *	����˵������ʼ����ҳ������
 *	������	object:toolbarObj       ����������
			XmlNode:xmlIsland       XmlNodeʵ��
			function:callback       �ص�����
 *	����ֵ��
 */
function initGridToolBar(toolbarObj, xmlIsland, callback) {
	//��ʼ��
	toolbarObj.init = function() {
		this.clear();
		this.create();
		this.attachEvents();
	}
	
	//�������
	toolbarObj.clear = function() {
		this.innerHTML = "";
	}
	
	//������ť
	toolbarObj.create = function() {
		var totalpages = toolbarObj.getTotalPages();
		var curPage = toolbarObj.getCurrentPage();

		var str = [];
		str[str.length] = "<span class=\"button refresh\" id=\"GridBtRefresh\" title=\"ˢ��\"></span>";
		str[str.length] = "<span class=\"button first\"   id=\"GridBtFirst\"   title=\"��һҳ\"></span>";
		str[str.length] = "<span class=\"button prev\"    id=\"GridBtPrev\"    title=\"��һҳ\"></span>";
		str[str.length] = "<span class=\"button next\"    id=\"GridBtNext\"    title=\"��һҳ\"></span>";
		str[str.length] = "<span class=\"button last\"    id=\"GridBtLast\"    title=\"���һҳ\"></span>";
		
		str[str.length] = "<select id=\"GridPageList\">";
		for(var i=0; i <= totalpages; i++) {
			str[str.length] = "  <option value=\"" + i + "\"" + (curPage == i ? " selected" : "") + ">" + i + "</option>";
		}
		str[str.length] = "</select>";

		this.innerHTML = str.join("");
	}
	
	//���¼�
	toolbarObj.attachEvents = function() {
		var gridBtRefreshObj = $("GridBtRefresh");
		var gridBtFirstObj   = $("GridBtFirst");
		var gridBtPrevObj    = $("GridBtPrev");
		var gridBtNextObj    = $("GridBtNext");
		var gridBtLastObj    = $("GridBtLast");
		var gridPageListObj  = $("GridPageList");

		Event.attachEvent(gridBtRefreshObj, "click", function() {
			var curPage = toolbarObj.getCurrentPage();
			toolbarObj.gotoPage(curPage);
		});
		Event.attachEvent(gridBtFirstObj, "click", function() {
			toolbarObj.gotoPage("1");
		});
		Event.attachEvent(gridBtLastObj, "click", function() {
			var lastpage = toolbarObj.getLastPage();
			toolbarObj.gotoPage(lastpage);
		});
		Event.attachEvent(gridBtNextObj, "click", function() {
			var curPage = toolbarObj.getCurrentPage();
			var lastpage = toolbarObj.getLastPage();
			var page = lastpage;
			if(curPage < lastpage) {
				page = curPage + 1;
			}
			toolbarObj.gotoPage(page);
		});
		Event.attachEvent(gridBtPrevObj, "click", function() {
			var curPage = toolbarObj.getCurrentPage();
			var page = 1;
			if(curPage > 1) {
				page = curPage - 1;
			}
			toolbarObj.gotoPage(page);
		});
		Event.attachEvent(gridPageListObj, "change", function() {
			toolbarObj.gotoPage(gridPageListObj.value);
		});
	}
	
	//��ȡ��ǰҳ��
	toolbarObj.getCurrentPage = function() {
		var currentpage = xmlIsland.getAttribute("currentpage");
		if(null == currentpage) {
			currentpage = 1;
		} else {
			currentpage = parseInt(currentpage);
		}
		return currentpage;
	}
	
	//��ȡ���һҳҳ��
	toolbarObj.getLastPage = function() {
		var lastpage = this.getTotalPages();
		if(null == lastpage) {
			lastpage = 1;
		} else {
			lastpage = parseInt(lastpage);
		}
		return lastpage;
	}
	
	//��ȡ��ҳ��
	toolbarObj.getTotalPages = function() {
		var totalpages = xmlIsland.getAttribute("totalpages");
		if(null == totalpages) {
			totalpages = 1;
		} else {
			totalpages = parseInt(totalpages);
		}
		return totalpages;
	}
	
	//ת��ָ��ҳ
	toolbarObj.gotoPage = function(page) {
		callback(page);
	}
	
	toolbarObj.init();
}





/*
 *	����˵������ֹ�����ť
 */
function disableButton(btObj) {
	btObj.disabled = true;
}
/*
 *	����˵������������ť��
 */
function enableButton(btObj) {
	btObj.disabled = false;
}
/*
 *	����˵����ͬ����ť��ֹ/����״̬
 */
function syncButton(btObjs, request) {
	for(var i=0; i < btObjs.length; i++) {
		disableButton(btObjs[i]);
	}

	request.ondata = function() {
		for(var i=0; i < btObjs.length; i++) {
			enableButton(btObjs[i]);
		}
	}
}



/*
 *	����˵������ʼ��������
 *	������	string:curId       ��ǰ�˵���id
 */
function initNaviBar(curId) {	
	var isModule = (window.location.href.indexOf("module") > 0);
	var relativePath = isModule ? "../../../" : "../";

	var p = new HttpRequestParams();
	p.url = relativePath + "navi.xml";

	var request = new HttpRequest(p);
	request.onresult = function() {
		var data = this.getNodeValue("NaviInfo");

		var str = [];
		var menuItems = data.selectNodes("MenuItem");
		for(var i=0; i < menuItems.length; i++) {
			var menuItem = menuItems[i];
			var id   = menuItem.getAttribute("id");
			var href = menuItem.getAttribute("href");
			var name = menuItem.getAttribute("name");

			if( false == /^javascript\:/.test(href) ) {
				href = relativePath + href;
			}
			
			var cssStyle = (curId == id) ? "naviActive" : "navi";
			str[str.length] = "<a href=\"" + href + "\" class=\"" + cssStyle + "\">" + name + "</a>";
		}
		$("navibar").innerHTML = str.join(" ");
	}
	request.send();
}

/*
 *	����˵����������ڵ����Ȩ��
 *	������	xmlNode:treeNode                XmlNodeʵ��
			boolean:clearChildren           �Ƿ�����ӽڵ�
 */
function clearOperation(treeNode, clearChildren) {
	treeNode.removeAttribute("_operation");

	if(false != clearChildren) {
		var childs = treeNode.selectNodes(".//treeNode");
		for(var i=0,iLen=childs.length;i<iLen;i++) {
			childs[i].removeAttribute("_operation");
		}
	}
}

