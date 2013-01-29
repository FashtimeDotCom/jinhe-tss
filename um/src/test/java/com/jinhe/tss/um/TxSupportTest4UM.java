package com.jinhe.tss.um;

import java.util.List;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit38.AbstractTransactionalJUnit38SpringContextTests;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.jinhe.tss.framework.Global;
import com.jinhe.tss.framework.component.log.LogService;
import com.jinhe.tss.framework.sso.IdentityCard;
import com.jinhe.tss.framework.sso.TokenUtil;
import com.jinhe.tss.framework.sso.context.Context;
import com.jinhe.tss.framework.test.IH2DBServer;
import com.jinhe.tss.framework.test.TestUtil;
import com.jinhe.tss.um.entity.Group;
import com.jinhe.tss.um.helper.dto.OperatorDTO;
import com.jinhe.tss.um.permission.PermissionHelper;
import com.jinhe.tss.um.permission.PermissionService;
import com.jinhe.tss.um.permission.ResourcePermission;
import com.jinhe.tss.um.service.IGroupService;
import com.jinhe.tss.um.service.ILoginService;
import com.jinhe.tss.um.service.IResourceRegisterService;
import com.jinhe.tss.util.XMLDocUtil;

/**
 * Junit Test 类里执行构造函数的时候无事务，即构造函数不在单元测试方法的事物边界内。
 */
@ContextConfiguration(
        locations={
          "classpath:spring/testUMApplicationContext.xml",  
          "classpath:spring/framework-applicationContext.xml",  
          "classpath:spring/um-applicationContext.xml"
        } 
        , inheritLocations = false // 是否要继承父测试用例类中的 Spring 配置文件，默认为 true
      )
@TransactionConfiguration(defaultRollback = false) // 不自动回滚，否则后续的test中没有初始化的数据
public abstract class TxSupportTest4UM extends AbstractTransactionalJUnit38SpringContextTests { 
 
    protected Logger log = Logger.getLogger(this.getClass());    
    
    @Autowired protected IResourceRegisterService resourceRegisterService;
    @Autowired protected ResourcePermission resourcePermission;
    @Autowired protected IGroupService groupService;
    @Autowired protected ILoginService loginSerivce;
    @Autowired protected PermissionService permissionService;
    @Autowired protected PermissionHelper permissionHelper;
    @Autowired protected LogService logService;
    
    @Autowired protected IH2DBServer dbserver;
    
    protected void tearDown() throws Exception {
        super.tearDown();
        dbserver.stopServer();
    }
 
    protected void setUp() throws Exception {
        super.setUp();
        Global.setContext(super.applicationContext);
        Context.setResponse(new MockHttpServletResponse());
        
        // DB数据在一轮跑多个单元测试中初始化一次就够了。
        if( dbserver.isPrepareed() ) {
            return;
        }
        
        init();
        
        dbserver.setPrepareed(true);
    }
 
    /**
     * 初始化UM、CMS、Portal相关应用、资源类型、权限选型信息
     */
    protected void init() {
        // 初始化数据库脚本
    	String sqlpath = TestUtil.getInitSQLDir();
    	log.info( " sql path : " + sqlpath);
        TestUtil.excuteSQL(sqlpath + "/framework");
        TestUtil.excuteSQL(sqlpath + "/um");
        
        // 初始化虚拟登录用户信息
        login(UMConstants.ADMIN_USER_ID, UMConstants.ADMIN_USER_NAME);
        
        /* 初始化应用系统、资源、权限项 */
        Document doc = XMLDocUtil.createDocByAbsolutePath(TestUtil.getSQLDir() + "/um-application-config.xml");
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
        
    protected void login(Long userId, String loginName) {
    	OperatorDTO loginUser = new OperatorDTO(userId, loginName);
    	String token = TokenUtil.createToken("1234567890", userId); 
        IdentityCard card = new IdentityCard(token, loginUser);
        Context.initIdentityInfo(card);
        
        // 获取登陆用户的权限（拥有的角色）并保存到用户权限（拥有的角色）对应表
        List<Object[]> userRoles = loginSerivce.getUserRolesAfterLogin(userId);
        permissionService.saveUserRolesAfterLogin(userRoles, userId);
    }
}