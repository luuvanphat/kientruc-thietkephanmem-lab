package AdapterPlayer;

public class MediaAdapter implements MediaPlayer {
    private Mp4Player mp4Player;
    private VlcPlayer vlcPlayer;

    public MediaAdapter(String audioType) {
        if (audioType.equalsIgnoreCase("mp4")) {
            mp4Player = new Mp4Player();
        } else if (audioType.equalsIgnoreCase("vlc")) {
            vlcPlayer = new VlcPlayer();
        }
    }

    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("mp4")) {
            mp4Player.playMp4(fileName);
        } else if (audioType.equalsIgnoreCase("vlc")) {
            vlcPlayer.playVlc(fileName);
        }
    }
}
