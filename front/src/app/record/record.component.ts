import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { AuthService } from '../service/auth.service';
import { WebRequestService } from '../service/web-request.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
})
export class RecordComponent {
  title = 'record-app';
  isRecording = false;
  public record;
  public url;
  bite: string;
  public urls = [];
  public error;
  ip = 0;

  constructor(
    private domSanitizer: DomSanitizer,
    private webService: WebRequestService
  ) {}
  startRecording() {
    this.isRecording = true;
    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  ngOnInit(): void {
    console.log(this.url);
  }

  successCallback(stream) {
    var options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1,
    };

    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.isRecording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    this.ip = this.ip + 1;
    this.urls.push(URL.createObjectURL(blob));
    var formData = new FormData();
    formData.append('name', 'helou');
    formData.append('audio', blob);
    this.webService.sendAudio(formData);
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
}
