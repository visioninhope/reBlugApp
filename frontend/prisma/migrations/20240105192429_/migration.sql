-- AlterTable
ALTER TABLE "ContactList" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "KnowledgeBase" ADD COLUMN     "email" TEXT,
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;
