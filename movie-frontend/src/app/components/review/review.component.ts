import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HttpService, PostReviewRequest } from 'src/app/services/http.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
   review = new FormControl('', Validators.required)


  constructor(private activatedRoute : ActivatedRoute, public movieService:MovieService, private httpService : HttpService){
   
    const imdbId = this.activatedRoute.snapshot.paramMap.get('imdbId');
    if(imdbId){
      this.movieService.getMovie(imdbId);
    }
   
  }
  onSubmitReview() {
    if (this.review.invalid) {
      return;
    }
    const review: PostReviewRequest = {
      imdbId: this.movieService.selectedMovie()?.imdbId!,
      reviewBody: this.review.value!,
    };
    this.httpService
      .postReview(review)
      .pipe(
        switchMap(() => {
          return this.httpService.getMovies();
        })
      )
      .subscribe((movies) => {
        this.movieService.movies.set(movies);
      });
  }
}
