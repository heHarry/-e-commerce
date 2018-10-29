$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });
    $.ajax({
        url: "/category/queryTopCategory",
        type: 'get',
        success: function (he) {
            console.log(he);
            var txt = template("category_list", { result: he.rows });
            console.log(txt);
            $("#category_inset").html(txt);

            if (he.rows.length) {
                $("#category_inset").find("li").eq(0).addClass("active");
                var id = he.rows[0].id;
                $.ajax({
                    url: "/category/querySecondCategory",
                    type: 'get',
                    data: {
                        id: id,
                    },
                    success: function (he) {
                        var txt = template("category_rPic", he);
                        // console.log(txt);
                        $(".category_rPic").html(txt);
                    }
                });
            }

        }
    });
    $('#category_inset').on("tap","li" ,function () {
    // console.log(document.querySelector('#category_inset'));
    // document.querySelector('#category_inset').onclick = function () {

        // alert(1)
        // document.querySelector('#category_inset').addEventListener("touchstart",function(e){
            // console.log(1)
            // e = window.event||e;
            // var dataId = e.target.parents;
            // console.log(e.target);
            // console.log(dataId);
            var id = $(this).attr("data-id")
            console.log(id)
            $(this).addClass("active").siblings().removeClass("active");
            $.ajax({
                url: "/category/querySecondCategory",
                type: 'get',
                data: {
                    id: id,
                },
                success: function (he) {
                    var txt = template("category_rPic", he);
                    // console.log(txt);
                    $(".category_rPic").html(txt);
                }
            });
        })
})

