/* 
 * 当前应用名 
 */
APP_CODE    = "TSS";
APPLICATION = APP_CODE.toLowerCase();
CONTEXTPATH = APPLICATION + "/";

URL_CORE = "/" + APPLICATION + "/framework/";  // 界面核心包相对路径


/*
 *	禁止鼠标右键 
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
 *	用户信息初始化
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

function logout() {
	var p = new HttpRequestParams();
	p.url = URL_CORE + "../logout.in";

	var request = new HttpRequests(p);
	request.onsuccess = function() {
		Cookie.del("token", "/" + CONTEXTPATH);
		location.href = URL_CORE + "../login.htm";
	}
	request.send();
}

// 关闭页面时候自动注销
function logoutOnClose() {
	window.attachEvent("onuload", function() {
		if(10*1000 < window < screenTop || 10*1000 < window.screenLeft) {
			logout();
		}
	});
}

/*
 *	检查密码强度
 *	参数：	object:formObj                  xform对象
			string:url                      请求地址
			string:password                 密码
			string:loginName                登录名
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
 *	显示密码强度提示信息
 *	参数：	object:formObj                  xform对象
 *	返回值：
 */
function showPasswordSecurityLevel(formObj) {
	var errorInfo = {
		0: "您输入的密码安全等级为\"不可用\"，不安全",
		1: "您输入的密码安全等级为\"低\"，只能保障基本安全",
		2: "您输入的密码安全等级为\"中\"，较安全",
		3: "您输入的密码安全等级为\"高\"，很安全"
	};
	formObj.showCustomErrorInfo("password", errorInfo[formObj.securityLevel]);
}

/*
 *	删除缓存(公用)
 *	参数：	string:cacheID      缓存数据id
			boolean:flag        是否清除关联的XML数据
 */
function delCacheData(cacheID, flag) {
	var cacheData = Cache.Variables.get(cacheID);
	Cache.Variables.del(cacheID);

	if( flag ) {
		for(var i=0; cacheData && i < cacheData.length; i++) {
			Cache.XmlDatas.del(cacheData[i]);
		}
	}
}


var ws;
function initWorkSpace(hide) {
	ws = new WorkSpace($("ws"));
	 
	$("ws").onTabCloseAll = function(event) {
		hideWorkSpace();
	}
	$("ws").onTabChange = function(event) {
		var fromTab = event.lastTab;
		var toTab = event.tab;
		showWorkSpace();
	}
}

/*
 *	隐藏tab页工作区
 */
function hideWorkSpace() {
	var tr = $("ws").parentNode.parentNode;
	tr.style.display = "none";
	tr.previousSibling.style.display = "none";    
}

/*
 *	显示tab页工作区
 */
function showWorkSpace() {
	var tr = $("ws").parentNode.parentNode;
	tr.style.display = "";
	tr.previousSibling.style.display = "";
}


/*
 *	左栏添加左右拖动效果
 */
function initPaletteResize() {
	var palette = $("palette");
	Element.attachColResize(palette, -1);
}

/*
 *	添加上下拖动效果
 */
function initListContainerResize() {
	var listContainer = $("listContainer");
	Element.attachRowResize(listContainer, 8);
}


var toolbar;
 
function initToolBar() {
	toolbar = ToolBars.create($("toolbar"));
}

/*
 *	点击树刷新按钮
 */
function onClickTreeBtRefresh() {
	loadInitData();
}

/*
 *	点击树标题按钮
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
 *	点击状态栏标题按钮
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
 *	点击左栏控制按钮
 */
function onClickPaletteBt() {
	var block = Blocks.getBlock("palette");
	if( block ) {
		block.switchTo();
	}
	
	$("paletteBt").className = block.visible ? "icon" : "iconClosed";
}

/*
 *	点击树标题
 */
function onClickTreeTitle() {
	Focus.focus($("treeTitle").firstChild.id);
}

/*
 *	点击状态栏标题
 */
function onClickStatusTitle() {
	Focus.focus($("statusTitle").firstChild.id);
}

/*
 *	点击grid标题
 *	参数：	
 *	返回值：
 */
function onClickGridTitle() {
	Focus.focus("gridTitle");
}


/*
 *	检测右键菜单项是否可见
 *	参数：	string:code     操作码
 */
function getOperation(code) {
	var flag = false;
	var treeObj = $T("tree");
	var treeNode = treeObj.getActiveTreeNode();
	if( treeNode ) {
		var _operation = treeNode.getAttribute("_operation");
		flag = checkOperation(code, _operation);
	}
	return flag;
}

/*
 *	检测操作权限
 *	参数：	string:code             操作码
			string:_operation       权限
 *	返回值：
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
 *	获取树节点属性
 *	参数：	string:name         属性名
 *	返回值：string:value        属性值
 */
function getTreeAttribute(name) {
	var treeObj = $T("tree");
	var treeNode = treeObj.getActiveTreeNode();
	if( treeNode ) {
		return treeNode.getAttribute(name);
	}
	return null;   
}

/*
 *	修改树节点属性
 *	参数：  string:id               树节点id
			string:attrName         属性名
			string:attrValue        属性值
			string:refresh          是否刷新树
 *	返回值：
 */
