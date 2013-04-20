//////////////////////////////////////////////////////////////////
//	�������ƣ�Tree												//
//	ְ��	��������������������Ĳ�֮ͬ����ͬʱ��¼����ȫ�ֱ�����	//
//////////////////////////////////////////////////////////////////

/*
 * ����˵������ʼ��������
 * ������
 * ����ֵ��	Tree����
 * ���ߣ�scq
 * ʱ�䣺2004-6-24
 */
function instanceTree() {
	var type = getValue(_TREE_ATTRIBUTE_TREE_TYPE, _TREE_TYPE_SINGLE);
	treeObj = new Tree();
	if(type == _TREE_TYPE_MULTI){
		treeObj.setAttribute(_TREE_ATTRIBUTE_TREE_TYPE, _TREE_TYPE_MULTI);
		treeObj.setAttribute(_TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE, getValue(_TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE, _TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE_MULTI_DEFAULT_VALUE));
		//��ȡ��һ��ѡ��״̬
		treeObj.getNextState = multiGetNextState;
		//��ȡѡ��״̬ͼ�꣨��ѡ����
		treeObj.getCheckTypeImageSrc = getMultiCheckTypes;
		//�����ض��Ľڵ�ˢ�����нڵ��ѡ��״̬
		treeObj.refreshStates = multiRefreshStates;
		//��ȡѡ�нڵ�TreeNode��������
		treeObj.getSelectedTreeNode = multiGetSelectedTreeNode;
		//��ȡѡ�нڵ�Xml��������
		treeObj.getSelectedXmlNode = multiGetSelectedXmlNode;
	}else{
		treeObj.setAttribute(_TREE_ATTRIBUTE_TREE_TYPE, _TREE_TYPE_SINGLE);
		treeObj.setAttribute(_TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE, getValue(_TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE, _TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE_SINGLE_DEFAULT_VALUE));
		//��ȡ��һ��ѡ��״̬
		treeObj.getNextState = singleGetNextState;
		//��ȡѡ��״̬ͼ�꣨��ѡ����
		treeObj.getCheckTypeImageSrc = getSingleCheckTypes;
		//��������ڵ��ѡ��״̬
		treeObj.refreshStates = clearOtherSelectedState;
		//��ȡѡ�нڵ��TreeNode����
		treeObj.getSelectedTreeNode = singleGetSelectedTreeNode;
		//��ȡѡ�нڵ��Xml����
		treeObj.getSelectedXmlNode = singleGetSelectedXmlNode;
	}
	if(type == _TREE_TYPE_MENU){
		treeObj.isMenu = function(){
			return true;
		}
	}else{
		treeObj.isMenu = function(){
			return false;
		}
	}
}
/*
 * ����˵���������󣬴������ڿؼ�������ͬ������Ĳ�֮ͬ��
 * ������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-24
 */
