define(['ku','alert','api','user'],function (ku,msg,api,user) {

    //获取项目列表
    var projectList = api.projectList();
    var project_id = ku.getUrlParam('project_id');

    function init()
    {
        user.usrRun();

        if(project_id)
        {
            viewIsProject_id(project_id);
        }


        if(projectList && projectList.code == '200')
        {
            //渲染项目列表
            viewProjectList(projectList.data);

            //项目切换
            $(document).on('mouseover','.logo',function()
            {
                $(this).addClass('projectMenuShow').siblings().removeClass('projectMenuShow');
                $(".projectList").css({"display":"block"});
            }).on('mouseout','.logo',function()
            {
                $(this).removeClass('projectMenuShow');
                $(".projectList").css({"display":"none"});
            });

            //切换区域渲染
            $(document).on('click','.item',function()
            {
                 //return $(this).data('project_id');
                viewIsProject_id($(this).data('project_id'));
            });



        }else{
            return msg.info('hi,您并没有加入任何项目哦..');
        }


    }

    /**
     * 工作区渲染
     * @param project_id
     * @returns {*}
     */
    function viewIsProject_id(project_id)
    {
        var designList = api.designList(project_id);
        if(designList && designList.code=='200')
        {

            viewDesignList(designList.data);

            //切换区域渲染
            $(document).on('click','.designItem',function() {
                var project_id = $(this).data('project_id');
                var design_id = $(this).data('design_id');
                return ku.jump('/main/works?project_id='+project_id+'&design_id='+design_id);
            });

        }else{
            return msg.info('该项目没有设计工作区');
        }
    }

    /**
     * 渲染设计列表
     * @param v
     */
    function viewDesignList(tmp)
    {
        var v = tmp.list
        var h = '<ul class="designList">';
        for(var i=0;i < v.length;i++)
        {
            h+='<li class="designItem" data-project_id="'+v[i].project_id+'" data-design_id="'+v[i].design_id+'">'+v[i].name+'</li>';
        }
        h+='</ul>';
        $(".main").empty().html(h);
    }



    /**
     * 渲染项目列表
     * @param v
     */
    function viewProjectList(v)
    {
        //console.log(v);
        var h = '<ul class="projectList">';
        h+='<li class="addProject"><i class="glyphicon glyphicon-plus"></i> </li>';
        for(var i=0;i < v.length;i++)
        {
            h+='<li class="item" data-project_id="'+v[i].project_id+'"><span>'+v[i].name+'</span><p>'+v[i].design_count+' 工作区</p></li>';
        }
        h+='</ul>';
        $(".logo").append(h);
    }

    return {
        init:init
    }


});