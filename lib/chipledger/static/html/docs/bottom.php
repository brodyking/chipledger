    <div id="footer"></div>


    <!-- Bootstrap and Themes -->
    <script src="/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/lib/chipledger/util/js/themeswitcher.js"></script>

    <!-- Site version -->
    <?php
        echo "<script>const version = '{$config["site.version"]}';</script>";
    ?>


    <!-- Footer -->
    <script src="/lib/chipledger/util/js/footer.js"></script>
    <script>refreshColorScheme();</script>

</body>

</html>