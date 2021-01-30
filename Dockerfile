FROM nginx

COPY ./build/ /usr/share/nginx/html/
WORKDIR /etc/nginx/html
EXPOSE 80