function Tree() {
	var _baseUrl = getValue(_TREE_ATTRIBUTE_BASE_URL, _TREE_ATTRIBUTE_BASE_URL_DEFAULT_VALUE);
	var _treeType = getValue(_TREE_ATTRIBUTE_TREE_TYPE, _TREE_ATTRIBUTE_TREE_TYPE_DEFAULT_VALUE);
	var _src = getValue(_TREE_ATTRIBUTE_SRC, _TREE_ATTRIBUTE_SRC_DEFAULT_VALUE);
	var _selectedSrc = getValue(_TREE_ATTRIBUTE_SELECTED_SRC, _TREE_ATTRIBUTE_SELECTED_SRC_DEFAULT_VALUE);
	var _selectedIds = getValue(_TREE_ATTRIBUTE_SELECTED_IDS, _TREE_ATTRIBUTE_SELECTED_IDS_DEFAULT_VALUE);
	var _canMoveNode = getValue(_TREE_ATTRIBUTE_CAN_MOVE_NODE, _TREE_ATTRIBUTE_CAN_MOVE_NODE_DEFAULT_VALUE);
	var _treeNodeSelectedChangeState = "false";
	var _treeNodeClickOpenNode = getValue(_TREE_ATTRIBUTE_OPEN_WITH_CLICK, _TREE_ATTRIBUTE_OPEN_WITH_CLICK_DEFAULT_VALUE);
	var _allCheckTypeDisabled = getValue(_TREE_ATTRIBUTE_DISABLED_ALL_CHECKTYPE, _TREE_ATTRIBUTE_DISABLED_ALL_CHECKTYPE_DEFAULT_VALUE);
	var _justSelectSelf = 	getValue(_TREE_ATTRIBUTE_JUST_SELECT_SELF, _TREE_ATTRIBUTE_JUST_SELECT_SELF_DEFAULT_VALUE);
	var _focusNewNode = getValue(_TREE_ATTRIBUTE_FOCUS_NEW_TREE_NODE, _TREE_ATTRIBUTE_FOCUS_NEW_TREE_NODE_DEFAULT_VALUE);
	var _defaultOpen = getValue(_TREE_ATTRIBUTE_DEFAULT_OPEN, _TREE_ATTRIBUTE_DEFAULT_OPEN_DEFAULT_VALUE);
	var _defaultActive = getValue(_TREE_ATTRIBUTE_DEFAULT_ACTIVE, _TREE_ATTRIBUTE_DEFAULT_ACTIVE_DEFAULT_VALUE);
	var _activedNode = null;
	var _movedNode = null;
	var _xmlRoot = null;
	var _scrollTimer = null;
	var _findedNode = null;
	/*
	 * ����˵����	 �趨�ؼ������ݣ�������ԴΪxml�ڵ㡢���ݵ��������ļ���xml�ַ���
	 * ������	dataSrc	����Դ
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-25
	 */
	this.loadData = function (dataSrc){
		if(isNullOrEmpty(dataSrc)){
			dataSrc = _src;
		}
		var ds = new DataSource(dataSrc);
		_xmlRoot = ds.xmlRoot;
		if(_defaultOpen == "true"){
			openNode(getDefaultOpenedNode(_xmlRoot));
		}
	}

	/*
	 * ����˵����	 ��ȡĬ��ѡ��״̬���ݣ�xml�ڵ㡢���ݵ��������ļ���xml�ַ���
	 * ������	selectedSrc	�ڵ�ѡ��״̬������Դ
	 *			isClearOldSelected	�Ƿ����ԭ��ѡ�нڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-12-23
	 */
	this.loadSelectedData = function (selectedSrc, isClearOldSelected) {
		if(_xmlRoot == null){
			return;
		}
		if(isNullOrEmpty(selectedSrc)){
			selectedSrc = _selectedSrc;
		}
		var ds = new DataSource(selectedSrc);
		if(treeObj.getAttribute(_TREE_ATTRIBUTE_TREE_TYPE) == _TREE_TYPE_SINGLE){	//��ѡ��
			singleCheckedDefault(_xmlRoot, ds.xmlRoot);
		}else{
			multiCheckedDefault(_xmlRoot, ds.xmlRoot, isClearOldSelected);
		}
	}
	
	/*
	 * ����˵����	 ��ȡĬ��ѡ��״̬���ݣ�id�ַ�������id֮����","����
	 * ������	selectedIds	�ڵ�ѡ��״̬��Id�ַ���
	 *			isClearOldSelected	�Ƿ����ԭ��ѡ�нڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-4-19
	 */
	this.loadSelectedDataByIds = function (selectedIds, isClearOldSelected, isDependParent){
		if(_xmlRoot == null){
			return;
		}
		if(isNullOrEmpty(selectedIds)){
			selectedIds = _selectedIds;
		}
		if(treeObj.getAttribute(_TREE_ATTRIBUTE_TREE_TYPE) == _TREE_TYPE_SINGLE){	//��ѡ��
			if(selectedIds == null){
				return;
			}
			eval("var selectedIds = '" + selectedIds + "';");
			var node = _xmlRoot.selectSingleNode("//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='"+selectedIds+"']");
			var treeNode = instanceTreeNode(node);
			if(treeNode != null){
				treeNode.setSelectedState(1, false, true);
				treeNode.focus();
			}
		}else{
			multiCheckedDefaultByIds(_xmlRoot, selectedIds, isClearOldSelected, isDependParent);
		}
	}

	/*
	 * ����˵��������Ĭ�ϼ���ڵ�
	 * ������	type	Ĭ�ϼ�������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-11-17
	 */
	this.setDefaultActive = function (type) {
		if(isNullOrEmpty(type)){
			type = _defaultActive;
		}
		if(_xmlRoot == null || type == "none"){
			return;
		}
		var activeNode = null;
		if(type == "root"){
			activeNode = _xmlRoot.selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='" + _TREE_XML_ROOT_TREE_NODE_ID + "']");
		}else if(type == "valid"){
			activeNode = _xmlRoot.selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[(@" + _TREE_XML_NODE_ATTRIBUTE_CANSELECTED + "!='0' or not(@" + _TREE_XML_NODE_ATTRIBUTE_CANSELECTED + ")) and @" + _TREE_XML_NODE_ATTRIBUTE_ID + "!='" + _TREE_XML_ROOT_TREE_NODE_ID + "']");
		}
		var treeNode = instanceTreeNode(activeNode);
		if(treeNode != null){
			treeNode.setActive();
			treeNode.focus();
		}
	}

	/*
	 * ����˵������ȡ���ݵĸ��ڵ�
	 * ������
	 * ����ֵ��	xml�ڵ�
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-25
	 */
	this.getXmlRoot = function () {
		if(_xmlRoot == null){
			var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
			xmlDom.async = false;
			if (xmlDom.loadXML("<actionSet/>")){	
				return xmlDom.documentElement;
			}
		}
		return _xmlRoot;
	}
	/*
	 * ����˵�����趨��ǰ����������Ľڵ�
	 * ������	treeNode	TreeNode�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-24
	 */
	this.setActiveNode = function (treeNode) {
	    _activedNode = treeNode.getXmlNode();
	}
	/*
	 * ����˵���������������ã�����ڵ����ֱ�ǩʱ�Ƿ�ı�ڵ�ѡ��״̬
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-10-27
	 */
	this.isSelectByActived = function (){
		return _treeNodeSelectedChangeState == "true";
	}

	/*
	 * ����˵���������������ã�����ڵ����ֱ�ǩʱ�Ƿ�ı�ڵ�����״̬
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-10-27
	 */
	this.isChangeFolderStateByClickLabel = function (){
		return _treeNodeClickOpenNode == "true";
	}
	/*
	 * ����˵������ȡ��ǰ����������Ľڵ�
	 * ������
	 * ����ֵ��	TreeNode����
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-30
	 */
	this.getActiveNode = function () {
	    return instanceTreeNode(_activedNode);
	}
	/*
	 * ����˵�����趨��������ֵ
	 * ������	name	������
	 *			value	����ֵ
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-24
	 */
	this.setAttribute = function (name, value) {
	    switch (name) {
	        case _TREE_ATTRIBUTE_BASE_URL:
				_baseUrl = value;
	            break;
	        case _TREE_ATTRIBUTE_TREE_TYPE:
				_treeType = value;
	            break;
	        case _TREE_ATTRIBUTE_SRC:
				_src = value;
	            break;
	        case _TREE_ATTRIBUTE_CAN_MOVE_NODE:
				_canMoveNode = value;
	            break;
	        case _TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE:
				_treeNodeSelectedChangeState = value;
	            break;
	        case _TREE_ATTRIBUTE_OPEN_WITH_CLICK:
				_treeNodeClickOpenNode = value;
	            break;
	        case _TREE_ATTRIBUTE_DISABLED_ALL_CHECKTYPE:
				_allCheckTypeDisabled = value;
	            break;
	        case _TREE_ATTRIBUTE_JUST_SELECT_SELF:
				_justSelectSelf = value;
	            break;
	        default :
				alert("Tree����û������[" + name + "]!");
	    }
	}
	/*
	 * ����˵������ȡ��������
	 * ������	name	��������
	 * ����ֵ��	����ֵ
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-24
	 */
	this.getAttribute = function (name) {
	    switch (name) {
	        case _TREE_ATTRIBUTE_BASE_URL:
				return _baseUrl;
	        case _TREE_ATTRIBUTE_TREE_TYPE:
				return _treeType;
	        case _TREE_ATTRIBUTE_SRC:
				return _src;
	        case _TREE_ATTRIBUTE_CAN_MOVE_NODE:
				return _canMoveNode;
	        case _TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE:
				return _treeNodeSelectedChangeState;
	        case _TREE_ATTRIBUTE_OPEN_WITH_CLICK:
				return _treeNodeClickOpenNode;
	        case _TREE_ATTRIBUTE_DISABLED_ALL_CHECKTYPE:
				return _allCheckTypeDisabled;
	        case _TREE_ATTRIBUTE_JUST_SELECT_SELF:
				return _justSelectSelf;
	        default :
				alert("Tree����û������[" + name + "]!");
	    }
	}
	/*
	 * ����˵�������ݽڵ㲻ͬ��checkType����ֵ��ȡѡ��״̬ͼ��ĵ�ַ
	 * ������	node	xml�ڵ�
	 * ����ֵ��	String	ͼ���ַ
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-24
	 */
	this.getCheckTypeImageSrc = function (node) {
	    alert("Tree���󣺴˷���[getCheckTypeImageSrc]��δ��ʼ����");
	}
	/*
	 * ����˵�����жϽڵ��Ƿ���������
	 * ������	node	xml�ڵ�
	 * ����ֵ��	true/false
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.isActiveNode = function (node) {
	    return _activedNode == node;
	}
	/*
	 * ����˵�����жϽڵ��Ƿ�Ϊ���϶��Ľڵ�
	 * ������	node	xml�ڵ�
	 * ����ֵ��	true/false
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-30
	 */
	this.isMovedNode = function (node) {
	    return _movedNode == node;
	}
	/*
	 * ����˵�����жϽڵ��Ƿ�Ϊ��ѡ����ڵ�
	 * ������	node	xml�ڵ�
	 * ����ֵ��	true/false
	 * ���ߣ�scq
	 * ʱ�䣺2006-1-9
	 */
	this.isFindedNode = function (node) {
	    return _findedNode == node;
	}
	/*
	 * ����˵������ȡ�ڵ��������ӵ���ʽ��
	 * ������	node	xml�ڵ�
	 * ����ֵ��	String	��ʽ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-30
	 */
	this.getClassName = function (node, defaultClassName) {
		if(this.isMovedNode(node)){
			return _TREE_NODE_MOVED_STYLE_NAME;
		}else if(this.isActiveNode(node)){
			return _TREE_NODE_SELECTED_STYLE_NAME;
		}else if(this.isFindedNode(node)){
			return _TREE_NODE_FINDED_STYLE_NAME;
		}
		if(isNullOrEmpty(defaultClassName)){
			return null;
		}
		return defaultClassName;
	}
	/*
	 * ����˵�����ڵ㱻ѡ��ʱ�Ƿ���Ҫ����������ڵ�
	 * ������state	�ڵ�ѡ��״̬
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-7-1
	 */
	this.isActiveBySelected = function (state) {
		return _treeNodeSelectedChangeState == "true" && state == 1;
	}
	/*
	 * ����˵�����趨���϶��Ľڵ�
	 * ������	node	xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-30
	 */
	this.setMovedNode = function (node) {
	    _movedNode = node;
	}
	/*
	 * ����˵������ȡ�ڵ����һ��ѡ��״̬
	 * ������	treeNode	TreeNode�ڵ����
	 * ����ֵ��	0/1	��ѡ��/ѡ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-28
	 */
	this.getNextState = function (treeNode) {
		alert("Tree���󣺴˷���[getNextState]��δ��ʼ����");
	}
	/*
	 * ����˵���������ض��Ľڵ㣬ˢ�����нڵ��ѡ��״̬
	 * ������	node	xml�ڵ����
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-28
	 */
	this.refreshStates = function (node) {
		alert("Tree���󣺴˷���[refreshStates]��δ��ʼ����");
	}
	/*
	 * ����˵�������Ƿ�����ƶ��ڵ�
	 * ������
	 * ����ֵ��	true/false
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.isCanMoveNode = function () {
	    return _canMoveNode == "true";
	}
	/*
	 * ����˵�������Ƿ��ֹ�ı����е�ѡ��״̬
	 * ������
	 * ����ֵ��	true/false
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.isAllDisabledCheckType = function () {
	    return _allCheckTypeDisabled == "true";
	}
	/*
	 * ����˵������ȡѡ�еĽڵ��TreeNode��������
	 * ������	hasHalfChecked	�Ƿ������ѡ�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-30
	 */
	this.getSelectedTreeNode = function (hasHalfChecked) {
	    alert("Tree���󣺴˷���[getSelectedTreeNode]��δ��ʼ����");
	}
	/*
	 * ����˵������ֹ���нڵ�ı�ѡ��״̬
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-10-29
	 */
	this.disable = function (){
		_allCheckTypeDisabled = "true";
	}
	/*
	 * ����˵��������û�б�����ָ������ѡ�еĽڵ�ı�ѡ��״̬
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-10-29
	 */
	this.enable = function (){
		_allCheckTypeDisabled = "false";
	}
	/*
	 * ����˵���������ڵ���Ƿ���Ҫ�������Ƶ��½ڵ���
	 * ������
	 * ����ֵ��	true	��Ҫ�Ƶ��½ڵ���
	 *			false	����Ҫ�Ƶ��½ڵ���
	 * ���ߣ�scq
	 * ʱ�䣺2005-11-17
	 */
	this.isFocusNewTreeNode = function(){
		return _focusNewNode == "true";
	}

	/*
	 * ����˵�����趨��ѯ����еĵ�ǰ�ڵ�Ϊ���������ʾ
	 * ������	node	xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-7-2
	 */
	this.setFindedNode = function (node) {
	    _findedNode = node;
	}
	this.test = function(name){
		return eval(name);
	}
}
/*
 * ����˵������ȡ�����Ĭ�ϴ򿪽ڵ�
 * ������	xmlRoot	xml����
 * ����ֵ��Ĭ�ϴ򿪵�xml�ڵ�
 * ���ߣ�scq
 * ʱ�䣺2004-6-11
 */
