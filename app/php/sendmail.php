
<?php
// Переменная $headers нужна для Email заголовка
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "To: <fatkullov@inbox.ru>\r\n";
$headers .= "From: <no-reply@get-esvo-launcher.ru>\r\n";
// Сообщение для Email
$message = '
        <html>
        <head>
        <title>Подтвердите Email</title>
        </head>
        <body>
        <p>Что бы подтвердить Email, перейдите по <a href="http://example.com/confirmed.php?hash=sdfsdfsd">ссылка</a></p>
        </body>
        </html>
        ';

// проверяет отправилась ли почта
if(mail("fatkullov@inbox.ru", "Подтвердите Email на сайте", $message, $headers)){
    echo "email sended\r\n";
} else {
    echo "not\r\n";
}
?>