//////////////////////////////////////////////////////////////////
//	�������ƣ�Row	 												//
//	ְ��	����ҳ����tr��������ʾ�ڵ㡣							//
//			ֻҪ����һ��xml�ڵ㣬�˶����𽫽ڵ���ʾ����Ӧ��tr�С�		//
//////////////////////////////////////////////////////////////////

/*
 * ����˵������ʼ��Row����
 * ������	tr	tr��Dom����
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-23
 */
function instanceRow(tr) {
	return new Row(tr);
}
/*
 * ����˵������װ���ڵ���ʾ����Ļ�ϵ�һ��tr����
 * ������	tr	tr��Dom����
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-23
 */
function Row(tr) {

	this.row = tr;
	this.nobr = null;
	this.line = null;
	this.folder = null;
	this.icon = null;
	this.checkType = null;
	this.label = null;
	
	this.node = null;

	this.frontStr = null;
	this.checkTypeSrc = null;
	this.folderSrc = null;
	this.iconSrc = null;
	this.name = null;
	this.fullName = null;
	this.className = null;
	this.disabled = false;
}

Row.prototype = new function () {
	/*
	 * ����˵���������趨���xml�ڵ�
	 * ������	node	���ڵ��xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-23
	 */
	this.setXmlNode = function (node) {
		if(this.nobr == null){
			this.setInnerObj();
		}
		if(node == null){
			this.setClassName();
			this.nobr.removeNode(true);
			this.nobr = null;
			this.line = null;
			this.folder = null;
			this.icon = null;
			this.checkType = null;
			this.label = null;

			this.node = null;

			this.frontStr = null;
			this.checkTypeSrc = null;
			this.folderSrc = null;
			this.iconSrc = null;
			this.name = null;
			this.fullName = null;
			this.className = null;
			this.disabled = false;

			return;
		}
	    this.setLine(getFrontStr(this.row, node, treeObj.getXmlRoot()));
		this.setFolder(node);
		if(!treeObj.isMenu()){
			this.setCheckType(treeObj.getCheckTypeImageSrc(node));
		}

		//2006-4-6 �����Զ���ͼ��
		this.setIcon(node);

		this.setLabel(node);
		this.node = node;
	}
	/*
	 * ����˵������ȡ��ʾ�ڵ��xml����
	 * ������	
	 * ����ֵ��	xml�ڵ�
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.getXmlNode = function () {
	    return this.node;
	}
	/*
	 * ����˵������ȡҳ����ʾ���������Ӷ���
	 * ������
	 * ����ֵ��	a����
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.getLabel = function () {
	    return this.label;
	}
	/*
	 * ����˵������ȡҳ����ʾ��ѡ��״̬����
	 * ������
	 * ����ֵ��	img����
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.getCheckType = function () {
	    return this.checkType;
	}
	/*
	 * ����˵������ȡҳ����ʾ������״̬����
	 * ������
	 * ����ֵ��	img����
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.getFolder = function () {
	    return this.folder;
	}
	/*
	 * ����˵������ʼ����������ȡָ�����ڸ���������ӣ�
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-28
	 */
	this.setInnerObj = function () {
	    try{
			this.nobr = this.row.cells[0].firstChild;
			this.line = this.nobr.firstChild;
			this.folder = this.line.nextSibling;

			if(!treeObj.isMenu()){
				this.checkType = this.folder.nextSibling;
				//2006-4-6 �����Զ���ͼ��
				this.icon = this.checkType.nextSibling;
				this.label = this.icon.nextSibling;
			}else{
				//2006-4-6 �����Զ���ͼ��
				this.icon = this.folder.nextSibling;
				this.label = this.icon.nextSibling;
			}
		}catch(e){
			this.nobr = createObjByTagName("nobr");
			this.row.cells[0].appendChild(this.nobr);
			this.line = this.nobr.appendChild(createObjByTagName("span"));
			this.folder = this.nobr.appendChild(createObjByTagName("img", _TREE_NODE_FOLDER_STYLE_NAME));
			if(!treeObj.isMenu()){
				this.checkType = this.nobr.appendChild(createObjByTagName("img", _TREE_NODE_CHECK_TYPE_STYLE_NAME));
			}
			//2006-4-6 �����Զ���ͼ��
			this.icon = this.nobr.appendChild(createObjByTagName("img", _TREE_NODE_ICON_STYLE_NAME));
			this.label = this.nobr.appendChild(createObjByTagName("a"));
		}
	}
	/*
	 * ����˵����	�����Ʊ��
	 * ������	htmlStr	�Ʊ����HTML����
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-23
	 */
	this.setLine = function(htmlStr){
		if(this.frontStr == htmlStr){
			return;
		}
		this.line.innerHTML = htmlStr;
		this.frontStr = htmlStr;
	}
	/*
	 * ����˵������������ͼ��
	 * ������	node	���ڵ��xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-23
	 */
	this.setFolder = function(node){
		//2006-4-22 ���ֵ�һ�����ڵ�
		if(null!=node.parentNode && treeObj.getXmlRoot()==node.parentNode){//�ǵ�һ�����ڵ�
			if(node.hasChildNodes() || node.getAttribute("hasChild")=="1"){
				if(node.getAttribute("_open") == "true"){
					this.setFolderSrc(treeObj.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _TREE_ROOT_NODE_CONTRACT_IMAGE_SRC);
				}else{
					this.setFolderSrc(treeObj.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _TREE_ROOT_NODE_EXPAND_IMAGE_SRC);
				}
			}else{
				this.setFolderSrc(treeObj.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _TREE_ROOT_NODE_LEAF_IMAGE_SRC);
			}
		}else{
			if(node.hasChildNodes() || node.getAttribute("hasChild")=="1"){
				if(node.getAttribute("_open") == "true"){
					this.setFolderSrc(treeObj.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _TREE_NODE_CONTRACT_IMAGE_SRC);
				}else{
					this.setFolderSrc(treeObj.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _TREE_NODE_EXPAND_IMAGE_SRC);
				}
			}else{
				this.setFolderSrc(treeObj.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _TREE_NODE_LEAF_IMAGE_SRC);
			}		
		}
	}
	/*
	 * ����˵�����趨����ͼ��ĵ�ַ
	 * ������	src	ͼ��ĵ�ַ
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.setFolderSrc = function (src) {
	    if(this.folderSrc == src){
			return;
		}
		this.folder.src = src;
		this.folderSrc = src;
	}
	/*
	 * ����˵�����趨ѡ��״̬ͼ��
	 * ������	imgSrc	ͼ���ַ
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-23
	 */
	this.setCheckType = function(imgSrc){
		if(this.checkTypeSrc == imgSrc){
			return;
		}
		this.checkType.src = imgSrc;
		this.checkTypeSrc = imgSrc;
	}
	/*
	 * ����˵�����趨��������
	 * ������	node	xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-23
	 */
	this.setLabel = function(node){
		var name = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_NAME);
		var fullName = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_FULLNAME);
		var canSelected = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CANSELECTED);
		var display = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_DISPLAY);
		this.setName(name);
		if(fullName == null){
			fullName = name;
		}
		this.setTitle(fullName);
		this.setClassName(treeObj.getClassName(node));
		this.setAbled(canSelected, display);
	}
	/*
	 * ����˵�����趨�������ӵ��ı�����
	 * ������	name	��������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.setName = function (name){
		if(this.name == name){
			return;
		}
		this.label.innerText = name;
		this.name = name;
	}
	/*
	 * ����˵�����趨�������ӵ���ʾ��Ϣ
	 * ������	fullName	��ʾ��Ϣ
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.setTitle = function (fullName) {
		if(this.fullName == fullName){
			return;
		}
	    this.label.title = fullName;
		this.fullName = fullName;
	}
	/*
	 * ����˵�����趨�������ӵ���ʽ
	 * ������	className	�ڵ�����������ʽ��
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.setClassName = function (className) {		
		if(isNullOrEmpty(className)){
			this.row.className = "";
			this.label.removeAttribute("className");
		}else if(this.className == className){
			return;
		}else{
			this.row.className = className;
			this.label.className = className;
		}
		this.className = className;
	}
	/*
	 * ����˵�����趨���������Ƿ����
	 * ������	canSelected	�Ƿ����ѡ��	0/1
	 *			display	�Ƿ�������ʾ	0/1
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.setAbled = function (canSelected, display) {
		if(display == '0' || canSelected == '0'){
			if(this.disabled){
				return;
			}
			this.label.setAttribute("disabled", true);
			this.disabled = true;
		}else{
			if(!this.disabled){
				return;
			}
			this.label.setAttribute("disabled", false);
			this.disabled = false;
		}
	}
	/*
	 * ����˵���������Զ���ͼ��
	 * ������	node	���ڵ��xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�ë��
	 * ʱ�䣺2006-4-6
	 */
	this.setIcon = function(node){
		var iconSrc = node.getAttribute(_TREE_NODE_ICON_ATTRIBUTE);
		if(null!=iconSrc && ""!=iconSrc){
			this.setIconSrc(iconSrc);
			this.icon.width = _TREE_NODE_ICON_WIDTH;
			this.icon.height = _TREE_NODE_ICON_HEIGHT;
			this.icon.style.display = "";
		}else{
			this.icon.style.display = "none";
		}
	}
	/*
	 * ����˵������ȡҳ����ʾ��ͼ�����
	 * ������
	 * ����ֵ��	img����
	 * ���ߣ�ë��
	 * ʱ�䣺2007-5-28
	 */
	this.getIcon = function () {
	    return this.icon;
	}
	/*
	 * ����˵�����趨�Զ���ͼ��ĵ�ַ
	 * ������	src	ͼ��ĵ�ַ
	 * ����ֵ��
	 * ���ߣ�ë��
	 * ʱ�䣺2006-4-6
	 */
	this.setIconSrc = function (src) {
	    if(this.iconSrc == src){
			return;
		}
		this.icon.src = src;
		this.iconSrc = src;
	}

	/*
	 * ����˵������ȡ�ڵ�ǰ����Ʊ���ַ���
	 * ������	node	�ڵ�
	 *			rootNode	���ڵ�
	 * ����ֵ��	string	�Ʊ���ַ���
	 * ���ߣ�
	 * ʱ�䣺2004-6-7
	 */
	function getFrontStr(row, node, rootNode) {
		if(node.parentNode == rootNode){
			node.setAttribute("_childFrontStr", '');
			return '<span class="rootSpace"></span>';
		}
		var parentFrontStr = getParentFrontStr(row, node, rootNode);
		if(isLastChild(node)){
			node.setAttribute("_childFrontStr", parentFrontStr + '<span class="space"></span>');
			return parentFrontStr + '<span class="vHalfLine"></span>';
		}else{
			node.setAttribute("_childFrontStr", parentFrontStr + '<span class="onlyVLine"></span>');
			return parentFrontStr + '<span class="vline"></span>';
		}
	}
	/*
	 * ����˵������ȡ���ڵ�ǰ����Ʊ���ַ���
	 * ������	node	�ڵ�
	 *			rootNode	���ڵ�
	 * ����ֵ��	string	�Ʊ���ַ���
	 * ���ߣ�
	 * ʱ�䣺2004-7-5
	 */
	function getParentFrontStr(row, node, rootNode) {
		if(isFirstLine(row) || node.parentNode.getAttribute("_childFrontStr") == null){
			getFrontStr(row, node.parentNode, rootNode);
		}
		return node.parentNode.getAttribute("_childFrontStr");
	}
	/*
	 * ����˵��������ҳ����ʾ��Ԫ��
	 * ������	name	��������(Сд)
	 *			className	��ʽ������
	 * ����ֵ��ҳ��Ԫ�ض���
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-23
	 */
	function createObjByTagName(name, className) {
   		var obj = window.document.createElement(name);
		if(className != null){
			obj.setAttribute("className", className);
		}
		if(name == "a"){
			obj.setAttribute("hideFocus", "1");
			obj.setAttribute("href", "");
		}
		return obj;
	}
	this.test = function(name){
		return eval(name);
	}
}