<h1>Chipledger </h1>

Chipledger is a web app that tracks buyins and cashouts for poker/blackjack home games.

<img src="lib/chipledger/img/screenshot.png">

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

## Documentation
1. Everything todo with data is done from /api/
2. Routing for the API is done within `index.php`, and routing for pages is done within `/lib/chipledger/js/pages.js`
3. SPA mindset. Almost no refreshing should be happening. Keep the data transfers low.

I will write something better up at some point. I am tired.

## Roadmap

- [x] Authentication
- [x] Stored games
- [x] Landing page
- [ ] Mobile focus/PWA
- [ ] More interesting splash page
- [ ] Track transaction method (venmo/cash/etc)
