package iuh.fit.eventdrivenarchitecturemovie.controller;

import iuh.fit.eventdrivenarchitecturemovie.model.Movie;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private List<Movie> movies = new ArrayList<>();
    public MovieController() {
        movies.add(new Movie(UUID.randomUUID().toString(), "Avengers: Endgame", "Hành động / Viễn tưởng", 85000.0));
        movies.add(new Movie(UUID.randomUUID().toString(), "Mai", "Tâm lý / Tình cảm", 90000.0));
        movies.add(new Movie(UUID.randomUUID().toString(), "Dune: Hành Tinh Cát - Phần 2", "Khoa học viễn tưởng", 110000.0));
        movies.add(new Movie(UUID.randomUUID().toString(), "Kung Fu Panda 4", "Hoạt hình / Hài hước", 75000.0));
        movies.add(new Movie(UUID.randomUUID().toString(), "Godzilla x Kong: Đế Chế Mới", "Hành động / Quái vật", 95000.0));
    }
    // API 1: Xem danh sách phim
    @GetMapping
    public List<Movie> getAllMovies() {
        return movies;
    }

    // API 2: Thêm phim mới
    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        movie.setId(UUID.randomUUID().toString()); // Tự động tạo ID
        movies.add(movie);
        return movie;
    }

    // API 3: Sửa phim
    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable String id, @RequestBody Movie updatedMovie) {
        for (Movie m : movies) {
            if (m.getId().equals(id)) {
                m.setTitle(updatedMovie.getTitle());
                m.setGenre(updatedMovie.getGenre());
                m.setTicketPrice(updatedMovie.getTicketPrice());
                return m;
            }
        }
        throw new RuntimeException("Không tìm thấy phim với ID: " + id);
    }
}