function modifyTreeNode(id, attrName, attrValue, refresh) {
	var treeObj = $T("tree");
	var treeNode = treeObj.getTreeNodeById(id);
	if( treeNode ) {
		treeNode.setAttribute(attrName, attrValue);
	}
	if( refresh ) {
		treeObj.reload();
	}
}

/*
 *	添加子节点
 *	参数：	string:id           树节点id
			XmlNode:xmlNode     XmlNode实例
 *	返回值：
 */
function appendTreeNode(id, xmlNode) {
	var treeObj = $T("tree");
	var treeNode = treeObj.getTreeNodeById(id);
	if( treeNode && xmlNode ) {
		treeObj.insertTreeNodeXml(xmlNode.toXml(), treeNode);
	}
}

/*
 *	获取树全部节点id数组
 *	参数：	XmlNode:xmlNode         XmlNode实例
			string:xpath            选取节点xpath
 *	返回值：Array:Ids               节点id数组
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
 *	树节点定位
 *	参数：	Element:treeObj         tree控件
			Element:keywordObj      关键字输入框
 *	返回值：
 */
function searchTree(treeObj, keywordObj) {	
	var tempAlert = window.alert;  // 覆盖树控件搜索出错信息提示方法
	
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

	// 还原信息提示方法
	window.alert = tempAlert;
}

/*
 *	树节点定位
 *	参数：	Element:treeObj         tree控件
			Element:btObj           搜索按钮
			Element:keywordObj      关键字输入框
 *	返回值：
 */
function attachSearchTree(treeObj, btObj, keywordObj) {
	// 设置搜索按钮操作
	btObj.onclick = function() {
		searchTree(treeObj, keywordObj);
	}

	// 设置搜索关键字操作
	keywordObj.value = "";
	keywordObj.onchange = function() {
		treeObj.research = true;
		treeObj.keyword = this.value;
	}

	keywordObj.onchange();    
}

/*
 *	清除tree数据
 *	参数：	Element:treeObj         tree控件对象
 *	返回值：
 */
function clearTreeData(treeObj) {
	var xmlReader = new XmlReader("<actionSet/>");
	var emptyNode = new XmlNode(xmlReader.documentElement);
	treeObj.load(emptyNode.node);
	treeObj.research = true;
}    

/*
 *	删除树选中节点
 *	参数：	Element:treeObj         tree控件对象
			Array:exceptIds         例外的id
 *	返回值：
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
 *	将树选中节点添加到另一树中(注：过滤重复id节点，并且结果树只有一层结构)
 *	参数：	Element:fromTreeObj         树控件
			Element:toTreeObj           树控件
			Function:checkFunction      检测单个节点是否允许添加
 *	返回值：
 */
function addTreeNode(fromTreeObj, toTreeObj, checkFunction) {	
	var reload = false;
	var selectedNodes = fromTreeObj.getSelectedTreeNode(false);	
	for(var i=0; i < selectedNodes.length; i++) {
		var curNode = selectedNodes[i];

		if("0" == curNode.getAttribute("canselected")) {
			continue;  // 过滤不可选择的节点
		}

		curNode.setSelectedState(0, true, true);

		if( checkFunction ) {
			var result = checkFunction(curNode);
			if( result && result.error ) {
				// 显示错误信息
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
			// 至少有一行添加才刷新Tree
			reload = true;

			// 排除子节点
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
 *	检测是否有相同属性节点
 *	参数：	Element:treeObj         tree控件对象
			string:attrName         属性名
			string:attrValue        属性值
 *	返回值：
 */
function hasSameAttributeTreeNode(treeObj, attrName, attrValue) {
	var flag = new Boolean(false);
	var root = treeObj.getTreeNodeById("_rootId").node;
	var treeNode = root.selectSingleNode(".//treeNode[@" + attrName + "='" + attrValue + "']");
	if( treeNode ) {
		flag = new Boolean(true);
		flag.treeNode = treeNode;
	}
	return flag;
}

/*
 *	显示当前树节点信息
 */
function showTreeNodeStatus(params) {
	var treeObj = $T("tree");
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
 *	禁止点击按钮
 */
function disableButton(btObj) {
	btObj.disabled = true;
}
/*
 *	允许点击按钮：
 */
function enableButton(btObj) {
	btObj.disabled = false;
}
/*
 *	同步按钮禁止/允许状态
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
 *	初始化导航条
 *	参数：	string:curId       当前菜单项id
 */
function initNaviBar(curId) {	
	var isModule = (window.location.href.indexOf("module") > 0);
	var relativePath = isModule ? "../../" : "../";

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
 *	清除树节点操作权限
 *	参数：	xmlNode:treeNode                XmlNode实例
			boolean:clearChildren           是否清除子节点
 */
function clearOperation(treeNode, clearChildren) {
	treeNode.removeAttribute("_operation");

	if( clearChildren != false ) {
		var childs = treeNode.selectNodes(".//treeNode");
		for(var i=0; i < childs.length; i++) {
			childs[i].removeAttribute("_operation");
		}
	}
}