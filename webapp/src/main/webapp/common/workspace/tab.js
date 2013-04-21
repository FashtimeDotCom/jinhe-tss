    /*
     *	�������ƣ�Tab
     *	ְ�𣺸�������ˮƽ��ǩҳ
     *
     */
    function Tab(label,phases,callback){
        this.label = label;
		this.callback = callback;
        this.object = null;
        this.uniqueID = null;
        this.link = null;
        this.phases = {};
        this.phasesParams = phases;
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
    Tab.prototype.init = function(){
        this.create();
		this.createContextMenu();
    }
    /*
     *	����˵���������±�ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.create = function(){
        var closeIcon = _display.createElement(_WORKSPACE_TAG_NAME_ICON,_WORKSPACE_NAMESPACE);
        var div = _display.createElement(_WORKSPACE_TAG_NAME_DIV);
        var object = _display.createElement(_WORKSPACE_TAG_NAME_TAB,_WORKSPACE_NAMESPACE);

        div.innerText = this.label;
        div.title = this.label;
		div.noWrap = true;
        div._target = object;

        closeIcon.title = _INFO_CLOSE;
        closeIcon._tab = this;

		object.appendChild(closeIcon);
		object.appendChild(div);

        this.object = object;
        this.uniqueID = object.uniqueID;
    }
    /*
     *	����˵���������Ҽ��˵�
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.createContextMenu = function(){
        if(null!=window.Menu){
            var oThis = this;
            var menu = new Menu();
            var item = {
                label:"�ر�",
                callback:function(){_ontabclose(oThis);}
            }
            menu.addItem(item);
            menu.attachTo(this.object,"contextmenu");;
        }
    }
    /*
     *	����˵�����رձ�ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.close = function(){
        if(null!=this.link && this==_display.getActiveTab()){
            this.hideLink();
        }
        this.dispose();

        var firstTab = _display.getFirstTab();
        _display.switchToTab(firstTab);
    }
    /*
     *	����˵�����ͷű�ǩʵ��
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.dispose = function(){
        if(this==_display.getActiveTab()){
            this.clearPhases();
        }

        _display.tabs[this.uniqueID] = null;
        delete _display.tabs[this.uniqueID];

        this.object.removeNode(true);

        this.label = null;
        this.object = null;
        this.uniqueID = null;
        this.link = null;
        this.phases = {};
        this.phasesParams = null;
    }
    /*
     *	����˵���������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.click = function(){
        var thisObj = this;

        _display.inactiveAllTabs();
        thisObj.active();

        if(null!=thisObj.link){
            thisObj.showLink();
            thisObj.refreshPhases();
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
    Tab.prototype.showLink = function(){
        _display.showPage(this.link);
    }
    /*
     *	����˵�����رգ����أ�������ҳ��
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.hideLink = function(){
        _display.hidePage(this.link);
    }
    /*
     *	����˵����������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.active = function(){
        this.object.className = _CLASS_NAME_TAB_ACTIVE;
        this.isActive = true;
    }
    /*
     *	����˵����������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.inactive = function(){
        this.object.className = _CLASS_NAME_NO_CLASS;
        this.isActive = false;
    }
    /*
     *	����˵��������ǩ��Page�������
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.linkTo = function(pageInstance){
        this.link = pageInstance;
    }
    /*
     *	����˵��������ǩ����ָ������
     *	������	object:container		HTML��������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.dockTo = function(container){
        container.appendChild(this.object);
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.prototype.toString = function(){
        var str = [];
        str[str.length] = "[Tab ����]";
        str[str.length] = "uniqueID = \"" + this.uniqueID+ "\"";
        str[str.length] = "label = \"" + this.label+ "\"";
        return str.join("\r\n");
    }
    /*
     *	����˵�����л���ָ��Tabҳ
     *	������Phase:phase       Phaseʵ��
              ����string:pageId     Pageʵ��id
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.switchToPhase = function(phase){
        if(null!=phase){
            switch(typeof(phase)){
                case "object":
                    phase.click();
                    break;
                case "string":                    
                    var phase = this.getPhaseByPage(phase);
                    if(null!=phase){
                        phase.click();
                    }
                    break;            
            }
        }
    }
    /*
     *	����˵����ˢ�������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.refreshPhases = function(){
        this.clearPhases();
        this.createPhases();

        if(null!=this.phasesParams){
            _display.refreshPhaseController();
        }else{
            _display.clearPhaseController();
        }
    }
    /*
     *	����˵������������ǩ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.clearPhases = function(){
        for(var item in this.phases){
            var phase = this.phases[item];

            phase.dispose();
        }
        _display.phaseBox.innerHTML = "";
    }
    /*
     *	����˵�������������ǩ
     *	������	object:phases	�����ǩ����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-24
     *
     */
    Tab.prototype.createPhases = function(){
		for(var i=0;null!=this.phasesParams && i<this.phasesParams.length;i++){
			var curPhaseParam = this.phasesParams[i];
            var label = curPhaseParam.label;
            var pageId = curPhaseParam.page;
            var phase = new Phase(label);
            var page = Page.getInstance(pageId);

            phase.linkTo(page);
            phase.dockTo(_display.phaseBox);
            if(pageId==this.link.id){
                phase.active();
            }

            this.phases[phase.uniqueID] = phase;
		}
    }
    /*
     *	����˵������������Phase��ǩ
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.inactiveAllPhases = function(){
        for(var item in this.phases){
            var curPhase = this.phases[item];
            curPhase.inactive();
        }
    }
    /*
     *	����˵������ȡ���������ǩ
     *	������	
     *	����ֵ��Phase:phase	�����ǩʵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.getActivePhase = function(){
        var phase = null;
        for(var item in this.phases){
            var curPhase = this.phases[item];
            if(true==curPhase.isActive){
                phase = curPhase;
                break;
            }
        }
        return phase;
    }
    /*
     *	����˵��������pageId��ȡ�����ǩ
     *	������	string:pageId       pageҳid
     *	����ֵ��Phase:phase	�����ǩʵ��
     *	���ߣ�ë��
     *	���ڣ�2006-5-22
     *
     */
    Tab.prototype.getPhaseByPage = function(pageId){
        var phase = null;
        for(var item in this.phases){
            var curPhase = this.phases[item];
            if(pageId==curPhase.link.id){
                phase = curPhase;
                break;
            }
        }
        return phase;
    }
    /*
     *	����˵����������һ�������ǩ
     *	������	boolean:wrap    �Ƿ�ѭ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.prevPhase = function(wrap){
        var phase = null;
        var tempPhases = [];
        var activePhaseIndex = null;
        for(var item in this.phases){
            var curPhase = this.phases[item];
            if(true==curPhase.isActive){
                activePhaseIndex = tempPhases.length;
            }
            tempPhases[tempPhases.length] = curPhase;
        }
        if(0==activePhaseIndex){//��ǰ������ǵ�һ��Phase���������ѭ������ȡ���һ��
            if(true==wrap){
                phase = tempPhases[tempPhases.length-1];
            }else{
                phase = tempPhases[activePhaseIndex];
            }
        }else{
            phase = tempPhases[activePhaseIndex-1];
        }
        this.switchToPhase(phase);
    }
    /*
     *	����˵����������һ�������ǩ
     *	������	boolean:wrap    �Ƿ�ѭ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.nextPhase = function(wrap){
        var phase = null;
        var tempPhases = [];
        var activePhaseIndex = null;
        for(var item in this.phases){
            var curPhase = this.phases[item];
            if(true==curPhase.isActive){
                activePhaseIndex = tempPhases.length;
            }
            tempPhases[tempPhases.length] = curPhase;
        }
        if(tempPhases.length-1==activePhaseIndex){//��ǰ������ǵ�һ��Phase���������ѭ������ȡ���һ��
            if(true==wrap){
                phase = tempPhases[0];
            }else{
                phase = tempPhases[activePhaseIndex];
            }
        }else{
            phase = tempPhases[activePhaseIndex+1];
        }
        this.switchToPhase(phase);
    }
    /*
     *	����˵����ִ�лص�����
     *	������  string:eventName        �¼�����
                object:params           �ص��������ò���
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-24
     *
     */
    Tab.prototype.execCallBack = function(eventName,params){
		if(null!=this.callback){
			//var eventName = "on" + event.type;
			Public.execCommand(this.callback[eventName],params);
		}
    }
    /*
     *	����˵�����л���ָ��Tabҳ
     *	������Phase:phase       Phaseʵ��
              ����string:pageId     Pageʵ��id
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    Tab.prototype.closePhase = function(pageId){
        if(null!=pageId){
            var phase = this.getPhaseByPage(pageId);
            if(null!=phase){
                phase.dispose();
            }
        }
    }
    /*
     *	����˵��������id��ȡTabʵ��
     *	������  string:uniqueID     tabҳΨһid
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Tab.getInstance = function(uniqueID){
        return _display.tabs[uniqueID];
    }