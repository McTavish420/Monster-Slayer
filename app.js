new Vue({
  el: "#app",
  data:{
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    spAttack: 3,
    heals: 5,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.spAttack = 3,
      this.heals = 5,
      this.turns = [];
    },
    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage + ' HP'
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    specialAttack: function () {
      if (this.spAttack > 0) {
        var damage = this.calculateDamage(10, 20);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits hard Monster for ' + damage + ' HP'
        });
        this.spAttack --;
      } else {
        this.turns.unshift({
          isPlayer: true,
          text: `You don't have any Special Attack left.`
        });
      }
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function () {
      if (this.heals > 0) {
        if (this.playerHealth <= 90) {
          this.playerHealth += 10;
        }else {
          this.playerHealth = 10;
        }
        this.turns.unshift({
          isPlayer: true,
          text: 'Player heals for 10 HP'
        });
        this.heals --;
      } else {
        this.turns.unshift({
          isPlayer: true,
          text: `You don't have any Healing Potion left.`
        });
      }
      this.monsterAttacks();
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    monsterAttacks: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage + ' HP'
      });
      this.checkWin();
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);;
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You Won!!!  want to star again?")) {
          this.startGame();
        }else {
          this.gameIsRunning = false;
        }
        return true;
      }else if (this.playerHealth <= 0){
        if (confirm("You Lost!!!  want to star again?")) {
          this.startGame();
        }else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
