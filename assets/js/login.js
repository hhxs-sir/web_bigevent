$(function(){
    $('#link-reg').on('click',function(){
      $('.login-box').hide();
      $('.reg-box').show(1000);  
    })
    $('#link-login').on('click',function(){
        $('.login-box').show(1000);
        $('.reg-box').hide();  
      })

})