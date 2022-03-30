export const objectMap =  (object:{[key:string]:any[]},mapFunction:Function)=>{
    let listmap:any[] = Object.keys(object).map((objkey:string,j:number,u:string[])=>mapFunction(object[objkey],j,u))
    let objToReturn:{[key:string]:Object} = {}
    let keys:string[] = Object.keys(object)
    for(let i =0;i<listmap.length;i++){
        objToReturn[keys[i]] = listmap[i]
    }
    return objToReturn;
}