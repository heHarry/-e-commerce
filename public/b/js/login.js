$.ajax({
    url: '/employee/checkRootLogin',
    type: "get",
    asyns: 'false',
    success: function (res) {
        if (res.success) {
            location.href = 'user.html';
        }
    }
});
$(function () {
    $("#loginBtn").on("click", function () {
        // alert(1)
        var username = $("#username").val()
        var password = $("#password").val()
        if (!username) {
            alert("请输入用户名")
            return;
        }
        if (!password) {
            alert("请输入密码")
            return;
        }
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                if (res.success) {
                    setTimeout(function () {
                        location.href = "user.html"
                    }, 2000)
                }else{
                    alert(res.message)
                }

            }
        })
    })

})