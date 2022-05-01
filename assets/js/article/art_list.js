$(function(){
    var layer=layui.layer;
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat=function(date){
      const dt=new Date(date);
      var y=dt.getFullYear();
      var m=padZero(dt.getMonth()+1);
      var d=padZero(dt.getDate());
      var hh=padZero(dt.getHours());
      var mm=padZero(dt.getMinutes());
      var ss=padZero(dt.getSeconds());
      return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss;
    }
    function padZero(n){
    return n<10?'0'+n:n;
    }
    var q={
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      }
      initTable();
      initcate()
      function initTable(){
        $.ajax({
            method:'get',
            url:'/my/article/list',
            data:q,
            success:function(res){
              console.log(res);
            if(res.status!==0){
              return layer.msg('获取文章列表失败！！') 
            }
            var htmlstr=template('tpl-table',res)
            $('tbody').html(htmlstr);
            renderpage(res.total);
            }
        })
    }
    function initcate(){
      $.ajax({
         method:'get',
         url:'/my/article/cates',
         success:function(res){
           if(res.status!==0){
             return layer.msg('获取分类数据失败！！');
           }
           var htmlstr=template('tpl-cate',res);
           $('[name=cate_id]').html(htmlstr);
           layui.form.render();
         }

      })
    }
    $('#form-search').on('submit',function(e){
    e.preventDefault();
    var cate_id=$('[name=cate_id]').val();
    var state=$('[name=state]').val();
    q.cate_id=cate_id;
    q.state=state;
    initTable();
    })
    function renderpage(total){
      laypage.render({
        elem: 'pagebox',
        count: total ,
        limit:q.pagesize,
        curr:q.pagenum,
        layout:['count','limit','prev','page', 'next','skip'],
        limits:[2,3,5,10],
        jump:function(obj,fl){
          q.pagenum=obj.curr;
          q.pagesize=obj.limit;
          if(!fl){
            initTable();
          }
        }
      });
    }

    $('tbody').on('click','#btn-del',function(){
      var len=$('#btn-del').length;   
      var id=$(this).attr('data-id');
      // console.log(id); 
      layer.confirm('确定删除？？?', {icon: 3, title:'提示'}, function(index){
          $.ajax({
              method:'get',
              url:'/my/article/delete/'+id,
              success:function(res){
                  // console.log(res);
                  if(res.status!==0){
                      return layer.msg('删除失败');
                  }
           
               layer.msg('删除成功！');
               if(len===1){
                 q.pagenum=q.pagenum===1?1:q.pagenum-1;
               }
               initTable();
              }
          })
          
          layer.close(index);
        });
    
  })

  // 修改文章


  initcate();
  // 初始化富文本编辑器
  initEditor()
  var $image = $('#image')
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  $image.cropper(options);
  $('#btnchocesimg').on('click',function(){
      $('#covefile').click();

  })
  $('#covefile').on('change',function(e){
  var files = e.target.files;
  if(files.length===0){
      return
  }
  var newImgURL = URL.createObjectURL(files[0])
  $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
  // 3. 初始化裁剪区域) 
  })

 
  function initcate(){
      $.ajax({
         method:'get',
         url:'/my/article/cates',
         success:function(res){
           if(res.status!==0){
             return layer.msg('获取分类数据失败！！');
           }
           var htmlstr=template('tpl-cate',res);
           $('[name=cate_id]').html(htmlstr);
           layui.form.render();
         }

      })
    }
  $('tbody').on('click','#btn-edit',function(){

    $('#artlis').hide();
    $('#artxg').show();
    idd=$(this).attr('data-id');
    $.ajax({
      method:'get',
      url:'/my/article/'+idd,
      success:function(res){
          console.log(res);
          if(res.status!==0){
              return layer.msg('获取失败');
          }
   
       layer.msg('获取成功');
       layui.form.val('form-pb', res.data)
      }
  })
    var art_state='已发布';
          $('#btnsave2').on('click',function(){
              art_state='草稿';
          })
      $('#form-pub').on('submit',function(e){
              e.preventDefault();
              var fd=new FormData($(this)[0]);
              fd.append('Id',idd)
              fd.append('state',art_state);
              $image
              .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
              width: 400,
              height: 280
              })
              .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
              // 得到文件对象后，进行后续的操作
              fd.append('cover_img',blob);
              console.log(fd);
              artaxg(fd);
              
              })
            

          })
          function artaxg(fd){
              $.ajax({
                  method: 'POST',
                  url: '/my/article/edit',
                  data: fd,
                  // 注意：如果向服务器提交的是 FormData 格式的数据，
                  // 必须添加以下两个配置项
                  contentType: false,
                  processData: false,
                  success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                      return layer.msg('修改文章失败！')
                    }
                    layer.msg('修改文章成功！')
                    // 发布文章成功后，跳转到文章列表页面
                    initTable()
                    $('#artlis').show();
                    $('#artxg').hide();
                  }
                })
          }
              
          })


})
  

