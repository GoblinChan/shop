$(function () {
    // 登陆模块实现
    $('.btn-login').on('tap', function () {
        var username = $('.mui-input-clear').val().trim();
        if (!username) {
            mui.toast('请输入合法用户名', {
                duration: 'short',
                type: 'div'
            })
            return false
        }
        var password = $('.mui-input-password').val().trim();
        if (!password) {
            mui.toast('请输入密码', {
                duration: 'short',
                type: 'div'
            })

            return false
        }
    })
})