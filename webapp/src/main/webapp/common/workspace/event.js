    /*
     *	�������ƣ�Event
     *	ְ�𣺸�����������Զ����¼�
     *
     */
    var Event = {};
    Event.timeout = {};
    /*
     *	����˵���������¼�
     *	������	string:eventName		�¼���
     *          object:params           �¼�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Event.fire = function(eventName,params){
        var flag = true;
        var oEvent = createEventObject();
        for(var item in params){
            oEvent[item] = params[item];
        }
        var eventObj = this.getElementByName(eventName);
        if(null!=eventObj){
            oEvent.returnValue = true;
            eventObj.fire(oEvent);
            if(false==oEvent.returnValue){
                flag = false;
            }
        }
        return flag;
    }
    /*
     *	����˵���������¼����ƻ�ȡPUBLIC:EVENT��ǩ����
     *	������	string:eventName		�¼���
     *	����ֵ��eventObj                PUBLIC:EVENT��ǩ����
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Event.getElementByName = function(eventName){
        var eventObj = this[eventName];
        if(null==eventObj){
            this.refresh();
            eventObj = this[eventName];
        }
        return eventObj;
    }
    /*
     *	����˵������ȡ����PUBLIC:EVENT��ǩ����
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Event.refresh = function(){
        var tags = document.getElementsByTagName("EVENT");
        for(var i=0;i<tags.length;i++){
            var eventObj = tags[i];
            var eventName = eventObj.getAttribute("name");
            this[eventName] = eventObj;
        }
    }
    /*
     *	����˵���������¼����ƻ�ȡPUBLIC:EVENT��ǩ�����id
     *	������	string:eventName		�¼���
     *	����ֵ��string:id               PUBLIC:EVENT��ǩ�����id
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Event.getId = function(eventName){
        var eventId = null;
        if(null==this[eventName]){
            this.refresh();
        }
        if(null!=this[eventName]){
            eventId = this[eventName].id;
        }
        return eventId;
    }
    /*
     *	����˵�������������
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    function _onclick(){
        var srcElement = event.srcElement;
        if(null!=srcElement && null!=srcElement._target){
            srcElement = srcElement._target;
        }
        var tagName = srcElement.tagName;
        var scopeName = srcElement.scopeName;

        if(scopeName==_WORKSPACE_NAMESPACE){
            switch(tagName){
                //���Tab��ǩ����ʾ����
                case _WORKSPACE_TAG_NAME_TAB:
                    var tab = Tab.getInstance(srcElement.uniqueID);
                    var curActiveTab = _display.getActiveTab();
                    _ontabchange(tab,curActiveTab);
                    break;
                //���Phase��ǩ����ʾ����
                case _WORKSPACE_TAG_NAME_PHASE:
                    var tab = _display.getActiveTab();
                    var phase = tab.phases[srcElement.uniqueID];
                    var curActivePhase = tab.getActivePhase();
                    _onphasechange(phase,curActivePhase);
                    break;
                //����رհ�ť���ر�Tab
                case _WORKSPACE_TAG_NAME_ICON:
                    var tab = srcElement._tab;
                    _ontabclose(tab);
                    break;
                //�����������ť��ִ�й�������
                case _WORKSPACE_TAG_NAME_CONTROLLER_BT:
                    var bt = _display.buttons[srcElement.uniqueID];
                    _onbtclick(bt);
                    break;
                //���Page
                case _WORKSPACE_TAG_NAME_PAGE:
                    var page = Page.getInstance(srcElement.id);
                    //alert(page)
                    break;
                default:
                    break;
            }
        }
    }
    /*
     *	����˵�������˫������
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    function _ondblclick(){
        var srcElement = event.srcElement;
        if(null!=srcElement && null!=srcElement._target){
            srcElement = srcElement._target;
        }
        var tagName = srcElement.tagName;
        var scopeName = srcElement.scopeName;
        if(scopeName==_WORKSPACE_NAMESPACE){
            switch(tagName){
                case _WORKSPACE_TAG_NAME_TAB:
                    var tab = Tab.getInstance(srcElement.uniqueID);
                    _ontabclose(tab);
                    break;
                case _WORKSPACE_TAG_NAME_PAGE:
                    var page = Page.getInstance(srcElement.id);
                    //alert(page)
                    break;
                default:
                    break;
            }
        }
    }
    /*
     *	����˵����Tab�л��¼������⣩
     *	������	Tab:toTab       Tabʵ��
                Tab:fromTab     Tabʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _ontabchange(toTab,fromTab){        
        //��ʱִ�е����л�ҳ������������˫���ر�ҳ��ͻ
        clearTimeout(Event.timeout[_TIMEOUT_TAB_CLICK_NAME]);
        Event.timeout[_TIMEOUT_TAB_CLICK_NAME] = setTimeout(function(){

            if(toTab!=fromTab){
                var params = {};
                params.tab = toTab;
                params.lastTab = fromTab;

                //ִ��toTabҳ�϶���Ļص�����
                toTab.execCallBack(_EVENT_NAME_ON_TAB_CHANGE,params);
                
                var isSuccess = Event.fire(_EVENT_NAME_ON_TAB_CHANGE,params);
                if(true==isSuccess){
                    toTab.click();
                }
            }
        },_TIMEOUT_TAB_CLICK);
    }
    /*
     *	����˵����Tab�ر��¼������⣩
     *	������	Tab:tab       Tabʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _ontabclose(tab){
        //˫���ر�ʱ��ִ�е����л�ҳ����
        clearTimeout(Event.timeout[_TIMEOUT_TAB_CLICK_NAME]);

        var params = {};
        params.tab = tab;

        //ִ��tabҳ�϶���Ļص�����
        tab.execCallBack(_EVENT_NAME_ON_TAB_CLOSE,params);

        var isSuccess = Event.fire(_EVENT_NAME_ON_TAB_CLOSE,params);
        if(true==isSuccess){
            tab.close();

            var firstTab = _display.getFirstTab();
            if(null==firstTab){
                Event.fire(_EVENT_NAME_ON_TAB_CLOSE_ALL);
            }
        }
    }
    /*
     *	����˵����Phase�л��¼������⣩
     *	������	Phase:toPhase       Phaseʵ��
                Phase:fromPhase     Phaseʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _onphasechange(toPhase,fromPhase){
        if(toPhase!=fromPhase){
            var params = {};
            params.phase = toPhase;
            params.lastPhase = fromPhase;
            var isSuccess = Event.fire(_EVENT_NAME_ON_PHASE_CHANGE,params);
            if(true==isSuccess){
                toPhase.click();
            }
        }
    }
    /*
     *	����˵����ControllerButton����¼������⣩
     *	������	ControllerButton:bt       ControllerButtonʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _onbtclick(bt){
        var params = {};
        params.bt = bt;
        bt.click();
    }
    /*
     *	����˵���������ͣ����
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    function _onmouseover(){
        var srcElement = event.srcElement;
        if(null==srcElement){
            return;
        }
        if(null!=srcElement._target){
            srcElement = srcElement._target;
        }
        var tagName = srcElement.tagName;
        var scopeName = srcElement.scopeName;

        if(scopeName==_WORKSPACE_NAMESPACE){
            switch(tagName){
                //�����������ť��ִ�й�������
                case _WORKSPACE_TAG_NAME_CONTROLLER_BT:
                    var bt = _display.buttons[srcElement.uniqueID];
                    _onbtover(bt);
                    break;
                default:
                    break;
            }
        }
    }
    /*
     *	����˵��������뿪����
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    function _onmouseout(){
        var srcElement = event.srcElement;
        if(null==srcElement){
            return;
        }
        if(null!=srcElement._target){
            srcElement = srcElement._target;
        }
        var tagName = srcElement.tagName;
        var scopeName = srcElement.scopeName;

        if(scopeName==_WORKSPACE_NAMESPACE){
            switch(tagName){
                //�����������ť��ִ�й�������
                case _WORKSPACE_TAG_NAME_CONTROLLER_BT:
                    var bt = _display.buttons[srcElement.uniqueID];
                    _onbtout(bt);
                    break;
                default:
                    break;
            }
        }
    }
    /*
     *	����˵������갴�²���
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    function _onmousedown(){
        var srcElement = event.srcElement;
        if(null!=srcElement && null!=srcElement._target){
            srcElement = srcElement._target;
        }
        var tagName = srcElement.tagName;
        var scopeName = srcElement.scopeName;

        if(scopeName==_WORKSPACE_NAMESPACE){
            switch(tagName){
                //�����������ť��ִ�й�������
                case _WORKSPACE_TAG_NAME_CONTROLLER_BT:
                    var bt = _display.buttons[srcElement.uniqueID];
                    _onbtdown(bt);
                    break;
                default:
                    break;
            }
        }
    }
    /*
     *	����˵��������ɿ�����
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    function _onmouseup(){
        var srcElement = event.srcElement;
        if(null!=srcElement && null!=srcElement._target){
            srcElement = srcElement._target;
        }
        var tagName = srcElement.tagName;
        var scopeName = srcElement.scopeName;

        if(scopeName==_WORKSPACE_NAMESPACE){
            switch(tagName){
                //�����������ť��ִ�й�������
                case _WORKSPACE_TAG_NAME_CONTROLLER_BT:
                    var bt = _display.buttons[srcElement.uniqueID];
                    _onbtup(bt);
                    break;
                default:
                    break;
            }
        }
    }
    /*
     *	����˵�����ߴ�ı�
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-7-1
     *
     */
    function _onresize(){
        clearTimeout(Event.timeout[_TIMEOUT_RESIZE_NAME]);
        Event.timeout[_TIMEOUT_RESIZE_NAME] = setTimeout(function(){
            _display.refreshTabControllerButtons();
            _display.refreshPhaseControllerButtons();
        },_TIMEOUT_RESIZE);
    }
    /*
     *	����˵����ControllerButton�����ͣ�¼������⣩
     *	������	ControllerButton:bt       ControllerButtonʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _onbtover(bt){
        bt.active();
    }
    /*
     *	����˵����ControllerButton����뿪�¼������⣩
     *	������	ControllerButton:bt       ControllerButtonʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _onbtout(bt){
        bt.inactive();
    }
    /*
     *	����˵����ControllerButton����ɿ��¼������⣩
     *	������	ControllerButton:bt       ControllerButtonʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _onbtup(bt){
        bt.active();
    }
    /*
     *	����˵����ControllerButton��갴���¼������⣩
     *	������	ControllerButton:bt       ControllerButtonʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    function _onbtdown(bt){
        bt.invert();
    }
    /*
     *	����˵����ȡ���¼�
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    function _cancel(){
        event.returnValue = false;
        return false;
    }





    /*
     *	˵�����ؼ����¼�
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    element.onclick = _onclick;
    element.ondblclick = _ondblclick;
//    element.onselectstart = _cancel;
    element.onmouseover = _onmouseover;
    element.onmouseout = _onmouseout;
    element.onmousedown = _onmousedown;
    element.onmouseup = _onmouseup;
    element.onresize = _onresize;