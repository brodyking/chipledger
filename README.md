<h1>Chipledger </h1>

Chipledger is a web app that tracks buyins and cashouts for poker/blackjack home games.

<img src="lib/chipledger/img/screenshot.png">

<p align="center">
<a href="https://chipledger.com"><b>Chipledger.com</b></a> - <a href="https://chipledger.com/docs/"><b>Documentation</b></a><br><br>
</p>

## v1.1 Release Notes

Here are the changes made to the v1.1 Bug Fix:<br>

<ol>
    <li>
        Fixed navigation not working on mobile when viewing a game.
    </li>
    <li>
        Restructured static content.
        <ol>
            <li>
                All static content is now in <code>/lib/chipledger/static/</code>.
            </li>
            <li>
                Added <code>/blog</code>.
            </li>
            <li>
                Moved the donation page from a JS rendered one to <code>/donate</code>, similar to blog and docs.
            </li>
        </ol>
    </li>
    <li>
        Updated logo slightly.
    </li>
    <li>
        Improved splash/landing page for those not logged in.
        <ol>
            <li>
                Contains new text typewritter effect to draw people in.
            </li>
            <li>
                Redesigned navbar that is mobile compliant.
            </li>
        </ol>
    </li>
    <li>
        Routing code improved for readability.
    </li>
    <li>
        Documentation updated.
        <ol>
            <li>
                Added File Structure documentation.
            </li>
        </ol>
    </li>
    <li>
        Moved API content to <code>/lib/chipledger/api/</code>.
        <ol>
            <li>
                This was done to organize the code in this project.
            </li>
            <li>
                All code that is NOT modified is stored in <code>/lib/</code>, the database is still <code>/database/</code>.
            </li>
        </ol>
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
