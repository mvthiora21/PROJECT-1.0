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

    // Event listener for mouseover event
    document.addEventListener('mouseover', function(event) {
        console.log('Mouseover event:', event);
    });

    // Event listener for keypress event
    document.addEventListener('keypress', function(event) {
        console.log('Keypress event:', event);
    });
});

function displayBuses(buses) {
    const busList = document.getElementById('busList');
    buses.forEach(bus => {
        const busSection = document.createElement('section');
        busSection.classList.add('bus');
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
            <div class="bus-image">
                <img src="${bus.image}" alt="${bus.name}">
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
