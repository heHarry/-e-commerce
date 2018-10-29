$(function(){
    var code;
    $(".register_getCode").on("click",function(){
        $.ajax({
            url:'/user/vCode',
            type:'get',
            success:function(he){
                
                code = he.vCode;
                mui.alert(code,"验证码","确定")
            }
        })
    });


    $(".click_register").on("click",function(){
        var uersname = $(".uersName").val();
        var mobile = $(".telephone").val();
        var password = $(".password").val();
        var againPassword = $(".againPassword").val();
        var register_Code = $(".register_Code").val();
        if(!uersname){
            // mui.toast('请输入用户名',{ duration:'short', type:'div' }) ;
            mui.alert("请输入用户名","提示","确定")            
            return;
        }
        if(mobile.length<11){
            mui.alert("请输入合法手机号","提示","确定")
            return;
        }
        if(!password){
            mui.alert("请输入密码","提示","确定")
            return;
        }
        if(againPassword!=password){
            mui.alert("请输入相同密码","提示","确定")
            return;
        }
        if(!register_Code&&code!=register_Code){
            mui.alert("请输入正确验证码","提示","确定")
            return;
        }
        $.ajax({
            url:'/user/register',
            type:'post',
            data:{
                username:uersname,
                mobile:mobile,
                password:password,
                vCode:register_Code

            },
    
            success:function(he){
                console.log(he)
                // console.log(he.vCode)
              if(he.success){
                mui.toast('登陆成功',{ duration:'long', type:'div' }) ;
                setTimeout(function(){
                   location.href="login.html" 
                },2000)
              }else{
                mui.toast(he.message,{ duration:'long', type:'div' }) ;

              }
            }
        })
    });
    $(".loginNow").on("click",function(){
        location.href="login.html"
    })
    
})