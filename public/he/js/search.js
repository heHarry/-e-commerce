$(function(){

    // 点击事件跳转到搜索页面
    $("#search_pRight").on("click",function(){
        var heword = $(this).siblings("input").val();
        if(heword){
            hearr.unshift(heword);
            localStorage.setItem("hearr",JSON.stringify(hearr));
            location.href = "search_result.html?heword="+heword;
            $.ajax({
                url:'/category/querySecondCategory',
                type:"get",
                success:function(he){
                    console.log(res)
                }
            })
        }
        else{
            mui.alert("请输入搜索内容","提示","确定")
        }
    });
    var hearr=[];
    if(localStorage.getItem("hearr")){
        hearr = JSON.parse(localStorage.getItem("hearr"));
        var txt = template("historyTpl",{result:hearr});
        $("#history_list").html(txt);
    }

    // 清除历史
    $(".clear_history").on('click',function(){
        localStorage.removeItem("hearr");
        $("#history_list").html()
        location.reload();
        
       
    })

})