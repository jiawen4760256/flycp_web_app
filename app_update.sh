#/bin/sh
cmd="mkdir tmp;cd tmp"
echo $cmd
eval $cmd

cmd="curl -u admin:admin168 'http://202.95.15.135:8080/remote.php/dav/files/admin/flycp/flycp_web_app.zip' -X GET -o flycp_web_app.zip"
echo $cmd
eval $cmd

cmd="unzip flycp_web_app.zip"
echo $cmd
eval $cmd


cmd="mv flycp_web_app ../ -b"
echo $cmd
eval $cmd

cmd="cd .."
echo $cmd
eval $cmd



