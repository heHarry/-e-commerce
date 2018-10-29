
$(function(){
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function(res){
            if(res.error&&res.error==400){
                location.href='login.html'
            }
        }
    })
    $("#loginOut").on("click",function(){
            $.ajax({
                url:"/employee/employeeLogout",
                type:'get',
                success:function(res){
                    if(res.success){
                        location.href="login.html"
                    }else{
                        alert("哈哈哈哈")
                    }
                }
            })
	});
	
	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});
})
