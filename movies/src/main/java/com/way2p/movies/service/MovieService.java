package com.way2p.movies.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.way2p.movies.models.Movie;
import com.way2p.movies.repository.MovieRepository;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository movieRepository;
	
	public List<Movie> allMovies(){
		return movieRepository.findAll();
	}
	
	public Optional<Movie> getMovieByImdbId(String imdbId) {
		return movieRepository.findMovieByImdbId(imdbId);
	}
	
}
