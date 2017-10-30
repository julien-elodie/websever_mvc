var jumpToHome = () => {
  var form = document.createElement("form");
  form.id = "form";
  form.name = "form";
  document.body.appendChild(form);
  var input = document.createElement("input");
  input.type = "text";
  input.name = "username";
  input.value = $(".username").val();
  form.appendChild(input);
  form.method = "get";
  form.action = "../home";
  form.submit();
  document.body.removeChild(form);
};

var handler = captchaObj => {
  captchaObj.onReady(() => {}).onSuccess(() => {
    var result = captchaObj.getValidate();
    if (!result) {
      return alert("请完成验证");
    }
    var options = {
      url: "../login/validate",
      type: "POST",
      dataType: "json",
      data: {
        username: $("#username").val(),
        password: $("#password").val(),
        geetest_challenge: result.geetest_challenge,
        geetest_validate: result.geetest_validate,
        geetest_seccode: result.geetest_seccode
      },
      success: data => {
        if (data.status === "success") {
          alert("登录成功");
          jumpToHome();
        } else {
          alert("登录失败,请完成验证");
          captchaObj.reset();
        }
      }
    };
    $.ajax(options);
  });
  $("#submit").click(() => {
    if ($("#username").val() != "" && $("#password").val() != "") {
      captchaObj.verify();
    }
  });
};

options = {
  url: "../login/validate?t=" + new Date().getTime(),
  type: "get",
  dataType: "json",
  success: data => {
    initGeetest(
      {
        gt: data.gt,
        challenge: data.challenge,
        offline: !data.success,
        new_captcha: data.new_captcha,

        product: "bind",
        width: "300px"
      },
      handler
    );
  }
};
$.ajax(options);
