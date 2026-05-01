/**
 * Seed script — populates NeonDB with initial pharmacist accounts.
 * Run: node prisma/seed.js
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding pharmacist accounts...');

  const pharmacists = Array.from({ length: 6 }).map((_, i) => ({
    name: `Pharmacist ${i + 1}`,
    email: `pharmacist${i + 1}@test.com`,
    password: bcrypt.hashSync('pharmacist@123', 10),
    role: 'pharmacist'
  }));

  for (const ph of pharmacists) {
    const existing = await prisma.pharmacist.findUnique({ where: { email: ph.email } });
    if (existing) {
      console.log(`   ⏭  Skipping ${ph.email} (already exists)`);
      continue;
    }
    const created = await prisma.pharmacist.create({ data: ph });
    console.log(`   ✅  Created pharmacist: ${created.name} (${created.email})`);
  }

  console.log('\n✅ Seeding complete.');
  console.log('   Login credentials: pharmacist@123\n');
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
