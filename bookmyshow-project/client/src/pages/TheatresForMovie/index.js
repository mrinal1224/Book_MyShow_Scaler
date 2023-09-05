import React, { useEffect , useState } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies, GetMovieById } from "../../apicalls/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { GetAllTheatresByMovie } from "../../apicalls/theatres";

function TheatresForMovie() {
  // get date from query string
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );

  const [isHovering, setIsHovering] = useState(false);

 

  const [movie, setMovie] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByMovie({ date, movie: params.id });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleMouseEnter = (id) => {
    setIsHovering(true);
  };

  const handleMouseLeave = (id) => {
    setIsHovering(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTheatres();
  }, [date]);
  return (
    movie && (
      <div>
        {/* movie information */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl uppercase">
              {movie.title} ({movie.language})
            </h1>
            <h1 className="text-md">Duration : {movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date : {moment(movie.releaseDate).format("MMM Do yyyy")}
            </h1>
            <h1 className="text-md">Genre : {movie.genre}</h1>
          </div>

          <div className="mr-3">
            <h1 className="text-md ">Select Date</h1>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            
            />
          </div>
        </div>

        <hr />

        {/* movie theatres */}
        <div className="mt-1">
          <h1 className="text-xl uppercase">Theatres</h1>
        </div>

        <div className="mt-1 flex flex-col gap-1">
          {theatres.map((theatre) => (
            <div className="card p-2">
              <h1 className="text-md uppercase">{theatre.name}</h1>
              <h1 className="text-sm">Address : {theatre.address}</h1>

              <div className="divider"></div>

              <div className="flex gap-2">
                {theatre.shows
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <div key={show._id} style={{
                      backgroundColor: isHovering ? '#DF1827' : 'white',
                      color: isHovering ? 'white' : '#DF1827',
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                      className="card p-1 cursor-pointer border-primary"
                      onClick={() => {
                        navigate(`/book-show/${show._id}`);
                      }}
                    >
                      <h1 className="text-sm">
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default TheatresForMovie;