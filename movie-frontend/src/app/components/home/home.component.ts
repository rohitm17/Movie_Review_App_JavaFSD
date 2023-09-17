import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

	paused = false;
	faPlayCircle = faPlayCircle;
	pauseOnHover = true;
	pauseOnFocus = true;

  constructor(public  movieService : MovieService, private router:Router){
    this.movieService.getMovies();
  }

  handlePlayButton( imdbId:String){
    this.router.navigate(['/trailer',imdbId]);
  }
  handleReviewButton( imdbId:String){
    this.router.navigate(['/review',imdbId]);
  }
}
