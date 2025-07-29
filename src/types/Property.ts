export interface Property {
  id: string;
  name: string;
  type: 'Plot' | 'Shed' | 'Retail Store' | 'Apartment' | 'House' | 'Commercial';
  location: string;
  price: number;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  searchTerm: string;
  filterType: string;
  darkMode: boolean;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setFilterType: (type: string) => void;
  toggleDarkMode: () => void;
}