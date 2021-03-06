public class Note {

    private int id;
    private long date;
    private String title;
    private String  content;
    private Boolean archived;
    private String imageUrl;

    public Note() {  }


    public Note(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public Note(long date, String title, String content) {
        this.date = date;
        this.title = title;
        this.content = content;
    }

    public Note(int id, long date, String title, String content, Boolean archived) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.content = content;
        this.archived = archived;
    }

    public Note(int id, long date, String title, String content, Boolean archived, String imageUrl) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.content = content;
        this.archived = archived;
        this.imageUrl = imageUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", date=" + date +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", archived=" + archived +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
