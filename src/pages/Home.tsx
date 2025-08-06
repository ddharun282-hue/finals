import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { Sparkles, TrendingUp, Award } from 'lucide-react';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Mock data for demo - replace with actual API call
      const mockProducts: Product[] = [
        {
          _id: '1',
          name: 'Premium Cotton Shirt - Navy Blue',
          price: 899,
          originalPrice: 1299,
          image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'shirts',
          description: 'High-quality cotton shirt perfect for formal and casual wear',
          inStock: true,
          featured: true
        },
        {
          _id: '2',
          name: 'Luxury Steel Watch - Silver',
          price: 2499,
          originalPrice: 3999,
          image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'watches',
          description: 'Elegant steel watch with precision movement and waterproof design',
          inStock: true,
          featured: true
        },
        {
          _id: '3',
          name: 'Gold Plated Chain Necklace',
          price: 1299,
          originalPrice: 1999,
          image: 'https://images.pexels.com/photos/1170204/pexels-photo-1170204.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'jewelry',
          description: 'Beautiful gold plated chain necklace for special occasions',
          inStock: true,
          featured: true
        },
        {
          _id: '4',
          name: 'Casual Cotton T-Shirt - White',
          price: 499,
          originalPrice: 799,
          image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'shirts',
          description: 'Comfortable cotton t-shirt for everyday wear',
          inStock: true,
          featured: true
        }
      ];
      
      setFeaturedProducts(mockProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Featured Collection</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trending Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular items loved by thousands of customers
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span>View All Products</span>
              <TrendingUp className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/categories/shirts"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Shirts"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Shirts</h3>
                <p className="text-gray-600 mb-4">Formal & casual shirts for every occasion</p>
                <span className="text-blue-600 font-semibold">Explore Collection →</span>
              </div>
            </Link>
            
            <Link
              to="/categories/watches"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Watches"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Luxury Watches</h3>
                <p className="text-gray-600 mb-4">Timepieces that make a statement</p>
                <span className="text-blue-600 font-semibold">Explore Collection →</span>
              </div>
            </Link>
            
            <Link
              to="/categories/jewelry"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.pexels.com/photos/1170204/pexels-photo-1170204.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Jewelry"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Elegant Jewelry</h3>
                <p className="text-gray-600 mb-4">Beautiful pieces for special moments</p>
                <span className="text-blue-600 font-semibold">Explore Collection →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              <span>Why Choose TrustyLads</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quality You Can Trust
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Hand-picked products that meet our strict quality standards
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">24/7</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always here to help you with any questions
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-purple-600">10K+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Happy Customers</h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers who trust TrustyLads
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;