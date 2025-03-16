
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";



const LoginModal = ({ isOpen, onClose }) => {
  const {createUserEmailPass,signInUserEmailPass,authenticateWithGoogle} = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const [errors, setErrors] = useState({});
  const [animateOut, setAnimateOut] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!isLogin && !formData.name) newErrors.name = 'Name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Form submitted: ---', formData);
      if(!isLogin){
        createUserEmailPass(formData.name , formData.email , formData.password)
        .then(res=>{
          updateProfile(res.user, {
            displayName: formData.name
          }).then(() => {
            console.log("profile Update!");
          }).catch((error) => {
            console.log("Some issu occured..!!");
          });

        })
        .then(err=>console.log(err))
 
      }else{
        signInUserEmailPass(formData.email,formData.password)
        .then(res=>console.log(res.user))
        .then(err=>console.log(err))
      }
      
      handleClose();
    }
  };
  const handelGoogleLogin=()=>{
    authenticateWithGoogle()
    .then(res=>console.log(res.user))
    .catch(err=>console.log(err));
    handleClose();
  }
  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
      setAnimateOut(false);
      setErrors({});
    }, 300);
  };
  
  if (!isOpen) return null;
  
  const modalClasses = animateOut 
    ? 'opacity-0 translate-y-4 scale-95'
    : 'opacity-100 translate-y-0 scale-100';
    
  const overlayClasses = animateOut
    ? 'opacity-0'
    : 'opacity-100';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto transition-opacity duration-300 ${overlayClasses}`}>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div 
        className={`relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 transition-all duration-300 ${modalClasses}`}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-sport-darkgray">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 mt-1">
            {isLogin ? 'Login to access your account' : 'Join the SportsSphere community'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.name ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-sport-blue'
                } bg-gray-50 outline-none transition-all duration-200`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.name}</p>
              )}
            </div>
          )}
          
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full px-4 py-3 rounded-lg ${
                errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-sport-blue'
              } bg-gray-50 outline-none transition-all duration-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.email}</p>
            )}
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-lg ${
                errors.password ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-sport-blue'
              } bg-gray-50 outline-none transition-all duration-200`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.password}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-sport-blue text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className='flex justify-center gap-3 text-black w-[40%] m-auto'>
                <div className="relative w-full">
                    <div className="absolute bottom-1/2 w-full border-t border-gray-600"></div>
                </div>
                <div><p>or</p></div>
                <div className="relative w-full">
                    <div className="absolute bottom-1/2 w-full border-t border-gray-600"></div>
                </div>
            </div>

        <button
            onClick={handelGoogleLogin}
            className="flex justify-center items-center w-full bg-gray-300 text-black py-3 rounded-lg font-medium transition-all duration-300 transform hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
           <FcGoogle className='inline text-2xl me-2'></FcGoogle> <p>{isLogin ? 'Login With Google' : 'Sign Up with Google'}</p>
          </button>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sport-blue font-medium hover:underline transition-all"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
