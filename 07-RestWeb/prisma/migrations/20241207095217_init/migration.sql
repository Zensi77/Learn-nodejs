-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "completedAt" TIMESTAMP(6),

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
