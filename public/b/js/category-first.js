$(function(){
    var page = 1;
    var pageSize = 8;
    var allPage = 0;
   
    requestAjax();

    $("#prevBtn").on('click',function(){
        page--;
        if(page<1){
            page = 1;
            alert("已经是第一页了")
            return;
        }
        requestAjax();
    })

    $("#nextBtn").on('click',function(){
        page++;
        if(page<allPage){
            page = allPage;
            alert("已经最后一页了")
            return;
        }
        requestAjax();
    })

    // 添加
    $("#addCategory").on("click",function(){
        var categoryName = $("#categoryName").val()
        if(!categoryName){
            alert("请输入类名");
            return;
        }
        $.ajax({
            url:"/category/addTopCategory",
            type:'post',
            data:{
                categoryName:categoryName
            },
            
            success:function(res){
                if(res.success){
                    $("#modal").modal("hide")
                    location.reload()
                }
            }
        })
    });
    // 封装函数
    function requestAjax(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
               page:page,
               pageSize:pageSize
            },
            success:function(res){
                console.log(res)
             allPage = Math.ceil(res.total/pageSize)
             $("#categoryBox").html(template("categoryTpl",{data:res}))
            }
        })
    }
})