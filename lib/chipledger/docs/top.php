<!DOCTYPE html>
<html>

<head>
    <!---


    Project created and maintained by Brody King.

    https://github.com/brodyking/chipledger/
    https://benadryl.dev

    <3 for supporting this project.


    --->
    <!--- Styles --->
    <link href="/lib/bootswatch-5/dist/lumen/bootstrap.min.css" rel="stylesheet">
    <link href="/lib/bootstrap/icons/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="/lib/chipledger/css/main.css" rel="stylesheet">
    <link href="/lib/chipledger/css/docs.css" rel="stylesheet">

    <!--- Title --->
    <title>
        Chipledger Docs
    </title>

    <!--- PWA and Icons --->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="/lib/chipledger/img/logo-mobile.png">

    <style>
        main {
            padding-top: 20px!important;;
        }
    </style>

</head>

<body data-bs-theme="dark">
    <nav class="navbar fixed-top navbar-expand-lg p-0 bg-primary" id="navbar">
        <div class="container-fluid">
            <a class="navbar-brand" onclick="home();" style="color: #fff;">
                <i class="bi bi-bank me-1"></i> Chipledger</a>
            <button class="navbar-toggler bg-white text-black btn btn-light p-1 ps-2 pe-2" type="button"
                data-bs-toggle="modal" data-bs-target="#mobilenavmodal">
                <i class="bi bi-list"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" href="/" style="color:#ffffff8c;" aria-current="page"><i
                                class="align-middle bi bi-house-door me-1"></i> Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/games" style="color:#ffffff8c;" aria-current="page"><i
                                class="align-middle bi bi-suit-spade me-1"></i> Games</a></li>
                    <li class="nav-item"><a class="nav-link" href="/donate" style="color:#ffffff8c;" aria-current="page"><i
                                class="align-middle bi bi-heart me-1"></i> Donate</a></li>
                    <li class="nav-item"><a class="nav-link" href="/docs" style="color:#fff;" aria-current="page"><i
                                class="align-middle bi bi-book-fill me-1"></i>
                            Docs</a></li>
                </ul>
            </div>
        </div>
    </nav>