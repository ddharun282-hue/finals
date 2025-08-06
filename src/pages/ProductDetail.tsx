import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Truck, Shield, RefreshCw, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleOrderNow = () => {
    if (product) {
      // Navigate to order form with product details
      window.location.href = `/checkout?product=${product._id}&quantity=${quantity}&size=${selectedSize}`;
    }
  };

  const addToCart = () => {
    if (!product) return;

    const cartItem = {
      product,
      quantity,
      size: selectedSize
    };

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.product._id === product._id && item.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch event to update cart count
    const event = new CustomEvent('cartUpdated', { 
      detail: { count: existingCart.reduce((sum: number, item: any) => sum + item.quantity, 0) }
    });
    window.dispatchEvent(event);

    // Show success message (you can replace with a toast notification)
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-gray-500">
                Products
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50 ${
                      index === activeImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <span className="sr-only">Image {index + 1}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-center object-cover"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main image */}
            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                      } h-5 w-5 flex-shrink-0`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                </div>

                <fieldset className="mt-2">
                  <legend className="sr-only">Choose a size</legend>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {product.sizes.map((size) => (
                      <label
                        key={size}
                        className={`cursor-pointer bg-white border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 ${
                          selectedSize === size
                            ? 'bg-blue-600 border-transparent text-white hover:bg-blue-700'
                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="size-choice"
                          value={size}
                          className="sr-only"
                          checked={selectedSize === size}
                          onChange={(e) => setSelectedSize(e.target.value)}
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">Quantity</h3>
              </div>
              <div className="mt-2">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Order Button */}
            <div className="space-y-4">
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  product.inStock
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-300'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              <button
                onClick={handleOrderNow}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  product.inStock
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.inStock ? 'Order Now' : 'Out of Stock'}</span>
              </button>
            </div>

            {/* Product features */}
            <section className="mt-12 pt-12 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Features</h3>
              <div className="mt-4 space-y-6">
                <div className="flex">
                  <Truck className="flex-shrink-0 w-5 h-5 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      Free shipping on orders over $100
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Shield className="flex-shrink-0 w-5 h-5 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      2 year warranty
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <RefreshCw className="flex-shrink-0 w-5 h-5 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;