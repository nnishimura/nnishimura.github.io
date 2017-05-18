## 快適なGulpライフのために
## @nnishimura

---

## あるある

---

![antigravite2_—_open_◂_gulp_MANPATH__Users_fsimg__nvm_versions_node_v6_3_0_share_man__usr_local_share_man_ja__usr_local_share_man__usr_share_man__opt_X11_share_man__Applications_Xcode_app_Contents_Developer_Platforms_MacOSX_platform_Develope.png](https://qiita-image-store.s3.amazonaws.com/0/77729/3439778a-0bcf-05c9-86d4-3c2928254562.png "antigravite2_—_open_◂_gulp_MANPATH__Users_fsimg__nvm_versions_node_v6_3_0_share_man__usr_local_share_man_ja__usr_local_share_man__usr_share_man__opt_X11_share_man__Applications_Xcode_app_Contents_Developer_Platforms_MacOSX_platform_Develope.png")

---

* gulpがエラーが出て動かない
* =SCSSがコンパイルできない
* 仕事ができない！！！！

---

* 予想外のエラーが起きても、ある程度対処したい
* チームメイトとのgulp案件の受け渡しをスムーズに
* gulpを改造できるように

---

## そもそもgulpとは

---

### タスクランナー
* SCSSををコンパイルして/cssフォルダに保存したい。**gulp-sass**
* JSを圧縮して/jsフォルダに保存したい。**gulp-uglify**
* JSをES6で書いたので、ES5にして古いブラウザにも対応してほしい。**gulp-babel**
* SCSSがエラー出てコンパイルが止まったら、アラートを出して教えてほしい。**gulp-notify**
* ファイルを更新したら、ローカルサーバーも自動で更新してほしい。**browsersync**

---

### Gulp+プラグイン = 動く
「npm」というパッケージマネージャーからプラグインをインストールする必要があります。<br />
・・・npm？

---

## npm = Node Package Manager

![ダウンロード.png](https://qiita-image-store.s3.amazonaws.com/0/77729/1344be4c-61a5-f97f-b373-e895fe875121.png "ダウンロード.png")

node.js という言語で書かれた便利ツール達の倉庫です。

* Javascriptだけども、「CommonJS」という仕様で書かれているので、普通のJSとはビミョーに違う（後述）
* nodejsでプラグインを書くと、ここに登録できる。
* 全世界の技術者がダウンロードできる。
<br />
興味があれば、[この記事](http://qiita.com/megane42/items/2ab6ffd866c3f2fda066)をどうぞ

---

## 例えば


```sh
$ npm install

```

訳：<br />
npmから、package.jsonにかかれているプラグインを<br />
すべてDLしてください！<br />


---

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
なんか普通のJSと違うんですけど・・・・ <br>
そうです、CommonJSの仕様で書かれています。<br><br>

※正確に言うとCommonJSの仕様からは外れているそうなので、  <br>
そこらへんの話が気になるなら
<br><br>

* [最初の方にCommonJS解説](https://www.slideshare.net/terurou/common-js)
* [JSモジュールシステムの歴史と現状](http://qiita.com/mizchi/items/6b569cc75dbcc26a1f15)
* [CommonJS.orgのエンジニアさんの説明](https://www.slideshare.net/kriskowal/commonjs-javascript-everywhere?next_slideshow=1)

<br><br>

---

## commonJS

便利です

---

## node/gulp環境のsetup


江口さん/堀内さん/岩田さんのPCに<br />環境構築した一連の手順です

* [セットアップの手順](https://github.com/nnishimura/namplate/wiki/Git&Gulp-%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)

---

## gulpをグローバルと、ローカルにインストールする。

```
$ npm install gulp -g
$ npm install gulp@3.9.0 --save-dev

```

バージョンを指定してインストールするのがミソです  
※[`--save-dev`って何](http://qiita.com/msakamoto_sf/items/a1ae46979a42d6948ebd#--save----save-dev----save-optional-%E3%81%AE%E9%81%95%E3%81%84)

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

node.jsをインストールします。
** バージョンを指定します。 **
node -vでバージョンがかえってくればOK


```
$ nvm install 6.0.0
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
$ nvm use v6.0.0

```
ホントに、これで８割方解決します。<br>
※一度間違ったバージョンで```npm install```してしまった場合は、  <br>
node_modulesを全部消した上で、もう一度```npm install```しましょう。  

---

## 残りの20%のエラー
主なものだけ・・・・・・

---


## ケース１：npm installでコケる
例：`unmet dependency`
![2.png](https://qiita-image-store.s3.amazonaws.com/0/77729/29cd5927-8338-2470-7e4b-9437bc16f5cc.png "2.png")

- 依存関係が満たされていないよということ
- 必要なモジュールがインストールされてないよ
- package.jsonが間違えている
- エラーメッセージに書いてあるモジュールを、手動でインストールする

---

## ケース２：gulpでコケる
例：`Error: listen EADDRINUSE :::4000`
<br>
こちらは何回もgulpが走ってlocalサーバーが何個も立ち上がっている時にも起こります。<br>
更新の度、同じポートを使って新たにサーバー立ち上げようとするから起こるみたい。<br><br>

- 他に立ち上がっているlocalサーバー全部閉じて再起動。
- ポートが使われているのでプロセスを切る(わからなかったらターミナルも再起動)


---


## ケース３：npm installでコケる　その２
例：unmet dependency
![2.png](https://qiita-image-store.s3.amazonaws.com/0/77729/29cd5927-8338-2470-7e4b-9437bc16f5cc.png "2.png")

nodeのバージョン変えて再インストールしても、ずっと`unmet dependency`
キャッシュを消す

```
$ npm cache clean

```

---

## その他

神記事<br />
http://qiita.com/M-ISO/items/d693ac892549fc95c14c<br /><br />
---

## Q.
## nodeの最新版（v7.0---）が入っちゃった、nvmも入れてないよ
先にインストールされたnode.jsを削除する必要があります。

---

## Q.
## v0.12.9古すぎる、アップデートしたいです
お願いします。
私がv0.12=>v6にした時はエラーの嵐だったので、    
当方の環境ではうまく動いたgulp/webpack開発環境テンプレを挙げておきます。

* [gulp & webpack環境](https://bitbucket.org/fullsizeimage/sunart/src)
* [LIGで実際に使われているフロントエンドテンプレート](https://github.com/frontainer/frontplate)
LIG用にアレンジされているのでこのままでは使いにくかった

---

## まとめ

エラーが起こった時
1.〜3.を順番に確認してみてください。

1. node/gulpのバージョンがプロジェクト毎に指定されているバージョンと違っていないか確認する

2. エラーを読んで、どういう種類のエラーなのか**理解する。**
この記事に対処法が載っているかもしれない
http://qiita.com/M-ISO/items/d693ac892549fc95c14c

3. エラーの内容はわかったけど、どうやって直せば良いか分からない
ググる。stackoverflow OR Qiita。放置して時間がある時に調べる。諦める。大野さんに聞く。

---


間違いもあったかもしれませんが、、、

##　快適なgulpライフが送れるよう、祈っております

---

## おわり
