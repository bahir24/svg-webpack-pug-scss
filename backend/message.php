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
if ($_POST['agreement'] == null) {
    $errors['agreement'] = $nullMessage;
}

if (count($errors)) {
    echo json_encode(['errors' => $errors]);
} else {
    echo json_encode(['success' => 'Мы получили ваше сообщение. Наши менеджеры скоро свяжутся с вами.']);
}
