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

* 予想外のエラーが起きても、自分で対処したい
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
* [もっと詳しい説明](http://qiita.com/megane42/items/2ab6ffd866c3f2fda066)

---

## 例えば


```
$ npm install

```

訳：<br />
npmから、package.jsonにかかれているプラグインを<br />
すべてDLしてください！<br />


---

## npm install => gulp
DLしてきたプラグインたちをgulpが動かします。
自動化タスクの内容は、gulpfile.jsに書きます。

```javaScript

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src(['./js/{**/,}*.js']) //このフォルダにあるjsを読んでね
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

## gulpを改造する時は
<br>
とはいえ、gulpはjavascriptで動くタスクランナーなので、  
jsを書けば改造できます。
<br><br>

- npm上のリファレンスを見る
- 他の人のサンプルコードを参考にする
- ググる


---

## nvm/node/gulp環境のsetup


江口さん/堀内さん/岩田さんのPCに<br />環境構築した一連の手順です

* [セットアップの手順](https://github.com/nnishimura/namplate/wiki/Git&Gulp-%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)
<br>


---

## node.jsをインストールする。
・・・・その前に  
node.jsはかなり頻繁にアップデートが入るので、  
1つのバージョンだけ持っておくのは不便。  
いくつかのバージョンを入れつつ、必要な時に切り替えられた方が、
後々便利。そこで  <br><br>

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

## gulpをグローバルと、ローカルにインストールする。


```
$ npm install gulp@3.9.0 -g
$ npm install gulp@3.9.0 --save-dev

```

* `-g`の時、`sudo`をつけないとインストールできないかもしれない。
* 現在は推奨されるinstall方法が変わったようです。[公式](http://gulpjs.com/)

バージョンを指定してインストールするのがミソです  
※[`--save-dev`って何](http://qiita.com/msakamoto_sf/items/a1ae46979a42d6948ebd#--save----save-dev----save-optional-%E3%81%AE%E9%81%95%E3%81%84)

---

## gulpを動かす

```
$ npm install
$ gulp

```

---

## まとめ

* nvmをインストールする。
* nvmがターミナルをつけるといつでも起動するようにする。(=パスを通す)
* nodejsをインストールする。
* gulpをインストールする。

---

## エラーとたたかう

---


## エラーが出た、その前に
<br><br>
80%くらいnode.jsのバージョン違いのせい<br>
gulp動かない場合はまず<br>

```
$ node -v

```
<br>
違うバージョンが出てきたら、<br>
これでインストールされているバージョンを調べて<br>

```
$ nvm ls

```
<br>
node のバージョンを切り替える。<br>

```
$ nvm use v6.0.0

```

---

ホントに、これで８割方解決します。<br>
※一度間違ったnodejsのバージョンで```npm install```してしまった場合は、  <br>
node_modulesを全部消した上で、もう一度```npm install```しましょう。  

---

## 残りの20%のエラー
主なものだけ・・・・・・

---


##　Case1：npm installでコケる
例：`unmet dependency`
![2.png](https://qiita-image-store.s3.amazonaws.com/0/77729/29cd5927-8338-2470-7e4b-9437bc16f5cc.png "2.png")

- 依存関係(dependency)が満たされていないよ(unmet)ということ
- =必要なモジュールがインストールされてないよ
- package.jsonで指定されているバージョンが間違えている？？
- エラーメッセージに書いてあるモジュールを、手動でインストールする

---

##　Case2：gulpでコケる
例：`Error: listen EADDRINUSE :::4000`

````
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EADDRINUSE
    at errnoException (net.js:904:11)
    at Server._listen2 (net.js:1042:14)
    at listen (net.js:1064:10)
    at Server.listen (net.js:1138:5)
    at Function.app.listen (/vagrant/girly/girly-batch/node_modules/express/lib/application.js:532:24)
    at Object.<anonymous> (/vagrant/girly/girly-batch/bin/www:7:18)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
```

<br>

要約：そのポート、もう使ってるよ<br><br>

- 他に立ち上がっているlocalサーバー全部閉じて再起動。
- そのポートを使っているプロセスを`kill`(わからなかったらターミナルを再起動)


---


##　Case3：npm installでコケる　その2
例：nodejsのバージョン変えても、ずっとunmet dependency
![2.png](https://qiita-image-store.s3.amazonaws.com/0/77729/29cd5927-8338-2470-7e4b-9437bc16f5cc.png "2.png")

前のバージョンのnodejsのキャッシュを消しましょう

```
$ npm cache clean

```

---

## その他

神記事<br />
http://qiita.com/M-ISO/items/d693ac892549fc95c14c<br /><br />
---

## Q.
## nvmも入れる前にnodejs入れちゃったよ
先にインストールされたnode.jsを削除して、<br />
改めてnvm経由でnode.jsをインストールしてください。

---

## Q.
## v0.1古すぎる、アプデしたい
<br /><br />お願いします。<br />
私がv0.12=>v6にした時はエラーの嵐だったので、   <br />
当方の環境ではうまく動いたgulp/webpack開発環境テンプレを挙げておきます。<br /><br />

* [gulp & webpack環境](https://bitbucket.org/fullsizeimage/sunart/src)
* [LIGで実際に使われているフロントエンドテンプレート](https://github.com/frontainer/frontplate)
LIG用にアレンジされているのでこのままでは使いにくかった


---

## 冒頭に戻る

![antigravite2_—_open_◂_gulp_MANPATH__Users_fsimg__nvm_versions_node_v6_3_0_share_man__usr_local_share_man_ja__usr_local_share_man__usr_share_man__opt_X11_share_man__Applications_Xcode_app_Contents_Developer_Platforms_MacOSX_platform_Develope.png](https://qiita-image-store.s3.amazonaws.com/0/77729/3439778a-0bcf-05c9-86d4-3c2928254562.png "antigravite2_—_open_◂_gulp_MANPATH__Users_fsimg__nvm_versions_node_v6_3_0_share_man__usr_local_share_man_ja__usr_local_share_man__usr_share_man__opt_X11_share_man__Applications_Xcode_app_Contents_Developer_Platforms_MacOSX_platform_Develope.png")

---

```
[17:19:50] 'sass' errored after 407 ms
[17:19:50] Error: The `libsass` binding was not found in /Users/hogehoge/node_modules/gulp-sass/node_modules/node-sass/vendor/darwin-x64-46/binding.node
This usually happens because your node version has changed.
Run `npm rebuild node-sass` to build the binding for your current node version.
    at Object.sass.getBinaryPath (/Users/hogehoge/node_modules/gulp-sass/node_modules/node-sass/lib/extensions.js:158:11)
    at Object.<anonymous> (/Users/hogehoge/node_modules/gulp-sass/node_modules/node-sass/lib/index.js:16:36)
    at Module._compile (module.js:434:26)
    at Object.Module._extensions..js (module.js:452:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Module.require (module.js:365:17)
    at require (module.js:384:17)
    at Object.<anonymous> (/Users/hogehoge/node_modules/gulp-sass/index.js:183:21)
    at Module._compile (module.js:434:26)

```
<br><br>

* ヒント1 : The `libsass` binding was not found
* ヒント2 : This usually happens because your node version has changed.
* ヒント3 : Run `npm rebuild node-sass` to build the binding for your current node version.=>しかし効かない
---

解決法
```
$nvm use vXXXX
```

---

## まとめ

<br /><br />
エラーが起こった時
1.〜3.を順番に確認してみてください。<br /><br />

1. node/gulpのバージョンがプロジェクト毎に指定されているバージョンと違っていないか確認する

2. エラーを**よく読む**。どういう種類のエラーなのか**理解する。**  

3. **ググる。**stackoverflow OR Qiita。放置して時間がある時に調べる。諦める。大野さんに聞く。
[この記事](http://qiita.com/M-ISO/items/d693ac892549fc95c14c)に対処法が載っているかもしれない

---

![My_Clips_by_Naoko_Nishimura.png](https://qiita-image-store.s3.amazonaws.com/0/77729/4226bcfc-9e22-6209-e1c4-001e4443e415.png "My_Clips_by_Naoko_Nishimura.png")

---


間違いもあったかもしれませんが、、、

##　快適なgulpライフが送れるよう、祈っております

---

## END
