// 转链: https://www.laijiawen.com/posts/strategy-pattern-and-its-application
// <form action="" id="registerForm" method="post">
//   请输入用户名: <input type="text" name="userName"><br>
//   请输入密码: <input type="password" name="password"><br>
//   请输入手机号码: <input type="phone" name="phoneNumber"><br>
//   <input type="submit">
// </form>
// ----------假设效果为:
// registerForm.onsubmit = () => {
//   let errorMessage = validate();
//   if (errprMessage) {
//     alert(errorMessage);
//     return false;
//   }
//   ...
// };

// use
let registerForm = document.getElementById("registerForm");
const Rules = {
  longerThan6: val => val && val.length >= 6,
  isPhone: val => val && /(^1[3|5|8][0-9]{9}$)/.test(val),
  notEmpty: val => val && val.length != 0
};
let { longerThan6, isPhone, notEmpty } = Rules;

// ----------validate()函数负责创建一个Validator，添加相应的规则，并执行校验
let validate = () => {
  let validator = new Validator();

  // 一次添加多个规则
  validator.add(registerForm.userName, [
    {
      validateFunc: val => val.length >= 6,
      errorMessage: "用户名长度不可小于六位"
    },
    { validateFunc: notEmpty, message: "用户名不能为空" }
  ]);

  // 一次添加单个规则
  validator.add(registerForm.password, longerThan6, "密码长度必须大于6位");
  validator.add(registerForm.phoneNumber, isPhone, "电话号码格式错误");

  // 开始校验，成功则返回false，失败则返回对应的errorMessage。
  return validator.start();
};

registerForm.onsubmit = () => {
  let errorMessage = validate();
  if (errorMessage) {
    alert(errorMessage);
    return false;
  }
};

// Validator类的实现
class Validator {
  constructor() {
    this.rules = [];
  }

  add(inputElement, rules, errorMessage) {
    let val = inputElement.value;

    // 如果第二个参数是函数，那就是用于验证的函数咯。
    if (typeof rules === "function") {
      let validateFunc = rules; // 没啥意义的赋值，为了你更好的理解。

      this.rules.push({
        value: val,
        validateFunc: validateFunc,
        errorMessage: errorMessage
      });
      return;
    }

    // 如果第二个参数是数组，那就是一组规则，忽略第三个参数。
    if (Array.isArray(rules)) {
      for (let rule of rules) {
        this.rules.push({
          value: val,
          validateFunc: rule.validateFunc,
          errorMessage: rule.errorMessage
        });
      }
      return;
    }
  }

  start() {
    for (let rule of this.rules) {
      let { value, validateFunc, errorMessage } = rule;
      if (!validateFunc(value)) {
        return errorMessage;
      }
    }
    // 验证通过。
    return false;
  }
}
