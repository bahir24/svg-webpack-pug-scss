<?php
$md = 'a50715266f3c87f1090150415bc11860';
if (md5($_POST['passw']) == $md) {
    $sheet = file_get_contents('https://docs.google.com/spreadsheets/d/1tTmnY5srGV7gWoYHFx6chj8BbSsZLUcFGw1Nxu3To-0/export?format=csv');
    $arrResult = [];
    foreach (explode("\r\n", $sheet) as $key => $string) {
        if ($key > 0) {
            $arrResult[] = explode(',', $string);
        }
    }
    $headers = array_pop($arrResult);
    $json = json_encode(array('offerData' => $arrResult));
    file_put_contents("../data.json", $json);
    header("Location: http://$_SERVER[HTTP_HOST]", true, 200);
} else {
    header("Location: http://$_SERVER[HTTP_HOST]/backend/auth.html", true, 301);
}

// P%R~Jy4YkIkH
