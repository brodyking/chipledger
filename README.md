<h1>Chipledger </h1>

Chipledger is a web app that tracks buyins and cashouts for poker/blackjack home games.

<img src="lib/chipledger/img/screenshot.png">

<p align="center">
<a href="https://chipledger.com"><b>Chipledger.com</b></a> - <a href="https://chipledger.com/docs/"><b>Documentation</b></a><br><br>
</p>

## v1.2 Release Notes

Here are the changes made to the v1.2 Feature Update:<br>

<ol>
    <li>
        Fixed incorrect icon's on mobile navigation bar.
    </li>
    <li>
        You can now add an inital buyin while adding a new player. Makes it much faster.
    </li>
    <li>
        More advanced tracking of different payment methods.
        <ul>
            <li>
                You can track total buyins and cashouts + pot size per payment method.
            </li>
        </ul>
    </li>
    <li>
        Lots of UI Improvements
        <ul>
            <li>
                New buttons that auto-adjust to theme.
            </li>
            <li>
                View screen has been overhaulled
                <ol>
                    <li>
                        New floating navigation at the bottom that contains links for buyins, cashouts, and adding new players.
                    </li>
                    <li>
                        Tables have lost their padding inside of cards, making for some much needed room.
                    </li>
                    <li>
                        History has been stylized much more.
                    </li>
                    <li>
                        Game name and settings (rename and delete) have been moved to a horizontal bar at the top of the page.
                    </li>
                </ol>
            </li>
            <li>
                Cards on almost all screens have a "collapse" feature.
            </li>
            <li>
                Navigation has been improved upon heavily
                <ol>
                    <li>
                        More uniform between all areas of the site.
                    </li>
                    <li>
                        Improved dropdown, replacing the popup, for mobile navigation.
                    </li>
                    <li>
                        Mobile now retains SPA, instead of href (thanks safari, you suck)
                    </li>
                </ol>
            </li>
            <li>
                Logo has been made simpler. No more gradient.
            </li>
        </ul>
    </li>
    <li>
        New <code>/policy</code> area of site. All Info related to Policy has been removed from <code>/docs</code>
    </li>
    <li>
        Ability to edit values. You can <i>finally</i> edit buyins and cashouts.
    </li>
    <li>
        New tutorial page. It will be expanded upon later, for now it just contains install instructions for iOS.
    </li>
    <li>
        Back buttons on browser now function correctly.
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

Clone the repo from GitHub, or download it. 

```bash
git clone https://github.com/brodyking/chipledger.git
```

Ensure you have `mod_rewrite` enabled. It will break if not enabled. Also ensure your hosting provider/local env has SQLite functionality with PHP.

Start your web server in the root directory of the project *(the one with this README in it)*.

For more information, checkout the [documentation](https://chipledger.com/docs)

## Roadmap

- [x] Authentication
- [x] Stored games
- [x] Landing page
- [x] Mobile focus/PWA
- [x] More interesting splash page
- [x] Track transaction method (venmo/cash/etc)
- [x] Editing values
- [ ] Find the meaning of life