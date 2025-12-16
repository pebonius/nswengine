import { clamp } from "./utilities.js";

export default class SoundManager {
  constructor() {
    this.sfxVolume = 0.5;
    this.musicVolume = 0.5;
    this.currentMusic = null;
  }
  get currentMusic() {
    return this._currentMusic;
  }
  set currentMusic(value) {
    this._currentMusic = value;
  }
  get isCurrentMusicLooped() {
    return this._currentMusic.loop;
  }
  set isCurrentMusicLooped(value) {
    if (value !== true && value !== false) {
      throw new TypeError("currentMusicLoop must be a bool");
    }
    this._currentMusic.loop = value;
  }
  get currentMusicVolume() {
    return this._currentMusic.volume;
  }
  set currentMusicVolume(value) {
    this._currentMusic.volume = clamp(value, 0, 1);
  }
  get sfxVolume() {
    return this._sfxVolume;
  }
  set sfxVolume(value) {
    this._sfxVolume = clamp(value, 0, 1);
  }
  get musicVolume() {
    return this._musicVolume;
  }
  set musicVolume(value) {
    this._musicVolume = clamp(value, 0, 1);
  }
  playSoundEffect(audio, volumeAdjust) {
    if (!(audio instanceof HTMLAudioElement)) {
      throw new TypeError(`audio must be a HTMLAudioElement`);
    }

    if (audio.src === "") {
      throw new Error("audio src was empty");
    }

    const sound = new Audio();
    sound.src = audio.src;
    sound.volume = clamp(this.sfxVolume + volumeAdjust, 0, 1);
    this.playAudio(sound);
  }
  playMusic(audio, loop) {
    if (!(audio instanceof HTMLAudioElement)) {
      throw new TypeError(`audio must be a HTMLAudioElement`);
    }

    if (typeof loop != "boolean") {
      throw new TypeError(`loop must be a bool`);
    }

    if (this.currentMusic == null) {
      this.#startMusic(audio, loop);
      return;
    }

    if (this.currentMusic != null && audio.src != this.currentMusic.src) {
      this.stopMusic();
      this.#startMusic(audio, loop);
      return;
    }
  }
  #startMusic(audio, loop) {
    if (!(audio instanceof HTMLAudioElement)) {
      throw new TypeError(`audio must be a HTMLAudioElement`);
    }

    if (typeof loop != "boolean") {
      throw new TypeError(`loop must be a bool`);
    }

    this.currentMusic = audio;
    this.isCurrentMusicLooped = loop;
    this.currentMusicVolume = this.musicVolume;

    if (audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      this.playAudio(audio);
    } else {
      throw new Error(audio.src + " was not ready to be played");
    }
  }
  isPlaying(audio) {
    if (!(audio instanceof HTMLAudioElement)) {
      throw new TypeError(`audio must be a HTMLAudioElement`);
    }

    return !audio.paused && audio.currentTime > 0;
  }
  playAudio(audio) {
    if (!(audio instanceof HTMLAudioElement)) {
      throw new TypeError(`audio must be a HTMLAudioElement`);
    }

    audio.play();
  }
  stopMusic() {
    if (this.currentMusic === null) {
      return;
    }

    this.stopAudio(this.currentMusic);
    this.currentMusic = null;
  }
  stopAudio(audio) {
    if (!(audio instanceof HTMLAudioElement)) {
      throw new TypeError(`audio must be a HTMLAudioElement`);
    }

    audio.volume = 0;
    audio.pause();
    audio.currentTime = 0;
  }
}
