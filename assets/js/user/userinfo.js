$(function(){
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        nackname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6个字符之间！~~'
            }
        }
    })
    initUserinfo();
    function initUserinfo(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // $(".layui-input-block [name=username]").val(res.data.username)
                form.val('formUserinfo',res.data)
            }
        })
       
    }
    $('#btnr').on('click',function(e){
    e.preventDefault();
    initUserinfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新成功！！');
                window.parent.getUserInfo();
            }
        })
    })
})
