<template>
  <div v-if="loaded">
      <!-- <h5 v-if="expired">Waktu Habis</h5> -->
      <!-- {{displayDays}}: -->
      {{displayHours}}:
      {{displayMinutes}}:
      {{displaySecond}}
  </div>
</template>

<script>
export default {
    props: ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'],
    data: ()=> ({
        displayDays: 0,
        displayHours: 0,
        displayMinutes: 0,
        displaySecond: 0,
        loaded : false,
        expired: false,

    }),
    computed: {
        _seconds: () => 1000,
        _minutes() {
            return this._seconds * 60
        },
        _hours() {
            return this._minutes * 60
        },
        _days() {
            return this._hours * 24
        },
        end() {
            return new Date(
                this.year,
                this.month,
                this.date,
                this.hour,
                this.minute,
                this.second,
                this.millisecond
            )
        }
    },
    mounted(){
        this.showRemaining();
    },
    methods: {
        formatNum: num => (num < 10 ? '0' + num : num),
        showRemaining() {
            const timer = setInterval(()=>{
                const now = new Date();
                // const end = new Date(2020, 12, 12, 19, 19, 19, 19)
                const distance = this.end.getTime() - now.getTime();
                if (distance < 0){
                    clearInterval(timer);
                    this.expired = true;
                    return;
                }

                const days = Math.floor((distance / this._days));
                const hours = Math.floor((distance % this._days) / this._hours);
                const minutes = Math.floor((distance % this._hours) / this._minutes);
                const seconds = Math.floor((distance % this._minutes) / this._seconds);
                this.displayMinutes = this.formatNum(minutes);
                this.displaySecond = this.formatNum(seconds);
                this.displayHours = this.formatNum(hours);
                this.displayDays = this.formatNum(days);
                this.loaded = true;
            }, 1000)
        }
    }
}
</script>

<style>

</style>