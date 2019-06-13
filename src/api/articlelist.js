import axios from 'axios'


export const GetArticle=(f,t)=>{
    return axios.post('/users/article',{fromNum:f,toNum:t});
}

export const GetArticleNum=()=>{
    return axios.get('/users/articleNum');
}

export const AddReadNum=(i)=>{
    return axios.post('/users/addReadNum',{id:i});
}

export const AddLoveNum=(i)=>{
    return axios.post('/users/addLoveNum',{id:i});
}
