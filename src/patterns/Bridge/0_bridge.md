# 브리지

잡한 시스템에서 추상화와 구현을 분리해야 할 때 유용

큰 클래스 또는 밀접하게 관련된 클래스들의 집합을 두 개의 개별 계층구조​(추상화 및 구현)​로 나눈 후 각각 독립적으로 개발할 수 있도록 함.


단순히 추상화의 개념같아 보이지만..

구현과, 추상화로 나누어 관점

![uml](https://journaldev.nyc3.cdn.digitaloceanspaces.com/2013/07/bridge-design-pattern.png)

카테고리로 나누어 추상화 하고, 이를 '포함' 한다는 개념

각 카테고리를 독립적으로 개발할 수 있다는 장점


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

abstract class MusicPlayer {
    protected format: AudioFormat;

    constructor(format: AudioFormat) {
        this.format = format;
    }

    abstract playMusic(fileName: string): void;
    //...
}

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

const mp3Format = new MP3Format();
const wavFormat = new WAVFormat();

const smartphone = new SmartphonePlayer(mp3Format);
smartphone.playMusic("audio.mp3");

const desktop = new DesktopPlayer(wavFormat);
desktop.playMusic("audio.wav");
```