function getDefaultOpenedNode(xmlRoot) {
	if(xmlRoot == null){
		return;
	}
	var actionSetNode = xmlRoot;
	var openedNodeId = actionSetNode.getAttribute(_TREE_XML_NODE_ATTRIBUTE_DEFAULT_OPENED_NODE_ID);
	var openedNode = null;
	if(!isNullOrEmpty(openedNodeId)){
		openedNode = actionSetNode.selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='"+openedNodeId+"']");
	}
	if(isNullOrEmpty(openedNode)){
		openedNode = actionSetNode.selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CANSELECTED + "!='0' or not(@" + _TREE_XML_NODE_ATTRIBUTE_CANSELECTED + ")]");
	}
	return isNullOrEmpty(openedNode)?actionSetNode.firstChild:openedNode;
}
/*
 * ����˵������ȡ�ؼ�����
 * ������	name	������
 *			defaultValue	Ĭ��ֵ
 * ����ֵ��	String	����ֵ
 * ���ߣ�scq
 * ʱ�䣺2004-6-11
 */
function getValue(name, defaultValue) {
	var value = eval("element." + name);
    if(value == null){
		return defaultValue;
	}
	return value;
}

/*
 * ����˵�������ݸ����ڵ��ѡ��״̬��ѡ��Ĭ�Ͻڵ㣨��ѡ��������xml�ڵ㣩
 * ������	node	��Ҫ����Ĭ��ѡ��״̬�����ݽڵ�
 *			defaltCheckedNode	Ĭ��ѡ��״̬�����ݽڵ�
 *			isClearOldSelected	�Ƿ����ԭ��ѡ�нڵ�
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2004-12-23
 */
