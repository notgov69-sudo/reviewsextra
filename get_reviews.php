<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);

$host = 'ep-divine-heart-a8hr3go0-pooler.eastus2.azure.neon.tech';
$dbname = 'neondb';
$user = 'neondb_owner';
$password = 'npg_HMXSrjIDKo38';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password sslmode=require");
if(!$conn){ echo json_encode(['success'=>false]); exit; }

$name = pg_escape_string($conn, $data['name']);
$text = pg_escape_string($conn, $data['text']);
$rating = intval($data['rating']);

$res = pg_query($conn, "INSERT INTO reviews(name,text,rating,created_at) VALUES('$name','$text',$rating, NOW())");
echo json_encode(['success'=>(bool)$res]);
?>
