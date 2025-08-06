@@ .. @@
 import React, { useState, useEffect } from 'react';
+import { useSearchParams, useParams } from 'react-router-dom';
 import ProductCard from '../components/ProductCard';
 import { Product } from '../types';
 import { Filter, Grid, List, Search } from 'lucide-react';

 const Shop: React.FC = () => {
+  const [searchParams] = useSearchParams();
+  const { category } = useParams();
   const [products, setProducts] = useState<Product[]>([]);
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(true);
-  const [selectedCategory, setSelectedCategory] = useState<string>('all');
+  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
   const [priceRange, setPriceRange] = useState<string>('all');
-  const [searchTerm, setSearchTerm] = useState<string>('');
+  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
   const [sortBy, setSortBy] = useState<string>('name');
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   useEffect(() => {
     fetchProducts();
   }, []);

+  useEffect(() => {
+    // Update category when URL changes
+    if (category) {
+      setSelectedCategory(category);
+    }
+  }, [category]);
+
+  useEffect(() => {
+    // Update search term when URL changes
+    const search = searchParams.get('search');
+    if (search) {
+      setSearchTerm(search);
+    }
+  }, [searchParams]);
+
   useEffect(() => {
     filterProducts();
   }, [products, selectedCategory, priceRange, searchTerm, sortBy]);