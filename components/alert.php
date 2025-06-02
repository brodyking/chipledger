<?php
function alert(string $type, $data)
{
    switch ($type) {
        case "error":
            echo "<div class='alert alert-danger'><b>Error:</b> {$data}</div>";
            break;
        case "success":
            echo "<div class='alert alert-success'>{$data}</div>";
            break;
        default:
            break;
    }
}
if (isset($_GET["error"])) {
    alert("error", $_GET["error"]);
}
if (isset($_GET["success"])) {
    alert("success", $_GET["success"]);
}