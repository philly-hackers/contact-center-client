export interface ContactAddUpdateResponse {
  id: string;
  _rid: string;
  _self: string;
  _ts: number;
  _etag: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  branches: Branch[];
  products: Product[];
  isactive: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  branches?: any;
  isactive?: any;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  geolocation: string;
  isactive?: any;
}