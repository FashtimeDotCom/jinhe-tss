package com.jinhe.tss.framework.web.servlet;

import javax.servlet.http.HttpServletRequest;

public interface AfterUpload {
	
	String processUploadFile(HttpServletRequest request, 
			String filepath, String oldfileName) throws Exception;

}
