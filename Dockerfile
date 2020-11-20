FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist/raag-gif-converter-frontend/ /usr/share/nginx/html
