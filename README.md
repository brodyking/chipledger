<h1>Chipledger </h1>

Chipledger is a web app that tracks buyins and cashouts for poker/blackjack home games.

<img src="lib/chipledger/img/screenshot.png">

<p align="center">
<a href="https://chipledger.com"><b>Chipledger.com</b></a> - <a href="https://chipledger.com/docs/"><b>Documentation</b></a><br><br>
</p>

## v1.0 Release Notes

This is the first major release of Chipledger. Here are the features included in this release:<br>

<ol>
    <li>
        Working games, including:
        <ul>
            <li>Adding multiple players, buyins, and cashouts.</li>
            <li>Different payment methods for each buyin.</li>
            <li>History of all transactions and player interactions.</li>
        </ul>
    </li>
    <li>
        A fully functional backend API, including:
        <ul>
            <li>Authentication: Logins, Logouts, and Registration.</li>
            <li>Game Interactions: Buyins, Cashouts, Adding Players, Deleting games, Listing all games available, Creating new games, and Renaming games.</li>
            <li>Other data fetching, including Release Notes and the Donation page. These are also cached in the browser to avoid requesting static content twice.</li>
        </ul>
    </li>
    <li>
        A desktop and mobile friendly UI
        <ul>
            <li>Created with Bootstrap 5.3 and Bootswatch 5</li>
            <li>All actions, besides settings, do not cause a page refresh. This makes the app faster as less data has to travel on each action, and in addition works well as a PWA.</li>
        </ul>
    </li>
</ol>

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
- [x] Mobile focus/PWA
- [x] More interesting splash page
- [x] Track transaction method (venmo/cash/etc)
