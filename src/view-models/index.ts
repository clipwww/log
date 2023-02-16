export interface MovieRecordVM {
  date: Date;
  title: string;
  cost: number;
  tickets: number;
  area: string;
  theater: string;
  version: string;
  memo: string;
}

export interface MiSportLogVM {
  id: string;
  type: number;
  startTime: Date;
  sportTime: number;
  distance: number;
  maxpace: number;
  minpace: number;
  avgpace: number;
  calories: number;
}

export interface MiActivityLogVM {
  id: string;
  date: Date;
  steps: number;
  distance: number;
  rundistance: number;
  calories: number;
}


export enum ResultCode {
  success = '200',
  clientError = '400',
  forbidden = '403',
  serverError = '500',
}

export interface ResultVM {
  success: boolean;
  resultCode: string;
  resultException: string;
  resultMessage: string;
}


export interface ResultGenericVM<T> extends ResultVM {
  item: T;
}

export interface ResultListGenericVM<T> extends ResultVM {
  items: T[];
  page?: {
    index: number;
    size: number;
    amount: number;
    pageAmount: number;
  }
}
