import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  movieApi = '/api/v1/movies'
  reviewApi = '/api/v1/reviews';

  constructor(private httpClient : HttpClient) { }

  getMovies(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(this.movieApi);
  }
  getMovieByImdbId(imdbId: string) {
    return this.httpClient.get<Movie>(this.movieApi + '/' + imdbId);
  }
  postReview(review:PostReviewRequest){
    return this.httpClient.post(this.reviewApi,review);
  }

}

export interface PostReviewRequest{
  imdbId : string;
  reviewBody : string;
}
