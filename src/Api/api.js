
import axios from "axios";
var url = window.url
var fileUrl = window.fileUrl
export const preImg=`${fileUrl}filemodule/showFile/getShow`




const dataUrl = {
    collect:`${url}indexpage/getLibraryTotleCount`, //馆藏总数
    borrow:`${url}indexpage/getNowMonthBorrowCount`, //借阅排行
    borrowCount:`${url}indexpage/getBorrowCount`, //借阅总数
    arrive:`${url}indexpage/getInoutCount`, // 到馆总数
    search:`${url}indexpage/getReferrBook`,
}

export let dataInt = {
    collect:collectInt,
    borrow:borrowInt,
    borrowTotal:borrowCountInt,
    arrive:arriveInt,
    search:dataSearch
}
export function dataSearch() {
    return axios.get(dataUrl.search).then((res) =>{
         return Promise.resolve(res)
     })
 }
function getInt(url,value){
    return axios.get(url,value).then((res)=>{
        return Promise.resolve(res)
    })
}

function collectInt(){
    return axios.get(dataUrl.collect).then((res)=>{
        return Promise.resolve(res)
    })
}

function borrowInt(){
    return axios.get(dataUrl.borrow).then((res)=>{
        return Promise.resolve(res)
    })
}

function borrowCountInt(){
    return axios.get(dataUrl.borrowCount).then((res)=>{
        return Promise.resolve(res)
    })
}
 function arriveInt(){
    return axios.get(dataUrl.arrive).then((res)=>{
        return Promise.resolve(res)
    })
 }