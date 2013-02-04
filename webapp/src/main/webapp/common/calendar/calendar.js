
    /*
     *	��ǩ��
     */
    _TAG_NAME_CALENDAR = "div";
    _TAG_NAME_TABLE = "table";
    _TAG_NAME_TBODY = "tbody";
    _TAG_NAME_TR = "tr";
    _TAG_NAME_TD = "td";
    _TAG_NAME_DIV = "div";
    _TAG_NAME_ARROW = "div";
    /*
     *	����Ψһ�����ǰ׺
     */
    _UNIQUE_ID_CALENDAR_PREFIX = "calendar__id";
    _UNIQUE_ID_DEFAULT_PREFIX = "default__id";
    /*
     *	��ʽ����
     */
    _STYLE_NAME_CALENDAR = "calendar";
    /*
     *	�ض��ַ�
     */
    _STRING_NO_BREAK_SPACE = "&nbsp;";
    /*
     *	������ز���
     */
    _TOTAL_DAY_PER_WEEK = 7;
    _TOTAL_CALENDAR_ROWS = 6;




    /*
     *	�������ƣ�Calendar
     *	ְ�𣺸���������������ʾ����
     *
     */
    function Calendar(date){
        if(null==date){
            date = new Date();
        }
        this.begin = new Date("2000/1/1");
        this.end = new Date("2010/12/31");
        this.date = null;
        this.initDate = date;
        this.today = new Date();
        this.str = "";
        this.monthObj = null;
        this.yearObj = null;
        this.dayObj = null;
        this.tableObj = null;
        this.object = null;
        this.dateStyle = {};
        this.init();
    }
    /*
     *	����˵����Calendar��ʼ��
     *	������  
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.init = function(){
        this.onYearChange = function(){};
        this.onMonthChange = function(){};
        this.onDateChange = function(){};
        this.onDblClickDate = function(){};
    }
    /*
     *	����˵��������������
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-14
     *
     */
    Calendar.prototype.create = function(){
        this.uniqueID = UniqueID.generator(_UNIQUE_ID_CALENDAR_PREFIX);

        //������ѡ���񴴽�
        var table = Element.createElement(_TAG_NAME_TABLE);
        var tbody = Element.createElement(_TAG_NAME_TBODY);
        var tr = Element.createElement(_TAG_NAME_TR);

        table.appendChild(tbody);
        tbody.appendChild(tr);

        table.width = "100%";
        table.border = "0";
        table.cellSpacing = "0";
        table.cellPadding = "0";

        //�·�ѡ�񴴽�
        var td = Element.createElement(_TAG_NAME_TD);
        tr.appendChild(td);
        td.width = "63";
        var str = [];
        str[str.length] = "<select>";
        str[str.length] = "<option value=\"1\">һ��</option>";
        str[str.length] = "<option value=\"2\">����</option>";
        str[str.length] = "<option value=\"3\">����</option>";
        str[str.length] = "<option value=\"4\">����</option>";
        str[str.length] = "<option value=\"5\">����</option>";
        str[str.length] = "<option value=\"6\">����</option>";
        str[str.length] = "<option value=\"7\">����</option>";
        str[str.length] = "<option value=\"8\">����</option>";
        str[str.length] = "<option value=\"9\">����</option>";
        str[str.length] = "<option value=\"10\">ʮ��</option>";
        str[str.length] = "<option value=\"11\">ʮһ��</option>";
        str[str.length] = "<option value=\"12\">ʮ����</option>";
        str[str.length] = "</select>";
        td.innerHTML = str.join("");
        this.monthObj = td.firstChild;

        //���ѡ�񴴽�
        var td = Element.createElement(_TAG_NAME_TD);
        tr.appendChild(td);
        td.width = "63";
        var str = [];
        str[str.length] = "<select>";
        var beginYear = this.begin.getYear();
        var endYear = this.end.getYear() + 1;
        for(var i=beginYear;i<endYear;i++){
            str[str.length] = "<option value=\""+i+"\">"+i+"��</option>";
        }
        str[str.length] = "</select>";
        td.innerHTML = str.join("");
        this.yearObj = td.firstChild;

        //������ʾ����
        var td = Element.createElement(_TAG_NAME_TD);
        tr.appendChild(td);
        var str = [];
        str[str.length] = "<div class=\"day\">&nbsp;</div>";
        td.innerHTML = str.join("");
        this.dayObj = td.firstChild;


        //���ڱ�񴴽�
        var table = Element.createElement(_TAG_NAME_TABLE);
        var tbody = Element.createElement(_TAG_NAME_TBODY);
        var tr = Element.createElement(_TAG_NAME_TR);

        table.appendChild(tbody);
        tbody.appendChild(tr);

        table.width = "100%";
        table.border = "1";
        table.cellSpacing = "0";
        table.cellPadding = "0";
        tr.className = "calendarHeader";

        //���ڱ���ͷ����
        for(var i=0;i<_TOTAL_DAY_PER_WEEK;i++){
            var td = Element.createElement(_TAG_NAME_TD);
            tr.appendChild(td);
            td.innerHTML = ["��","һ","��","��","��","��","��"][i];
        }
        //���ڱ����岿��
        for(var j=0;j<_TOTAL_CALENDAR_ROWS;j++){
            var tr = Element.createElement(_TAG_NAME_TR);
            tbody.appendChild(tr);
            tr.className = "calendarBody";
            for(var i=0;i<_TOTAL_DAY_PER_WEEK;i++){
                var td = Element.createElement(_TAG_NAME_TD);
                tr.appendChild(td);
                td.innerHTML = "&nbsp;";
            }
        }
        this.tableObj = table;
    }
    /*
     *	����˵�������������ݷŵ�ָ��������
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.dockTo = function(object){
        this.create();
        this.gotoDate(this.initDate);
        this.attachEvents();

        this.object = object;
        this.object.innerHTML = "";
        this.object.appendChild(this.monthObj.parentNode.parentNode.parentNode.parentNode);
        this.object.appendChild(this.tableObj);
    }
    /*
     *	����˵�����ͷ�����ʵ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.dispose = function(){
    }
    /*
     *	����˵������ʾָ������
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.gotoDate = function(date){
        //�Ƿ�ı�
        var yearChange = false;
        var monthChange = false;
        var dateChange = false;
        if(null==this.date){
            yearChange = true;
            monthChange = true;
            dateChange = true;
        }else{
            var str1 = this.date.getYear();
            var str2 = date.getYear();
            if(str1!=str2){
                yearChange = true;
            }

            var str1 = this.date.getYear() + this.date.getMonth();
            var str2 = date.getYear() + date.getMonth();
            if(str1!=str2){
                monthChange = true;
            }

            var str1 = this.date.getYear() + this.date.getMonth() + this.date.getDate();
            var str2 = date.getYear() + date.getMonth() + date.getDate();
            if(str1!=str2){
                dateChange = true;
            }
        }

        this.date = date;

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getYear();

        this.dayObj.innerHTML = day;
        this.monthObj.selectedIndex = month;
        this.yearObj.selectedIndex = year - this.begin.getYear();

        this.refreshTable();

        //������ݸı��¼�
        if(true==yearChange){
            this.onYearChange(date);
        }
        //�����·ݸı��¼�
        if(true==monthChange){
            this.onMonthChange(date);
        }
        //�������ڸı��¼�
        if(true==dateChange){
            this.onDateChange(date);
        }
    }
    /*
     *	����˵����ˢ�����ڱ��
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.refreshTable = function(){
        var month = this.date.getMonth();
        var year = this.date.getYear();
        //ָ�����������·ݵ�һ��
        var curMonthFirstDate = new Date(year+"/"+(month+1)+"/1");
        //ָ�����������·����һ��
        var curMonthLastDate = new Date(year+"/"+(month+2)+"/0");

        //��һ�������ڼ�
        var curMonthFirstDay = curMonthFirstDate.getDay();

        var cells = this.tableObj.getElementsByTagName(_TAG_NAME_TD);
        var beginIndex = _TOTAL_DAY_PER_WEEK;
        var offIndex = curMonthFirstDay;
        //�������ڲ���
        for(var i=0;i<curMonthLastDate.getDate();i++){
            var cellIndex = i+beginIndex+offIndex;
            cells[cellIndex].innerHTML = i + 1;

            var className = "";
            if(i==this.date.getDate()-1){
                className = "active";
            }else if(i==this.today.getDate()-1 && this.today.getMonth()==this.date.getMonth() && this.today.getYear()==this.date.getYear()){
                className = "today";
            }

            //�Զ�����ʽ
            var tempStr = year + "-" + month + "-" + (i + 1);
            var tempStyle = this.dateStyle[tempStr];
            if(null!=tempStyle){
                className += " " + tempStyle;
            }
            cells[cellIndex].className = className;
        }
        //�������ڲ���
        var prevMonthLastDate = new Date(year+"/"+(month+1)+"/0");
        for(var i=0;i<offIndex;i++){
            var cellIndex = i+beginIndex;
            cells[cellIndex].innerHTML = prevMonthLastDate.getDate() - offIndex + i + 1;
            cells[cellIndex].className = "prev";
        }
        //�������ڲ���
        var lastIndex = curMonthLastDate.getDate() + beginIndex + offIndex;
        for(var i=lastIndex;i<cells.length;i++){
            cells[i].innerHTML = i - lastIndex + 1;
            cells[i].className = "next";
        }
    }
    /*
     *	����˵�������¼�
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.attachEvents = function(){
        var thisObj = this;
        this.monthObj.onchange = function(eventObj){
            _Calendar_onMonthChange(eventObj,thisObj);
        };
        this.yearObj.onchange = function(eventObj){
            _Calendar_onYearChange(eventObj,thisObj);
        };
        this.tableObj.onclick = function(eventObj){
            _Calendar_onClick(eventObj,thisObj);
        };
        this.tableObj.ondblclick = function(eventObj){
            _Calendar_onDblClick(eventObj,thisObj);
        };
        this.tableObj.onselectstart = function(eventObj){
            if(null==eventObj){
                eventObj = window.event;
            }
            Event.cancel(eventObj);
        }
    }
    /*
     *	����˵��������ָ�����ڵ�Ԫ����ʽ
     *	������
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.setDateStyle = function(date,style){
        var tempStr = date.getYear() + "-" + date.getMonth() + "-" + date.getDate();
        this.dateStyle[tempStr] = style;
        this.refreshTable();    
    }
    /*
     *	����˵�������ı���ʽ���������Ϣ
     *	������	
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    Calendar.prototype.toString = function(){
        var str = [];
        str[str.length] = "[Calendar ����]";
        str[str.length] = "date:" + this.date;
        return str.join("\r\n");

    }




    /*
     *	����˵����ѡ���·�
     *	������  event:eventObj      �¼�����
                Calendar:instance   Calendarʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    function _Calendar_onMonthChange(eventObj,instance){
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = instance.monthObj;

        var year = instance.date.getYear();
        var date = instance.date.getDate();
        var month = srcElement.value;
        var newDate = new Date(year+"/"+month+"/"+date);

        instance.gotoDate(newDate);
    }
    /*
     *	����˵����ѡ�����
     *	������  event:eventObj      �¼�����
                Calendar:instance   Calendarʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    function _Calendar_onYearChange(eventObj,instance){
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = instance.yearObj;

        var month = instance.date.getMonth() + 1;
        var date = instance.date.getDate();
        var year = srcElement.value;
        var newDate = new Date(year+"/"+month+"/"+date);

        instance.gotoDate(newDate);
    }
    /*
     *	����˵����ѡ������
     *	������  event:eventObj      �¼�����
                Calendar:instance   Calendarʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    function _Calendar_onClick(eventObj,instance){
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = Event.getSrcElement(eventObj);

        var cellIndex = srcElement.cellIndex;
        var rowIndex = srcElement.parentNode.rowIndex;
        var absCellIndex = rowIndex * _TOTAL_DAY_PER_WEEK + cellIndex;

        if(0<rowIndex){
            var month = instance.date.getMonth() + 1;
            var year = instance.date.getYear();
            var date = parseInt(srcElement.innerHTML,10);
            if(absCellIndex>(_TOTAL_DAY_PER_WEEK*_TOTAL_CALENDAR_ROWS/2+_TOTAL_DAY_PER_WEEK)){
                if(15>date){
                    month ++;
                }
            }else{
                if(21<date){
                    month --;
                }
            }
            var newDate = new Date(year+"/"+month+"/"+date);
            instance.gotoDate(newDate);
        }
    }
    /*
     *	����˵����˫������
     *	������  event:eventObj      �¼�����
                Calendar:instance   Calendarʵ��
     *	����ֵ��
     *	���ߣ�ë��
     *	���ڣ�2006-4-13
     *
     */
    function _Calendar_onDblClick(eventObj,instance){
        if(null==eventObj){
            eventObj = window.event;
        }
        var srcElement = Event.getSrcElement(eventObj);

        var cellIndex = srcElement.cellIndex;
        var rowIndex = srcElement.parentNode.rowIndex;
        var absCellIndex = rowIndex * _TOTAL_DAY_PER_WEEK + cellIndex;

        if(0<rowIndex){
            var month = instance.date.getMonth() + 1;
            var year = instance.date.getYear();
            var date = parseInt(srcElement.innerHTML,10);
            if(absCellIndex>(_TOTAL_DAY_PER_WEEK*_TOTAL_CALENDAR_ROWS/2+_TOTAL_DAY_PER_WEEK)){
                if(15>date){
                    month ++;
                }
            }else{
                if(21<date){
                    month --;
                }
            }
            var newDate = new Date(year+"/"+month+"/"+date);
            instance.onDblClickDate(newDate,srcElement);
        }
    }