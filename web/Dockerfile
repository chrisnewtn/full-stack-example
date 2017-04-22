FROM nginx:alpine

HEALTHCHECK --interval=5s CMD ["wget", "-s", "http://127.0.0.1/healthz"]

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public /usr/share/nginx/html
