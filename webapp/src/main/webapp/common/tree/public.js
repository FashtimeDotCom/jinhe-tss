//////////////////////////
//		  ���ú���	   	//
//////////////////////////
/*
 * �ж�ֵ�Ƿ�Ϊnull����ַ���
 * ������	value	��Ҫ�жϵ�ֵ
 * ���أ�	true/false
 */
function isNullOrEmpty(value){
	return (value == null || (typeof(value) == 'string' && value == ""));
}
/*
 * ����˵�����жϽڵ��Ƿ�Ϊ���ڵ�����һ���ڵ�
 * ������node	xml�ڵ����
 * ����ֵ��true/false
 * ���ߣ�scq
 * ʱ�䣺2004-6-7
 */
function isLastChild(node) {
	return node == node.parentNode.lastChild;
}
/*
 * ����˵������Ĭ�ϴ򿪽ڵ�
 * ������	openedNode	xml��������Ҫ�򿪵Ľڵ�
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-11
 */
function openNode(openedNode) {
	if(openedNode == null){
		return;
	}
	while(openedNode != null){
		openedNode.setAttribute("_open", "true");
		if(openedNode == treeObj.getXmlRoot()){
			return;
		}
		openedNode = openedNode.parentNode;
	}
}
/*
 * �趨�ڵ��ѡ��״̬��
 * ������	node			�ڵ��xml����
 *			state			ѡ��״̬
 */
function setNodeState(node, state){
	if(node == null){
		return;
	}
	if(null!=state){
		node.setAttribute(_TREE_XML_NODE_ATTRIBUTE_CHECKTYPE, state);	//��xml�ڵ��б��ѡ��״̬
	}else{//2006-4-8 ������stateΪnullʱ����
		node.removeAttribute(_TREE_XML_NODE_ATTRIBUTE_CHECKTYPE);	//��xml�ڵ��б��ѡ��״̬
	}
}
/*
 * ����˵�������ַ���ת����xml�ڵ����
 * ������	xml	xml�ַ���
 * ����ֵ��	xml�ڵ����
 * ���ߣ�scq
 * ʱ�䣺2004-6-28
 */
function loadXmlToNode(xml) {
	try{
		var newNodeXML = new ActiveXObject("MSXML.DOMDocument");
		newNodeXML.async = false;
		newNodeXML.loadXML(xml);
		return newNodeXML;
	}catch(e){
		alert("xml���ݲ�������������[xml:" + xml + "]");
		throw(e);
		return null;
	}
}
/*
 * ��ȡ���������ؼ����������е�λ�ã������ϱ�Ե����������ϱ�Ե�ľ��룩
 * ������	objElement	����
 * ���أ�	int
 */
function getTop(objElement) {//��ȡ��������ڿؼ������ľ��롣
	var top = 0;
	var obj = objElement;
	while (obj != element) {
		top = top + obj.offsetTop;
		obj = obj.offsetParent;
	}
	return top;
}
/*
 * ����˵����������ʾ�Ķ��󣬻�ȡ��Ӧ��Row����
 * ������	obj	�ڵ���ʾ��ҳ���ϵĶ���
 * ����ֵ��	Row����
 * ���ߣ�scq
 * ʱ�䣺2004-6-29
 */
function getRow(obj) {
	if(!/^(a|img)$/.test(obj.tagName.toLowerCase())){
		return null;
	}
	try{
		var index = getRowIndex(obj);
	}catch(e){
		return null;
	}
	return displayObj.getRowByIndex(index);
}
/*
 * ����˵��������ϵ�ҳ������ϡ��·�����Ӧ�Ĺ�����
 * ������	obj	�¼���������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function startScrollTree(obj) {
    if(obj == null){
		return;
	}
	if(isLastLine(obj)){
		scrollDown();
	}
	if(isFirstLine(obj)){
		scrollUp();
	}
}
/*
 * ����˵������ʱ���Ϲ���
 * ������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function scrollUp() {
	if(element.scroller != null){
		window.clearTimeout(element.scroller);
		element.scroller=null;
	}
	displayObj.scrollUp();
	element.scroller = window.setTimeout(scrollUp, _TREE_SCROLL_REPEAT_DELAY_TIME);
}
/*
 * ����˵������ʱ���¹���
 * ������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function scrollDown() {
	if(element.scroller != null){
		window.clearTimeout(element.scroller);
		element.scroller=null;
	}
	displayObj.scrollDown();
	element.scroller = window.setTimeout(scrollDown, _TREE_SCROLL_REPEAT_DELAY_TIME);
}

/*
 * ����˵��������ϵ��Ĳ���ҳ������ϡ��·�������ֹͣ�϶�����ֹͣ������
 * ������	obj	�¼���������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function stopScrollTree(obj) {
	if(obj != null && (isLastLine(obj) || isFirstLine(obj))){
		return;
	}
	if (element.scroller) {
		window.clearTimeout(element.scroller);
		element.scroller = null;
	}
}
/*
 * ����˵���������Ƿ��������������
 * ������	odj	��ʾ�Ķ���
 * ����ֵ��	true/false
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function isLastLine(obj) {
	return getRowIndex(obj) == (displayObj.getPageSize() - 1);
}/*
 * ����˵���������Ƿ��������������
 * ������	odj	��ʾ�Ķ���
 * ����ֵ��	true/false
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function isFirstLine(obj) {
    return getRowIndex(obj) == 0;
}
/*
 * ����˵������ȡ�������������
 * ������	obj	����
 * ����ֵ��	�����
 * ���ߣ�scq
 * ʱ�䣺2004-6-30
 */
function getRowIndex(obj) {
    while(obj.tagName != null && obj.tagName.toLowerCase() != "tr"){
		obj = obj.parentNode;
	}
	return obj.rowIndex;
}