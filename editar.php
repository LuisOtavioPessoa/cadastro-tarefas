<?php
require_once 'db.php'; // Certifique-se de incluir seu arquivo de conexão

function editarTarefa($pdo, $identificador, $tarefa, $custo, $datalimite) {
    $stmt = $pdo->prepare("UPDATE Tarefas SET tarefa = ?, custo = ?, datalimite = ? WHERE identificador = ?");
    if ($stmt->execute([$tarefa, $custo, $datalimite, $identificador])) {
        echo json_encode(['status' => 'success', 'mensagem' => 'Tarefa atualizada com sucesso.']);
    } else {
        echo json_encode(['status' => 'error', 'mensagem' => 'Erro ao atualizar tarefa.']);
    }
}

// Chamada da função de edição
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'editar') {
    $identificador = intval($_POST['id']);
    $tarefa = $_POST['tarefa'];
    $custo = floatval($_POST['custo']);
    $datalimite = $_POST['datalimite'];

    editarTarefa($pdo, $identificador, $tarefa, $custo, $datalimite); // Chamada da função
}


function atualizarTarefa($pdo, $id, $tarefa, $custo, $datalimite) {
    $stmt = $pdo->prepare("UPDATE Tarefas SET tarefa = :tarefa, custo = :custo, datalimite = :datalimite WHERE identificador = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':tarefa', $tarefa);
    $stmt->bindParam(':custo', $custo);
    $stmt->bindParam(':datalimite', $datalimite);
    return $stmt->execute(); // Executa a atualização
}

?>
