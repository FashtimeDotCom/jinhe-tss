//////////////////////////////////////////////////////////////////////////
//	�������ƣ�Display														//
//	ְ��	�������û����Ӳ��ֵĽڵ���ʾ��ҳ���ϡ�						//
//			�ؼ�һ��ҳ���ϵ�Ԫ�ض��д˶������ɺ͵��ȣ�tr������Row����ר�Ŵ�����//
//////////////////////////////////////////////////////////////////////////

/*
 * ����˵������ʼ��Display����
 * ������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-25
 */
function instanceDisplay() {
	displayObj = new Display();
	displayObj.init();
}
/*
 * ����˵�����ֲ���ʾ���󣬿���ҳ����ʾ��Χ����Ӧ��չʾ���û��Ľڵ�չʾ�ڽ����ϡ�
 * ������
 * ����ֵ��
 * ���ߣ�scq
 * ʱ�䣺2004-6-7
 */
function Display() {
	var _windowHeight = Math.max(element.offsetHeight - _TREE_SCROLL_BAR_WIDTH, _TREE_BOX_MIN_HEIGHT);
	var _windowWidth = Math.max(element.offsetWidth - _TREE_SCROLL_BAR_WIDTH, _TREE_BOX_MIN_WIDTH);
	var _rowHeight = _TREE_NODE_DISPLAY_ROW_HEIGHT;
	var _pageSize = Math.floor(_windowHeight / _rowHeight);
	var _totalTreeNodes = treeObj.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[../@_open = 'true']");
	var _totalTreeNodesNum = _totalTreeNodes.length;
	var _vScrollBox = null;
	var _vScrollDiv = null;
	var _hScrollBox = null;
	var _hScrollDiv = null;
	var _rootBox = null;
	var _rootTable = null;
	var _scrollTimer = null;
	var _startNum = null;
	var _Rows = new Array(_pageSize);
	element.style.overflow = 'hidden';
	element.onresize = resize;
	element.onmousewheel = function(){
		_vScrollBox.scrollTop += -Math.round(window.event.wheelDelta/120)*_rowHeight;
	}
	element.onkeydown = function(){
		switch (event.keyCode) {
		    case 33:	//PageUp
				_vScrollBox.scrollTop -= _pageSize * _rowHeight;
				return false;
		    case 34:	//PageDown
				_vScrollBox.scrollTop += _pageSize * _rowHeight;
				return false;
		    case 35:	//End
				_vScrollBox.scrollTop = _vScrollDiv.offsetHeight - _windowHeight;
				return false;
		    case 36:	//Home
				_vScrollBox.scrollTop = 0;
				return false;
		    case 37:	//Left
				_hScrollBox.scrollLeft -= 10;
				return false;
		    case 38:	//Up
				_vScrollBox.scrollTop -= _rowHeight;
				return false;
		    case 39:	//Right
				_hScrollBox.scrollLeft += 10;
				return false;
		    case 40:	//Down
				_vScrollBox.scrollTop += _rowHeight;
				return false;
		}
	}
	/*
	 * ����˵��������Ĭ��չʾ�����ڵ㡣
	 * ������	
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-7
	 */
	this.init = function(){
		element.innerHTML = "";
		createScrollElement();
		createTableElement();
		setScrollElementSize();
		setTableElementSize();
//		this.reload();
	}
	
	/*
	 * ����˵�������ɹ�����
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	function createScrollElement() {
		var vScrollStr = '<div id="treeVScrollBox" style="position:absolute;overflow-y:auto;heigth:100%;width:17px;top:0px;right:0px;"><div id="treeVScrollDiv" style="width:1px"></div></div>';
		var hScrollStr = '<div id="treeHScrollBox" style="position:absolute;overflow-x:auto;overflow-y:hidden;heigth:17px;width:100%;bottom:0px;left:0px"><div id="treeHScrollDiv" style="higth:1px"></div></div>';
		element.insertAdjacentHTML('afterBegin', vScrollStr + hScrollStr);
		_vScrollBox = element.all("treeVScrollBox");
		_vScrollDiv = element.all("treeVScrollDiv");
		_hScrollBox = element.all("treeHScrollBox");
		_hScrollDiv = element.all("treeHScrollDiv");
		_vScrollBox.onscroll = onVScroll;
		_hScrollBox.onscroll = onHScroll;
	}
	/*
	 * ����˵�������ù������Ĵ�С
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-9
	 */
	function setScrollElementSize() {
		_vScrollBox.style.height = _windowHeight;

		_vScrollDiv.style.height = (_totalTreeNodesNum - _pageSize) * _rowHeight + _windowHeight;

		_hScrollBox.style.width = _windowWidth;

		_hScrollDiv.style.width = _rootTable.style.width; 
	}
	/*
	 * ����˵��������ҳ������ʾ�ڵ��table����
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-7
	 */
	function createTableElement() {
		var tableStr = '<div id="treeRootBox" style="position:absolute;overflow:hidden;top:0px;left:0px"><table id="treeRootTable" cellspacing="0"></table></div>';
		element.insertAdjacentHTML('afterBegin', tableStr);
		_rootBox = element.all("treeRootBox");
		_rootTable = element.all("treeRootTable");
		for(var i = 0; i < _pageSize; i++){
			var tr = _rootTable.insertRow();
			tr.insertCell();
			_Rows[i] = new Row(tr);
		}
	}
	/*
	 * ����˵����������ʾ�ڵ��table����Ĵ�С
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-9
	 */
	function setTableElementSize() {
		_rootBox.style.height = _windowHeight;
		_rootBox.style.width = _windowWidth;
	}
	/*
	 * ����˵�������ݹ���״̬����ʾ���ӷ�Χ�ڵ����ڵ㡣
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-7
	 */
	this.reload = function refresh(){
		var st = new Date();
		if(_totalTreeNodesNum <= _pageSize){
			_startNum = 0;
		}else{
			_startNum = Math.ceil(_vScrollBox.scrollTop  / _rowHeight);
		}
		//��ʾ�ڵ�
		for(var i = 0; i < _pageSize; i++){
			var nodeIndex = i + _startNum;
			if(nodeIndex < _totalTreeNodesNum){
				_Rows[i].setXmlNode(_totalTreeNodes[nodeIndex]);
			}else{
				_Rows[i].setXmlNode();
			}
		}
		//ͬ������������Ĵ�С
		_hScrollDiv.style.width = _rootTable.offsetWidth;

		refreshUI();

		var et = new Date();
		window.status=et-st;
	}
	/*
	 * ����˵��������ҳ���ϵ���������ȡ��Ӧ��Row����
	 * ������	index	�����
	 * ����ֵ��	Row����/null
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-29
	 */
	this.getRowByIndex = function (index) {
		if(index >= _pageSize || index < 0){
			alert("Display���������[" + index + "]��������Χ[0 - " + _pageSize + "]��");
			return null;
		}
		return _Rows[index];
	}
	/*
	 * ����˵�������»�ȡ���п�����ʾ�Ľڵ�����
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	this.resetTotalTreeNodes = function(){
		_totalTreeNodes = treeObj.getXmlRoot().selectNodes(".//" + _TREE_XML_NODE_NAME + "[../@_open = 'true']");
		_totalTreeNodesNum = _totalTreeNodes.length;

		_vScrollDiv.style.height = Math.max(1,(_totalTreeNodesNum - _pageSize) * _rowHeight + _windowHeight);
	}
	/*
	 * ����˵������ȡҳ��table����
	 * ������
	 * ����ֵ��	table����
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	this.getRootTable = function(){
		return _rootTable;
	}
	/*
	 * ����˵�������ڵ���������Ƿ�Χ֮��
	 * ������	node	xml�ڵ�
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	this.scrollTo = function(node){
		var nodeIndex = null;
		for(var i = 0; i < _totalTreeNodesNum; i++){
			if(_totalTreeNodes[i] == node){
				nodeIndex = i;
				break;
			}
		}
		if(nodeIndex == null){
			return;
		}
		var childNums = node.selectNodes(".//" + _TREE_XML_NODE_NAME + "[../@_open = 'true']").length;
		if(childNums + 1 > _pageSize 
			|| nodeIndex < _startNum 
			|| nodeIndex >= _startNum + _pageSize){
            _vScrollBox.style.display = 'block';
			_vScrollBox.scrollTop = nodeIndex * _rowHeight;
		}else if(nodeIndex + childNums + 1 - _pageSize > _startNum){
            _vScrollBox.style.display = 'block';
			_vScrollBox.scrollTop = (nodeIndex + childNums + 1 - _pageSize) * _rowHeight;
		}else{
			this.reload();
		}
	}
	/*
	 * ����˵�������Ϲ���һ���ڵ�
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	this.scrollUp = function(){
		_vScrollBox.scrollTop -= _rowHeight;
	}
	/*
	 * ����˵�������¹���һ���ڵ�
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	this.scrollDown = function(){
		_vScrollBox.scrollTop += _rowHeight;
	}
	/*
	 * ����˵������ȡ��������λ��
	 * ������
	 * ����ֵ��	int	����ֵ
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	this.getScrollTop = function(){
		return _vScrollBox.scrollTop;
	}
	/*
	 * ����˵������������¼���������ʱִ��reload������ڶ��δ���ʱ���ϴε��¼���û��ִ�У�
	 * ��ȡ���ϴ��¼������������¼���Ϊ���Ƿ�ֹ��δ�������Ļ������
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	function onVScroll() {
 		if (_scrollTimer) {
			window.clearTimeout(_scrollTimer);
		}
		_scrollTimer = window.setTimeout(refresh, _TREE_SCROLL_DELAY_TIME);
	}
	/*
	 * ����˵������������¼�
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	function onHScroll() {
		_rootBox.scrollLeft = this.scrollLeft;
	}
	/*
	 * ����˵���������ڴ�С�ı�󣬳�ʼ��������ز������������¼�����Ҫ��ʾ�Ľڵ㡣
	 * ������
	 * ����ֵ��
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	function resize() {
		//2005-9-8 ������ʱ�����⼫��ʱ�����ظ��������
		clearTimeout(element._resizeTimeout);
		element._resizeTimeout = setTimeout(function(){

			var tempWindowHeight = Math.max(element.offsetHeight - _TREE_SCROLL_BAR_WIDTH, _TREE_BOX_MIN_HEIGHT);
			var tempWindowWidth = Math.max(element.offsetWidth - _TREE_SCROLL_BAR_WIDTH, _TREE_BOX_MIN_WIDTH);

			if(_windowHeight!=tempWindowHeight || _windowWidth!=tempWindowWidth){
				_windowHeight = tempWindowHeight;
				_windowWidth = tempWindowWidth;
			}else{
				//����ǰ��ߴ��ޱ仯
				return ;
			}
				
			var pageSize = Math.floor(_windowHeight / _rowHeight);
			_vScrollBox.style.height = _windowHeight;
			_hScrollBox.style.width = _windowWidth;

			_rootBox.style.height = _windowHeight;
			_rootBox.style.width = _windowWidth;

			//2005-9-8 �����ߴ�仯ʱ������ʾ��������
			if(pageSize > _pageSize){//�߶�����ʱ

				_Rows = new Array(pageSize);
				for(var i = 0; i < pageSize; i++){
					if(i < _pageSize){
						var tr = _rootTable.rows[i];
					}else{
						var tr = _rootTable.insertRow();
						tr.insertCell();
					}
					_Rows[i] = new Row(tr);
				}
				_pageSize = pageSize;
				refresh();

			}else if(pageSize < _pageSize){//�߶ȼ���ʱ

				_Rows = new Array(pageSize);
				for(var i = 0; i < pageSize; i++){
					var tr = _rootTable.rows[i];
					_Rows[i] = new Row(tr);
				}
				for(var i = pageSize; i < _pageSize; i++){
					_rootTable.deleteRow(pageSize);
				}
				_pageSize = pageSize;
				refresh();

			}else{
				refreshUI();
			}
		},20);
	}
	/*
	 * ����˵����ˢ��ҳ��չʾ������չʾ�򡢹�������
	 * ������
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	function refreshUI(){
		if(_totalTreeNodesNum > _pageSize){
			_vScrollBox.style.display = 'block';
			_hScrollBox.style.width = _windowWidth;
			_rootBox.style.width = _windowWidth;
		}else{
			_vScrollBox.style.display = 'none';
			_hScrollBox.style.width = _windowWidth + _TREE_SCROLL_BAR_WIDTH;
			_rootBox.style.width = _windowWidth + _TREE_SCROLL_BAR_WIDTH;
		}
		if(_rootTable.offsetWidth > _windowWidth){
			_hScrollBox.style.display = 'block';
			_vScrollBox.style.height = _windowHeight;
			_rootBox.style.height = _windowHeight;
		}else{
			_hScrollBox.style.display = 'none';
			_vScrollBox.style.height = _windowHeight + _TREE_SCROLL_BAR_WIDTH;
			_rootBox.style.height = _windowHeight + _TREE_SCROLL_BAR_WIDTH;
		}
	}
	/*
	 * ����˵������ȡҳ��������չʾ������
	 * ������
	 * ����ֵ��int	����
	 * ���ߣ�scq
	 * ʱ�䣺2004-6-8
	 */
	this.getPageSize = function () {
	    return _pageSize;
	}
	this.test = function(name){
		return eval(name);
	}
}