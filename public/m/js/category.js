$(function () {
    // 实现滑动模块初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
            ,
        indicators: false
    });

    // 渲染
    $.ajax({
        url: '/category/queryTopCategory',
        success: function (data) {
            var html = template('categoryLeftTpl', data)
            $('.category-left ul').html(html)
        }
    })

    // 事件委托方式注册点击事件
    $('.category-left ul').on('tap', 'li>a', function () {
        // this是dom原生对象,没有data()方法,因此需要赚成zepto对象
        // console.log($(this).data('id'));
        // console.log(this.dataset['id']);
        // 两者区别在于zepto会做类型转换,原生dataset不会做类型转换
        var id = $(this).data('id');
        // 请求二级分类数据
        querySecondCategory(id);

        // 修改class
        $(this).parent().addClass('active').siblings().removeClass('active')

    })
    // 事件委托二级分类请求函数
    function querySecondCategory(ids) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: ids
            },
            success: function (data) {
                var html = template('categoryRightTpl', data)
                $('.category-right .mui-row').html(html)
                console.log(html);
            }
        })
    }

    querySecondCategory(1)
})