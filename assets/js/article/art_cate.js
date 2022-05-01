$(function(){
    var layer=layui.layer;
     initartcatelist();
    function initartcatelist(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
          var htmlstr=template('tpl-table',res);
          $('tbody').html(htmlstr);
            }
        })
    }
     var openform=null;
    $('#btnaddcate').on('click',function(){
        openform=layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类'
            ,content: $('#art-add').html()
          });     
            
    })

    //通过代理的形式，为表单绑定submit事件绑定
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
        method:'post',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg('新增失败！！')
            }
            initartcatelist();
            layer.msg('新增成功！！');
            layer.close(openform);
        }
       

        })

    })
    var indexedit=null;
    $('tbody').on('click','#btn-edit',function(){
        
        indexedit=layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改文章'
            ,content: $('#art-edit').html()
          });     
        //   editart();
        var id=$(this).attr('data-id');
        // console.log(id); 
      
        $.ajax({
            method:'get',
            url:'/my/article/cates/'+id,
            success:function(res){
            // console.log(res);
        
            $('[name=Id]').val(res.data.Id);
             $('[name=name]').val(res.data.name);
             $('[name=alias]').val(res.data.alias);
            }
        })
        
    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
        method:'post',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function(res){
            // console.log(res);
            if(res.status!==0){
                return layer.msg('修改失败！！')
            }
           
            layer.msg('修改成功！！');
            layer.close(indexedit);
            initartcatelist();
        }
       

        })

    })
    $('tbody').on('click','#btn-del',function(){
        
        var id=$(this).attr('data-id');
        // console.log(id); 
        layer.confirm('确定删除？？?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    // console.log(res);
                    if(res.status!==0){
                        return layer.msg('删除失败');
                    }
             
                 layer.msg('删除成功！');
                 initartcatelist();
                }
            })
            
            layer.close(index);
          });
      
    })
   

})