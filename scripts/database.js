const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);

client.connect();
client.query(
    'CREATE TABLE "public"."identidades" ("ine" varchar(13) COLLATE "pg_catalog"."default","id" numeric(8) NOT NULL,"pasaporte" varchar(9) COLLATE "pg_catalog"."default","nombre" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,"apellido_paterno" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,"apellido_materno" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,"vigente" bool)',
    (err, res) => {
        if (err) {
            return console.error('error with PostgreSQL database', err);
        }
        client.end();
    }
);
client.query(
    "INSERT INTO identidades VALUES ('19274909', 1, 'G34254066', 'Karla', 'Sánchez', 'Romero', 't')",
    (err, res) => {
        if (err) {
            return console.error('error with PostgreSQL database', err);
        }
        client.end();
    }
);
client.query(
    'ALTER TABLE "public"."identidades" ADD CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")',
    (err, res) => {
        if (err) {
            return console.error('error with PostgreSQL database', err);
        }
        client.end();
    }
);
