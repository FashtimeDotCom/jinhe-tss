//////////////////////////////////////////////////////////////////
//	�������ƣ�TreeNode											//
//	ְ��	���ڵ����ӿڡ�������ڵ�״̬�仯��					//
//////////////////////////////////////////////////////////////////

/*
 * ����˵��������xml�ڵ��ȡTreeNode�����һ��ʵ��
 * ������	node	xml�ڵ�
 * ����ֵ��	TreeNode/null
 * ���ߣ�scq	
 * ʱ�䣺2004-6-11
 */
function instanceTreeNode(node) {
	if(node == null){
		return null;
	}
	return new TreeNode(node);
}

/*
 * �ؼ��ӿ�TreeNode����
 * ������	node	xml�ڵ�
 * ������	
 */
function TreeNode(node){
	this.node = node;
}
TreeNode.prototype = new function(){

	/*
	 * ��ȡxml�ڵ�
	 */
	this.getXmlNode = function(){
		return this.node;
	}
	/*
	 * �Ƿ�Ϊ�ӽڵ��Ѿ��򿪵Ľڵ�
	 * ���أ�	true/false
	 */
	this.isOpened = function(){
		return this.node.getAttribute("_open") == "true";
	}
	/*
	 * �Ƿ�Ϊ��ѡ��ڵ�
	 * ���أ�	true/false
	 */
	this.isCanSelected = function(){
		return this.node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CANSELECTED) != "0";
	}
	/*
	 * �Ƿ�Ϊ�������ӽڵ㣬��display!=0
	 * ���أ�	tree/false
	 */
	this.isEnabled = function(){
		return this.node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_DISPLAY) != '0';
	}
	/*
	 * �Ƿ�Ϊ����ڵ�
	 * ���أ�	true/false
	 */
	this.isActive = function(){
		return treeObj.isActiveNode(this.node);
	}
	/*
	 * ��ȡ�ڵ��ѡ��״̬
	 * ���أ�	��ѡ����0/1/2����ѡ����1/0
	 */
	this.getSelectedState = function(){
		var state = this.node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_CHECKTYPE);
		if(/^(1|2)$/.test(state)){
			return parseInt(state);
		}else{
			return 0;
		}
	}
	/*
	 * ����ڵ����ֱ�ǩʱ����������״̬�ĳ���һ��ѡ��״̬
	 * ������	noChildren	�������ӽڵ�
	 * ����ԭ�е�ѡ��״̬���ı�״̬����Ϊ1��2�򷵻�0�����򷵻�1
	 */
	this.changeSelectedStateByActive = function(noChildren){
		treeObj.changeCheckedStateByActive(this, noChildren);
	}
	/*
	 * ��������״̬�ĳ���һ��ѡ��״̬
	 * ������noChildren	ѡ�нڵ�ʱ�������ӽڵ�
	 *			noFireChangeEvent	�Ƿ񴥷�onChange�¼�
	 * ����ԭ�е�ѡ��״̬���ı�״̬����Ϊ1��2�򷵻�0�����򷵻�1
	 */
	this.changeSelectedState = function(noChildren, noFireChangeEvent){
		this.setSelectedState(treeObj.getNextState(this), noChildren, noFireChangeEvent);
	}
	/*
	 * ����ѡ��״̬��ͬʱˢ����ؽڵ��ѡ��״̬
	 * ������	state	ѡ��״̬
	 *			noChildren	ֻѡ���Լ��ڵ㣨ֻ��ѡ��ʱ��Ч��
	 *			noFireChangeEvent	�Ƿ񴥷�onChange�¼�
	 */
	this.setSelectedState = function(state, noChildren, noFireChangeEvent){
		if(!this.isCanSelected() || treeObj.isAllDisabledCheckType()){	//����ѡ���򷵻�
			return;
		}
		if(state == 1 && treeObj.isActiveBySelected(state)){
			var eventObj = createEventObject();
			eventObj.treeNode = this;
			eventObj.returnValue = true;
			eventObj.type = "_BeforeSelectedAndActived(Selected)";
			eventBeforeSelectedAndActived.fire(eventObj);
			if(!eventObj.returnValue){
				return;
			}
		}
		if(state == 1){
			var eventObj = createEventObject();
			eventObj.treeNode = this;
			eventObj.returnValue = true;
			eventObj.type = "_BeforeSelected";
			eventBeforeSelected.fire(eventObj);
			if(!eventObj.returnValue){
				return;
			}
		}
		justSelected(this, state, noChildren, noFireChangeEvent);
		if(!this.isActive() && treeObj.isActiveBySelected(state)){
			var eventObj = createEventObject();
			eventObj.treeNode = this;
			eventObj.returnValue = true;
			eventObj.type = "_BeforeActivedBySelected";
			eventBeforeActived.fire(eventObj);
			if(!eventObj.returnValue){
				return;
			}
			justActive(this);
		}
	}

	/*
	 * ��ȡ���ڵ��TreeNode����
	 * ���أ�	TreeNode/null
	 */
	this.getParent = function(){
		return instanceTreeNode(this.node.parentNode);
	}
	/*
	 * ��ȡids���Լ����ӽڵ��id�ַ�����Ĭ��Ϊ�Լ���ȫ���ӽڵ���ѡ��״̬(ȫѡ����ѡ)�Ľڵ�id�ַ���
	 * ������isAll	�Ƿ�Ϊȫ���Լ����ӽڵ��Id
	 *       onlySelected	ֻ����ȫѡ��
	 * ���أ�	id���ַ�����id1,id2,id3
	 */
	this.getIds = function(isAll, onlySelected){
		if(isAll){
			var path = ".|.//" + _TREE_XML_NODE_NAME;
		}else{
			if(onlySelected){
				var path = ".[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']|.//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1']";
			}else{
				var path = ".[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1' or @" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='2']|.//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='1' or @" + _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE + "='2']";
			}
		}
		var nodes = this.node.selectNodes(path);
		var ids = "";
		for(var i = 0; i < nodes.length; i++){
			var id = nodes[i].getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID);
			if(id == _TREE_XML_ROOT_TREE_NODE_ID){
				continue;
			}
			if(i > 0){
				ids += ",";
			}
			ids += id;
		}
		return ids;
	}
	/*
	 * ��ȡid
	 * ���أ�	id���ַ���
	 */
	this.getId = function(){
		return this.node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID);
	}
	/*
	 * �趨id
	 */
	this.setId = function(id){
		var node = treeObj.getXmlRoot().selectSingleNode(".//" + _TREE_XML_NODE_NAME + "[@" + _TREE_XML_NODE_ATTRIBUTE_ID + "='" + id + "']");
		if(node != null && node != this.node){
			return alert("ͬid�Ľڵ��Ѿ����ڣ�[id:" + id + "]");
		}
		//����xml�����id
		this.node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_ID, id);
	}
	/*
	 * ��ȡName
	 * ���أ�	name���ַ���
	 */
	this.getName = function(){
		return this.node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_NAME);
	}
	/*
	 * �趨Name
	 */
	this.setName = function(name){
		this.node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_NAME, name);
	}
	/*
	 * ��ȡFullName
	 * ���أ�	fullName���ַ���
	 */
	this.getFullName = function(){
		return this.node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_FULLNAME);
	}
	/*
	 * �趨FullName
	 */
	this.setFullName = function(fullName){
		this.node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_FULLNAME, fullName);
	}
	/*
	 * ����ڵ�
	 * ������noChildren		ѡ�нڵ�ʱ���Ƿ񲻰����ӽڵ�
	 */
	this.setActive = function(noChildren){
		if(!this.isCanSelected()){
			return;
		}
		if(!treeObj.isAllDisabledCheckType() && treeObj.isSelectByActived() && treeObj.getNextState(this) == 1){
			var eventObj = createEventObject();
			eventObj.treeNode = this;
			eventObj.returnValue = true;
			eventObj.type = "_BeforeSelectedAndActived(Active)";
			eventBeforeSelectedAndActived.fire(eventObj);
			if(!eventObj.returnValue){
				return;
			}
		}
		if(!this.isActive()){
			var eventObj = createEventObject();
			eventObj.treeNode = this;
			eventObj.returnValue = true;
			eventObj.type = "_BeforeActived";
			eventBeforeActived.fire(eventObj);
			if(!eventObj.returnValue){
				return;
			}
		}
        justActive(this);
		if(!treeObj.isAllDisabledCheckType() && treeObj.isSelectByActived()){
			if(treeObj.getNextState(this) == 1){
				var eventObj = createEventObject();
				eventObj.treeNode = this;
				eventObj.returnValue = true;
				eventObj.type = "_BeforeSelectedByActive";
				eventBeforeSelected.fire(eventObj);
				if(!eventObj.returnValue){
					return;
				}
			}
			justSelected(this, treeObj.getNextState(this), noChildren, false);
		}
	}
	/*
	 * �򿪽ڵ㣬�ýڵ�����ڿ��������ڡ�
	 */
	this.focus = function(){
		//��δ���򿪵ĸ��ڵ㣬���ڵ�ĸ��ڵ㣬�Դ����ơ�
		openNode(this.node.parentNode);

		displayObj.resetTotalTreeNodes();

		//����ڵ�û���ڿ��������ڣ�������ڵ㵽��������
		displayObj.scrollTo(this.node);
	}
	/*
	 * ��������Ϊ����
	 * ������isAllParent	�Ƿ�ͬʱ��������ͣ�õĸ��ڵ�
	 */
	this.enabled = function(isAllParent){
		if(isAllParent){
			var node = this.node;
			while(node != null && node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID) != _TREE_XML_ROOT_TREE_NODE_ID
					&& node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_DISPLAY) == '0'){
				node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_DISPLAY, "1");
				node = node.parentNode;
			}
		}else{
			this.node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_DISPLAY, "1");
		}
	}

	/*
	 * ��������Ϊ������
	 * ������isAllChildren	�Ƿ�ͬʱͣ���ӽڵ�
	 */
	this.disabled = function(isAllChildren){
		if(isAllChildren){
			var nodes = this.node.selectNodes(".|.//" + _TREE_XML_NODE_NAME);
			for(var i = 0; i < nodes.length; i++){
				nodes[i].setAttribute(_TREE_XML_NODE_ATTRIBUTE_DISPLAY, "0");
			}
		}else{
			this.node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_DISPLAY, "0");
		}
	}
	/*
	 * �趨�ڵ�Ŀ�ѡ������
	 * ������	canSelected:	1/0 ǰ�ߴ����ѡ�񣬺��ߴ�����ѡ
	 */
	this.setCanSelected = function(canSelected){
		this.node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_CANSELECTED, canSelected);
	}

	/**
	 * ������ֱ�ǩʱ���ı�ڵ�����״̬
	 */
	this.changeFolderStateByActive = function(){
		//�ı�ڵ������״̬
		treeObj.changeOpenStateByActive(this);
	}

	/*
	 * �ı�ڵ������״̬
	 */
	this.changeFolderState = function(){
		if(this.isOpened()){	
			this.close();	//�ر��ӽڵ�
		}else{
			this.open();	//���ӽڵ�
            
            //����չ���¼�
            var eventObj = createEventObject();
            eventObj.treeNode = this;
            eventNodeExpand.fire(eventObj);
		}
	}
	/*
	 * ���ӽڵ�
	 */
	this.open = function(){
		this.node.setAttribute("_open", "true");	//��ǵ�ǰ�ڵ�Ϊ��״̬

		//�˽ڵ�򿪣�����˽ڵ�رն��رյ���֦�ڵ㣬ͬʱȥ����ǡ�
		openChildNodesCloseByThisNode(this.node);

		displayObj.resetTotalTreeNodes();
		//����ڵ����򿪵��ӽڵ�û���ڿ��������ڣ�������ڵ�ʹ�估���ӽڵ�ȫ�������ڿ�������ʹ�������϶�
		displayObj.scrollTo(this.node);
	}
	/*
	 * �ر��ӽڵ�
	 */
	this.close = function(){
		this.node.setAttribute("_open", "false");	//��ǵ�ǰ�ڵ�Ϊ�ر�״̬

		//�˽ڵ�رգ��رմ˽ڵ�Ĵ򿪵���֦�ڵ㣬ͬʱ��ǹرյ�ԭ��
		closeOpendChildNodes(this.node);

		displayObj.resetTotalTreeNodes();
	}
	/*
	 * ɾ����ǰ�ڵ�
	 * ���أ�	true/false	ǰ�߱�ɾ���ɹ������߱�ʧ��
	 */
	this.remove = function(){
		//ɾ��xml�еĴ˽ڵ�
		this.node.parentNode.removeChild(this.node);

		displayObj.resetTotalTreeNodes();
		return true;
	}
	/*
	 * ����ӽڵ�
	 * ������	xml	�Ϸ��Ľڵ�xml�ַ���
	 * ���أ�	TreeNode/null	ǰ�߱�����ӽڵ�ɹ��������½ڵ��TreeNode�����߱�ʧ��
	 */
	this.appendChild = function(xml){
		//�����ӽڵ�
		var newNodeXML = loadXmlToNode(xml);
		if(newNodeXML == null || newNodeXML.documentElement == null || newNodeXML.documentElement.nodeName != _TREE_XML_NODE_NAME){
			alert("TreeNode���������ڵ�xml���ݲ�������������");
			return null;
		}
		//����ӽڵ�
		var newNode = this.node.appendChild(newNodeXML.documentElement);

		var treeNode = instanceTreeNode(newNode);
		if(treeNode instanceof TreeNode){
			refreshStatesByNode(treeNode);		//�����½ڵ��ѡ��״̬ˢ����ؽڵ�
		}

		displayObj.resetTotalTreeNodes();

		return treeNode;
	}
	/*
	 * �������ڣ�2006-4-8
	 * ��Ӹ��ڵ�
	 * ������	xml	�Ϸ��Ľڵ�xml�ַ���
	 * ���أ�	TreeNode/null	ǰ�߱���Ӹ��ڵ�ɹ��������½ڵ��TreeNode�����߱�ʧ��
	 */
	this.appendRoot = function(xml){
		//�����½ڵ�
		var newNodeXML = loadXmlToNode(xml);
		if(newNodeXML == null || newNodeXML.documentElement == null || newNodeXML.documentElement.nodeName != _TREE_XML_NODE_NAME){
			alert("TreeNode���������ڵ�xml���ݲ�������������");
			return null;
		}
		//��Ӹ��ڵ�
		var newNode = treeObj.getXmlRoot().appendChild(newNodeXML.documentElement);

		var treeNode = instanceTreeNode(newNode);
		if(treeNode instanceof TreeNode){
			refreshStatesByNode(treeNode);		//�����½ڵ��ѡ��״̬ˢ����ؽڵ�
		}

		displayObj.resetTotalTreeNodes();

		return treeNode;
	}
	/*
	 * �ƶ���ǰ�ڵ�
	 * ������	toTreeNode	Ŀ��ڵ��TreeNode����
	 *			moveState	�ƶ�״̬��-1���ƶ���Ŀ��ڵ�����棬1���ƶ���Ŀ��ڵ�����棬1Ϊȱʡ״̬
	 * ���أ�	true/false	ǰ�߱��ƶ��ڵ�ɹ������߱�ʧ��
	 */
	this.moveTo = function(toTreeNode, moveState){
		if(!(toTreeNode instanceof TreeNode) 
			|| this.node.parentNode == null){
			return false;
		}
		if(moveState == -1){	//�ƶ���Ŀ��ڵ��Ϸ�
			toTreeNode.getXmlNode().parentNode.insertBefore(this.node, toTreeNode.getXmlNode());
		}else{					//�ƶ���Ŀ��ڵ��·�
			toTreeNode.getXmlNode().parentNode.insertBefore(this.node, toTreeNode.getXmlNode().nextSibling);
		}
		displayObj.resetTotalTreeNodes();
		return true;
	}
	/*
	 * ��ȡ��ǰ�ڵ��XML�ڵ���󣬸ö�����һ��ǳ�������󣨲�������ǰ�ڵ��ӽڵ㣩��
	 * ���أ�	xml�ڵ㣬��ǰ�ڵ��ǳ��������
	 */
	this.toElement = function(){
		return this.node.cloneNode(false);
	}
	/*
	 * ��ȡ��ǰ�ڵ��XML�ڵ�����xml�ַ���
	 * ���أ�	xml�ַ�������ǰ�ڵ��ǳ���������xml�ַ���
	 */
	this.toString = function(){
		return this.toElement().xml;
	}
	/*
	 * ��ȡ�ڵ������ַ���
	 * ���أ�	�����ַ���
	 */
	this.getAttribute = function(name){
		return this.node.getAttribute(name);
	}
	/*
	 * ���ýڵ������ַ���
	 */
	this.setAttribute = function(name, value){
        //2007-5-31 ��ֹ�״�
        if(null==value){
            value = "";
        }
		if(name == _TREE_XML_NODE_ATTRIBUTE_ID){	//�޸�id
			this.setId(value);
		}else if(name == _TREE_XML_NODE_ATTRIBUTE_NAME){	//�޸�name
			this.setName(value);
		}else if(name == _TREE_XML_NODE_ATTRIBUTE_FULLNAME){ //�޸�fullname
			this.setFullName(value);
		}else if(name == _TREE_XML_NODE_ATTRIBUTE_DISPLAY){	//�޸�display
			if(value == 1){
				this.enabled();
			}else{
				this.disabled();
			}
		}else if(name == _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE){ //�޸�checkType
			this.setSelectedState(value);
		}else if(name == _TREE_XML_NODE_ATTRIBUTE_CANSELECTED){ //�޸�canSelected
			this.setCanSelected(value);
		}else{	//�޸���������
			this.node.setAttribute(name, value);
		}
	}
	/*
	 * ʹ��һ�κϷ���xml�ַ������¸ýڵ������������Ϣ��
	 */
	this.setAttrbutesByXmlStr = function(xml){
		var newNodeXML = loadXmlToNode(xml);
		if(newNodeXML == null || newNodeXML.documentElement == null){
			return;
		}
		var attributes = newNodeXML.documentElement.attributes;
		for(var i = 0, len = attributes.length; i < len; i++){
			this.setAttribute(attributes[i].name, attributes[i].value);
		}
	}
	/*
	 * ����˵����ˢ��ҳ����ʾ
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-30
	 */
	this.reload = function () {
		displayObj.reload();
	}
	/*
	 * ���ݸ����Ľڵ��ѡ��״̬��ˢ����Ӧ�ڵ��ѡ��״̬
	 * ������	TreeNode�ڵ����
	 *			noChildren	ѡ�нڵ�ʱ��ֻѡ���Լ��ڵ㣬��Ӱ���ӽڵ�
	 */
	function refreshStatesByNode(treeNode, noChildren){
		treeObj.refreshStates(treeNode, noChildren);
	}
	/*
	 * ����˵��������˽ڵ�رն��رյĽڵ㣬���ӽڵ㱾���Ǵ򿪵ģ�ֻ�Ǵ˽ڵ�رղŲ���ʾ��
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-7-5
	 */
	function openChildNodesCloseByThisNode(node) {
		var childOpenedBranchNodes = node.selectNodes(".//" + _TREE_XML_NODE_NAME + "[@_closeBy = '" + node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID) + "']");
		for(var i = 0, len = childOpenedBranchNodes.length; i < len; i++){
			childOpenedBranchNodes[i].setAttribute("_open", "true");
			childOpenedBranchNodes[i].removeAttribute("_closeBy");	//ȥ���򸸽ڵ�رն�����ʾ�ı��
		}
	}
	/*
	 * ����˵�����رմ˽ڵ����Ѿ��򿪵��ӽڵ㣬���˽ڵ�رյĻ����򿪵��ֽڵ�ҲӦ�ر�
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-7-5
	 */
	function closeOpendChildNodes(node) {
		var childOpenedBranchNodes = node.selectNodes(".//" + _TREE_XML_NODE_NAME + "[@_open = 'true']");
		for(var i = 0, len = childOpenedBranchNodes.length; i < len; i++){
			childOpenedBranchNodes[i].setAttribute("_open", "false");
			childOpenedBranchNodes[i].setAttribute("_closeBy", node.getAttribute(_TREE_XML_NODE_ATTRIBUTE_ID));	//��˽ڵ�رն�����ʾ
		}
	}
	/*
	 * ����˵��������ڵ㣬������Ӧ�¼�
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-10-27
	 */
	function justActive(treeNode){
		//���ýڵ�Ϊ����
		treeObj.setActiveNode(treeNode);
		//��������ڵ��¼�
		var eventObj = createEventObject();
		eventObj.treeNode = treeNode;
		eventObj.type="_Active"
		eventNodeActived.fire(eventObj);
	}

	/*
	 * ����˵����ѡ�нڵ㣬������Ӧ�¼�
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2005-10-27
	 */
	function justSelected(treeNode, state, noChildren, noFireChangeEvent){
        if(false==treeObj.isMenu()){
            if(state == 1 && noChildren && treeNode.node.hasChildNodes()){
                setNodeState(treeNode.node, 2);
            }else{
                setNodeState(treeNode.node, state);
            }
            refreshStatesByNode(treeNode, noChildren);		//ˢ����Ӧ�ڵ��ѡ��״̬
            if(state == 1){	//ѡ�нڵ㣬����ѡ�нڵ��¼�
                var eventObj = createEventObject();
                eventObj.treeNode = treeNode;
                eventObj.type="_Selected"
                eventNodeSelected.fire(eventObj);
            }
            if(!noFireChangeEvent){
                var eventObj = createEventObject();
                eventObj.treeNode = treeNode;
                eventObj.type = "_Change";
                eventTreeChange.fire(eventObj);
            }
        }
	}
}