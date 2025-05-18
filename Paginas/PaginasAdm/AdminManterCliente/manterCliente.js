// Funções para controlar o modal
function abrirModal() {
    const modal = document.getElementById('modalCliente');
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    // Anima a entrada do modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function fecharModal() {
    const modal = document.getElementById('modalCliente');
    modal.style.opacity = '0';
    
    // Fecha o modal após a animação
    setTimeout(() => {
        modal.style.display = 'none';
        limparFormulario();
    }, 300);
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('status').value = 'ativo';
    document.getElementById('clienteId').value = '';
    document.getElementById('lista-veiculos').innerHTML = '';
}

function adicionarCampoVeiculo() {
    const listaVeiculos = document.getElementById('lista-veiculos');
    const veiculoForm = document.createElement('div');
    veiculoForm.className = 'veiculo-form';
    
    veiculoForm.innerHTML = `
        <button type="button" class="botao-remover" onclick="removerVeiculo(this)">
            <i class="fas fa-times"></i>
        </button>
        <div class="campo-formulario">
            <label for="placa">Placa:</label>
            <input type="text" name="placa[]" required placeholder="ABC-1234">
        </div>
        <div class="campo-formulario">
            <label for="marca">Marca:</label>
            <input type="text" name="marca[]" required placeholder="Toyota">
        </div>
        <div class="campo-formulario">
            <label for="modelo">Modelo:</label>
            <input type="text" name="modelo[]" required placeholder="Corolla">
        </div>
        <div class="campo-formulario">
            <label for="ano">Ano:</label>
            <input type="number" name="ano[]" required min="1900" max="2025" placeholder="2020">
        </div>
    `;
    
    listaVeiculos.appendChild(veiculoForm);
}

function removerVeiculo(button) {
    const veiculoForm = button.closest('.veiculo-form');
    veiculoForm.remove();
}

