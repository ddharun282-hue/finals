# TrustyLads - Dropshipping E-commerce Platform

A complete custom-built e-commerce solution for dropshipping business with manual order fulfillment workflow.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse shirts, watches, jewelry with filtering and search
- **Product Details**: Detailed product pages with image galleries and specifications
- **Order System**: Simple order form with shipping address and contact details
- **Responsive Design**: Mobile-first design optimized for all devices
- **Trust Elements**: Security badges, customer reviews, and guarantees

### Admin Features
- **Dashboard**: Overview of orders, revenue, and key metrics
- **Order Management**: View, update order status, add tracking information
- **Product Management**: Add, edit, delete products and manage inventory
- **Customer Data**: Access customer information and order history
- **Manual Fulfillment**: Update order status as you fulfill them manually

### Technical Features
- **Custom Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT-based admin authentication
- **RESTful API**: Well-structured API endpoints
- **Data Validation**: Input validation and error handling
- **Responsive UI**: Beautiful Tailwind CSS interface

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Create .env file with your configuration
# MONGODB_URI=mongodb://localhost:27017/trustylads
# JWT_SECRET=your-secret-key

# Start backend server
npm start

# For development with auto-restart
npm run dev
```

### Default Admin Credentials
- **Email**: admin@trustylads.com
- **Password**: admin123

## 🔧 Configuration

### Environment Variables (.env)
```env
MONGODB_URI=mongodb://localhost:27017/trustylads
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

### Database Setup
The application will automatically:
- Connect to MongoDB
- Create necessary collections
- Set up default admin user

## 📱 Usage Guide

### For Customers
1. **Browse Products**: Visit homepage and explore categories
2. **View Details**: Click on products to see detailed information
3. **Place Order**: Click "Order Now" and fill the order form
4. **Track Order**: Receive order confirmation with tracking details

### For Admin (Manual Fulfillment Workflow)
1. **Login**: Access `/admin` with admin credentials
2. **View Orders**: Check new orders in the dashboard
3. **Fulfill Manually**: 
   - Go to your supplier (Meesho, etc.)
   - Place the order with customer's address
   - Get tracking ID from supplier
4. **Update Status**: Mark order as shipped and add tracking ID
5. **Customer Notification**: Manually notify customer via WhatsApp/SMS/Email

## 🏗 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── types/               # TypeScript type definitions
│   └── App.tsx             # Main app component
├── server/
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── server.js           # Server entry point
└── public/                 # Static assets
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy 'dist' folder
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy server folder
```

### Database (MongoDB Atlas)
- Create MongoDB Atlas cluster
- Update MONGODB_URI in environment variables

## 🔐 Security Features

- **Input Validation**: All user inputs are validated
- **Password Hashing**: Admin passwords are securely hashed
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured for secure cross-origin requests
- **SQL Injection Prevention**: MongoDB + Mongoose protection

## 🎨 Design Philosophy

- **Trust-First Design**: Elements that build customer confidence
- **Mobile-First**: Responsive design optimized for mobile shopping
- **Conversion Optimization**: Clear CTAs and streamlined checkout
- **Admin Efficiency**: Simple, functional admin interface for quick order management

## 📊 Business Model

This platform is designed for **dropshipping with manual fulfillment**:

1. **Customer places order** on your website
2. **You receive order** in admin dashboard
3. **You manually place order** with supplier (Meesho, etc.)
4. **You update tracking** information in the system
5. **You manually notify customer** about shipping status

## 🔄 Order Status Flow

- **Pending**: New order placed by customer
- **Confirmed**: Order confirmed and ready to fulfill
- **Shipped**: Order shipped with tracking ID
- **Delivered**: Order delivered to customer
- **Cancelled**: Order cancelled

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@trustylads.com
- Documentation: Check README and code comments

---

**TrustyLads** - Building trust through quality products and exceptional service! 🛍️