<template>
    <span>
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <span class="close-icon" @click="$emit('close')"><i class="material-icons">close</i></span>
            <div class="modal-header">Create New Authorized Device</div>

            <div>
              <input type="text" v-model="newTitle" style="width: 100%;"></input>
            </div>

            <div style="position: relative; display: inline-block; margin-top: 0.5rem; width:100%;">
              <button class="small-button" @click="$emit('close')" style="float: right;">Cancel</button>
              <button class="small-button" @click="createDevice" style="margin-right: 0.5rem; float:right;">Save</button>
            </div>

          </div>
        </div>
      </div>
      <ModalCreateDeviceSuccess v-if="successModalVisible" :device="createdDevice" @close="closeAll" />
    </span>
</template>

<script>
import ModalCreateDeviceSuccess from './modal_createdevicesuccess';

export default {
  name: 'modal_newdevice',
  components: {
    ModalCreateDeviceSuccess,
  },
  data() {
    return {
      newTitle: 'New Device',
      successModalVisible: false,
      createdDevice: null,
    }
  },
  methods: {
    async createDevice() {
      // TODO: need a way to provision many devices at once, maybe download certs/keys as a csv.
      let body = JSON.stringify({
      title: this.newTitle,
      });
      let resp = await fetch('/api/devices/create', { credentials: 'include', method: 'POST', body, headers: {'Content-Type': 'application/json'} }).then(r => r.json());
      this.$store.commit('addDevice', resp.device);
      this.$store.commit('addAlert', { msg: 'New Authorized Device created', type: 'success' });
      this.createdDevice = resp.device;
      this.successModalVisible = true;
    },
    closeAll() {
      this.successModalVisible = false;
      this.$emit('close');
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~assets/css/main.scss";

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 20rem;
  margin: 0px auto;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-radius: 2px;
  border: 2px solid black;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  text-align: left;
  position: relative;
}
.close-icon {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: $icon-base-color;
  cursor: pointer;
}

.modal-header {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: $primary-text;
  font-weight: 600;
}

.modal-body {
  margin: 1rem 0;
}

.modal-default-button {
  float: right;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.small-button:hover {
  color: black;
}
</style>
