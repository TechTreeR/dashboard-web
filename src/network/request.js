import axios from "axios";

export function request(config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://101.35.20.193:8081/",
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
