import { Observable } from 'rxjs';

export interface IGrpcService {
  findOne({id: number}): Observable<any>;

  addUser(userInfo: IUserInfo): Observable<any>;
}

interface IUserInfo {

  firstName: string;
  lastName: string;
  phoneNumber: number;
}
