interface MarketDataProps {
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
}

interface HistoryDataProps {
  market_data: { current_price: { string: number } };
}

declare module "PortfolioCoinProps" {
  export interface PortfolioCoinProps {
    name: string;
    purchaseDate: string;
    purchaseAmount: number;
    id: string;
    marketData: Array<MarketDataProps>;
    historyData: HistoryDataProps;
  }
  export interface SelectedCoinProps {
    coinName: string;
    imgURL: string;
    symbol: string;
    id: string;
    handleSelectCoin(coin: object): void;
    purchaseDate: string;
    purchaseAmount: string;
    name: string;
  }

  export interface ResultProps {
    symbol: string;
    id: string;
    handleSelectCoin(coin: object): void;
    large: string;
    name: string;
  }
}
