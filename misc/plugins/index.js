import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, child, get } from "firebase/database";

dayjs.extend(utc);

const firebaseApp = initializeApp({
  /* config */
});

const db = getDatabase(firebaseApp, "https://hacker-news.firebaseio.com");

const fetch = ({ path }) => {
  return new Promise((resolve, reject) => {
    try {
      const doRef = ref(db, path);
      onValue(
        doRef,
        (snapshot) => {
          const data = snapshot.val();
          resolve({ data });
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const fetchItem = ({ itemId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await fetch({ path: `v0/item/${itemId}` });
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
};

const fetchItemDetailList = async ({ itemIdList, start, end }) => {
  end = Math.min(end, itemIdList.length);
  const resultInfoList = await Promise.all(
    itemIdList.map(async (itemId, index) => {
      const { data } = await fetchItem({ itemId });
      return { data };
    })
  );
  return { data: resultInfoList.slice(start - 1, end), start, end: end };
};

const formatTime = ({ time }) => {
  return dayjs(time * 1000)
    .utcOffset(9)
    .format("YYYY-MM-DD hh:mm:ss");
};

const tearDown = () => {
  return new Promise((resolve, reject) => {
    try {
      process.exit(0);
      resolve();
    } catch (error) {
      process.exit(1);
      reject(error);
    }
  });
};

const getItemInfoList2 = async ({ itemIdList, resultInfoList }) => {
  while (itemIdList.length > 0) {
    const { data, start, end } = await fetchItemDetailList({
      itemIdList,
      start: 1,
      end: itemIdList.length,
    });
    resultInfoList.push(data);
    itemIdList = data
      .map((itemInfo) => {
        if (itemInfo.data) {
          return itemInfo.data.kids;
        }
      })
      .filter((itemId) => {
        return itemId;
      })
      .flat();
  }
  return resultInfoList.flat();
};

const getItemInfoList = async ({ itemIdList, resultInfoList }) => {
  if (itemIdList.length === 0) {
    return resultInfoList.flat();
  }
  const { data, start, end } = await fetchItemDetailList({
    itemIdList,
    start: 1,
    end: itemIdList.length,
  });
  resultInfoList.push(data);
  return getItemInfoList({
    itemIdList: data
      .map((itemInfo) => {
        if (itemInfo.data) {
          return itemInfo.data.kids;
        }
      })
      .filter((itemId) => {
        return itemId;
      })
      .flat(),
    resultInfoList,
  });
};

const doFormatItemInfoList = ({ itemInfoList }) => {
  return itemInfoList.map((itemInfo) => {
    const { data } = { ...itemInfo };
    if (!data["parent"]) {
      Object.assign(data, { parent: null });
    }
    if (data["kids"]) {
      delete data["kids"];
    }
    if (!data["deleted"] && !data["dead"]) {
      return data;
    }
  });
};

const normarizeData = ({ itemInfo }) => {
  if (itemInfo["data"]) {
    return itemInfo;
  }
  return { data: itemInfo };
};

export {
  fetch,
  fetchItem,
  fetchItemDetailList,
  formatTime,
  tearDown,
  getItemInfoList,
  getItemInfoList2,
  doFormatItemInfoList,
  normarizeData,
};
