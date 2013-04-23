var Debug = {};
Debug.print = function(str, clear) {
	var debugObj = window.document.getElementById("debug");
	if(debugObj == null) {
		debugObj = window.document.createElement("textarea");
		debugObj.id = "debug";
		debugObj.readOnly = true;
		debugObj.cols = 80;
		debugObj.row = 60;
		debugObj.style.border = "1px solid gray";

		var clearObj = window.document.createElement("div");
		clearObj.style.position = "absolute";
		clearObj.style.right = "3px";
		clearObj.style.top = "0px";
		clearObj.style.fontSize = "10px";
		clearObj.style.fontFamily = "Verdana";
		clearObj.style.cursor = "hand";
		clearObj.innerHTML = "clear";

		var boxObj = window.document.createElement("div");
		boxObj.style.position = "absolute";
		boxObj.style.left = "200px";
		boxObj.style.top = "150px";
		boxObj.style.border = "1px solid gray";
		boxObj.style.paddingTop = "12px";
		boxObj.style.paddingLeft = "2px";
		boxObj.style.paddingRight = "2px";
		boxObj.style.paddingBottom = "2px";
		boxObj.style.backgroundColor = "#CCCCFF";

		window.document.body.appendChild(boxObj);
		boxObj.appendChild(debugObj);
		boxObj.appendChild(clearObj);

		clearObj.onclick = function(eventObj) {
			debugObj.value = "";
		}

		debugObj.onmousedown = function(eventObj) {
			eventObj = eventObj || event;
			eventObj.returnValue = false;

		    // ��ֹ�¼�ð�ݴ��ݣ������ø�Ԫ�ػ�ȡ����Ԫ�ص��¼���debugObj.onmousedown�����ᴫ�ݵ�boxObj
			eventObj.cancelBubble = true;
		}

		boxObj.onblur = function(eventObj) {
			boxObj.style.display = "none"; // ʧȥ�������������
		}
		boxObj.onmousedown = function(eventObj) {
			eventObj = eventObj || event;

			this.isMouseDown = true;

			// �������أ��������������ƶ�
			Event.setCapture(this, Event.MOUSEMOVE | Event.MOUSEUP);

			this.offX = eventObj.clientX - this.offsetLeft; 
			this.offY = eventObj.clientY - this.offsetTop;
		}
		boxObj.onmouseup = function(eventObj) {
			this.isMouseDown = false;
			
			// �ͷ������
			Event.setCapture(this, Event.MOUSEMOVE | Event.MOUSEUP);
		}
		boxObj.onmousemove = function(eventObj) {
			eventObj = eventObj || event;
			if(this.isMouseDown == true) {
				this.style.left = eventObj.clientX - this.offX;
				this.style.top = eventObj.clientY - this.offY;
			}
		}

		debugObj.focus();
	}
	else {
		debugObj.parentNode.style.display = "";
		debugObj.focus();
	}

	if(true == clear) {
		debugObj.value = "";
	}

	debugObj.value += str + "\r\n";
	debugObj.scrollTop = debugObj.scrollHeight;
}