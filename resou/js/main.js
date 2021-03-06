console.log('喜欢看toinwork的代码，还是发现了什么bug？不如和我们一起为toinwork添砖加瓦吧!');
console.log('感兴趣就找v3u3i87@gmail.com');

require.config(
    {
        paths: {
            'jquery': '../lib/jquery-2.2.0.min',
            'bootstrap': '../lib/bootstrap/js/bootstrap.min',
            //加密库 base64
            'CryptoJS' : '../lib/CryptoJS/components/core-min',
            'enc-base64':'../lib/CryptoJS/components/enc-base64',
            'ku': 'ku',
            'alert':'alert',
            //交互的API
            'api':'api',
            'user':'user',
            'fakeLoader':'../lib/fakeLoader/fakeLoader',
            'Sortable':'../lib/Sortable/Sortable',
            'jqcookie':'../lib/jquery/jquery.cookie',
            'simditor':'../lib/simditor/simditor',
            'simple-module':'../lib/simditor/module',
            'simple-hotkeys':'../lib/simditor/hotkeys',
            'simple-uploader':'../lib/simditor/uploader',
            //字段渲染
            'field-design':'field/design',
            //数据表格
            'dataTables':'../lib/DataTables/media/js/jquery.dataTables.min',
            //demo test
            'test':'test',
            //登陆
            'login':'login',
            //主页
            'home':'home',
            //设计
            'design':'design',
            //工作详情
            'works_show':'works_show',
        },

        shim: {
            bootstrap: {
                deps: ['jquery'],
                exports: 'bootstrap'
            }
        }

    }
);
require(['jquery','bootstrap'],function ($,b)
{

    $(function()
    {
        //设置提示框
        $('body').prepend('<div id="fakeLoader"></div><div class="objAlert"></div>');
        //$('#fakeloader').fakeLoader({
        //    timeToHide:1200,
        //    bgColor:"#e74c3c",
        //    spinner:"spinner2"
        //});

        var script = $('script[data-main][data-model]');
        var models = script.attr('data-model').split(',');
        if (models.length > 0)
        {
            for (var i = 0; i < models.length; i++)
            {
                require([models[i]], function (m)
                {
                    if (m && m.init)
                    {
                        m.init();
                    }
                });
            }
        }

    })

});

