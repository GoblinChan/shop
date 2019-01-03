$(function () {
    $('.btn-search').on('click', function () {
        var search = $('.input-search').val().trim();
        // console.log(search);
        // 判断用户是否输入空白字符
        if (search == "") {
            mui.toast('请勿输入空白字符');
        } else {
            var arr = localStorage.getItem('historyData1');
            arr = JSON.parse(arr) || [];
            // 判断有无重复
            if (arr.indexOf(search) != -1) {
                arr.splice(arr.indexOf(search), 1);
            }
            // 添加到localStorage
            arr.unshift(search);
            arr = JSON.stringify(arr);
            localStorage.setItem('historyData1', arr)
            queryHistory()
            console.log($('.input-search'));
            $('.input-search')[0].value = "";
        }
    })
    queryHistory()

    function queryHistory() {
        var arr = localStorage.getItem('historyData1');
        arr = JSON.parse(arr) || [];
        var html = template('historyTpl', {
            rows: arr
        })
        $('.mui-table-view').html(html);
    }

    // 清除所有记录
    $('.btn-clear').on('click', function () {
        localStorage.removeItem('historyData1')
        queryHistory()
    })

    // 清除单个记录
    $('.mui-table-view').on('tap', 'li > span', function () {
        var index = $(this).data('index');
        var arr = localStorage.getItem('historyData1');
        arr = JSON.parse(arr);
        arr.splice(index, 1);
        arr = JSON.stringify(arr);
        localStorage.setItem('historyData1', arr);
        queryHistory()
    })
    // 点击自动填写输入框
    $('.mui-table-view').on('tap', 'li', function () {
        var str = this.innerText;
        $('.input-search')[0].value = str;
    })
})