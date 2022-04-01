import axios from "axios";

export function request(config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL:
      "https://www.fastmock.site/mock/3a802ca79a55def9dd516f721be7f948/dashboard",
    timeout: 5000,
  });

  //发送真正的网络请求
  instance(config)
    .then((res) => {
      success(res);
    })
    .catch((err) => {
      failure(err);
    });
}
