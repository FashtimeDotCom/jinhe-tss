//////////////////////////
//			����			//
//////////////////////////
/*
 * ������
 */
var _TREE_TYPE_SINGLE = "single";
var _TREE_TYPE_MULTI = "multi";
var _TREE_TYPE_MENU = "menu";
/*
 * ���ؼ���������
 */
var _TREE_ATTRIBUTE_BASE_URL = "baseurl";	//����·��
var _TREE_ATTRIBUTE_TREE_TYPE = "treeType";	//������
var _TREE_ATTRIBUTE_SRC = "src";	//����Դ
var _TREE_ATTRIBUTE_SELECTED_SRC = "selected";	//ѡ�нڵ�����Դ
var _TREE_ATTRIBUTE_SELECTED_IDS = "selectedIds";	//ѡ�нڵ�id�ַ���
var _TREE_ATTRIBUTE_CAN_MOVE_NODE = "canMoveNode";	//�Ƿ���϶��ڵ�
var _TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE = "treeNodeSelectedChangeState";	//ѡ�С�����ڵ��Ƿ�ͬ��
var _TREE_ATTRIBUTE_OPEN_WITH_CLICK = "treeNodeClickOpenNode";	//��������Ƿ�չ��/�����ڵ�
var _TREE_ATTRIBUTE_DISABLED_ALL_CHECKTYPE = "allCheckTypeDisabled";	//��ֹ���нڵ�ı�ѡ��״̬
var _TREE_ATTRIBUTE_JUST_SELECT_SELF = "selectSelf";	//ѡ�нڵ�ʱ�������Ǹ��ӹ�ϵ
var _TREE_ATTRIBUTE_FOCUS_NEW_TREE_NODE = "focusNewTreeNode";	//�����ڵ㽹�㲻�Զ��Ƶ��½ڵ���
var _TREE_ATTRIBUTE_DEFAULT_OPEN = "defaultOpen";	//�Ƿ��Զ��򿪽ڵ�
var _TREE_ATTRIBUTE_DEFAULT_ACTIVE = "defaultActive";	//Ĭ�ϼ���ڵ㷽ʽ��none-��ѡ�У�root-ѡ�и��ڵ㣻valid-ѡ�е�һ����Ч�ڵ�

/*
 * ���ؼ�������Ӧ������ֵ
 */
var _TREE_ATTRIBUTE_BASE_URL_DEFAULT_VALUE = "public/htc/Tree/";	//�ؼ�����Ŀ¼
var _TREE_ATTRIBUTE_TREE_TYPE_DEFAULT_VALUE = _TREE_TYPE_SINGLE;
var _TREE_ATTRIBUTE_SRC_DEFAULT_VALUE = null;
var _TREE_ATTRIBUTE_SELECTED_SRC_DEFAULT_VALUE = null;
var _TREE_ATTRIBUTE_SELECTED_IDS_DEFAULT_VALUE = null;
var _TREE_ATTRIBUTE_CAN_MOVE_NODE_DEFAULT_VALUE = "false";	//ֵ�� "true" "false"
var _TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE_SINGLE_DEFAULT_VALUE = "true";	//ֵ�� "true" "false"
var _TREE_ATTRIBUTE_SELECTED_WITH_CHANGE_STATE_MULTI_DEFAULT_VALUE = "false";	//ֵ�� "true" "false"
var _TREE_ATTRIBUTE_OPEN_WITH_CLICK_DEFAULT_VALUE = "false";	//ֵ�� "true" "false"
var _TREE_ATTRIBUTE_DISABLED_ALL_CHECKTYPE_DEFAULT_VALUE = "false";
var _TREE_ATTRIBUTE_JUST_SELECT_SELF_DEFAULT_VALUE = "false";
var _TREE_ATTRIBUTE_FOCUS_NEW_TREE_NODE_DEFAULT_VALUE = "true";
var _TREE_ATTRIBUTE_DEFAULT_OPEN_DEFAULT_VALUE = "true";	
var _TREE_ATTRIBUTE_DEFAULT_ACTIVE_DEFAULT_VALUE = "none";	//��һ����Ч�ڵ�
/*
 * �ڵ���������
 */
var _TREE_XML_NODE_ATTRIBUTE_DEFAULT_OPENED_NODE_ID = "openednodeid";
var _TREE_XML_NODE_ATTRIBUTE_ID = "id";
var _TREE_XML_NODE_ATTRIBUTE_NAME = "name";
var _TREE_XML_NODE_ATTRIBUTE_FULLNAME = "fullname";
var _TREE_XML_NODE_ATTRIBUTE_CANSELECTED = "canselected";
var _TREE_XML_NODE_ATTRIBUTE_CHECKTYPE = "checktype";
var _TREE_XML_NODE_ATTRIBUTE_DISPLAY = "display";
/*
 * �ڵ�����
 */
var _TREE_XML_NODE_NAME = "treeNode";
/*
 * ���ڵ�����
 */
var _TREE_XML_ROOT_NODE_NAME = "actionSet";
/**
 * ��ȫ�����ڵ��IDֵ
 */
var _TREE_XML_ROOT_TREE_NODE_ID = "_rootId";
/*
 * ѡ��״̬ͼ���ַ���ؼ�����Ŀ¼Ϊ��Ŀ¼����ʼ�����С�/����
 */
