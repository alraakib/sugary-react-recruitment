export interface MaterialsResponse {
  TotalCount: number;
  RemainingCount: number;
  Tags: Tag[];
  DeliveryAreas: unknown[];
  Materials: Material[];
}

export interface Tag {
  Id: number;
  Title: string;
}

export interface Material {
  Id: number;
  TypeId: number;
  StoreId: number;
  VariantId: number;
  CoverPhoto: string;
  VariantCoverPhoto: unknown;
  Title: string;
  SubTitle?: string;
  VariantTitle: string;
  BrandName: string;
  TaxPercentage: unknown;
  MinSalesPrice: number;
  SalesPrice: number;
  SalesPriceInUsd: number;
  DripPrice: number;
  DripPriceInUsd: number;
  MinDripPrice: number;
  MinDripPriceInUsd: number;
  Height: unknown;
  Width: unknown;
  Depth: unknown;
  IsInHouse: boolean;
  ECardGradient1: unknown;
  ECardGradient2: unknown;
  ECardIconPath: unknown;
}
