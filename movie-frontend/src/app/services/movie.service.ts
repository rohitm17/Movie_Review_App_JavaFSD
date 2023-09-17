import { Injectable, WritableSignal, signal , computed, Signal} from '@angular/core';
import { Movie } from '../models/movie';
import { HttpService } from './http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies :WritableSignal<Movie[]>=signal([]);
  
  selectedMovie :WritableSignal<Movie | null> = signal(this.defaultMovie());

  embeddedTrailerLink :Signal<SafeResourceUrl | null> = computed(()=>{
    if(this.selectedMovie()){
      const videoId = this.getTheVideoId(this.selectedMovie()!?.trailerLink)
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0`);
      
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('');

  });

 
  constructor( private httpService : HttpService, private sanitizer : DomSanitizer) { }

  defaultMovie():Movie{
    return {
      backdrops:[],
      genres:[],
      imdbId:"",
      poster:'',
      releaseDate:'',
      reviewIds:[],
      title:'',
      trailerLink:"",
    };
  }

  getMovies(){
    this.httpService.getMovies().subscribe((data) => {
      this.movies.set(data);
    });
  }
  getMovie(imdbId: string) {
    this.httpService.getMovieByImdbId(imdbId).subscribe((movie: Movie) => {
      this.selectedMovie.set(movie);
    });
  }
  getTheVideoId(url:string){
    return url.substring( url.indexOf("?v=")+3);
  }
}
