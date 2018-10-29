var userInfo = null;

$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(res){
        
        if(res.error&&res.error==400){
            // localStorage.setItem('returnUrl',location.href);
            location.href="login.html"
        }else{
            var html = template('userInf', res);
             $("#user_allInfo").html(html)
             console.log(html)
        }
    }
})
$(function(){
    $(".logout").on("click",function(){
      $.ajax({
          url:"/user/logout",
          type:'get',
          success:function(res){
              if(res.success){
                mui.toast("退出登录",{ duration:'long', type:'div' }) ;
                setTimeout(function(){
                    location.href='index.html'
                },2000) 
              }
          }
      })  
    });

})