<h1>Chipledger </h1>

Chipledger is a web app that tracks buyins and cashouts for poker/blackjack home games.

<img src="lib/chipledger/img/screenshot.png">

<p align="center">
<a href="https://chipledger.com"><b>Chipledger.com</b></a> - <a href="https://chipledger.com/docs/"><b>Documentation</b></a>
</p>

## Requirements
This project uses/requires:

- [**PHP 8**](https://www.php.net/) - Backend use for API and Database. Used lightly on frontend.
- [**Apache**](https://httpd.apache.org/) - Web server. You can use nginx instead if you configure it right.
- [**SQLite**](https://sqlite.org/) - Database.
- [**Bootstrap**](https://github.com/twbs/bootstrap) - Styling
- [**Bootswatch**](https://github.com/thomaspark/bootswatch/) - Even more styling ontop of Bootstrap.

Bootstrap, and Bootswatch are included in the repo. No need to download elsewhere.

## Install

```bash
git clone https://github.com/brodyking/chipledger.git
```

## Roadmap

- [x] Authentication
- [x] Stored games
- [x] Landing page
- [ ] Mobile focus/PWA
- [ ] More interesting splash page
- [x] Track transaction method (venmo/cash/etc)
