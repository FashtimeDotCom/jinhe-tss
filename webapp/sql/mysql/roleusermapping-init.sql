drop table um_roleusermapping;
create table um_roleusermapping(roleId number(19,0) not null, userId number(19,0) not null, primary key (roleId, userId));

-- ��������ɫ��Ϣ���룬�����������ʵ�ʱ�������û�û��������ɫ��Ȩ�ޣ���Ϊ�������ʲ����Զ������ɫ
insert into um_roleusermapping(ROLEID, USERID) values (-10000, -10000);
commit;