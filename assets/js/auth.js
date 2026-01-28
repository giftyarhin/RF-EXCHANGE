// Authentication JavaScript

// Toggle password visibility
function togglePassword(fieldId = 'password') {
  const input = document.getElementById(fieldId);
  if (!input) return;
  
  const icon = input.parentElement?.querySelector('.toggle-password svg');
  if (!icon) return;
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
  } else {
    input.type = 'password';
    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
  }
}

// Password strength checker
const passwordInput = document.getElementById('password');
if (passwordInput) {
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    if (!password) {
      strengthFill.style.width = '0%';
      strengthFill.className = 'strength-fill';
      strengthText.textContent = 'Password strength';
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Update UI
    if (strength <= 2) {
      strengthFill.className = 'strength-fill weak';
      strengthText.textContent = 'Weak password';
      strengthText.style.color = '#ef4444';
    } else if (strength <= 4) {
      strengthFill.className = 'strength-fill medium';
      strengthText.textContent = 'Medium password';
      strengthText.style.color = '#f59e0b';
    } else {
      strengthFill.className = 'strength-fill strong';
      strengthText.textContent = 'Strong password';
      strengthText.style.color = '#10b981';
    }
  });
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const errorMessage = document.getElementById('errorMessage');
    
    // Show loader
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    errorMessage.style.display = 'none';
    
    // Get form data
    const formData = new FormData(this);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      remember: formData.get('remember') === 'on'
    };
    
    // Simulate API call
    try {
      // In production, replace with actual API call:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any email/password
      // Store user session
      // PRODUCTION: Use httpOnly cookies set by server for secure auth tokens
      // For demo only: storing minimal data in localStorage
      localStorage.setItem('rfex_user', JSON.stringify({
        loggedIn: true,
        loginTime: new Date().toISOString()
      }));
      
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
      
    } catch (error) {
      // Show error
      errorMessage.textContent = error.message || 'Login failed. Please try again.';
      errorMessage.style.display = 'block';
      
      // Reset button
      btnText.style.display = 'block';
      btnLoader.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate password match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match!';
      errorMessage.style.display = 'block';
      return;
    }
    
    // Show loader
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    errorMessage.style.display = 'none';
    
    // Get form data
    const formData = new FormData(this);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      referralCode: formData.get('referralCode')
    };
    
    // Simulate API call
    try {
      // In production, replace with actual API call:
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, auto-register
      // PRODUCTION: User data should be stored server-side only
      // For demo: Store only session info, not PII
      localStorage.setItem('rfex_user', JSON.stringify({
        loggedIn: true,
        loginTime: new Date().toISOString()
      }));
      
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
      
    } catch (error) {
      // Show error
      errorMessage.textContent = error.message || 'Registration failed. Please try again.';
      errorMessage.style.display = 'block';
      
      // Reset button
      btnText.style.display = 'block';
      btnLoader.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// Social login handler
function socialLogin(provider) {
  console.log(`Logging in with ${provider}...`);
  
  // In production, implement OAuth flow
  // For demo, show alert
  alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login will be implemented with OAuth in production.`);
  
  // For demo, simulate successful login
  // PRODUCTION: Store only session info, not PII
  localStorage.setItem('rfex_user', JSON.stringify({
    loggedIn: true,
    provider: provider,
    loginTime: new Date().toISOString()
  }));
  
  // Redirect to dashboard
  window.location.href = 'dashboard.html';
}

// Check authentication on protected pages
function checkAuth() {
  const userStr = localStorage.getItem('rfex_user');
  const currentPage = window.location.pathname.split('/').pop();
  
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error('Invalid user data in localStorage');
    localStorage.removeItem('rfex_user');
  }
  
  const isLoggedIn = user && user.loggedIn === true;
  
  // Pages that require authentication
  const protectedPages = ['dashboard.html', 'trading.html', 'wallets.html', 'p2p.html', 'gift-cards.html'];
  
  if (protectedPages.includes(currentPage) && !isLoggedIn) {
    window.location.href = 'login.html';
  }
  
  // Redirect logged-in users away from login/register pages
  const authPages = ['login.html', 'register.html'];
  if (authPages.includes(currentPage) && isLoggedIn) {
    window.location.href = 'dashboard.html';
  }
}

// Run auth check on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAuth);
} else {
  checkAuth();
}

// Logout function
function logout() {
  localStorage.removeItem('rfex_user');
  window.location.href = 'login.html';
}
