import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function seedUsers() {
  try {
    // admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || '12345678';
    const adminName = process.env.ADMIN_NAME || 'Admin';
    const adminHashed = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: adminHashed,
        fullName: adminName,
        role: 'ADMIN',
      },
      create: {
        email: adminEmail,
        password: adminHashed,
        fullName: adminName,
        role: 'ADMIN',
        image: '',
        phone: '',
      },
    });
    console.log('🌱 Admin seeded successfully');

    // normal user
    const userEmail = process.env.USER_EMAIL || 'user@example.com';
    const userPassword = process.env.USER_PASSWORD || '12345678';
    const userName = process.env.USER_NAME || 'Normal User';
    const userHashed = await bcrypt.hash(userPassword, 10);

    await prisma.user.upsert({
      where: { email: userEmail },
      update: {
        password: userHashed,
        fullName: userName,
        role: 'USER',
      },
      create: {
        email: userEmail,
        password: userHashed,
        fullName: userName,
        role: 'USER',
        image: '',
        phone: '',
      },
    });
    console.log('🌱 User seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
// eslint-disable-next-line @typescript-eslint/no-floating-promises
seedUsers();
