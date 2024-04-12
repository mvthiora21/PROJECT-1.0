document.addEventListener('DOMContentLoaded', function () {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            displayBuses(data.buses);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Event listener for click event
    document.addEventListener('click', function(event) {
        console.log('Click event:', event);
    });

    // Event listener for change event
    document.addEventListener('change', function(event) {
        console.log('Change event:', event);
    });
});

function displayBuses(buses) {
    const busList = document.getElementById('busList');
    buses.forEach(bus => {
        const busSection = document.createElement('section');
        busSection.classList.add('bus');
        
        // Iterate through the array of images for each bus
        let imagesHTML = '';
        bus.images.forEach(image => {
            imagesHTML += `<img src="images/${image}" alt="${bus.name}">`;
        });
        
        busSection.innerHTML = `
            <div class="bus-info">
                <h2>${bus.name}</h2>
                <p>Departure Time: ${bus.departure}</p>
                <p>Arrival Time: ${bus.arrival}</p>
                <p>Price: ${bus.price}</p>
                <p>Tickets Remaining: <span id="${bus.id}-tickets">${bus.remaining}</span></p>
                <button onclick="purchaseTicket('${bus.id}')">Purchase Ticket</button>
                <p id="${bus.id}-message"></p>
            </div>
            <div class="bus-images">
                ${imagesHTML}
            </div>
        `;
        busList.appendChild(busSection);
    });
}

function purchaseTicket(busId) {
    const ticketsRemaining = document.getElementById(`${busId}-tickets`);
    let remaining = parseInt(ticketsRemaining.textContent);

    if (remaining > 0) {
        remaining--;
        ticketsRemaining.textContent = remaining;

        if (remaining === 0) {
            const message = document.getElementById(`${busId}-message`);
            message.textContent = "This bus is full.";
        }
    }
}
