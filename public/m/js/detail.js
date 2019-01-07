$(function () {


    var id = getQueryString('id');
    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (res) {
            var size = res.size;
            var arr1 = size.split('-');
            var arr2 = [];
            for (var i = Number(arr1[0]); i <= arr1[1]; i++) {
                arr2.push(i)
            }
            res.size = arr2;
            var html = template('detailTpl', res);
            $('.mui-scroll').html(html);

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            // 初始化滑块
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            // 初始化数字输入框
            mui('.mui-numbox').numbox()
        }
    })

    // 事件委托添加点击事件
    $('#main').on('tap', '.size .btn-size', function () {
        $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning')
    })

    // 点击加入购物车按钮
    $('.btn-add-cart').on('tap', function () {
        if (!$('.size > .mui-btn-warning').length) {
            mui.toast('请选择尺码')
            return false;
        }
        var size = $('.size > .mui-btn-warning').data('size');
        var num = Number($('.mui-numbox-input').val())
        if (!num) {
            mui.toast('请选择数量')
            return false;
        }

        // 判断有无登陆
        

    })


    // 获取url中的关键字
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})