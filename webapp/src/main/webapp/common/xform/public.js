
    /*
     *	���������
     */
    _BROWSER_IE = "IE";
    _BROWSER_FF = "FF";
    _BROWSER_OPERA = "OPERA";
    _BROWSER = _BROWSER_IE;	
    /*
     *	��������
     */
    _TYPE_NUMBER = "number";
    _TYPE_OBJECT = "object";
    _TYPE_FUNCTION = "function";
    _TYPE_STRING = "string";
    _TYPE_BOOLEAN = "boolean";
    /*
     *	Ĭ��Ψһ�����ǰ׺
     */
    _UNIQUE_ID_DEFAULT_PREFIX = "default__id";






    /*
     *	�������ƣ�Public��ȫ�־�̬����
     *	ְ�𣺸��𹫹�����
     *
     */
    var Public = {};
    /*
     *
     * ����˵���������ʶ��
     * ����ֵ��
     * ���ߣ�ë��
     * ���ڣ�2006-4-18
     *
     */
    Public.checkBrowser = function(){
        var ua = navigator.userAgent.toUpperCase();
        if(ua.indexOf("MSIE")!=-1){
            _BROWSER = _BROWSER_IE;
        }else if(ua.indexOf("FIREFOX")!=-1){
            _BROWSER = _BROWSER_FF;
        }else if(ua.indexOf("OPERA")!=-1){
            _BROWSER = _BROWSER_OPERA;
        }
    }
    Public.checkBrowser();
    /*
     *
     * ����˵����ִ�з���
     * ������	string/function:callback	�ص���������
                any:param					�κ����Ͳ���
     * ����ֵ��	���Ͳ���:returnValue		����ֵ
     * ���ߣ�ë��
     * ���ڣ�2006-4-18
     *
     */
    Public.execCommand = function(callback,param){
        var returnValue = null;
        try{
            switch(typeof(callback)){
                case _TYPE_STRING:
                    returnValue = eval(callback);
                    break;
                case _TYPE_FUNCTION:
                    returnValue = callback(param);
                    break;
                case _TYPE_BOOLEAN:
                    returnValue = callback;
                    break;
            }
        }catch(e){
            returnValue = false;
        }
        return returnValue;
    }
    /*
     *
     * ����˵������ʼ��htc���Ϳؼ�
     * ������	Object:obj			htc�󶨵�HTML����
                string:flag			���htc������ɵ��ض�����
                string:eventName	������ɵ��¼�����
                function:callback	�ص�����
     * ����ֵ��	
     * ���ߣ�ë��
     * ���ڣ�2006-4-18
     *
     */
    Public.initHTC = function (obj,flag,eventName,callback){
        if(obj==null || flag==null || callback==null){
            alert("��Ҫ�Ĳ���Ϊ�գ�����")
            return;
        }
        if(obj[flag]!=true){
            obj[eventName] = function(){
                this[eventName] = null;
                Public.execCommand(callback);
            }
        }else{
            Public.execCommand(callback);
        }
        
    }






    /*
     *	�������ƣ�UniqueID��ȫ�־�̬����
     *	ְ�𣺸������ɶ���Ψһ��ţ�Ϊ�˼���FF��
     *
     */
    var UniqueID = {};
    UniqueID.key = 0;
    /*
     *	����˵��������һ��Ψһ���
     *	������	string:prefix		Ψһ�������ǰ׺
     *	����ֵ��string:uniqueID     Ψһ���
     *	���ߣ�ë��
     *	���ڣ�2006-4-18
     *
     */
    UniqueID.generator = function(prefix){
        var uid = String(prefix||_UNIQUE_ID_DEFAULT_PREFIX) + String(this.key);
        this.key++;
        return uid;
    }




    /*
     *	�������ƣ�Focus��ȫ�־�̬����
     *	ְ�𣺸����������ע���������ľ۽�����
     *
     */
    var Focus = {};
    Focus.items = {};
    Focus.lastID = null;
    /*
     *	����˵����ע�����
     *	������	object:focusObj		��Ҫ�۽���HTML����
     *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Focus.register = function(focusObj){
        var id = focusObj.id;
        //���id���������Զ�����һ��
        if(null==id || ""==id){
            id = UniqueID.generator();
            focusObj.id = id;
        }
        this.items[id] = focusObj;

        this.focus(id);

        return id;
    }
    /*
     *	����˵�����۽�����
     *	������	object:focusObj		��Ҫ�۽���HTML����
     *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Focus.focus = function(id){
        var focusObj = this.items[id];
        if(null!=focusObj && id!=this.lastID){
            if(null!=this.lastID){
                this.blurItem(this.lastID);
            }
            
            this.focusItem(id);
            this.lastID = id;
        }
    }
    /*
     *	����˵����ʩ�Ӿ۽�Ч��
     *	������	string:id			��Ҫ�۽���HTML����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Focus.focusItem = function(id){
        var focusObj = this.items[id];
        if(null!=focusObj){
            focusObj.style.filter = "";
        }
    }
    /*
     *	����˵����ʩ��ʧ��Ч��
     *	������	string:id			��Ҫ�۽���HTML����
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Focus.blurItem = function(id){
        var focusObj = this.items[id];
        if(null!=focusObj){
            focusObj.style.filter = "alpha(opacity=50) gray()";
        }
    }
    /*
     *	����˵�����ͷŶ���
     *	������	object:focusObj		��Ҫ�۽���HTML����
     *	����ֵ��string:id			����ȡ�ؾ۽�HTML�����id
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Focus.unregister = function(id){
        var focusObj = this.items[id];
        if(null!=focusObj){
            delete this.items[id];
        }
        if(id==this.lastID){
            
        }
    }




    /*
     *	�������ƣ�Cache��ȫ�־�̬����
     *	ְ�𣺸��𻺴�ҳ����ȫ��������Ϣ
     *
     */
    var Cache = {};
    Cache.Variables = new Collection();
    Cache.XmlIslands = new Collection();

    /*
     *	�������ƣ�Collection
     *	ְ�𣺸����ȡ���ϳ�Ա
     *
     */
    function Collection(){
        this.items = {};
    }
    /*
     *	����˵������ӳ�Ա
     *	������	string:id       ��Աid
                any:item        ���ϳ�Ա
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Collection.prototype.add = function(id,item){
        this.items[id] = item;
    }
    /*
     *	����˵����ɾ����Ա
     *	������	string:id		Ҫɾ���ĳ�Աid
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Collection.prototype.del = function(id){
        delete this.items[id];
    }
    /*
     *	����˵����������г�Ա
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Collection.prototype.clear = function(){
        this.items = {};
    }
    /*
     *	����˵������ȡ��Ա
     *	������	string:id       Ҫ��ȡ�ĳ�Աid
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-22
     *
     */
    Collection.prototype.get = function(id){
        return this.items[id];
    }
    /*
     *	����˵����ԭ�ͼ̳�
     *	������	function:Class		�����̳е���
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-23
     *
     */
	Collection.prototype.inherit = function(Class){
		var inheritClass = new Class();
		for(var item in inheritClass){
			this[item] = inheritClass[item];
		}
	}







    /*
     *	����˵������չ���飬����������
     *	������	any:item		�������ӵ���
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-23
     *
     */
    Array.prototype.push = function(item){
        this[this.length] = item;
    }