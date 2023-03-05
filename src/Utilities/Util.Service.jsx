import moment from "moment";

function convertDateToOurFormat(date) {
  if (!date) {
    return null;
  }
  return moment(date).format("MMMM Do YYYY,h:mm a");
}
export const utilService = {
  convertDateToOurFormat,
};
