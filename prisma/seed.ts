import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed boshlanmoqda...');

  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const ali = await prisma.user.create({
    data: {
      name: 'Ali Valiyev',
      email: 'ali@example.com',
    },
  });

  const malika = await prisma.user.create({
    data: {
      name: 'Malika Karimova',
      email: 'malika@example.com',
    },
  });

  const jasur = await prisma.user.create({
    data: {
      name: 'Jasur Rahimov',
      email: 'jasur@example.com',
    },
  });

  console.log('✅ 3 ta user yaratildi');

  // 2. Postlar yaratish
  await prisma.post.createMany({
    data: [
      {
        title: 'Next.js bilan Web Dasturlash',
        content:
          'Next.js - bu React asosida qurilgan qudratli framework. U server-side rendering, static site generation va boshqa imkoniyatlarni taqdim etadi.',
        published: true,
        authorId: ali.id,
      },
      {
        title: 'Prisma ORM bilan ishlash',
        content:
          "Prisma - zamonaviy ORM. U ma'lumotlar bazasi bilan ishlashni osonlashtiradi va type-safe kod yozishga yordam beradi.",
        published: true,
        authorId: ali.id,
      },
      {
        title: 'TypeScript asoslari',
        content:
          "TypeScript JavaScript ga type safety qo'shadi. Bu katta loyihalarda juda foydali.",
        published: false,
        authorId: ali.id,
      },
      {
        title: "O'zbekiston bo'ylab sayohat",
        content:
          "Samarqand, Buxoro, Xiva - bu go'zal shaharlar. O'zbekiston tarixiy va madaniy jihatdan boy mamlakat.",
        published: true,
        authorId: malika.id,
      },
      {
        title: 'Startup boshlash tajribasi',
        content:
          "Startup boshlash - qiyin lekin qiziqarli yo'l. O'z tajribalarimni ulashmoqchiman.",
        published: true,
        authorId: jasur.id,
      },
      {
        title: 'React Hooks va Performance',
        content:
          'React Hooks dasturlashni osonlashtiradi. useMemo, useCallback va boshqa hooklar haqida.',
        published: false,
        authorId: jasur.id,
      },
    ],
  });

  console.log('✅ 6 ta post yaratildi');

  // Natija
  const userCount = await prisma.user.count();
  const postCount = await prisma.post.count();
  const publishedCount = await prisma.post.count({
    where: { published: true },
  });

  console.log('\n📊 Natija:');
  console.log(`👥 Userlar: ${userCount}`);
  console.log(`📝 Postlar: ${postCount}`);
  console.log(`✓ Published: ${publishedCount}`);
  console.log(`✗ Draft: ${postCount - publishedCount}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('\n✨ Tayyor!');
  })
  .catch(async (e) => {
    console.error('❌ Xatolik:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
