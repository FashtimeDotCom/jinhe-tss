    /*
     *	�������ƣ�Page
     *	ְ�𣺸����������ҳ�����ʾ���ؿ���
     *
     */
    function Page(obj){
        this.isActive = ("none"==obj.currentStyle.display?false:true);
        this.object = obj;
        this.id = obj.id;
		this.init();
    }
    /*
     *	����˵����Page��ʼ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-24
     *
     */
    Page.prototype.init = function(){
    }
    /*
     *	����˵����Page����
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Page.prototype.hide = function(){
        this.object.style.display = "none";
        this.isActive = false;
    }
    /*
     *	����˵����Page��ʾ
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Page.prototype.show = function(){
        this.object.style.display = "block";
        this.object.scrollTop = 0;
        this.object.scrollLeft = 0;
        this.isActive = true;
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Page.prototype.toString = function(){
        var str = [];
        str[str.length] = "[Page ����]";
        str[str.length] = "id = \"" + this.id + "\"";
        str[str.length] = "visible = \"" + this.isActive + "\"";
        return str.join("\r\n");
    }
    /*
     *	����˵��������id��ȡPageʵ��
     *	������	string:id     
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-10
     *
     */
    Page.getInstance = function(id){
        return _display.pages[id];
    }