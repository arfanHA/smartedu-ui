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

@media (max-width: 1366px) {
 .v-dialog.v-dialog--active.v-dialog--fullscreen {
    width: 82%;
    left: 18.4%;
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
.v-list-item{
    margin: 0px 0;
    height: 32px !important;
}

.v-list-item__title {
    font-size: 0.8rem !important;
    font-weight: 400;
}

.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 15px !important;
}

.v-data-table {
    margin: 15px;
}

tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
 }

 .v-dialog .logoDialog{
    overflow-y: hidden;
    box-shadow: none !important;
}

</style>