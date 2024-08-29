document.getElementById('inscricaoForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    
    const formData = new FormData(this);
    const response = await fetch(this.action, {
        method: 'POST',
        body: formData
    });

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
