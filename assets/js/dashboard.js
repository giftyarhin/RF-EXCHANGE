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
  const notificationBtn = document.querySelector('.notification-btn');
  if (!notificationBtn) return;
  
  // Check if panel already exists
  const existingPanel = document.querySelector('.notification-panel');
  if (existingPanel) {
    existingPanel.remove();
    return;
  }
  
  const panel = document.createElement('div');
  panel.className = 'notification-panel';
  panel.innerHTML = `
    <div class="notification-header">
      <h4>Notifications</h4>
      <button onclick="markAllRead()" style="background: none; border: none; color: #FFB703; cursor: pointer; font-size: 0.85rem;">Mark all read</button>
    </div>
    <div class="notification-list">
      <div class="notification-item unread">
        <div class="notification-icon" style="background: #10b981;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-title">Deposit Successful</div>
          <div class="notification-text">$5,000 has been added to your wallet</div>
          <div class="notification-time">2 hours ago</div>
        </div>
      </div>
      <div class="notification-item unread">
        <div class="notification-icon" style="background: #FFB703;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-title">Price Alert</div>
          <div class="notification-text">BTC reached your target price of $90,000</div>
          <div class="notification-time">4 hours ago</div>
        </div>
      </div>
      <div class="notification-item">
        <div class="notification-icon" style="background: #06B6D4;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-title">KYC Verified</div>
          <div class="notification-text">Your account has been verified</div>
          <div class="notification-time">1 day ago</div>
        </div>
      </div>
    </div>
  `;
  
  // Add notification styles
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notification-panel {
        position: absolute;
        top: 100%;
        right: 60px;
        margin-top: 8px;
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        width: 360px;
        max-height: 500px;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
      }
      .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .notification-header h4 {
        margin: 0;
        color: #F1F5F9;
        font-size: 1rem;
      }
      .notification-list {
        padding: 8px;
      }
      .notification-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 4px;
      }
      .notification-item:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      .notification-item.unread {
        background: rgba(255, 183, 3, 0.05);
      }
      .notification-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .notification-content {
        flex: 1;
      }
      .notification-title {
        color: #F1F5F9;
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 4px;
      }
      .notification-text {
        color: #94A3B8;
        font-size: 0.85rem;
        margin-bottom: 4px;
      }
      .notification-time {
        color: #64748B;
        font-size: 0.75rem;
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(panel);
  
  // Close when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closePanel(e) {
      if (!panel.contains(e.target) && !notificationBtn.contains(e.target)) {
        panel.remove();
        document.removeEventListener('click', closePanel);
      }
    });
  }, 0);
}

function markAllRead() {
  document.querySelectorAll('.notification-item.unread').forEach(item => {
    item.classList.remove('unread');
  });
  const badge = document.querySelector('.notification-badge');
  if (badge) badge.textContent = '0';
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
  const lastY = padding + height - ((data[data.length - 1] - min) / safeRange * height);
  
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
