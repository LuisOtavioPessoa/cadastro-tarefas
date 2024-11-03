let tarefas = [];

// Função para carregar as tarefas do banco de dados
function carregarTarefas() {
    fetch('tarefas.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verifica os dados retornados do servidor
            tarefas = data; // Atualiza a lista de tarefas com os dados recebidos
            atualizarTabela(); // Atualiza a tabela na tela
        })
        .catch(error => console.error('Erro ao carregar tarefas:', error));
}

// Função para atualizar a tabela com as tarefas
function atualizarTabela() {
    const tarefasLista = document.getElementById('tarefas-lista');
    tarefasLista.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Adiciona cada tarefa como uma nova linha na tabela
    tarefas.forEach(tarefa => {
        const row = document.createElement('tr');

        if (tarefa.custo >= 1000) {
            row.style.backgroundColor = 'yellow'; 
        }

        row.innerHTML = `
            <td>${tarefa.tarefa}</td>
            <td>${parseFloat(tarefa.custo).toFixed(2)}</td>
            <td>${tarefa.datalimite}</td>
            <td>${tarefa.ordem}</td>
            <td>
                <div class="button-container">
                    <button class="btn-editar" onclick="editarTarefa(${tarefa.identificador})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-excluir" onclick="excluirTarefa(${tarefa.identificador})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tarefasLista.appendChild(row); // Adiciona a nova linha ao tbody
    });
}

function editarTarefa(identificador) {
    // Fazer uma requisição para obter os dados da tarefa
    fetch(`tarefas.php?id=${identificador}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // Preencher os campos do formulário de edição com os dados da tarefa
        document.getElementById('editar-id').value = data.identificador;
        document.getElementById('editar-tarefa').value = data.tarefa;
        document.getElementById('editar-custo').value = data.custo;
        document.getElementById('editar-data').value = data.datalimite;

        // Exibir o popup de edição
        document.getElementById('popup-editar').style.display = 'block'; // Ou a lógica que você usar para exibir o popup
    })
    .catch(error => console.error('Erro ao buscar tarefa:', error));
}


// Função para fechar o popup
function fecharPopup() {
    document.getElementById('popup-editar').style.display = 'none';
}


// Função de exclusão usando POST
function excluirTarefa(identificador) {

    const confirmar = confirm("Você tem certeza que deseja excluir essa tarefa?");
    if (!confirmar){
        return;
    }

    fetch(`excluir.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            acao: 'excluir',
            id: identificador
        })
    })
    .then(response => {
        console.log(response); // Verifica o objeto de resposta
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro na resposta do servidor');
        }
    })
    .then(data => {
        if (data.mensagem === 'Tarefa excluída com sucesso') {
            tarefas = tarefas.filter(tarefa => tarefa.identificador !== identificador);
            atualizarTabela();
            alert(data.mensagem);
        } else {
            alert(data.mensagem || "Erro ao excluir a tarefa.");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao excluir a tarefa.");
    });
}

// Adiciona o evento de envio do formulário
document.getElementById('formulario').addEventListener('submit', adicionarTarefa);

// Função para adicionar uma nova tarefa
function adicionarTarefa(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const tarefa = document.getElementById('tarefa').value;
    const custo = parseFloat(document.getElementById('custo').value);
    const datalimite = document.getElementById('data').value;
    const ordem = Number(document.getElementById('ordem').value);

    // Adiciona a nova tarefa ao array
    tarefas.push({
        tarefa: tarefa,
        custo: custo,
        datalimite: datalimite,
        ordem: ordem
    });

    // Limpa os campos do formulário após adicionar a tarefa
    document.getElementById('formulario').reset();

    // Atualiza a tabela com as tarefas
    atualizarTabela();

    // Envia a nova tarefa para o banco de dados
    enviarTarefaParaDB({ tarefa, custo, datalimite, ordem });
}

// Função para enviar a tarefa para o banco de dados
function enviarTarefaParaDB(tarefa) {
    fetch('tarefas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            acao: 'adicionar',
            tarefa: tarefa.tarefa,
            custo: tarefa.custo,
            datalimite: tarefa.datalimite,
            ordem: tarefa.ordem
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Tarefa adicionada com sucesso:", data);
        carregarTarefas(); // Atualiza a lista
    })
    .catch(error => console.error('Erro ao adicionar tarefa:', error));
}

document.getElementById('formulario-editar').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const identificador = document.getElementById('editar-id').value;
    const tarefa = document.getElementById('editar-tarefa').value;
    const custo = parseFloat(document.getElementById('editar-custo').value);
    const datalimite = document.getElementById('editar-data').value;

    // Atualiza a tarefa no banco de dados
    atualizarTarefa({ identificador, tarefa, custo, datalimite });
});

document.getElementById('formulario-editar').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const identificador = document.getElementById('editar-id').value;
    const tarefa = document.getElementById('editar-tarefa').value;
    const custo = parseFloat(document.getElementById('editar-custo').value);
    const datalimite = document.getElementById('editar-data').value;

    // Atualiza a tarefa no banco de dados
    atualizarTarefa({ identificador, tarefa, custo, datalimite });
});

function atualizarTarefa(tarefa) {
    fetch('editar.php', { // Certifique-se de que o caminho está correto
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            acao: 'editar',
            id: tarefa.identificador,
            tarefa: tarefa.tarefa,
            custo: tarefa.custo,
            datalimite: tarefa.datalimite
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log("Tarefa atualizada com sucesso:", data);
            carregarTarefas(); // Atualiza a lista de tarefas
            fecharPopup(); // Fecha o popup
        } else {
            console.error("Erro ao atualizar a tarefa:", data);
        }
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
}



// Carrega as tarefas ao carregar a página
window.onload = carregarTarefas;
