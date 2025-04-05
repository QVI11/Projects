// Store merchants in localStorage
let merchants = JSON.parse(localStorage.getItem('merchants')) || [];

// DOM Elements
const merchantForm = document.getElementById('merchantForm');
const merchantsList = document.getElementById('merchantsList');
const searchInput = document.getElementById('searchInput');

// Form Elements
const merchantId = document.getElementById('merchantId');
const merchantName = document.getElementById('merchantName');
const merchantEmail = document.getElementById('merchantEmail');
const merchantPhone = document.getElementById('merchantPhone');
const merchantAddress = document.getElementById('merchantAddress');
const orderStatus = document.getElementById('orderStatus');

// Event Listeners
merchantForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', handleSearch);

// Initialize the table
renderMerchants();

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const merchant = {
        id: merchantId.value || Date.now().toString(),
        name: merchantName.value,
        email: merchantEmail.value,
        phone: merchantPhone.value,
        address: merchantAddress.value,
        status: orderStatus.value
    };

    if (merchantId.value) {
        // Update existing merchant
        const index = merchants.findIndex(m => m.id === merchant.id);
        merchants[index] = merchant;
    } else {
        // Add new merchant
        merchants.push(merchant);
    }

    // Save to localStorage
    localStorage.setItem('merchants', JSON.stringify(merchants));
    
    // Reset form and render table
    resetForm();
    renderMerchants();
}

// Reset form
function resetForm() {
    merchantForm.reset();
    merchantId.value = '';
}

// Render merchants table
function renderMerchants(merchantsToRender = merchants) {
    merchantsList.innerHTML = '';
    
    merchantsToRender.forEach(merchant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${merchant.name}</td>
            <td>${merchant.email}</td>
            <td>${merchant.phone}</td>
            <td>${merchant.address}</td>
            <td><span class="status-badge status-${merchant.status}">${merchant.status}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editMerchant('${merchant.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteMerchant('${merchant.id}')">Delete</button>
            </td>
        `;
        merchantsList.appendChild(row);
    });
}

// Edit merchant
function editMerchant(id) {
    const merchant = merchants.find(m => m.id === id);
    if (merchant) {
        merchantId.value = merchant.id;
        merchantName.value = merchant.name;
        merchantEmail.value = merchant.email;
        merchantPhone.value = merchant.phone;
        merchantAddress.value = merchant.address;
        orderStatus.value = merchant.status;
    }
}

// Delete merchant
function deleteMerchant(id) {
    if (confirm('Are you sure you want to delete this merchant?')) {
        merchants = merchants.filter(m => m.id !== id);
        localStorage.setItem('merchants', JSON.stringify(merchants));
        renderMerchants();
    }
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMerchants = merchants.filter(merchant => 
        merchant.name.toLowerCase().includes(searchTerm) ||
        merchant.email.toLowerCase().includes(searchTerm) ||
        merchant.phone.includes(searchTerm) ||
        merchant.address.toLowerCase().includes(searchTerm) ||
        merchant.status.toLowerCase().includes(searchTerm)
    );
    renderMerchants(filteredMerchants);
} 