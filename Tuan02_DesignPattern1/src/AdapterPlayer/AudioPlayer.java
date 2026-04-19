package AdapterPlayer;

public class AudioPlayer implements MediaPlayer {
    private MediaAdapter adapter;

    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3: " + fileName);
        } else {
            adapter = new MediaAdapter(audioType);
            adapter.play(audioType, fileName);
        }
    }
}
