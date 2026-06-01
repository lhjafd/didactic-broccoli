FROM nginx:latest

COPY ./web/src /usr/share/nginx/html
COPY ./web/conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]