#!/bin/bash
set -e

echo "LEGO Jules Başlatılıyor..."

echo "1. Bağımlılıklar yükleniyor..."
pnpm install

echo "2. Veritabanı ve Redis kontrolü (Eğer sisteminizde local servis yoksa çalışmayabilir)..."

echo "3. Veritabanı göçleri uygulanıyor..."
pnpm db:migrate

echo "4. Proje derleniyor..."
pnpm build

echo "5. Tüm servisler başlatılıyor..."
pnpm dev
