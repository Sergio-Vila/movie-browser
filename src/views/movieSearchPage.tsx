
import React = require('react');
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Actor from "../models/Actor";
import Movie from "../models/Movie";
import TMDbConnector from "../models/TMDbConnector";

import MovieCard from "./movieCard";
import SearchBox from "./searchBox";
import MovieInfo from "./movieInfo";

interface MovieSearchPageProps {
    tmdbConnector: TMDbConnector
};

interface MovieSearchPageState {
    movies: Movie[],
    userInput: string,
    selectedMovie: Movie | null,
    selectedMovieCasting: Promise<Actor[]> | null,
    pagesLoaded: number,
    totalPages: number
};


export default class MovieSearchPage extends React.Component<MovieSearchPageProps, MovieSearchPageState> {

    state: MovieSearchPageState;

    constructor(props: MovieSearchPageProps) {
        super(props);

        this.state = {
            movies: [],
            userInput: "",
            selectedMovie: null,
            selectedMovieCasting: null,
            pagesLoaded: 0,
            totalPages: 0
        };
    };

    searchFor = async (text: string) => {
        const searchResult = await this.props.tmdbConnector.search(text);
        this.setState({
            userInput: text,
            movies: searchResult.results,
            selectedMovie: null,
            pagesLoaded: 1,
            totalPages: searchResult.totalPages
        });
    };

    loadMoreResults = async () => {
        const searchResult = await this.props.tmdbConnector.search(this.state.userInput, this.state.pagesLoaded);
        this.setState({
            movies: this.state.movies.concat(searchResult.results),
            pagesLoaded: this.state.pagesLoaded + 1
        });
    };

    selectMovie = async (movie: Movie) => {
        this.setState({
            selectedMovie: movie,
            selectedMovieCasting: this.props.tmdbConnector.getMovieCasting(movie).then(r => r.results)
        });
    };

    render () {
        let pageContent: JSX.Element;
        let loadMoreButton: JSX.Element;

        if (this.state.pagesLoaded < this.state.totalPages) {
            loadMoreButton =
                <Box pt={4}>
                    <Button variant="outlined" onClick={this.loadMoreResults}>
                        Load more results
                    </Button>
                </Box>;
        } else {
            loadMoreButton = <></>;
        }

        if (this.state.selectedMovie) {
            pageContent = 
                <MovieInfo
                    movie={this.state.selectedMovie}
                    casting={this.state.selectedMovieCasting}
                    onBackButtonClick={() => this.setState({
                        selectedMovie: null
                    })}
                />;
        } else {
            pageContent = 
                <>
                    <Grid container spacing={4}>
                    {this.state.movies.map((movie, index) => 
                        <Grid item md={4} key={index}>
                            <MovieCard movie={movie} onMovieClick={this.selectMovie} />
                        </Grid>
                    )}
                    </Grid>
                    {loadMoreButton}
                </>
                ;
        }

        return (
            <div>
                <SearchBox onSearch={this.searchFor} userInput={this.state.userInput} />
                <Box pt={4}>{ pageContent }</Box>
            </div>
        );
    };
};
