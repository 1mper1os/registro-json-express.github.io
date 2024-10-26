document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const cedula = document.getElementById("cedula").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const fecha = document.getElementById("fecha").value;

    // Validación de ID existente
    fetch('http://localhost:3000/usuarios')
        .then(response => response.json())
        .then(data => {
            const exists = data.some(user => user.cedula === cedula);
            if (exists) {
                alert("La cédula ya existe.");
            } else {
                const nuevoUsuario = { nombre, apellido, cedula, email, telefono, direccion, fecha };
                
                fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoUsuario),
                })
                .then(response => {
                    if (response.ok) {
                        alert("Usuario registrado exitosamente.");
                        document.getElementById("registroForm").reset();
                    } else {
                        alert("Error al registrar el usuario.");
                    }
                });
            }
        });
});

document.getElementById("listarBtn").addEventListener("click", function() {
    fetch('http://localhost:3000/usuarios')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#usuariosTable tbody");
            tableBody.innerHTML = "";
            data.forEach(usuario => {
                const row = `<tr>
                    <td class="border px-4 py-2">${usuario.nombre}</td>
                    <td class="border px-4 py-2">${usuario.apellido}</td>
                    <td class="border px-4 py-2">${usuario.cedula}</td>
                    <td class="border px-4 py-2">${usuario.email}</td>
                    <td class="border px-4 py-2">${usuario.telefono}</td>
                    <td class="border px-4 py-2">${usuario.direccion}</td>
                    <td class="border px-4 py-2">${usuario.fecha}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        });
});
