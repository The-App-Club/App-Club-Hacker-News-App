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
  // const { data } = await fetch({ path: `v0/${"best"}stories` });
  const { data } = await fetch({ path: `v0/${"ask"}stories` });
  // const { data } = await fetch({ path: `v0/${"show"}stories` });
  // const { data } = await fetch({ path: `v0/${"new"}stories` });
  // const { data } = await fetch({ path: `v0/${"top"}stories` });
  // const { data } = await fetch({ path: `v0/${"job"}stories` });
  const {
    data: detailData,
    start,
    end,
  } = await fetchItemDetailList({ itemIdList: data, start: 8, end: 11 });
  const notifyInfoList = detailData.map((itemInfo) => {
    const cachedData = itemInfo.data;
    return Object.assign(cachedData, {
      time: formatTime({ time: cachedData.time }),
    });
  });

  let bebopItemInfoList = [];
  for (let index = 0; index < notifyInfoList.length; index++) {
    const notifyInfo = notifyInfoList[index];
    const itemInfoList = await getItemInfoList({
      itemIdList: notifyInfo.kids || [],
      resultInfoList: [].concat(normarizeData({ itemInfo: notifyInfo })),
    });
    const niceItemInfoList = doFormatItemInfoList({ itemInfoList })
      .flat()
      .filter((itemInfo) => {
        return itemInfo;
      });
    bebopItemInfoList = bebopItemInfoList.concat(...niceItemInfoList);
  }

  const cowboyItemInfoList = [...new Set(bebopItemInfoList)];

  console.log(JSON.stringify(cowboyItemInfoList));
  await tearDown();
})();
