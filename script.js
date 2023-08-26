// Function to fetch the menu
async function getMenu() {
    try {
        const response = await fetch('menu.json'); // Replace with your JSON data source
        const menuData = await response.json();
        const menuSection = document.getElementById('menu');
        
        menuData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: $${item.price}</p>
                <button onclick="addToOrder('${item.name}')">Add to Order</button>
            `;
            menuSection.appendChild(menuItem);
        });
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

// Function to simulate taking an order
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Randomly select 3 burgers (You can customize this logic)
            const burgers = ['Burger A', 'Burger B', 'Burger C'];
            resolve(burgers);
        }, 2500);
    });
}

// Function to simulate order preparation
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function to simulate payment
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function to handle the order process
async function startOrder() {
    // Clear order status
    const orderStatus = document.getElementById('order-status');
    orderStatus.innerHTML = '';

    try {
        const selectedItems = await takeOrder();
        orderStatus.innerHTML += '<p>Order received. Preparing...</p>';
        
        const prepResult = await orderPrep();
        orderStatus.innerHTML += '<p>Order prepared. Waiting for payment...</p>';
        
        const payResult = await payOrder();
        
        if (payResult.paid) {
            orderStatus.innerHTML += '<p>Thank you for eating with us today!</p>';
            alert('Thank you for eating with us today!');
        }
    } catch (error) {
        console.error('Error during order process:', error);
        orderStatus.innerHTML += '<p>Error during order process.</p>';
    }
}

// Initially load the menu
getMenu();
