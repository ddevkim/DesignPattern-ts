interface Player {
    play(song: string): void;
}

class SmartphoneMP3Player implements Player {
    play(song: string): void {
        console.log(`스마트폰에서 MP3 파일 재생: ${song}`);
    }
}

class SmartphoneWAVPlayer implements Player{
    play(song: string): void {
        console.log(`스마트폰에서 WAV 파일 재생: ${song}`);
    }
}

class TabletMP3Player implements Player{
    play(song: string): void {
        console.log(`태블릿에서 MP3 파일 재생: ${song}`);
    }
}

class TabletWAVPlayer implements Player{
    play(song: string): void {
        console.log(`태블릿에서 WAV 파일 재생: ${song}`);
    }
}

// 오디오 파일 타입과 디바이스에 따라 모두 구현함.
// 새 파일 타입 혹은 디바이스 등장에 따라 반복되는 구현필요.
// like) Decorator 패턴의 bad case

