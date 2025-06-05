# Database

The database.db file has 2 tables. `users` and `games`.

## Users table

Here is the create statement.

```sql
CREATE TABLE "users" (
	"id"	INTEGER,
	"username"	TEXT NOT NULL,
	"email"	TEXT,
	"password"	TEXT NOT NULL,
	"session"	INTEGER,
	PRIMARY KEY("id")
)
```

## Games table

Here is the create statement.

```sql
CREATE TABLE "games" (
	"id"	INTEGER,
	"name"	TEXT UNIQUE,
	"username"	TEXT NOT NULL,
	"data"	TEXT NOT NULL,
	PRIMARY KEY("id")
)
```
