
export class Card{
    ccNum:string = "";
    ccCVV:string = "";
    ccExp: string= "";
}

export class User{
<<<<<<< HEAD
    _id:any = { $oid: "" };
=======
    match:boolean;
    id:string = "";
>>>>>>> master
    displayName:string = '';
    username:string = '';
    password:string = '';
    level:number = 2;
    cart:string[] = [];
    billing:Card = new Card();
    isAdmin:Boolean = false;
    
}