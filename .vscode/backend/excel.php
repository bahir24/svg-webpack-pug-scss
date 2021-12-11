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
    $arrItem['name'] = trim($item[0]);
    $arrItem['code'] = trim($item[1]);
    $arrItem['year'] = trim($item[2]);
    $arrItem['value'] = trim($item[3]);
    $arrItem['type'] = trim($item[4]);
    $arrItem['prices'] = [trim($item[5]), trim($item[6]), trim($item[7]), trim($item[8]), trim($item[9]), trim($item[10]), trim($item[11]), trim($item[12])];
    $dataSheet[] = $arrItem;
}
$json = json_encode(array('offerData' => $dataSheet));
file_put_contents("./excel/data.json", $json);
