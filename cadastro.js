let tarefas = [];

// Adiciona o evento de envio do formulário
document.getElementById('formulario').addEventListener('submit', adicionarTarefa);

function adicionarTarefa(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const identificador = Number(document.getElementById('identificador').value);
    const tarefa = document.getElementById('tarefa').value;
    const custo = parseFloat(document.getElementById('custo').value);
    const datalimite = document.getElementById('data').value;
    const ordem = Number(document.getElementById('ordem').value);

    // Adiciona a nova tarefa ao array
    tarefas.push({
        identificador: identificador,
        tarefa: tarefa,
        custo: custo,
        datalimite: datalimite,
        ordem: ordem
    });

    // Limpa os campos do formulário após adicionar a tarefa
    document.getElementById('formulario').reset();

    // Atualiza a tabela com as tarefas
    atualizarTabela();
}

function atualizarTabela() {
    const tarefasLista = document.getElementById('tarefas-lista');
    tarefasLista.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Adiciona cada tarefa como uma nova linha na tabela
    tarefas.forEach(tarefa => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tarefa.identificador}</td>
            <td>${tarefa.tarefa}</td>
            <td>${tarefa.custo.toFixed(2)}</td>
            <td>${tarefa.datalimite}</td>
            <td>${tarefa.ordem}</td>
        `;
        tarefasLista.appendChild(row); // Adiciona a nova linha ao tbody
    });
}
