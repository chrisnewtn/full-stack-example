CREATE SCHEMA api;

CREATE TABLE api.versions (
  id SERIAL PRIMARY KEY NOT NULL,
  version INTEGER[3] NOT NULL UNIQUE,
  date_executed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
COMMENT ON TABLE api.versions IS 'A record of migrations run against the db';


CREATE VIEW api.vw_versions AS
  SELECT
    id,
    concat('v', array_to_string(version, '.')) AS version,
    date_executed
  FROM
    api.versions;

INSERT INTO api.versions (version) VALUES ('{1,0,0}');