function multiCheckedDefault(node, defaultCheckedNode, isClearOldSelected) {
	if(node == null){
		return;
	}
	if(isClearOldSelected){
		clearSelected(node);
	}
	if(defaultCheckedNode == null){
		return;
	}
	if (treeObj.getAttribute(_TREE_ATTRIBUTE_JUST_SELECT_SELF) == "true"){
		multiCheckedDefaultOnlySelf(node, defaultCheckedNode);
	}else{
		multiCheckedDefaultWithOther(node, defaultCheckedNode);
	}
}
/*
 * ����˵�������ݸ����ڵ��ѡ��״̬��ѡ��Ĭ�Ͻڵ㣨��ѡ��������Id�ַ�����
 * ������	node	��Ҫ����Ĭ��ѡ��״̬�����ݽڵ�
 *			defaltCheckedIds	Ĭ��ѡ��״̬�����ݽڵ�
 *			isClearOldSelected	�Ƿ����ԭ��ѡ�нڵ�
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2005-4-19
 */
function multiCheckedDefaultByIds(node, defaltCheckedIds, isClearOldSelected, isDependParent) {
	if(node == null){
		return;
	}
	if(isClearOldSelected){
		clearSelected(node);
	}
	if(defaltCheckedIds == null || defaltCheckedIds == ""){
		return;
	}
	if (treeObj.getAttribute(_TREE_ATTRIBUTE_JUST_SELECT_SELF) == "true"){
		multiCheckedDefaultByIdsOnlySelf(node, defaltCheckedIds);
	}else{
		multiCheckedDefaultByIdsWithOther(node, defaltCheckedIds, isDependParent);
	}
}

