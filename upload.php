<?php

try {
  if(is_dir('build')){
    rename('flycp_web_app','tmp/flycp_web_app'.time());
    rename('build','flycp_web_app');
  }
  $zip = new ZipArchive();
  // $file = "flycp_web_app_".date('Y_m_d').".zip";
  $file = "flycp_web_app.zip";
  $zip->open($file, ZipArchive::CREATE);
  addFileToZip('flycp_web_app', $zip); //调用方法，对要打包的根目录进行操作，并将ZipArchive的对象传递给方法
  $zip->close(); //关闭处理的zip文件


  $headers = array(
    "Expect: 100-continue",
    "Authorization: Basic " . base64_encode("admin:admin168"),
    );
    
    $url = "http://137.220.219.23:8080/remote.php/dav/files/admin/flycp/".$file;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_TIMEOUT, 600);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//把结果返回给变量
    curl_setopt($ch, CURLOPT_VERBOSE, '1');//输出debug信息
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);//支持跳转
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5);//最多跳转次数
    curl_setopt($ch, CURLOPT_URL, $url );
    curl_setopt($ch, CURLOPT_PUT, true );//提交方式
    $fp = fopen($file, 'r');
    $len = filesize($file);
    curl_setopt($ch, CURLOPT_INFILE, $fp );//设置上传文件的FILE指针
    curl_setopt($ch, CURLOPT_INFILESIZE, $len );//设置上传文件的大小
    $out = curl_exec($ch);
    $errno = curl_errno($ch);
    fclose($fp);
    curl_close($ch);
    print_r($out);
    print_r($errno);
} catch (\Exception $exception) {
  return $exception->getMessage();
}

function addFileToZip($path, $zip) {
  $handler = opendir($path); //打开当前文件夹由$path指定。
  while (($filename = readdir($handler)) !== false) {
      if ($filename != "." && $filename != "..") {//文件夹文件名字为'.'和‘..’，不要对他们进行操作
          if (is_dir($path . "/" . $filename)) {// 如果读取的某个对象是文件夹，则递归

              addFileToZip($path . "/" . $filename, $zip);
          } else { //将文件加入zip对象
              $zip->addFile($path . "/" . $filename);
          }
      }
  }
  @closedir($path);
}

?>