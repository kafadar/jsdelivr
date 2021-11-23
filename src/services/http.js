import axios from "axios";

const [npmJs, jsDelivr] = [
  axios.create({
    baseURL: "https://registry.npmjs.org/",
  }),
  axios.create({
    baseURL: "https://data.jsdelivr.com/v1/",
  }),
];

export default {
  /**
   * Search package by text
   * @param text
   * @param size
   * @param from
   * @returns {Promise<AxiosResponse<any>>}
   */
  searchPackageByText: function (text, size = 10, from = 0) {
    return npmJs.get("-/v1/search", { params: { text, size, from } });
  },
  getPackageInfo: function (packageName) {
    return npmJs.get(packageName);
  },
  getPackageVersions: function (packageName) {
    return jsDelivr.get(`package/npm/${packageName}`);
  },
  getPackageStats: function (packageName) {
    return jsDelivr.get(`package/npm/${packageName}/stats`);
  },
  getMostPopularPackages: function () {
    return jsDelivr.get("https://data.jsdelivr.com/v1/stats/packages");
  },
};
