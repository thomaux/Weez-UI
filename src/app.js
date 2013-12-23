require(["src/Weez", "src/player/Player"], function(Weez,Player){
    var VM = function(){
        var _this = this,
            game = Weez.createGame([new Player(),new Player(),new Player(),new Player()]);
        game.deal();

        this.game = ko.observable(game);
        this.showWarning = ko.observable(false);
        this.actions = ko.observableArray();
        this.selectedTrump = ko.observable();

        this.playCard = function(card){
            var success = Weez.play(_this.game().currentPlayer, card);
            _this.updateGameState(success);
        };
        this.updateGameState = function(actionResult){
            if(actionResult){
                _this.game(game);
                _this.showScores();
                _this.setActions();
            } else {
                _this.showWarning(true);
            }
        };
        this.bid = function(actionName){
            var selectedTrump = _this.selectedTrump() ? parseInt(_this.selectedTrump()) : undefined,
                success = Weez[actionName](_this.game().currentPlayer, selectedTrump);
            _this.updateGameState(success);
        };

        this.setActions = function(){
            switch(game.phase){
                case 0:
                case 1:
                    _this.actions([
                        {
                            title: "Bid",
                            action: function(){
                                _this.bid("bid");
                            }
                        },
                        {
                            title: "Pass",
                            action: function(){
                                _this.bid("pass");
                            }
                        },{
                            title: "Solo",
                            action: function(){
                                _this.bid("bidSolo");
                            }
                        },{
                            title: "Misery",
                            action: function(){
                                _this.bid("bidMisery");
                            }
                        },{
                            title: "Abondance",
                            action: function(){
                                _this.bid("bidAbondance");
                            }
                        }]);
                    break;
                case 2:
                    _this.actions([]);
                    break;
                case 3:
                    _this.actions([{
                        title: "Deal",
                        action: function(){
                            game.deal();
                            _this.updateGameState(true);
                        }
                    }]);
                    break;
                default:
                    break;
            }
        };

        this.showScores = function(){
            if(game.phase === 3){
                var scores = "";
                for(var i = 0; i < 4; i++){
                    scores = scores + (i+1) + ": " + game.players[i].score + " | ";
                }
                alert(scores);
            }
        };

        this.updateGameState(true);
        ko.applyBindings(this);
    };
    new VM();
});