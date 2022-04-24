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
    form.verify({
      pwd:[/^[\S]{6,12}$/,'密码必须6到12位，不能出现空格'],
      repwd:function(value){
          var pwd=$('.reg-box [name=password]').val();
          if(pwd!==value){
              return '两次密码不一样'
          }
      }
    })
})