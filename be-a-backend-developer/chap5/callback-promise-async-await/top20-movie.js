const axios = require('axios').default;
const url = 'https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json';

/* axios.get(url)
    .then((result) => {
        if (result.status !== 200) {
            throw new Error('요청 실패')
        }
        if (result.data) {
            return result.data;
        }
    })
    .then((data) => {
        if (!data.articleList || data.articleList.length === 0) {
            throw new Error('데이터 없음');
        }
        return data.articleList;
    })
    .then((articles) => {
        return articles.map((article, idx) => {
            return { title: article.title, rank: idx + 1 };
        });
    })
    .then((results) => {
        for (let movieInfo of results) {
            console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
        }
    })
    .catch((err) => {
        console.log('<<에러 발생>>');
        console.error(err);
    }); */

//async await을 사용해서 비동기작업을 처리할 수 있고, 콜백 함수나 then()을 사용했을 때보다 가독성이 좋게 만들 수 있다.
async function movieRanking(){
    try{
        const result = await axios.get(url);
        if(result.status !== 200) new Error('요청 실패');
        if(!result.data.articleList || result.data.articleList.length === 0) new Error('데이터 없음');
        const articleList = result.data.articleList.map((article, idx) => {
            return {title : article.title, rank : idx + 1};
        })
        for(let movieInfo of articleList){
            console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
        }
    }catch(e){
        console.error(e);
    }
}
movieRanking();