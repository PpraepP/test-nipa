<template>
  <v-file-input
    label="File input"
    outlined
    dense
    class="mt-3"
    @change="$emit('selectedFile', $event)"
  ></v-file-input>
</template>