var _MULTI_NO_CHECKED_IMAGE_SRC = "images/no_checked.gif";
var _MULTI_CHECKED_IMAGE_SRC = "images/checked.gif";
var _MULTI_HALF_CHECKED_IMAGE_SRC = "images/half_checked.gif";
var _SINGLE_NO_SELECTED_IMAGE_SRC = "images/no_selected.gif";
var _SINGLE_SELECTED_IMAGE_SRC = "images/selected.gif";
var _MULTI_CAN_NOT_CHECK_IMAGE_SRC = "images/checkbox_disabled.gif";
var _SINGLE_CAN_NOT_SELECT_IMAGE_SRC = "images/radio_disabled.gif";
/*
 * ����״̬ͼ���ַ
 */
var _TREE_NODE_CONTRACT_IMAGE_SRC = "images/contract.gif";
var _TREE_NODE_EXPAND_IMAGE_SRC = "images/expand.gif";
var _TREE_NODE_LEAF_IMAGE_SRC = "images/leaf.gif";
var _TREE_ROOT_NODE_CONTRACT_IMAGE_SRC = "images/root_contract.gif";
var _TREE_ROOT_NODE_EXPAND_IMAGE_SRC = "images/root_expand.gif";
var _TREE_ROOT_NODE_LEAF_IMAGE_SRC = "images/root_leaf.gif";
/*
 * �ڵ�ѡ����ʽ����
 */
var _TREE_WAIT_LOAD_DATA_MSG = '<span style="margin:5 0 0 8;font-size:12px;color:#666">���ڼ�������...</span>';
/*
 * �ؼ���ʽ��
 */
var _TREE_STYLE_NAME = "Tree";
/*
 * ����Ƶ��ڵ��Ϸ���ʽ
 */
var _TREE_NODE_OVER_STYLE_NAME = "hover";
/*
 * �ڵ��ƶ���ʽ����
 */
var _TREE_NODE_MOVED_STYLE_NAME = "moved";
/*
 * ��ѯ����ڵ���ʽ����
 */
var _TREE_NODE_FINDED_STYLE_NAME = "finded";
/*
 * Ŀ��ڵ㻮����ʽ
 */
var _TREE_NODE_MOVE_TO_LINE_STYLE = "1px solid #333399";
/*
 * Ŀ��ڵ����ػ�����ʽ
 */
var _TREE_NODE_MOVE_TO_HIDDEN_LINE_STYLE = "1px solid #ffffff";
/*
 * �ڵ�ѡ����ʽ����
 */
var _TREE_NODE_SELECTED_STYLE_NAME = "selected";
/*
 * �ڵ�����ͼ����ʽ����
 */
var _TREE_NODE_FOLDER_STYLE_NAME = "folder";
/*
 * �ڵ�ѡ��״̬ͼ����ʽ����
 */
var _TREE_NODE_CHECK_TYPE_STYLE_NAME = "checkType";
/*
 * �ڵ���ʾ���иߣ����أ���ֻ���ڼ�����ʾ�����������ܿ�����ʾʱ�еĸ߶�
 * ���Ҫ�޸���ʾ���иߣ��޸���ʽ�ļ�
 */
var _TREE_NODE_DISPLAY_ROW_HEIGHT = 20;	//������
/*
 * �������Ŀ�ȣ����أ�
 */
var _TREE_SCROLL_BAR_WIDTH = 17;	//������
/*
 * ���ؼ���ʾ����С��ȣ����أ�
 */
var _TREE_BOX_MIN_WIDTH = 10;	//������
/*
 * ���ؼ���ʾ����С�߶ȣ����أ�
 */
var _TREE_BOX_MIN_HEIGHT = 22;	//������
/*
 * �������Ĺ����¼��ӳ�ʱ�䣨���
 */
var _TREE_SCROLL_DELAY_TIME = 0;	//�Ǹ�����
/*
 * �϶��ڵ㵽���ϡ�����ʱѭ�������¼�ÿ���ӳ�ʱ�䣨���
 */
var _TREE_SCROLL_REPEAT_DELAY_TIME = 300;	//�Ǹ�����
/*
 * �ڵ��Զ���ͼ����ʽ����
 */
var _TREE_NODE_ICON_STYLE_NAME = "icon";
/*
 * �ڵ��Զ���ͼ��������
 */
var _TREE_NODE_ICON_ATTRIBUTE = "icon";
/*
 * �ڵ��Զ���ͼ��ߴ�
 */
var _TREE_NODE_ICON_WIDTH = 16;
var _TREE_NODE_ICON_HEIGHT = 16;
/*
 * ��ѯ��ʽ
 */
var _TREE_SEARCH_TYPE_INEXACT_SEARCH = "hazy";	//ģ����ѯ
var _TREE_SEARCH_TYPE_EXACT_SEARCH = "rigor";	//��ȷ��ѯ
/*
 * ��ѯ��ʾ��Ϣ
 */
var _TREE_SEARCH_NO_RESULT_MSG = "û�в�ѯ����Ӧ�Ľ����";	//û�в�ѯ�����
var _TREE_SEARCH_NO_CONDITION_VALUE_MSG = "��ѯ��������Ϊ�գ�";	//û�в�ѯ����ֵ
var _TREE_SEARCH_NO_CONDITION_NAME_MSG = "��ѯ�������������Ʋ���Ϊ�գ�";	//û�в�ѯ��������
