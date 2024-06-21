const endpoint = '0568920648184c69a481d7bf5938ff40'
const apiUrl = `https://crudcrud.com/api/${endpoint}/your-entity`;


document.getElementById('userForm').addEventListener('submit', function(event) {
    const from = document.querySelector('form')
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
  
    const data = { name, price, category };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchData(); // Fetch the data after submitting the form
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  from.reset()
});

function fetchData() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayData(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}





function deleteData(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        console.log('Delete success');
        fetchData(); // Fetch the data after deleting an item
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}




function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; // Clear previous data

    const categories = {};

    data.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });

    for (const category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'dataCategory';
        categoryDiv.innerHTML = `<h3>${category}</h3>`;

        categories[category].forEach(item => {
            const dataItem = document.createElement('div');
            dataItem.className = 'dataItem';
            dataItem.innerHTML = `<div>
                                    <p><strong>Name:</strong> ${item.name}</p>
                                    <p><strong>Price:</strong> ${item.price}</p>
                                  </div>
                                  <button onclick="deleteData('${item._id}')">Delete</button>`;
            categoryDiv.appendChild(dataItem);
        });

        dataContainer.appendChild(categoryDiv);
    }
}

// Fetch and display data on initial load
fetchData();