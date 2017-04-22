FROM alpine:latest

RUN apk add --no-cache --update postgresql-client && \
    addgroup -g 1000 runner && \
    adduser -u 1000 -G runner -s /bin/ash -D runner

WORKDIR /runner
COPY migrate.sh .
RUN chown -R runner:runner /runner && \
    chmod +x /runner/migrate.sh

USER runner
COPY migrations/ migrations/

CMD ["./migrate.sh"]
