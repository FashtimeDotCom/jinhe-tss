-- �Ż��ṹ��Դ��ͼ
drop table view_Portal_resources cascade constraints;
CREATE VIEW view_Portal_resources AS
SELECT 0 as id, 'ȫ��' as name, -1 as parentId, 1 as seqNo, 1 AS levelNo, '00001' as decode FROM dual
UNION
SELECT id, name, parentId, seqNo, levelNo, decode FROM pms_portal_structure;

-- �˵���Դ��ͼ
drop table view_menu_resources cascade constraints;
CREATE VIEW view_menu_resources AS
SELECT 0 as id, 'ȫ��' as name, -1 as parentId, 1 as seqNo, 1 as levelNo, '00001' as decode FROM dual
union
select id, name, parentid, seqno, levelno, decode from pms_menu;