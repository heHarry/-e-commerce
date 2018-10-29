$(function () {
    // 获取参数
    // var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));
    // 添加地区选项
    // 初始化popPicker组件
    // layer可设置成绩数
    var picker = new mui.PopPicker({ layer: 3 });
    // 添加数据对对象
    picker.setData(cityData);
    // 绑定点击选择事件
    $(".addressCity").on("tap", function () {
        picker.show(function (selectItems) {
            console.log(selectItems);
            $(".addressCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)

        })
    })
    // 设置默认添加地址
    var flag = true;
    // 获取地址栏参数
    function getParams(url, name) {
        var params = url.substr(url.indexOf("?") + 1).split("&");
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split("=");
            if (param[0] == name) {
                return param[1]
            }
        }
        return null
    }
    //    判断是否有参数,有参数则是编辑地址 
    if (getParams(location.href, "id")) {
        flag = false;
        $.ajax({
            url: '/address/queryAddress',
            type: 'get',
            success: function (res) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].id == getParams(location.href, "id")) {
                       $(".username").val(res[i].recipients);   
                       $(".addressDetail").val(res[i].addressDetail);   
                       $(".addressCity").val(res[i].address);   
                       $(".postcode").val(res[i].postCode);   
                    }
                }

            }
        })
    }
    // 添加收获地址
    $("#addAdress").on("tap", function () {
        var url = '/address/addAddress';
        var data={
            address: $(".addressCity").val().trim(),
            addressDetail:  $(".addressDetail").val().trim(),
            recipients:$(".username").val().trim(),
            postcode: $(".postcode").val().trim()
        }
        // var username = $(".username").val().trim();
        // // console.log(username)
        // var postCode = $(".postcode").val().trim();
        // var city = $(".addressCity").val().trim();
        // var detail = $(".addressDetail").val().trim();
        // 验证是否输入内容
        if (!data.recipients) {
            mui.alert("请输入收货人", "提示", "确定")
            return;
        }
        if (!data.postcode) {
            mui.alert("请输入邮政编码", "提示", "确定")
            return;
        }
        if (!data.address) {
            mui.alert("请选择地址", "提示", "确定")
            return;
        }
        if (!data.addressDetail) {
            mui.alert("请输入详细地址", "提示", "确定")
            return;
        }
        if(!flag){
            url = '/address/updateAddress'
            data.id = getParams(location.href, "id");
        }
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (res) {
                mui.toast("添加成功", { duration: 'long', type: 'div' });
                setTimeout(function () {
                    location.href = "address.html"
                }, 2000)
            }
        })

    })

})