// Configuration
const API_ENDPOINT = 'http://localhost:3001/api/messages'; // Move to config
const MESSAGES_CONTAINER_ID = 'messages-container';

// DOM Elements
let messagesContainer;
let isLoading = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  messagesContainer = document.getElementById(MESSAGES_CONTAINER_ID);
  if (!messagesContainer) {
    console.error('Messages container not found');
    return;
  }
  
  loadMessages();
});

async function loadMessages() {
  if (isLoading) return;
  
  try {
    isLoading = true;
    showLoadingState();
    
    const response = await fetch(API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const { success, messages, error } = await response.json();
    
    if (!success) {
      throw new Error(error || 'Failed to load messages');
    }
    
    renderMessages(messages);
    
  } catch (error) {
    showErrorMessage(error);
  } finally {
    isLoading = false;
    hideLoadingState();
  }
}

function renderMessages(messages) {
  if (!messages || messages.length === 0) {
    messagesContainer.innerHTML = `
      <div class="no-messages">
        <p>No messages found</p>
      </div>
    `;
    return;
  }

  messagesContainer.innerHTML = messages.map(msg => `
    <div class="message-card">
      <div class="message-header">
        <h3>${escapeHTML(msg.name)}</h3>
        <div class="message-meta">
          <a href="mailto:${escapeHTML(msg.email)}">${escapeHTML(msg.email)}</a>
          <time datetime="${msg.timestamp}">
            ${formatDate(msg.timestamp)}
          </time>
        </div>
      </div>
      <div class="message-content">
        <p>${escapeHTML(msg.message)}</p>
      </div>
    </div>
  `).join('');
}

// Helper functions
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function showLoadingState() {
  messagesContainer.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading messages...</p>
    </div>
  `;
}

function hideLoadingState() {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) spinner.remove();
}

function showErrorMessage(error) {
  console.error('Error:', error);
  messagesContainer.innerHTML = `
    <div class="error-message">
      <p>⚠️ Failed to load messages</p>
      <button onclick="loadMessages()">Retry</button>
    </div>
  `;
}

// Optional: Auto-refresh every 30 seconds
setInterval(loadMessages, 30000);