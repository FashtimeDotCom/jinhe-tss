/* ==================================================================   
 * Created [2006-6-19] by Jon.King 
 * ==================================================================  
 * TSS 
 * ================================================================== 
 * mailTo:jinpujun@hotmail.com
 * Copyright (c) Jon.King, 2012-2015 
 * ================================================================== 
*/
package com.jinhe.tss.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.dom4j.Document;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

/**
 * 文件操作帮助类
 */
public class FileHelper {
    
    public final static String PATH_SEPARATOR = "/";
    
    /**
     * 读入文件为字符串
     * @param file
     * @return
     */
    public static String readFile(File file) {
        StringBuffer sb = new StringBuffer();
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
            String data = null;
            while((data = br.readLine())!=null){
                sb.append(data).append("\n");
            }
            br.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException("找不到指定的文件", e);
        } catch (IOException e) {
            throw new RuntimeException("读取文件内容时IO异常", e);
        }
        return sb.toString();
    }
    
    /**
     * 指定编码读入文件为字符串
     * @param file
     * @param charSet
     * @return
     */
    public static String readFile(File file, String charSet) {
        StringBuffer sb = new StringBuffer();
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(new FileInputStream(file), charSet));
            String data = null;
            while((data = br.readLine())!=null){
                sb.append(data).append("\n");
            }
            br.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException("找不到指定的文件", e);
        } catch (IOException e) {
            throw new RuntimeException("读取文件内容时IO异常", e);
        }
        return sb.toString();
    }
    
    /**
     * 写入文件
     * @param file
     * @param htmlContent
     */
    public static void writeFile(File file, String content){
        try {
            FileWriter fw = new FileWriter(file);
            fw.write(content, 0, content.length());
            fw.close();
        } catch (IOException e) {
            throw new RuntimeException("写入文件内容时IO异常", e);
        }
    }
    
	/**
	 * 将XML文件Document对象写入到指定的文件中。 保证格式不变。
	 *
	 * @param doc
	 *            源XML文件Document对象
	 * @param dirFile
	 *            目标文件
	 */
	public static void writeXMLDoc(Document doc, String dirFile) {
		/*
		 * pass: FileWriter和FileOutputStream区别：前者会改变文件编码格式，后者不会。
		 *  另外可通过format.setEncoding("UTF-8")方式来设置XMLWriter的输出编码方式。
		 */ 
		XMLWriter writer = null;
		try {
		    OutputFormat format = OutputFormat.createPrettyPrint();
			writer = new XMLWriter(new FileOutputStream(dirFile), format);
			writer.write(doc);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("不支持的编码格式", e);
		} catch (FileNotFoundException e) {
			throw new RuntimeException("文件未找到", e);
		} catch (IOException e) {
			throw new RuntimeException("文件读写失败", e);
		} finally {
			try {
			    if(writer != null) {
			        writer.close();
			    }
			} catch (IOException e) {
				throw new RuntimeException("文件流关闭失败", e);
			}
		}
	}

	/**
	 * 将上传到临时文件夹的文件重新写入到特定的文件夹中
	 *
	 * @param dir
	 *            目标目录
	 * @param file
	 *            源文件
	 * @return
	 */
	public static String copyFile(File dir, File file) {
		return copyFile(dir, file, true, true);
	}

	/**
	 * 将上传到临时文件夹的文件重新写入到特定的文件夹中。
	 * 本方法采用FileInputStream、FileOutputStream二进制流的形式读取以及写入文件，
	 * 可确保不会改变文件的内容和格式。采用Reader以及Writer则会改变文件。
	 *
	 * @param dir
	 *            目标目录
	 * @param file
	 *            源文件
	 * @param isUpdate
	 *            同文件名的文件存在时是否覆盖原文件
	 * @param isCut
	 *            是否剪切
	 * @return
	 */
	public static String copyFile(File dir, File file, boolean isUpdate, boolean isCut) {
		if (!dir.exists()) {
			dir.mkdir();
		}
		String fileName = file.getName();
		File newFile = new File(dir.getPath() + "/" + fileName);
		if (newFile.exists() && !isUpdate) {
			throw new RuntimeException("与该文件文件名一样的文件已经存在，请先修改文件名!");
		}
		InputStream in;
		try {
			in = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			throw new RuntimeException("文件找不到!", e);
		}
		OutputStream out;
		try {
			out = new FileOutputStream(newFile);
		} catch (FileNotFoundException e) {
			try {
				in.close();
			} catch (IOException e1) {
				throw new RuntimeException("文件输入流关闭失败", e1);
			}
			throw new RuntimeException("文件找不到!", e);
		}
		int len = 0;
		byte[] b = new byte[1024];
		try {
			while ((len = in.read(b)) != -1) {
				out.write(b, 0, len);
				out.flush();
			}
		} catch (IOException e) {
			throw new RuntimeException("文件读写失败", e);
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				throw new RuntimeException("文件输入流关闭失败", e);
			} finally {
				try {
					out.close();
				} catch (IOException e) {
					throw new RuntimeException("文件输出流关闭失败", e);
				}
			}
		}
		if (isCut && file.exists()) {
			file.delete();
		}
		return fileName;
	}

	/**
	 * 根据文件的后缀名列出制定目录下的文件（只限于指定目录，不包含子目录的文件）
	 *
	 * @param suffix
	 *            后缀名
	 * @param dir
	 * @return
	 */
	public static List<String> listFilesByType(String suffix, File dir) {
		List<String> list = new ArrayList<String>();
		if (dir.exists()) {
			String[] files = dir.list();
			for (int i = 0; i < files.length; i++) {
				String fileName = files[i];
				if (fileName.endsWith(suffix)) {
					list.add(fileName);
				}
			}
		}
		return list;
	}

	/**
	 * 列出文件夹下所有的文件和子文件夹（只限于指定目录，不包含子目录的文件和文件夹）
	 *
	 * @param dir
	 * @return
	 */
	public static List<String> listFiles(File dir) {
		return listFilesByType("", dir);
	}

	/**
	 * 列出文件夹下所有子文件夹（只限于指定目录，不包含子目录的文件夹）
	 *
	 * @param dir
	 * @return
	 */
	public static List<File> listSubDir(File dir) {
		List<File> list = new ArrayList<File>();
		if (dir.exists()) {
			File[] files = dir.listFiles();
			for (int i = 0; i < files.length; i++)
				if (files[i].isDirectory())
					list.add(files[i]);
		}
		return list;
	}
    
    /**
     * 根据文件的后缀名列出制定目录下的文件名列表（包含子目录的文件，即深度读取）
     *
     * @param suffix
     *            后缀名
     * @param dir
     * @return  List[File1Name,File2Name,File3Name]
     */
    public static List<String> listFileNamesByTypeDeeply(String suffix, File dir) {
        List<String> list = new ArrayList<String>();
        if (dir.exists()) {
            String[] files = dir.list();
            for (int i = 0; i < files.length; i++) {
                String fileName = files[i];
                if (fileName.endsWith(suffix)) {
                    list.add(fileName);
                }
                
                File file = new File(dir.getPath() + "/" + fileName);
                if (file.isDirectory()) {
                    list.addAll(listFileNamesByTypeDeeply(suffix, file));
                }
            }
        }
        return list;
    }
    
    /**
     * 根据文件的后缀名列出制定目录下的文件列表（包含子目录的文件，即深度读取）
     * @param suffix 
     *            后缀名
     * @param dir
     * @return  List[File1,File2,File3]
     */
    public static List<File> listFilesByTypeDeeply(String suffix, File dir) {
        List<File> list = new ArrayList<File>();
        if (dir.exists()) {
            String[] files = dir.list();
            for (int i = 0; i < files.length; i++) {
                String fileName = files[i];
                File file = new File(dir.getPath() + "/" + fileName);
                if (file.isDirectory()) {
                    list.addAll(listFilesByTypeDeeply(suffix, file));
                } else if (fileName.endsWith(suffix)) {
                    list.add(file);
                }
            }
        }
        return list;
    }
    
    public static List<File> listFilesDeeply(File dir) {
    	return listFilesByTypeDeeply("", dir);
    }

	/**
	 * 在指定文件夹下根据文件名查找子文件夹
	 *
	 * @param dir
	 * @param pathName
	 * @return
	 */
	public static File findPathByName(File dir, String pathName) {
		for (Iterator<File> it = FileHelper.listSubDir(dir).iterator(); it.hasNext();) {
			File file = it.next();
			if (file.getName().endsWith(pathName)) {
				return file;
			}
		}
		return null;
	}

	/**
	 * <p>
	 * 检查导入文件夹下是否是规定的文件
	 * </p>
	 */
	public static boolean checkFile(File dir, String fileName) {
		List<String> files = listFiles(dir);
		for (String temp : files ) {
			if (temp.equals(fileName)) {
				return true;
			}
		}
		
		return false;
	}

	/**
	 * 拷贝一个文件夹下指定类型的文件到另外一个文件夹
	 *
	 * @param suffix
	 * @param dirName
	 * @param toDirName
	 * @param isCut
	 *            是否剪切
	 */
	public static void copyFilesInDir(String suffix, File fromDir, File toDir, boolean isCut) {
		if (!fromDir.exists()) {
			throw new RuntimeException("拷贝文件夹中的文件时出错，源文件夹(" + fromDir.getPath() + ")不存在!");
		}
		List<String> list = listFilesByType(suffix, fromDir);
		if (!toDir.exists()) {
			toDir.mkdir();
		}
		for (Iterator<String> it = list.iterator(); it.hasNext();) {
			String fileName = (String) it.next();
			File file = new File(fromDir.getPath() + "/" + fileName);
			if (file.isDirectory()) {
				copyFilesInDir(suffix, file, new File(toDir.getPath() + "/" + fileName), isCut);
			} 
			else {
				copyFile(toDir, file, true, false);
			}
		}
		
		if (isCut) {
			deleteFilesInDir("", fromDir);
		}
	}

	/**
	 * 复制整个文件夹的内容
	 *
	 * @return
	 */
	public static void copyFolder(String fromDir, String toDir) {
	    copyFolder(new File(fromDir), new File(toDir));
	}
	
    public static void copyFolder(File fromDir, File toDir) {
        copyFilesInDir("", fromDir, toDir, false);
    }

	/**
	 * 删除文件夹下指定类型的文件，如果文件夹为空，则删除该文件夹
	 *
	 * @param suffix
	 * @param dir
	 */
	public static void deleteFilesInDir(String suffix, File dir) {
		if (dir.exists()) {
			List<String> list = listFilesByType(suffix, dir);
			for (Iterator<String> it = list.iterator(); it.hasNext();) {
				String fileName = (String) it.next();
				File file = new File(dir.getPath() + "/" + fileName);
				if (file.isDirectory()) {
					deleteFilesInDir(suffix, file);
				} else {
					file.delete();
				}
			}
			if (dir.list().length == 0) {
				dir.delete();
			}
		}
	}

	/**
	 * 删除文件或文件夹
	 * @param File
	 */
	public static void deleteFile(File file) {
        if( file.isFile() ) {
            file.delete();
        }
        else if( file.isDirectory() ) {
            deleteFilesInDir("", file);
        }
	}

    /**
     * 压缩文件。
     * @param destPath
     * @param srcFile
     * @return
     */
    public static String exportZip(String destFileName, File sourceFile){
        String zipFileName = destFileName + "/" + sourceFile.getName() + ".zip";
        ZipOutputStream out = null;
        try {
            out = new ZipOutputStream(new FileOutputStream(zipFileName));
            File[] fileList = sourceFile.listFiles();
            for (File tempFile : fileList) {
                exportZip(out, tempFile, tempFile.getName());
            }
        } catch (Exception e) {
            throw new RuntimeException("压缩文件时出错!", e);
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                throw new RuntimeException("压缩完关闭输出流时出错!", e);
            }
        }
        return zipFileName;
    }

    private static void exportZip(ZipOutputStream out, File f, String base) throws Exception {
        if(f.isDirectory()) { // 如果是目录
            File[] subFiles = f.listFiles();
            out.putNextEntry( new ZipEntry(base + "/") );
            base = base.length() == 0 ? "" : base + "/";
            for ( File subFile : subFiles ) {
                exportZip(out, subFile, base + subFile.getName());
            }
        } else {
            out.putNextEntry(new ZipEntry(base));
            FileInputStream in = new FileInputStream(f);
            int b;
            while ((b = in.read()) != -1) {
                out.write(b);
            }
            in.close();
        }
    }
    
    /**
     * 得到文件后缀
     * @param fileName
     * @return
     */
    public static String getFileSuffix(String fileName) {
        if (null == fileName) 
            return null;
        
        int index = fileName.lastIndexOf(".");
        if (index > -1) 
            return fileName.substring(index + 1);
        return "";
    }
    
    /**
     * 得到文件名称（不带后缀名）
     * @param fileName
     * @return
     */
    public static String getFileNameNoSuffix(String fileName) {
        if (null == fileName)
            return null;
        
        int index = fileName.lastIndexOf(".");
        if (index > -1) 
            return fileName.substring(0, index);
        return fileName;
    }

	/**
	 * <p>
	 * 覆盖原有文件
	 * </p>
	 *
	 * @param src
	 *            源文件
	 * @param file
	 *            要覆盖文件的路径
	 * @return
	 */
	public static void wirteOldFile(String src, File file, String fileName) {
		InputStream inStream = null;
		FileOutputStream outStream = null;
		inStream = (InputStream) (new ByteArrayInputStream(src.getBytes()));
		try {
			outStream = new FileOutputStream(file.toString() + fileName);
		} catch (FileNotFoundException e) {
			try {
				inStream.close();
			} catch (IOException e1) {
				throw new RuntimeException("输入流关闭失败", e1);
			}
			throw new RuntimeException("文件未找到：" + fileName, e);
		}
		int byteread = 0;
		byte[] buffer = new byte[256];
		try {
			while ((byteread = inStream.read(buffer)) != -1) {
				outStream.write(buffer, 0, byteread);
			}
		} catch (IOException e) {
			throw new RuntimeException("数据流读写失败", e);
		} finally {
			try {
                if(inStream != null)
                    inStream.close();
			} catch (IOException e) {
				throw new RuntimeException("输入流关闭失败", e);
			} finally {
				try {
                    if(outStream != null)
                        outStream.close();
				} catch (IOException e) {
					throw new RuntimeException("输出流关闭失败", e);
				}
			}
		}
	}

	/**
	 * <p>
	 * 创建文件夹
	 * </p>
	 * @param path
	 *            文件夹路径
	 */
	public static File createDir(String path) {
		File file = new File(path);
		if ( !file.exists() ) {
			file.mkdirs();
		}
        return file;
	}
    
    /**
     * 获取文件的扩展名
     * @param filename
     * @return
     */
    public static String getFileExtension(String filename) {
        int index = filename.lastIndexOf(".");
        if(index != -1) {
        	return filename.substring(index + 1);
        }
        return "";
    }
    
    /**
     * 重命名文件名
     * @param filePath
     * @param newName
     */
    public static boolean renameFile(String filePath, String newName) {
        URL url = URLUtil.getResourceFileUrl(filePath);
        if(url != null) {
        	File file = new File(url.getFile());
            return file.renameTo(new File(file.getParent() + "/" + newName));
        }
        return false;
    }
    
    /**
     * 判断文件目录是否文件夹。
     * @param dir
     * @param fileName
     * @return
     */
    public static boolean isFolder(File dir, String fileName){
        if(dir == null || fileName == null) {
            return false;
        }
        
        File file = new File(dir.getPath() + "/" + fileName);
        return file.isDirectory();
    }
    
    /** 
     * 压缩. 
     * 压缩指定目录下所有文件，包括子目录 。
     */  
     public static void zip(File baseDir) throws Exception {
         File zipFile = new File(baseDir.getPath() + ".zip");
         ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFile));
         
         String baseDirName = baseDir.getName();
         byte[] buf = new byte[1024];
         int readLen = 0;
         List<File> fileList = listFilesDeeply( baseDir );
         for ( File file : fileList) {
             int index = file.getPath().indexOf(baseDirName);
             String relatePath = file.getPath().substring(index + baseDirName.length() + 1);
             
             ZipEntry ze = new ZipEntry(relatePath);
             ze.setSize(file.length());
             ze.setTime(file.lastModified());
             zos.putNextEntry(ze);
             
             InputStream is = new BufferedInputStream(new FileInputStream(file));
             while ((readLen = is.read(buf, 0, 1024)) != -1) {
                 zos.write(buf, 0, readLen);
             }
             is.close();
         }
         zos.close();
     }
     
     public static void zip(String baseDir) throws Exception {
         zip(new File(baseDir));
    } 
     
     /** 
      * 解压缩. 
      * 将file文件解压到file所在的目录下. 
      */  
      public static String upZip(File file) {
		String zipFileName = file.getName();
		zipFileName = zipFileName.substring(0, zipFileName.indexOf('.'));
		File destDir = new File(file.getParent() + "/" + zipFileName);
		try {
			return upZip(file, destDir);
		} catch (Exception e) {
			throw new RuntimeException("解压文件" + file + "到" + destDir + "目录失败!!!", e);
		}
	}
      
      /**
		 * 解压缩. 将file文件解压到destDir目录下.
		 */  
      public static String upZip(File file, File destDir) throws Exception {
        ZipFile zfile = new ZipFile(file);
        Enumeration<?> zList = zfile.entries();
        byte[] buf = new byte[1024];
        while (zList.hasMoreElements()) {
            ZipEntry ze = (ZipEntry) zList.nextElement();
			String path = destDir.getPath() + "/" + ze.getName();
			File subFile = new File(path);
            if ( ze.isDirectory() ) {
                subFile.mkdirs();
                continue;
            } 
            else {
            	subFile.getParentFile().mkdirs();
            }
            
            OutputStream os = new BufferedOutputStream(new FileOutputStream(path));
            InputStream is = new BufferedInputStream(zfile.getInputStream(ze));
            int readLen = 0;
            while ((readLen = is.read(buf, 0, 1024)) != -1) {
                os.write(buf, 0, readLen);
            }
            is.close();
            os.close();
        }
        zfile.close();
        
        return destDir.getPath();
    }  
    
}
