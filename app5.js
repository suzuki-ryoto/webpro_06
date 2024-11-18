const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render("show", { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render("show", { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render("icon", {
    filename: "./public/Apple_logo_black.svg",
    alt: "Apple Logo",
  });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = "";
  if (num == 1) luck = "大吉";
  else if (num == 2) luck = "中吉";
  console.log("あなたの運勢は" + luck + "です");
  res.render("luck", { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = "";
  let judgement = "";
  if (num == 1) cpu = "グー";
  else if (num == 2) cpu = "チョキ";
  else cpu = "パー";
  total += 1;
  if (isNaN(total)) {
    total = 0;
  }
  if (isNaN(win)) {
    win = 0;
  }

  if (hand == "グー") {
    if (cpu == "グー") judgement = "引き分け";
    else if (cpu == "チョキ") {
      judgement = "勝ち";
      win += 1;
    } else if (cpu == "パー") judgement = "負け";
  } else if (hand == "チョキ") {
    if (cpu == "グー") judgement = "負け";
    else if (cpu == "チョキ") judgement = "引き分け";
    else if (cpu == "パー") {
      judgement = "勝ち";
      win += 1;
    }
  } else if (hand == "パー") {
    if (cpu == "グー") {
      judgement = "勝ち";
      win += 1;
    } else if (cpu == "チョキ") judgement = "負け";
    else if (cpu == "パー") judgement = "引き分け";
  }

  if(hand == "リセット"){
    total =0;
    win =0;
    hand ="";
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
  };
  res.render("janken", display);
});

app.get("/slot", (req, res) => {
  let bet = Number(req.query.bet_f);
  let money = Number(req.query.money_f);
  let game = req.query.game_f;
  let reset = Number(req.query.reset);
  let luck = "";
  let num = 0;
  let mum = 0;
  let lum = 0;
  console.log({ bet, money, game });
  if (isNaN(bet)||reset == 1) {
    bet = 0;
  }
  if (isNaN(money)||reset == 1) {
    money = 1000;
  }
  reset = 0;
  console.log({ bet, money });

  if (bet > 0) {
    if (money - bet >= 0) {
      num = Math.floor(Math.random() * 5 + 1);
      mum = Math.floor(Math.random() * 5 + 1);
      lum = Math.floor(Math.random() * 5 + 1);

      if (num == mum) {
        if (mum == lum) {
          if (lum == num) luck = "あたり";
          else luck = "はずれ";
        } else luck = "はずれ";
      } else luck = "はずれ";

      money = money - bet;
      if (luck == "あたり") {
        bet = bet * 10;
      } else {
        bet = bet * 0;
      }
      if (money == 0) {
        game = "Game over";
      } else game = "　";
      money = money + bet;
    } else {
      game = "所持コインよりも少ない値を入力してください";
      luck = "Error";
    }
  } else {
    game = "1以上の整数を入力してください";
    luck = "Error";
  }
  res.render("slot", {
    number1: num,
    number2: mum,
    number3: lum,
    luck: luck,
    bet_f: bet,
    money_f: money,
    game_f: game,
  });
});

app.get("/puzzle", (req, res) => {
  let count = Number(req.query.count);
  let reset = Number(req.query.reset);
  let judge = Number(req.query.button);
  let game_f = Number(req.query.game_f);
  let p1 = Number(req.query.p1);
  let p2 = Number(req.query.p2);
  let p3 = Number(req.query.p3);
  let p4 = Number(req.query.p4);
  let p5 = Number(req.query.p5);
  let ps1 = 0;
  let ps2 = 0;
  let ps3 = 0;
  let ps4 = 0;
  let ps5 = 0;
  console.log({ judge });
  console.log({ p1, p2, p3, p4, p5, reset });
  if (isNaN(count) || reset == 1) {
    count = 0;
    reset = 0;
  }

  if (count == 0) {
    p1 = 0;
    p2 = 0;
    p3 = 0;
    p4 = 0;
    p5 = 0;
    while (p1 == p2 && p2 == p3 && p3 == p4 && p4 == p5 && p5 == p1) {
      p1 = Math.floor(Math.random() * 2 + 1);
      p2 = Math.floor(Math.random() * 2 + 1);
      p3 = Math.floor(Math.random() * 2 + 1);
      p4 = Math.floor(Math.random() * 2 + 1);
      p5 = Math.floor(Math.random() * 2 + 1);
    }
  }

  if (judge == 1) {
    if (p5 == 1) {
      p5 = 2;
    } else p5 = 1;
    if (p1 == 1) {
      p1 = 2;
    } else p1 = 1;
    if (p2 == 1) {
      p2 = 2;
    } else p2 = 1;
  }
  if (judge == 2) {
    if (p1 == 1) {
      p1 = 2;
    } else p1 = 1;
    if (p2 == 1) {
      p2 = 2;
    } else p2 = 1;
    if (p3 == 1) {
      p3 = 2;
    } else p3 = 1;
  }
  if (judge == 3) {
    if (p2 == 1) {
      p2 = 2;
    } else p2 = 1;
    if (p3 == 1) {
      p3 = 2;
    } else p3 = 1;
    if (p4 == 1) {
      p4 = 2;
    } else p4 = 1;
  }
  if (judge == 4) {
    if (p3 == 1) {
      p3 = 2;
    } else p3 = 1;
    if (p4 == 1) {
      p4 = 2;
    } else p4 = 1;
    if (p5 == 1) {
      p5 = 2;
    } else p5 = 1;
  }
  if (judge == 5) {
    if (p4 == 1) {
      p4 = 2;
    } else p4 = 1;
    if (p5 == 1) {
      p5 = 2;
    } else p5 = 1;
    if (p1 == 1) {
      p1 = 2;
    } else p1 = 1;
  }

  if (p1 == 1) {
    ps1 = "◯";
  } else ps1 = "☓";
  if (p2 == 1) {
    ps2 = "◯";
  } else ps2 = "☓";
  if (p3 == 1) {
    ps3 = "◯";
  } else ps3 = "☓";
  if (p4 == 1) {
    ps4 = "◯";
  } else ps4 = "☓";
  if (p5 == 1) {
    ps5 = "◯";
  } else ps5 = "☓";

  if (p1 == p2 && p2 == p3 && p3 == p4 && p4 == p5 && p5 == p1) {
    game_f = "Game clear";
  } else game_f = "Play game";

  count += 1;

  res.render("puzzle", {
    game_f: game_f,
    p1: p1,
    p2: p2,
    p3: p3,
    p4: p4,
    p5: p5,
    ps1: ps1,
    ps2: ps2,
    ps3: ps3,
    ps4: ps4,
    ps5: ps5,
    count: count,
    reset: reset,
  });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
