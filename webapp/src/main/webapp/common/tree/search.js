//////////////////////////////////////////
//	�������ƣ�Search					//
//	ְ��	��ѯ���Ͻڵ㡣				//
//////////////////////////////////////////

/*
 * ����˵������ʼ��Search����
 * ������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-7-2
 */
function instanceSearch() {
    searchObj = new Search();
}

/*
 * ����˵���������ѯ���ڵ����Ķ���
 * ������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-14
 */
function Search() {
	var _findedNodes = new Array();
	var _findedIndex = null;
	var _findedNode = null;
	/*
	 * ����˵������ѯ�õ����з���Ҫ��Ľ��
	 * ������	searchStr	��ѯ���ַ���
	 *			searchBy	��ѯ����������
	 *			searchType	��ѯ��ʽ��hazy(ģ��)/rigor(��ȷ)��Ĭ��Ϊrigor
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-14
	 */	
	this.search = function(searchStr, searchBy, searchType){
		_findedNodes = new Array();
		if(isNullOrEmpty(searchStr)){
			alert(_TREE_SEARCH_NO_CONDITION_VALUE_MSG);
			return false;
		}
		if(isNullOrEmpty(searchBy)){
			alert(_TREE_SEARCH_NO_CONDITION_NAME_MSG);
			return false;
		}
		if(searchType == _TREE_SEARCH_TYPE_INEXACT_SEARCH){
			var allNodes = treeObj.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME);
			for(var i = 0, len = allNodes.length; i < len; i++){	//ģ����ѯ���нڵ�
				if(allNodes[i].getAttribute(searchBy) != null && allNodes[i].getAttribute(searchBy).indexOf(searchStr) != -1){
					_findedNodes[_findedNodes.length] = allNodes[i];
				}
			}
		}else{
			alert(".//" + _TREE_XML_NODE_NAME + "[@" + searchBy + "='" + searchStr + "']");
			_findedNodes = treeObj.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[@" + searchBy + "='" + searchStr + "']");
		}
		_findedIndex = -1;
		return true;
	}
	/*
	 * ����˵�����Ƿ�ӵ�в�ѯ���
	 * ������
	 * ����ֵ��true/false
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-14
	 */	
	this.hasResult = function(){
		return _findedNodes.length > 0;
	}
	/*
	 * ����˵������ȡ��ѯ�õ��ĵ�һ�����
	 * ������
	 *			direct		��ѯ����Ĭ��Ϊ���²�ѯ
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-14
	 */	
	this.first = function (direct) {
		if(direct == "down"){
			_findedIndex = 0;
		}else{
			_findedIndex = _findedNodes.length - 1;
		}
		showFindedTreeNode(_findedIndex);
	}
	/*
	 * ����˵������ȡ��ѯ�������һ�����
	 * ������
	 *			direct		��ѯ����Ĭ��Ϊ���²�ѯ
	 *			isCircle	�Ƿ�ѭ����ѯ��Ĭ��Ϊ��ѭ����ѯ
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-14
	 */	
	this.next = function (direct, isCircle){
		if(direct == "down"){
			_findedIndex += 1;
			if(_findedNodes.length <= _findedIndex){
				if(isCircle){
					_findedIndex = 0;
				}else{
					_findedIndex = _findedNodes.length - 1;
				}
			}
		}else{
			_findedIndex -= 1;
			if(_findedIndex < 0){
				if(isCircle){
					_findedIndex = _findedNodes.length - 1;
				}else{
					_findedIndex = 0;
				}
			}
		}
		showFindedTreeNode(_findedIndex);
	}
	/*
	 * ����˵����չʾ��ѯ���������ѯ�õ��Ľڵ��Բ�ѯ����ض�����ʽ����
	 * ������	index	�ڵ��ڽ�����е����
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-14
	 */
	function showFindedTreeNode(index) {
		if(_findedNodes.length == 0){
			alert(_TREE_SEARCH_NO_RESULT_MSG);
			setFindedNode(null);
			return;
		}
		setFindedNode(_findedNodes[index]);
	}
	/*
	 * ����˵�����趨��ѯ����ڵ����
	 * ������	node	xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-7-2
	 */
	function setFindedNode(node) {
		_findedNode = node;
		treeObj.setFindedNode(node);
		treeNode = instanceTreeNode(node);
		if(treeNode instanceof TreeNode){
			treeNode.focus();
		}else{
			displayObj.resetTotalTreeNodes();
			displayObj.reload();
		}
	}
	this.test = function(name){
		return eval(name);
	}
}
