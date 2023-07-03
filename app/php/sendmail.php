
<?php
$to      = 'fatkullov1999@yandex.ru';
$subject = 'the subject';
$message = 'hello';
$headers = array(
    'From' => 'no-reply@get-esvo-launcher.ru',
    'Reply-To' => 'fatkullov1999@yandex.ru',
    'X-Mailer' => 'PHP/' . phpversion()
);

mail($to, $subject, $message, $headers);
echo "email sended";
?>