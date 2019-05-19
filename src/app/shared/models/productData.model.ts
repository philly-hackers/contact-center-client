export interface ProductData {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  branches: Branch[];
  products: Product[];
  isActive?: any;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

interface Product {
  id: string;
  name?: any;
  category?: any;
  branches: Branch2[];
  isActive?: any;
}

interface Branch2 {
  id: string;
  name?: any;
  address?: any;
  geolocation?: any;
  isActive?: any;
}

interface Branch {
  id: string;
  name?: any;
  address?: any;
  geolocation?: any;
}