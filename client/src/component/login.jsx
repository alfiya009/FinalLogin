import React, { useState } from 'react';
import { Droplets, User, Mail, Lock, MapPin, Eye, EyeOff, Phone } from 'lucide-react';

const MUMBAI_AREAS = [
  'Andheri East', 'Andheri West', 'Bandra East', 'Bandra West', 'Borivali East', 'Borivali West',
  'Colaba', 'Dadar East', 'Dadar West', 'Fort', 'Ghatkopar East', 'Ghatkopar West',
  'Juhu', 'Kandivali East', 'Kandivali West', 'Kurla East', 'Kurla West', 'Lower Parel',
  'Malad East', 'Malad West', 'Marine Lines', 'Powai', 'Santa Cruz East', 'Santa Cruz West',
  'Thane West', 'Versova', 'Vikhroli East', 'Vikhroli West', 'Worli'
];

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    contact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLogin
        ? { email: formData.email, password: formData.password, city: formData.city }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            city: formData.city,
            contact: formData.contact
          };

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert(isLogin ? 'Login successful!' : 'Account created successfully!');
        
        // Check for alerts for the selected city after successful login or signup
        await fetch('http://localhost:3001/api/alerts/send-by-city', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                city: formData.city
            }),
        });
        
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      alert('Connection error. Please try again.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const colors = {
    yellowish: '#F9E79F',
    lightBlue: '#D6EAF8',
    lightPurple: '#B5C7F7',
    beige: '#E8D5C4',
    dark: '#22223B'
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: `linear-gradient(to bottom right, ${colors.lightBlue}, ${colors.lightPurple})`
    }}>
      <div className="w-full max-w-6xl flex items-center justify-between space-x-12">
        
        {/* Left Side: Text and Droplets Icon */}
        <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-4 shadow-xl" style={{ backgroundColor: colors.lightPurple }}>
                <Droplets className="w-10 h-10" style={{ color: colors.dark }} />
            </div>
            <h1 className="text-5xl font-bold mb-4" style={{ color: colors.dark }}>Flood Management</h1>
            <p className="text-xl" style={{ color: colors.dark }}>Stay Safe • Stay Informed</p>
        </div>

        {/* Right Side: Login/Signup Form */}
        <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{ color: colors.dark }}>
                  {isLogin ? 'Welcome Back!' : 'Welcome!'}
                </h2>
                <p className="text-gray-600" style={{ color: colors.dark }}>
                  {isLogin ? 'Sign in to your account' : 'Please enter your details'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isLogin ? (
                  <>
                    {/* Email for Login */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5" style={{ color: colors.dark }} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50"
                        style={{
                          border: '1px solid #E5E7EB',
                          '--tw-ring-color': colors.lightPurple,
                          '--tw-ring-offset-width': '2px',
                          '--tw-ring-offset-color': '#fff',
                        }}
                        required
                      />
                    </div>

                    {/* Password for Login */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5" style={{ color: colors.dark }} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50"
                        style={{
                          border: '1px solid #E5E7EB',
                          '--tw-ring-color': colors.lightPurple,
                          '--tw-ring-offset-width': '2px',
                          '--tw-ring-offset-color': '#fff',
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" style={{ color: colors.dark }} />
                        ) : (
                          <Eye className="h-5 w-5" style={{ color: colors.dark }} />
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Name and Contact in one line (for Sign Up) */}
                    <div className="flex space-x-4">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5" style={{ color: colors.dark }} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50"
                          style={{
                            border: '1px solid #E5E7EB',
                            '--tw-ring-color': colors.lightPurple,
                            '--tw-ring-offset-width': '2px',
                            '--tw-ring-offset-color': '#fff',
                          }}
                          required
                        />
                      </div>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5" style={{ color: colors.dark }} />
                        </div>
                        <input
                          type="tel"
                          name="contact"
                          placeholder="Contact Number"
                          value={formData.contact}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50"
                          style={{
                            border: '1px solid #E5E7EB',
                            '--tw-ring-color': colors.lightPurple,
                            '--tw-ring-offset-width': '2px',
                            '--tw-ring-offset-color': '#fff',
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* Email on a new line */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5" style={{ color: colors.dark }} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50"
                        style={{
                          border: '1px solid #E5E7EB',
                          '--tw-ring-color': colors.lightPurple,
                          '--tw-ring-offset-width': '2px',
                          '--tw-ring-offset-color': '#fff',
                        }}
                        required
                      />
                    </div>

                    {/* Password on a new line */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5" style={{ color: colors.dark }} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50"
                        style={{
                          border: '1px solid #E5E7EB',
                          '--tw-ring-color': colors.lightPurple,
                          '--tw-ring-offset-width': '2px',
                          '--tw-ring-offset-color': '#fff',
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" style={{ color: colors.dark }} />
                        ) : (
                          <Eye className="h-5 w-5" style={{ color: colors.dark }} />
                        )}
                      </button>
                    </div>
                    
                    {/* Confirm Password on a new line */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5" style={{ color: colors.dark }} />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50"
                        style={{
                          border: '1px solid #E5E7EB',
                          '--tw-ring-color': colors.lightPurple,
                          '--tw-ring-offset-width': '2px',
                          '--tw-ring-offset-color': '#fff',
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" style={{ color: colors.dark }} />
                        ) : (
                          <Eye className="h-5 w-5" style={{ color: colors.dark }} />
                        )}
                      </button>
                    </div>
                  </>
                )}

                {/* City selection, visible for both Login and Signup */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5" style={{ color: colors.dark }} />
                  </div>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl transition-all duration-200 bg-gray-50 appearance-none cursor-pointer"
                    style={{
                      border: '1px solid #E5E7EB',
                      '--tw-ring-color': colors.lightPurple,
                      '--tw-ring-offset-width': '2px',
                      '--tw-ring-offset-color': '#fff',
                    }}
                    required
                  >
                    <option value="">Select Your City</option>
                    {MUMBAI_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.dark }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  style={{ backgroundColor: colors.lightPurple }}
                >
                  {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Get Started')}
                </button>
              </form>

              {!isLogin && (
                <div className="mt-6 text-center">
                  <p className="text-sm" style={{ color: colors.dark }}>
                    Your city selection helps us provide personalized flood alerts and weather information.
                  </p>
                </div>
              )}

              <div className="mt-8 text-center">
                <p className="text-gray-600" style={{ color: colors.dark }}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-semibold transition-colors duration-200"
                    style={{ color: colors.lightPurple }}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;