
    



    /*
     *	�������ƣ�ControllerButton
     *	ְ�𣺸������ɿ�������ť
     *
     */
    function ControllerButton(type,imgSrc){
		this.type = type;
        this.imgSrc = imgSrc;
        this.uniqueID = null;
        this.object = null;
        this.link = null;
        this.enable = true;
        this.init();
    }
    /*
     *	����˵������ʼ����������ť
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    ControllerButton.prototype.init = function(){
        this.create();
    }
    /*
     *	����˵����������������ť
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    ControllerButton.prototype.create = function(){
        var img = _display.createElement(_WORKSPACE_TAG_NAME_IMG);
        var object = _display.createElement(_WORKSPACE_TAG_NAME_CONTROLLER_BT,_WORKSPACE_NAMESPACE);

        img.src = (element.baseurl||"") + this.imgSrc;
        img._target = object;
		img.width = _SIZE_IMG;
		img.height = _SIZE_IMG;
        object.appendChild(img);

        this.object = object;
        this.uniqueID = object.uniqueID;
    }
    /*
     *	����˵��������ť����ָ������
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    ControllerButton.prototype.dockTo = function(container){
        container.appendChild(this.object);
    }
    /*
     *	����˵�����ͷŰ�ťʵ��
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    ControllerButton.prototype.dispose = function(){
		_display.buttons[this.uniqueID] = null;
		delete _display.buttons[this.uniqueID];

        this.object.removeNode(true);

        this.imgSrc = null;
        this.uniqueID = null;
        this.object = null;
        this.link = null;
    }
    /*
     *	����˵��������ť��Ҫִ�еĲ�������
     *	������	Function:func   Ҫִ�еĲ���
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    ControllerButton.prototype.linkTo = function(func){
        this.link = func;
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    ControllerButton.prototype.toString = function(){
        var str = [];
        str[str.length] = "[ControllerButton ����]";
        str[str.length] = "uniqueID = \"" + this.uniqueID+ "\"";
        str[str.length] = "link = \"" + this.link+ "\"";
        return str.join("\r\n");
    }
    /*
     *	����˵��������ť��Ҫִ�еĲ�������
     *	������	Function:func   Ҫִ�еĲ���
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-12
     *
     */
    ControllerButton.prototype.click = function(){
        this.link();
    }
    /*
     *	����˵����������ť
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    ControllerButton.prototype.active = function(){
        if(true==this.enable){
            this.object.className = _CLASS_NAME_CONTROLLER_BT_ACTIVE;
        }
    }
    /*
     *	����˵����������ť
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    ControllerButton.prototype.inactive = function(){
        if(true==this.enable){
            this.object.className = _CLASS_NAME_NO_CLASS;
        }
    }
    /*
     *	����˵�������װ�ť
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-11
     *
     */
    ControllerButton.prototype.invert = function(){
        if(true==this.enable){
            this.object.className = _CLASS_NAME_CONTROLLER_BT_INVERT;
        }
    }
    /*
     *	����˵�������ð�ť�Ƿ��������
     *	������	boolean:enable      �Ƿ�����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-7-1
     *
     */
    ControllerButton.prototype.setEnable = function(enable){
        this.enable = enable;
        this.object.className = enable?_CLASS_NAME_NO_CLASS:_CLASS_NAME_CONTROLLER_BT_DISABLED;
    }