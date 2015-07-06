package com.jinhe.tss.um.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.jinhe.tss.framework.persistence.IEntity;
import com.jinhe.tss.framework.web.dispaly.grid.GridAttributesMap;
import com.jinhe.tss.framework.web.dispaly.grid.IGridNode;
import com.jinhe.tss.util.BeanUtil;
 
/**
 * 站内消息对象
 */
@Entity
@Table(name = "um_message")
@SequenceGenerator(name = "message_sequence", sequenceName = "message_sequence", initialValue = 1000, allocationSize = 10)
public class Message implements IGridNode, IEntity {
    
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "message_sequence")
	private Long   id;
	
	private String title;		// 标题
	
	@Column(length = 2000)
	private String content;		// 正文
	
	private Long   senderId;	// 发送者ID
	private String sender;		// 发送者
	private Long   receiverId;	// 接收者ID
	private String receiver;	// 接收者
	
	private Date   sendTime;    // 发送时间
	private Date   readTime;    // 读取时间
 
	@Transient
	private String receiverIds; // 接收者ID列表
	
	public String getContent() {
		return content;
	}
 
	public Long getId() {
		return id;
	}
 
	public String getReceiver() {
		return receiver;
	}
	
	public String getSender() {
		return sender;
	}
 
	public Date getSendTime() {
		return sendTime;
	}
 
	public String getTitle() {
		return title;
	}
 
	public void setContent(String content) {
		this.content = content;
	}
 
	public void setId(Long id) {
		this.id = id;
	}
 
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	
	public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public void setSender(String sender) {
		this.sender = sender;
	}
 
	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}
 
	public void setTitle(String title) {
		this.title = title;
	}
 
	public GridAttributesMap getAttributes(GridAttributesMap map) {
		Map<String, Object> properties = new LinkedHashMap<String, Object>();
        BeanUtil.addBeanProperties2Map(this, properties);
        map.putAll(properties);
        
		return map;
	}

    public String getReceiverIds() {
        return receiverIds;
    }

    public void setReceiverIds(String receiverIds) {
        this.receiverIds = receiverIds;
    }

	public Date getReadTime() {
		return readTime;
	}

	public void setReadTime(Date readTime) {
		this.readTime = readTime;
	}

	public Serializable getPK() {
		return this.getId();
	}
}