FROM nginx

COPY ./build/ /usr/share/nginx/html/
COPY conf /etc/nginx/
WORKDIR /etc/nginx/html
EXPOSE 80