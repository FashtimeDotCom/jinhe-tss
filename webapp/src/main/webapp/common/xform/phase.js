	/*
	 *	�������ƣ�Phase
	 *	ְ�𣺸��������Ҳ������ǩҳ
	 *
	 */
    function Phase(label){
        this.label = label;
        this.object = null;
        this.uniqueID = null;
        this.link = null;
        this.isActive = false;
        this.init();
    }
    /*
     *	����˵������ʼ����ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Phase.prototype.init = function(){
        this.create();
    }
    /*
     *	����˵���������±�ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Phase.prototype.create = function(){
        var div = _display.createElement(_WORKSPACE_TAG_NAME_DIV);
        var object = _display.createElement(_WORKSPACE_TAG_NAME_PHASE,_WORKSPACE_NAMESPACE);

        div.innerText = this.label;
        div.title = this.label;
		div.noWrap = true;
        div._target = object;
		object.appendChild(div);

        this.object = object;
        this.uniqueID = object.uniqueID;
    }
    /*
     *	����˵��������ǩ��Page�������
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Phase.prototype.linkTo = function(pageInstance){
        this.link = pageInstance;
    }
    /*
     *	����˵��������ǩ����ָ������
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Phase.prototype.dockTo = function(container){
        container.appendChild(this.object);
    }
    /*
     *	����˵�����ͷ������ǩʵ��
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Phase.prototype.dispose = function(){
		var curActiveTab = _display.getActiveTab();
        curActiveTab.phases[this.uniqueID] = null;
        delete curActiveTab.phases[this.uniqueID];

        this.object.removeNode(true);

        this.label = null;
        this.object = null;
        this.uniqueID = null;
        this.link = null;
    }
    /*
     *	����˵���������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Phase.prototype.click = function(){
		var curActiveTab = _display.getActiveTab();
        curActiveTab.inactiveAllPhases();

        this.active();
        this.scrollToView();

        var thisObj = this;

        //�����л�̫��ʱ��ʾ���ݸ�������Ӧ
        clearTimeout(Event.timeout[_TIMEOUT_PHASE_CLICK_NAME]);
        Event.timeout[_TIMEOUT_PHASE_CLICK_NAME] = setTimeout(function(){
            if(null!=thisObj.link){
                thisObj.showLink();
            }
        },_TIMEOUT_PHASE_CLICK);
    }
    /*
     *	����˵���������Ʊ�ǩ��ʾ�ڿɼ�������
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-7-28
     *
     */
    Phase.prototype.scrollToView = function(){
		var tempTop = this.object.offsetTop;
		var tempBottom = this.object.offsetTop + this.object.offsetHeight;
        var areaTop = _display.phaseBox.scrollTop;
        var areaBottom = areaTop + _display.phaseBox.offsetHeight;
        if(tempTop<areaTop){
            _display.phaseBox.scrollTop = tempTop;
        }else if(tempBottom>areaBottom){
            _display.phaseBox.scrollTop = tempBottom - _display.phaseBox.offsetHeight;
        }
    }
    /*
     *	����˵������ʾ������ҳ��
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Phase.prototype.showLink = function(){
        _display.showPage(this.link);

        var curActiveTab = _display.getActiveTab();
		curActiveTab.linkTo(this.link);
    }
    /*
     *	����˵�����رգ����أ�������ҳ��
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Phase.prototype.hideLink = function(){
        _display.hidePage(this.link);
    }
    /*
     *	����˵�������������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Phase.prototype.active = function(){
        this.object.className = _CLASS_NAME_PHASE_ACTIVE;
        this.isActive = true;
    }
    /*
     *	����˵�������������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Phase.prototype.inactive = function(){
        this.object.className = _CLASS_NAME_NO_CLASS;
        this.isActive = false;
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Phase.prototype.toString = function(){
        var str = [];
        str[str.length] = "[Phase ����]";
        str[str.length] = "uniqueID = \"" + this.uniqueID+ "\"";
        str[str.length] = "label = \"" + this.label+ "\"";
        return str.join("\r\n");
    }
    /*
     *	����˵��������id��ȡPhaseʵ��
     *	������	string:uniqueID     
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Phase.getInstance = function(uniqueID){
		var curActiveTab = _display.getActiveTab();
        return curActiveTab.phases[uniqueID];
    }