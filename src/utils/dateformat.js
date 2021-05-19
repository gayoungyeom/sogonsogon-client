import dayjs from "dayjs";

const dateformat = date => {
  const formated = dayjs(date).format(`MM월 DD일`);
  return formated;
};

export default dateformat;
