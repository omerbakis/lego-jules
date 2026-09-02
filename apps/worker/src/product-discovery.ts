import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { HepsiburadaAdapter } from './adapters/hepsiburada.js';

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  maxRetriesPerRequest: null,
});

const prisma = new PrismaClient();
const adapter = new HepsiburadaAdapter();

const worker = new Worker('product-discovery', async (job: Job) => {
  console.log(`Processing job ${job.id} for product discovery`);

  // Phase 5: Discover products using adapter
  const products = await adapter.discoverProducts();

  let merchant = await prisma.merchant.findUnique({ where: { adapterKey: 'hepsiburada' } });
  if (!merchant) {
    merchant = await prisma.merchant.create({
      data: {
        name: 'Hepsiburada',
        domain: 'hepsiburada.com',
        adapterKey: 'hepsiburada'
      }
    });
  }

  for (const product of products) {
    // Phase 6: Basic matching logic using regex to find set number
    const match = product.title.match(/(?:LEGO|Lego)\s*(?:Star Wars\s*)?(\d{4,5})/i);
    const setNumber = match ? match[1] : null;

    let legoSetId = null;
    if (setNumber) {
      const legoSet = await prisma.legoSet.findUnique({ where: { setNumber } });
      if (legoSet) legoSetId = legoSet.id;
    }

    await prisma.merchantProduct.upsert({
      where: {
        merchantId_externalProductId: {
          merchantId: merchant.id,
          externalProductId: product.externalProductId
        }
      },
      update: {
        title: product.title,
        lastSeenAt: new Date(),
        legoSetId,
        matchMethod: legoSetId ? 'REGEX_SET_NUMBER' : null,
      },
      create: {
        merchantId: merchant.id,
        externalProductId: product.externalProductId,
        canonicalUrl: product.canonicalUrl,
        title: product.title,
        imageUrl: product.imageUrl,
        legoSetId,
        matchMethod: legoSetId ? 'REGEX_SET_NUMBER' : null,
        classification: 'LEGO_SET'
      }
    });
  }

  console.log('Product discovery job complete');
}, { connection: redisConnection });

worker.on('ready', () => {
  console.log('Discovery worker is ready to process jobs');
});
