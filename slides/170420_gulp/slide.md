# 快適なGulpライフのために


---

## あるある

---

![antigravite2_—_open_◂_gulp_MANPATH__Users_fsimg__nvm_versions_node_v6_3_0_share_man__usr_local_share_man_ja__usr_local_share_man__usr_share_man__opt_X11_share_man__Applications_Xcode_app_Contents_Developer_Platforms_MacOSX_platform_Develope.png](https://qiita-image-store.s3.amazonaws.com/0/77729/3439778a-0bcf-05c9-86d4-3c2928254562.png "antigravite2_—_open_◂_gulp_MANPATH__Users_fsimg__nvm_versions_node_v6_3_0_share_man__usr_local_share_man_ja__usr_local_share_man__usr_share_man__opt_X11_share_man__Applications_Xcode_app_Contents_Developer_Platforms_MacOSX_platform_Develope.png")

--

* gulpがエラーが出て動かない
* =SCSSがコンパイルできない
* 仕事ができない！！！！

--

* 予想外のエラーが起きても、ある程度対処できるようにしたい
* チームメイトとのgulp案件の受け渡しをスムーズに
* gulpを理解して使いたい

--

## そもそもgulpとは

--

### 人の手で作業すると面倒なものを自動化する
* SCSSを更新したら、それをコンパイルして/cssフォルダに出したい。gulp-sass
* JSを更新したら、勝手に圧縮して/cssフォルダに出したい。gulp-uglify
* ファイルを更新したら、ローカルサーバーも自動で更新してほしい。browsersync

---

### 人の手で作業すると面倒なものを自動化する
* JSをES6で書いたので、ES5にして古いブラウザにも対応してほしい。gulp-babel
* SCSSがエラー出てコンパイルが止まったら、アラートを出して教えてほしい。gulp-notify
* ファイルを更新したら、ローカルサーバーも自動で更新してほしい。browsersync

---

### Gulp+プラグイン = 動く
Gulpでコレが全部できる訳ではなく・・・<br />
「npm」というプラグインの倉庫からインストールする必要があります。<br />
・・・npm？

---

## npm = Node Package Manager

![ダウンロード.png](https://qiita-image-store.s3.amazonaws.com/0/77729/1344be4c-61a5-f97f-b373-e895fe875121.png "ダウンロード.png")

node.js という言語で書かれた便利ツール達の倉庫です。	

* Javascriptだけども、「CommonJS」という仕様で書かれているので、普通のJSとはビミョーに違う（後述）	
* nodejsでプラグインを書くと、ここに登録できる。	
* 全世界の技術者がダウンロードできる。	

興味があれば、[この記事](http://qiita.com/megane42/items/2ab6ffd866c3f2fda066)をどうぞ

---

## 例えば

gulpを一番初めに動かす時打つ、このコマンドですが

```sh
$ npm install

```
npmから、package.jsonにかかれているプラグイン（モジュール）を<br />
すべてDLしてください！<br />
というコマンドです。

--

## npm install => gulp
DLしてきたプラグインたちをgulpが動かします。
自動化タスクの内容は、gulpfile.jsに書きます。

```gulpfile.js

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src(['./js/{**/,}*.js'])//このフォルダにあるjsを読んでね
        .pipe(plumber()) //エラー出ても止めないでね
        .pipe(uglify())//js圧縮してね
        .pipe(gulp.dest('../html/js/'));//ここのフォルダに出力してね
});

```
・・・ん？？

---

## require???import???
gulpfile.jsの中身が、なんか普通のJSと違うんですけど・・・・	
そうです、（基本的に）CommonJSという仕様で書かれています。	

詳しい記事は[ここ](https://www.slideshare.net/terurou/common-js)	

gulpやwebpack以外では今すぐ使うことはないかもなので、	
gulpfile.jsの改造をしたい場合のみ、気に留めておいてください。	

---

## 実践編 -gulpをインストール
ココ！見てね！！
https://github.com/nnishimura/namplate/wiki/Git&Gulp-%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97

---

## gulpをグローバルと、ローカルにインストールする。

```
$ npm install gulp -g
$ npm install gulp@3.9.0 --save-dev
```

バージョンを指定してインストールするのがミソです

---

## node.jsをインストールする。
・・・・その前に
node.jsはかなり頻繁にアップデートが入るので、
1つのバージョンだけ持っておくのは不便。
いくつかnode.js入れといて、バージョンが切り替えられた方が、
後々便利。そこで

NVM (node version manager)

---

## NVM経由でnode.jsをインストールする

こちらのコマンドを打って、エラーがでなければOK

```
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ source ~/.nvm/nvm.sh
$ nvm -v
```
---

node.js v0.12.9をインストールします。
node -vで0.12.9がかえってくればOK


```
$ nvm install 0.12.9
$ node -v

```
---

ターミナルを終了しても、nvmが起動するように、下記を
~（ホームディレクトリ）/.bash_profileに追記する。


```sh:.bash_profile
if [[ -s /Users/ホームディレクトリ/.nvm/nvm.sh ]] ; then source /Users/ホームディレクトリ/.nvm/nvm.sh ; fi

```

---

ターミナルを再起動して、
```
$ node -v

```

がエラーにならなければオッケー


---

## gulpを動かす

```
$ npm install
$ gulp

```

---

## nodeの最新版（v7.0---）が入っちゃった、nvmも入れてないよ
先にインストールされたnode.jsを削除する必要があります。

## v0.12.9古すぎる、アップデートしたいです
良いと思います。
ただ、チームメイト全員がアップデートする/ バージョンを切り替える必要があります。

---

## エラーが出た、その前に
個人的に、実務でgulpがコケるのは80%くらいnode.jsのバージョン違いが原因。
gulp動かない場合はまず

```
$ node -v

```
違うバージョンが出てきたら、
これでインストールされているバージョンを調べて

```
$ nvm ls

```

node のバージョンを切り替える。

```
$ nvm use v0.12.9

```
ホントに、これで８割方解決します。	
※一度間違ったバージョンで```npm install```してしまった場合は、	
node_modulesを全部消した上で、もう一度```npm install```しましょう。

---

## 残りの20%のエラー
主なものだけ・・・・・・

---


## ケース１：npm installでコケる
例：unmet dependency
![2.png](https://qiita-image-store.s3.amazonaws.com/0/77729/29cd5927-8338-2470-7e4b-9437bc16f5cc.png "2.png")

- 依存関係が満たされていないよということ
- 必要なモジュールがインストールされてないよ
- package.jsonが間違えている
- エラーメッセージに書いてあるモジュールを、手動でインストールする

--

## ケース２：gulpでコケる
例：Error: listen EADDRINUSE :::4000

こちらは何回もgulpが走ってlocalサーバーが何個も立ち上がっている時にも起こります。更新の度、同じポートを使って新たにサーバ
ー立ち上げようとするから起こるみたい。

- ブラウザを1回全部閉じて再起動。
- ポートが使われているのでプロセスを切る(わからなかったらターミナルも再起動)


---

## その他

神記事
http://qiita.com/M-ISO/items/d693ac892549fc95c14c

---

## まとめ

エラーが起こった時
1.〜3.を順番に確認してみてください。

1. node/gulpのバージョンがプロジェクト毎に指定されているバージョンと違っていないか確認する

2. エラーを読んで、どういう種類のエラーなのか理解する。	
この記事に対処法が載っていることが多いです	
http://qiita.com/M-ISO/items/d693ac892549fc95c14c	

3. エラーの内容はわかったけど、どうやって直せば良いか分からない	
エラーメッセージをgoogle検索する。大野さんに聞く。とりあえず置いといて、時間がある時に調べる。etc	
※nodeのバージョンが低いので（v0.12.9）どうしようもないエラーが出る場合があります。将来的にnodeのバージョンをあげる必要がありますが、	
SCSSをコンパイルする等シンプルなタスクだとあまりバグりません。	
npmのプラグインによっては最新のnode下でしか動かないこともあるので、注意が必要です。

---

間違いもあったかもしれませんが、、、

##　快適なgulpライフが送れるよう、祈っております

---

## END

---