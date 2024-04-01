<?php
$to = 'mihail.korablev@gmail.com';

$result = array('result' => false, 'error' => '');

$fio = trim($_POST['name']);
$phone = trim($_POST['phone']);
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$body = trim($_POST['body']);
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';

if ($fio == '') {
    $result['error'] = 'Введите Имя'; 
    echo json_encode($result);
    return;           
}


if ($phone == '') {
    $result['error'] = 'Введите Телефон'; 
    echo json_encode($result);
    return;    
}

/*if ($email == '') {
    $result['error'] = 'Введите email'; 
    echo json_encode($result);
    return;    
}*/

/*if ($subject == '') {
    $result['error'] = 'Введите тему письма'; 
    echo json_encode($result);
    return;    
}*/


if ($body == '') {
    $result['error'] = 'Введите Сообщение'; 
    echo json_encode($result);
    return;    
}
/*if (!preg_match('/\+7 \([0-9][0-9][0-9]\) [0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/', $phone)) {
    $result['error'] = 'Введите корректный телефон'; 
    echo json_encode($result);
    return;     
}*/



$tpl = <<<eol
<html>
<head></head>
<body>
<strong>Имя:</strong> $fio <br><br>
<strong>Телефон:</strong> $phone <br><br>   
<strong>Сообщение:</strong> $body
</body>
</html> 
eol;


$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
//$headers = 'Content-type: text/html; utf-8' . "\r\n";
$headers .= "From: =?UTF-8?B?" . base64_encode("Сообщение с сайта shipov.info") . "?= <mihail.korablev@gmail.com>\r\n";
$mailSubject = 'Сообщение с сайта shipov.ml';

if ( mail($to, $mailSubject, $tpl, $headers) ) {
    $result['result'] = true;
}

echo json_encode($result);