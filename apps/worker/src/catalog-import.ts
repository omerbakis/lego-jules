import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { PrismaClient } from '@prisma/client';

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  maxRetriesPerRequest: null,
});

const prisma = new PrismaClient();

const worker = new Worker('catalog-import', async (job: Job) => {
  console.log(`Processing job ${job.id} for catalog import`);

  // Real implementation would fetch from Rebrickable API or similar.
  // We mock fetching Star Wars sets for Aşama 2.
  const setsToImport = [
    { setNumber: '75192-1', name: 'Millennium Falcon', theme: 'Star Wars', pieceCount: 7541 },
    { setNumber: '75331-1', name: 'The Razor Crest', theme: 'Star Wars', pieceCount: 6187 },
    { setNumber: '75252-1', name: 'Imperial Star Destroyer', theme: 'Star Wars', pieceCount: 4784 }
  ];

  for (const set of setsToImport) {
    if (set.theme !== 'Star Wars') continue;
    await prisma.legoSet.upsert({
      where: { setNumber: set.setNumber },
      update: {
        name: set.name,
        theme: set.theme,
        pieceCount: set.pieceCount,
      },
      create: {
        setNumber: set.setNumber,
        name: set.name,
        theme: set.theme,
        pieceCount: set.pieceCount,
      }
    });
  }

  console.log('Catalog import job complete');
}, { connection: redisConnection });

worker.on('ready', () => {
  console.log('Worker is ready to process jobs');
});
