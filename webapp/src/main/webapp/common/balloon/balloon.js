
    /* ��ǩ�� */
    _TAG_NAME_BALLOON = "div";
    _TAG_NAME_TABLE = "table";
    _TAG_NAME_TBODY = "tbody";
    _TAG_NAME_TR = "tr";
    _TAG_NAME_TD = "td";
    _TAG_NAME_DIV = "div";
    _TAG_NAME_ARROW = "div";
	
    /* ����Ψһ�����ǰ׺ */
    _UNIQUE_ID_BALLOON_PREFIX = "balloon__id";
    _UNIQUE_ID_DEFAULT_PREFIX = "default__id";
	
    /* ��ʽ���� */
    _STYLE_NAME_BALLOON = "balloon";
    _STYLE_NAME_BALLOON_CONTENT = "content";
    _STYLE_NAME_BALLOON_ARROW_1 = "arrow_1";
    _STYLE_NAME_BALLOON_ARROW_2 = "arrow_2";
    _STYLE_NAME_BALLOON_ARROW_3 = "arrow_3";
    _STYLE_NAME_BALLOON_ARROW_4 = "arrow_4";
	
    /* �ض��ַ� */
    _STRING_NO_BREAK_SPACE = "&nbsp;";
	
    /* �ߴ� */
    _SIZE_BALLOON_ARROW_HEIGHT = 15;
    _SIZE_BALLOON_CONTENT_WIDTH = 210;
    _SIZE_BALLOON_CONTENT_HEIGHT = 50;
    _SIZE_BALLOON_ARROW_OFFX = 10;
    _SIZE_BALLOON_ARROW_OFFY = 10;
    
	/* �ļ�·�� */
    _SRC_ARROW_1 = "balloon_01.gif";
    _SRC_ARROW_2 = "balloon_02.gif";
    _SRC_ARROW_3 = "balloon_03.gif";
    _SRC_ARROW_4 = "balloon_04.gif";



    /*
     *	�������ƣ�Balloons��ȫ�־�̬����
     *	ְ�𣺸����������������ʾ����
     */
    var Balloons = {};
    Balloons.nextDepth = 1000;
    Balloons.singleInstance = true;
    Balloons.items = {};

    /*
     *	����˵������ȡ��һ�����  
     *	����ֵ��number:nextPath     ��һ�����
     */
    Balloons.getNextDepth = function() {
        var nextDepth = this.nextDepth;
        this.nextDepth ++;
        return nextDepth;
    }
	
    /*
     *	����˵��������һ��������
     *	������  string:content  ������ʾ������
     *	����ֵ��Balloonʵ��
	 */
    Balloons.create = function(content) {
        // ���ֻ������ʵ�����Ƚ������
        if(true == this.singleInstance) {
            this.dispose();
        }

        var balloon = new Balloon(content);
        this.items[balloon.uniqueID] = balloon;

        return balloon;
    }
	
    /*
     *	����˵���������������ʵ��
     */
    Balloons.dispose = function() {
        for(var item in this.items) {
            var curBalloon = this.items[item];
            curBalloon.dispose();
        }
        this.items = {};
    }
	
    /*
     *	����˵����ͳ��������������
     */
    Balloons.count = function() {
        var count = 0;
        for(var item in this.items) {
            count ++;
        }
        return count;
    }
	
    /*
     *	����˵�������ı���ʽ���������Ϣ
     */
    Balloons.toString = function() {
        var str = [];
        str[str.length] = "[Balloons ����]";
        str[str.length] = "singleInstance:" + this.singleInstance;
        str[str.length] = "items:" + this.count();
        return str.join("\r\n");

    }


	
    /*
     *	�������ƣ�Balloon
     *	ְ�𣺸���������������ʾ����
     */
    function Balloon(content) {
        this.content = content;
        this.uniqueID = null;
        this.object = null;
        this.timeout = null;
        this.init();
    }
	
    /*
     *	����˵����Balloon��ʼ��
     */
    Balloon.prototype.init = function() {
        this.create();
        this.attachEvents();
    }
	
    /*
     *	����˵��������������
     */
    Balloon.prototype.create = function() {
        this.uniqueID = UniqueID.generator(_UNIQUE_ID_BALLOON_PREFIX);

        var table = document.createElement(_TAG_NAME_TABLE);
        var tbody = document.createElement(_TAG_NAME_TBODY);       
        for(var i = 0; i < 3;i ++) {
            var tr = document.createElement(_TAG_NAME_TR);
            var td = document.createElement(_TAG_NAME_TD);
            if(1 == i) {
				var div = document.createElement(_TAG_NAME_DIV);
                div.innerHTML = this.content;               
                td.appendChild(div);
				td.className = _STYLE_NAME_BALLOON_CONTENT;
            }
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        table.border = 0;
        table.cellSpacing = 0;
        table.cellPadding = 0;

        var temp = document.createElement(_TAG_NAME_BALLOON);
        temp.className = _STYLE_NAME_BALLOON;
        temp.appendChild(table);
		
		this.object = temp;
        this.object.id = this.uniqueID;
    }
	
    /*
     *	����˵������λ����
     *	������  number:x		����x
                number:y		����y
				number:delay	��ʱ
				------------------------------------
				object:x		��Ϊ�ο����Ŀ�����
				number:y		��ʱ
     */
    Balloon.prototype.dockTo = function(x, y, delay) {
        if(typeof(x) == _TYPE_OBJECT && null != x.parentNode) {
            var obj = x;
            var delay = y;
            var x = Element.absLeft(obj) + _SIZE_BALLOON_ARROW_OFFX;
            var y = Element.absTop(obj)  + _SIZE_BALLOON_ARROW_OFFY;
            this.dockTo(x, y, delay);
        }
		else if(typeof(x) == _TYPE_NUMBER) {
			var type = 1;
			if( (x + _SIZE_BALLOON_CONTENT_WIDTH) > (document.body.clientWidth + document.body.scrollLeft) ) {
				x -= _SIZE_BALLOON_CONTENT_WIDTH;
				type += 1;
			}
			if( (y - _SIZE_BALLOON_CONTENT_HEIGHT - _SIZE_BALLOON_ARROW_HEIGHT) < document.body.scrollTop) {
				type += 2;
			}
			else {
				y -= _SIZE_BALLOON_CONTENT_HEIGHT + _SIZE_BALLOON_ARROW_HEIGHT;            
			}

			this.bringToTop();
			this.addArrow(type);
			this.moveTo(x, y);
			this.duration(delay);

			document.body.appendChild(this.object);
			Element.hideConflict(this.object);
        }
    }
	
    /*
     *	����˵�����ƶ�����
     *	������  number:x  ����x
                number:y  ����y
     */
    Balloon.prototype.moveTo = function(x, y) {
        if(null != this.object) {
            this.object.style.left = x;
            this.object.style.top = y;
        }
    }
	
    /*
     *	����˵�����������������
     */
    Balloon.prototype.bringToTop = function() {
        if(null != this.object) {
            this.object.style.zIndex = Balloons.getNextDepth();
        }
    }
	
    /*
     *	����˵���������������ʱ��
     *	������  number:delay    ����ʱ��(ms)
     */
    Balloon.prototype.duration = function(delay) {
        clearTimeout(this.timeout);

		var thisObj = this;
		this.timeout = setTimeout(function() {
			thisObj.dispose();
		}, delay || 5000);
    }
	
    /*
     *	����˵������������ͷ
     */
    Balloon.prototype.addArrow = function(type) {
        var arrow = document.createElement(_TAG_NAME_ARROW);
        switch(type) {
            case 1:
            default:
                arrow.className = _STYLE_NAME_BALLOON_ARROW_1;

                var td = this.object.firstChild.firstChild.childNodes[2].childNodes[0];
                td.height = _SIZE_BALLOON_ARROW_HEIGHT;
                td.innerHTML = _STRING_NO_BREAK_SPACE;
                td.appendChild(arrow);
                td.insertBefore(arrow, td.firstChild);
                break;
            case 2:
                arrow.className = _STYLE_NAME_BALLOON_ARROW_2;

                var td = this.object.firstChild.firstChild.childNodes[2].childNodes[0];
                td.height = _SIZE_BALLOON_ARROW_HEIGHT;
                td.align = "right";
                td.innerHTML = _STRING_NO_BREAK_SPACE;
                td.appendChild(arrow);
                break;
            case 3:
                arrow.className = _STYLE_NAME_BALLOON_ARROW_3;

                var td = this.object.firstChild.firstChild.childNodes[0].childNodes[0];
                td.height = _SIZE_BALLOON_ARROW_HEIGHT;
                td.innerHTML = _STRING_NO_BREAK_SPACE;
                td.appendChild(arrow);
                td.insertBefore(arrow, td.firstChild);
                break;
            case 4:
                arrow.className = _STYLE_NAME_BALLOON_ARROW_4;

                var td = this.object.firstChild.firstChild.childNodes[0].childNodes[0];
                td.height = _SIZE_BALLOON_ARROW_HEIGHT;
                td.align = "right";
                td.innerHTML = _STRING_NO_BREAK_SPACE;
                td.appendChild(arrow);
                break;
        }
    }
	
    /*
     *	����˵�����ͷ�����ʵ��
     */
    Balloon.prototype.dispose = function() {
        delete Balloons.items[this.uniqueID];
		Element.showConflict(this.object);
        Element.removeNode(this.object);

        for(var item in this) {
            delete this[item];
        }
		
		Event.detachEvent(document, "mousedown", _Balloon_Document_onMouseDown);
    }
	
    /*
     *	����˵�������¼�
     */
    Balloon.prototype.attachEvents = function() {
        if(null!=this.object) {
            this.object.onmousedown = _Balloon_onMouseDown;
            this.object.onmouseup   = _Balloon_onMouseUp;
            this.object.onmousemove = _Balloon_onMouseMove;
            this.object.oncontextmenu = _Balloon_onContextMenu;

            Event.attachEvent(document,"mousedown",_Balloon_Document_onMouseDown);
        }
    }
	
    /*
     *	����˵�������ı���ʽ���������Ϣ
     */
    Balloon.prototype.toString = function() {
        var str = [];
        str[str.length] = "[Balloon ����]";
        str[str.length] = "uniqueID:" + this.uniqueID;
        str[str.length] = "content:"  + this.content;
        return str.join("\r\n");
    }



    /*
     *	����˵���������ĵ�������갴��
     */
    function _Balloon_Document_onMouseDown() {
        Balloons.dispose();
    }
	
    /*
     *	����˵������갴��
     */
    function _Balloon_onMouseDown(eventObj) {
        eventObj = eventObj || window.event;
		
        var srcElement = this;
        if(true == Event.fireOnScrollBar(eventObj)) {
            Event.cancelBubble(eventObj);
        }
		else {
            _Balloon_onBalloonCapture(srcElement, eventObj);
        }
    }
	
    /*
     *	����˵��������ɿ�
     */
    function _Balloon_onMouseUp(eventObj) {
        var srcElement = this;
        _Balloon_onBalloonRelease(srcElement, eventObj || window.event);
    }
	
    /*
     *	����˵��������ƶ�
     */
    function _Balloon_onMouseMove(eventObj) {
        var srcElement = this;
        _Balloon_onBalloonMove(srcElement, eventObj || window.event);
    }
	
    /*
     *	����˵��������Ҽ����
     */
    function _Balloon_onContextMenu(eventObj) {
        var srcElement = this;
        _Balloon_onBalloonClose(srcElement, eventObj || window.event);
    }
	
    /*
     *	����˵������갴�����������¼���
     *	������  object:srcElement   HTML����
                event:eventObj      �¼�����
     */
    function _Balloon_onBalloonCapture(srcElement, eventObj) {
        srcElement.isMouseDown = true;
        srcElement.offsetX = eventObj.clientX - srcElement.offsetLeft;
        srcElement.offsetY = eventObj.clientY - srcElement.offsetTop;
        Event.setCapture(srcElement, Event.MOUSEMOVE | Event.MOUSEUP);
        Event.cancelBubble(eventObj);

        var balloon = Balloons.items[srcElement.id];
        balloon.bringToTop();
    }
	
    /*
     *	����˵��������ɿ����������¼���
     *	������  object:srcElement   HTML����
     */
    function _Balloon_onBalloonRelease(srcElement) {
        srcElement.isMouseDown = false;
        Event.releaseCapture(srcElement, Event.MOUSEMOVE | Event.MOUSEUP);
    }
	
    /*
     *	����˵��������϶����������¼���
     *	������  object:srcElement   HTML����
                event:eventObj      �¼�����
     */
    function _Balloon_onBalloonMove(srcElement, eventObj) {
        if( srcElement.isMouseDown ) {
            var x = eventObj.clientX - srcElement.offsetX;
            var y = eventObj.clientY - srcElement.offsetY;
            var id = srcElement.id;
            var balloon = Balloons.items[id];

            balloon.moveTo(x, y);
        }
    }
	
    /*
     *	����˵��������Ҽ�������������¼���
     *	������  object:srcElement   HTML����
                event:eventObj      �¼�����
     */
    function _Balloon_onBalloonClose(srcElement, eventObj) {
         Event.cancel(eventObj);
        
        var balloon = Balloons.items[srcElement.id];
        balloon.dispose();
    }
	