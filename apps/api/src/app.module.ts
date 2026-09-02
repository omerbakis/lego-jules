import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AppProfileModule } from './app-profile/app-profile.module.js';
import { LegoSetModule } from './lego-set/lego-set.module.js';
import { CollectionItemModule } from './collection-item/collection-item.module.js';
import { WishlistItemModule } from './wishlist-item/wishlist-item.module.js';
import { MerchantModule } from './merchant/merchant.module.js';
import { MerchantProductModule } from './merchant-product/merchant-product.module.js';
import { MerchantOfferModule } from './merchant-offer/merchant-offer.module.js';
import { PriceObservationModule } from './price-observation/price-observation.module.js';

@Module({
  imports: [PrismaModule, AppProfileModule, LegoSetModule, CollectionItemModule, WishlistItemModule, MerchantModule, MerchantProductModule, MerchantOfferModule, PriceObservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
