<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>Camera</h2>
        <div class="border">
          <vue-web-cam
            ref="webcam"
            :device-id="deviceId"
            width="100%"
            @started="onStarted"
            @stopped="onStopped"
            @error="onError"
            @cameras="onCameras"
          />
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="group-btn">
              <v-btn color="primary" @click="onCapture">
                Capture Photo
              </v-btn>
              <v-btn color="error" @click="onStop">
                Stop Camera
              </v-btn>
              <v-btn color="success" @click="onStart">
                Start Camera
              </v-btn>
            </div>
          </div>
        </div>

        <FormFile @selectedFile="previewFiles" />
      </div>

      <div class="col-md-6">
        <div class="capture-image">
          <h2>Captured Image</h2>
          <div class="figure">
            <img :src="showImg" class="img-responsive" />
          </div>
        </div>

        <list-detech v-if="detechList" :valueDetech="detechList" />
      </div>
    </div>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
import nvision from "@nipacloud/nvision";
import FormFile from "@/components/FormFile.vue";
import List from "@/components/List.vue";
export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam,
    FormFile,
    "list-detech": List,
  },
  data() {
    return {
      img: null,
      showImg: "",
      camera: null,
      deviceId: null,
      devices: [],
      decodeBase64: "",
      detechList: "",
      styleDetech: [],
    };
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
        console.log("tail", tail);
      }
    },
  },
  methods: {
    previewFiles(event) {
      console.log("event", event);
      const selectedImage = event;
      this.imageToBase64(selectedImage);
      console.log(selectedImage);
    },
    imageToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file to base64 result:" + reader.result);
        this.decodeBase64 = reader.result;
        this.showImg = this.decodeBase64;
        this.getDetectNvision(this.decodeBase64);
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },
    onCapture() {
      this.img = this.$refs.webcam.capture();
      this.showImg = this.$refs.webcam.capture();
      console.log("img", this.img);
      this.getDetectNvision(this.img);
    },
    getDetectNvision(code) {
      const objectDetectionService = nvision.objectDetection({
        apiKey:
          "cdb29f355cb4059995e05420dc8d963f657898bf3a5f2f5e7a88c58279f5e4a0a1c4c4cf874594b42e413fc45c425425ac",
      });

      objectDetectionService
        .predict({
          rawData: code.replace(/data:.+;base64,/, ""),
        })
        .then((result) => {
          console.log(result.detected_objects);
          this.detechList = result.detected_objects;
          this.styleDetech = this.detechList.map((item) => item.bounding_box);
          console.log("this.styleDetech", this.styleDetech);
        });
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
  },
};
</script>
<style lang="scss" scoped>
.capture-image {
  .figure {
    position: relative;
  }
  img {
    width: 100%;
  }
  .overlay-box {
    position: relative;
    &__list {
      position: absolute;
      border: 2px solid;
    }
  }
}
.group-btn {
  button {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}
</style>
