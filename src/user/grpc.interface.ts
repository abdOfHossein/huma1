import { Observable } from 'rxjs';

export interface IGrpcService {
  findOne(id: IId): Observable<any>;
  findAll(requestFindAll: any): Promise<Array<any>| object>;
  addUser(userInfo: IUserInfo): Observable<any>;
  updateUser(reqBodyUpdateUSer: IReqBodyUpdateUSer): Promise<any>;
  deleteUser(id: IId): Promise<any>;
}

interface IUserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

interface IId {
  id: number;
}

interface IReqBodyUpdateUSer {
  id: number;
  info: IUserInfo;
}
