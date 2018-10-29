$(function () {
    var page = 1;
    var pageSize = 8;
    var allPage = 0;
    requestAjax()
    function requestAjax() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "get",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                allPage = Math.ceil(res.total / pageSize)
                $("#categoryBox").html(template("categoryTpl", { data: res }))
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
    var data = {
        brandName: '',
        categoryId: "",
        brandLogo: "",
        hot: 0
    }
    // 添加图片
    $("#fileUpload").fileupload({
        dataType:'json',
        done:function(e,data){
            brandData.brandLogo = data._response.result.picAddr;
            var imgUrl= data._response.result.picAddr;
	        $("#showBrand").attr("src",imgUrl);
        }
    })
    $.ajax({
        url: "/category/querySecondCategoryPaging",
        type: "get",
        data: {
            page:1,
            pageSize: 100
        },
        success: function (res) {
            // allPage = Math.ceil(res.total / pageSize)
            $("#firstCategory").html(template("firstCategoryTpl", { data: res.rows }))
        }
    })
    // 添加事件
    $("#addCategory").on("click", function () {
        data.brandName = $("#brandName").val();
        data.categoryId = $("#categoryId").val();
        if (!data.brandName) {
            alert("请输入品牌名称")
            return;
        }
        if (data.categoryId == "-1") {
            alert("请输入品牌分类")
            return;
        }
        if (!data.brandLogo) {
            alert("请输入品牌图片")
            return;
        }
        $.ajax({
            url:"/category/addSecondCategory",
            type:"post",
            data:data,
            success:function(res){
                if(res.success){
                    location.reload();
                }else{
                    alert('添加失败')
                    console.log(res.message)
                }
            }
        })
    })
  
})