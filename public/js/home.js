$(document).ready(function () {
    const user = $.get('/api/user_data').then(function (data) {
        return data;
    });
});