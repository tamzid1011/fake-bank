// Initial transactions data
let transactions = [
    { type: 'deposit', amount: 1000, description: 'Initial deposit', date: new Date() }
];

// Update balance display
function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'deposit' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    document.getElementById('balanceAmount').textContent = `$${balance.toFixed(2)}`;
}

// Show transaction form
function showTransactionForm(type) {
    const form = document.getElementById('transactionForm');
    document.getElementById('transactionType').value = type;
    form.style.display = 'flex';
}

// Handle form submission
function handleTransaction(event) {
    event.preventDefault();
    
    const type = document.getElementById('transactionType').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const description = document.getElementById('transactionDescription').value;

    transactions.push({
        type,
        amount,
        description,
        date: new Date()
    });

    updateBalance();
    updateTransactionList();
    closeTransactionForm();
}

// Close transaction form
function closeTransactionForm() {
    document.getElementById('transactionForm').style.display = 'none';
    document.getElementById('transactionForm').reset();
}

// Update transaction list
function updateTransactionList() {
    const list = document.getElementById('transactionList');
    list.innerHTML = '';

    transactions.slice().reverse().forEach(transaction => {
        const li = document.createElement('li');
        li.className = 'transaction-item';
        li.innerHTML = `
            <div>
                <strong>${transaction.type.toUpperCase()}</strong>
                <p>${transaction.description}</p>
                <small>${transaction.date.toLocaleDateString()} ${transaction.date.toLocaleTimeString()}</small>
            </div>
            <div>
                <strong class="${transaction.type === 'deposit' ? 'text-green' : 'text-red'}">
                    ${transaction.type === 'deposit' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                </strong>
            </div>
        `;
        list.appendChild(li);
    });
}

// Close form when clicking outside
window.onclick = function(event) {
    const form = document.getElementById('transactionForm');
    if (event.target === form) {
        closeTransactionForm();
    }
}

// Initial setup
updateBalance();
updateTransactionList();