// Funções para gerenciar os clientes
function adicionarCliente(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const status = document.getElementById('status').value;
    const clienteId = document.getElementById('clienteId').value;
    
    // Coleta os dados dos veículos
    const veiculos = [];
    const placas = document.getElementsByName('placa[]');
    const marcas = document.getElementsByName('marca[]');
    const modelos = document.getElementsByName('modelo[]');
    const anos = document.getElementsByName('ano[]');
    
    for (let i = 0; i < placas.length; i++) {
        veiculos.push({
            placa: placas[i].value,
            marca: marcas[i].value,
            modelo: modelos[i].value,
            ano: anos[i].value
        });
    }
    
    // Gera o avatar usando a API UI Avatars
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=1a237e&color=fff`;
    
    // Cria o HTML dos veículos
    let veiculosHTML = '';
    if (veiculos.length > 0) {
        veiculosHTML = veiculos.map(veiculo => `
            <div class="veiculo-card">
                <p class="veiculo-placa">${veiculo.placa}</p>
                <p class="veiculo-detalhe">${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}</p>
            </div>
        `).join('');
    } else {
        veiculosHTML = `
            <div class="veiculo-card">
                <p class="veiculo-placa">Sem veículos</p>
                <p class="veiculo-detalhe">Adicione um veículo ao editar o cliente</p>
            </div>
        `;
    }
    
    if (clienteId) {
        // Atualizar card existente
        const card = document.querySelector(`.cliente-card[data-id='${clienteId}']`);
        if (card) {
            card.innerHTML = `
                <div class="cliente-avatar">
                    <img src="${avatarUrl}" alt="${nome}">
                    <span class="status status-${status}">${status === 'ativo' ? 'Ativo' : 'Inativo'}</span>
                </div>
                <div class="cliente-info">
                    <h3>${nome}</h3>
                    <p class="cliente-detalhe">
                        <i class="fas fa-phone"></i> ${telefone}
                    </p>
                    <p class="cliente-detalhe">
                        <i class="fas fa-id-card"></i> ${cpf}
                    </p>
                </div>
                <div class="veiculos-info">
                    <h4><i class="fas fa-car"></i> Veículos</h4>
                    ${veiculosHTML}
                </div>
                <div class="cliente-acoes">
                    <button type="button" class="botao-acao botao-editar" onclick="editarCliente(this)">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="botao-acao botao-excluir" onclick="excluirCliente(this)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }
    } else {
        // Cria o novo card
        const card = document.createElement('div');
        const novoId = Date.now();
        card.className = 'cliente-card';
        card.setAttribute('data-id', novoId);
        card.innerHTML = `
            <div class="cliente-avatar">
                <img src="${avatarUrl}" alt="${nome}">
                <span class="status status-${status}">${status === 'ativo' ? 'Ativo' : 'Inativo'}</span>
            </div>
            <div class="cliente-info">
                <h3>${nome}</h3>
                <p class="cliente-detalhe">
                    <i class="fas fa-phone"></i> ${telefone}
                </p>
                <p class="cliente-detalhe">
                    <i class="fas fa-id-card"></i> ${cpf}
                </p>
            </div>
            <div class="veiculos-info">
                <h4><i class="fas fa-car"></i> Veículos</h4>
                ${veiculosHTML}
            </div>
            <div class="cliente-acoes">
                <button type="button" class="botao-acao botao-editar" onclick="editarCliente(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="botao-acao botao-excluir" onclick="excluirCliente(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        // Adiciona o card com animação
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        document.querySelector('.clientes-grid').appendChild(card);
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    }
    // Fecha o modal
    fecharModal();
}

function editarCliente(button) {
    console.log('Função editarCliente chamada');
    const card = button.closest('.cliente-card');
    if (!card) {
        console.error('Card não encontrado');
        return;
    }
    // Preenche o campo oculto com o id do card
    document.getElementById('clienteId').value = card.getAttribute('data-id');
    const nome = card.querySelector('h3').textContent;
    // Busca o telefone e o CPF pelo ícone correspondente
    const telefoneEl = card.querySelector('.fa-phone')?.parentElement;
    const cpfEl = card.querySelector('.fa-id-card')?.parentElement;
    const telefone = telefoneEl ? telefoneEl.textContent.replace(/[^-\d()-]/g, '').trim() : '';
    const cpf = cpfEl ? cpfEl.textContent.replace(/[^-\d.-]/g, '').trim() : '';
    const status = card.querySelector('.status').classList.contains('status-ativo') ? 'ativo' : 'inativo';
    
    console.log('Dados do cliente:', { nome, telefone, cpf, status });
    
    // Preenche o formulário
    document.getElementById('nome').value = nome;
    document.getElementById('telefone').value = telefone;
    document.getElementById('cpf').value = cpf;
    document.getElementById('status').value = status;
    
    // Limpa a lista de veículos
    const listaVeiculos = document.getElementById('lista-veiculos');
    listaVeiculos.innerHTML = '';
    
    // Adiciona os veículos existentes
    const veiculos = card.querySelectorAll('.veiculo-card');
    veiculos.forEach(veiculo => {
        console.log('HTML do veiculo-card:', veiculo.outerHTML);
        const placaEl = veiculo.querySelector('.veiculo-placa');
        const detalheEl = veiculo.querySelector('.veiculo-detalhe');
        if (!placaEl) {
            console.warn('Elemento .veiculo-placa não encontrado neste veiculo-card');
            return;
        }
        if (!detalheEl) {
            console.warn('Elemento .veiculo-detalhe não encontrado neste veiculo-card');
            return;
        }
        if (placaEl.textContent.includes('Sem veículos')) {
            console.log('Veículo placeholder ignorado');
            return;
        }
        const placa = placaEl.textContent;
        const detalhes = detalheEl.textContent;
        console.log('Processando veículo:', { placa, detalhes });
        // Extrai marca, modelo e ano usando regex
        const match = detalhes.match(/^(\w+)\s+(\w+)\s+(\d{4})$/);
        if (match) {
            const [, marca, modelo, ano] = match;
            console.log('Dados extraídos:', { marca, modelo, ano });
            adicionarCampoVeiculo();
            const ultimoForm = listaVeiculos.lastElementChild;
            ultimoForm.querySelector('input[name="placa[]"]').value = placa;
            ultimoForm.querySelector('input[name="marca[]"]').value = marca;
            ultimoForm.querySelector('input[name="modelo[]"]').value = modelo;
            ultimoForm.querySelector('input[name="ano[]"]').value = ano;
        } else {
            console.error('Formato de detalhes do veículo inválido:', detalhes);
        }
    });
    
    // Atualiza o título do modal
    document.querySelector('.modal-titulo').textContent = 'Editar Cliente';
    
    // Abre o modal
    abrirModal();
}

function excluirCliente(button) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        const card = button.closest('.cliente-card');
        
        // Anima a remoção do card
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            card.remove();
        }, 300);
    }
}

// Função de busca
function buscarClientes(termo) {
    const cards = document.querySelectorAll('.cliente-card');
    const termoBusca = termo.toLowerCase();
    
    cards.forEach(card => {
        // Busca por nome, telefone, cpf
        const nome = card.querySelector('h3').textContent.toLowerCase();
        const telefone = card.querySelector('.fa-phone')?.parentElement?.textContent.toLowerCase() || '';
        const cpf = card.querySelector('.fa-id-card')?.parentElement?.textContent.toLowerCase() || '';
        
        // Busca por veículos (placa, marca, modelo)
        let encontrouVeiculo = false;
        card.querySelectorAll('.veiculo-card').forEach(veiculo => {
            const placa = veiculo.querySelector('.veiculo-placa')?.textContent.toLowerCase() || '';
            const detalhes = veiculo.querySelector('.veiculo-detalhe')?.textContent.toLowerCase() || '';
            if (placa.includes(termoBusca) || detalhes.includes(termoBusca)) {
                encontrouVeiculo = true;
            }
        });
        
        if (
            nome.includes(termoBusca) ||
            telefone.includes(termoBusca) ||
            cpf.includes(termoBusca) ||
            encontrouVeiculo
        ) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Adiciona os event listeners quando o documento carregar
document.addEventListener('DOMContentLoaded', function() {
    // Formulário
    const formulario = document.querySelector('.formulario');
    formulario.addEventListener('submit', adicionarCliente);
    
    // Campo de busca
    const campoBusca = document.getElementById('busca');
    campoBusca.addEventListener('input', (e) => buscarClientes(e.target.value));
}); 