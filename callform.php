<?php

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $subject = "Ring mig op!";
    $message = $_POST['message'];
    $mailFrom = "ringop@riseanddesign.dk";
    $mailTo = "kontakt@riseanddesign.dk";
    $headers = "From: ".$name;
    $txt = "Du har modtaget en mail fra ".$mailFrom.".\n\n".$message;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.html?mailsend");
}