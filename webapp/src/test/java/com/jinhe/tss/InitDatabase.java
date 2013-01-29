package com.jinhe.tss;

import java.util.List;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit38.AbstractTransactionalJUnit38SpringContextTests;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.jinhe.tss.framework.Global;
import com.jinhe.tss.framework.sso.IdentityCard;
import com.jinhe.tss.framework.sso.TokenUtil;
import com.jinhe.tss.framework.sso.context.Context;
import com.jinhe.tss.framework.test.TestUtil;
import com.jinhe.tss.portal.PortalConstants;
import com.jinhe.tss.portal.entity.Decorator;
import com.jinhe.tss.portal.entity.ElementGroup;
import com.jinhe.tss.portal.entity.Layout;
import com.jinhe.tss.portal.service.IElementService;
import com.jinhe.tss.um.UMConstants;
import com.jinhe.tss.um.entity.Group;
import com.jinhe.tss.um.helper.dto.OperatorDTO;
import com.jinhe.tss.um.permission.PermissionService;
import com.jinhe.tss.um.permission.ResourcePermission;
import com.jinhe.tss.um.service.IGroupService;
import com.jinhe.tss.um.service.ILoginService;
import com.jinhe.tss.um.service.IResourceRegisterService;
import com.jinhe.tss.util.XMLDocUtil;

/**
 * 初始化数据库。
 * 
 * 需使用 src/main/resources目录下的配置文件，比如persistence.xml, application.properties等。
 * 另外，初始化时需要把applicationContext.xml的<property name="generateDdl" value="true" /> 设置为true
 */
@ContextConfiguration(
        locations={
          "classpath:spring/framework-applicationContext.xml",  
          "classpath:spring/um-applicationContext.xml",
          "classpath:spring/cms-applicationContext.xml",
          "classpath:spring/portal-applicationContext.xml",
          "classpath:spring/applicationContext.xml"
        } 
      )
@TransactionConfiguration(defaultRollback = false) // 不自动回滚，否则后续的test中没有初始化的数据
public class InitDatabase extends AbstractTransactionalJUnit38SpringContextTests { 
 
    Logger log = Logger.getLogger(this.getClass());    
    
    @Autowired private IResourceRegisterService resourceRegisterService;
    @Autowired private ResourcePermission resourcePermission;
    @Autowired private IGroupService groupService;
    @Autowired private ILoginService loginSerivce;
    @Autowired private PermissionService permissionService;
    
    @Autowired private IElementService elementService;
    
    protected void setUp() throws Exception {
        super.setUp();
        Global.setContext(super.applicationContext);
    }
    
    public void testInitDatabase() {
        log.info("create tss databse schema starting......");
 
        String sqlpath = TestUtil.getInitSQLDir();
        TestUtil.excuteSQL(sqlpath);
 
        //-------------------------------初始化系統的必要数据 --------------------
        // 初始化虚拟登录用户信息
        OperatorDTO loginUser = new OperatorDTO(UMConstants.ADMIN_USER_ID, UMConstants.ADMIN_USER_NAME);
        String token = TokenUtil.createToken("1234567890", UMConstants.ADMIN_USER_ID); 
        IdentityCard card = new IdentityCard(token, loginUser);
        Context.initIdentityInfo(card);
        
        // 获取登陆用户的权限（拥有的角色）并保存到用户权限（拥有的角色）对应表
        List<Object[]> userRoles = loginSerivce.getUserRolesAfterLogin(UMConstants.ADMIN_USER_ID);
        permissionService.saveUserRolesAfterLogin(userRoles, UMConstants.ADMIN_USER_ID);
        
        initUM();
        initPortal();
        
        log.info("init tss databse base data over.");
    }
 
    /**
     * 初始化UM、CMS、Portal相关应用、资源类型、权限选型信息
     */
    private void initUM() {
        /* 初始化应用系统、资源、权限项 */
        String sqlpath = TestUtil.getInitSQLDir();
        Document doc = XMLDocUtil.createDocByAbsolutePath(sqlpath + "/tss-application-config.xml");
        resourceRegisterService.setInitial(true);
        resourceRegisterService.applicationRegisterByXML(doc, UMConstants.PLATFORM_SYSTEM_APP);
        resourceRegisterService.setInitial(false);
        
        // 补全SQL初始化出来的系统级用户组
        Long[] groupIds = new Long[] {-2L, -3L, -4L, -7L, -8L, -9L};
        for(Long groupId : groupIds) {
            Group group = groupService.getGroupById(groupId);
            if ( Group.MAIN_GROUP_TYPE.equals( group.getGroupType() ) ) {
                resourcePermission.addResource(group.getId(), UMConstants.MAINGROUP_RESOURCE_TYPE_ID);
            }
            if ( Group.ASSISTANT_GROUP_TYPE.equals( group.getGroupType() )) {
                resourcePermission.addResource(group.getId(), UMConstants.ASSISTANTGROUP_RESOURCE_TYPE_ID);
            }
            if ( Group.OTHER_GROUP_TYPE.equals( group.getGroupType() ) ) {
                resourcePermission.addResource(group.getId(), UMConstants.OTHERAPPGROUP_RESOURCE_TYPE_ID);
            }
        }
    }
    
    /** 初始化默认的修饰器，布局器 */
    private void initPortal() {
        ElementGroup defaultLayoutGroup = new ElementGroup();
        defaultLayoutGroup.setName("默认布局器组");
        defaultLayoutGroup.setType(ElementGroup.LAYOUT_TYPE);
        defaultLayoutGroup.setParentId(PortalConstants.ROOT_ID);   
        defaultLayoutGroup = elementService.saveGroup(defaultLayoutGroup);
        
        Layout defaultLayout = new Layout();
        defaultLayout.setIsDefault(PortalConstants.TRUE);
        defaultLayout.setGroupId(defaultLayoutGroup.getId());   
        Document document = XMLDocUtil.createDoc("template/initialize/defaultLayout.xml");
        Element propertyElement = document.getRootElement().element("property");
        String layoutName = propertyElement.elementText("name");
        defaultLayout.setName(layoutName);
        defaultLayout.setPortNumber(new Integer(propertyElement.elementText("portNumber")));
        defaultLayout.setDefinition(document.asXML());
        elementService.saveElement(defaultLayout);
        
        ElementGroup defaultDecoratorGroup = new ElementGroup();
        defaultDecoratorGroup.setName("默认修饰器组");
        defaultDecoratorGroup.setType(ElementGroup.DECORATOR_TYPE);
        defaultDecoratorGroup.setParentId(PortalConstants.ROOT_ID);  
        defaultDecoratorGroup = elementService.saveGroup(defaultDecoratorGroup);
        
        Decorator defaultDecorator = new Decorator();
        defaultDecorator.setIsDefault(PortalConstants.TRUE);
        defaultDecorator.setGroupId(defaultDecoratorGroup.getId());
        
        document = XMLDocUtil.createDoc("template/initialize/defaultDecorator.xml");
        propertyElement = document.getRootElement().element("property");
        String decoratorName = propertyElement.elementText("name");
        defaultDecorator.setName(decoratorName);
        defaultDecorator.setDefinition(document.asXML());
        elementService.saveElement(defaultDecorator);
    }
}