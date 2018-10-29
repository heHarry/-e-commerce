$(function () {
    $.ajax({
        url: "/address/queryAddress",
        type: 'get',
        success: function (res) {
            console.log(res)
            var html = template("he", { result: res });
            $(".addAddress").html(html)
            console.log(html)
        }
    })
    // 添加删除事件
    $(".addAddress").on("tap", ".delete", function () {
        // mui.alert("hhhh")
        $.ajax({
            url: '/address/deleteAddress',
            type: 'post',
            data: {
                id: $(this).attr("data-id")
            },
            success: function (result) {
                console.log(result)
                if (result.success) {
                    mui.toast('删除地址成功');

                    location.reload();

                } else {
                    mui.toast('删除地址失败');
                }
            }
        })
    })
})