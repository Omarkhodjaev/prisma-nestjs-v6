## Prisma o'rnatish

npm install @prisma/client@latest
npm install -D prisma@latest
npm install -D dotenv

## Prisma initialize

npx prisma init

## Prisma Client generate

npx prisma generate

## Migration yaratish va apply qilish

npx prisma migrate dev --name init

## Agar migration qilmasdan test qilmoqchi bo'lsangiz:

npx prisma db push

## Prisma Studio (Database GUI)

npx prisma studio

## Useful information

## Bigint ishlatilsa modelda xatolik beradi => main.ts da qo'llash kerak

declare global {
interface BigInt {
toJSON(): string;
}
}

BigInt.prototype.toJSON = function () {
return this.toString();
};
