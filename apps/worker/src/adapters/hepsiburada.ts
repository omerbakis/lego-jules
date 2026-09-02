export interface DiscoveredProduct {
  externalProductId: string;
  canonicalUrl: string;
  title: string;
  imageUrl?: string;
}

export class HepsiburadaAdapter {
  async discoverProducts(): Promise<DiscoveredProduct[]> {
    console.log('Mock discovering products from Hepsiburada');
    return [
      {
        externalProductId: 'HBV00000X1ABC',
        canonicalUrl: 'https://hepsiburada.com/lego-star-wars-75192',
        title: 'Lego Star Wars 75192 Millennium Falcon',
        imageUrl: 'https://example.com/falcon.jpg'
      }
    ];
  }
}
