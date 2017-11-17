$("#btn_delete")
    .click(function () {
        var ids = [];
        $(".selected").each(function () {
            var td = $(this).children("td");
            var input = $(td[0]).children("input")[0];
            if (input.checked === true) {
                var id = $(td[1]).text();
                ids.push(id);
            }
        });
        var options = {
            type: 'post',
            url: './master/delete',
            data: {
                "ids": ids
            },
            dataType: 'json',
            success: function (res) {
                alert("删除成功!");
                location.reload(true);
            },
            error: function (xhr, type, err) {
                alert("删除失败,请重试.");
            }
        }
        $.ajax(options)
    });