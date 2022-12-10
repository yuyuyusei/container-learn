$(function(){
    /* 現在サイドメニューを開いているか */
    var isOpenSideMenu = false;

    /* サイドメニュー開閉にかける時間 */
    var durationSideMenu = 200;

    /* サイドメニュー項目変化にかける時間 */
    var durationSideMenuContents = 100;

    /* サイドメニューを開く処理 */
    function showSideMenu(){
        $(".side-menu").animate(
            {
                "left": "0px"
            },
            durationSideMenu
        );
        $(".hide-contents")
            .css("display", "block")
            .animate(
                {
                    "opacity": "0.5"
                },
                durationSideMenu);
        isOpenSideMenu = true;
    }

    /* サイドメニューを閉じる処理 */
    function hideSideMenu(){
        $(".side-menu").animate(
            {
                "left": "-400px"
            },
            durationSideMenu
        );
        $(".hide-contents").animate(
            {
                "opacity": "0"
            },
            durationSideMenu,
            function(){
                $(".hide-contents").css("display", "none");
            });
        isOpenSideMenu = false;
    }

    /* コンテンツを切り替える処理 */
    function changeContents(contentsClass){
        $(".main-contents .contents").css("display", "none");
        $(".main-contents ." + contentsClass).css("display", "block");
    }

    /* サイドメニューボタンをクリックした際のイベント登録 */
    $(".side-menu-button").on("click", function(){
        if(!isOpenSideMenu){
            showSideMenu();
        }else{
            hideSideMenu();
        }
    });

    /* 非表示領域をクリックした際のイベント登録 */
    $(".hide-contents").on("click", hideSideMenu);

    /* サイドメニューの項目に関するイベント登録 */
    $(".side-menu ul li:not(.has-child-menu)")
        /* カーソルを重ねた時 */
        .on("mouseover", function(){
            $(this).stop(true).animate(
                {
                    "background-color": "#999"
                },
                durationSideMenuContents
            );
        })
        /* カーソルを離した時 */
        .on("mouseout", function(){
            $(this).stop(true).animate(
                {
                    "background-color": "#EEEEEE"
                },
                durationSideMenuContents
            );
        })
        /* クリックした時 */
        .on("click", function(event){
            var contentsClass = event.target.className;
            changeContents(contentsClass);
            hideSideMenu();
        });
});