/*
 * ����˵����ȥ������ѡ�нڵ��ѡ��״̬
 * ������	node	��Ҫ����ȥ�����нڵ�ѡ��״̬�����ݽڵ�
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2005-9-24
 */
function clearSelected(node){
	var nodes = node.selectNodes(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1' or @" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='2']");
	for(var i = 0; i < nodes.length; i++){
		setNodeState(nodes[i], 0);
	}
}

/*
 * ����˵�������ݸ����ڵ��ѡ��״̬��ѡ��Ĭ�Ͻڵ㣨��ѡ����
 * ������	node	��Ҫ����Ĭ��ѡ��״̬�����ݽڵ�
 *			defaltCheckedNode	Ĭ��ѡ��״̬�����ݽڵ�
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2005-4-19
 */
function singleCheckedDefault(node, defaultCheckedNode) {
	if(defaultCheckedNode == null || node == null){
		return;
	}
	var checkedNode = defaultCheckedNode.selectSingleNode("//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']");
	if(checkedNode == null){
		return;
	}
	var fNodeId = checkedNode.getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID);
	var xpath = "//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='" + fNodeId + "']";
	var fNode = node.selectSingleNode(xpath);
	var treeNode = instanceTreeNode(fNode);
	if(treeNode != null){
		treeNode.changeSelectedState(false, true);
		treeNode.focus();
	}
}

/*
 * ����˵�������ݸ����ڵ��ѡ��״̬��ѡ��Ĭ�Ͻڵ� (��ѡ����ѡ�ڵ�ʱ�����Ǹ��ӹ�ϵ)
 * ������	node	��Ҫ����Ĭ��ѡ��״̬�����ݽڵ�
 *			defaltCheckedNode	Ĭ��ѡ��״̬�����ݽڵ�
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2004-12-23
 */
function multiCheckedDefaultOnlySelf(node, defaultCheckedNode) {
	if(node == null || defaultCheckedNode == null){
		return;
	}
	var checkedNodes = defaultCheckedNode.selectNodes("//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']");
	for(var i = 0; i < checkedNodes.length; i++){
		var fNodeId = checkedNodes[i].getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID);
		var xpath = "//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='" + fNodeId + "']";
		var fNode = node.selectSingleNode(xpath);
		setNodeState(fNode, 1);
		openNode(fNode);
	}
}
/*
 * ����˵�������ݸ����ڵ��ѡ��״̬��ѡ��Ĭ�Ͻڵ� (��ѡ����ѡ�ڵ�ʱ���Ǹ��ӹ�ϵ)
 * ������	node	��Ҫ����Ĭ��ѡ��״̬�����ݽڵ�
 *			defaltCheckedNode	Ĭ��ѡ��״̬�����ݽڵ�
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2004-12-23
 */
