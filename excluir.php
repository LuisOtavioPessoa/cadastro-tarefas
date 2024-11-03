<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $acao = $_POST['acao'] ?? '';
    $identificador = $_POST['id'] ?? null;

    if ($acao === 'excluir' && $identificador) {
        excluirTarefa($pdo, $identificador);
    } else {
        echo json_encode(['mensagem' => 'Ação ou Identificador não fornecido']);
        http_response_code(400);
    }
}

function excluirTarefa($pdo, $identificador) {
    $stmt = $pdo->prepare("DELETE FROM Tarefas WHERE identificador = ?");
    if ($stmt->execute([$identificador])) {
        echo json_encode(['mensagem' => 'Tarefa excluída com sucesso']);
    } else {
        echo json_encode(['mensagem' => 'Erro ao excluir a tarefa']);
        http_response_code(500);
    }
}
?>
