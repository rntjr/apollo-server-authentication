# Migration `20200711134313`

This migration has been generated by rntjr at 7/11/2020, 1:43:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"authorId" integer  NOT NULL ,
"content" text   ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" SERIAL,
"published" boolean  NOT NULL DEFAULT false,
"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Profile" (
"bio" text   ,
"id" SERIAL,
"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."User" (
"email" text  NOT NULL ,
"id" SERIAL,
"name" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Profile.userId" ON "public"."Profile"("userId")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200711134313
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,36 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  title     String
+  content   String?
+  published Boolean  @default(false)
+  User      User     @relation(fields: [authorId], references: [id])
+  authorId  Int
+}
+
+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  User   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+
+model User {
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String?
+  Post    Post[]
+  Profile Profile?
+}
```

