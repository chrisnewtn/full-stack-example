#!/bin/ash

set -e

# Remap our database config to Postgres' defaults
# so they'll automatically be picked up by the CLI
export PGUSER=$API_USER
export PGPASSWORD=$API_PASS
export PGDATABASE=$API_DB
export PGHOST=db

# Give the database container time to start up
echo "Connecting to ${PGHOST}... "
for i in 1 2 4 8
do
  if ! psql -w -c '\conninfo' 2>/dev/null; then
    if [ $i == 8 ]; then
      echo "Unable to connect to ${PGHOST}."
      exit 1
    else
      sleep "${i}s"
    fi
  else
    break
  fi
done

# Run migrations
printf "\nApplying Migrations...\n\n"

for migration in `ls -v migrations/*.sql`
do
  VERSION=$(basename $migration)
  VERSION=${VERSION%.sql}

  MIGRATION_CHECK="SELECT 1 FROM vw_versions WHERE version = '${VERSION}'"

  if ! psql -tqc "$MIGRATION_CHECK" | egrep . >/dev/null; then
    echo "${VERSION} applying..."
    psql -1 -v ON_ERROR_STOP=1 -f "$migration"
    echo "${VERSION} applied."
  else
    echo "${VERSION} already applied, skipping..."
  fi
done

printf "\nMigrations Applied.\n"
