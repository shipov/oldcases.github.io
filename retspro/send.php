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
    $result['error'] = 'Введите телефон'; 
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
    $result['error'] = 'Введите тело письма'; 
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

<head>
  <title></title>
</head>

<body>
<strong>$subject</strong><ul>
<li>Имя: $fio</li>
<li>Телефон: $phone</li>    
<li>E-mail: $email</li>    
</ul>

<strong>Сообщение:</strong>
<br/>
$body

</body>

</html> 
eol;


$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
//$headers = 'Content-type: text/html; utf-8' . "\r\n";
$headers .= "From: =?UTF-8?B?" . base64_encode("Сообщение с сайта retspro.ru") . "?= <info@retspro.ru>\r\n";
$mailSubject = 'Сообщение с сайта retspro.ru';

if ( mail($to, $mailSubject, $tpl, $headers) ) {
    $result['result'] = true;
}

echo json_encode($result);