function multiCheckedDefaultWithOther(node, defaultCheckedNode) {
	if(node == null || defaultCheckedNode == null){
		return;
	}
	var checkedNodes = defaultCheckedNode.selectNodes("//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1' && ..[not(@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1') || not(@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + ")]]");
	for(var i = 0; i < checkedNodes.length; i++){
		var fNodeId = checkedNodes[i].getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID);
		var xpath = "//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='" + fNodeId + "']";
		var fNode = node.selectSingleNode(xpath);
		if(fNode != null){
			setNodeState(fNode, 1);
			refreshParentNodeState(fNode);
			refreshChildrenNodeState(fNode);
		}
	}
}
/*
 * ����˵�������ݸ����ڵ��ѡ��״̬��ѡ��Ĭ�Ͻڵ� (��ѡ����ѡ�ڵ�ʱ�����Ǹ��ӹ�ϵ)
 * ������	node	��Ҫ����Ĭ��ѡ��״̬�����ݽڵ�
 *			defaltCheckedIds	Ĭ��ѡ��״̬�����ݽڵ�id�ַ���
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2004-12-23
 */
function multiCheckedDefaultByIdsOnlySelf(node, defaltCheckedIds) {
	if(node == null || defaltCheckedIds == null){
		return;
	}
	var checkedNodeIds = defaltCheckedIds.split(',');
	for(var i = 0; i < checkedNodeIds.length; i++){
		var xpath = "//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='" + checkedNodeIds[i] + "']";
		var fNode = node.selectSingleNode(xpath);
		if(fNode != null){
			setNodeState(fNode, 1);
			openNode(fNode);
		}
	}
}

/*
 * ����˵�������ݸ����ڵ��ѡ��״̬��ѡ��Ĭ�Ͻڵ� (��ѡ����ѡ�ڵ�ʱ���Ǹ��ӹ�ϵ)
 * ������	node	��Ҫ����Ĭ��ѡ��״̬�����ݽڵ�
 *			defaltCheckedIds	Ĭ��ѡ��״̬�����ݽڵ�id�ַ���
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2004-12-23
 */
function multiCheckedDefaultByIdsWithOther(node, defaltCheckedIds, isDependParent) {
	if(node == null || defaltCheckedIds == null){
		return;
	}
	var checkedNodeIds = defaltCheckedIds.split(',');
	for(var i = 0; i < checkedNodeIds.length; i++){
		var xpath = "//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='" + checkedNodeIds[i] + "']";
		var fNode = node.selectSingleNode(xpath);
		if(fNode != null){
			setNodeState(fNode, 1);

            //������ݣ�������ȫ���ӽڵ�Ϊѡ��
            if(true==isDependParent){
                var xpath = ".//" + _TREE_XML_NODE_NAME;
                var subnodes = fNode.selectNodes(xpath);
                for(var j = 0; j < subnodes.length; j++){
                    setNodeState(subnodes[j], 1);
                }
            
            }
		}
	}
	//��ǰ���ѡ�нڵ�����и��ڵ�Ϊѡ��
	var xpath = "//" + _TREE_XML_NODE_NAME + "[not(@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + " and @" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + " = '1') and .//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + " = '1']]";
	var nodes = node.selectNodes(xpath);
	for(var i = 0; i < nodes.length; i++){
		setNodeState(nodes[i], 1);
	}
	//�������ȫѡ�ڵ��а���δȫѡ�ڵ�Ľڵ�Ϊ��ѡ
	var nodes = node.selectNodes("//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + " = '1' and .//" + _TREE_XML_NODE_NAME + "[not(@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + " = '1') || not(@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + ")]]");
	for(var i = 0; i < nodes.length; i++){
		setNodeState(nodes[i], 2);
	}
}
/*
 * ����˵����ˢ����ؽڵ��ѡ��״̬����ѡ������ͬʱ���ݲ��������Ƿ񼤻ǰ�ڵ�
 * ������	treeNode	TreeNode�ڵ����
 *			noChildren	ѡ�нڵ�ʱ���������ӽڵ�
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-29
 */
function multiRefreshStates(treeNode, noChildren) {
	if (treeObj.getAttribute(_TREE_ATTRIBUTE_JUST_SELECT_SELF) == "true"){
		return;
	}
	refreshParentNodeState(treeNode.getXmlNode());

	if(noChildren && treeNode.getSelectedState() == 2){
		return;
	}
	refreshChildrenNodeState(treeNode.getXmlNode());
}
/*
 * ����˵����ˢ�����и��ڵ��ѡ��״̬
 * ������	tempNode	xml�ڵ�
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-28
 */
