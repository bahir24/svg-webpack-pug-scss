<?php
$phoneRegexp = '/^[+]?[0-9]{7,14}$/';
$nameMaxLength = 32;
$nullMessage = 'Поле не может быть пустым';
$lenghtMessage = "Длина поля не может превышать $nameMaxLength символов";
$formatMessage = "Телефон указан некорректно";
$agreement = 'Необходимо дать согласие на обработку персональных данных';
$errors = [];

if ($_POST['name'] == null) {
    $errors['name'] = $nullMessage;
}

if (strlen($_POST['name']) > $nameMaxLength) {
    $errors['name'] = $lenghtMessage;
}

if (!preg_match($phoneRegexp, $_POST['phone'])) {
    $errors['phone'] = $formatMessage;
}
if ($_POST['phone'] == null) {
    $errors['phone'] = $nullMessage;
}
if (!isset($_POST['agreement'])) {
    $errors['agreement'] = $agreement;
}

if (count($errors)) {
    header('Content-Type: application/json');
    echo json_encode(array('errors' => $errors));
    return;
} else {
    $to = '<7074033@gmail.com>';

    $subject = 'Test';
    $message = sendEmail($_POST);
    $headers  = "Content-type: text/html; charset=UTF-8 \r\n";
    $headers .= "From: От кого письмо <7074033@gmail.com>\r\n";
    $headers .= "Reply-To: <7074033@gmail.com>\r\n";

    // Отправляем
    $success = mail($to, $subject, $message, $headers);
    if (!$success) {
        $errorMessage = error_get_last()['message'];
        print_r($errorMessage);
    } else {
        echo json_encode(['success' => 'Мы получили ваше сообщение. Наши менеджеры скоро свяжутся с вами.']);
    }
    return;
}




$localizeArr = [];
function sendEmail(array $data)
{
    $keyMatches = [
        'name' => "Имя",
        'phone' => "Телефон",
        'agreement' => "Согласие на обработку персональных данных",
        'names' => "Модель",
        'types' => "Тип двигателя",
        'values' => "Объем двигателя",
        'block' => "Секция",
        'years' => "Год выпуска",
        'reglamentCount' => "Номер ТО",
        'oil' => "Масляный сервис",
        'offer' => "Акции",
        'service' => "Сервис",
    ];
    $message = '';
    foreach ($data as $key => $field) {
        $message .= $keyMatches[$key] . ': ' . $field . '<br/>';
    }
    return $message;
}


// print_r($localizeArr);
