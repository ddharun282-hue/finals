@@ .. @@
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setSubmitting(true);
    
    try {
      // Create order data
      const orderData = {
        _id: 'order_' + Date.now(),
        customerInfo,
        shippingAddress,
        billingAddress: billingInfo.sameAsShipping ? {
          sameAsShipping: true,
          address: shippingAddress.address,
          apartment: shippingAddress.apartment,
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.pincode,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          company: customerInfo.company,
          phone: customerInfo.phone
        } : billingInfo,
        // Legacy fields for backward compatibility
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: {
          street: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.pincode
        },
        items: [{
          productId: product._id,
          productName: product.name,
          quantity,
          price: product.price
        }],
        paymentMethod,
        totalAmount: calculateTotal(),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Save customer info if requested
      if (customerInfo.saveInfo) {
        localStorage.setItem('customerInfo', JSON.stringify({
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          company: customerInfo.company,
          address: customerInfo.address,
          apartment: customerInfo.apartment,
          city: customerInfo.city,
          state: customerInfo.state,
          pincode: customerInfo.pincode,
          phone: customerInfo.phone
        }));
      }

      // Handle payment based on method
      if (paymentMethod === 'razorpay') {
        // Initialize Razorpay payment
        const options = {
          key: 'rzp_test_9WsLnHkruf61R7', // Replace with your Razorpay key
          amount: calculateTotal() * 100, // Amount in paise
          currency: 'INR',
          name: 'TrustyLads',
          description: `Order for ${product.name}`,
          order_id: orderData._id,
          handler: function (response: any) {
            // Payment successful
            console.log('Payment successful:', response);
            
            // Save order to admin panel
            const existingOrders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
            existingOrders.push({
              ...orderData,
              paymentId: response.razorpay_payment_id,
              status: 'confirmed'
            });
            localStorage.setItem('adminOrders', JSON.stringify(existingOrders));
            
            // Dispatch event for admin panel
            const event = new CustomEvent('newOrder', { detail: orderData });
            window.dispatchEvent(event);
            
            const mockOrderId = 'TL' + Date.now().toString().slice(-6);
            setOrderId(mockOrderId);
            setOrderSuccess(true);
          },
          prefill: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            contact: customerInfo.phone
          },
          theme: {
            color: '#2563eb'
          }
        };

        // Load Razorpay script and open payment
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      } else {
        // COD - directly save order
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Save order to admin panel
        const existingOrders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
        existingOrders.push(orderData);
        localStorage.setItem('adminOrders', JSON.stringify(existingOrders));
        
        // Dispatch event for admin panel
        const event = new CustomEvent('newOrder', { detail: orderData });
        window.dispatchEvent(event);
        
        const mockOrderId = 'TL' + Date.now().toString().slice(-6);
        setOrderId(mockOrderId);
        setOrderSuccess(true);
      }
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>{paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}</span>
                    </>
                  )}
                </button>