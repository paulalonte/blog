import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPost } from './post';

@Injectable({
    providedIn: 'root'
})

export class PostService {

    // databaseUrl = 'https://quizme-7b60e.firebaseio.com/posts.json';
    databaseUrl = 'https://quizme-7b60e.firebaseio.com/contents.json';

    constructor(private http: HttpClient) {}

    postData(obj: IPost) {
        const dataObj = obj;
        console.log(dataObj);
        return this.http.post(this.databaseUrl, dataObj);
    }

    fetchData() {
        return this.http.get(this.databaseUrl).pipe(
        map(responseData => {
            const postArray: IPost[] = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    postArray.push({...responseData[key], id: key });
                }
            }
            return postArray;
        }));
    }

    clearPosts() {
        console.log('delete posts');
        // const deleteId = '-M9UAKxyjhikmJcCkq8n';
        // const endPoints = '/posts/' + deleteId;
        return this.http.delete(
        this.databaseUrl,
        {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
            })
        });
    }
}
