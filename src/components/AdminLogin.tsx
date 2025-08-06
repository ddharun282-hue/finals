@@ .. @@
 import React, { useState } from 'react';
-import { Lock, Eye, EyeOff } from 'lucide-react';
+import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
+import { useNavigate } from 'react-router-dom';

 interface AdminLoginProps {
   onLogin: () => void;
 }

 const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
+  const navigate = useNavigate();
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setError('');

     // Simple password check - in production, use proper authentication
     if (password === '123abcd#') {
       localStorage.setItem('adminAuth', 'true');
       onLogin();
     } else {
       setError('Invalid password');
     }
     
     setLoading(false);
   };

   return (
     <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
+      {/* Back to Website Button */}
+      <button
+        onClick={() => navigate('/')}
+        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
+      >
+        <ArrowLeft className="w-5 h-5" />
+        <span>Back to Website</span>
+      </button>
+
       <div className="max-w-md w-full space-y-8">
         <div>
           <div className="mx-auto h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center">
             <Lock className="h-6 w-6 text-gray-300" />
           </div>
           <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
             Admin Access
           </h2>
           <p className="mt-2 text-center text-sm text-gray-400">
             Enter password to access admin dashboard
           </p>
         </div>
         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
           <div>
             <label htmlFor="password" className="sr-only">
               Password
             </label>
             <div className="relative">
               <input
                 id="password"
                 name="password"
                 type={showPassword ? 'text' : 'password'}
                 required
                 className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                 placeholder="Enter admin password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-gray-400" />
               </div>
               <button
                 type="button"
                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
                 onClick={() => setShowPassword(!showPassword)}
               >
                 {showPassword ? (
                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                 ) : (
                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                 )}
               </button>
             </div>
           </div>

           {error && (
             <div className="text-red-400 text-sm text-center">{error}</div>
           )}

           <div>
             <button
               type="submit"
               disabled={loading}
               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {loading ? 'Verifying...' : 'Access Dashboard'}
             </button>
           </div>
         </form>
       </div>
     </div>
   );
 };

 export default AdminLogin;