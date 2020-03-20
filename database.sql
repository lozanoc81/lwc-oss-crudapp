DROP TABLE IF EXISTS "public"."identidades";
CREATE TABLE "public"."identidades" ("ine" varchar(13) COLLATE "pg_catalog"."default","id" numeric(8) NOT NULL,"pasaporte" varchar(9) COLLATE "pg_catalog"."default","nombre" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,"apellido_paterno" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,"apellido_materno" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,"vigente" bool);

BEGIN;
INSERT INTO "public"."identidades" VALUES ('19274909', 1, 'G34254066', 'Karla', 'Sánchez', 'Romero', 't');
INSERT INTO "public"."identidades" VALUES ('12345678', 2, 'G13245678', 'Leonardo', 'Cortes', 'Guzman', 't');
INSERT INTO "public"."identidades" VALUES ('44474909', 3, 'G4444066', 'Christian', 'Lozano', 'Lozano', 't');
COMMIT;

ALTER TABLE "public"."identidades" ADD CONSTRAINT "Identity_pkey" PRIMARY KEY ("id");