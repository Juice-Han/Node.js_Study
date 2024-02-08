// const DB = [];

// function saveDB(user){
//     const oldDBSize = DB.length;
//     DB.push(user);
//     console.log(`save ${user.name} to DB`);
//     return new Promise((resolve, reject) => {
//         if(DB.length > oldDBSize){
//             resolve(user);
//         }else{
//             reject(new Error("Save DB Error!"));
//         }
//     });
// }

// function sendEmail(user){
//     console.log(`email to ${user.email}`);
//     return new Promise((resolve) => {
//         resolve(user);
//     });
// }

// function getResult(user){
//     return new Promise((resolve, reject) => {
//         resolve(`success register ${user.name}`);
//     });
// }

// function registerByPromise(user){
//     const result = saveDB(user).then(sendEmail).then(getResult);
//     console.log(result);
//     return result;
// }

// const myUser = {email : 'juhan@test.com', password : '1234', name : 'juhan'};
// const result = registerByPromise(myUser);
// result.then(console.log);

function add(a,b){
    return new Promise((resolve,reject) => {
        if(a < 3) resolve(a+b);
        else reject(new Error('a가 너무 큽니다!'));
    })
}

function mul(a){
    return new Promise((resolve) => {
        resolve(a*4)
    })
}
function solution(){
    const result = add(5,4).then(mul).then(console.log).catch(e=> new Error(e));
    console.log(result);
    return result;    
}
const result = solution();
result.then(console.log)