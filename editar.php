<?php
require_once 'db.php'; // Certifique-se de incluir seu arquivo de conexão

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'editar') {
    $identificador = intval($_POST['id']);
    $tarefa = $_POST['tarefa'];
    $custo = floatval($_POST['custo']);
    $datalimite = $_POST['datalimite'];

    // Chame a função editarTarefa
    editarTarefa($identificador, $tarefa, $custo, $datalimite);
}

function editarTarefa($id, $tarefa, $custo, $datalimite) {
    global $pdo; // Use a conexão com o banco de dados

    $sql = "UPDATE Tarefas SET tarefa = :tarefa, custo = :custo, datalimite = :datalimite WHERE identificador = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':tarefa', $tarefa);
    $stmt->bindParam(':custo', $custo);
    $stmt->bindParam(':datalimite', $datalimite);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
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
