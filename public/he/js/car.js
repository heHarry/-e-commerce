$(function(){
var carts = [];
var size;
var productNum;
var num;
    $.ajax({
        url:'/cart/queryCart',
        type:'get',
        success:function(res){
            if(res.error&&res.error==400){
                location.href='login.html';
                return;
            }
            cats = res;
            console.log(cats);
        var html = template("checkoutCar",{data:res})
         $("#cartBox").html(html)
            // console.log(html)
        // 删除事件
        $("body").on("tap",'.deleteBtn',function(){
            var id = $(this).data("id")
            console.log(id)
            $.ajax({
                url:'/cart/deleteCart',
                type:'get',
                data:{
                    id:[id]
                },
                success:function(res){
                    if(res.error&&res.error==400){
                        localStorage.setItem("returnUrl",location.href)
                        location.href='login.html';
                        return;
                    }
                    if(res.success) location.reload();                     
                }
            })
        });
        // 获取页面项目id
        function getHe(res,id){
            for(var i= 0 ;i<res.length;i++){
                if(res[i].id===id){
                    return res[i];
                }
            }
        }
        // 编辑事件
        $("body").on('tap','.editBtn',function(){
            var id = $(this).data("id")
            console.log(id)
            var he = getHe(cats,id)
            productNum = he.productNum;
            num = he.num;
            size = he.size;
            var start = parseInt(he.productSize.split('-')[0])
            console.log(start)
            var end = parseInt(he.productSize.split('-')[1])
            he.customSize = [];
            for(var i = start;i<end;i++){
                he.customSize.push(i);
            }
            var html = template("detailTpl",{data:he}).replace(/\n/g,'');
            var btnArry = ['确定','取消'];
            mui.confirm(html,"编辑",btnArry,function(e){
                if(e.index == 0){
                    $.ajax({
                        url:'/cart/updateCart',
                        type:"post",
                        data:{
                            size:size,
                            num :num,
                            id:id
                        },
                        success:function(res){
                            if(res.success){
                                location.reload();
                            }
                        }
                    })
                }
            })
        });
        $('body').on('tap',".detail-size span",function(){
            // alert(1)
            $(this).addClass("active").siblings().removeClass("active");
            size = $(this).html();
        });
        $("body").on('tap','.detail-num .reduce',function(){
            num = $(".detail-num .num").val();
            num--;
            if(num<1){
                num =1
            }
            $(".detail-num input").val(num)
        })
        $("body").on('tap','.detail-num .plus',function(){
            num = $(".detail-num .num").val();
            num++;
            if(num>productNum){
                num =productNum
            }
            $(".detail-num input").val(num)
        })
          
        }
    })
})