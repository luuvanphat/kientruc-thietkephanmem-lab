package iuh.fit.eventdrivenarchitecturemovie.model;

public class Movie {
    private String id;
    private String title;
    private String genre;
    private Double ticketPrice;


    public Movie() {}
    public Movie(String id, String title, String genre, Double ticketPrice) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.ticketPrice = ticketPrice;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
