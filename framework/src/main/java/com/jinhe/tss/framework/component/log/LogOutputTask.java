package com.jinhe.tss.framework.component.log;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.jinhe.tss.framework.Config;
import com.jinhe.tss.framework.persistence.connpool.Output2DBTask;

/** 
 *　日志输出任务
 * 
 * @author 金普俊 2007-1-8
 */
public class LogOutputTask extends Output2DBTask {

    protected void createRecords(Connection conn) throws SQLException {
    	String insertSql;
    	if( Config.isOracleDatabase() ) {
            insertSql = "insert into component_log" +
                "(id, operatorId, operatorName, operatorIP, operationCode, operateTable, operateTime, content, methodExcuteTime) " +
                "values(log_sequence.nextval, ?, ?, ?, ?, ?, ?, ?, ?)";
        }
    	else { // DEFAULT 主键自增 
            insertSql = "insert into component_log" +
                "(operatorId, operatorName, operatorIP, operationCode, operateTable, operateTime, content, methodExcuteTime) " +
                "values(?, ?, ?, ?, ?, ?, ?, ?)"; 
    	}
        PreparedStatement pstmt = conn.prepareStatement(insertSql); 
        for ( Object temp : records ) {
            Log dto = (Log) temp;
            
            int index = 1;
            pstmt.setLong  (index++, dto.getOperatorId());
            pstmt.setString(index++, dto.getOperatorName());
            pstmt.setString(index++, dto.getOperatorIP());
            pstmt.setString(index++, dto.getOperationCode());
            pstmt.setString(index++, dto.getOperateTable());
            pstmt.setTimestamp(index++, new java.sql.Timestamp(dto.getOperateTime().getTime()));
            pstmt.setString(index++, dto.getContent());
            pstmt.setInt(index++, dto.getMethodExcuteTime());
            
            pstmt.execute();
        }
        
        pstmt.close();
    }
}


