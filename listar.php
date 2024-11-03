<?php
include 'db.php'; // Inclui a conexão com o banco de dados

function listarTarefas($pdo) {
    $stmt = $pdo->query("SELECT * FROM Tarefas ORDER BY ordem");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function listarTarefaPorId($pdo, $id) {
    $stmt = $pdo->prepare("SELECT * FROM Tarefas WHERE identificador = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna os dados da tarefa
}

?>
