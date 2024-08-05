```ts
interface AudioFormat {
    load(fileName: string): void;
    play(): void;
    pause(): void;
    stop(): void;
}

class MP3Format implements AudioFormat {
    load(fileName: string): void {
        console.log(`MP3 파일 로드: ${fileName}`);
    }
    play(): void {
        console.log("MP3 재생");
    }
    pause(): void {
        console.log("MP3 일시정지");
    }
    stop(): void {
        console.log("MP3 정지");
    }
}

class WAVFormat implements AudioFormat {
    load(fileName: string): void {
        console.log(`WAV 파일 로드: ${fileName}`);
    }
    play(): void {
        console.log("WAV 재생");
    }
    pause(): void {
        console.log("WAV 일시정지");
    }
    stop(): void {
        console.log("WAV 정지");
    }
}
```

오디오 포맷을 이용하는 브릿지 클래스

```ts
abstract class MusicPlayer {
    protected format: AudioFormat;

    constructor(format: AudioFormat) {
        this.format = format;
    }

    abstract playMusic(fileName: string): void;
    //...
}

```

포맷과 디바이스를 이어주면서 각자에게 책임을 맡김

```ts

class SmartphonePlayer extends MusicPlayer {
    playMusic(fileName: string): void {
        console.log("스마트폰: 음악 재생 시작");
        this.format.load(fileName);
        this.format.play();
    }
}

class DesktopPlayer extends MusicPlayer {
    playMusic(fileName: string): void {
        console.log("데스크탑: 음악 재생 시작");
        this.format.load(fileName);
        this.format.play();
    }

    autoPlay() {
        this.format.play();
    }
}
```

```ts
const mp3Format = new MP3Format();
const wavFormat = new WAVFormat();

const smartphone = new SmartphonePlayer(mp3Format);
smartphone.playMusic("audio.mp3");

const desktop = new DesktopPlayer(wavFormat);
desktop.playMusic("audio.wav");
```