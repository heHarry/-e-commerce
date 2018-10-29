
// 获取地址栏参数
function getParameter(url,name){
    console.log(2)
    var params = url.substr(url.indexOf("?")+1);
    var param = params.split("&");
    for( var i = 0 ;i<param.length;i++){
        var count = param[i].split("=");
        if(count[0]==name){
            return count[1];
        }
    }
    return null
}
$(function(){
    var page = 1;
    var html = "";
    var priceSort = 1;
    var This = null;
    
    var heword = getParameter(location.href,"keyword")
    // 上拉加载
    mui.init({
        pullRefresh : {
          container:document.querySelector('#refresh'),//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:20,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });


    //   通过价格进行排序事件
    $(".prcieSort").on("tap",function(){
        priceSort = priceSort=1?2:1;
        html = '';
        page=1;
        mui('#refresh').pullRefresh().refresh(true);
        getData();
    })
    function getData(){
        console.log(1)
        if(!This){
            This = this;
        }
        $.ajax({
            url:"/product/queryProduct",
            type:'get',
            data:{
                page:page++,
                pageSize:3,
                proName:heword,
                price:priceSort
            },
            success:function(result){
                console.log(result);
                if(result.data.length>0){
                    html+=template("shopList",result);
                    $(".search_list").html(html);
                    This.endPullupToRefresh(false);
                }else{
                    This.endPullupToRefresh(true);
                }
            }
        })
    }
})
