$(function () {
    var page = 1;
    var pageSize = 8;
    var allPage = 0;
    requestAjax()
    function requestAjax() {
        $.ajax({
            url: "/product/queryProductDetailList",
            type: "get",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                allPage = Math.ceil(res.total / pageSize)
                $("#productBox").html(template("productTpl", { data: res }))
            }
        })
    }
    // 点击上一页事件
    $("#prevBtn").on('click', function () {
        page--;
        if (page < 1) {
            page = 1;
            alert("已经是第一页了")
            return;
        }
        requestAjax();
    })
    // 点击下一页事件
    $("#nextBtn").on('click', function () {
        page++;
        if (page < allPage) {
            page = allPage;
            alert("已经最后一页了")
            return;
        }
        requestAjax();
    })
    $.ajax({
        url: "/category/querySecondCategoryPaging",
        type: "get",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            // allPage = Math.ceil(res.total / pageSize)
            $("#brandBox").html(template("brandTpl", { data: res }))
        }
    })
    // 添加图片
    var pic = [];
    $("#fileUpload").fileupload({
        dataType: 'json',
        done: function (e, data) {
            pic.push(data._response.result);
            $("#imgBox").html(template("imgsTpl", { data: pic }))
        }
    })
    // $('#fileUpload').fileupload({
    //     dataType: 'json',
    //     done: function (e, data) {

    //     	pic.push(data._response.result);

    //     	$('#imgBox').html(template('imgsTpl',{data:pic}))

    //     }
    // });
    // $.ajax({
    //     url: "/category/querySecondCategoryPaging",
    //     type: "get",
    //     data: {
    //         page: page,
    //         pageSize: pageSize
    //     },
    //     success: function (res) {
    //         // allPage = Math.ceil(res.total / pageSize)
    //         $("#firstCategory").html(template("firstCategoryTpl", { data: res.rows }))
    //     }
    // })
    // 添加事件
    $("#addProduct").on("click", function () {
        var productName = $("#productName").val();
        var brandOptions = $("#brandOptions").val();
        var productDescription = $("#productDescription").val();
        var productNum = $("#productNum").val();
        var productSize = $("#productSize").val();
        var productOriginPrice = $("#productOriginPrice").val();
        var productNowPrice = $("#productNowPrice").val();
        if (brandOptions ==-1) {
            alert("请选择品牌")
            return;
        }
        if (!productName) {
            alert("请输入商品名称")
            return;
        }
        if (!productDescription) {
            alert("请输入商品描述")
            return;
        }
        if (!productNum) {
            alert("请输入商品数量")
            return;
        }
        if (!productSize) {
            alert("请输入商品尺码")
            return;
        }
        if (!productOriginPrice) {
            alert("请输入商品原价")
            return;
        }
        if (!productNowPrice) {
            alert("请输入品牌折扣价")
            return;
        }

        if (pic.length == 0) {
            alert("请上传照片")
            return;
        }
        $.ajax({
            url: "/product/addProduct",
            type: "post",
            data: {
                proName: productName,
                oldPrice: productOriginPrice,
                price: productNowPrice,
                proDesc: productDescription,
                size: productSize,
                statu: 1,
                num: productNum,
                brandId: brandOptions,
                pic: pic
            },
            success: function (res) {
                if (res.success) {
                    location.reload();
                } else {
                    alert('添加失败')
                    console.log(res.message)
                }
            }
        })
    })

})