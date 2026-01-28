// Dashboard JavaScript

// Toggle mobile navigation
function toggleDashboardNav() {
  const nav = document.querySelector('.main-nav');
  nav.classList.toggle('active');
}

// Close nav when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');
  
  if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('active');
  }
});

// Close nav when clicking on a link
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.main-nav').classList.remove('active');
  });
});

// Toggle notifications
function toggleNotifications() {
  alert('Notifications panel will be implemented here');
}

// Toggle user menu
function toggleUserMenu() {
  const userMenu = document.querySelector('.user-menu');
  if (!userMenu) return;
  
  // Check if menu already exists
  const existingMenu = userMenu.querySelector('.user-dropdown');
  if (existingMenu) {
    existingMenu.remove();
    return;
  }
  
  const menu = document.createElement('div');
  menu.className = 'user-dropdown';
  menu.innerHTML = `
    <div class="dropdown-item" onclick="window.location.href='profile.html'">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span>Profile</span>
    </div>
    <div class="dropdown-item" onclick="window.location.href='settings.html'">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6"></path>
      </svg>
      <span>Settings</span>
    </div>
    <div class="dropdown-divider"></div>
    <div class="dropdown-item" onclick="logout()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      <span>Logout</span>
    </div>
  `;
  
  // Add styles only once
  if (!document.getElementById('user-dropdown-styles')) {
    const style = document.createElement('style');
    style.id = 'user-dropdown-styles';
    style.textContent = `
      .user-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 8px;
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 8px;
        min-width: 200px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
      }
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--text-primary, #F1F5F9);
      }
      .dropdown-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .dropdown-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 8px 0;
      }
    `;
    document.head.appendChild(style);
  }
  
  userMenu.style.position = 'relative';
  userMenu.appendChild(menu);
  
  // Close on click outside
  setTimeout(() => {
    document.addEventListener('click', function closeMenu(e) {
      if (!userMenu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 100);
}

// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('rfex_user');
    window.location.href = 'login.html';
  }
}

// Initialize portfolio chart
function initPortfolioChart() {
  const canvas = document.getElementById('portfolioChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = 80;
  
  // Generate sample data
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push(40000 + Math.random() * 10000);
  }
  
  // Draw chart
  const padding = 10;
  const width = canvas.width - padding * 2;
  const height = canvas.height - padding * 2;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Draw line
  ctx.strokeStyle = '#FFB703';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  // Guard against divide-by-zero
  const safeRange = range || 1;
  
  data.forEach((value, i) => {
    const x = padding + (width * i / (data.length - 1));
    const y = padding + height - ((value - min) / safeRange * height);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Draw gradient fill
  const lastX = padding + width;
  const lastY = padding + height - ((data[data.length - 1] - min) / range * height);
  
  ctx.lineTo(lastX, padding + height);
  ctx.lineTo(padding, padding + height);
  ctx.closePath();
  
  const gradient = ctx.createLinearGradient(0, padding, 0, padding + height);
  gradient.addColorStop(0, 'rgba(255, 183, 3, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 183, 3, 0)');
  ctx.fillStyle = gradient;
  ctx.fill();
}

// Load user data
function loadUserData() {
  let user = {};
  try {
    const userData = localStorage.getItem('rfex_user');
    user = userData ? JSON.parse(userData) : {};
  } catch (e) {
    console.error('Failed to parse user data:', e);
    return;
  }
  
  // Validate user data before using
  if (user.firstName && user.lastName && typeof user.firstName === 'string' && typeof user.lastName === 'string') {
    // Update user name
    const userName = document.querySelector('.user-btn span');
    if (userName) {
      userName.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    // Update avatar
    const avatar = document.querySelector('.user-avatar');
    if (avatar && user.firstName[0] && user.lastName[0]) {
      avatar.textContent = `${user.firstName[0]}${user.lastName[0]}`;
    }
    
    // Update welcome message
    const welcomeMsg = document.querySelector('.page-header h1');
    if (welcomeMsg) {
      welcomeMsg.textContent = `Welcome back, ${user.firstName}! 👋`;
    }
  }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  initPortfolioChart();
  loadUserData();
});

// Refresh functionality
window.addEventListener('resize', function() {
  initPortfolioChart();
});
