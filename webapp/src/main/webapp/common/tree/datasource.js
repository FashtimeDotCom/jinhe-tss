/*
 *	��    �ƣ�	����Դ����
 *	����������	�˶�����Ҫʵ�ֻ�ȡ�ؼ����ݣ��Լ����ݵĳ��ô����ܣ�
 *	
 */


/*
 * ����˵��������Դ����
 * ������
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2004-12-21
 */
function DataSource(src) {
	this.xmlRoot = this.loadXml(src);
}


/*
 * ����˵����ԭ�ͼ̳�
 * ������
 * ����ֵ��
 * ���ߣ�����
 * ʱ�䣺2004-12-21
 */
DataSource.prototype = new function () {
	/*
	 * ����˵������������Դ��ȡ����
	 * ������	src	����Դ����/�ļ�·��
	 * ����ֵ��	xmlDom���ڵ�
	 * ���ߣ�����
	 * ʱ�䣺2004-12-21
	 */
	this.loadXml = function (src) {
	    if(src == null || (typeof(src) == "string" && src =="")){	//û�ж���
			return null;
		}
		if(typeof(src) == "object"
			&& (src.tagName == _TREE_XML_ROOT_NODE_NAME || src.tagName == _TREE_XML_NODE_NAME)
			&& src.nodeTypeString == "element"){
			//2006-4-27 ��ʹ�ø�����ֱ������
			//return src.cloneNode(true);
			return src;
		}
		try{
			eval("src = " + src + ";");
			if(src == null || (typeof(src) == "string" && src =="")){	//û�ж���
				return null;
			}
			if(typeof(src) == "object"){
				if(/^xml$/.test(src.tagName) && src.nodeTypeString == "document"){	//xml���ݵ�
					//2006-4-27 ��ʹ�ø�����ֱ������
					//return src.documentElement.cloneNode(true);
					return src.documentElement;
				}
				if((src.tagName == _TREE_XML_ROOT_NODE_NAME || src.tagName == _TREE_XML_NODE_NAME)
					 && src.nodeTypeString == "element"){	//xml�ڵ�
					//2006-4-27 ��ʹ�ø�����ֱ������
					//return src.cloneNode(true);
					return src;
				}
				throw("DataSource:װ�����ݳ���!������Դ���Ͳ��Ϸ���");
			}
		}catch(e){
		}
		try{
			//����xml�����ļ�/xml�����ַ���
			var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
			xmlDom.async = false;
			if (xmlDom.loadXML(src)){	//��srcΪxml����ʱ��������
				return xmlDom.documentElement;
			}
			if (xmlDom.load(src)) {		//��srcΪ�ļ�·��ʱ��������
				return xmlDom.documentElement;
			}
		}catch(e){
		}
		alert("DataSource:װ�����ݳ���!");
		return null;
	}
}