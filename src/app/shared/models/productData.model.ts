export interface ProductAddUpdateResponse {
  id: string;
  name: string;
  category: string;
  branches: Branch[];
  isActive?: any;
  _rid: string;
  _self: string;
  _etag: string;
  _ts: number;
}
export interface ProductData {
  id: string;
  name: string;
  category: string;
  branches: Branch[];
  isactive: string;
}

interface Branch {
  id: string;
  name?: any;
  address?: any;
  geolocation?: any;
  isactive: string;
}
