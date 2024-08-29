document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript carregado');

  fetch('/api/pessoas')
      .then(response => response.json())
      .then(data => {
          const pessoaInfo = document.getElementById('pessoa-info');
          pessoaInfo.innerHTML = ''; // Limpa qualquer conteúdo anterior

          if (data.length === 0) {
              pessoaInfo.innerHTML = '<p>Nenhuma pessoa encontrada.</p>';
          }

          data.forEach(pessoa => {
              const infoHTML = `
                 <div class="box-infor">
                    <div class="info-item">
                       <strong>Nome:</strong> ${pessoa.nome}
                    </div>
                    <div class="line1"></div>
                    <div class="info-descrição">
                      <strong>Remédio Controlado:</strong> ${pessoa.remedioControlado}
                      <strong>Remédio:</strong> ${pessoa.remedio}
                      <strong>Problema de Saúde:</strong> ${pessoa.problemaSaude}
                    </div>
                    <div class="line2"></div>
                    <div class="box-compra-delete">
                      <input type="text" id="compra-infor" style="width: 2vw;">
                      <button class="delete">
                        <!-- SVG icon code here -->
                      </button>
                    </div>
                 </div>
              `;
              pessoaInfo.innerHTML += infoHTML;
          });
      })
      .catch(error => {
          console.error('Erro ao buscar dados:', error);
      });
});
