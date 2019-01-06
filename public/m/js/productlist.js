$(function () {
    var count = 1;
    var proName = getQueryString('key');



    var obj = {
        proName: "",
        page: 1,
        pageSize: 2
    }

    // 获取search页面传递过来的数据
    obj.proName = getQueryString('key');
    getProductList()


    // 搜索按钮
    $('.mui-btn').on('tap', function () {
        obj.proName = $('.input-search').val().trim();
        if (!obj.proName) {
            mui.alert('请输入你要搜索的关键字', '温馨提示(标题)', function () {

            });
            return;
        }
        // 3. 点击搜索按钮搜索商品 调用查询商品的渲染函数
        getProductList()
        proName = $('.input-search').val().trim();
    })


    // 点击排序按钮;
    $('.mui-card-header a').on('tap', function () {
        var sortType = $(this).data('sort-type');
        var sort = $(this).data('sort');
        sort = sort == 2 ? 1 : 2;
        $(this).data('sort', sort);
        obj[sortType] = sort;
        getProductList()
        obj[sortType] = "";
        $(this).addClass('active').siblings().removeClass('active')
    })



    // 下拉刷新
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                callback: function () {
                    // 模拟请求过程写了一个延迟的定时器 让结束代码延迟2秒钟执行
                    setTimeout(function () {
                        obj.page = 1
                        // 2. 调用ajax请求渲染刷新页面
                        getProductList();
                        // 3. 结束下拉加载转圈圈
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

                        // 4. 下拉刷新完成后去重置上拉加载效果
                        mui('#pullrefresh').pullRefresh().refresh(true);
                        // 5. 除了重置上拉加载的效果 还要把page也重置为第一页 一定要重置page不然下一次请求到了很大page

                        count = 1
                    }, 2000);
                }
            },
            up: {
                callback: function () {
                    setTimeout(function () {
                        count++;
                        obj.page = count;
                        $.ajax({
                            url: '/product/queryProduct',
                            data: {
                                page: count,
                                proName: proName,
                                pageSize: 2
                            },
                            success: function (data) {
                                if (data.data.length > 0) {
                                    var html = template('productTpl', data)
                                    $('.mui-card-content .mui-row').append(html)

                                    mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                                } else {

                                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        })

                    }, 2000)

                }
            }
        }
    });

    // 请求数据生成模板
    function getProductList() {
        $.ajax({
            url: '/product/queryProduct',
            data: obj,
            success: function (data) {
                var html = template('productTpl', data)
                $('.mui-card-content .mui-row').html(html)
            }
        })
    }


    // 获取url中的关键字
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})