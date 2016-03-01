#!/bin/bash

#---------------------------
#-------configuration-------
#---------------------------

echo '----------- DOMAIN URL -----------'
read DOMAIN
echo '----------- USER NAME ------------'
read USER

#---------------------------
#---------------------------

echo '---------------------'
echo '-------update--------'
echo '---------------------'
apt-get -y update && apt-get -y install wget curl nano htop sudo lsb-release ca-certificates
VER=`lsb_release -cs`
echo 'OK'
echo '---------------------'
echo '-------sources-------'
echo '---------------------'
echo "deb http://httpredir.debian.org/debian ${VER} main contrib non-free \n deb-src http://httpredir.debian.org/debian ${VER} main contrib non-free \n deb http://httpredir.debian.org/debian ${VER}-updates main contrib non-free \n deb-src http://httpredir.debian.org/debian ${VER}-updates main contrib non-free \n deb http://security.debian.org/ ${VER}/updates main contrib non-free \n deb-src http://security.debian.org/ ${VER}/updates main contrib non-free \n deb http://nginx.org/packages/debian/ ${VER} nginx \n deb-src http://nginx.org/packages/debian/ ${VER} nginx \n deb http://mirror.de.leaseweb.net/dotdeb/ ${VER} all \n deb-src http://mirror.de.leaseweb.net/dotdeb/ ${VER} all" > /etc/apt/sources.list
echo 'OK'
echo '---------------------'
echo '---------key---------'
echo '---------------------'
wget --no-check-certificate http://www.dotdeb.org/dotdeb.gpg; apt-key add dotdeb.gpg; wget --no-check-certificate http://nginx.org/keys/nginx_signing.key; apt-key add nginx_signing.key
rm -rf dotdeb.gpg
rm -rf nginx_signing.key
echo 'OK'
echo '---------------------'
echo '-------upgrade-------'
echo '---------------------'
apt-get -y update && apt-get -y upgrade
echo 'OK'
echo '---------------------'
echo '-------install-------'
echo '---------------------'
wget -qO- https://deb.nodesource.com/setup_5.x | bash -
apt-get -y install nginx proftpd-basic openssl mysql-client nodejs libltdl7 libodbc1 libpq5
wget --no-check-certificate http://sphinxsearch.com/files/sphinxsearch_2.2.10-release-1~${VER}_amd64.deb && dpkg -i sphinxsearch* && rm -rf sphinxsearch_2.2.10-release-1~${VER}_amd64.deb
echo 'OK'
echo '---------------------'
echo '-------passwd--------'
echo '---------------------'
useradd ${USER} -m -U -s /bin/false
passwd ${USER}
cp -r ./* /home/${USER}/
chown -R ${USER}:www-data /home/${USER}/
echo 'OK'
echo '---------------------'
echo '--------admin--------'
echo '---------------------'
echo 'Large password 0-10 symbols'
echo '---------------------'
OPENSSL=`openssl passwd`
echo "${USER}:${OPENSSL}" >> /etc/nginx/nginx_pass
echo 'OK'
echo '---------------------'
echo '--------nginx--------'
echo '---------------------'
ln -s /home/${USER}/config/rewrite.conf /etc/nginx/conf.d/rewrite.conf
ln -s /home/${USER}/config/nginx.conf /etc/nginx/conf.d/nginx.conf
sed -i "s/domain.tld/${DOMAIN}/g" /home/${USER}/config/nginx.conf
sed -i "s/username/${USER}/g" /home/${USER}/config/nginx.conf
sed -i "s/user  nginx;/user  www-data;/g" /etc/nginx/nginx.conf
sed -i "s/http {/http { server_names_hash_bucket_size 64;/g" /etc/nginx/nginx.conf
echo 'OK'
echo '---------------------'
echo '-------sphinx--------'
echo '---------------------'
sed -i "s/username/${USER}/g" /home/${USER}/config/sphinx.conf
rm -rf /etc/sphinxsearch/sphinx.conf
ln -s /home/${USER}/config/sphinx.conf /etc/sphinxsearch/sphinx.conf
echo 'OK'
echo '---------------------'
echo '------proftpd--------'
echo '---------------------'
echo 'AuthUserFile    /etc/proftpd/ftpd.passwd' >> /etc/proftpd/proftpd.conf
echo '/bin/false' >> /etc/shells
sed -i "s/# DefaultRoot/DefaultRoot/g" /etc/proftpd/proftpd.conf
echo 'OK'
echo '---------------------'
echo '---------ftp---------'
echo '---------------------'
USERID=`id -u ${USER}`
ftpasswd --passwd --file=/etc/proftpd/ftpd.passwd --name=${USER} --shell=/bin/false --home=/home/${USER} --uid=${USERID} --gid=${USERID}
echo 'OK'
echo '---------------------'
echo '-------restart-------'
echo '---------------------'
service nginx restart
service proftpd restart
echo "flush_all" | nc -q 2 localhost 11211
echo 'OK'
echo '---------------------'
echo '--------start--------'
echo '---------------------'
cd /home/${USER}/
npm install
npm install forever -g
npm install nodemon -g
echo 'OK'
echo '~# reboot'