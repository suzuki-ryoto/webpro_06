# webpro_06

## GitHubでの管理について
Gitで管理する際，誰が変更したか明らかにするため，
ユーザ名とメールアドレスを登録する．
この作業は1回だけ実行しておけば良い．
以下の例は「鈴木涼斗」がユーザ名とメールアドレスを
登録する例である．各自の情報に合わせて実行する．
```
$ git config --global user.name "Suzuki Ryoto"
$ git config --global user.email "suzuki@ryoto.co.jp"
```
GitHubに修正，追加したファイルをアップロードしたい場合，次のコマンドをターミナルで実行する．
なお，'コメント'の部分は変更理由や変更内容を書くためにあるためそのままにしない．
```javascript
git add .
git commit -am 'コメント'
git push
```

## サーバーの起動について
起動したいサーバーのプログラムが書かれているファイルがあるディレクトリで以下のように実行する．
例として今回起動するファイルを「app.js」とする．
```javascript
node app.js
```

## じゃんけん
### このプログラムについて
このプログラムは，「グー，チョキ，パー」のいずれかを入力すると，コンピュータ側がランダムで出した手との勝敗を判定するプログラムである．勝敗の他に
### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | 画面のテンプレート

### 利用手順
1. ```app5.js```を起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

## スロット
### このプログラムについて
### ファイル一覧
### 利用手順

## パズル
### このプログラムについて
### ファイル一覧
### 利用手順



## フローチャート

###　じゃんけん

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"じゃんけんの勝敗"}
win["試合数と勝数を1増やす"]
draw["試合数を1増やす"]


start --> if
if -->|勝ち| win
win --> end1
if -->|引き分け| draw
draw --> end1
if --> |負け| draw

```

###　スロット

```mermaid
flowchart TD;

start["開始"]
end1["終了"]
bet["賭け金の入力"]
slot["3つの乱数を表示"]
if{値が3つ揃っているか}
result["現在の所持金表示"]
win["賭け金増加"]
lose["賭け金消失"]


start --> bet
bet --> slot
slot --> if
if --> |yes|win
win --> result
if --> |no|lose
lose --> result
result --> end1

```

###　パズル

```mermaid
flowchart TD;

start["開始"]
cube["パズルの生成"]
button["ボタンを選択"]
reverse["自身と両隣を反転"]
if{パズルが揃っているか}
clear["クリア表示"]
end1["終了"]


start --> cube
cube --> button
button --> reverse
reverse --> if
if --> |yes|clear
clear --> end1
if --> |no|button

```