function refreshParentNodeState(tempNode) {
	tempNode = tempNode.parentNode;
	while(tempNode != treeObj.getXmlRoot()){
		setNodeState(tempNode, getChildsNodeState(tempNode));
		tempNode = tempNode.parentNode;
	}
}
/*
 * ����˵������ȡ֦�ڵ��ѡ��״̬
 * ������	node	xml�ڵ�
 * ����ֵ��	0/1/2	��ѡ/ѡ��/��ѡ
 * ���ߣ�scq
 * ʱ�䣺2004-6-28
 */
function getChildsNodeState(node) {
	var nodeChildNum = node.childNodes.length;	//�����ӽڵ���
	var nodeCheckedChildNum = node.selectNodes("./" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']").length;	//ȫѡ�ӽڵ���
	var nodeHalfCheckedChildNum = node.selectNodes("./" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='2']").length;	//��ѡ�ӽڵ���
	if(nodeCheckedChildNum == 0 && nodeHalfCheckedChildNum == 0){	
		return 0;		//�����ӽڵ㶼û��ѡ�У����δѡ��
	}else if(nodeChildNum == nodeCheckedChildNum){
		return 1;		//�����ӽڵ㶼��ȫѡ�����ȫѡ
	}
	return 2;
}
/*
 * ����˵����ˢ�������ӽڵ�
 * ������	node	xml�ڵ����
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-28
 */
function refreshChildrenNodeState(node) {
	var childNodes = node.selectNodes(".//" + _TREE_XML_NODE_NAME);
	for(var i = 0, len = childNodes.length; i < len; i++){
		setNodeState(childNodes[i], node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CHECKTYPE));
	}
}

/*
 * ����˵�������ݽڵ�ѡ��״̬����ȡͼ���ַ����ѡ����
 * ������	node	xml�ڵ�
 * ����ֵ��	String	ͼ���ַ
 * ���ߣ�scq
 * ʱ�䣺2004-6-29
 */
function getMultiCheckTypes(node) {
	var checkType = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CHECKTYPE);
	var canSelected = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CANSELECTED);
	if(canSelected == 0){
		return this.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _MULTI_CAN_NOT_CHECK_IMAGE_SRC;
	}
	if(checkType == 1) {
		return this.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _MULTI_CHECKED_IMAGE_SRC;
	}
	if(checkType == 2){
		return this.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _MULTI_HALF_CHECKED_IMAGE_SRC;
	}
	return this.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _MULTI_NO_CHECKED_IMAGE_SRC;
}
/*
 * ����˵�������ݽڵ�ѡ��״̬����ȡͼ���ַ����ѡ����
 * ������	node	xml�ڵ�
 * ����ֵ��	String	ͼ���ַ
 * ���ߣ�scq
 * ʱ�䣺2004-6-29
 */
function getSingleCheckTypes(node) {
	var checkType = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CHECKTYPE);
	var canSelected = node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CANSELECTED);
	if(canSelected == 0){
		return this.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _SINGLE_CAN_NOT_SELECT_IMAGE_SRC;
	}
	if(checkType == 1) {
		return this.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _SINGLE_SELECTED_IMAGE_SRC;
	}
	return this.getAttribute(_TREE_ATTRIBUTE_BASE_URL) + _SINGLE_NO_SELECTED_IMAGE_SRC;
}
/*
 * ����˵��������ض��ڵ�����������ڵ��ѡ��״̬
 * ������	treeNode	TreeNode�ڵ����
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-29
 */
function clearOtherSelectedState(treeNode) {
	var childNodes = this.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']");
	for(var i = 0, len = childNodes.length; i < len; i++){
		if(childNodes[i] == treeNode.getXmlNode()){
			continue;
		}
		setNodeState(childNodes[i], "0");
	}
}
/*
 * ����˵������ȡѡ�нڵ��Xml�������飨��ѡ����
 * ������	hasHalfChecked	�Ƿ������ѡ�ڵ�
 * ����ֵ��	Xml��������
 * ���ߣ�scq
 * ʱ�䣺2005-8-22
 */
function multiGetSelectedXmlNode(hasHalfChecked) {
	var xmlNodeArray = new Array();
	var xmlNodes = null;
	if(hasHalfChecked != false){	//������ѡ״̬
		xmlNodes = this.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1' or @" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='2']");
	}else{	//��������ѡ״̬
		xmlNodes = this.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']");
	}
	for(var i = 0; i < xmlNodes.length; i++){
		xmlNodeArray[i] = xmlNodes[i];
	}
	try{
		xmlNodeArray.rootNode = this.getXmlRoot().cloneNode(false);	//��ȡactionSet�ڵ�
	}catch(e){
		alert("�ؼ����ݴ���xml���ܽ�����");
		throw(e);
	}
	xmlNodeArray.hasHalfChecked = hasHalfChecked;
	//�������ṩtoElement���������ݲ�ͬ���Ƿ������ѡ״̬���ֱ��Բ�ͬ�ķ�ʽ����xml�ڵ㡣
	xmlNodeArray.toElement = xmlNodesToXmlNode;
	return xmlNodeArray;
}

