<?php
$md = 'a50715266f3c87f1090150415bc11860';
if (md5($_POST['passw']) == $md) {
    $sheet = file_get_contents('https://docs.google.com/spreadsheets/d/1tTmnY5srGV7gWoYHFx6chj8BbSsZLUcFGw1Nxu3To-0/export?format=csv');
    $arrResult = [];
    foreach (explode("\r\n", $sheet) as $key => $string) {
        if ($key > 0) {
            $item = explode(',', $string);
            $arrItem['name'] = trim($item[0]);
            $arrItem['code'] = trim($item[1]);
            $arrItem['year'] = trim($item[2]);
            $arrItem['value'] = trim($item[3]);
            $arrItem['type'] = trim($item[4]);
            $arrItem['prices'] = [
                'Бесплатно',
                number_format($item[5], 0, ',', ' ') . ' руб',
                number_format($item[6], 0, ',', ' ') . ' руб',
                number_format($item[7], 0, ',', ' ') . ' руб',
                number_format($item[8], 0, ',', ' ') . ' руб',
                number_format($item[9], 0, ',', ' ') . ' руб',
                number_format($item[10], 0, ',', ' ') . ' руб',
                number_format($item[11], 0, ',', ' ') . ' руб',
                number_format($item[12], 0, ',', ' ') . ' руб',
            ];
            $arrItem['oil'] = number_format($item[13], 0, ',', ' ') . ' руб';
            $arrResult[] = $arrItem;
        }
    }
    $json = json_encode(['offerData' => $arrResult]);
    file_put_contents("data.json", $json);
    header("Location: http://$_SERVER[HTTP_HOST]", true, 200);
} else {
    header("Location: http://$_SERVER[HTTP_HOST]/backend/auth.html", true, 301);
}

// P%R~Jy4YkIkH
