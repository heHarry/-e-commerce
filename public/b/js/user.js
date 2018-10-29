$(function(){
    $.ajax({
        url:'/user/queryUser',
        type:'get',
        data:{
            page:1,
            pageSize:10
        },
        success:function(res){
            console.log(res)
            var html = template('userTpl',{data:res});
            $('#userBox').html(html)
        }
    });
    // var isdDelete;
    $("body").on("click",'#deleteBtn',function(){
        var id =$(this).data('id');
        var isDelete = Number($(this).attr('data-isDelete')) ? 0 : 1;
        console.log(isDelete)
        $.ajax({
            url:"/user/updateUser",
            type:'post',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(res){
                if(res.success){
                    location.reload();
                }else(
                    alert(res.message)
                )
            }
        })

    })
})