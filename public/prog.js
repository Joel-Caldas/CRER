document.getElementById('inscricaoForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    console.log('Dados a serem enviados:', data); // Verifique os dados antes de enviar

    const response = await fetch(this.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log('Resposta do servidor:', await response.text()); // Verifique a resposta do servidor

    const messageDiv = document.getElementById('message');
    if (response.ok) {
        messageDiv.textContent = 'Inscrição realizada com sucesso!';
        messageDiv.style.color = 'green';
    } else {
        messageDiv.textContent = 'Erro ao enviar a inscrição.';
        messageDiv.style.color = 'red';
    }
    messageDiv.style.display = 'block';
});