/*
 * ����˵�������ݲ�ͬ���Ƿ������ѡ״̬���ֱ��Բ�ͬ�ķ�ʽ����xml�ڵ㡣
 * ������
 * ����ֵ��	xml�ڵ�
 * ���ߣ�scq
 * ʱ�䣺2005-8-22
 */
function xmlNodesToXmlNode() {
	for(var i = 0, len = this.length; i < len; i++){
		if(this[i] == null){
			continue;
		}
		var parentNode = null;
		if(this.hasHalfChecked != false){	//������ѡ״̬������ԭ�нڵ��ι�ϵ����xml
			parentNode = this.rootNode.selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='"+this[i].parentNode.getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID)+"']");
		}
		if (parentNode == null){
			parentNode = this.rootNode;
		}
		parentNode.appendChild(this[i].cloneNode(false));
	}
	return this.rootNode;
}

/*
 * ����˵������ȡѡ�нڵ��TreeNode�������飨��ѡ����
 * ������	hasHalfChecked	�Ƿ������ѡ�ڵ�
 * ����ֵ��	TreeNode��������
 * ���ߣ�scq
 * ʱ�䣺2004-6-29
 */
function multiGetSelectedTreeNode(hasHalfChecked) {
	var treeNodeArray = new Array();	
	var treeNodes = null;
	if(hasHalfChecked != false){	//������ѡ״̬
		treeNodes = this.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1' or @" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='2']");
	}else{	//��������ѡ״̬
		treeNodes = this.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']");
	}
	//���ɷ��صĶ�������
	for(var i = 0, len = treeNodes.length; i < len; i++){
		treeNodeArray[i] = instanceTreeNode(treeNodes[i]);
	}
	try{
		treeNodeArray.rootNode = this.getXmlRoot().cloneNode(false);	//��ȡactionSet�ڵ�
	}catch(e){
		alert("�ؼ����ݴ���xml���ܽ�����");
		throw(e);
	}
	treeNodeArray.hasHalfChecked = hasHalfChecked;
	//�������ṩtoElement���������ݲ�ͬ���Ƿ������ѡ״̬���ֱ��Բ�ͬ�ķ�ʽ����xml�ڵ㡣
	treeNodeArray.toElement = treeNodesToXmlNode;
	return treeNodeArray;
}
/*
 * ����˵�������ݲ�ͬ���Ƿ������ѡ״̬���ֱ��Բ�ͬ�ķ�ʽ����xml�ڵ㡣
 * ������
 * ����ֵ��	xml�ڵ�
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function treeNodesToXmlNode() {
	for(var i = 0, len = this.length; i < len; i++){
		if(this[i] == null){
			continue;
		}
		var parentNode = null;
		if(this.hasHalfChecked != false){	//������ѡ״̬������ԭ�нڵ��ι�ϵ����xml
			parentNode = this.rootNode.selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='"+this[i].getXmlNode().parentNode.getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID)+"']");
		}
		if (parentNode == null){
			parentNode = this.rootNode;
		}
		parentNode.appendChild(this[i].getXmlNode().cloneNode(false));
	}
	return this.rootNode;
}
/*
 * ����˵������ȡѡ�нڵ��TreeNode���󣨵�ѡ����
 * ������
 * ����ֵ��	TreeNode����
 * ���ߣ�scq
 * ʱ�䣺2004-6-29
 */
function singleGetSelectedTreeNode(){
	var node = this.getXmlRoot().selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']");
	return instanceTreeNode(node);
}

/*
 * ����˵������ȡѡ�нڵ��Xml���󣨵�ѡ����
 * ������
 * ����ֵ��	Xml����
 * ���ߣ�scq
 * ʱ�䣺2005-8-22
 */
function singleGetSelectedXmlNode(){
	return this.getXmlRoot().selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']");
}

/*
 * ����˵������ȡ�ڵ����һѡ��״̬����ѡ1��2 -> 0; 0 -> 1��
 * ������	treeNode	TreeNode����
 * ����ֵ��	״̬0/1/2
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function multiGetNextState(treeNode) {
	if(/^(2|1)$/.test(treeNode.getSelectedState())){	//��ѡ��ȫѡʱ����Ϊ��ѡ
		return 0;
	}	
	return 1;	//��ѡʱ����Ϊȫѡ
}
/*
 * ����˵������ȡ�ڵ����һѡ��״̬����ѡ��
 * ������
 * ����ֵ��	״̬1
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function singleGetNextState() {
    return 1;
}