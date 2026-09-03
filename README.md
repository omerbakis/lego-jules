# 🧱 LEGO Jules

Yerel bilgisayarınızda çalışan LEGO koleksiyon ve fiyat takip sistemi.

## ✨ Özellikler
- LEGO Star Wars kataloğu
- Koleksiyon yönetimi (kondisyon, geçmiş)
- İstek listesi (hedef fiyat, öncelik)
- Hepsiburada fiyat takip (6 saatlik güncelleme)
- Fiyat karşılaştırması ve geçmişi

## 🚀 Hızlı Başlangıç

### Docker (Hepsi bir komutla)
```bash
docker compose up
# Tarayıcı: http://localhost:3000
```

### Hybrid Dev (PostgreSQL + Redis docker'da, kod local'de)
```bash
docker compose up -d postgres redis
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## 🏗️ Yapı
- `apps/web/` - Next.js UI
- `apps/api/` - NestJS REST API
- `apps/worker/` - BullMQ background jobs
- `packages/database/` - Prisma

## 📋 Komutlar
```bash
pnpm dev              # Tüm servisler
pnpm dev:web
pnpm dev:api
pnpm dev:worker

pnpm test
pnpm lint
pnpm typecheck
pnpm build

pnpm db:migrate
pnpm db:seed
pnpm db:studio
```

## 🔗 URL'ler
- Web: http://localhost:3000
- API: http://localhost:3001
- API Docs: http://localhost:3001/docs
- Prisma Studio: http://localhost:5555

## 📖 API Endpoints
```
GET  /lego-sets
GET  /collection-items
POST /collection-items
PATCH /collection-items/:id
DELETE /collection-items/:id

GET  /wishlist
POST /wishlist
PATCH /wishlist/:id
DELETE /wishlist/:id

GET  /prices?legoSetId=...

POST /admin/trigger-discovery
POST /admin/trigger-refresh
```

## 🗄️ Database Models
- AppProfile (kullanıcı ayarları)
- LegoSet (katalog)
- CollectionItem (sahip olunan setler)
- WishlistItem (istek listesi)
- Merchant (mağazalar)
- MerchantProduct, MerchantOffer, PriceObservation

## 🛠️ Tech Stack
- Next.js + Tailwind CSS
- NestJS REST API
- PostgreSQL + Prisma
- Redis + BullMQ
- Docker Compose
- Jest + Playwright
