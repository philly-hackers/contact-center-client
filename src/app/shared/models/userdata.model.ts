export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  branches: {
    id: string;
    name?: any;
    category?: any;
    branches?: any;
  }[];
  products: {
    id: string;
    name?: any;
    address?: any;
    geolocation?: any;
  }[];
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

export interface Product {
  id: string;
  name?: any;
  category?: any;
  branches?: any;
}

export interface Branch {
  id: string;
  name?: any;
  address?: any;
  geolocation?: any;
}

export interface BranchAddUpdateResponse {
  address: string;
  geolocation: string;
  id: string;
  isactive?: any;
  name: string;
  _etag: string;
  _rid: string;
  _self: string;
  _ts: number;
}
