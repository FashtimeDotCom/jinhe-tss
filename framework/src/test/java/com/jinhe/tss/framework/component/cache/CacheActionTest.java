package com.jinhe.tss.framework.component.cache;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jinhe.tss.cache.Cacheable;
import com.jinhe.tss.cache.JCache;
import com.jinhe.tss.cache.Pool;
import com.jinhe.tss.framework.TxTestSupport;
import com.jinhe.tss.framework.component.param.Param;
import com.jinhe.tss.framework.component.param.ParamManager;

public class CacheActionTest extends TxTestSupport {
	
	@Autowired private CacheAction action;
 
    @Test
	public void testCacheAction() {
		action.getAllCacheStrategy4Tree(response);
		
		action.getPoolsGrid(response);
		
		String poolCode = "threadpool";
		action.getCacheStrategyInfo(response, poolCode);
		
		action.releaseCache(response, poolCode);
		action.initPool(response, poolCode);
		
		action.viewCachedItem(response, poolCode, "WorkThread_6");
		action.viewCachedItem(response, poolCode, "not-exist-key");
		
		action.removeCachedItem(response, poolCode, "WorkThread_6");
		action.removeCachedItem(response, poolCode, "not-exist-key-2");
	}
 
    @Test
	public void testModifyCacheConfig() {
		action.modifyCacheConfig(response, "connectionpool", "{\"poolSize\":\"20\", \"initNum\":\"10\"}");
		action.modifyCacheConfig(response, "connectionpool", "{\"poolSize\":\"8\", \"initNum\":\"6\"}");
		action.modifyCacheConfig(response, "connectionpool", "{\"poolSize\":\"8\", \"cyclelife\":\"10000\"}");
		action.modifyCacheConfig(response, "connectionpool", "{\"poolSize\":\"8\", \"cyclelife\":\"10000\", \"poolContainerClass\":\"com.jinhe.tss.cache.extension.EhcacheContainer\"}");
		
		JCache jCache = JCache.getInstance();
		Pool pool = jCache.getConnectionPool();
		for(int i = 0; i < 8; i++) {
			pool.checkOut(0);
		}
		
		try {
			pool.checkOut(0);
			Assert.fail("should throw exception but didn't.");
		} catch(Exception e) {
			Assert.assertTrue("缓存池【服务数据缓存（短期）】已满，且各缓存项都处于使用状态，需要等待。可考虑重新设置缓存策略！", true);
		}
		
		action.modifyCacheConfig(response, "connectionpool", "{\"poolSize\":\"10\", \"initNum\":\"6\"}");
		pool.checkOut(0);
		pool.checkOut(0);
		
		action.modifyCacheConfig(response, "connectionpool", "{\"poolSize\":\"8\", \"cyclelife\":\"10000\", \"poolContainerClass\":\"com.jinhe.tss.cache.extension.MapContainer\"}");
		
		CacheAction action2 = new CacheAction();
		action2.paramService = action.paramService;
		
		action2.getCacheStrategyInfo(response, "connectionpool");
		action.modifyCacheConfig(response, "connectionpool", "{\"poolSize\":\"20\"}");
		
		testPCache();
	}
    
    
    String poolConfig1 = "{" +
			"\"customizerClass\":\"com.jinhe.tss.framework.persistence.connpool.ConnPoolCustomizer\"," +
			"\"poolClass\":\"com.jinhe.tss.cache.extension.ReusablePool\"," +
			"\"code\":\"pool_1_\"," +
			"\"name\":\"DB连接池-1\"," +
			"\"cyclelife\":\"180000\"," +
			"\"paramFile\":\"H2.properties\"," +
			"\"interruptTime\":\"1000\"," +
			"\"poolSize\":\"10\"" +
			"}";
	
	String poolConfig2 = "{" +
			"\"customizerClass\":\"com.jinhe.tss.framework.persistence.connpool.ConnPoolCustomizer\"," +
			"\"poolClass\":\"com.jinhe.tss.cache.extension.ReusablePool\"," +
			"\"code\":\"pool_2_\"," +
			"\"name\":\"DB连接池-2\"," +
			"\"cyclelife\":\"180000\"," +
			"\"paramFile\":\"org.h2.Driver,jdbc:h2:mem:h2db;DB_CLOSE_DELAY=-1,sa,123\"," +
			"\"interruptTime\":\"1000\"," +
			"\"poolSize\":\"10\"" +
			"}";
	
	private void testPCache() {
		Param cacheGroup = CacheHelper.getCacheParamGroup(paramService);
		Long parentId = cacheGroup.getId();
		
		Param param1 = ParamManager.addSimpleParam(parentId, "pool_1_", "pool_1_", poolConfig1);
		Param param2 = ParamManager.addSimpleParam(parentId, "pool_2_", "pool_2_", poolConfig2);
		
		paramService.startOrStop(parentId, 1);
		
		Pool pool1 = JCache.pools.get("pool_1_");
		Pool pool2 = JCache.pools.get("pool_2_");
	
		Assert.assertNotNull(pool1);
		Assert.assertNotNull(pool2);
		
		Cacheable connItem = pool1.checkOut(0);
		Assert.assertNotNull(connItem);
		Assert.assertNotNull(connItem.getValue());
		
		connItem = pool2.checkOut(0);
		Assert.assertNotNull(connItem);
		Assert.assertNotNull(connItem.getValue());
		
		paramService.saveParam(param1);
		paramService.delete(param2.getId());
	}
    
}
