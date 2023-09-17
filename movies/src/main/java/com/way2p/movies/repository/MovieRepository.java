package com.way2p.movies.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.way2p.movies.models.Movie;

@Repository
public interface MovieRepository extends MongoRepository<Movie	,ObjectId> {
	
	Optional<Movie> findMovieByImdbId(String imdbId);
}
