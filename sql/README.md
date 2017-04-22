# full-stack-example-sql
Why a separate database container and migration runner?

Basically, it's to enforce a cleaner separation of concerns. But it's also a
decision made out of practicality.

It _is_ possible to simply put your database schema in the Postgres container
in the `/docker-entrypoint-initdb.d/` directory. The problem is that the files
in there are only run once, when the container is initially created.

This is because the Postgres container stores its data in a volume, and running
`docker-compose up --build` doesn't destroy that volume (nor in my opinion,
would you want it to.)

By placing your schema in the Postgres container in the manner described means
that users have to remember to destroy their volumes every time they pull down
schema changes, or they'll have an inconsistent schema.

Now, it's likely possible to overcome this without the separate container (I
haven't tried), but I've opted to solve it with a separate one for several
reasons:

First, users still only need to remember `docker-compose up --build`. Once the
migrations have run, the container will exit 0 and go away.

Second, it's closer to a real-world scenario where your database is likely to be
the odd one out when it comes to the rest of your stack. Because state is hard.

Third, it's more reusable. With only some minor adjustments you could run this
against any old Postgres database.

In summary, being about to run your schema somewhere, without having to take
your actual database container with you, is pretty damn useful.
