FROM mysql:latest

ENV TZ=Asia/Seoul

COPY ./mysql/conf/my.cnf /etc/mysql/conf.d/my.cnf

VOLUME ["/var/lib/mysql"]

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]