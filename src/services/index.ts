import type { ResultListGenericVM } from '@/view-models'

export function requestGET<T>(type: string): Promise<ResultListGenericVM<T>> {
  return new Promise((resolve, reject) => {
    const xmlHttpReq = new XMLHttpRequest()
    xmlHttpReq.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        // const percentComplete = e.loaded / e.total;
        // console.log(`${percentComplete * 100}%`)
      }
    })
    xmlHttpReq.addEventListener('load', () => {
      return resolve(JSON.parse(xmlHttpReq.response))
    })
    xmlHttpReq.addEventListener('error', e => reject(e))
    xmlHttpReq.addEventListener('abort', e => reject(e))
    xmlHttpReq.open('GET', `https://mechakucha-api-clipwww.vercel.app/my-log/${type}`)
    xmlHttpReq.send()
  })
}
