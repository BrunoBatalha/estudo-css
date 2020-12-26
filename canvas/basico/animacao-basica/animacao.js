function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.ligado = false;
}

Animacao.prototype = {
  novoSprite: function(sprite) {
    this.sprites.push(sprite);
  },

  ligar: function() {
    this.ligado = true;
    this.proximoFrame();
  },

  desligar: function() {
    this.ligado = false;
  },

  proximoFrame: function() {
    if (!this.ligado) return;

    this.limparTela();

    for (let i in this.sprites) {
      this.sprites[i].atualizar();
    }

    for (let i in this.sprites) {
      this.sprites[i].desenhar();
    }

    const animacao = this;
    requestAnimationFrame(function() {
      animacao.proximoFrame();
    });
  },

  limparTela: function() {
    const ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
