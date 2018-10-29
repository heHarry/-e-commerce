$(function(){
    $(".login").on("click",function(){
        var username = $.trim($(".username").val());
        var password = $.trim($(".password").val());
        console.log(password)
         if(!username){
            // mui.toast('请输入用户名',{ duration:'short', type:'div' }) ;
            mui.alert("请输入用户名","提示","确定")            
            return;
        }
        if(!password){
            mui.alert("请输入正确密码","提示","确定")
            return;
        }
        $.ajax({
            url:'/user/login',
            type:'post',
            data:{
                username: username,
				password: password
            },
            success:function(result){
              if(result.success){
                mui.toast("登陆成功",{ duration:'long', type:'div' }) ;
                setTimeout(function(){
                // if(localStorage.getItem("returnUrl")){
                //     // location.href=localStorage.getItem("returnUrl")
                //     localStorage.removeItem("returnUrl")
                // }else{
                    location.href="user.html"
                // }
                },2000)
              }
              else{
                  mui.toast(result.messgae);
              }
            },

        })
    })
    $(".register").on("click",function(){
        location.href="register.html"
    })
})