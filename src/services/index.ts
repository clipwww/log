import { ResultListGenericVM } from '@/view-models';

export const requestGET = <T>(url: string): Promise<ResultListGenericVM<T>> => {
  return new Promise((resolve, reject) => {

    const xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        // const percentComplete = e.loaded / e.total;
        // console.log(`${percentComplete * 100}%`)
      }
    });
    xmlHttpReq.addEventListener("load", () => {
      return resolve(JSON.parse(xmlHttpReq.response))
    });
    xmlHttpReq.addEventListener("error", (e) => reject(e));
    xmlHttpReq.addEventListener("abort", (e) => reject(e));
    xmlHttpReq.open("GET", url);
    xmlHttpReq.send();
  })
}