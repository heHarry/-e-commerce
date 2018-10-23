$(function(){

    // 点击事件跳转到搜索页面
    $("#search_pRight").on("click",function(){
        var heword = $(this).siblings("input").val();
        if(heword){
            hearr.unshift(heword);
            localStorage.setItem("hearr",JSON.stringify(hearr));
            location.href = "search_result.html?heword="+heword;
        }
        else{
            alert("哎哟不错 输入数据")
        }
    });
    var hearr=[];
    if(localStorage.getItem("hearr")){
        hearr = JSON.parse(localStorage.getItem("hearr"));
        var txt = template("historyTpl",{result:hearr});
        $("#history_list").html(txt);
    }
    $(".clear_history").on('click',function(){
        localStorage.removeItem("hearr");
        $("#history_list").html()
       
    })

})