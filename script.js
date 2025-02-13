document
  .getElementById("bookingForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const bookingData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      destination: document.getElementById("destination").value,
      date: document.getElementById("date").value,
      travelers: parseInt(document.getElementById("travelers").value),
    };

    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
                addBooking(name: "${bookingData.name}", email: "${bookingData.email}", phone: "${bookingData.phone}",
                destination: "${bookingData.destination}", date: "${bookingData.date}", travelers: ${bookingData.travelers}) {
                    name
                }
            }`,
      }),
    });

    alert("Booking Successful!");
  });
