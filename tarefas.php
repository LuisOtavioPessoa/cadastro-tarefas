
<?php
include 'listar.php';   
include 'adicionar.php'; 
include 'excluir.php';  
include 'editar.php'; // Adicione este arquivo se for necessário para a lógica de edição

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['acao'])) {
        switch ($_POST['acao']) {
            case 'adicionar':
                adicionarTarefa($pdo, $_POST['tarefa'], $_POST['custo'], $_POST['datalimite'], $_POST['ordem']);
                break;
            case 'excluir':
                excluirTarefa($pdo, $_POST['id']);
                break;
            case 'editar':
                atualizarTarefa($pdo, $_POST['id'], $_POST['tarefa'], $_POST['custo'], $_POST['datalimite']);
                break;
        }
    }
} else {
    // Se for uma solicitação GET e tiver um identificador
    if (isset($_GET['id'])) {
        $tarefa = listarTarefaPorId($pdo, $_GET['id']); // Uma nova função para listar uma tarefa por ID
        echo json_encode($tarefa);
    } else {
        // Retorna a lista de tarefas se não tiver um identificador
        $listaTarefas = listarTarefas($pdo);
        echo json_encode($listaTarefas);
    }
}
?>
