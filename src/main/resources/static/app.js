let users = [];

fetch("/api/users")
    .then(res => res.json())
    .then(data => {
        users = data;
        renderTable(data);
        renderKPIs(data);
    });

function renderTable(data) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    data.forEach(u => {
        const row = `
            <tr>
                <td>${u.name}</td>
                <td>${u.role}</td>
                <td>${u.city}</td>
                <td>${u.score}</td>
                <td><button class="delete-btn" onclick="deleteUser(${u.id})">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderKPIs(data) {
    document.getElementById("totalUsers").innerText = data.length;

    let avg = 0;
    if(data.length > 0){
        avg = data.reduce((a,b)=>a+b.score,0)/data.length;
    }
    document.getElementById("avgScore").innerText = Math.round(avg);

    const cities = new Set(data.map(u => u.city));
    document.getElementById("totalCities").innerText = cities.size;
}

document.getElementById("searchInput").addEventListener("input", function(){
    const val = this.value.toLowerCase();
    const filtered = users.filter(u => u.name.toLowerCase().includes(val));
    renderTable(filtered);
});

function addUser() {
    const name = document.getElementById("nameInput").value;
    const role = document.getElementById("roleInput").value;
    const city = document.getElementById("cityInput").value;
    const score = document.getElementById("scoreInput").value;

    if(!name || !role || !city || !score){
        alert("All fields required");
        return;
    }

    const user = {
        name: name,
        role: role,
        city: city,
        score: parseInt(score)
    };

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        users.push(data);
        renderTable(users);
        renderKPIs(users);

        document.getElementById("nameInput").value = "";
        document.getElementById("roleInput").value = "";
        document.getElementById("cityInput").value = "";
        document.getElementById("scoreInput").value = "";
    });
}

function deleteUser(id){
    fetch(`/api/users/${id}`, {
        method: "DELETE"
    }).then(()=>{
        users = users.filter(u => u.id !== id);
        renderTable(users);
        renderKPIs(users);
    });
}
