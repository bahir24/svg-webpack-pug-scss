<?php
$file = $_FILES['excel'];
$zip = new ZipArchive();
$zip->open($file['tmp_name']);
$zip->extractTo('excel/');
$xml = simplexml_load_file('excel/xl/sharedStrings.xml');
$sharedStringsArr = [];
foreach ($xml->children() as $item) {
    $sharedStringsArr[] = (string)$item->t;
}
$out = [];
$xml = simplexml_load_file('excel/xl/worksheets/sheet1.xml');
$row = 0;
foreach ($xml->sheetData->row as $item) {
    $cell = 0;
    foreach ($item as $child) {
        if ($row > 5 && $row < 48) {
            $attr = $child->attributes();
            $value = isset($child->v)? (string)$child->v:false;
            $out[$row][$cell] = isset($attr['t']) ? $sharedStringsArr[$value] : $value;
            $cell++;
        }
    }
    $row++;
}
$dataSheet = [];
foreach (array_values($out) as $item) {
    $arrItem = [];
    $arrItem['name'] = $item[0];
    $arrItem['code'] = $item[1];
    $arrItem['year'] = $item[2];
    $arrItem['value'] = $item[3];
    $arrItem['type'] = $item[4];
    $arrItem['prices'] = [$item[5], $item[6], $item[7], $item[8], $item[9], $item[10], $item[11], $item[12]];
    $dataSheet[] = $arrItem;
}
$json = json_encode(array('offerData' => $dataSheet));
file_put_contents("./excel/data.json", $json);

// $excel = file_get_contents($file['tmp_name']);
// var_dump($excel);
//
