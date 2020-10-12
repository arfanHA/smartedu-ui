<template>
  <router-view refs="router-root"></router-view>
</template>

<style>
.v-list-item__content {
  padding: 0;
}

.v-container {
  padding: 5px;
  margin: 5px;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #003955;
}
::-webkit-scrollbar-thumb {
  background: #00527B;
}
::-webkit-scrollbar-thumb:hover {
  background: #00527B;
}

@media (max-width: 1920px) {
 .v-dialog.v-dialog--active.v-dialog--fullscreen {
    width: 84%;
    left: 16%;
  }
}

@media (max-width: 1024px) {
 .v-dialog.v-dialog--active.v-dialog--fullscreen {
    width: 100%;
    left: 0%;
  }
}

.v-list--nav .v-list-item:not(:last-child):not(:only-child), .v-list--rounded .v-list-item:not(:last-child):not(:only-child) {
    margin-bottom: 0px !important;
}
.v-list-item {
    margin: 0px 0;
}

</style>