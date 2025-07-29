import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, PropertyContextType } from '../types/Property';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const STORAGE_KEY = 'propertyDashboard';
const DARK_MODE_KEY = 'propertyDashboard_darkMode';

const sampleProperties: Property[] = [
  {
    id: '1',
    name: 'Green Valley Plot',
    type: 'Plot',
    location: 'Pune',
    price: 250000,
    description: 'A large plot of land available for development.',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Modern Shed',
    type: 'Shed',
    location: 'Bangalore',
    price: 76000,
    description: 'An industrial shed in a prime location.',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'City Center Store',
    type: 'Retail Store',
    location: 'Hyderabad',
    price: 150000,
    description: 'A commercial retail space in city center.',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Premium Plot Store',
    type: 'Plot',
    location: 'Khermai',
    price: 200000,
    description: 'A spacious plot situated in a serene area.',
    image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Urban Plot',
    type: 'Plot',
    location: 'Chennai',
    price: 300000,
    description: 'A spacious plot situated in serene area.',
    image: 'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Industrial Shed',
    type: 'Shed',
    location: 'Mumbai',
    price: 30000,
    description: 'A together industrial shed.',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Commercial Space',
    type: 'Retail Store',
    location: 'Kolkata',
    price: 175000,
    description: 'A commercial retail space in city center.',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Development Land',
    type: 'Plot',
    location: 'Jaipur',
    price: 160000,
    description: 'A large plot of land available for development.',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedProperties = localStorage.getItem(STORAGE_KEY);
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);
    
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      setProperties(sampleProperties);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProperties));
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const saveProperties = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProperties));
  };

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newProperties = [...properties, newProperty];
    saveProperties(newProperties);
  };

  const updateProperty = (id: string, propertyData: Partial<Property>) => {
    const newProperties = properties.map(property =>
      property.id === id
        ? { ...property, ...propertyData, updatedAt: new Date().toISOString() }
        : property
    );
    saveProperties(newProperties);
  };

  const deleteProperty = (id: string) => {
    const newProperties = properties.filter(property => property.id !== id);
    saveProperties(newProperties);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(newDarkMode));
  };

  const value: PropertyContextType = {
    properties,
    loading,
    searchTerm,
    filterType,
    darkMode,
    addProperty,
    updateProperty,
    deleteProperty,
    setSearchTerm,
    setFilterType,
    toggleDarkMode,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};