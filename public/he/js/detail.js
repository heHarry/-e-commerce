    // 获取search_reault页面参数函数
 function getParameter(url,name){
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
    // 库存量
    var stockNum = "";
    var size = null;
    var stockId = '';

       // 获取search_reault页面参数
    var id = getParameter(location.href,"id");
    // 请求数据 模板渲染
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function(res){
            console.log(res)
            stockNum = res.num;
            stockId = res.id;
            // console.log(stockNum)
            var html =template("detailShoe",res);
            var he =template("allNum",res);
            $("#product-box").html(html)
            $(".repertory").html(he)
            console.log(html)
            var gallery = mui('.mui-slider');
			gallery.slider();
        }
    });
    // 事件委托 添加选中尺码事件
    $("#product-box").on('tap','.size span',function(){
        $(this).addClass("active").siblings("span").removeClass("active");
        size = $(this).text();
        console.log(size)
    })
// 获取元素
var numb = $("#inp");
// 点击减少购物数量
$("#reduce").on('tap',function(){
    var num = numb.val();
    num--;
    if(num<1){
        num=1;
    }
    numb.val(num);
})
  // 点击添加购物数量
$("#increase").on('tap',function(){
    var num = numb.val();
    num++;
    if(num>stockNum){
        num=stockNum;
    }
    numb.val(num);
})  
// 加入购物车事件
$("#addCart").on('tap',function(){
    if(!size){
        mui.alert("请选择尺码","提示","确定")
        return;
    }
    $.ajax({
        url:'/cart/addCart',
        type:'post',
        data:{
            num:stockNum,
            productId:id,
            size:size
        },
        success:function(res){
            // mui.toast("登陆成功") ;
            setTimeout(function(){
                location.href="car.html"
            },2000)
        }
    })
})

})