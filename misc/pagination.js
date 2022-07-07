import {
  fetch,
  fetchItem,
  fetchItemDetailList,
  formatTime,
  tearDown,
  getItemInfoList,
  doFormatItemInfoList,
  normarizeData,
} from "./plugins";

(async () => {
  const { data } = await fetch({ path: `v0/${"best"}stories` });
  // const { data } = await fetch({ path: `v0/${"ask"}stories` });
  // const { data } = await fetch({ path: `v0/${"show"}stories` });
  // const { data } = await fetch({ path: `v0/${"new"}stories` });
  // const { data } = await fetch({ path: `v0/${"top"}stories` });
  // const { data } = await fetch({ path: `v0/${"job"}stories` });
  const pageCount = 12;
  const dataCount = data.length;
  for (let index = 0; index < dataCount; index = index + pageCount) {
    const {
      data: detailData,
      start,
      end,
    } = await fetchItemDetailList({
      itemIdList: data,
      start: index + 1,
      end: index + pageCount,
    });
    const notifyInfoList = detailData.map((itemInfo) => {
      const cachedData = itemInfo.data;
      return Object.assign(cachedData, {
        time: formatTime({ time: cachedData.time }),
      });
    });
    console.log(notifyInfoList);
  }
  await tearDown();
})();
