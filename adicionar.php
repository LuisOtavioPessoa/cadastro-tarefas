<?php
include 'db.php'; // Inclui a conexão com o banco de dados

function adicionarTarefa($pdo, $tarefa, $custo, $datalimite, $ordem) {
    $stmt = $pdo->prepare("INSERT INTO Tarefas (tarefa, custo, datalimite, ordem) VALUES (?, ?, ?, ?)");
    if ($stmt->execute([$tarefa, $custo, $datalimite, $ordem])) {
        echo json_encode(['mensagem' => 'Tarefa adicionada com sucesso.']);
    } else {
        echo json_encode(['mensagem' => 'Erro ao adicionar tarefa.', 'erro' => $stmt->errorInfo()]);
    }
}
?>
