$(function(){
    $('#link-reg').on('click',function(){
      $('.login-box').hide();
      $('.reg-box').show(1000);  
    })
    $('#link-login').on('click',function(){
        $('.login-box').show(1000);
        $('.reg-box').hide();  
      })
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
      pwd:[/^[\S]{6,12}$/,'密码必须6到12位，不能出现空格'],
      repwd:function(value){
          var pwd=$('.reg-box [name=password]').val();
          if(pwd!==value){
              return '两次密码不一样'
          }
      }
    })
    $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data,
    function(res) {
    if (res.status !== 0) {
    return layer.msg(res.message)
    }
    layer.msg('注册成功，请登录！')
    // 模拟人的点击行为
    $('#link-login').click();
    })
    })
    $('#form_login').on('submit',function(e){
      e.preventDefault();
      $.ajax({
        method: "post",
        url: "/api/login",
        data: $(this).serialize(),
        success: function (res) {
        if(res.status!==0){
          return layer.msg(res.message)
        } 
        layer.msg('登录成功！')
        localStorage.setItem('token',res.token);
        window.location.href='/index.html';
        }
      });
    
    
    })
    
})