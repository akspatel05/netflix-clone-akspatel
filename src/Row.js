import React,{useState, useEffect} from 'react';
import axios from './axios';
import './Row.css'
import Youtube from 'react-youtube'
const movieTrailer =require('movie-trailer')

const base_url = "https://image.tmdb.org/t/p/original/";


const Row = ({title,fetchUrl,isLargeRow}) => {
    const [movies,setMovies]= useState([]);
    const [trailerUrl, setTrailerUrl] =useState("")

    // A snippet of code which runs on some specific conditions
    useEffect(() => {
        
        async function fetchData() {
            const request=await axios.get(fetchUrl);
           setMovies(request.data.results);
            return request;
        }
        fetchData();
        //run once when row loads and dont run again
    }, [fetchUrl]);

    const opts= {
        height:"390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          movieTrailer(movie?.title|| movie?.name || movie?.orginal_name || "")
            .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            // console.log(url);
            })
            .catch((e) => console.log(e));
        }
      };


    
    return (
        <div className="row">
            <h2>{title}</h2>
        <div className="row__posters">
            {/* row posters*/}
            {movies.map( (movie) => (
                <img 
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${isLargeRow? movie.poster_path: movie.backdrop_path}`} alt={movie.name}></img>
            ))}
        </div>
           {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
